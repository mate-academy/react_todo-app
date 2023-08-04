import { useContext } from 'react';
import { TodoContextDispatch, TodoContextList } from '../Services/TodosContext';
import { ActionTypeEnum } from '../Services/Types';

export const TodoToggler: React.FC = () => {
  const { todos } = useContext(TodoContextList);
  const dispatch = useContext(TodoContextDispatch);

  const isAllChecked = todos.every(todo => todo.completed);

  const handleAllChecked = (event:React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionTypeEnum.CompleteAll,
      payload: {
        completed: event.target.checked,
      },
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
