import React from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './components/NewTodo';
import { FilterList } from './components/FilterList';

const todosFromServer = [
  {
    title: 'Eat',
    id: '1',
    completed: false,
  },
  {
    title: 'Sleep',
    id: '2',
    completed: false,
  },
];

export class App extends React.Component {
  state = {
    todos: todosFromServer,
    activeFilter: 'All',
  };

  addTodo = (todo) => {
    this.setState(prevstate => ({
      todos: [...prevstate.todos, todo],
    }));
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  toggleCheck = (id) => {
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
    }));
  }

  checkAll = () => {
    const { todos } = this.state;

    if (todos.every(todo => todo.completed === true)) {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(prevState => ({
        todos: prevState.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  clearCompleted = () => {
    this.setState(prevstate => ({
      todos: prevstate.todos.filter(todo => todo.completed === false),
    }));
  }

  selectFilter = (name) => {
    this.setState({
      activeFilter: name,
    });
  }

  render() {
    const { todos, activeFilter } = this.state;
    const unfinishedTodos = [...todos].filter(todo => todo.completed === false);
    const finishedTodos = [...todos].filter(todo => todo.completed === true);

    let visibleTodos = [];

    switch (activeFilter) {
      case 'All':
        visibleTodos = todos;
        break;
      case 'Completed':
        visibleTodos = finishedTodos;
        break;
      case 'Active':
        visibleTodos = unfinishedTodos;
        break;
      default:
        visibleTodos = todos;
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <NewTodo addTodo={this.addTodo} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={finishedTodos.length === todos.length}
            onClick={this.checkAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <TodoList
            todos={visibleTodos}
            deleteTodo={this.deleteTodo}
            toggleCheck={this.toggleCheck}
          />

        </section>

        {!!(todos.length) && (
          <footer className="footer">
            <span className="todo-count">
              {`${unfinishedTodos.length} items left`}
            </span>

            <FilterList
              selectFilter={this.selectFilter}
              activeFilter={activeFilter}
            />

            <button
              type="button"
              className="clear-completed"
              onClick={this.clearCompleted}
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
