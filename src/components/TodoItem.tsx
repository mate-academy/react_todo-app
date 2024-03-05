/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import { useDispatchContext } from '../context/GlobalContext';
import EditTodoForm from './EditTodoForm';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const { dispatch } = useDispatchContext();
  const [isEditing, setIsEditing] = useState(false);

  const handleRemoveItem = (id: number) => {
    if (dispatch) {
      dispatch({ type: 'remove', payload: { id } });
    }
  };

  const handleToggleCheck = () => {
    dispatch({
      type: 'toggle',
      payload: {
        id: todo.id,
        completed: !todo.completed,
      },
    });
  };

  return (
    <>
      <motion.li
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        style={{ overflow: 'hidden' }}
        className={cn({
          completed: todo.completed && !isEditing,
          editing: isEditing,
        })}
      >
        <div className="view" onDoubleClick={() => setIsEditing(true)}>
          <input
            type="checkbox"
            className="toggle"
            onChange={handleToggleCheck}
            checked={todo.completed}
            style={{ cursor: 'pointer' }}
          />
          <label>{todo.name}</label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => handleRemoveItem(todo.id)}
          />
        </div>
        {isEditing && (
          <EditTodoForm
            name={todo.name}
            id={todo.id}
            onClose={() => setIsEditing(false)}
          />
        )}
      </motion.li>
    </>
  );
};

export default TodoItem;
