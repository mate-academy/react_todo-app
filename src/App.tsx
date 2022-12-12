import { useMemo } from 'react';
import {
  Navigate,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { TodoApp } from './Components/TodoApp';
import { useLocalStorage } from './Hooks/LocalStorage';
import { Todo } from './Types/Todo';
import { FilterStatus } from './Types/FilterStatus';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const { pathname } = useLocation();

  const visibleTodos = useMemo(() => todos.filter(todo => {
    switch (pathname) {
      case FilterStatus.Active:
        return !todo.completed;

      case FilterStatus.Completed:
        return todo.completed;

      default:
        return FilterStatus.All;
    }
  }), [todos, pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={(
          <TodoApp
            bottomBarVisibility={todos}
            todos={visibleTodos}
            setTodos={setTodos}
          />
        )}
      >
        <Route
          path="/active"
          element={(
            <TodoApp
              bottomBarVisibility={todos}
              todos={visibleTodos}
              setTodos={setTodos}
            />
          )}
        />
        <Route
          path="/completed"
          element={(
            <TodoApp
              bottomBarVisibility={todos}
              todos={visibleTodos}
              setTodos={setTodos}
            />
          )}
        />
      </Route>
      <Route
        path="*"
        element={(
          <Navigate to="/" />
        )}
      />
    </Routes>
  );
};
