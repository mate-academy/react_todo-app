import {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Status } from '../type/Status';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

interface Todo {
  id: number,
  title: string,
  completed: boolean,
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const save: SetValue<T> = (values) => {
    localStorage.setItem(key, JSON.stringify(values));
    setValue(values);
  };

  return [value, save];
}

export const TodoApp = () => {
  const location = useLocation();
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [allCompleted, setAllCompleted] = useState(false);
  const [filteredTodo, setFilteredTodo] = useState<Todo[]>(todos);
  const [status, setStatus] = useState<Status>(Status.ALL);
  const activeTotos = todos.filter(todo => !todo.completed);
  const findCompleted = todos.some(todo => todo.completed);

  useEffect(() => {
    const pathname = location.pathname.replace('/', '');

    if (pathname) {
      setStatus(pathname === 'completed' ? Status.COMPLETED : Status.ACTIVE);
    }
  }, []);

  const newTodo: Todo = {
    id: +new Date(),
    title,
    completed: false,
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title.length > 0) {
      setTodos((prev) => [...prev, newTodo]);
      setTitle('');
    }
  };

  const editTodo = (value: string, todoId: number) => {
    let todoList;

    if (value) {
      todoList = todos.map((todo) => {
        if (todoId === todo.id) {
          return { ...todo, title: value };
        }

        return todo;
      });
    } else {
      todoList = todos.filter((todo) => todo.id !== todoId);
    }

    setTodos(todoList);
  };

  const filterByStatus = () => {
    let copyTodos: Todo[] = todos;

    if (status === Status.ACTIVE) {
      copyTodos = activeTotos;
    }

    if (status === Status.COMPLETED) {
      copyTodos = copyTodos.filter(todo => todo.completed);
    }

    setFilteredTodo(copyTodos);
  };

  useEffect(() => {
    filterByStatus();
  }, [status, todos]);

  const onAllToggle = () => {
    const tagAll = todos.map(todo => (
      { ...todo, completed: !allCompleted }));

    setAllCompleted(!allCompleted);
    setTodos(tagAll);
  };

  const onClick = (todoId: number) => {
    const filterTodos = todos.map(todo => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    setTodos(filterTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addTodo}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </form>
      </header>

      {todos.length !== 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={onAllToggle}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              items={filteredTodo}
              onClick={onClick}
              editTodo={editTodo}
            />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${activeTotos.length} items left`}
            </span>

            <TodosFilter
              setStatus={setStatus}
            />

            {findCompleted && (
              <button
                type="button"
                className="clear-completed"
                onClick={() => setTodos(activeTotos)}
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
