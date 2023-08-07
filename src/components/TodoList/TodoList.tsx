/* eslint-disable jsx-a11y/control-has-associated-label */
import { useContext } from 'react';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosContext } from '../../contexts/TodosContext';

export const TodoList: React.FC = () => {
  const { filteredTodos } = useContext(TodosContext);

  return (
    <ul className="todo-list" data-cy="todoList">
      {filteredTodos.length > 0 && filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
