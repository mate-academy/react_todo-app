import React from 'react';

import AddTodoForm from './components/AddTodoForm/AddTodoForm';
import TodoList from './components/TodoList/TodoList';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    showParam: 'all',
  };

  componentDidMount() {
    const storageTodos = JSON.parse(localStorage.getItem('todos'));

    if (storageTodos) {
      this.setState({
        todos: storageTodos,
      });
    }
  }

  componentDidUpdate(prevState) {
    const { todos } = this.state;

    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  }

  updateTodosShow = (todoToShow) => {
    this.setState({ showParam: todoToShow });
  }

  handleRemove = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        todo.id !== id
      )),
    }));
  }

  handleRemoveCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => (
        !todo.completed
      )),
    }));
  }

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  toggleCompleteAll = () => {
    if (this.state.todos.every(todo => (todo.completed))) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  setNewTitle = (id, newTitle) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            content: newTitle,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    const { todos, showParam } = this.state;
    let todoView = [];
    const itemLeft = todos.filter(todo => (
      !todo.completed)).length;

    switch (showParam) {
      case 'active':
        todoView = [...todos].filter(todo => (
          !todo.completed
        ));
        break;
      case 'completed':
        todoView = [...todos].filter(todo => (
          todo.completed
        ));
        break;
      default:
        todoView = [...todos];
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <AddTodoForm addTodo={this.addTodo} />
        </header>
        {(todos.length)
          ? (
            <>
              <section className="main">
                <input
                  onClick={this.toggleCompleteAll}
                  checked={!itemLeft}
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                />
                <label htmlFor="toggle-all">Mark all as complete</label>
                <TodoList
                  todos={todoView}
                  remove={this.handleRemove}
                  toggleComplete={this.toggleComplete}
                  setNewTitle={this.setNewTitle}
                />
              </section>
              <Footer
                todos={todos}
                itemLeft={itemLeft}
                updateTodosShow={this.updateTodosShow}
                handleRemoveCompleted={this.handleRemoveCompleted}
              />
            </>
          ) : ''}
      </section>
    );
  }
}

export default App;
