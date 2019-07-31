/* eslint-disable */
import React from 'react';
import NewToDo from './components/NewToDo';
import TodoList from './components/TodoList';
import ToDosFilter from './components/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    filteredTodos: undefined,
    allCompleted: false,
    todoIdCounter: 1,
  };
  
  addTodo = (todoObj) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .concat(todoObj)
        .map(todo => {
        return ({
          ...todo,
          id: !todo.id
            ? this.state.todoIdCounter
            : todo.id
        })
        }),
      allCompleted: false,
      todoIdCounter: prevState.todoIdCounter + 1,
    }));
  };
  
  todoIsCompletedSetState = (todoId) => {
    this.setState(prevState => ({
      todos: prevState.todos
        .map(todo => ({
          ...todo,
          completed: (Number(todo.id) === Number(todoId))
          ? !todo.completed
            : todo.completed
        })),
    }));
  };
  
  injectFilteredTodos = (isCompleted) => {
    const { todos }  = this.state;
  //   isCompleted
  //   ? this.setState({
  //       filteredTodos: todos.filter(todo => (
  //         todo.completed === true
  //       ))
  //     })
  //   : !isCompleted ? this.setState({
  //     filteredTodos: todos.filter(todo => (
  //       todo.completed !== true
  //     ))
  //   })
  //     : this.setState({
  //       filteredTodos: undefined,
  //     })
    
    switch(true){
      case isCompleted:
        this.setState({
          filteredTodos: todos.filter(todo => (
            todo.completed === true
          ))
        });
        break;
      case !isCompleted:
        this.setState({
          filteredTodos: todos.filter(todo => (
            todo.completed !== true
          ))
        });
        break;
      case isCompleted === 'all':
        this.setState({
          filteredTodos: undefined,
        });
    }
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
        !todo.completed
      )),
    }))
  };
  
  selectAll = () => {
    const { allCompleted, todos } = this.state;
    
    !allCompleted
      ? this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
        allCompleted: true,
      }))
      : this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
        allCompleted: false,
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
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={this.state.allCompleted}
          />
          <label
            htmlFor="toggle-all"
            onClick={this.selectAll}
          >
            Mark all as complete
          </label>
      
          <TodoList
            todos={this.state.filteredTodos
              ? this.state.filteredTodos
              : this.state.todos}
            todoIsCompleted={this.todoIsCompletedSetState}
            removeFromState={this.removeFromState}
          />
          
        </section>
        <footer className="footer" style={{ display: 'block' }}>
        <span className="todo-count">
          {this.state.todos.filter(todo => todo.completed === false).length}
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
