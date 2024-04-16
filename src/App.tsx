/* eslint-disable jsx-a11y/control-has-associated-label */
import React, {
  FormEventHandler,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
// import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import { Todo } from './components/type';

type Filters = 'All' | 'Active' | 'Completed';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [inputValue, setInputValue] = useState('');
  const [filterType, setFilterType] = useState<Filters>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [todos]);

  const addTodo: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: Date.now(),
        title: inputValue.trim(),
        completed: false,
      },
    ]);
    setInputValue('');
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const editTodo = (id: number, newTitle: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, title: newTitle.trim(), isEditing: false }
          : todo,
      ),
    );
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const filteredTodos = useMemo(() => {
    let filtered = todos;

    if (filterType === 'Active') {
      filtered = todos.filter(todo => !todo.completed);
    }

    if (filterType === 'Completed') {
      filtered = todos.filter(todo => todo.completed);
    }

    return filtered;
  }, [filterType, todos]);
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleFilterChange = (filterT: Filters) => {
    setFilterType(filterT);
  };

  const clearClompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const allCompleted = useMemo(
    () => filteredTodos.every(t => t.completed),
    [filteredTodos],
  );
  const allActive = useMemo(
    () => filteredTodos.every(t => !t.completed),
    [filteredTodos],
  );
  const toggleAll = () => {
    if (allCompleted || allActive) {
      setTodos(
        todos.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
      );
    } else {
      {
        setTodos(
          todos.map(todo =>
            !todo.completed ? { ...todo, completed: true } : todo,
          ),
        );
      }
    }
  };

  const activeTodosCount = todos.filter(todo => !todo.completed).length;

  return (
    <div className="todoapp">
      <h1 className="todoapp__title">todos</h1>

      <div className="todoapp__content">
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allCompleted ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={toggleAll}
            />
          )}
          <form onSubmit={addTodo}>
            <input
              value={inputValue}
              data-cy="NewTodoField"
              type="text"
              className="todoapp__new-todo"
              placeholder="What needs to be done?"
              onChange={e => setInputValue(e.target.value)}
              ref={inputRef}
            />
          </form>
        </header>

        <TodoList
          todos={filteredTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          editTodo={editTodo}
        />

        {todos.length !== 0 && (
          <Footer
            handleFilterChange={handleFilterChange}
            filterType={filterType}
            activeTodosCount={activeTodosCount}
            allTodosCount={todos.length}
            clearClompleted={clearClompleted}
          />
        )}
      </div>
    </div>
  );
};
