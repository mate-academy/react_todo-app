import React from 'react';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';

class App extends React.PureComponent {
  state={
    todos: [],
    title: '',
    filter: 'All',
    currentId: 1,
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, currentId } = this.state;

    if (!title.trim()) {
      this.setState({ title: '' });

      return;
    }

    const newTodo = {
      title,
      id: currentId,
      completed: false,
    };

    this.setState(state => ({
      currentId: currentId + 1,
      todos: [...state.todos, newTodo],
      title: '',
    }));
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  handleCompletedChange = (event) => {
    const { id, checked } = event.target;
    const { todos } = this.state;

    this.setState({
      todos: todos.map((todo) => {
        if (todo.id === +id) {
          const result = { ...todo };

          result.completed = checked;

          return result;
        }

        return todo;
      }),
    });
  }

  handleFilter = (filter) => {
    this.setState({ filter });
  }

  handleClearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.completed),
    }));
  }

  handleRemoveItem = (event) => {
    const { id } = event.target;

    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== +id),
    }));
  }

  toggleAllTodosStatus = (event) => {
    const { checked } = event.target;

    if (event.target !== null) {
      this.setState(({ todos }) => ({
        todos: todos.map(todo => ({
          ...todo,
          completed: checked,
        })),
      }));
    }
  }

  render() {
    const { filter, title, todos } = this.state;

    const filteredTodos = todos.filter((todo) => {
      switch (filter) {
        case 'completed':
          return todo.completed;
        case 'active':
          return !todo.completed;
        case 'all':
        default:
          return true;
      }
    });

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleSubmit}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleTitleChange}
              value={title}
            />
          </form>

        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            // checked={todos.every(todo => todo.checked)}
            onChange={this.toggleAllTodosStatus}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          {this.state.todos
          && (
            <TodoList
              todos={filteredTodos}
              filter={filter}
              onTaskCompleted={this.handleCompletedChange}
              onRemove={this.handleRemoveItem}
            />
          )}
        </section>
        {todos.length !== 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {this.state.todos.filter(todo => !todo.completed).length}
              items left
            </span>
            <TodosFilter
              onFilter={this.handleFilter}
              filter={filter !== undefined ? filter : ''}
            />
            <button
              type="button"
              className="clear-completed"
              onClick={this.handleClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )}
      </section>
    );
  }
}

export default App;
