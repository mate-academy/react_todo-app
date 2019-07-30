import React from 'react';
import TodoApp from './TodoApp';
import Todo from './Todo';
import TodosFilter from './TodosFilter';
import getSortFied from './getSortFied';

class App extends React.Component {
  state = {
    todosVisible: [],
    todos: [],
    sortFieldEvent: 'all',
    sortField: 'all',
    isCompletedHide: 0,
    statusAllTodo: true,
  }

  addTodo = (title) => {
    this.setState(prevState => ({
      todos: [...prevState.todos,
        {
          title,
          id: Date.now(),
          completed: false,
        },
      ],
      todosVisible: [...prevState.todosVisible, {
        title,
        id: Date.now(),
        completed: false,
      }],
      completed: prevState.completed,
    }));
  };

  handleFilterBy = (sortField) => {
    this.setState(prevState => ({
      sortFieldEvent: sortField,
      todosVisible: getSortFied(prevState.todos, sortField),
      sortField,
    }));
  }

  handleToggle = (id) => {
    this.setState((prevState) => {
      const task = prevState.todosVisible.find(todo => todo.id === id);
      task.completed = !task.completed;

      if (task.completed) {
        return {
          isCompletedHide: 1,
        };
      }

      return {
        todosVisible: prevState.todosVisible,
      };
    });
  }

  handleChackAll = () => {
    this.setState(prevState => ({
      todosVisible: prevState.todos.map(todo => ({
        ...todo,
        completed: prevState.statusAllTodo,
      }
      )),
      isCompletedHide: 1,
      statusAllTodo: !prevState.statusAllTodo,
    }));
  }

  deleteTodo = (id) => {
    this.setState((prevState) => {
      const todosDelet = prevState.todos.filter(todo => !(todo.id === id));
      return {
        todos: todosDelet,
        todosVisible: getSortFied(todosDelet, prevState.sortField),
      };
    });
  }

  destroyAllComplete = () => {
    this.setState((prevState) => {
      const todosActive = prevState.todosVisible.filter(a => !a.completed);
      return {
        todos: todosActive,
        todosVisible: getSortFied(todosActive, prevState.sortField),
      };
    });
  }

  render() {
    const { todosVisible, sortFieldEvent } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoApp
            onSubmit={this.addTodo}
          />

        </header>

        <section className="main">
          <input
            type="checkbox"
            className="toggle-all"
            id="toggle-all"
            onChange={this.handleChackAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {todosVisible.map(todo => (
              <Todo
                key={todo.id}
                item={todo}
                toggle={this.handleToggle}
                deleteTodo={this.deleteTodo}
              />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${todosVisible.filter(todo => !todo.completed).length}
            items left`}
          </span>

          <ul className="filters">
            <TodosFilter
              sortField={sortFieldEvent}
              handleFilterBy={this.handleFilterBy}
            />
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.destroyAllComplete}
          >
            {this.state.isCompletedHide ? 'Clear completed' : ''}
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
