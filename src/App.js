import React from 'react';
import TodoList from './TodoList';
import NewTodo from './NewTodo';

class App extends React.Component {
  state = {
    todos: [],
    // title: '',

  }

  newTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  handleMarkAll =() => {
    if (this.state.todos.every(todo => todo.completed === true)) {
      this.setState(state => ({
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: false,
          }
        )),
      }));
    } else {
      this.setState(state => ({
        todos: state.todos.map(todo => (
          {
            ...todo,
            completed: true,
          }
        )),
      }));
    }
  }

  handleChangeStatus = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  deleteTodo = ({ target }) => {
    const indexOfDeletedTodo = this.state.todos
      .findIndex(item => item.id === +target.id);

    this.setState((prevState) => {
      const newListOfTodos = [...prevState.todos];

      newListOfTodos.splice(indexOfDeletedTodo, 1);

      return (
        { todos: [...newListOfTodos] }
      );
    });
  }

  render() {
    const { todos } = this.state;
    const countOfNotFinishedTodos = todos
      .filter(todo => todo.completed === false).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
        </header>
        <NewTodo
          newTodo={this.newTodo}
        />
        <TodoList
          todos={this.state.todos}
          handleChangeStatus={this.handleChangeStatus}
          deleteTodo={this.deleteTodo}
          handleMarkAll={this.handleMarkAll}
        />
        {todos.length > 0
          && (
            <footer className="footer">
              <span className="todo-count">
                {countOfNotFinishedTodos}
                {' '}
                items left
              </span>

              <ul className="filters">
                <li>
                  <a href="#/" className="selected">All</a>
                </li>

                <li>
                  <a href="#/active">Active</a>
                </li>

                <li>
                  <a href="#/completed">Completed</a>
                </li>
              </ul>

              <button type="button" className="clear-completed">
                Clear completed
              </button>
            </footer>
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

export default App;
