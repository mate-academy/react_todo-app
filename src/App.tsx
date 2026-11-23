/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodoContext = createContext<TodoContextType | null>(null);

const TodoApp: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoApp must be used within TodoContext.Provider');
  }

  const { todos, setTodos } = context;

  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const newTodoField = useRef<HTMLInputElement>(null);
  const editingTodoField = useRef<HTMLInputElement>(null);
  const isEditingCancelled = useRef(false);

  useEffect(() => {
    if (editingTodoId !== null) {
      editingTodoField.current?.focus();
    }
  }, [editingTodoId]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodo: Todo = {
      id: +new Date(),
      title: title.trim(),
      completed: false,
    };

    if (!newTodo.title) {
      return;
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
  };

  const activeTodos = todos.filter(todo => !todo.completed);

  const handleToggle = (id: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id));
    newTodoField.current?.focus();
  };

  const areAllCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  const handleToggleAll = () => {
    setTodos(currentTodos =>
      currentTodos.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      })),
    );
  };

  const handleClearCompleted = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
    newTodoField.current?.focus();
  };

  const handleEditSubmit = (id: number) => {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      handleDelete(id);

      return;
    }

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );

    setEditingTodoId(null);
  };

  const visibleTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${areAllCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          {/* Add a todo on form submit */}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              autoFocus
              value={title}
              onChange={event => setTitle(event.target.value)}
              ref={newTodoField}
            />
          </form>
        </header>

        <section className="todoapp__main" data-cy="TodoList">
          {visibleTodos.map(todo => (
            <div
              key={todo.id}
              data-cy="Todo"
              className={`todo ${todo.completed ? 'completed' : ''}`}
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
                <input
                  id={`todo-${todo.id}`}
                  data-cy="TodoStatus"
                  type="checkbox"
                  className="todo__status"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                />
              </label>

              {editingTodoId === todo.id ? (
                <input
                  data-cy="TodoTitleField"
                  ref={editingTodoField}
                  value={editingTitle}
                  onChange={event => setEditingTitle(event.target.value)}
                  onKeyUp={event => {
                    if (event.key === 'Enter') {
                      handleEditSubmit(todo.id);
                    }

                    if (event.key === 'Escape') {
                      isEditingCancelled.current = true;
                      setEditingTodoId(null);
                    }
                  }}
                  onBlur={() => {
                    if (!isEditingCancelled.current) {
                      handleEditSubmit(todo.id);
                    }

                    isEditingCancelled.current = false;
                  }}
                />
              ) : (
                <span
                  data-cy="TodoTitle"
                  className="todo__title"
                  onDoubleClick={() => {
                    isEditingCancelled.current = false;
                    setEditingTodoId(todo.id);
                    setEditingTitle(todo.title);
                  }}
                >
                  {todo.title}
                </span>
              )}

              {editingTodoId !== todo.id && (
                <button
                  type="button"
                  className="todo__remove"
                  data-cy="TodoDelete"
                  onClick={() => handleDelete(todo.id)}
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            {/* Active link should have the 'selected' class */}
            <nav className="filter" data-cy="Filter">
              <a
                href="#/"
                className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                data-cy="FilterLinkAll"
                onClick={() => setFilter('all')}
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

            {/* this button should be disabled if there are no completed todos */}
            <button
              type="button"
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
              disabled={todos.length === activeTodos.length}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    return JSON.parse(localStorage.getItem('todos') || '[]');
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      <TodoApp />
    </TodoContext.Provider>
  );
};
