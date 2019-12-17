import React from 'react';
import NewTodo from './NewTodo';
import TodoList from './TodoList';
import TodosFilters from './TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    selectedFilter: 'All',
  };

  addNewTodo = (newTodo) => {
    if (newTodo.trim() === '') {
      return;
    }

    this.setState(state => ({
      todos: [
        ...state.todos,
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

  changeAllStatuses = (event) => {
    const status = event.target.checked;

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
      todos: state.todos.filter(item => item.id !== todoId),
    }));
  };

  clearAllCompletedTodos = () => {
    this.setState(state => ({
      todos: state.todos.filter(item => item.completed === false),
    }));
  };

  visibleTodos = (todo) => {
    switch (this.state.selectedFilter) {
      case 'All':
        return true;
      case 'isActive':
        return !todo.completed;
      case 'Completed':
        return todo.completed;
      default:
        return true;
    }
  };

  render() {
    const { todos } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addNewTodo={this.addNewTodo} />
        </header>

        {(todos.length > 0) && (
          <section className="main" style={{ display: 'block' }}>
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              checked={todos.every(todo => todo.completed)}
              onChange={this.changeAllStatuses}
            />

            <label htmlFor="toggle-all">Complete</label>

            <TodoList
              todos={todos.filter(this.visibleTodos)}
              changeTodoStatus={this.changeTodoStatus}
              deleteTodo={this.deleteTodo}
            />

          </section>
        )}

        {(todos.length > 0) && (
          <footer className="footer" style={{ display: 'block' }}>
            <span className="todo-count">
              {todos.filter(item => !item.completed).length}
              {' '}
              items left
            </span>

            <TodosFilters filterTodos={this.filterTodos} />

            {todos.some(item => item.completed === true) && (
              <button
                type="button"
                className="clear-completed"
                style={{ display: 'block' }}
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
