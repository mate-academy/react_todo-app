import { useContext, useMemo } from 'react';
import { TodoItem } from '../TodoItem';
import { StateContext } from '../TodosContext';
import { filterTodos } from '../../services/filterTodos';

export const TodoList = () => {
  const { todos, filter } = useContext(StateContext);
  const filteredTodos = useMemo(() => {
    return filterTodos(todos, filter);
  }, [todos]);

  return (
    <ul className="todo-list" data-cy="todosList">
      {filteredTodos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </ul>
  );
};
