import { Todo } from './Todo';
import React, { useState, useEffect, FormEvent, useMemo } from 'react';
import './styles/todoapp.scss';
import './styles/todo.scss';
import './styles/filter.scss';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todosAreCompleted, setTodosAreCompleted] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [filter, setFilter] = useState<string>('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editedTodoTitle, setEditedTodoTitle] = useState<string>('');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos, todosAreCompleted]);

  useEffect(() => {
    const newTodoInput = document.querySelector(
      '.todoapp__new-todo',
    ) as HTMLInputElement;

    newTodoInput.focus();
    setTodosAreCompleted(
      todos.filter(td => td.completed).length === todos.length,
    );
  }, [todos, todosAreCompleted]);

  const addNewTodo = () => {
    const trimmedTitle = todoTitle.trim();

    if (trimmedTitle !== '') {
      const newTodo: Todo = {
        id: +new Date(),
        title: trimmedTitle,
        completed: false,
      };

      setTodos([...todos, newTodo]);

      setTodoTitle('');
    }
  };

  const deleteTodoById = (id: number) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);

    setTodos(updatedTodos);
  };

  const editTodoById = (id: number, newTitle: string) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }

      return todo;
    });

    setTodos(updatedTodos);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addNewTodo();
  };

  const remainingTodosCount = useMemo(
    () => todos.filter(todo => !todo.completed).length,
    [todos],
  );

  const handdleClick = () => {
    const incompleteTodosCount = todos.filter(todo => !todo.completed).length;

    if (incompleteTodosCount > 0) {
      const updatedTodos = todos.map(todo => ({ ...todo, completed: true }));

      setTodos(updatedTodos);
    } else {
      const updatedTodos = todos.map(todo => ({ ...todo, completed: false }));

      setTodos(updatedTodos);
    }
  };

  const handleDoubleClick = (id: number, title: string) => {
    setEditingTodoId(id);
    setEditedTodoTitle(title);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTodoTitle(event.target.value);
  };

  const saveEditedTodoTitle = (id: number) => {
    const trimmedTitle = editedTodoTitle.trim();

    if (!trimmedTitle) {
      deleteTodoById(id);
    } else {
      editTodoById(id, trimmedTitle);
    }

    setEditingTodoId(null);
  };

  const handleKeyPress = (
    event: React.KeyboardEvent<HTMLInputElement>,
    id: number,
  ) => {
    if (event.key === 'Enter') {
      saveEditedTodoTitle(id);
    } else if (event.key === 'Escape') {
      setEditingTodoId(null);
    }
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              onClick={handdleClick}
              className={`todoapp__toggle-all ${todosAreCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
            />
          )}

          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              value={todoTitle}
              onChange={event => setTodoTitle(event.target.value)}
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {filteredTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={todo.completed ? 'todo completed' : 'todo'}
            >
              <label className="todo__status-label">
                <input
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => {
                    const updatedTodo = { ...todo, completed: !todo.completed };
                    const updatedTodos = todos.map(t =>
                      t.id === todo.id ? updatedTodo : t,
                    );

                    setTodos(updatedTodos);
                  }}
                />
              </label>
              {editingTodoId === todo.id ? (
                <input
                  data-cy="TodoTitleField"
                  type="text"
                  className="todo__title-field"
                  value={editedTodoTitle}
                  onChange={handleTitleChange}
                  onBlur={() => saveEditedTodoTitle(todo.id)}
                  onKeyUp={event => handleKeyPress(event, todo.id)}
                  autoFocus
                />
              ) : (
                <>
                  <span
                    data-cy="TodoTitle"
                    className="todo__title"
                    onDoubleClick={() => handleDoubleClick(todo.id, todo.title)}
                  >
                    {todo.title}
                  </span>
                  <button
                    type="button"
                    className="todo__remove"
                    data-cy="TodoDelete"
                    onClick={() => deleteTodoById(todo.id)}
                    style={{
                      display: editingTodoId === todo.id ? 'none' : 'block',
                    }}
                  >
                    ×
                  </button>
                </>
              )}
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {remainingTodosCount}{' '}
              {remainingTodosCount === 1 ? 'item' : 'items'} left
            </span>
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${!filter ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('')}
              >
                All
              </a>

              <a
                href="#/active"
                className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                data-cy="FilterLinkActive"
                onClick={() => setFilter('active')}
              >
                Active
              </a>

              <a
                href="#/completed"
                className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                data-cy="FilterLinkCompleted"
                onClick={() => setFilter('completed')}
              >
                Completed
              </a>
            </nav>

            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={() => setTodos(todos.filter(todo => !todo.completed))}
              disabled={!todos.filter(todo => todo.completed).length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};
