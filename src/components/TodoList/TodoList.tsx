import { useContext, useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { StateContext } from '../TodosContext';
import { filterTodos } from '../../services/filterTodos';

export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);
  const filteredTodos = useMemo(
    () => filterTodos(todos, filter),
    [todos, filter],
  );

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
