import React, { useState } from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { TodosContext } from './TodosContext';
import { Todo } from './types/Todo';
import { Status } from './types/Status';
import { useLocalStorage } from './hooks/useLocalStorage';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const [status, setStatus] = useState(Status.all);
  const [value, setValue] = useState('');

  const isAllCompleted = todos.every((todo: Todo) => todo.completed);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (value.trim()) {
      setTodos([
        ...todos,
        {
          id: +new Date(),
          title: value.trim(),
          completed: false,
        },
      ]);

      setValue('');
    }
  };

  const handleAllCheckboxes = () => {
    setTodos(todos.map((todo: Todo) => ({
      ...todo,
      completed: !isAllCompleted,
    })));
  };

  return (
    <div className="todoapp">
      <TodosContext.Provider
        value={{
          todos, setTodos, status, setStatus,
        }}
      >
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </form>
        </header>
        <section className="main">
          {!!todos.length
            && (
              <>
                <input
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                  data-cy="toggleAll"
                  checked={isAllCompleted}
                  onChange={handleAllCheckboxes}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
              </>
            )}
          {!!todos.length && <TodoList />}

        </section>

        {!!todos.length && <TodosFilter />}

      </TodosContext.Provider>
    </div>
  );
};
