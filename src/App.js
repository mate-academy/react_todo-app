import React from 'react';
import TodoApp from './components/TodoApp';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      filterTodos: [],
      filterDescription: 'all',
      statusAllTodo: true,
    };
  }

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
      statusAllTodo: true,
    }));
  };

  changeTodoCompleted = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id !== id
          ? todo
          : { ...todo, completed: !todo.completed }
      )),
    }));
  };

  destroyTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  };

  destroyAllCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      filterTodos: [],
    }));
  };

  changeStatusAllTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.statusAllTodo,
      })),
      statusAllTodo: !prevState.statusAllTodo,
    }));
  };

  render() {
    const { todos, filterTodos, filterDescription } = this.state;
    const todosFilter = (desc) => {
      this.setState((prevState) => {
        switch (desc) {
          case 'all':

            return ({
              filterTodos: prevState.todos,
              filterDescription: 'all',
            });
          case 'active':

            return ({
              filterTodos: prevState.todos
                .filter(todo => !todo.completed),
              filterDescription: 'active',
            });
          case 'completed':

            return ({
              filterTodos: prevState.todos
                .filter(todo => todo.completed),
              filterDescription: 'completed',
            });
          default:

            return true;
        }
      });
    };

    return (
      <section className="todoapp">

        <TodoApp
          todos={todos}
          addTodo={this.addTodo}
          filterTodos={filterTodos}
          filterDescription={filterDescription}
          changeTodoCompleted={this.changeTodoCompleted}
          changeTodoCompletedAll={this.changeStatusAllTodos}
          destroyTodo={this.destroyTodo}
        />
        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {(todos.filter(todo => !todo.completed)).length}
            <> items left</>
          </span>

          <ul className="filters">
            <li>
              <a
                onClick={() => todosFilter('all')}
                href="#/"
                className={filterDescription === 'all'
                  ? 'selected' : ''
                }
              >
                All
              </a>
            </li>

            <li>
              <a
                onClick={() => todosFilter('active')}
                className={filterDescription === 'active'
                  ? 'selected' : ''
                }
                href="#/active"
              >
                Active
              </a>
            </li>

            <li>

              <a
                onClick={() => todosFilter('completed')}
                className={filterDescription === 'completed'
                  ? 'selected' : ''
                }
                href="#/completed"
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            onClick={this.destroyAllCompletedTodos}
            type="button"
            className="clear-completed"
            style={this.state.todos
              .some(todo => todo.completed)
              ? { display: 'block' }
              : { display: 'none' }}
          >
            Сlear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
