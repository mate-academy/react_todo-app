/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const FilterType = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
} as const;

type FilterValue = (typeof FilterType)[keyof typeof FilterType];

export const TodoContext = createContext<TodoContextType | null>(null);

// Formulário para criar uma tarefa
type NewTodoProps = {
  newTodoField: React.RefObject<HTMLInputElement>;
};

const NewTodo: React.FC<NewTodoProps> = ({ newTodoField }) => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('NewTodo must be used within TodoContext.Provider');
  }

  const { setTodos } = context;
  const [title, setTitle] = useState('');

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

  return (
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
  );
};

// Uma tarefa individual
type TodoItemProps = {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState(todo.title);

  const editingTodoField = useRef<HTMLInputElement>(null);
  const isEditingCancelled = useRef(false);

  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoItem must be used within TodoContext.Provider');
  }

  const { setTodos } = context;

  useEffect(() => {
    if (isEditing) {
      editingTodoField.current?.focus();
    }
  }, [isEditing]);

  const handleEditSubmit = () => {
    const trimmedTitle = editingTitle.trim();

    if (!trimmedTitle) {
      onDelete(todo.id);

      return;
    }

    // Atualiza o título através do contexto
    setTodos(currentTodos =>
      currentTodos.map(currentTodo =>
        currentTodo.id === todo.id
          ? { ...currentTodo, title: trimmedTitle }
          : currentTodo,
      ),
    );

    setIsEditing(false);
  };

  return (
    <div
      data-cy="Todo"
      className={classNames('todo', {
        completed: todo.completed,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label" htmlFor={`todo-${todo.id}`}>
        <input
          id={`todo-${todo.id}`}
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />
      </label>

      {isEditing ? (
        <input
          data-cy="TodoTitleField"
          ref={editingTodoField}
          value={editingTitle}
          onChange={event => setEditingTitle(event.target.value)}
          onKeyUp={event => {
            if (event.key === 'Enter') {
              handleEditSubmit();
            }

            if (event.key === 'Escape') {
              isEditingCancelled.current = true;
              setIsEditing(false);
            }
          }}
          onBlur={() => {
            if (!isEditingCancelled.current) {
              handleEditSubmit();
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
            setEditingTitle(todo.title);
            setIsEditing(true);
          }}
        >
          {todo.title}
        </span>
      )}

      {!isEditing && (
        <button
          type="button"
          className="todo__remove"
          data-cy="TodoDelete"
          onClick={() => onDelete(todo.id)}
        >
          ×
        </button>
      )}
    </div>
  );
};

// Lista de tarefas
type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onDelete }) => {
  return (
    <section className="todoapp__main" data-cy="TodoList">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
};

// Filtros da lista
type FilterProps = {
  filter: FilterValue;
  onChange: (filter: FilterValue) => void;
};

const Filter: React.FC<FilterProps> = ({ filter, onChange }) => {
  return (
    <nav className="filter" data-cy="Filter">
      <a
        href="#/"
        className={classNames('filter__link', {
          selected: filter === FilterType.ALL,
        })}
        data-cy="FilterLinkAll"
        onClick={() => onChange(FilterType.ALL)}
      >
        All
      </a>

      <a
        href="#/active"
        className={classNames('filter__link', {
          selected: filter === FilterType.ACTIVE,
        })}
        data-cy="FilterLinkActive"
        onClick={() => onChange(FilterType.ACTIVE)}
      >
        Active
      </a>

      <a
        href="#/completed"
        className={classNames('filter__link', {
          selected: filter === FilterType.COMPLETED,
        })}
        data-cy="FilterLinkCompleted"
        onClick={() => onChange(FilterType.COMPLETED)}
      >
        Completed
      </a>
    </nav>
  );
};

// Componente que coordena a aplicação
const TodoApp: React.FC = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('TodoApp must be used within TodoContext.Provider');
  }

  const { todos, setTodos } = context;

  const [filter, setFilter] = useState<FilterValue>(FilterType.ALL);
  const newTodoField = useRef<HTMLInputElement>(null);

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

  const visibleTodos = todos.filter(todo => {
    if (filter === FilterType.ACTIVE) {
      return !todo.completed;
    }

    if (filter === FilterType.COMPLETED) {
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
              className={classNames('todoapp__toggle-all', {
                active: areAllCompleted,
              })}
              data-cy="ToggleAllButton"
              onClick={handleToggleAll}
            />
          )}

          <NewTodo newTodoField={newTodoField} />
        </header>

        <TodoList
          todos={visibleTodos}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />

        {todos.length > 0 && (
          <footer className="todoapp__footer" data-cy="Footer">
            <span className="todo-count" data-cy="TodosCounter">
              {activeTodos.length} items left
            </span>

            <Filter filter={filter} onChange={setFilter} />

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

// Componente principal: Context e localStorage
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
