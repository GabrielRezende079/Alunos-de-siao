import { useEffect, useState } from 'react'
import type { FormEvent, MouseEvent, ReactNode } from 'react'
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

const apiBaseUrl =
  import.meta.env.VITE_API_URL ??
  (import.meta.env.PROD ? 'https://alunos-de-siao.onrender.com' : '/api')
const colorCycle = ['#22C55E', '#F97316', '#7C3AED', '#0EA5E9']

const cakeIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path>
    <path d="M4 16s.5-1 2-1 1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1 2 1 2 1"></path>
    <line x1="12" y1="4" x2="12" y2="8"></line>
    <line x1="8" y1="6" x2="8" y2="9"></line>
    <line x1="16" y1="6" x2="16" y2="9"></line>
  </svg>
)

const personIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const phoneIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"></path>
  </svg>
)

const trashIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
    <path d="M10 11v6"></path>
    <path d="M14 11v6"></path>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
  </svg>
)

const closeIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="#374151"
    strokeWidth="2.4"
    strokeLinecap="round"
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
)

const calendarIcon = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

function App() {
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [form, setForm] = useState<AlunoForm>(emptyForm)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')

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

  function openModal() {
    setEditingId(null)
    setForm(emptyForm)
    setIsModalOpen(true)
  }

  function openEditModal(aluno: Aluno) {
    setEditingId(aluno.id)
    setForm({
      nomeAluno: aluno.nomeAluno,
      dataAniversario: aluno.dataAniversario,
      nomeResponsavel: aluno.nomeResponsavel,
      contato: aluno.contato,
      observacoesAluno: aluno.observacoesAluno ?? '',
    })
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
    setEditingId(null)
    setForm(emptyForm)
  }

  function handleOverlayClick(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closeModal()
    }
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
      closeModal()
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
    setError('')

    try {
      const response = await fetch(`${apiBaseUrl}/alunos/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Nao foi possivel remover o aluno.')
      }

      await loadAlunos()
    } catch (removeError) {
      setError(
        removeError instanceof Error
          ? removeError.message
          : 'Nao foi possivel remover o aluno.',
      )
    }
  }

  return (
    <div className="phone">
      <div className="screen" id="screen">
        <div className="app-header">
          <div className="header-icon">
            <img src="/RedeInfantil-Logo.png" alt="Rede Infantil Monte Siao" />
          </div>
          <h1 className="app-title">
            Crianças de <span>Sião</span>
          </h1>
          <p className="app-subtitle">
            Cadastro alegre e simples dos nossos alunos
          </p>
          <div className="status-row">
            <span className="dots">
              <span className="dot green"></span>
              <span className="dot orange"></span>
              <span className="dot purple"></span>
            </span>
            <span id="count-label">
              {alunos.length} aluno{alunos.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>

        {error && <p className="hint">{error}</p>}

        {isLoading ? (
          <div className="empty-card" id="empty-state">
            <div className="empty-icon">❤️</div>
            <p className="empty-title">Carregando alunos...</p>
          </div>
        ) : alunos.length === 0 ? (
          <div className="empty-card" id="empty-state">
            <div className="empty-icon">❤️</div>
            <p className="empty-title">Nenhum aluno ainda</p>
            <p className="empty-subtitle">
              Toque em <b>Novo aluno</b> para começar a cadastrar.
            </p>
            <button className="pill-btn solid-orange" type="button" onClick={openModal}>
              <span>+</span> Adicionar o primeiro
            </button>
          </div>
        ) : (
          <div className="student-list" id="student-list">
            {alunos.map((aluno, index) => (
              <StudentCard
                aluno={aluno}
                color={colorCycle[index % colorCycle.length]}
                key={aluno.id}
                onEdit={openEditModal}
                onRemove={(id) => void removeAluno(id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bottom-action">
        <button className="pill-btn solid-purple block" type="button" onClick={openModal}>
          <span>+</span> Novo aluno
        </button>
      </div>

      <div
        className={`overlay${isModalOpen ? ' open' : ''}`}
        id="overlay"
        onClick={handleOverlayClick}
      >
        <div className="modal">
          <div className="modal-head">
            <div>
              <p className="modal-title">
                {editingId === null ? 'Novo aluno' : 'Editar aluno'}
              </p>
              <p className="modal-subtitle">Preencha os dados abaixo</p>
            </div>
            <button className="close-btn" id="btn-close" type="button" onClick={closeModal}>
              {closeIcon}
            </button>
          </div>

          <form id="student-form" onSubmit={handleSubmit}>
            <div className="field lavender">
              <label className="field-label" htmlFor="f-nome">
                Nome do aluno
              </label>
              <input
                id="f-nome"
                type="text"
                placeholder="Ex: Ana Clara"
                required
                value={form.nomeAluno}
                onChange={(event) => updateField('nomeAluno', event.target.value)}
              />
            </div>

            <div className="field peach">
              <label className="field-label" htmlFor="f-data">
                Data de aniversário
              </label>
              <div className="field-with-icon">
                <input
                  id="f-data"
                  type="date"
                  required
                  value={form.dataAniversario}
                  onChange={(event) =>
                    updateField('dataAniversario', event.target.value)
                  }
                />
                {calendarIcon}
              </div>
            </div>

            <div className="field mint">
              <label className="field-label" htmlFor="f-responsavel">
                Nome do responsável
              </label>
              <input
                id="f-responsavel"
                type="text"
                placeholder="Ex: Maria da Silva"
                required
                value={form.nomeResponsavel}
                onChange={(event) =>
                  updateField('nomeResponsavel', event.target.value)
                }
              />
            </div>

            <div className="field lavender">
              <label className="field-label" htmlFor="f-contato">
                Contato
              </label>
              <input
                id="f-contato"
                type="tel"
                placeholder="(00) 90000-0000"
                required
                value={form.contato}
                onChange={(event) => updateField('contato', event.target.value)}
              />
            </div>

            <div className="field peach">
              <label className="field-label" htmlFor="f-obs">
                Observações
              </label>
              <textarea
                id="f-obs"
                placeholder="Alergias, cuidados especiais..."
                value={form.observacoesAluno ?? ''}
                onChange={(event) =>
                  updateField('observacoesAluno', event.target.value)
                }
              ></textarea>
            </div>

            <div className="modal-actions">
              <button className="pill-btn outline" type="button" onClick={closeModal}>
                Cancelar
              </button>
              <button className="pill-btn solid-purple" disabled={isSaving} type="submit">
                {isSaving ? 'Salvando...' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

type StudentCardProps = {
  aluno: Aluno
  color: string
  onEdit: (aluno: Aluno) => void
  onRemove: (id: number) => void
}

function StudentCard({ aluno, color, onEdit, onRemove }: StudentCardProps) {
  const initial = aluno.nomeAluno.trim().charAt(0).toUpperCase() || '?'

  return (
    <div
      className="student-card"
      style={{ background: hexToBg(color) }}
      onClick={() => onEdit(aluno)}
    >
      <div className="student-card-head">
        <div className="avatar" style={{ background: color }}>
          {initial}
        </div>
        <div>
          <p className="student-name">{aluno.nomeAluno}</p>
          <p className="student-hash">#{aluno.id.toString(16).padStart(6, '0')}</p>
        </div>
        <button
          className="delete-btn"
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onRemove(aluno.id)
          }}
        >
          {trashIcon}
        </button>
      </div>
      <InfoRow icon={cakeIcon} label="Aniversário" value={formatDate(aluno.dataAniversario)} />
      <InfoRow icon={personIcon} label="Responsável" value={aluno.nomeResponsavel} />
      <InfoRow icon={phoneIcon} label="Contato" value={aluno.contato} />
    </div>
  )
}

type InfoRowProps = {
  icon: ReactNode
  label: string
  value: string
}

function InfoRow({ icon, label, value }: InfoRowProps) {
  return (
    <div className="info-row">
      {icon}
      <div className="info-text">
        <span className="info-label">{label}</span>
        <span className="info-value">{value}</span>
      </div>
    </div>
  )
}

function formatDate(iso: string) {
  if (!iso) {
    return ''
  }

  const [year, month, day] = iso.split('-')
  return `${month}/${day}/${year}`
}

function hexToBg(hex: string) {
  const map: Record<string, string> = {
    '#22C55E': '#DCF3DE',
    '#F97316': '#FCE4CC',
    '#7C3AED': '#EDE7FB',
    '#0EA5E9': '#DDF0FB',
  }

  return map[hex] || '#DCF3DE'
}

export default App
