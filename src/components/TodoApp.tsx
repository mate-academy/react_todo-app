import React, {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from '../utils/useLocaleStorage';
import { FilterType } from '../types/FilterType';
import { Todo } from '../types/Todo';
import { Footer } from './Footer';
import { NewTodoField } from './NewTodoField';
import { TodoList } from './TodoList';

export const TodoApp: React.FC = () => {
  const [query, setQuery] = useState('');
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const location = useLocation();

  const activeTodosLength = todos.filter(todo => !todo.completed).length;

  const completedTodos = todos.filter(todo => todo.completed);

  const onInputChange = (str: string) => {
    setQuery(str);
  };

  const onFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const newTodo = {
      id: +new Date(),
      title: query,
      completed: false,
    };

    setTodos([...todos, newTodo]);

    setQuery('');
  };

  const onDeleteCompletedTodos = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const onDeleteTodo = useCallback((id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  }, [todos]);

  const onRenameTodo = useCallback((id: number, newTitle: string) => {
    setTodos(todos.map(todo => (
      todo.id === id ? {
        ...todo,
        title: newTitle,
      } : todo)));
  }, [todos]);

  const onToggle = useCallback((id: number) => {
    setTodos(todos.map(todo => (
      todo.id === id ? {
        ...todo,
        completed: !todo.completed,
      } : todo)));
  }, [todos]);

  const onToggleAll = useCallback((): void => {
    const isAllCompleted = todos.every(todo => todo.completed);

    const allTodos = todos.map(todo => (
      isAllCompleted
        ? {
          ...todo,
          completed: !todo.completed,
        }
        : {
          ...todo,
          completed: true,
        }
    ));

    setTodos([...allTodos]);
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (location.pathname.slice(1)) {
        case FilterType.Active:
          return !todo.completed;

        case FilterType.Completed:
          return todo.completed;

        default:
          return todo;
      }
    });
  }, [location, todos]);

  return (
    <div className="todoapp">
      <header className="header">
        <h1>todos</h1>

        <NewTodoField
          query={query}
          onInputChange={onInputChange}
          onFormSubmit={onFormSubmit}
        />
      </header>

      {todos.length > 0 && (
        <>
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              data-cy="toggleAll"
              onClick={onToggleAll}
            />
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>

            <TodoList
              todos={visibleTodos}
              onDeleteTodo={onDeleteTodo}
              onToggle={onToggle}
              onRenameTodo={onRenameTodo}
            />
          </section>

          <Footer
            onDeleteCompletedTodos={onDeleteCompletedTodos}
            todosLeft={activeTodosLength}
            completedTodosLength={completedTodos.length}
          />
        </>
      )}
    </div>
  );
};
