import React from 'react';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const filters = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

class App extends React.Component {
  state = {
    todos: [],
    todoTitle: '',
    isVisible: false,
    selectedFilter: filters.all,
  }

  handleTitleChange = (e) => {
    this.setState({
      todoTitle: e.target.value,
    });
  }

  handleCreateNewTodo = (event) => {
    event.preventDefault();
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
        isVisible: true,
        todoTitle: '',
      };
    });
  }

  handleCompleted = (e) => {
    const { checked, name } = e.target;

    this.setState((state) => {
      const todoCompleted = state.todos.find(todo => todo.id === +name);

      return {
        todos: [
          ...state.todos.map((todo) => {
            if (todo.id === +name) {
              return {
                ...todoCompleted,
                completed: checked,
              };
            }

            return todo;
          }),
        ],
      };
    });
  }

  getFilteredTodos = () => {
    const { selectedFilter, todos } = this.state;

    if (selectedFilter === filters.active) {
      return todos.filter(todo => !todo.completed);
    }

    if (selectedFilter === filters.completed) {
      return todos.filter(todo => todo.completed);
    }

    return todos;
  }

  setFilter = (selectedFilter) => {
    this.setState({
      selectedFilter,
    });
  }

  handleDeleteTodo = (id) => {
    let footerIsVisible = true;

    if (this.state.todos.length <= 1) {
      footerIsVisible = false;
    }

    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
      isVisible: footerIsVisible,
    }));
  }

  handleClearCompleted = () => {
    let footerIsVisible = true;

    if (this.state.todos.length <= 1) {
      footerIsVisible = false;
    }

    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
      isVisible: footerIsVisible,
    }));
  }

  handleCompletedAll = ({ target }) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  render() {
    const { todoTitle, isVisible, selectedFilter, todos } = this.state;
    const filteredTodos = this.getFilteredTodos();

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleCreateNewTodo}>
            <input
              value={todoTitle}
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleTitleChange}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={event => this.handleCompletedAll(event)}
          />
          {isVisible && (
            <label
              htmlFor="toggle-all"
            >
              Mark all as completed
            </label>
          )}

          <TodoList
            todos={filteredTodos}
            deleteTodo={this.handleDeleteTodo}
            handleCompleted={this.handleCompleted}
          />
        </section>

        {isVisible && (
          <Footer
            clearCompleted={this.handleClearCompleted}
            filter={selectedFilter}
            todos={todos}
            setFilter={this.setFilter}
            itemsLeft={todos.filter(todo => !todo.completed).length}
            clearVisibleButton={
              todos.filter(todo => todo.completed).length >= 1
            }
          />
        )}
      </section>
    );
  }
}

export default App;
