import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    todoNumber: 0,
    todosFilter: () => true,
  }

  createTodo = (value) => {
    this.setState(state => ({
      todos:
        [
          ...state.todos,
          {
            title: value,
            id: ++state.todoNumber,
            completed: false,
          },
        ],
    }));
  }

  toggleAllCompleted = (isAllCompleted) => {
    if (isAllCompleted) {
      this.setState(state => ({
        todos: state.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(state => ({
        todos: state.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  toggleCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return ({
            ...todo,
            completed: !todo.completed,
          });
        }

        return todo;
      }),
    }));
  }

  editTodo = (title, id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return ({
            ...todo,
            title,
          });
        }

        return todo;
      }),
    }));
  }

  destroyTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }

  changeFilter = (callback) => {
    this.setState({
      todosFilter: callback,
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const {
      todos,
      todosFilter,
    } = this.state;

    return (
      <section className="todoapp">
        <Header createTodo={this.createTodo} />

        <Main
          items={todos}
          todosFilter={todosFilter}
          toggleAllCompleted={this.toggleAllCompleted}
          toggleCompleted={this.toggleCompleted}
          editTodo={this.editTodo}
          destroyTodo={this.destroyTodo}
        />

        {
          this.state.todos.length === 0
            ? ''
            : (
              <Footer
                uncompletedLength={todos.filter(todo => (
                  !todo.completed
                )).length}
                changeFilter={this.changeFilter}
                clearCompleted={this.clearCompleted}
              />
            )
        }
      </section>
    );
  }
}

export default App;
