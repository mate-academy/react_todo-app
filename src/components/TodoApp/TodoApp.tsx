import { useEffect, useRef, useState } from 'react';
import { Todo } from '../../types/Todo';
import { TodoList } from '../TodoList/TodoList';
import { TodoFilter } from '../TodoFilter/TodoFilter';

export const TodoApp: React.FC = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos]
    = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));

  const inputField = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputField.current) {
      inputField.current.focus();
    }
  }, []);

  const activeTodosNumber = todos.filter(todo => !todo.completed).length;
  const isTodosExist = !!todos.length;
  const isCompletedExist = !!todos.filter(todo => todo.completed).length;
  const isAllCompleted = todos.every(todo => todo.completed);

  const saveTodos = (newTodos: Todo[]) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const handleAddTodo = () => {
    const todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    saveTodos([...todos, todo]);
    setTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddTodo();
  };

  const handleClearCompleted = () => {
    const result = todos.filter(todo => !todo.completed);

    saveTodos(result);
  };

  const handleCompleteAll = () => {
    let result;

    if (isAllCompleted) {
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

  const handleStatusToggle = (id: number) => {
    const result = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }

      return todo;
    });

    saveTodos(result);
  };

  const handleTodoDelete = (id: number) => {
    const result = todos.filter(todo => todo.id !== id);

    saveTodos(result);
  };

  const handleEditing = (
    updatedTitle: string,
    id: number,
    callback: (arg: boolean) => void,
  ) => {
    if (!updatedTitle.trim()) {
      handleTodoDelete(id);

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
            ref={inputField}
            placeholder="What needs to be done?"
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          data-cy="toggleAll"
          checked={isAllCompleted}
          onChange={handleCompleteAll}
        />
        {isTodosExist && (
          <label htmlFor="toggle-all">Mark all as complete</label>
        )}

        <TodoList
          todos={todos}
          handleTodoDelete={handleTodoDelete}
          handleStatusToggle={handleStatusToggle}
          handleEditing={handleEditing}
        />
      </section>

      {isTodosExist && (
        <footer className="footer">
          <span className="todo-count" data-cy="todosCounter">
            {`${activeTodosNumber} items left`}
          </span>

          <TodoFilter />

          {isCompletedExist && (
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
