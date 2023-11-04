import { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import './style.css';
import { VisibleTodosContext } from '../GlobalStateProvider';

export const TodoList: React.FC = () => {
  const todos = useContext(VisibleTodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {todos.map(item => (
        <TodoItem todo={item} key={item.id} />
      ))}
    </ul>
  );
};
