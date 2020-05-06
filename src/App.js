import React from 'react';
import { TodoList } from './components/TodoList';

class App extends React.Component {
  state = {
    todos: [],
    id: 0,
    title: '',
    tempTitle: '',
    filter: 'all',
    isAllBtnSelected: false,
    isActiveBtnSelected: false,
    isCompletedBtnSelected: false,
  }

  handleInputTitle = ({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  addNewTodo = () => {
    if (this.state.title.trim() !== '') {
      this.setState(state => ({
        todos: [
          ...state.todos,
          {
            id: state.id + 1,
            title: state.title,
            completed: false,
            edited: false,
          }],
        id: state.id + 1,
        title: '',
      }));
    }
  }

  editTodo = (id, title) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            edited: !todo.edited,
          };
        }

        return todo;
      }),
      tempTitle: title,
    }));
  }

  editCurrentTitle = ({ target }) => {
    const id = +target.id;
    const { value } = target;

    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: value,
          };
        }

        return todo;
      }),
    }));
  }

  handleEditingTitle = ({ key, target, type }) => {
    if ((key === 'Enter' && target.value.trim() !== '')
      || type === 'blur') {
      const id = +target.id;

      this.setState(state => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              edited: false,
            };
          }

          return todo;
        }),
      }));
    }

    if (key === 'Escape') {
      const id = +target.id;

      this.setState(state => ({
        todos: state.todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              title: state.tempTitle,
              edited: false,
            };
          }

          return todo;
        }),
      }));
    }
  }

  deleteTodo = ({ target }) => {
    const todoId = this.state.todos.findIndex(todo => todo.id === +target.id);

    this.setState((state) => {
      const remainingTodos = [...state.todos];

      remainingTodos.splice(todoId, 1);

      return (
        {
          todos: [...remainingTodos],
        }
      );
    });
  }

  changeStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
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

  filterAll = () => {
    this.setState({
      filter: 'all',
      isAllBtnSelected: true,
      isActiveBtnSelected: false,
      isCompletedBtnSelected: false,
    });
  }

  filterActive = () => {
    this.setState({
      filter: 'active',
      isAllBtnSelected: false,
      isActiveBtnSelected: true,
      isCompletedBtnSelected: false,
    });
  }

  filterCompleted = () => {
    this.setState({
      filter: 'completed',
      isAllBtnSelected: false,
      isActiveBtnSelected: false,
      isCompletedBtnSelected: true,
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.completed === false),
    }));
  }

  selectAll = ({ target }) => {
    if (!target.checked) {
      this.setState(state => ({
        isAllSelected: !state.isAllSelected,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: false,
        })),
      }));
    } else {
      this.setState(state => ({
        isAllSelected: !state.isAllSelected,
        todos: state.todos.map(todo => ({
          ...todo,
          completed: true,
        })),
      }));
    }
  }

  render() {
    const {
      todos,
      title,
      filter,
      tempTitle,
      isActiveBtnSelected,
      isAllBtnSelected,
      isCompletedBtnSelected,
    } = this.state;

    let currentTodos = [...todos];

    if (filter === 'active') {
      currentTodos = currentTodos.filter(todo => !todo.completed);
    }

    if (filter === 'completed') {
      currentTodos = currentTodos.filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.addNewTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.handleInputTitle}
              value={title}
            />
          </form>
        </header>

        <section className="main">
          {todos.length > 0 && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onChange={this.selectAll}
                checked={todos.every(todo => todo.completed)}
              />
              <label htmlFor="toggle-all">
                Mark all as complete
              </label>
            </>
          )}

          <TodoList
            todos={currentTodos}
            editTodo={this.editTodo}
            tempTitle={tempTitle}
            deleteTodo={this.deleteTodo}
            changeStatus={this.changeStatus}
            editCurrentTitle={this.editCurrentTitle}
            handleEditingTitle={this.handleEditingTitle}
          />
        </section>
        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              {todos.filter(todo => !todo.completed).length}
              {' '}
              items left
            </span>

            <ul className="filters">
              <li>
                <a
                  href="#/"
                  className={isAllBtnSelected ? 'selected' : ''}
                  onClick={this.filterAll}
                >
                  All
                </a>
              </li>

              <li>
                <a
                  href="#/active"
                  className={isActiveBtnSelected ? 'selected' : ''}
                  onClick={this.filterActive}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  className={isCompletedBtnSelected ? 'selected' : ''}
                  onClick={this.filterCompleted}
                >
                  Completed
                </a>
              </li>
            </ul>
            {todos.filter(todo => todo.completed).length > 0 && (
              <button
                type="button"
                className="clear-completed"
                onClick={this.clearCompleted}
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
