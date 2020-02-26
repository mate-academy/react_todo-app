import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoApp } from './components/TodoApp';

class App extends React.Component {
  state = {
    todos: [],
  };

  addTodo = (todo) => {
    // console.log(todo, 'todo');
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => todo.id !== id),
    }));
  };

  clearComponent = () => {
    this.setState({
      todos: [],
    });
  };

  handleCompleted = (id) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].map((todo) => {
        if (todo.id === id) {
          // console.log(todo.completed);

          return {
            ...todo,
            completed: !prevState.completed,
          };
        }

        return todo;
      }),
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoApp addTodo={this.addTodo} />

        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            deleteTodo={this.deleteTodo}
            handleCompleted={this.handleCompleted}
          />

          {/* <ul className="todo-list"> */}
          {/*  <li> */}
          {/*    <div className="view"> */}
          {/*      <input type="checkbox" className="toggle" id="todo-1" /> */}
          {/*      <label htmlFor="todo-1">asdfghj</label> */}
          {/*      <button type="button" className="destroy" /> */}
          {/*    </div> */}
          {/*    <input type="text" className="edit" /> */}
          {/*  </li> */}

          {/*  <li className="completed"> */}
          {/*    <div className="view"> */}
          {/*      <input type="checkbox" className="toggle" id="todo-2" /> */}
          {/*      <label htmlFor="todo-2">qwertyuio</label> */}
          {/*      <button type="button" className="destroy" /> */}
          {/*    </div> */}
          {/*    <input type="text" className="edit" /> */}
          {/*  </li> */}

          {/*  <li className="editing"> */}
          {/*    <div className="view"> */}
          {/*      <input type="checkbox" className="toggle" id="todo-3" /> */}
          {/*      <label htmlFor="todo-3">zxcvbnm</label> */}
          {/*      <button type="button" className="destroy" /> */}
          {/*    </div> */}
          {/*    <input type="text" className="edit" /> */}
          {/*  </li> */}

          {/*  <li> */}
          {/*    <div className="view"> */}
          {/*      <input type="checkbox" className="toggle" id="todo-4" /> */}
          {/*      <label htmlFor="todo-4">1234567890</label> */}
          {/*      <button type="button" className="destroy" /> */}
          {/*    </div> */}
          {/*    <input type="text" className="edit" /> */}
          {/*  </li> */}
          {/* </ul> */}
        </section>
        {todos.length
          ? (
            <footer className="footer">
              <span className="todo-count">
                {`${todos.length} items left`}
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

              <button
                onClick={this.clearComponent}
                type="button"
                className="clear-completed"
              >
            Clear completed
              </button>
            </footer>
          )
          : (<></>)
        }
      </section>
    );
  }
}

export default App;
