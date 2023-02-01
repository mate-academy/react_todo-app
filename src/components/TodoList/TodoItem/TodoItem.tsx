import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../../types/types';

type Props = {
  todo: Todo,
  setTodos: (value: Todo[]) => void,
  visibleTodos: Todo[],
  setVisibleTodos: (value: Todo[]) => void,
  todos: Todo[],
  setIsToggled: (value: boolean) => void,
  isToggled: boolean,
};

export const TodoItem: React.FC<Props> = ({
  todo, todos, setTodos, setVisibleTodos, setIsToggled, isToggled,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitleValue, setNewTitleValue] = useState('');
  const changeCompleted = () => {
    setTodos(
      todos.map((one: Todo) => {
        if (one.id === todo.id) {
          return {
            ...one,
            completed: !one.completed,
          };
        }

        return one;
      }),
    );
    setVisibleTodos(
      todos.map((one: Todo) => {
        if (one.id === todo.id) {
          return {
            ...one,
            completed: !one.completed,
          };
        }

        return one;
      }),
    );
  };

  const deleteTodo = () => {
    setTodos(
      todos.filter((one: Todo) => {
        return one.id !== todo.id;
      }),
    );
    setVisibleTodos(
      todos.filter((one: Todo) => {
        return one.id !== todo.id;
      }),
    );
  };

  const changeTodoTitle = () => {
    setIsEditing(true);
  };

  const setNewTodoTitle = () => {
    if (!newTitleValue.trim().length && !todo.title.trim().length) {
      return deleteTodo();
    }

    setTodos(
      todos.map((one: Todo) => {
        if (one.id === todo.id) {
          return {
            ...one,
            title: newTitleValue || todo.title,
          };
        }

        return one;
      }),
    );

    setVisibleTodos(
      todos.map((one: Todo) => {
        if (one.id === todo.id) {
          return {
            ...one,
            title: newTitleValue || todo.title,
          };
        }

        return one;
      }),
    );

    return setIsEditing(false);
  };

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  const checkKey = (event: { key: string; }) => {
    if (event.key === 'Enter') {
      setNewTodoTitle();
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <li
      key={todo.id}
      className={
        classNames({
          completed: todo.completed,
          editing: isEditing,
        })
      }
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          onClick={changeCompleted}
          checked={todo.completed}
          onChange={handleChange}

        />
        <label
          onDoubleClick={changeTodoTitle}
        >
          {todo.title}

        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
          aria-label="destroy"
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitleValue || todo.title}
        onKeyDown={checkKey}
        onBlur={setNewTodoTitle}
        ref={input => input && input.focus()}
        onChange={(event) => {
          setNewTitleValue(event.target.value);
        }}
      />
    </li>

  );
};
