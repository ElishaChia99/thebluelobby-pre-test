import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  async createTask(description: string): Promise<Task> {
    const task = this.taskRepository.create({ description });
    return this.taskRepository.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

async updateTask(id: number, completed: boolean): Promise<Task> {
  const task = await this.taskRepository.findOne({ where: { id } });
  if (task) {
    task.completed = completed;
    return this.taskRepository.save(task);
  }
  return null;
}

  async deleteTask(id: number): Promise<void> {
    await this.taskRepository.delete(id);
  }
}