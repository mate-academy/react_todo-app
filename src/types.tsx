import { ChangeEvent } from "react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoItemProps = {
  todo: Todo;
};

export type TodoListProps = {
  todos: Todo[];
  toggleTodo: (id: number) => void;
};

export type TodosContextType = {
  todos: Todo[];
  title: string;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
};
