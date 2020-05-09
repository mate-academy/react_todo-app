import React from 'react';
import Header from './components/Header/Header';
import TodoList from './components/TodoList/TodoList';
import Filter from './components/Filter/Filter';
//import todos from './api/todos';

const todos = [];

export default class App extends React.Component {
  state = {
    todos: [...todos],

  }
  deleteTodo = (id) => {
    const index = this.state.todos.findIndex((el) => el.id === id);

    const newArray = [
      ...this.state.todos.slice(0, index),
      ...this.state.todos.slice(index + 1)
    ];

    this.setState({
      todos: newArray
    });
  }

  addTodoItem = (newTodo) => {
    this.setState({
      todos: [...this.state.todos, newTodo]
    });
  };

  onClickCompleted = (elt) => {
    elt.comleted = !elt.comleted;
    const index = this.state.todos.findIndex((el) => el.id === elt.id);

    const newArray = [
      ...this.state.todos.slice(0, index),
      elt,
      ...this.state.todos.slice(index + 1)
    ];

    this.setState({
      todos: newArray
    });
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">

        <Header
          todos={todos}
          addTodoItem={this.addTodoItem}

        />
        <TodoList
          todos={todos}
          deleteTodo={this.deleteTodo}
          onClickCompleted={this.onClickCompleted}
        />
        <Filter />
      </section>

    )
  }
}
// function App() {
//   return (
//     <section className="todoapp">
//       <header className="header">
//         <h1>todos</h1>

//         <input
//           className="new-todo"
//           placeholder="What needs to be done?"
//         />
//       </header>

//       <section className="main">
//         <input type="checkbox" id="toggle-all" className="toggle-all" />
//         <label htmlFor="toggle-all">Mark all as complete</label>

//         <ul className="todo-list">
//           <li>
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-1" />
//               <label htmlFor="todo-1">asdfghj</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>

//           <li className="completed">
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-2" />
//               <label htmlFor="todo-2">qwertyuio</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>

//           <li className="editing">
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-3" />
//               <label htmlFor="todo-3">zxcvbnm</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>

//           <li>
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-4" />
//               <label htmlFor="todo-4">1234567890</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>
//         </ul>
//       </section>

//       <footer className="footer">
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

//         <button type="button" className="clear-completed">
//           Clear completed
//         </button>
//       </footer>
//     </section>
//   );
// }


