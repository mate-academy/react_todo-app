import { useState } from 'react';

import { TodoCheckBox } from '../TodoCheckBox';
import { EditTodo } from '../EditTodo';

import { useTodoContext } from '../../lib/shared/TodoContext';
import { ITodo } from '../../lib/types/ITodo';
import { Action } from '../../lib/enums/Action';
import { Mode } from '../../lib/enums/Mode';
import deleteIcon from '../../lib/assets/icons/delete-icon.svg';

import './TodoItem.scss';

type Props = {} & ITodo;

const TodoItem: React.FC<Props> = ({ id, title, completed }) => {
  const { dispatchTodos } = useTodoContext();
  const [isHoveredOn, setIsHoveredOn] = useState(false);
  const [mode, setMode] = useState<Mode>(Mode.VIEW);

  const toggleMode = (newMode: Mode) => {
    setMode(newMode);
  };

  return (
    <li
      className="TodoItem"
      onMouseEnter={() => setIsHoveredOn(true)}
      onMouseLeave={() => setIsHoveredOn(false)}
      onDoubleClick={() => toggleMode(Mode.EDIT)}
    >
      <div className="TodoItem__content">
        <TodoCheckBox id={id} isChecked={completed} />

        {mode === Mode.VIEW ? (
          <p className="TodoItem__title">{title}</p>
        ) : (
          <EditTodo id={id} title={title} toggleMode={toggleMode} />
        )}
      </div>

      {isHoveredOn && (
        <button
          type="button"
          className="TodoItem__delete-btn"
          onClick={() => dispatchTodos({ type: Action.DELETE_TODO, payload: id })}
        >
          <img
            src={deleteIcon}
            alt="Delete"
            className="TodoItem__delete-icon"
          />
        </button>
      )}
    </li>
  );
};

export { TodoItem };
