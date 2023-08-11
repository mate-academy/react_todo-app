import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';
import { useTodo } from '../hooks/useTodo';

export const TodoApp = () => {
  const {
    todos, setTodos, isChecked, setIsChecked,
  } = useTodo();

  const [newTodoTitle, setNewTodoTitle] = useState('');

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodoTitle(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newTitle = newTodoTitle.trim();

    if (!newTitle) {
      setNewTodoTitle('');

      return;
    }

    const newTodo = {
      id: +new Date(),
      title: (newTitle),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setNewTodoTitle('');
  };

  const handleCheckedAllTodos = () => {
    setTodos(todos.map(todo => ({
      ...todo,
      completed: !isChecked,
    })));
    setIsChecked(!isChecked);
  };

  const uncompletedTodosCounter = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  const completedTodosCounter = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);

  const clearCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
    setIsChecked(false);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={newTodoTitle}
            onChange={handleTitleChange}
            data-cy="createTodo"
            className="new-todo no-outline"
            placeholder="What needs to be done?"
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
              onChange={handleCheckedAllTodos}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList />
          </section>

          <footer className="footer">
            <span className="todo-count" data-cy="todosCounter">
              {`${uncompletedTodosCounter} item${uncompletedTodosCounter === 1 ? '' : 's'} left`}
            </span>

            <TodosFilter />

            {completedTodosCounter > 0 && (
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
