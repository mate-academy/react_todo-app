/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { TodoApp } from './components/TodoApp/TodoApp';
// import { TodoList } from './components/TodoList/TodoList';
// import { Todo } from './types';
import { TodosProvider } from './components/TodosContext/TodosContext';

// const initialTodos: Todo[] = [];

export const App: React.FC = () => (
  <TodosProvider>
    <TodoApp />
  </TodosProvider>
);

// const [newTodos, setNewTodos] = useState<Todo[]>(initialTodos);

// const addTodo = ({ id, completed, ...data }: Todo) => {
//   const newTodo = {
//     id: +new Date(),
//     completed: false,
//     ...data,
//   };

//   setNewTodos(currentTodos => [...currentTodos, newTodo]);
// };

// return (
//   <div className="todoapp">
//     <header className="header">
//       <h1>todos</h1>

//       <TodosContext.Provider value={newTodos}>
//         <TodoApp onKeyDown={addTodo} />

//         <TodoList todos={newTodos} />
//       </TodosContext.Provider>

//       {/* <TodoApp onKeyDown={addTodo} />

//       <TodoList todos={newTodos} /> */}
//     </header>

//     {/* <section className="main">
//       <input
//         type="checkbox"
//         id="toggle-all"
//         className="toggle-all"
//         data-cy="toggleAll"
//       />
//       <label htmlFor="toggle-all">Mark all as complete</label>

//       <ul className="todo-list" data-cy="todoList">
//         <li>
//           <div className="view">
//             <input type="checkbox" className="toggle" id="toggle-view" />
//             <label htmlFor="toggle-view">asdfghj</label>
//             <button type="button" className="destroy" data-cy="deleteTodo" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li className="completed">
//           <div className="view">
//             <input type="checkbox" className="toggle" id="toggle-completed" />
//             <label htmlFor="toggle-completed">qwertyuio</label>
//             <button type="button" className="destroy" data-cy="deleteTodo" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li className="editing">
//           <div className="view">
//             <input type="checkbox" className="toggle" id="toggle-editing" />
//             <label htmlFor="toggle-editing">zxcvbnm</label>
//             <button type="button" className="destroy" data-cy="deleteTodo" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li>
//           <div className="view">
//             <input type="checkbox" className="toggle" id="toggle-view2" />
//             <label htmlFor="toggle-view2">1234567890</label>
//             <button type="button" className="destroy" data-cy="deleteTodo" />
//           </div>
//           <input type="text" className="edit" />
//         </li>
//       </ul>
//     </section>

//     <footer className="footer">
//       <span className="todo-count" data-cy="todosCounter">
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
//     </footer> */}
//   </div>
// );
