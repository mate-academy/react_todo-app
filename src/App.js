import React from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';

export class App extends React.Component {
  state = {
    todos: [],
    filter: 'All',
    checked: false,
  }

  addTodo = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          ...newTodo,
          id: Date.now(),
        },
      ],
    }));
  }

  markAll = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
      todos: prevState.todos.map(todo => ({
        ...todo,
        isCompleted: !prevState.checked,
      })),
    }));
  }

  filterTodos = (event) => {
    const { name } = event.target;

    this.setState({
      filter: name,
    });
  }

  deleteTodo = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== Number(value)),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.isCompleted),
    }));
  }

  check = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ((todo.id !== Number(value))
        ? { ...todo }
        : {
          ...todo,
          isCompleted: !todo.isCompleted,
        })),
    }));
  }

  render() {
    const { todos, checked, filter } = this.state;

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.markAll}
            checked={checked}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>

          <TodoList
            check={this.check}
            filter={filter}
            todos={todos}
            deleteTodo={this.deleteTodo}
          />
        </section>
        <Footer
          todos={todos}
          filterTodos={this.filterTodos}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}
