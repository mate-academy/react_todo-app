import classNames from 'classnames';
import React, { useState } from 'react';

import { Todo } from '../../types/Todo';
import { getTodos, updateTodo, addTodo } from '../../api/todos';
import { User } from '../../types/User';

type Props = {
  newTodoField: React.RefObject<HTMLInputElement>,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  setIsToggleClicked: React.Dispatch<React.SetStateAction<boolean>>,
  user: User | null,
  setIsAdding: React.Dispatch<React.SetStateAction<boolean>>,
  isAdding: boolean,
  setNotification: React.Dispatch<React.SetStateAction<string>>,
};

export const TodoHeader: React.FC<Props> = ({
  newTodoField,
  todos,
  setTodos,
  setIsToggleClicked,
  user,
  setIsAdding,
  isAdding,
  setNotification,
}) => {
  const [title, setTitle] = useState('');

  const handleToggler = async () => {
    todos.forEach(async todo => {
      setIsToggleClicked(true);
      await updateTodo(todo.id, {
        completed: !todo.completed,
      });
      await getTodos(todo.userId).then(setTodos);
      setIsToggleClicked(false);
    });
  };

  const handleSubmit = async () => {
    if (title) {
      const newTodo = {
        id: 0,
        userId: user?.id ?? 0,
        title,
        completed: false,
      };

      setIsAdding(true);
      setTodos(current => [...current, newTodo]);
      setTitle('');

      await addTodo(newTodo)
        .catch(() => {
          setNotification('Unable to add a todo');
        });

      if (user) {
        await getTodos(user.id).then(setTodos);
      }

      setIsAdding(false);

      return;
    }

    setNotification('Title can\'t be empty');
  };

  return (
    <header className="todoapp__header">
      {todos.length > 0 && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          data-cy="ToggleAllButton"
          type="button"
          className={classNames('todoapp__toggle-all', {
            active: todos.every(todo => todo.completed),
          })}
          onClick={handleToggler}
        />
      )}

      <form onSubmit={event => {
        event.preventDefault();
        handleSubmit();
      }}
      >
        <input
          data-cy="createTodo"
          type="text"
          ref={newTodoField}
          className="todoapp__new-todo"
          placeholder="What needs to be done?"
          disabled={isAdding}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </form>
    </header>
  );
};
