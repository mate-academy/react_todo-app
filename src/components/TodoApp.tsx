import {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosContext';
import { TodosFilter } from './TodosFilter';

export const TodoApp = () => {
  const {
    todos, setTodos, checked, setChecked,
  } = useContext(TodosContext);
  const [newTodoValue, setNewTodoValue] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoValue(event.target.value);
  };

  const addNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoValue.trim()) {
      setNewTodoValue('');

      return;
    }

    const newTodo = {
      id: +new Date(),
      title: newTodoValue.trim(),
      completed: false,
    };

    setTodos([
      newTodo,
      ...todos,
    ]);

    setNewTodoValue('');
  };

  const handleCheckAllTodos = () => {
    setTodos(todos.map(item => ({
      ...item,
      completed: !checked,
    })));
    setChecked(!checked);
  };

  const uncompletedTodos = useMemo(() => {
    return todos.filter(item => !item.completed).length;
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(item => item.completed).length;
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(item => !item.completed));
    setChecked(false);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={addNewTodo}>
          <input
            ref={inputRef}
            type="text"
            data-cy="createTodo"
            className="new-todo no-outline"
            placeholder="What needs to be done?"
            value={newTodoValue}
            onChange={handleTodoChange}
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
              checked={checked}
              onChange={handleCheckAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${uncompletedTodos} item${uncompletedTodos === 1 ? '' : 's'} left`}
            </span>

            <TodosFilter />

            {completedTodos > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={clearCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        </>
      )}
    </div>
  );
};
