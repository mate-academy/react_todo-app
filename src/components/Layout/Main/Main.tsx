import { FC, useContext, useEffect, useState } from 'react';
import { DispatchContext, StateContext } from '../../../lib/TodosContext';
import { Todo } from '../../../type/Todo';
import { TodoList } from '../../TodoList';

export const Main: FC = () => {
  const { todos } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(todos.every(todo => todo.completed));
  }, [todos]);

  const handleAllChecked = () => {
    const newTodos: Todo[] = todos.map(todo => ({
      ...todo,
      completed: !isChecked,
    }));

    dispatch({
      type: 'setTodos',
      payload: newTodos,
    });
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={isChecked}
        onChange={handleAllChecked}
      />

      <label htmlFor="toggle-all">Mark all as complete</label>

      <TodoList />
    </section>
  );
};
