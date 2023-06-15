import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Task } from './task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost",
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'postgres',
      synchronize: true,
      entities: [Task],
      logging: true
    }),
    TypeOrmModule.forFeature([Task]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
