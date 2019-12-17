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
      <section>
        <header>
          <h1>todos</h1>
          <NewTodo addNewTodo={this.addNewTodo} />
        </header>

        {(todos.length > 0) && (
          <section style={{ display: 'block' }}>
            <input
              type="checkbox"
              id="toggle-all"
              checked={todos.every(todo => todo.completed)}
              onChange={this.changeAllStatuses}
            />

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
