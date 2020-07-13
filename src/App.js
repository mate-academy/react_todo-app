import React from 'react';
import { uuid } from 'uuidv4';
import { NewTodo } from './components/NewTodo/NewTodo';
import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    checked: false,
    filter: 'All',
  }

  onAdd = (newTodo) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          ...newTodo,
          id: uuid(),
        },
      ],
    }));
  }

  handleFlag = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        value === todo.id
          ? {
            ...todo,
            isCompleted: !todo.isCompleted,
          }
          : todo
      )),
    }));
  }

  handleAllFlag = () => {
    this.setState(prevState => ({
      checked: !prevState.checked,
      todos: prevState.todos.map(todo => ({
        ...todo,
        isCompleted: !prevState.checked,
      })),
    }));
  }

  changeFilterType = (event) => {
    const { name } = event.target;

    this.setState({
      filter: name,
    });
  }

  onDelete = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== value),
    }));
  }

  onClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.isCompleted),
    }));
  }

  render() {
    const { todos, checked, filter } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTodo onAdd={this.onAdd} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onChange={this.handleAllFlag}
            checked={checked}
          />
          <label
            htmlFor="toggle-all"
          >
            Mark all as complete
          </label>

          <TodoList
            filter={filter}
            handleFlag={this.handleFlag}
            todos={todos}
            onDelete={this.onDelete}
          />
        </section>

        {todos.length > 0
        && (
          <footer className="footer">
            <span className="todo-count">
              {`${todos.filter(todo => !todo.isCompleted).length} items left`}
            </span>

            <ul className="filters">
              <li>
                <button
                  type="button"
                  className="selected"
                  name="All"
                  onClick={this.changeFilterType}
                >
                  All
                </button>
              </li>

              <li>
                <button
                  type="button"
                  name="Active"
                  onClick={this.changeFilterType}
                >
                  Active
                </button>
              </li>

              <li>
                <button
                  type="button"
                  name="Completed"
                  onClick={this.changeFilterType}
                >
                  Completed
                </button>
              </li>
            </ul>

            <button
              type="button"
              className="clear-completed"
              onClick={this.onClearCompleted}
            >
              Clear completed
            </button>
          </footer>
        )
        }
      </section>
    );
  }
}

export default App;
