import React, {
  useState,
  useCallback,
  useMemo,
  useReducer,
  useEffect,
} from 'react';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';
import {
  TodosContext,
  reducer,
  FilterQuery,
  Todo,
} from './utils/utils';

const initialTodos = JSON.parse(localStorage.getItem('todos')
|| '[]') as Todo[];

export const App: React.FC = () => {
  const [todos, dispatch] = useReducer(reducer, initialTodos);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [filterQuery, setFilterQuery] = useState<FilterQuery>(FilterQuery.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const filter = useCallback((query: FilterQuery) => {
    setFilterQuery(query);
  }, []);

  const filteredTodos = useMemo(() => {
    switch (filterQuery) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }, [filterQuery, todos]);

  const toggleAll = useCallback(() => {
    const allDone = todos.every((todo) => todo.completed);

    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allDone,
    }));

    dispatch({ type: 'updateAll', payload: updatedTodos });
  }, [todos]);

  const handleAddTodo = useCallback(() => {
    if (newTodoTitle.trim().length > 0) {
      const newTodo: Todo = {
        id: +new Date(),
        title: newTodoTitle,
        completed: false,
      };

      const updatedTodos = [...todos, newTodo];

      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      dispatch({ type: 'add', payload: newTodo });
      setNewTodoTitle('');
    }
  }, [newTodoTitle]);

  const handleDeleteTodo = useCallback((todo: Todo) => {
    localStorage.removeItem(todo.id.toString());
    dispatch({ type: 'delete', payload: todo });
  }, []);

  const handleTodoToggle = useCallback((todo: Todo) => {
    const todoFromStorageString = localStorage.getItem(todo.id.toString());

    if (todoFromStorageString !== null) {
      const todoFromStorage = JSON.parse(todoFromStorageString);

      if (todoFromStorage.title !== todo.title) {
        todoFromStorage.title = todo.title;
      }

      todoFromStorage.completed = !todoFromStorage.completed;
      localStorage.setItem(todo.id.toString(), JSON.stringify(todoFromStorage));
    }

    dispatch({ type: 'toggle', payload: todo });
  }, []);

  const handleClear = useCallback(() => {
    dispatch({ type: 'clear' });
    localStorage.removeItem('todos');
  }, []);

  const handleInputChange = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTodoTitle(event.target.value);
  }, []);

  const handleSubmit = useCallback((
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    handleAddTodo();
  }, [handleAddTodo]);

  const handleTodoTitleUpdate = useCallback((todo: Todo, newTitle: string) => {
    const updatedTodos = todos.map((t) => (
      t.id === todo.id ? { ...t, title: newTitle } : t
    ));

    localStorage.setItem('todos', JSON.stringify(updatedTodos));
    dispatch({ type: 'updateAll', payload: updatedTodos });
  }, [todos]);

  return (
    <TodosContext.Provider value={todos}>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              data-cy="createTodo"
              className="new-todo"
              placeholder="What needs to be done?"
              value={newTodoTitle}
              onChange={handleInputChange}
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={toggleAll}
            />

            <label htmlFor="toggle-all">Mark all as complete</label>

            <TodoList
              todos={filteredTodos}
              onDelete={handleDeleteTodo}
              onComplete={handleTodoToggle}
              onTitleUpdate={handleTodoTitleUpdate}
            />
          </section>
        )}

        {todos.length > 0 && (
          <Footer
            filterQuery={filterQuery}
            filter={filter}
            handleClear={handleClear}
          />
        )}
      </div>
    </TodosContext.Provider>
  );
};
