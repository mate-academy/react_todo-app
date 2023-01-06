import classNames from 'classnames';
import React, { useContext, useState } from 'react';
import { changedTodo, createNewTodo } from '../../api/todos';
import { ErrorType } from '../../types/ErrorType';
import { Todo } from '../../types/Todo';
import { AuthContext } from '../Auth/AuthContext';
import { ContextTextError } from '../Context/ContextTextError';
import { ContextTodos } from '../Context/ContextTodos';
import { ContextToggleAll } from '../Context/ContextToggleAll';
import './HeaderForm.scss';

type Props = {
  unCompletedTodos: Todo[],
};

export const HeaderForm: React.FC<Props> = React.memo(({
  unCompletedTodos,
}) => {
  const { user } = useContext(AuthContext);
  const userId = user?.id || 0;
  const { setTextError } = useContext(ContextTextError);

  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const {
    todos,
    setTodos,
    setIsAddingTodo,
    isAddingTodo,
    setTitle,
  } = useContext(ContextTodos);

  const {
    setIsToggleAllCompleted,
    setIsToggleAllUnCompleted,
  } = useContext(ContextToggleAll);

  const isAllCompleted = [...todos].every((todo) => todo.completed);

  const changedTodoOnServer = async (isCompleted: boolean, todoId: number) => {
    try {
      await changedTodo(todoId, null, isCompleted);
      setTodos(currentTodos => [...currentTodos].map((todo) => {
        if (todo.id === todoId) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      }));
    } catch {
      setTextError(ErrorType.PATCH);
    } finally {
      if (isCompleted) {
        setIsToggleAllUnCompleted(false);
      } else {
        setIsToggleAllCompleted(false);
      }
    }
  };

  const createTodoOnServer = async () => {
    const newTodo = {
      id: +(new Date()),
      title: newTodoTitle,
      completed: false,
      userId,
    };

    try {
      await createNewTodo(newTodoTitle, userId);
      setTodos((curentTodos) => [...curentTodos, newTodo]);
    } catch {
      setTextError(ErrorType.POST);
    } finally {
      setIsAddingTodo(false);
      setNewTodoTitle('');
    }
  };

  const handlerFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAddingTodo(true);

    if (!newTodoTitle) {
      setIsAddingTodo(false);

      return;
    }

    setTitle(newTodoTitle);
    createTodoOnServer();
  };

  const handlerToggleAllClick = () => {
    if (unCompletedTodos.length === 0) {
      setIsToggleAllCompleted(true);
      [...todos].forEach((todo) => changedTodoOnServer(false, todo.id));
    }

    unCompletedTodos.forEach(todo => {
      setIsToggleAllUnCompleted(true);
      changedTodoOnServer(true, todo.id);
    });
  };

  return (
    <header className="header">
      <form onSubmit={handlerFormSubmit}>
        <label htmlFor="header__toggle-all">
          <input
            type="checkbox"
            id="toggle-all"
            className={classNames(
              'header__toggle-all',
              { active: isAllCompleted },
            )}
            data-cy="toggleAll"
            onClick={handlerToggleAllClick}
          />
        </label>

        <input
          type="text"
          data-cy="createTodo"
          className="header__input-new-todo"
          placeholder="What needs to be done?"
          value={newTodoTitle}
          onChange={({ target }) => setNewTodoTitle(target.value)}
          disabled={isAddingTodo}
        />
      </form>
    </header>
  );
});
