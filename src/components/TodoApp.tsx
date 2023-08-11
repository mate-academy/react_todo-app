import {
  useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import { TodoList } from './TodoList';
import { TodosContext } from './TodosContext';
import { TodosFilter } from './TodosFilter';

export const TodoApp = () => {
  const {
    todos, setTodos, isChecked, setIsChecked,
  } = useContext(TodosContext);
  const [todoTitle, setTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  const handleTodoSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = todoTitle.trim();

    if (!newTitle) {
      setTodoTitle('');

      return;
    }

    const newTodo = {
      id: +new Date(),
      title: newTitle,
      completed: false,
    };

    setTodos([
      newTodo,
      ...todos,
    ]);

    setTodoTitle('');
  };

  const handleCheckAllTodos = () => {
    setTodos(todos.map(item => ({
      ...item,
      completed: !isChecked,
    })));
    setIsChecked(!isChecked);
  };

  const uncompletedTodos = useMemo(() => {
    return todos.filter(item => !item.completed).length;
  }, [todos]);

  const completedTodos = useMemo(() => {
    return todos.filter(item => item.completed).length;
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(item => !item.completed));
    setIsChecked(false);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleTodoSubmit}>
          <input
            ref={inputRef}
            type="text"
            data-cy="createTodo"
            className="new-todo no-outline"
            placeholder="What needs to be done?"
            value={todoTitle}
            onChange={handleTitleChange}
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
              checked={isChecked}
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
