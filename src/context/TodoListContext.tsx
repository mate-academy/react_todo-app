import { createContext } from 'react';
import { Todo } from '../types/Todo';

interface TodoListContextType {
  visibleTodos: Todo[];
  handleTodoRename: (title: string, todoId: number) => void,
  handleCompleted: (todoId: number) => void,
  handleDeletedTodo: (todoId: number) => void,
}

export const TodoListContext = createContext<TodoListContextType>({
  visibleTodos: [],
  handleTodoRename: () => {},
  handleCompleted: () => {},
  handleDeletedTodo: () => {},
});
