import React, { useEffect, useState } from 'react';

import { TodoList } from '../TodoList/TodoList';
import { TodoFilter } from '../TodoFilter/TodoFilter';
import { Todo } from '../../types/Todo/Todo';
import { useTodo } from '../../context/TodoProvider';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCount, setActiveCount] = useState(0);
  const [allCompletedTodo, setAllCompletedTodo] = useState(false);

  const {
    todosOriginal,
    setTodosOriginal,
    todos,
    setTodos,

    all,
    active,
    completedTodo,
  } = useTodo();

  useEffect(() => {
    if (todosOriginal) {
      const countActiveTodo
        = todosOriginal.filter(todo => !todo.completed).length;

      if (activeCount === 0) {
        setAllCompletedTodo(true);
      } else {
        setAllCompletedTodo(false);
      }

      setActiveCount(countActiveTodo);
    } else {
      setActiveCount(0);
      setAllCompletedTodo(false);
    }
  });

  const addTodo = (
    event: React.FormEvent<HTMLFormElement>,
    text: string,
  ) => {
    event.preventDefault();

    if (text.length) {
      const deal = {
        id: +new Date(),
        title: text,
        completed: false,
      };

      if (todosOriginal) {
        setTodosOriginal([...todosOriginal, deal]);
        setTodos([...todosOriginal, deal]);
      } else {
        setTodosOriginal([deal]);
        setTodos([deal]);
      }

      setQuery('');
    }
  };

  const deleteCompleted = () => {
    const activeTodo: Todo[] = [];

    todosOriginal?.forEach(element => {
      if (!element.completed) {
        activeTodo.push(element);
      }
    });

    setAllCompletedTodo(false);
    setTodosOriginal(activeTodo);
    setTodos(activeTodo);
  };

  const toggleAllHandler = () => {
    const newTodos: Todo[] | undefined = [];

    todosOriginal?.forEach(el => {
      const { id, title } = el;

      if (!allCompletedTodo) {
        newTodos.push({ id, title, completed: true });
      } else {
        newTodos.push({ id, title, completed: false });
      }
    });

    setAllCompletedTodo(!allCompletedTodo);
    setTodosOriginal(newTodos);
    setTodos(newTodos);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form
          onSubmit={(event) => addTodo(event, query)}
        >
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        {(todosOriginal && todosOriginal.length > 0) && (
          <>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={() => toggleAllHandler()}
              checked={allCompletedTodo}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>
          </>
        )}

        {todos && (
          <TodoList todos={todos} />
        )}
      </section>

      {(todosOriginal && todosOriginal.length > 0) && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeCount} item${activeCount > 0 ? 's' : ''} left`}
          </span>

          <TodoFilter
            all={all}
            active={active}
            completedTodo={completedTodo}
          />

          {activeCount < todosOriginal.length && (
            <button
              type="button"
              className="clear-completed"
              onClick={deleteCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
