import { FC, FormEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';

const useLocalStorage = (key: string, initialValue: Todo[]) => {
  const [value, setValue] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(key) || '') || initialValue;
    } catch {
      return initialValue;
    }
  });

  const save = (value1: Todo[]) => {
    setValue(value1);
    localStorage.setItem(key, JSON.stringify(value1));
  };

  return [value, save];
};

export const TodoApp: FC = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(true);
  const path = useLocation();

  let visibleTodos: Todo[] = todos;

  switch (path.pathname) {
    case '/active':
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
      break;

    case '/completed':
      visibleTodos = visibleTodos.filter(todo => todo.completed);
      break;

    default:
      break;
  }

  const addTodo = (newTitle: string) => {
    const newTodo: Todo = {
      id: +new Date(),
      title: newTitle.trim(),
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (todoId: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== todoId));
  };

  const editTodo = (todoId: number, todoTitle: string) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        title: todoTitle,
      };
    }));
  };

  const editTodoStatus = (todoId: number, todoStatus: boolean) => {
    setTodos(todos.map((todo: Todo) => {
      if (todo.id !== todoId) {
        return todo;
      }

      return {
        ...todo,
        completed: !todoStatus,
      };
    }));
  };

  const clearAllCompleted = () => {
    setTodos(todos
      .filter((todo: Todo) => todo.completed !== true));
  };

  const changeAllCompleted = () => {
    setTodos(todos.map((todo: Todo) => {
      return {
        ...todo,
        completed,
      };
    }));
  };

  const todosLeft = todos
    .filter((todo: Todo) => !todo.completed);
  const completedTodo = todos
    .some((todo: Todo) => todo.completed);
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setTitle('');

      return;
    }

    addTodo(title);
    setTitle('');
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            onBlur={onSubmit}
          />
        </form>
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={() => {
                changeAllCompleted();
                setCompleted(!completed);
              }}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              todos={visibleTodos}
              onDelete={deleteTodo}
              onEdit={editTodo}
              onChangeStatus={editTodoStatus}
            />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${todosLeft.length} items left`}
            </span>
            <TodoFilter />
            {completedTodo && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearAllCompleted}
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
