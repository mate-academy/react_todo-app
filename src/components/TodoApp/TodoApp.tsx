import React, { useCallback, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useLocalStorage } from '../../customHooks/useLocalStorage';
import { Todo } from '../../types/Todo';
import { Footer } from '../Footer';
import { TodoList } from '../TodoList';

import './TodoApp.scss';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [todoTitle, setTodoTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const { status } = useParams();

  const setSingleTodoState = useCallback((value: boolean, todoId: number) => {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: value,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  }, [todos]);

  const setAllTodoState = useCallback((value: boolean) => {
    const newTodos = todos.map((todo: Todo) => {
      return {
        ...todo,
        completed: value,
      };
    });

    setTodos(newTodos);
    setCompleted(value);
  }, [todos]);

  // eslint-disable-next-line max-len
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const regex = /^\s*$/i;

    if (regex.test(todoTitle)) {
      return;
    }

    const newTodo = {
      id: +new Date(),
      title: todoTitle,
      completed: false,
    };

    const newTodos = [
      ...todos,
      newTodo,
    ];

    setTodos(newTodos);
    setTodoTitle('');
  }, [todoTitle]);

  const deleteTodo = useCallback((todoId: number) => {
    const newTodos = todos.filter(todo => todo.id !== todoId);

    setTodos(newTodos);
  }, [todos]);

  const clearCompletedTodo = useCallback(() => {
    const newTodos = todos.filter(todo => todo.completed === false);

    setTodos(newTodos);
  }, [todos]);

  const editTodo = useCallback((value: string, todoId: number) => {
    const newTodos = todos.map((todo: Todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: value,
        };
      }

      return todo;
    });

    setTodos(newTodos);
  }, [todos]);

  const activeTodosCount = useMemo(() => {
    return todos.filter(todo => todo.completed === false).length;
  }, [todos]);

  const visibleTodos = useMemo(() => {
    switch (status) {
      case 'active':
        return todos.filter(todo => todo.completed === false);

      case 'completed':
        return todos.filter(todo => todo.completed === true);

      default:
        return todos;
    }
  }, [status, todos]);

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo todo-input"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={(event) => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        {todos.length > 0
        && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              checked={completed}
              onChange={(event) => setAllTodoState(event.target.checked)}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}

        <TodoList
          todos={visibleTodos}
          onChange={setSingleTodoState}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
      </section>

      {todos.length > 0
      && (
        <Footer
          onClear={clearCompletedTodo}
          onCount={activeTodosCount}
        />
      )}
    </>
  );
};
