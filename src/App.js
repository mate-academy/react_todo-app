import React from 'react';
import TodoList from './components/TodoList';
import TodosFilter from './components/TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    title: '',
    currentId: 1,
    activeItems: 'all',
    allSelected: false,
  };

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  toggleTodoStatus = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }), () => this.setAllTodosStatus());
  }

  toggleAllTodosStatus = () => {
    this.setState(({ todos, allSelected }) => ({
      todos: todos.map(todo => ({
        ...todo,
        completed: !allSelected,
      })),
      allSelected: !allSelected,
    }));
  }

  addTodo = (event) => {
    event.preventDefault();

    const { title, currentId } = this.state;

    if (!title.trim()) {
      this.setState({ title: '' });

      return;
    }

    const newTodo = {
      id: currentId,
      title,
      completed: false,
    };

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      title: '',
      currentId: state.currentId + 1,
    }), () => this.setAllTodosStatus());
  }

  deleteTodo = (todoId) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== todoId),
    }), () => this.setAllTodosStatus());
  }

  setAllTodosStatus = () => {
    const { todos } = this.state;
    const allSelected = todos.every(todo => todo.completed);

    this.setState({ allSelected });
  }

  setActiveTodos = (item) => {
    this.setState({ activeItems: item });
  }

  clearCompletedTodos = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.completed),
    }));
  }

  listFilter = (items) => {
    const { todos } = this.state;

    switch (items) {
      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }

  render() {
    const { todos, title, allSelected, activeItems } = this.state;
    const visibleList = this.listFilter(activeItems);
    const todosFilters = ['all', 'active', 'completed'];

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addTodo}>
            <input
              type="text"
              className="new-todo"
              placeholder="What needs to be done?"
              value={title}
              onChange={this.handleTitleChange}
            />
          </form>
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={allSelected}
            onChange={this.toggleAllTodosStatus}
          />
          {todos.length > 0 && (
            <label
              htmlFor="toggle-all"
            >
              Mark all as complete
            </label>
          )}

          <TodoList
            items={visibleList}
            onStatusToggle={this.toggleTodoStatus}
            onDeleteTodo={this.deleteTodo}
          />
        </section>

        {todos.length > 0 && (
          <footer className="footer">

            <span className="todo-count">
              {todos.filter(todo => !todo.completed).length}
              {' '}
              items left
            </span>

            <ul className="filters">
              {todosFilters.map(filter => (
                <TodosFilter
                  key={filter}
                  filterName={filter}
                  currentActiveItems={activeItems}
                  setActiveItems={this.setActiveTodos}
                />
              ))}
            </ul>

            {todos.some(todo => todo.completed) && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearCompletedTodos}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}

      </section>
    );
  }
}

export default App;
