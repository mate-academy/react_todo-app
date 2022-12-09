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
import { Status } from './Types/Status';

export const App: React.FC = () => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const { pathname } = useLocation();

  const visibleTodos = useMemo(() => todos.filter(todo => {
    switch (pathname) {
      case Status.Active:
        return !todo.completed;

      case Status.Completed:
        return todo.completed;

      default:
        return Status.All;
    }
  }), [todos, pathname]);

  return (
    <Routes>
      <Route
        path="/"
        element={<TodoApp todos={visibleTodos} setTodos={setTodos} />}
      >
        <Route
          path="/active"
          element={<TodoApp todos={visibleTodos} setTodos={setTodos} />}
        />
        <Route
          path="/completed"
          element={<TodoApp todos={visibleTodos} setTodos={setTodos} />}
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
