import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';

import { App } from './App';
import { TodosProvider } from './TodosContext';

ReactDOM.render(
  <TodosProvider>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<App />} />
          <Route path=":type" element={<App />} />
        </Route>
      </Routes>
    </Router>
  </TodosProvider>,
  document.getElementById('root'),
);
