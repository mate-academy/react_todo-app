import React from 'react';
import TodoList from './TodoList';
import NewTodo from './NewTodo';
import TodosFilters from './TodosFilter';

const FILTER_TYPES = {
  all: 'All',
  completed: 'Completed',
  active: 'Active',
};

class App extends React.Component {
  state = {
    todos: [],
    selectedFilter: 'All',
  }

  addNewTodo = (newTodo) => {
    if (newTodo.trim() === '') {
      return;
    }

    this.setState(state => ({
      todos: [...state.todos,
        {
          id: +new Date(),
          title: newTodo,
          completed: false,
        },
      ],
    }));
  };

  changeTodoStatus = (todoId) => {
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
    }));
  };

  changeAllStatuses = (e) => {
    const status = e.target.checked;

    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: status,
      })),
    }));
  };

  filterTodos = (selectedFilter) => {
    this.setState({
      selectedFilter,
    });
  }

  deleteTodo = (todoId) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== todoId),
    }));
  };

selectVisibleTodos = () => this.state.todos.filter((todo) => {
  switch (this.state.selectedFilter) {
    case FILTER_TYPES.active:
      return !todo.completed;
    case FILTER_TYPES.completed:
      return todo.completed;
    default:
      return true;
  }
})

  clearAllCompletedTodos = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addNewTodo={this.addNewTodo} />
        </header>

        {todos.length > 0 && (
          <section className="main">
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={todos.every(todo => todo.completed)}
              onChange={this.changeAllStatuses}
            />
            <label htmlFor="toggle-all">
            Mark all as complete
            </label>
            <TodoList
              todos={this.selectVisibleTodos()}
              changeTodoStatus={this.changeTodoStatus}
              deleteTodo={this.deleteTodo}
            />
          </section>
        )}
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {todos.filter(todo => !todo.completed).length}
              &nbsp;
               items left
            </span>

            <TodosFilters filterTodos={this.filterTodos} />

            {todos.some(todo => todo.completed) && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearAllCompletedTodos}
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
