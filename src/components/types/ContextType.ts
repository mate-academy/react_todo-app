import React from 'react';
import { Position } from './Position';
import { Todo } from './Todo';

export type ContextType = {
  todos: [] | Todo[],
  title: string,
  filteredTodos: [] | Todo[],
  filt: string,
  setTodos: (todo:[] | Todo[]) => void,
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleAddTodo: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  handleDelete: (id: number) => void
  handleEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  setFilt: (status: Position) => void,
  toggled: (id: number) => void,
};
