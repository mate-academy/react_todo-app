import React from 'react';
import Header from './Header';
import TodoList from './TodoList';
import Footer from './Footer';

class App extends React.Component {
  state = {
    todos: [],
    title: '',
    currentFilter: 'all',
    // eslint-disable-next-line react/no-unused-state
    allCompleted: false,
  };

  addTodo = (text) => {
    this.setState((state) => {
      const myTodo = (
        {
          text,
          completed: false,
          id: +(new Date()),
        }
      );

      return { todos: [...state.todos, myTodo] };
    });
  };

  change = (e) => {
    this.setState({
      title: e.target.value,
    });
  };

  submitForm = (e) => {
    e.preventDefault();
    if (!this.state.title || this.state
      .title.trim() === '') {
      return;
    }

    this.addTodo(this.state.title);
    this.setState({ title: '' });
  };

  destroy = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  };

  check = (e, id) => {
    e.persist();

    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: e.target.checked,
        };
      }),
    }));
  };

  checkAll = () => {
    this.setState(({ todos, allCompleted }) => ({
      // eslint-disable-next-line react/no-unused-state
      allCompleted: !allCompleted,
      todos: todos.map(todo => ({
        ...todo, completed: !allCompleted,
      })),
    }));
  };

  setFilter = (filter) => {
    this.setState(prevState => ({ currentFilter: filter }));
  };

  filteredTodos = () => {
    switch (this.state.currentFilter) {
      case 'Completed': return this.state.todos.filter(todo => todo.completed);
      case 'Active': return this.state.todos.filter(todo => !todo.completed);
      case 'All':
      default: return this.state.todos;
    }
  };

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  render() {
    const { todos, title, currentFilter } = this.state;

    return (
      <section className="todoapp">
        <Header
          submitForm={this.submitForm}
          change={this.change}
          value={title}
        />
        <TodoList
          checkAll={this.checkAll}
          filteredTodos={this.filteredTodos()}
          check={this.check}
          destroy={this.destroy}
        />
        {
          todos.length > 0 && (
            <Footer
              allTodos={todos}
              filter={currentFilter}
              setFilter={this.setFilter}
              clearCompletedTodos={this.clearCompletedTodos}
            />
          )
        }
      </section>
    );
  }
}

export default App;
