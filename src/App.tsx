/* eslint-disable max-len */
import React, {
  useState,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
}

const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  dispatch: () => {},
});

type Action =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'EDIT_TODO'; payload: { id: number; title: string } }
  | { type: 'TOGGLE_ALL' };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, action.payload];
    case 'TOGGLE_TODO':
      return state.map(todo =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo,
      );
    case 'DELETE_TODO':
      return state.filter(todo => todo.id !== action.payload);
    case 'CLEAR_COMPLETED':
      return state.filter(todo => !todo.completed);
    case 'EDIT_TODO':
      return state.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: action.payload.title.trim() }
          : todo,
      );
    case 'TOGGLE_ALL':
      const areAllCompleted = state.every(todo => todo.completed);

      return state.map(todo => ({
        ...todo,
        completed: !areAllCompleted,
      }));
    default:
      return state;
  }
}

const TodoProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [todos, dispatch] = useReducer(todoReducer, [], () => {
    const localData = localStorage.getItem('todos');

    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={{ todos, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

const TodoApp: React.FC = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [newTodo, setNewTodo] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedTitle = newTodo.trim();

    if (trimmedTitle !== '') {
      dispatch({
        type: 'ADD_TODO',
        payload: { id: +new Date(), title: trimmedTitle, completed: false },
      });
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const handleDeleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
    inputRef.current?.focus();
  };

  const handleClearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
    inputRef.current?.focus();
  };

  const handleEditTodo = (id: number, title: string) => {
    const trimmedTitle = title.trim();

    if (trimmedTitle) {
      dispatch({ type: 'EDIT_TODO', payload: { id, title: trimmedTitle } });
    } else {
      dispatch({ type: 'DELETE_TODO', payload: id });
    }
  };

  const handleToggleAll = () => {
    dispatch({ type: 'TOGGLE_ALL' });
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    } else if (filter === 'completed') {
      return todo.completed;
    } else {
      return true;
    }
  });

  const todosCount = todos.filter(todo => !todo.completed).length;

  const allTodosCompleted =
    todos.length > 0 && todos.every(todo => todo.completed);

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>
      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <>
              <button
                data-cy="ToggleAllButton"
                id="toggle-all"
                className={`todoapp__toggle-all ${allTodosCompleted ? 'active' : ''}`}
                type="button"
                onClick={handleToggleAll}
              />
            </>
          )}
          <form onSubmit={handleSubmit}>
            <input
              data-cy="NewTodoField"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              value={newTodo}
              onChange={handleInputChange}
              autoFocus
              ref={inputRef}
            />
          </form>
        </header>
        <section className="todoapp__main" data-cy="TodoList">
          <ul>
            {filteredTodos.map(todo => (
              <li
                key={todo.id}
                data-cy="Todo"
                className={`todo ${todo.completed ? 'completed' : ''}`}
              >
                <label className="todo__status-label">
                  <input
                    className="todo__status"
                    type="checkbox"
                    data-cy="TodoStatus"
                    checked={todo.completed}
                    onChange={() => handleToggleTodo(todo.id)}
                  />
                </label>
                {editingTodo === todo.id ? (
                  <input
                    className="todo__title-field"
                    data-cy="TodoTitleField"
                    value={editingTitle}
                    onChange={e => setEditingTitle(e.target.value)}
                    onBlur={() => {
                      handleEditTodo(todo.id, editingTitle.trim());
                      setEditingTodo(null);
                    }}
                    onKeyUp={e => {
                      if (e.key === 'Enter') {
                        handleEditTodo(todo.id, editingTitle.trim());
                        setEditingTodo(null);
                      }

                      if (e.key === 'Escape') {
                        setEditingTitle(todo.title);
                        setEditingTodo(null);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <>
                    <label
                      data-cy="TodoTitle"
                      className="todo__title"
                      onDoubleClick={() => {
                        setEditingTodo(todo.id);
                        setEditingTitle(todo.title);
                      }}
                    >
                      {todo.title}
                    </label>
                    <button
                      type="button"
                      className="todo__remove"
                      data-cy="TodoDelete"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      ×
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>

        {todos.length > 0 && (
          <footer className="todoapp__footer">
            <span className="todo-count" data-cy="TodosCounter">
              <strong>{todosCount}</strong>{' '}
              {todosCount === 1 ? 'item' : 'items'} left
            </span>
            <ul className="filter" data-cy="Filter">
              <li>
                <a
                  href="#/"
                  data-cy="FilterLinkAll"
                  className={`filter__link ${filter === 'all' ? 'selected' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/active"
                  data-cy="FilterLinkActive"
                  className={`filter__link ${filter === 'active' ? 'selected' : ''}`}
                  onClick={() => setFilter('active')}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  data-cy="FilterLinkCompleted"
                  className={`filter__link ${filter === 'completed' ? 'selected' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed
                </a>
              </li>
            </ul>
            <button
              className="todoapp__clear-completed"
              data-cy="ClearCompletedButton"
              onClick={handleClearCompleted}
              disabled={todos.every(todo => !todo.completed)}
            >
              Clear completed
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
};

export default App;
