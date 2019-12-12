import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

class App extends React.Component {
  state = {
    visibleTodos: [],
    filteredTodos: [],
  }

  addTodo = (todo) => {
    this.setState((prevState) => {
      const copiedTodo = [...prevState.visibleTodos, todo];

      return {
        visibleTodos: copiedTodo,
        filteredTodos: copiedTodo,
      };
    });
  }

  handleFilterByField = (field) => {
    this.setState((prevState) => {
      switch (field) {
        case 'All':
          return { filteredTodos: prevState.visibleTodos };

        case 'Active':
          return {
            filteredTodos: prevState.visibleTodos
              .filter(todo => !todo.completed),
          };

        case 'Completed':
          return {
            filteredTodos: prevState.visibleTodos
              .filter(todo => todo.completed),
          };

        default:
          return this.state.filteredTodos;
      }
    });
  }

  handleToggleTodo = (id) => {
    this.setState((prevState) => {
      const todos = prevState.visibleTodos.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      });

      return {
        filteredTodos: todos,
        visibleTodos: todos,
      };
    });
  }

  handleAllToggleTodo = (event) => {
    const isTodoChecked = event.target.checked;

    this.setState((prevState) => {
      const allCheckedTodos = [
        ...prevState.visibleTodos,
      ];

      allCheckedTodos.forEach(todo => (todo.completed = isTodoChecked));

      return {
        visibleTodos: allCheckedTodos,
        filteredTodos: allCheckedTodos,
      };
    });
  }

  handleDestroyTodo = (id) => {
    const updatedTodo = this.state.visibleTodos;
    const target = updatedTodo.findIndex(todo => todo.id === id);

    updatedTodo.splice(target, 1);

    this.setState({
      visibleTodos: [...updatedTodo],
      filteredTodos: [...updatedTodo],
    });
  }

  handleDestroyAllCompletedTodos = () => {
    this.setState(prevState => ({
      visibleTodos: prevState.visibleTodos
        .filter(todo => todo.completed === false),
      filteredTodos: prevState.visibleTodos
        .filter(todo => todo.completed === false),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <Header
          onSubmit={this.addTodo}
        />
        <Main
          toggleTodo={this.handleToggleTodo}
          destroyTodo={this.handleDestroyTodo}
          filteredTodos={this.state.filteredTodos}
          allToggleTodo={this.handleAllToggleTodo}
        />
        <Footer
          destroyAllCompletedTodos={this.handleDestroyAllCompletedTodos}
          handleFilterByField={this.handleFilterByField}
          filteredTodos={this.state.filteredTodos}
        />
      </section>
    );
  }
}

export default App;
