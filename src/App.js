import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    todoNumber: 0,
    todosFilter: () => true,
  }

  createTodo = (value) => {
    this.setState(state => ({
      todos:
        [
          ...state.todos,
          {
            title: value,
            id: ++state.todoNumber,
            completed: false,
          },
        ],
    }));
  }

  toggleAllCompleted = (isAllCompleted) => {
    if (isAllCompleted) {
      this.setState(state => ({
        todos: state.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(state => ({
        todos: state.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  toggleCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return ({
            ...todo,
            completed: !todo.completed,
          });
        }

        return todo;
      }),
    }));
  }

  editTodo = (title, id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return ({
            ...todo,
            title,
          });
        }

        return todo;
      }),
    }));
  }

  destroyTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }

  changeFilter = (callback) => {
    this.setState({
      todosFilter: callback,
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const {
      todos,
      todosFilter,
    } = this.state;

    return (
      <section className="todoapp">
        <Header createTodo={this.createTodo} />

        <Main
          items={todos}
          todosFilter={todosFilter}
          toggleAllCompleted={this.toggleAllCompleted}
          toggleCompleted={this.toggleCompleted}
          editTodo={this.editTodo}
          destroyTodo={this.destroyTodo}
        />

        {
          this.state.todos.length === 0
            ? ''
            : (
              <Footer
                uncompletedLength={todos.filter(todo => (
                  !todo.completed
                )).length}
                changeFilter={this.changeFilter}
                clearCompleted={this.clearCompleted}
              />
            )
        }
      </section>
    );
  }
}

// function App() {
//   return (
//     <section className="todoapp">
//       <header className="header">
//         <h1>todos</h1>
//
//         <input
//           className="new-todo"
//           placeholder="What needs to be done?"
//         />
//       </header>
//
//       <section className="main">
//         <input type="checkbox" id="toggle-all" className="toggle-all" />
//         <label htmlFor="toggle-all">Mark all as complete</label>
//
//         <ul className="todo-list">
//           <li>
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-1" />
//               <label htmlFor="todo-1">asdfghj</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>
//
//           <li className="completed">
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-2" />
//               <label htmlFor="todo-2">qwertyuio</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>
//
//           <li className="editing">
//             <div className="view">
//               <input type="checkbox" className="toggle" id="todo-3" />
//               <label htmlFor="todo-3">zxcvbnm</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>
//
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
//
//       <footer className="footer">
//         <span className="todo-count">
//           3 items left
//         </span>
//
//         <ul className="filters">
//           <li>
//             <a href="#/" className="selected">All</a>
//           </li>
//
//           <li>
//             <a href="#/active">Active</a>
//           </li>
//
//           <li>
//             <a href="#/completed">Completed</a>
//           </li>
//         </ul>
//
//         <button type="button" className="clear-completed">
//           Clear completed
//         </button>
//       </footer>
//     </section>
//   );
// }

export default App;
