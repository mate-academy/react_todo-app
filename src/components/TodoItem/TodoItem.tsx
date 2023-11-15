/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import {
  useContext,
  useRef,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';
import { Todo } from '../../types/todo';
import { TodosContext } from '../../context/TodosContext';

type Props = {
  todo: Todo,
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  // console.log('rendering TodoItem');

  const { todos, setTodos } = useContext(TodosContext);
  const [newName, setNewName] = useState<string | null>(null);

  const editingInput = useRef<HTMLInputElement>(null);

  const onDoneChange = () => {
    const newTodos = [...todos];

    newTodos.splice(newTodos.indexOf(todo), 1, {
      id: todo.id,
      completed: !todo.completed,
      name: todo.name,
    });

    setTodos(newTodos);
  };

  const deleteButtonPressed = () => {
    const newTodos = [...todos];

    newTodos.splice(newTodos.indexOf(todo), 1);

    setTodos(newTodos);
  };

  const startEdit = () => {
    setNewName(todo.name);
  };

  const inputEventHandler = (event: React.FormEvent<HTMLInputElement>) => {
    setNewName(event.currentTarget.value);
  };

  const removeTodo = () => {
    const newTodos = [...todos];

    newTodos.splice(todos.indexOf(todo), 1);

    setTodos(newTodos);
  };

  const blurEventHandler = () => {
    if (newName === '') {
      removeTodo();
    } else if (todo.name !== newName) {
      const newTodos = [...todos];

      newTodos.splice(newTodos.indexOf(todo), 1, {
        id: todo.id,
        completed: todo.completed,
        name: newName || '',
      });

      setTodos(newTodos);
    }

    setNewName(null);
  };

  const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      blurEventHandler();
    }
  };

  useEffect(() => {
    editingInput.current?.focus();
  }, [newName]);

  return (
    <li className={cn({
      completed: todo.completed,
      editing: newName !== null,
    })}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`toggle-${todo.id}`}
          checked={todo.completed}
          onChange={onDoneChange}
        />
        <label
          style={{ userSelect: 'none' }}
          htmlFor={`toggle-${todo.id}`}
          onClick={event => event.preventDefault()}
          onDoubleClick={startEdit}
        >
          {todo.name}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteButtonPressed}
        />
      </div>
      <input
        ref={editingInput}
        value={newName || ''}
        type="text"
        className="edit"
        onChange={inputEventHandler}
        onBlur={blurEventHandler}
        onKeyDown={keyDownHandler}
      />
    </li>
  );
};
