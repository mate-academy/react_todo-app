import { useContext } from 'react';
import { TodoContextDispatch, TodoContextList } from '../Services/TodosContext';

export const TodoToggler: React.FC = () => {
  const { todos } = useContext(TodoContextList);
  const dispatch = useContext(TodoContextDispatch);

  const isAllChecked = todos.every(todo => todo.completed);

  const handleAllChecked = (event:React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'toggle_all',
      completed: event.target.checked,
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onChange={handleAllChecked}
        checked={isAllChecked}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>
    </>
  );
};
