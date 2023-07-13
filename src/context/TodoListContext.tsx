import { createContext } from 'react';
import { Todo } from '../types/Todo';

interface TodoListContextType {
  visibleTodos: Todo[];
  handleTodoRename: (todoId: number, title: string) => void,
  handleToggleButtonClick: (todoId: number, completed: boolean) => void,
  handleRemoveButtonClick: (todoId: number) => void,
}

export const TodoListContext = createContext<TodoListContextType>({
  visibleTodos: [],
  handleTodoRename: () => {},
  handleToggleButtonClick: () => {},
  handleRemoveButtonClick: () => {},
});
