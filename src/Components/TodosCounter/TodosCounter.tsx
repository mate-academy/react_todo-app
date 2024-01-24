import { useContext } from 'react';
import { StateContext } from '../../state/TodosContext';

export const TodosCounter = () => {
  const { todos } = useContext(StateContext);
  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <span className="todo-count" data-cy="todosCounter">
      {`${activeTodosCount} items left`}
    </span>

  );
};
