import React, { useEffect, useState } from 'react';
import PropTypes, { shape } from 'prop-types';

import { TodoList } from './TodoList/TodoList';
import { AddTodos } from './AddTodos/AddTodos';
import { TodosFilter } from './TodosFilter/TodosFilter';

export const TodoApp = ({
  todos,
  setTodos,
  // fileteForTodos,
  // setFilterForTodos,
}) => {
  // console.log(todos);
  const [completedTodos, setCompletedTodos] = useState('');

  // const completedTodos = todos.filter(todo => todo.completed);

  const [allTodosToogler, setAllTodosToogler] = useState(false);

  useEffect(() => {
    setCompletedTodos(() => todos.filter(todo => !todo.completed));
    setAllTodosToogler(() => todos.every(item => item.completed === true));
  }, [todos]);

  const markAllTodos = () => {
  // console.log(todos);

    if (!allTodosToogler) {
      setTodos((pervTodos) => {
        pervTodos.map(todo => ({ ...todo, completed: true }));
      });
    }

    // console.log(todos);
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <AddTodos
          todos={todos}
          setTodos={setTodos}
        />
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={allTodosToogler}
          onChange={() => {
            setAllTodosToogler(!allTodosToogler);
            markAllTodos(todos);
          }}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <TodoList
          todos={todos}
          setTodos={setTodos}
        />
      </section>

      <footer className="footer">
        <span className="todo-count">
          {completedTodos.length}
          { completedTodos.length === 1 ? ' item ' : ' items '}
          left
        </span>

        <TodosFilter
          todos={todos}
          // filterForTodos={filterForTodos}
          // setFilterForTodos={setFilterForTodos}
        />

        {/* <ul className="filters">
          <li>
            <a href="#/" className="selected">All</a>
          </li>

          <li>
            <a href="#/active">Active</a>
          </li>

          <li>
            <a href="#/completed">Completed</a>
          </li>
        </ul> */}

        <button type="button" className="clear-completed">
          Clear completed
        </button>
      </footer>
    </section>
  );
};

TodoApp.propTypes = {
  todos: PropTypes.arrayOf(shape({
    id: PropTypes.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  setTodos: PropTypes.func.isRequired,
};

// (
//   <section className="todoapp">
//     <header className="header">
//       <h1>todos</h1>

//       <form>
//         <input
//           type="text"
//           className="new-todo"
//           placeholder="What needs to be done?"
//         />
//       </form>
//     </header>

//     <section className="main">
//       <input type="checkbox" id="toggle-all" className="toggle-all" />
//       <label htmlFor="toggle-all">Mark all as complete</label>

//       <ul className="todo-list">
//         <li>
//           <div className="view">
//             <input type="checkbox" className="toggle" />
//             <label>asdfghj</label>
//             <button type="button" className="destroy" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li className="completed">
//           <div className="view">
//             <input type="checkbox" className="toggle" />
//             <label>qwertyuio</label>
//             <button type="button" className="destroy" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li className="editing">
//           <div className="view">
//             <input type="checkbox" className="toggle" />
//             <label>zxcvbnm</label>
//             <button type="button" className="destroy" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li>
//           <div className="view">
//             <input type="checkbox" className="toggle" />
//             <label>1234567890</label>
//             <button type="button" className="destroy" />
//           </div>
//           <input type="text" className="edit" />
//         </li>
//       </ul>
//     </section>

//     <footer className="footer">
//       <span className="todo-count">
//         3 items left
//       </span>

//       <ul className="filters">
//         <li>
//           <a href="#/" className="selected">All</a>
//         </li>

//         <li>
//           <a href="#/active">Active</a>
//         </li>

//         <li>
//           <a href="#/completed">Completed</a>
//         </li>
//       </ul>

//       <button type="button" className="clear-completed">
//         Clear completed
//       </button>
//     </footer>
//   </section>
// );
// };
