import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../TodoType';
import { TodoItem } from './TodoItem';

export type TodoListProps = {
  todos: Todo[]
};

export const TodoList = ({ todos }: TodoListProps) => {
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);

  const location = useLocation().pathname.slice(1);

  useEffect(() => {
    if (location === 'active') {
      setFilteredTodos(() => todos.filter((item) => !item.completed));
    } else if (location === 'completed') {
      setFilteredTodos(() => todos.filter((item) => item.completed));
    } else {
      setFilteredTodos(() => todos);
    }
  }, [location, todos]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
