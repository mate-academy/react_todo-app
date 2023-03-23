import ReactDOM from 'react-dom';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import { App } from './App';

ReactDOM.render(
  <Router>
    <Routes>
      <Route>
        <Route index element={<App />} />
        <Route path=":filter" element={<App />} />
      </Route>
    </Routes>
  </Router>,
  document.getElementById('root'),
);
