import React from 'react';
import TodoForm from '../TodoForm/TodoForm';
import Todo from '../Todo/Todo';

export default class TodoApp extends React.Component {
  state = {
    todos: [],
    todosToShow: 'all',
  }

  addTodo = (todo) => {
    if (todo.text.trim() !== '') {
      this.setState(prevState => ({
        todos: [todo, ...prevState.todos],
      }));
    }
  };

  handleDelete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
    }));
  }

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === id
          ? {
            ...todo,
            complete: !todo.complete,
          }
          : { ...todo }
      )),
    }));
  };

  updateTodoToShow = (value) => {
    this.setState({
      todosToShow: value,
    });
  }

  clearAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.complete),
    }));
  }

  lengthOfTodos = () => (
    this.state.todos.filter(todo => todo.complete === false).length
  )

  toggleAllComplete = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        complete: !prevState.toggleAllComplete,
      })),
      toggleAllComplete: !prevState.toggleAllComplete,
    }));
  }

  render() {
    const {
      todosToShow,
      todos,
    } = this.state;
    const {
      toggleAllComplete,
      handleDelete,
      toggleComplete,
      lengthOfTodos,
      updateTodoToShow,
      clearAllComplete,
    } = this;
    let todosNew = [];

    if (todosToShow === 'all') {
      todosNew = [...todos];
    } else if (todosToShow === 'active') {
      todosNew = todos.filter(todo => !todo.complete);
    } else if (todosToShow === 'complete') {
      todosNew = todos.filter(todo => todo.complete);
    }

    if (todos.length === 0) {
      return (
        <section className="todoapp">
          <TodoForm className="header" onSubmit={this.addTodo} />
        </section>
      );
    }
    return (
      <section className="todoapp">
        <TodoForm className="header" onSubmit={this.addTodo} />

        <section className="main" style={{ display: 'block' }}>
          <input
            onClick={toggleAllComplete}
            type="checkbox"
            id="toggle-all"
            name="toggleAll"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul className="todo-list">
            {todosNew.map(todo => (
              <Todo
                todos={todosNew}
                todo={todo}
                key={todo.id}
                text={todo.text}
                toDelete={() => handleDelete(todo.id)}
                toggleComplete={() => toggleComplete(todo.id)}
              />
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {`${lengthOfTodos()} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                onClick={() => updateTodoToShow('all')}
                style={{
                  borderColor:
                    todosToShow === 'all'
                      ? 'rgba(175, 47, 47, 0.2)'
                      : '',
                }}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => updateTodoToShow('active')}
                style={{
                  borderColor:
                    todosToShow === 'active'
                      ? 'rgba(175, 47, 47, 0.2)'
                      : '',
                }}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => updateTodoToShow('complete')}
                style={{
                  borderColor:
                    todosToShow === 'complete'
                      ? 'rgba(175, 47, 47, 0.2)'
                      : '',
                }}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={clearAllComplete}
          >
            Clear all complete
          </button>
        </footer>
      </section>
    );
  }
}
