import React, { FC, useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { FilterStatus } from '../types/Status';
import { useLocaleStorage } from '../hooks/useLocaleStorage';
import { TodoItem } from './TodoItem';

export const TodoApp: FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [todoTitle, setTodoTitle] = useState('');
  const { pathname } = useLocation();

  const notCompletedTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.length - notCompletedTodos.length;

  const toggleTodoStatus = useCallback((todoId: number) => {
    setTodos(
      todos.map(todo => {
        if (todo.id === todoId) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    );
  },
  [todos]);

  const removeTodo = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
  };

  const changeTodoTitle = (newTitle: string, todoId: number) => {
    if (!newTitle.length) {
      setTodos(
        todos.filter(todo => todo.id !== todoId),
      );

      return;
    }

    setTodos(todos.map(todo => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: newTitle,
        };
      }

      return todo;
    }));
  };

  const toggleAll = () => {
    const setAllCallback = (currentTodos: Todo[], value: boolean) => {
      return currentTodos.map(todo => ({ ...todo, completed: value }));
    };

    if (!notCompletedTodos.length) {
      setTodos(setAllCallback(todos, false));
    } else {
      setTodos(setAllCallback(todos, true));
    }
  };

  const removeAllCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const handlerSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoTitle) {
      const newTodo = {
        id: +new Date(),
        title: todoTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
    }
  };

  const filteredTodos = todos.filter(todo => {
    switch (pathname) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        return true;
    }
  });

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handlerSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            value={todoTitle}
            placeholder="What needs to be done?"
            onChange={(event) => setTodoTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          onClick={toggleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList>
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              changeToggleStatus={toggleTodoStatus}
              removeTodo={removeTodo}
              changeTodoTitle={changeTodoTitle}
            />
          ))}
        </TodoList>
      </section>
      {todos.length !== 0 && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${notCompletedTodos.length} items left`}
          </span>

          <TodosFilter />
          {completedTodos > 0 && (
            <button
              type="button"
              className="clear-completed"
              onClick={removeAllCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
