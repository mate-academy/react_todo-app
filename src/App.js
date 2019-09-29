import React from 'react';
import TodoList from './components/TodoList'

class App extends React.Component {
  render () {
  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>

        {/* <input
          className="new-todo"
          placeholder="What needs to be done?"
        /> */}

 <div className="App">
      <TodoList />
    </div>
      </header>
      </section>

  )

  }

  }


// function App() {
//   return (
//     <section className="todoapp" >
//       <header className="header">
//         <h1>todos</h1>

//         <input
//           className="new-todo"
//           placeholder="What needs to be done?"
//         />
//       </header>

//       <section className="main" style={{ display: 'block' }}>
//         <input type="checkbox" id="toggle-all" className="toggle-all" />
//         <label htmlFor="toggle-all">Mark all as complete</label>

//         <ul className="todo-list">
//           <li className="">
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-1" />
//               <label htmlFor="todo-1">sdfsdfsdf</label>
//               <button type="button" className="destroy" />
//             </div>
//           </li>

//           <li className="">
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-2" />
//               <label htmlFor="todo-2">sakgjdfgkhjasgdhjfhs</label>
//               <button type="button" className="destroy" />
//             </div>
//           </li>

//           <li className="">
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-3" />
//               <label htmlFor="todo-3">sddfgdfgdf</label>
//               <button type="button" className="destroy" />
//             </div>
//           </li>
//         </ul>
//       </section>

//       <footer className="footer" style={{ display: 'block' }}>
//         <span className="todo-count">
//           3 items left
//         </span>

//         <ul className="filters">
//           <li>
//             <a href="#/" className="selected">All</a>
//           </li>

//           <li>
//             <a href="#/active">Active</a>
//           </li>

//           <li>
//             <a href="#/completed">Completed</a>
//           </li>
//         </ul>

//         <button
//           type="button"
//           className="clear-completed"
//           style={{ display: 'block' }}
//         />
//       </footer>
//     </section>
//   );
// }

export default App;
