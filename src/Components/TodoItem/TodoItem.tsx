import {
  ChangeEvent,
  useState,
  KeyboardEvent,
  useContext,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { Context } from '../../context';

type Props = {
  todo: Todo;
};

const TodoItem: React.FC<Props> = ({
  todo: {
    id,
    title,
    completed,
  },
  todo,
}) => {
  const [value, setValue] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  const { updateTodo, removeTodo } = useContext(Context);

  const changeTitle = (cancel?: boolean) => {
    if (!value.length || cancel) {
      setValue(title);
    } else {
      updateTodo({ ...todo, title: value });
    }

    setIsEdit(false);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      changeTitle(true);
    }

    if (e.key === 'Enter') {
      changeTitle();
    }
  };

  const onChangeStatus = () => {
    updateTodo({ ...todo, completed: !completed });
  };

  return (
    <li className={cn({ completed, editing: isEdit })}>
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={completed}
          onChange={onChangeStatus}
        />
        <label onDoubleClick={() => setIsEdit(true)}>
          {value}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          aria-label="delete"
          onClick={() => removeTodo(id)}
        />
      </div>
      {isEdit && (
        <input
          type="text"
          className="edit"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyboard}
          onBlur={() => changeTitle()}
        />
      )}
    </li>
  );
};

export default TodoItem;
