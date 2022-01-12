import { Routes, Route } from 'react-router-dom';
import { TodoApp } from '../TodoApp/TodoApp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<TodoApp />}>
        <Route path=":slug" element={<TodoApp />} />
      </Route>
    </Routes>
  );
};

export default App;
