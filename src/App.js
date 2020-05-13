import React from 'react';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';

const filters = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

class App extends React.Component {
  state = {
    todos: [],
    todosCopied: [],
    todoTitle: '',
    isVisible: false,
    filter: '',
  }

  handleChangeTitle = (event) => {
    this.setState({
      todoTitle: event.target.value,
    });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.setState((state) => {
        if (state.todoTitle === '') {
          return false;
        }

        const newTitle = {
          id: state.todos.length + 1,
          title: state.todoTitle,
          completed: false,
        };

        return {
          todos: [...state.todos, newTitle],
          todosCopied: [...state.todos, newTitle],
          isVisible: true,
          todoTitle: '',
          filter: 'All',
        };
      });
    }
  }

  handleCompleted = (event) => {
    const { checked, name } = event.target;

    this.setState((state) => {
      let todoCompleted = state.todos.find(todo => todo.id === +name);

      todoCompleted = {
        ...todoCompleted,
        completed: checked,
      };

      return {
        todos: [
          ...state.todos.map((todo) => {
            if (todo.id === +name) {
              todo = todoCompleted;// eslint-disable-line no-param-reassign
            }

            return todo;
          })],
        todosCopied: [
          ...state.todos.map((todo) => {
            if (todo.id === +name) {
              todo = todoCompleted;// eslint-disable-line no-param-reassign
            }

            return todo;
          })],
      };
    });
  }

  handleCompletedFilter = () => {
    this.setState(state => ({
      todos: [...state.todosCopied].filter(todo => todo.completed),
      filter: filters.completed,
    }));
  }

  handleActiveFilter = () => {
    this.setState(state => ({
      todos: [...state.todosCopied].filter(todo => !todo.completed),
      filter: filters.active,
    }));
  }

  handleAllFilter = () => {
    this.setState(state => ({
      todos: [...state.todosCopied],
      filter: filters.all,
    }));
  }

  handleDeleteTodo = (id) => {
    let footerIsVisible = true;

    if (this.state.todosCopied.length <= 1) {
      footerIsVisible = false;
    }

    this.setState(state => ({
      todos: [...state.todos.filter(todo => todo.id !== id)],
      todosCopied: [...state.todosCopied.filter(todo => todo.id !== id)],
      isVisible: footerIsVisible,
    }));
  }

  handleClearCompleted = () => {
    let footerIsVisible = true;

    if (this.state.todosCopied.length <= 1) {
      footerIsVisible = false;
    }

    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
      todosCopied: state.todosCopied.filter(todo => !todo.completed),
      isVisible: footerIsVisible,
    }));
  }

  handleCompletedAll = () => {
    this.setState((state) => {
      let filteredTodos = [...state.todos];

      if (state.todos.length !== state.todos
        .filter(todo => todo.completed).length) {
        filteredTodos = [...state.todos].map(todo => ({
          ...todo,
          completed: false,
        }));
      }

      return {
        todos: filteredTodos.map(todo => ({
          ...todo,
          completed: !todo.completed,
        })),
      };
    });
  }

  render() {
    const { todoTitle, isVisible, filter, todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            value={todoTitle}
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.handleChangeTitle}
            onKeyDown={this.handleKeyDown}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.handleCompletedAll}
          />
          {isVisible && (
            <label
              htmlFor="toggle-all"
            >
              Mark all as complete
            </label>
          )}

          <TodoList
            todos={todos}
            deleteTodo={this.handleDeleteTodo}
            handleCompleted={this.handleCompleted}
          />
        </section>

        {isVisible && (
          <TodoFooter
            handleCompletedFilter={this.handleCompletedFilter}
            handleActiveFilter={this.handleActiveFilter}
            handleAllFilter={this.handleAllFilter}
            clearCompleted={this.handleClearCompleted}
            filter={filter}
            todos={todos}
            itemsLeft={todos.filter(todo => !todo.completed).length}
            clearVisibleButton={todos
              .filter(todo => todo.completed).length >= 1}
          />
        )}
      </section>
    );
  }
}

export default App;
