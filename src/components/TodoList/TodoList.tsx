import React, {
  useEffect, useContext, useState, useMemo, useCallback,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { Context } from '../context';

import { getTodos, editTodos } from '../../api';
import { TodoItem } from '../TodoItem';
import { Todo } from '../../types/Todo';

export const TodoList: React.FC = () => {
  const {
    todos,
    setTodos,
    user,
    setLoaderTodos,
    error,
  } = useContext(Context);
  const [loaderToggleAll, setLoaderToggleAll] = useState(false);
  const [renedrTodos, setrenedrTodos] = useState(todos);

  const [searchParams] = useSearchParams();
  const sort = searchParams.get('sort');

  useEffect(() => {
    if (user) {
      getTodos(`${user.id}`)
        .then((todosList) => {
          setTodos(todosList);
        })
        .catch(() => {
          error('Server no responding');
        });
    }
  }, [user]);

  useMemo(() => {
    setrenedrTodos(todos.filter(todo => {
      if (sort === 'active') {
        return !todo.completed;
      }

      if (sort === 'completed') {
        return todo.completed;
      }

      return true;
    }));
  }, [sort, todos]);

  const toggleAll = useCallback((setCompleted: boolean, todo: Todo) => {
    setLoaderTodos((todoIdinLoader) => [...todoIdinLoader, todo.id]);
    setLoaderToggleAll(true);
    editTodos(todo.id, {
      completed: setCompleted,
    })
      .then(() => {
        setTodos([...todos.map(todoItem => (
          {
            ...todoItem,
            completed: setCompleted,
          }
        ))]);
        setLoaderTodos([]);
        setLoaderToggleAll(false);
      })
      .catch(() => {
        setLoaderTodos([]);
        setLoaderToggleAll(false);
        error('Server error');
      });
  }, [todos]);

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className={classNames(
          'toggle-all',
          { 'toggle-all--loading': loaderToggleAll },
        )}
        disabled={loaderToggleAll}
        data-cy="toggleAll"
        onClick={() => {
          if (todos.some(todo => todo.completed === false)) {
            todos.forEach(todo => {
              if (todo.completed === false) {
                toggleAll(true, todo);
              }
            });
          } else {
            todos.forEach(todo => {
              toggleAll(false, todo);
            });
          }
        }}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {renedrTodos.map(todo => {
          return (
            <li key={todo.id}>
              <TodoItem todo={todo} />
            </li>
          );
        })}
      </ul>
    </section>
  );
};
