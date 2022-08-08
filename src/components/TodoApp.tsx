import React from 'react';
import { useLocation } from 'react-router-dom';
import { useLocaleStorage } from './hooks/useLocaleStorage';
import { Todo } from '../types/Todo';
import { CreateTodoForm } from './CreateTodoForm';
import { TodoList } from './TodoList';
import { TodoFilter } from './TodoFilter';

export const TodoApp: React.FC = () => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);

  const counter = todos.reduce((prev, cur) => prev + Number(cur.completed), 0);

  const handleClick = () => setTodos(todos.filter(todo => !todo.completed));

  const location = useLocation();
  const path = location.pathname;

  const visibleTodos = todos.filter(todo => {
    switch (path) {
      case '/completed':
        return todo.completed;

      case '/active':
        return !todo.completed;

      default:
        return todo;
    }
  });

  return (
    <div className="todoapp">
      <section className="header">
        <h1>Todos</h1>

        <CreateTodoForm todos={todos} onSetTodos={setTodos} />
      </section>

      <section className="main">
        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          onSetTodos={setTodos}
        />

      </section>

      <section className="footer">
        <span className="todo-count" data-cy="todosCounter">
          {`${counter} items left`}
        </span>

        <TodoFilter path={path} />

        {counter > 0 && (
          <button
            type="button"
            className="clear-completed"
            onClick={handleClick}
          >
            Clear completed
          </button>
        )}
      </section>
    </div>
  );
};
