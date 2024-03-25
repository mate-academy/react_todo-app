import { useContext, useState } from 'react';
import { Todo } from '../../../types/Todo';
import classNames from 'classnames';
import { TodosContext } from '../../TodosContext';

type Props = {
  todo: Todo;
  toggleAll: boolean;
};

export const TodoItem: React.FC<Props> = ({ todo, toggleAll }) => {
  const [isChecked, setIsChecked] = useState(false);
  const { setTodoComplete, clearTodo } = useContext(TodosContext);

  const onHandleChange = () => {
    if (toggleAll) {
      setIsChecked(!isChecked);
      setTodoComplete(todo, isChecked);
    } else if (!toggleAll) {
      setIsChecked(!isChecked);
      setTodoComplete(todo, !isChecked);
    }
  };

  return (
    <li className={classNames({ completed: todo.completed })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={onHandleChange}
        />
        <label htmlFor="toggle-view">{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => clearTodo(todo.id)}
        />
      </div>
      <input type="text" className="edit" />
    </li>
  );
};
