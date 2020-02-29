import React from 'react';
import { TodoList } from './TodoList/TodoList';
import { Filter } from './Filter/Filter';

export class App extends React.Component {
  state = {
    title: '',
    todos: [],
    filteredTodos: [],
    filterState: 'All',
  }

  filter = (fil) => {
    const { todos } = this.state;

    switch (fil) {
      case 'All': {
        this.setState(prevState => ({
          filteredTodos: prevState.todos,
          filterState: 'All',
        }));
        break;
      }

      case 'Active': {
        this.setState(prevState => ({
          filteredTodos: prevState.todos.filter(todo => !todo.comleted),
          filterState: 'Active',
        }));
        break;
      }

      case 'Completed': {
        this.setState(prevState => ({
          filteredTodos: prevState.todos.filter(todo => todo.comleted),
          filterState: 'Completed',
        }));
        break;
      }

      default: {
        this.setState({
          filteredTodos: [...todos],
          filterState: 'All',
        });
      }
    }
  }

  deletedTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
    this.filter(this.state.filterState);
  }

  clearCompleted = (e) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.comleted),
    }));
    this.filter(this.state.filterState);
  }

  checkedTodo = (id) => {
    const { todos } = this.state;

    todos[id].comleted = !todos[id].comleted;
    this.setState(prevState => ({
      todos: prevState.todos,
    }));
  }

  onKeyPressed = (event) => {
    if (event.key === 'Enter') {
      this.newTodo(this.state.title);
    }
  }

  newTodo = (title) => {
    const { todos } = this.state;
    const newTodoId = this.state.todos.length;

    if (title.length) {
      todos.push({
        id: newTodoId,
        title,
        comleted: false,
      });

      this.setState({
        filteredTodos: [...todos],
        title: '',
      });
    }
  }

  onChangeInput = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value.replace(/^\s/, ''),
    });
  }

  toggleAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        comleted: !todo.comleted,
      })),
    }));
    this.filter(this.state.filterState);
  }

  render() {
    const { title, filteredTodos, filterState } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={this.onChangeInput}
            onKeyPress={this.onKeyPressed}
          />
        </header>

        <TodoList
          todos={filteredTodos}
          deletedTodo={this.deletedTodo}
          checkedTodo={this.checkedTodo}
          toggleAll={this.toggleAll}
        />

        <footer className="footer">
          <span className="todo-count">
            {this.state.todos.length}
          </span>
          <Filter
            filter={this.filter}
            filterState={filterState}
            clearCompleted={this.clearCompleted}
          />
        </footer>
      </section>
    );
  }
}
