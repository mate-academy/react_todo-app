import { useContext } from 'react';
import { TodoItem } from './TodoItem';
import { TodoContext } from './TodoContext';

export const TodoList = () => {
  const { filteredTodos: todos } = useContext(TodoContext);

  return todos.map(t => <TodoItem todo={t} key={t.id} />);
};
