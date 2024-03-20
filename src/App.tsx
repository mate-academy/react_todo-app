import React, { useContext, useEffect, useRef, useState } from 'react';
import { DispatchContext, Todo, TodosContext } from './store/Store';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';

export const App: React.FC = () => {
  const [input, setInput] = useState('');
  const dispatch = useContext(DispatchContext);
  const { todos, status } = useContext(TodosContext);
  const titleField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleField.current) {
      return titleField.current.focus();
    }
  }, []);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleAddTask = (title: string) => {
    if (title.trim() === '') {
      return;
    }

    dispatch({
      type: 'added',
      id: +new Date(),
      title: title,
    });
  };

  // eslint-disable-next-line max-len, prettier/prettier
  const handleKeyPress = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTask(input);
    setInput('');
  };

  const toggleAllTodos = (event: React.ChangeEvent<HTMLInputElement>) => {
    todos.forEach((todo: Todo) => {
      if (todo.completed !== event.target.checked) {
        dispatch({
          type: 'toggle',
          id: todo.id,
        });
      }
    });
  };

  const filterTodos = (currentTodos: Todo[], filter: string) => {
    const completed = currentTodos.filter((todo: Todo) => todo.completed);
    const active = currentTodos.filter((todo: Todo) => !todo.completed);

    if (filter === 'active') {
      return active;
    } else if (filter === 'completed') {
      return completed;
    } else {
      return currentTodos;
    }
  };

  const filteredTodos = filterTodos(todos, status);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleKeyPress}>
          <input
            ref={titleField}
            value={input}
            type="text"
            data-cy="createTodo"
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={handleTitleChange}
          />
        </form>
      </header>

      <section className="main">
        {todos.length > 0 && (
          <>
            <input
              checked={todos.every((todo: Todo) => todo.completed)}
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onChange={toggleAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
          </>
        )}
        <TodoList todos={filteredTodos} />
      </section>

      {todos.length > 0 && <TodosFilter />}
    </div>
  );
};
