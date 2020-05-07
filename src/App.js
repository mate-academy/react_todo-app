import React from 'react';
import uuid from 'react-uuid';
import * as cn from 'classnames';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    newItemText: '',
    checkedAll: false,
    sortBy: '',
    filterSelected: 'all',
  }

  componentDidMount() {
    if (localStorage.getItem('todos') !== null) {
      const todoItems = JSON.parse(localStorage.getItem('todos'));

      this.setState(todoItems);
    }
  }

  componentDidUpdate() {
    const { todos } = this.state;

    localStorage.setItem('todos', JSON.stringify({ todos }));
  }

  checkAll = ({ target }) => {
    this.setState(({ todos, checkedAll }) => {
      const newTodos = todos.map(todo => ({
        ...todo,
        done: target.checked,
      }));

      return {
        todos: newTodos,
        checkedAll: !checkedAll,
      };
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      newItemText: target.value,
    });
  }

  handleDelete = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(currentTodo => currentTodo.id !== id),
    }));
  };

  toggleItem = (id) => {
    this.setState(({ todos }) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            done: !todo.done,
          };
        }

        return todo;
      });

      const checkedAll = newTodos.every(todo => todo.done === true);

      return {
        todos: newTodos,
        checkedAll,
      };
    });
  }

  handleAddItem = (event) => {
    event.preventDefault();
    this.addItem(this.state.newItemText);
  }

  changeText = (id, text) => {
    this.setState(({ todos }) => {
      const newItems = todos.map((todo) => {
        if (todo.id === id && text !== '') {
          return {
            ...todo,
            text,
          };
        }

        if (todo.id === id && text === '') {
          this.setState(() => ({
            todos: todos.filter(currentTodo => currentTodo.id !== id),
          }));
        }

        return todo;
      });

      return {
        todos: newItems,
      };
    });
  };

  todosFilter = (todos, sortBy) => {
    switch (sortBy) {
      case 'completed':
        return todos.filter(todo => todo.done);
      case 'active':
        return todos.filter(todo => !todo.done);
      default:
        return todos;
    }
  };

  clickHandler = (event) => {
    const sortBy = event.target.name;
    const filterSelected = event.target.name;

    this.setState({
      sortBy,
      filterSelected,
    });
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.done),
      checkedAll: false,
    }));
  };

  addItem(text) {
    if (text.trim() === '') {
      return;
    }

    this.setState(({ todos }) => {
      const newItem = {
        id: uuid(),
        done: false,
        text,
      };

      return {
        todos: [...todos, newItem],
        newItemText: '',
        checkedAll: false,
      };
    });
  }

  render() {
    const {
      todos,
      newItemText,
      checkedAll,
      sortBy,
      filterSelected,
    } = this.state;
    const activeTodos = todos.filter(todo => !todo.done);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleAddItem}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={newItemText}
              onChange={this.handleChange}
            />
          </form>
        </header>

        <section className="main">
          {todos.length
            ? (
              <>
                <input
                  type="checkbox"
                  id="toggle-all"
                  checked={checkedAll}
                  className="toggle-all"
                  onChange={this.checkAll}
                />
                <label htmlFor="toggle-all">
                  Mark all as complete
                </label>
              </>
            )
            : null}
          <TodoList
            todos={this.todosFilter(todos, sortBy)}
            onDelete={this.handleDelete}
            toggleItem={this.toggleItem}
            onTextChanged={this.changeText}
          />
        </section>

        {todos.length
          ? (
            <footer className="footer">
              <span className="todo-count">
                {`${activeTodos.length} items left`}
              </span>
              <ul className="filters">
                <li>
                  <a
                    onClick={this.clickHandler}
                    href="#/"
                    className={cn({ selected: filterSelected === 'all' })}
                    name="all"
                  >
                    All
                  </a>
                </li>

                <li>
                  <a
                    className={cn({ selected: filterSelected === 'active' })}
                    onClick={this.clickHandler}
                    href="#/active"
                    name="active"
                  >
                    Active
                  </a>
                </li>

                <li>
                  <a
                    className={cn({ selected: filterSelected === 'completed' })}
                    onClick={this.clickHandler}
                    href="#/completed"
                    name="completed"
                  >
                    Completed
                  </a>
                </li>
              </ul>
              {todos.some(todo => todo.done === true)
                && (
                  <button
                    type="button"
                    className="clear-completed"
                    onClick={this.clearCompleted}
                  >
                    Clear completed
                  </button>
                )}
            </footer>
          ) : null}
      </section>
    );
  }
}

export default App;
