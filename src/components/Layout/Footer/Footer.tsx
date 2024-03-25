import { FC, useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../../../lib/TodosContext';
import { Filters } from '../../Filters/Filters';

export const Footer: FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const [isChecked, setIsChecked] = useState(false);
  const countTodos = todos.filter(todo => !todo.completed).length;

  useEffect(() => {
    setIsChecked(todos.some(todo => todo.completed));
  }, [todos]);

  const clickOnClearCompleteTodo = () => {
    const newTodos = todos.filter(todo => !todo.completed);

    dispatch({
      type: 'setTodos',
      payload: newTodos,
    });
  };

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {countTodos} items left
      </span>

      <Filters />

      {isChecked && (
        <button
          type="button"
          className="clear-completed"
          onClick={clickOnClearCompleteTodo}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
};
