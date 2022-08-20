import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import { TodoList } from '../../components/TodoList';
import { TodosFilter } from '../../components/TodosFilter';

import { useAppDispatch, useAppSelector } from '../../app/hooks';

import {
  addTodo, removeTodo, updateTodo, todosSelector,
} from './todoPageSlice';

import {
  convertToHumanReadableCount,
} from '../../utils/ConvertToHumanReadableCount';

import TodoStatus from '../../enums/TodoStatus';
import LoadingStatus from '../../enums/LoadingStatus';

import { USER_ID } from '../../api/axios';
import { Loader } from '../../components/Loader';
import { Toast } from '../Toast';
import { isToastShown, showToast } from '../Toast/toastSlice';

export const TodoPage: React.FC = () => {
  const { status } = useParams();

  const dispatch = useAppDispatch();
  const { todos, status: todosStatus } = useAppSelector(todosSelector);
  const toastShown = useAppSelector(isToastShown);

  const loading = todosStatus === LoadingStatus.Loading;
  const isError = todosStatus === LoadingStatus.Failed;

  const completedTodosAmount = useMemo(() => {
    return todos.reduce((sum, curr) => (
      curr.completed ? sum + 1 : sum
    ), 0);
  }, [todos]);
  const isAllCompleted = completedTodosAmount === todos.length;

  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [appliedLoading, setAppliedLoading] = useState(false);

  useEffect(() => {
    if (isError) {
      dispatch(showToast());
    }
  }, [isError]);

  useEffect(() => {
    const timer = setTimeout(() => setAppliedLoading(loading), 500);

    return () => clearTimeout(timer);
  }, [loading]);

  const createTodo = () => {
    if (newTodoTitle === '') {
      return;
    }

    dispatch(addTodo({
      title: newTodoTitle,
      userId: USER_ID,
      completed: false,
    }));

    setNewTodoTitle('');
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTodo();
    }
  };

  const handleCompletedTodosSelector = () => {
    todos.forEach(todo => {
      if (todo.completed === !isAllCompleted) {
        return;
      }

      dispatch(updateTodo({
        id: todo.id,
        completed: !isAllCompleted,
      }));
    });
  };

  const handleClearButton = () => {
    todos.forEach(todo => {
      if (!todo.completed) {
        return;
      }

      dispatch(removeTodo(todo.id));
    });
  };

  const prepareTodos = () => {
    switch (status) {
      case TodoStatus.Active: {
        return todos.filter(todo => !todo.completed);
      }

      case TodoStatus.Completed: {
        return todos.filter(todo => todo.completed);
      }

      default:
        return todos;
    }
  };

  const preparedTodos = prepareTodos();

  return (
    <>
      <Loader visible={appliedLoading} />

      {toastShown && (
        <Toast>
          An error occurred while loading todos
        </Toast>
      )}

      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={event => event.preventDefault()}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={({ target }) => setNewTodoTitle(target.value)}
              onKeyDown={handleInputKeyDown}
              onBlur={createTodo}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <>
            <section className="main">
              <input
                type="checkbox"
                id="toggle-all"
                checked={isAllCompleted}
                className="toggle-all"
                onChange={handleCompletedTodosSelector}
                data-cy="toggleAll"
              />

              <label htmlFor="toggle-all">Mark all as complete</label>

              <TodoList todos={preparedTodos} />
            </section>

            <footer className="footer">
              <span className="todo-count" data-cy="todosCounter">
                {`${convertToHumanReadableCount(
                  todos.length - completedTodosAmount,
                  'item',
                )} left`}
              </span>

              <TodosFilter />

              {completedTodosAmount > 0 && (
                <button
                  type="button"
                  className="clear-completed"
                  onClick={handleClearButton}
                >
                  Clear completed
                </button>
              )}
            </footer>
          </>
        )}
      </div>
    </>
  );
};
