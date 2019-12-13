import React from 'react';
import TodoList from './TodoList';
import NewTodo from './NewTodo';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    selectedFilter: 'All',
  };

  addNewTodo = (newTodo) => {
    const reg = new RegExp('^\x20+');

    if (newTodo === '' || reg.test(newTodo)) {
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

  changeTodoStatus = (todoId, status) => {
    this.setState(state => ({
      todos: state.todos.map((item) => {
        if (item.id !== todoId) {
          return item;
        }

        return {
          ...item,
          completed: status,
        };
      }),
    }));
  };

  changeAllStatuses = (event) => {
    const status = event.target.checked;

    this.setState(state => ({
      todos: state.todos.map(item => ({
        ...item,
        completed: status,
      })),
    }));
  };

  filterTodos = (filterSelected) => {
    this.setState({
      selectedFilter: filterSelected,
    });
  };

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
      case 'Active':
        return todo.completed === false;
      case 'Completed':
        return todo.completed === true;
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
            <label htmlFor="toggle-all">Mark all as complete</label>

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

            <TodosFilter filterTodos={this.filterTodos} />

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
