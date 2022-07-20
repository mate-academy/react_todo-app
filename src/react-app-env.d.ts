/// <reference types="react-scripts" />

import { ShowType } from './types/ShowType';

export interface Todo {
  id: number,
  title: string,
  completed: boolean
}

export interface State {
  todoList: Todo[],
  showBy: ShowType
}
