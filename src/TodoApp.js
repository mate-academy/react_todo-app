/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoFilter from './TodoFilter/TodoFilter';

class TodoApp extends React.Component {
  state = {
    todoList: [],
    filter: '',
    todoID: 1,
  };

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleAddTodo = (newTodo) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, newTodo],
      todoID: prevState.todoID + 1,
    }));
  };

  handleDeleteTodo = (id) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== +id),
    }));
  };

  handleEditTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo => ({
        ...todo,
        title: todo.id === +id ? newTitle : todo.title,
      })),
    }));
  };

  handleCompleteTodo = (id) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo => ({
        ...todo,
        completed: todo.id === +id ? !todo.completed : todo.completed,
      })),
    }));
  };

  handleFilterTodo = (filterValue) => {
    this.setState({ filter: filterValue });
  };

  toggleAllTodo = ({ target }) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.map(todo => ({
        ...todo, completed: !!target.checked,
      })),
    }));
  };

  deleteAllCompletedTodo = () => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => !todo.completed),
    }));
  };

  render() {
    const { todoList, filter, todoID } = this.state;
    let filteredTodo = [];

    switch (filter) {
      case 'active':
        filteredTodo = todoList.filter(todo => !todo.completed);

        break;
      case 'completed':
        filteredTodo = todoList.filter(todo => todo.completed);

        break;
      default:
        filteredTodo = todoList;
        break;
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoForm todoID={todoID} onAdd={this.handleAddTodo} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.toggleAllTodo}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={filteredTodo}
            onComplete={this.handleCompleteTodo}
            onDelete={this.handleDeleteTodo}
            onEdit={this.handleEditTodo}
          />

        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${todoList.filter(todo => !todo.completed).length} items left`}
          </span>

          <TodoFilter onFilterClick={this.handleFilterTodo} />

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.deleteAllCompletedTodo}
          >
            clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default TodoApp;
