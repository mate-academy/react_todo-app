import { useEffect, useState } from 'react';
import { getTodos } from '../api/todos';
import { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

export const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} setTodos={setTodos} />
      ))}
    </ul>
  );
};
