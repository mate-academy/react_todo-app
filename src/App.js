/* eslint-disable */
import React from 'react';
import NewToDo from './components/NewToDo';
import TodoList from './components/TodoList';

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
  
  changeBool = (boolValue) => {
    if (boolValue) {
      return false
    }
    return true
  };
  
  todoIsCompleted = (todoId) => {
    console.log(todoId)
    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => ({
          ...todo,
          completed: (Number(todo.id) === Number(todoId))
          ? this.changeBool(todo.completed)
            : todo.completed
        }))
    }))
    
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
      
          <TodoList
            todos={this.state.todos}
            todoIsCompleted={this.todoIsCompleted}
          />
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
