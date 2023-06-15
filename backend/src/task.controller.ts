import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Post()
  createTask(@Body('description') description: string): Promise<Task> {
    return this.taskService.createTask(description);
  }

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Patch(':id')
  updateTask(@Param('id') id: number, @Body('completed') completed: boolean): Promise<Task> {
    return this.taskService.updateTask(id, completed);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTask(id);
  }
}