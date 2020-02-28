import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoApp } from './components/TodoApp';
import { TodoFooter } from './components/TodoFooter';

class App extends React.Component {
  state = {
    todos: [],
    originalTodos: [],
    isComplete: false,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ],
      originalTodos: [
        ...prevState.originalTodos,
        todo,
      ],
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
      originalTodos: prevState.originalTodos.filter(todo => todo.id !== id),
    }));
  };

  clearComponent = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
      originalTodos: prevState.originalTodos
        .filter(todo => todo.completed === false),
    }));
  };

  handleCompleted = (id) => {
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
      originalTodos: prevState.originalTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  };

  handleDoubleEditing = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            edit: !todo.edit,
          };
        }

        return todo;
      }),
      originalTodos: prevState.originalTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            edit: !todo.edit,
          };
        }

        return todo;
      }),
    }));
  };

  handleChangingEditing = (id, value) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: value,
          };
        }

        return todo;
      }),

      originalTodos: prevState.originalTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: value,
          };
        }

        return todo;
      }),
    }));
  };

  handleAllCompleted = () => {
    this.setState((prevState) => {
      if (prevState.isComplete === false) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: true,
          })),
          originalTodos: prevState.originalTodos.map(todo => ({
            ...todo,
            completed: true,
          })),
          isComplete: !prevState.isComplete,
        };
      }

      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
        originalTodos: prevState.originalTodos.map(todo => ({
          ...todo,
          completed: false,
        })),
        isComplete: !prevState.isComplete,
      };
    });
  };

  handleCompletedFilter = () => {
    this.setState(prevState => ({
      todos: prevState.originalTodos.filter(todo => todo.completed === true),
    }));
  };

  handleActiveFilter = () => {
    this.setState(prevState => ({
      todos: prevState.originalTodos.filter(todo => todo.completed === false),
    }));
  };

  handleAll = () => {
    this.setState(prevState => ({
      todos: prevState.originalTodos,
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoApp addTodo={this.addTodo} />

        </header>

        <section className="main">
          <input
            onClick={this.handleAllCompleted}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={todos}
            deleteTodo={this.deleteTodo}
            handleCompleted={this.handleCompleted}
            handleDoubleEditing={this.handleDoubleEditing}
            handleChangingEditing={this.handleChangingEditing}
          />
        </section>
        {todos.length
          ? (
            <TodoFooter
              todos={todos}
              clearComponent={this.clearComponent}
              handleCompletedFilter={this.handleCompletedFilter}
              handleActiveFilter={this.handleActiveFilter}
              handleAll={this.handleAll}
            />
          )
          : (<></>)
        }
      </section>
    );
  }
}

export default App;
