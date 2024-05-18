import React, { useEffect, useState } from 'react';

export interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export interface TaskItem {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskContext = React.createContext<TaskItem>({
  tasks: [],
  setTasks: () => {},
});

export const TaskContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const todos = localStorage.getItem('todos');

    if (todos) {
      setTasks(JSON.parse(todos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
