import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('alunos')
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nomeAluno!: string;

  @Column()
  dataAniversario!: string;

  @Column()
  nomeResponsavel!: string;

  @Column()
  contato!: string;

  @Column({ nullable: true })
  observacoesAluno?: string;
}
