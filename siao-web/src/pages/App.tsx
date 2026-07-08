import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Aluno = {
  id: number
  nomeAluno: string
  dataAniversario: string
  nomeResponsavel: string
  contato: string
  observacoesAluno?: string | null
}

type AlunoForm = Omit<Aluno, 'id'>

const emptyForm: AlunoForm = {
  nomeAluno: '',
  dataAniversario: '',
  nomeResponsavel: '',
  contato: '',
  observacoesAluno: '',
}

const apiBaseUrl = import.meta.env.VITE_API_URL ?? '/api'

function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [form, setForm] = useState<AlunoForm>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

  const filteredAlunos = useMemo(() => {
    const term = search.trim().toLowerCase()

    if (!term) {
      return alunos
    }

    return alunos.filter((aluno) =>
      [
        aluno.nomeAluno,
        aluno.nomeResponsavel,
        aluno.contato,
        aluno.observacoesAluno ?? '',
      ]
        .join(' ')
        .toLowerCase()
        .includes(term),
    )
  }, [alunos, search])

  async function loadAlunos() {
    setIsLoading(true)
    setError('')

    try {
      const response = await fetch(`${apiBaseUrl}/alunos`)

      if (!response.ok) {
        throw new Error('Nao foi possivel carregar os alunos.')
      }

      const data = (await response.json()) as Aluno[]
      setAlunos(data)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : 'Nao foi possivel carregar os alunos.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    void loadAlunos()
  }, [])

  function updateField(field: keyof AlunoForm, value: string) {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }))
  }

  function startEditing(aluno: Aluno) {
    setEditingId(aluno.id)
    setForm({
      nomeAluno: aluno.nomeAluno,
      dataAniversario: aluno.dataAniversario,
      nomeResponsavel: aluno.nomeResponsavel,
      contato: aluno.contato,
      observacoesAluno: aluno.observacoesAluno ?? '',
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSaving(true)
    setError('')

    const url =
      editingId === null
        ? `${apiBaseUrl}/alunos`
        : `${apiBaseUrl}/alunos/${editingId}`

    try {
      const response = await fetch(url, {
        method: editingId === null ? 'POST' : 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })

      if (!response.ok) {
        throw new Error('Nao foi possivel salvar o aluno.')
      }

      await loadAlunos()
      resetForm()
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : 'Nao foi possivel salvar o aluno.',
      )
    } finally {
      setIsSaving(false)
    }
  }

  async function removeAluno(id: number) {
    const shouldRemove = window.confirm('Deseja remover este aluno?')

    if (!shouldRemove) {
      return
    }

    setError('')

    try {
      const response = await fetch(`${apiBaseUrl}/alunos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Nao foi possivel remover o aluno.')
      }

      await loadAlunos()

      if (editingId === id) {
        resetForm()
      }
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : 'Nao foi possivel remover o aluno.',
      )
    }
  }

  return (
    <main className="app-shell">
      <section className="page-heading">
        <div>
          <p className="eyebrow">Siao</p>
          <h1>Cadastro de alunos</h1>
        </div>
        <div className="summary-panel" aria-label="Resumo de alunos">
          <span>{alunos.length}</span>
          <strong>{alunos.length === 1 ? 'aluno' : 'alunos'}</strong>
        </div>
      </section>

      {error && <div className="feedback error">{error}</div>}

      <section className="workspace">
        <form className="student-form" onSubmit={handleSubmit}>
          <div className="section-title">
            <h2>{editingId === null ? 'Novo aluno' : 'Editar aluno'}</h2>
            {editingId !== null && (
              <button className="ghost-button" type="button" onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>

          <label>
            Nome do aluno
            <input
              required
              value={form.nomeAluno}
              onChange={(event) => updateField('nomeAluno', event.target.value)}
              placeholder="Ex.: Maria Silva"
            />
          </label>

          <label>
            Data de aniversario
            <input
              required
              type="date"
              value={form.dataAniversario}
              onChange={(event) =>
                updateField('dataAniversario', event.target.value)
              }
            />
          </label>

          <label>
            Nome do responsavel
            <input
              required
              value={form.nomeResponsavel}
              onChange={(event) =>
                updateField('nomeResponsavel', event.target.value)
              }
              placeholder="Ex.: Joao Silva"
            />
          </label>

          <label>
            Contato
            <input
              required
              value={form.contato}
              onChange={(event) => updateField('contato', event.target.value)}
              placeholder="Telefone ou e-mail"
            />
          </label>

          <label className="wide-field">
            Observacoes
            <textarea
              rows={4}
              value={form.observacoesAluno ?? ''}
              onChange={(event) =>
                updateField('observacoesAluno', event.target.value)
              }
              placeholder="Alergias, rotinas, observacoes pedagogicas..."
            />
          </label>

          <button className="primary-button" disabled={isSaving} type="submit">
            {isSaving
              ? 'Salvando...'
              : editingId === null
                ? 'Cadastrar aluno'
                : 'Salvar alteracoes'}
          </button>
        </form>

        <section className="students-area">
          <div className="toolbar">
            <div className="section-title">
              <h2>Lista de alunos</h2>
              <span>{filteredAlunos.length} registros</span>
            </div>
            <input
              className="search-input"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por aluno, responsavel ou contato"
            />
          </div>

          <div className="students-content">
            {isLoading ? (
              <div className="empty-state">Carregando alunos...</div>
            ) : filteredAlunos.length === 0 ? (
              <div className="empty-state">Nenhum aluno encontrado.</div>
            ) : (
              <>
                <div className="mobile-list">
                  {filteredAlunos.map((aluno) => (
                    <article className="student-card" key={aluno.id}>
                      <div className="student-card-header">
                        <strong>{aluno.nomeAluno}</strong>
                        <span>{aluno.dataAniversario}</span>
                      </div>

                      <dl className="student-details">
                        <div>
                          <dt>Responsavel</dt>
                          <dd>{aluno.nomeResponsavel}</dd>
                        </div>
                        <div>
                          <dt>Contato</dt>
                          <dd>{aluno.contato}</dd>
                        </div>
                        <div>
                          <dt>Observacoes</dt>
                          <dd>{aluno.observacoesAluno || '-'}</dd>
                        </div>
                      </dl>

                      <div className="action-row">
                        <button
                          className="ghost-button"
                          type="button"
                          onClick={() => startEditing(aluno)}
                        >
                          Editar
                        </button>
                        <button
                          className="danger-button"
                          type="button"
                          onClick={() => void removeAluno(aluno.id)}
                        >
                          Excluir
                        </button>
                      </div>
                    </article>
                  ))}
                </div>

                <div className="table-frame">
                  <table>
                    <thead>
                      <tr>
                        <th>Aluno</th>
                        <th>Aniversario</th>
                        <th>Responsavel</th>
                        <th>Contato</th>
                        <th>Observacoes</th>
                        <th>Acoes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAlunos.map((aluno) => (
                        <tr key={aluno.id}>
                          <td>
                            <strong>{aluno.nomeAluno}</strong>
                          </td>
                          <td>{aluno.dataAniversario}</td>
                          <td>{aluno.nomeResponsavel}</td>
                          <td>{aluno.contato}</td>
                          <td>{aluno.observacoesAluno || '-'}</td>
                          <td>
                            <div className="action-row">
                              <button
                                className="ghost-button"
                                type="button"
                                onClick={() => startEditing(aluno)}
                              >
                                Editar
                              </button>
                              <button
                                className="danger-button"
                                type="button"
                                onClick={() => void removeAluno(aluno.id)}
                              >
                                Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
