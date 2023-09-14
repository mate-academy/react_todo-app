import { ChangeEvent } from "react";

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodosContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  title: string;
};
