import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../../types/types';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import { TodoForm } from '../TodoForm/TodoForm';
import { TodosList } from '../TodosList/TodosList';

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
  const [count, setCount] = useState(0);

  enum FilterTypes {
    Active = '/active',
    Completed = '/completed',
  }
  const [userName, setUserName] = useState('');

  async function getUser() {
    try {
      const result = await fetch(
        'https://mate.academy/students-api/users/1', {
          method: 'GET',
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (result.status !== 200) {
        throw new Error(`Error ${result.status}`);
      }

      const response = await result.json();

      return setUserName(response.name);
    } catch (err) {
      throw new Error('An error occured');
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
    setCount(prev => prev + 1);
    if (count % 2 === 0) {
      setTodos(
        todos.map((todo: Todo) => {
          return {
            ...todo,
            completed: true,
          };
        }),
      );
      setVisibleTodos(
        todos.map((todo: Todo) => {
          return {
            ...todo,
            completed: true,
          };
        }),
      );
    } else {
      setTodos(
        todos.map((todo: Todo) => {
          return {
            ...todo,
            completed: false,
          };
        }),
      );
      setVisibleTodos(
        todos.map((todo: Todo) => {
          return {
            ...todo,
            completed: false,
          };
        }),
      );
    }

    if (count === 1) {
      setCount(0);
    }
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>
          {userName || 'todos'}
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
            <label htmlFor="completed" onClick={completeAll} aria-hidden>
              Mark all as complete
            </label>
            <TodosList
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
              <TodosFilter
                link="/"
                title="All"
              />
              <TodosFilter
                link="/completed"
                title="Completed"
              />
              <TodosFilter
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
