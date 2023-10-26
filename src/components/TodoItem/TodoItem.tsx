/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  useContext,
  useRef,
  useState,
  useEffect,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { TodosContext } from '../TodosContext/TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const {
    todos,
    setTodos,
    deleteTodoHandler,
    updateTodoTitleHandler,
  } = useContext(TodosContext);

  const [isEdited, setIsEdited] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);

  const editTitleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editTitleField.current && isEdited) {
      editTitleField.current.focus();
    }
  }, [isEdited]);

  const handleCompletedClick = () => {
    const updatedTodos = todos.map(item => {
      if (item.id === todo.id) {
        return { ...item, completed: !item.completed };
      }

      return item;
    });

    setTodos(updatedTodos);
  };

  const handleInputBlur = () => {
    setIsEdited(false);
    if (newTitle.trim() !== '' && newTitle !== todo.title) {
      updateTodoTitleHandler({ ...todo, title: newTitle });
    }

    if (newTitle === '') {
      deleteTodoHandler(todo.id);
    }
  };

  const handleInputKeyEvents = (
    event?: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event) {
      if (event.key === 'Enter') {
        handleInputBlur();
      }

      if (event.key === 'Escape') {
        setIsEdited(false);
        setNewTitle(todo.title);
      }
    }
  };

  return (
    <li className={cn({ completed: todo.completed, editing: isEdited })}>

      {isEdited ? (
        <input
          ref={editTitleField}
          type="text"
          className="edit"
          value={newTitle}
          onChange={(event) => setNewTitle(event.target.value)}
          onKeyUp={(event) => handleInputKeyEvents(event)}
          onBlur={handleInputBlur}
        />
      ) : (
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            id={`toggle-view-${todo.id}`}
            checked={todo.completed}
            onChange={handleCompletedClick}
          />
          <label
            onDoubleClick={() => setIsEdited(true)}
          >
            {todo.title}
          </label>
          <button
            type="button"
            className="destroy"
            data-cy="deleteTodo"
            onClick={() => deleteTodoHandler(todo.id)}
          />
        </div>
      )}
    </li>
  );
};
