/* eslint-disable jsx-a11y/control-has-associated-label */
import classNames from 'classnames';

import { Action } from '../../lib/enums/Action';
import { useTodoContext } from '../../lib/shared/TodoContext';
import { ITodo } from '../../lib/types/ITodo';

import './TodoCheckBox.scss';

type Props = {
  id: ITodo['id'];
  isChecked: ITodo['completed'];
};

const TodoCheckBox: React.FC<Props> = ({ id, isChecked }) => {
  const { dispatchTodos } = useTodoContext();

  const toggle = () => {
    dispatchTodos({ type: Action.TOGGLE_TODO, payload: id });
  };

  return (
    <button
      type="button"
      className={classNames('TodoCheckBox', {
        'TodoCheckBox--checked': isChecked,
      })}
      onClick={toggle}
    >
      {isChecked && <div className="TodoCheckBox__inner-circle" />}
    </button>
  );
};

export { TodoCheckBox };
