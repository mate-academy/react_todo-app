import classNames from 'classnames';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../hooks/LocalStorage';
import { Status } from '../types/Status';
import { Todo } from '../types/Todo';
import { TodoFilter } from './TodoFilter';
import { TodoList } from './TodoList';

export const TodoApp = () => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const location = useLocation();
  const newTodoField = React.useRef<HTMLInputElement>(null);
  const toggleInput = React.useRef<HTMLInputElement>(null);

  const handleNewTodoKeyDown = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const val = newTodoField.current?.value;

    if (!val) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: val,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    newTodoField.current.value = '';
  };

  const handleToggleAll = () => {
    const toggleAll = toggleInput.current?.classList.contains('active');
    const todosToToggle = toggleAll
      ? todos
      : todos.filter(todo => !todo.completed);

    setTodos(
      todosToToggle.map((todo) => ({
        ...todo,
        completed: !todo.completed,
      })),
    );
  };

  const handleClearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handleDelete = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const handleEdit = (todoId: number, title: string) => {
    setTodos(todos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          title,
        };
      }

      return todo;
    }));
  };

  const handleComplete = (todoId: number) => {
    setTodos(todos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    }));
  };

  const filteredTodos = React.useMemo(() => {
    return todos.filter(todo => {
      switch (location.pathname) {
        case Status.Active:
          return !todo.completed;

        case Status.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [todos, location]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleNewTodoKeyDown}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            ref={newTodoField}
          />
        </form>
      </header>

      {!!todos.length && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className={classNames(
                'toggle-all',
                { active: todos.every(todo => todo.completed) },
              )}
              data-cy="toggleAll"
              ref={toggleInput}
              onClick={handleToggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <TodoList
              items={filteredTodos}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              handleComplete={handleComplete}
            />
          </section>

          <TodoFilter
            items={filteredTodos}
            handleClearCompleted={handleClearCompleted}
          />
        </>
      )}
    </div>
  );
};
