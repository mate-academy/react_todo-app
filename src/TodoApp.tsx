/* eslint-disable no-console */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Status, Todo } from './type';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodosFilter';

function useLocalStorage() {
  const todosFromLocal = localStorage.getItem('todos');

  try {
    return todosFromLocal ? JSON.parse(todosFromLocal) : [];
  } catch (error) {
    return [];
  }
}

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(useLocalStorage);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState('');
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const remove = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const changeStatus = (todo: Todo) => {
    const { id, completed } = todo;
    const indexFound = todos.findIndex(item => item.id === id);

    const callBack = (prev: Todo[], item: Todo, index: number): Todo[] => {
      if (index === indexFound) {
        prev.push({ ...item, completed: !completed });
      } else {
        prev.push(item);
      }

      return prev;
    };

    const newTodos = todos.reduce(callBack, []);

    setTodos(newTodos);
  };

  const changeTitle = (todo: Todo, newTitle: string) => {
    const { id } = todo;
    const indexFound = todos.findIndex(item => item.id === id);

    const callBack = (prev: Todo[], item: Todo, index: number): Todo[] => {
      if (index === indexFound) {
        prev.push({ ...item, title: newTitle });
      } else {
        prev.push(item);
      }

      return prev;
    };

    const newTodos = todos.reduce(callBack, []);

    setTodos(newTodos);
  };

  const toggleAll = () => {
    const hasUncompletedTodo = todos.some(todo => todo.completed === false);

    if (hasUncompletedTodo) {
      setTodos(todos.map(todo => ({ ...todo, completed: true })));
    } else {
      setTodos(todos.map(todo => ({ ...todo, completed: false })));
    }
  };

  const uncompletedTodos: Todo[] = todos
    .filter(todo => todo.completed === false);

  const addTodo = (todoToAdd: Todo) => {
    const newTodo: Todo = {
      id: todoToAdd.id,
      title: todoToAdd.title,
      completed: todoToAdd.completed,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    addTodo(newTodo);

    setTitle('');
  }

  const clearCompleted = () => {
    setTodos(todos.filter(todo => todo.completed === false));
  };

  useEffect(() => {
    switch (location.pathname) {
      case Status.ALL:
        setVisibleTodos(todos);
        break;

      case Status.ACTIVE:
        setVisibleTodos(todos.filter(todo => todo.completed === false));
        break;

      case Status.COMPLETED:
        setVisibleTodos(todos.filter(todo => todo.completed === true));
        break;

      default:
        break;
    }
  }, [todos, location.pathname]);

  const hasCompleted = todos.some(todo => todo.completed === true);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={handleSubmit}
        >
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

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onChange={() => toggleAll()}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={visibleTodos}
          onRemove={remove}
          onChangeStatus={changeStatus}
          onChangeTitle={changeTitle}
        />

        {todos.length > 0 && (
          <TodoFilter
            quantity={uncompletedTodos.length}
            hasCompleted={hasCompleted}
            onClearCompleted={clearCompleted}
          />
        )}
      </section>
    </div>
  );
};
