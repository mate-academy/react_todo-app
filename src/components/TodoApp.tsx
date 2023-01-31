import { useEffect, useRef, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoList } from './TodoList';
import { TodosFilter } from './TodosFilter';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos]
    = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));

  const titleInputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (titleInputField.current) {
      titleInputField.current.focus();
    }
  }, []);

  const activeTodosCount = todos.filter(todo => !todo.completed).length;
  const hasTodos = !!todos.length;
  const hasCompleted = !!todos.filter(todo => todo.completed).length;
  const allCompleted = todos.every(todo => todo.completed);

  const saveTodos = (newTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleAdd = () => {
    const todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    saveTodos([...todos, todo]);
    setTitle('');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAdd();
  };

  const handleClearCompleted = () => {
    const result = todos.filter(todo => !todo.completed);

    saveTodos(result);
  };

  const handleCompleteAll = () => {
    let result;

    if (allCompleted) {
      result = todos.map(
        todo => ({ ...todo, completed: false }),
      );
    } else {
      result = todos.map(
        todo => ({ ...todo, completed: true }),
      );
    }

    saveTodos(result);
  };

  const handleStatusChange = (id: number) => {
    const result = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    saveTodos(result);
  };

  const handleDelete = (id: number) => {
    const result = todos.filter(t => t.id !== id);

    saveTodos(result);
  };

  const handleEditing = (
    updatedTitle: string,
    id: number,
    callback: (arg: boolean) => void,
  ) => {
    if (!updatedTitle.trim()) {
      handleDelete(id);

      return;
    }

    const result = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: updatedTitle.trim() };
      }

      return todo;
    });

    saveTodos(result);
    callback(false);
  };

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            data-cy="createTodo"
            className="new-todo"
            value={title}
            ref={titleInputField}
            placeholder="What needs to be done?"
            onChange={e => setTitle(e.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={allCompleted}
          onChange={handleCompleteAll}
        />
        {hasTodos && (
          <label htmlFor="toggle-all">Mark all as complete</label>
        )}

        <TodoList
          todos={todos}
          handleDelete={handleDelete}
          handleStatusChange={handleStatusChange}
          handleEditing={handleEditing}
        />
      </section>

      {hasTodos && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodosCount} items left`}
          </span>

          <TodosFilter />

          {hasCompleted && (
            <button
              type="button"
              className="clear-completed"
              onClick={handleClearCompleted}
            >
              Clear completed
            </button>
          )}
        </footer>
      )}
    </div>
  );
};
