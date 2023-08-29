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
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [value, setValue] = useState('');

  const isAllCompleted = todos.every((todo: Todo) => todo.completed);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.trim();

    setValue(newValue === '' ? '' : event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (value.length && event.key === 'Enter') {
      event.preventDefault();
      const newTodoTitle = value;

      setTodos([
        ...todos,
        {
          id: +new Date(),
          title: newTodoTitle,
          completed: false,
        },
      ]);

      setValue('');
    }
  };

  const handleAllCheckboxes = () => {
    if (isAllCompleted) {
      setIsAllChecked(false);
      setTodos(todos.map((todo: Todo) => ({
        ...todo,
        completed: false,
      })));
    } else {
      setIsAllChecked(!isAllChecked);
      setTodos(todos.map((todo: Todo) => ({
        ...todo,
        completed: !isAllChecked,
      })));
    }
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

          <form onSubmit={event => event.preventDefault()}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={value}
              onChange={handleInputChange}
              onKeyDown={handleInputKeyDown}
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
                  checked={isAllCompleted}
                  onChange={handleAllCheckboxes}
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
              </>
            )}
          {todos.length > 0 && <TodoList />}

        </section>

        {todos.length > 0 && <TodosFilter />}

      </TodosContext.Provider>
    </div>
  );
};
