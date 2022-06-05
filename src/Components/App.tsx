import {
  Route,
  Routes,
} from 'react-router-dom';
import { TodoApp } from './TodoApp';

export const App = () => (

  <section className="todoapp">
    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route index element={<TodoApp />} />
        <Route
          path=":todoFilter"
          element={(
            <TodoApp />
          )}
        />
      </Route>
    </Routes>
  </section>
);

export default App;
