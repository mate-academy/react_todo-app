import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Status } from '../types/Status';
import { Todo } from '../types/ToDo';
import { useLocalStorage } from '../useLocalStorage';
import { TodoFilter } from './ToDoFilter';
import { TodoList } from './ToDoList';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const location = useLocation();

  const inputTextHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
  };

  const toggleAllHandler = (): void => {
    const completedTodos = todos.every(todo => todo.completed);

    setTodos(todos.map(todo => {
      if (completedTodos) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      if (!completedTodos) {
        return {
          ...todo,
          completed: true,
        };
      }

      return todo;
    }));
  };

  const completeHandler = (todoId: number): void => {
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

  const updateHandler = (todoId: number, newTitle: string): void => {
    setTodos(todos.map(todo => {
      if (todoId === todo.id) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    }));
  };

  const deleteHandler = (todoId: number): void => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const clearCompletedHandler = (): void => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const filteredTodos = todos.filter(todo => {
    switch (location.pathname) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return Status.All;
    }
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={inputTextHandler}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
            }}
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
              onClick={() => toggleAllHandler()}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
              deleteHandler={deleteHandler}
              completeHandler={completeHandler}
              updateHandler={updateHandler}
            />
          </section>

          <TodoFilter
            todos={todos}
            clearCompletedHandler={clearCompletedHandler}
          />
        </>
      )}
    </div>
  );
};
