/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import classNames from 'classnames';
import { useState } from 'react';
import { Todo } from '../../../types/types';

/* eslint-disable jsx-a11y/control-has-associated-label */
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

  const setNewTodoTitle = (event: any) => {
    if (event.key === 'Enter') {
      if (!newTitleValue.trim().length) {
        return deleteTodo();
      }

      setTodos(
        todos.map((one: Todo) => {
          if (one.id === todo.id) {
            return {
              ...one,
              title: newTitleValue,
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
              title: newTitleValue,
            };
          }

          return one;
        }),
      );
      setIsEditing(false);
    }

    if (event.key === 'Escape') {
      setIsEditing(false);
    }
  };

  const handleChange = () => {
    setIsToggled(!isToggled);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
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
        />
      </div>
      <input
        type="text"
        className="edit"
        value={newTitleValue || todo.title}
        onKeyDown={setNewTodoTitle}
        onBlur={() => {
          if (!newTitleValue.trim().length) {
            return deleteTodo();
          }

          setTodos(
            todos.map((one: any) => {
              if (one.id === todo.id) {
                return {
                  ...one,
                  title: newTitleValue,
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
                  title: newTitleValue,
                };
              }

              return one;
            }),
          );
          setIsEditing(false);
        }}
        ref={input => input && input.focus()}
        onChange={(event) => {
          setNewTitleValue(event.target.value);
        }}
      />
    </li>

  );
};
