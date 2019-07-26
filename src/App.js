/* eslint-disable */
import React from 'react';
import NewToDo from './components/NewToDo';
import TodoList from './components/TodoList';
import ToDosFilter from './components/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: [],
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
      filteredTodos: [],
    }));
  };
  
  changeBool = (boolValue) => {
    if (boolValue) {
      return false
    }
    return true
  };
  
  todoIsCompleted = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => ({
          ...todo,
          completed: (Number(todo.id) === Number(todoId))
          ? this.changeBool(todo.completed)
            : todo.completed
        })),
    }))
  };
  
  injectFilteredTodos = (todos) => {
    this.setState({
      filteredTodos: todos,
    })
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
            todos={this.state.filteredTodos.length > 0
              ? this.state.filteredTodos
              : this.state.todos}
            todoIsCompleted={this.todoIsCompleted}
          />
          
        </section>
        <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {this.state.todos.length}
        </span>
          
          <ToDosFilter
            todos={this.state.todos}
            injectFilteredTodos={this.injectFilteredTodos}
          />
      
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
