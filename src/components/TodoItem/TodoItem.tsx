import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import { useClickAway } from 'react-use';
import { TodosContext } from '../../context/TodosContext';
import { Todo } from '../../types/Todo';
import { Status } from '../../enums/Status';

type Props = {
  item: Todo,
};

/* eslint-disable jsx-a11y/control-has-associated-label */
export const TodoItem: React.FC<Props> = ({ item }) => {
  const { todos, updateTodos } = useContext(TodosContext);
  const [value, setValue] = useState(item.title);
  const [completed, setCompleted] = useState(item.completed);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const hasEditingTodo = todos.some(todo => todo.completed === 'editing');

  useEffect(() => {
    if (hasEditingTodo && inputRef.current) {
      inputRef.current.focus();
    }
  }, [hasEditingTodo]);

  const saveEditedTodo = (
    title: string,
    id: number,
  ) => {
    updateTodos(todos.map((todo: Todo) => {
      const isSelected = todo.id === id;
      const newTitle = value.trim() || title;

      return ({
        ...todo,
        title: isSelected
          ? newTitle
          : todo.title,
        completed: isSelected && completed !== 'editing'
          ? completed
          : todo.completed,
      });
    }));
  };

  const handleToggleItem = (id: number) => {
    updateTodos(todos.map((todo: Todo) => {
      const isSelected = todo.id === id;

      const reverseStatus = (status: string): string => {
        return status === Status.Completed ? '' : Status.Completed;
      };

      return ({
        ...todo,
        completed: isSelected
          ? reverseStatus(todo.completed)
          : todo.completed,
      });
    }));
  };

  const handleDestroyItem = (id: number) => {
    updateTodos(todos.filter(todo => todo.id !== id));
  };

  const handleDoubleClickEdit = (id: number) => {
    setValue(value.trim());

    updateTodos(todos.map((todo: Todo) => {
      const isSelected = todo.id === id;

      if (isSelected) {
        setCompleted(todo.completed);
      }

      return {
        ...todo,
        completed: isSelected ? 'editing' : todo.completed,
      };
    }));
  };

  const handleEditItemOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>,
    title: string,
    id: number,
  ) => {
    if (event.key === 'Enter') {
      saveEditedTodo(title, id);
    }
  };

  const isCompleted = item.completed === 'completed';

  const labelProps = hasEditingTodo
    ? {}
    : { onDoubleClick: () => handleDoubleClickEdit(item.id) };

  useClickAway(inputRef, () => {
    if (item.completed === 'editing') {
      saveEditedTodo(value, item.id);
    }
  });

  return (
    <li className={item.completed} key={item.id}>
      <div className="view">
        <input
          checked={isCompleted}
          type="checkbox"
          className="toggle"
          onChange={() => handleToggleItem(item.id)}
        />
        <label {...labelProps}>
          {item.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleDestroyItem(item.id)}
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
          item.title,
          item.id,
        )}
      />
    </li>
  );
};
