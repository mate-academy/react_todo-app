import React from 'react';
import { TodoList } from './components/TodoList';
import { TodoApp } from './components/TodoApp';
import { TodoFooter } from './components/TodoFooter';

class App extends React.Component {
  state = {
    todos: [],
    visibleTodos: [],
    isCompleted: false,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        todo,
      ].filter(todoEach => todoEach.title !== ''),
      visibleTodos: [
        ...prevState.visibleTodos,
        todo,
      ].filter(todoEach => todoEach.title !== ''),
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
      visibleTodos: prevState.visibleTodos.filter(todo => todo.id !== id),
    }));
  };

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.completed === false),
      visibleTodos: prevState.visibleTodos
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
      visibleTodos: prevState.visibleTodos.map((todo) => {
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

  enterEditingMode = (id) => {
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
      visibleTodos: prevState.visibleTodos.map((todo) => {
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
            title: value.replace(/\s/g, ''),
          };
        }

        return todo;
      }),

      visibleTodos: prevState.visibleTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: value.replace(/\s/g, ''),
          };
        }

        return todo;
      }),
    }));
  };

  handleAllCompleted = () => {
    this.setState((prevState) => {
      if (prevState.isCompleted === false) {
        return {
          todos: prevState.todos.map(todo => ({
            ...todo,
            completed: true,
          })),
          visibleTodos: prevState.visibleTodos.map(todo => ({
            ...todo,
            completed: true,
          })),
          isCompleted: !prevState.isCompleted,
        };
      }

      return {
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
        visibleTodos: prevState.visibleTodos.map(todo => ({
          ...todo,
          completed: false,
        })),
        isCompleted: !prevState.isCompleted,
      };
    });
  };

  handleCompletedFilter = () => {
    this.setState(prevState => ({
      visibleTodos: prevState.todos.filter(todo => todo.completed),
    }));
  };

  handleActiveFilter = () => {
    this.setState(prevState => ({
      visibleTodos: prevState.todos.filter(todo => !todo.completed),
    }));
  };

  handleAll = () => {
    this.setState(prevState => ({
      visibleTodos: prevState.todos,
    }));
  };

  render() {
    const { visibleTodos } = this.state;

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
            todos={visibleTodos}
            deleteTodo={this.deleteTodo}
            handleCompleted={this.handleCompleted}
            enterEditingMode={this.enterEditingMode}
            handleChangingEditing={this.handleChangingEditing}
          />
        </section>
        {visibleTodos.length
          ? (
            <TodoFooter
              todos={visibleTodos}
              clearCompleted={this.clearCompleted}
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
