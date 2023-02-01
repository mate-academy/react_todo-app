/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/types';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodoList } from '../TodoList/TodoList';

const useLocalStorage = (key: string, initialValue: []) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || initialValue,
  );

  const save = (saveValue: []) => {
    setValue(saveValue);

    localStorage.setItem('todos', JSON.stringify(saveValue));
  };

  if (typeof value === 'object') {
    return [value, save];
  }

  return [JSON.parse(value), save];
};

export const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [isToggled, setIsToggled] = useState(false);
  const { pathname } = useLocation();
  const activeTodos = todos.filter((todo: Todo) => !todo.completed);
  const completedTodos = todos.filter((todo: Todo) => todo.completed);

  enum FilterTypes {
    Active = '/active',
    Completed = '/completed',
  }
  const [userName, setUserName] = useState('');

  async function getUser() {
    try {
      const result = await fetch(
        'https://mate.academy/students-api/users/6057', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (result.status !== 200) {
        return console.error(result.status);
      }

      const response = await result.json();

      return setUserName(response.name);
    } catch (err) {
      return console.error(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    switch (pathname) {
      case FilterTypes.Active:
        return setVisibleTodos(activeTodos);
      case FilterTypes.Completed:
        return setVisibleTodos(completedTodos);
      default:
        return setVisibleTodos(todos);
    }
  }, [pathname, isToggled]);

  const deleteCompleted = () => {
    setTodos(activeTodos);
    setVisibleTodos(activeTodos);
  };

  const completeAll = () => {
    setTodos(
      todos.map((todo: Todo) => {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    );
    setVisibleTodos(
      todos.map((todo: Todo) => {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    );
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>
          {`${userName} todos`}
        </h1>
        <TodoForm
          todos={todos}
          setTodos={setTodos}
          setVisibleTodos={setVisibleTodos}
          setIsToggled={setIsToggled}
          isToggled={isToggled}
        />
      </header>
      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
            />
            <label onClick={completeAll}>
              Mark all as complete
            </label>

            <TodoList
              visibleTodos={visibleTodos}
              setTodos={setTodos}
              todos={todos}
              setVisibleTodos={setVisibleTodos}
              setIsToggled={setIsToggled}
              isToggled={isToggled}
            />
          </section>
          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTodos.length} ${activeTodos.length !== 1 ? 'items' : 'item'} left`}
            </span>

            <ul className="filters">
              <TodoFilter
                link="/"
                title="All"
              />
              <TodoFilter
                link="/completed"
                title="Completed"
              />
              <TodoFilter
                link="/active"
                title="Active"
              />
            </ul>
            {completedTodos.length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={deleteCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>

        </>
      )}
    </div>
  );
};
