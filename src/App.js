/* eslint-disable */
import React from 'react';
import NewToDo from './components/NewToDo';

class App extends React.Component {
  state = {
    todos: [],
  };
  
  addTodo = (todoObj) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .concat(todoObj)
        .map((todo, i) => ({
          ...todo,
          id: !todo.id
            ? todo.id = i + 1
            : todo.id
        })),
    }));
  };
  
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
      
          <NewToDo addTodo={this.addTodo}/>
        </header>
    
        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
      
          <ul className="todo-list">
            {this.state.todos.length !== 0
            ? this.state.todos.map(todo => (
                <li key={todo.id} className="">
                  <div className="view">
                    <input type="checkbox" className="toggle" id="todo-1" />
                    <label htmlFor="todo-1">{todo.title}</label>
                    <button type="button" className="destroy" />
                  </div>
                </li>
              ))
            : <li className="">
                <div className="view">
                  <label htmlFor="todo-1">No todo yet</label>
                </div>
              </li>
            }
          </ul>
        </section>
    
        <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {this.state.todos.length}
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
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
          />
        </footer>
      </section>
    )
  }
}

export default App;
