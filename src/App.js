import React from 'react';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';

class App extends React.Component {
  state = {
    todos: [],
    todosCopied: [],
    todoTitle: '',
    isVisible: false,
    filter: 'All',
    todosActive: 0,
  }

  handleChangeTitle = (event) => {
    this.setState({
      todoTitle: event.target.value,
    });
  }

  handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      this.setState((state) => {
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
          todosActive: state.todosActive + 1,
        };
      });
    }
  }

  handleCompleted = (event) => {
    const { checked, name } = event.target;

    this.setState((state) => {
      let newObj = state.todos.find(todo => todo.id === +name);

      newObj = {
        ...newObj,
        completed: checked,
      };

      return {
        todos: [
          ...state.todos.map((todo) => {
            if (todo.id === +name) {
              todo = newObj;// eslint-disable-line no-param-reassign
            }

            return todo;
          })],
        todosCopied: [
          ...state.todos.map((todo) => {
            if (todo.id === +name) {
              todo = newObj;// eslint-disable-line no-param-reassign
            }

            return todo;
          })],
      };
    });
  }

  handleCompletedFilter = () => {
    this.setState(state => ({
      todos: [...state.todosCopied].filter(todo => todo.completed),
      filter: 'Completed',
      todosActive: 0,
    }));
  }

  handleActiveFilter = () => {
    this.setState(state => ({
      todos: [...state.todosCopied].filter(todo => !todo.completed),
      filter: 'Active',
      todosActive: [...state.todosCopied]
        .filter(todo => !todo.completed).length,
    }));
  }

  handleAllFilter = () => {
    this.setState(state => ({
      todos: [...state.todosCopied],
      filter: 'All',
      todosActive: [...state.todosCopied]
        .filter(todo => !todo.completed).length,
    }));
  }

  handleDeleteTodo = (id) => {
    this.setState(state => ({
      todos: [...state.todos.filter(todo => todo.id !== id)],
      todosCopied: [...state.todosCopied.filter(todo => todo.id !== id)],
    }));
  }

  handleClearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
      todosCopied: state.todosCopied.filter(todo => !todo.completed),
    }));
  }

  handleCompletedAll = () => {
    this.setState(state => ({
      todos: [...state.todos].map(todo => ({
        ...todo,
        completed: !todo.completed,
      })),
    }));
  }

  render() {
    const { todos } = this.state;
    const { todoTitle, isVisible, filter, todosActive } = this.state;

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
            handleEditTodo={this.handleEditTodo}
          />
        </section>

        {isVisible && (
          <TodoFooter
            handleCompletedFilter={this.handleCompletedFilter}
            handleActiveFilter={this.handleActiveFilter}
            handleAllFilter={this.handleAllFilter}
            clearCompleted={this.handleClearCompleted}
            filter={filter}
            todosActive={todosActive}
          />
        )}
      </section>
    );
  }
}

export default App;
