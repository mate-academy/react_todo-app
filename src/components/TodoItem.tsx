/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react';
import cn from 'classnames';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo,
  changeCompleted: (id: number) => void,
  deleteTodo: (id: number) => void,
};

export const TodoItem: React.FC<Props> = ({
  todo,
  changeCompleted,
  deleteTodo,
}) => {
  const [editValue, setEditValue] = useState(todo.title);
  const [editTodosId, setEditTodosId] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { todos, setTodos } = useContext(TodosContext);

  useEffect(() => {
    if (editTodosId === todo.id) {
      inputRef.current?.focus();
    }
  }, [editTodosId, todo.id]);

  const updateValue = (newValue: string) => {
    if (!newValue) {
      deleteTodo(todo.id);
    } else {
      const updatedTodos = todos.map((todoCurrent) => {
        if (todoCurrent.id === todo.id) {
          return {
            ...todoCurrent,
            title: editValue,
          };
        }

        return todoCurrent;
      });

      setTodos(updatedTodos);
    }

    setEditTodosId(0);
  };

  const handlePressEnterEdit
    = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        updateValue(editValue.trim());
      }
    };

  const handleOnblurEdit = () => {
    updateValue(editValue.trim());
  };

  const handleChangeEditValue
    = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditValue(event.target.value);
    };

  return (
    <li
      className={cn(
        { completed: todo.completed },
        { editing: editTodosId === todo.id },
      )}
      onDoubleClick={() => setEditTodosId(todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-view-${todo.id}`}
          onChange={() => changeCompleted(todo.id)}
          checked={todo.completed}
        />

        <label>
          {todo.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => deleteTodo(todo.id)}
        />
      </div>

      <input
        type="text"
        className="edit"
        value={editValue}
        onChange={handleChangeEditValue}
        onBlur={handleOnblurEdit}
        ref={inputRef}
        onKeyPress={handlePressEnterEdit}
      />
    </li>
  );
};
