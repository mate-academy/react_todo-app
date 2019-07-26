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
        .map((todo) => ({
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
  
  removeFromState = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => (
        Number(item.id) !== Number(todoId)
      )),
    }))
  };
  
  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        todo.completed !== true
      )),
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
            todos={this.state.filteredTodos.length > 0
              ? this.state.filteredTodos
              : this.state.todos}
            todoIsCompleted={this.todoIsCompleted}
            removeFromState={this.removeFromState}
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
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    )
  }
}

export default App;
