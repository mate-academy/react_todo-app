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
          filteredTodos: prevState.todos.filter(todo => !todo.completed),
          filterState: 'Active',
        }));
        break;
      }

      case 'Completed': {
        this.setState(prevState => ({
          filteredTodos: prevState.todos.filter(todo => todo.completed),
          filterState: 'Completed',
        }));
        break;
      }

      default:
        break;
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
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
    this.filter(this.state.filterState);
  }

  checkedTodo = (TodoId, TodoCompleted) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((item) => {
        if (item.id === (Number(TodoId))) {
          return {
            ...item,
            completed: !TodoCompleted,
          };
        }

        return item;
      }),

    }));
    this.filter(this.state.filterState);
  }

  onKeyPressed = (event) => {
    if (event.key === 'Enter') {
      this.newTodo(this.state.title);
    }
  }

  newTodo = (title) => {
    const { todos } = this.state;
    const newTodoId = todos.length;

    if (title.length) {
      todos.push({
        id: newTodoId,
        title,
        completed: false,
      });

      this.setState({
        title: '',
      });
      this.filter(this.state.filterState);
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
        completed: !todo.completed,
      })),
    }));
    this.filter(this.state.filterState);
  }

  render() {
    const { title, filteredTodos, filterState, todos } = this.state;
    const activeTodos = todos.filter(todo => !todo.completed);

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
        <Filter
          length={activeTodos.length}
          filter={this.filter}
          filterState={filterState}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
