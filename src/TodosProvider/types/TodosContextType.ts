import React from 'react';

import { Todo } from '../../types/Todo';
import { Action } from './Action';

export interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<Action>;
}
