import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  FC,
} from 'react';
import { useClickAway } from 'react-use';
import classNames from 'classnames';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';

type Props = {
  item: Todo,
};

export const TodoItem: FC<Props> = ({ item }) => {
  const { title, id, completed } = item;
  const { todos, updateTodos } = useContext(TodosContext);
  const [value, setValue] = useState(title);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleToggleItem = () => {
    updateTodos(todos.map((todo: Todo) => {
      const isSelected = todo.id === id;

      return ({
        ...todo,
        completed: isSelected
          ? !todo.completed
          : todo.completed,
      });
    }));
  };

  const handleDestroyItem = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    updateTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDoubleClickEdit = () => {
    setIsEdit(true);
    setValue(value.trim());
  };

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const saveEditedTodo = () => {
    updateTodos(todos.map((todo: Todo) => {
      const isSelected = todo.id === id;
      const newTitle = value.trim() || title;

      return ({
        ...todo,
        title: isSelected
          ? newTitle
          : todo.title,
      });
    }));

    setIsEdit(false);
  };

  const handleEditItemOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'Enter') {
      saveEditedTodo();
    }
  };

  useClickAway(inputRef, () => {
    saveEditedTodo();
  });

  return (
    <li
      className={classNames({
        completed: item.completed,
        editing: isEdit,
      })}
      key={id}
    >
      <div className="view">
        <input
          checked={completed}
          type="checkbox"
          className="toggle"
          onChange={() => handleToggleItem()}
        />
        <label onDoubleClick={() => handleDoubleClickEdit()}>
          {title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={event => handleDestroyItem(event)}
          aria-label="Delete"
        />
      </div>
      <input
        ref={inputRef}
        value={value}
        type="text"
        className="edit"
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => handleEditItemOnEnter(
          event,
        )}
      />
    </li>
  );
};
