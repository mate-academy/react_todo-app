import React from 'react';

import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends React.Component {
  state= {
    todos: [],
    selectedFilter: 'all',
  };

  addNewTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  handleToggle = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  handleToggleAll = () => {
    this.setState((prevState) => {
      if (prevState.todos.every(todo => todo.completed)) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: !todo.completed,
          })),
        };
      }

      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  };

  handleFilter = (event) => {
    const { name } = event.target;

    this.setState({ selectedFilter: name });
  };

  filterTodos = (selectedFilter) => {
    const { todos } = this.state;

    if (selectedFilter === 'active') {
      return todos.filter(todo => todo.completed === false);
    }

    if (selectedFilter === 'completed') {
      return todos.filter(todo => todo.completed === true);
    }

    return todos;
  }

  handleRemove = (todo) => {
    this.setState((prevState) => {
      prevState.todos.splice(todo, 1);

      return {
        todos: prevState.todos,
      };
    });
  };

  handleRemoveCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  render() {
    const {
      selectedFilter,
    } = this.state;

    const visibleTodos = this.filterTodos(selectedFilter);

    return (
      <section className="todoapp">
        <Header addNewTodo={this.addNewTodo} />

        <TodoList
          onCheck={this.handleToggle}
          onRemove={this.handleRemove}
          todos={visibleTodos}
          onToggle={this.handleToggleAll}
        />

        { (visibleTodos.length > 0 || selectedFilter !== 'all')
          ? (
            <Footer
              todos={visibleTodos}
              selectedFilter={selectedFilter}
              handleFilter={this.handleFilter}
              handleRemoveCompleted={this.handleRemoveCompleted}
            />
          ) : (
            <></>
          )
        }
      </section>
    );
  }
}

export default App;
