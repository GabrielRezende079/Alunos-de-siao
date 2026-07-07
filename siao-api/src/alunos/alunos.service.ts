import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlunoDto } from './dto/create-aluno.dto';
import { UpdateAlunoDto } from './dto/update-aluno.dto';
import { Aluno } from './entities/aluno.entity';

@Injectable()
export class AlunosService {
  constructor(
    @InjectRepository(Aluno)
    private readonly alunosRepository: Repository<Aluno>,
  ) {}

  create(createAlunoDto: CreateAlunoDto): Promise<Aluno> {
    const aluno = this.alunosRepository.create(createAlunoDto);
    return this.alunosRepository.save(aluno);
  }

  findAll(): Promise<Aluno[]> {
    return this.alunosRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number): Promise<Aluno> {
    const aluno = await this.alunosRepository.findOneBy({ id });

    if (!aluno) {
      throw new NotFoundException(`Aluno com id ${id} nao encontrado`);
    }

    return aluno;
  }

  async update(id: number, updateAlunoDto: UpdateAlunoDto): Promise<Aluno> {
    const aluno = await this.findOne(id);
    Object.assign(aluno, updateAlunoDto);
    return this.alunosRepository.save(aluno);
  }

  async remove(id: number): Promise<void> {
    const result = await this.alunosRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Aluno com id ${id} nao encontrado`);
    }
  }
}
