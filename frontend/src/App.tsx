import React, { useEffect, useState } from 'react';
import { HttpMethod, initFetch } from "./utils/fetch";
const fetchApi = initFetch("http://localhost:3000");

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetchApi<{ data: [] }>(HttpMethod.GET, '/tasks');
      console.log(response); // Log the response object
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const createTask = async (description, completed) => {
    try {
      const response = await fetchApi<{ data: string }>(HttpMethod.POST, '/tasks', {
        description,
        completed,
      });
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, completed) => {
    try {
      await fetchApi<{data: string}>(HttpMethod.PATCH, `/tasks/${id}`, { completed });
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetchApi<{data: string}>(HttpMethod.DELETE, `/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Simple Task Manager App </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const description = e.target.elements.description.value;
          const completed = false;
          createTask(description,completed);
          e.target.reset();
        }}
      >
        <input type="text" name="description" placeholder="Task description" />
        <button type="submit">Add Task</button>
      </form>
      {/* <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.description}
            <button onClick={() => updateTask(task.id, !task.completed)}>
              {task.completed ? 'Mark Incomplete' : 'Mark Complete'}
            </button>
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default TaskList;
