import React from 'react';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],
      filteredTodos: [],
      inputValue: '',
      lastId: 0,
      editTodoId: 0,
      todoValue: '',
      toggleAll: false,
      showActive: 1,
      showCompleted: 1,
    };
  }

  loadState = () => {
    const state = JSON.parse(localStorage.getItem('state'));
    this.setState({ ...state });
  }

  saveState = () => {
    const state = JSON.stringify(this.state);
    localStorage.setItem('state', state);
  }

  componentDidMount = () => {
    this.loadState();
  }

  componentWillUpdate = () => {
    this.saveState();
  }

  componentWillUnmount = () => {
    this.saveState();
  }

  areAllCompleted = () => {
    let toggleAll = false;

    if (this.state.filteredTodos[0]) {
      toggleAll = this.state.filteredTodos.every(
        todo => todo.completed === true
      );
    }

    this.setState({ toggleAll });
  }

  handleInputChange = (event) => {
    const { value } = event.target;
    const properValue = value.replace(/[^\wА-Яа-яЁё ,.?!@&*()$"":;><]/g, '');

    this.setState({
      inputValue: properValue,
    });
  }

  handleCheckboxChange = (id) => {
    this.setState(prevState => ({

      filteredTodos: prevState.filteredTodos.map((todo) => {
        todo.completed = todo.id === id ? !todo.completed : todo.completed;
        return todo;
      }),

      todos: prevState.todos.map((todo) => {
        todo.completed = todo.id === id ? !todo.completed : todo.completed;
        return todo;
      }),
    }),

    () => {
      this.handleFilter(this.state.showCompleted, this.state.showActive);
    },);
  }

  handleAddTodo = (title) => {
    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: prevState.lastId + 1,
          title,
          completed: false,
        },
      ],
      filteredTodos: [
        ...prevState.filteredTodos,
        {
          id: prevState.lastId + 1,
          title,
          completed: false,
        },
      ],
      lastId: prevState.lastId + 1,
      inputValue: '',
    }),

    () => {
      this.handleFilter(this.state.showCompleted, this.state.showActive);
    },);
  }

  handleFilter = (showCompleted, showActive) => {
    const filteredTodos = JSON.parse(JSON.stringify(this.state.todos));

    this.setState({
      filteredTodos: filteredTodos.filter(todo => (
        (showCompleted && todo.completed === true)
        || (showActive && todo.completed === false)
      )),
      showActive,
      showCompleted,
    },

    () => {
      this.areAllCompleted();
    });
  }

  handleDelCompl = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
      filteredTodos: prevState.filteredTodos.filter(todo => !todo.completed),
    }));
  }

  handleDelTodo = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.id !== id),
      filteredTodos: prevState.filteredTodos.filter(todo => todo.id !== id),
    }),

    () => {
      this.areAllCompleted();
    },);
  }

  handleTodoChange = (event) => {
    const { value } = event.target;
    const properValue = value.replace(/[^\wА-Яа-яЁё ,.?!@&*()$"":;><]/g, '');

    this.setState({
      todoValue: properValue,
    });
  }

  handleTodoSave = (id, title) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      }),
      filteredTodos: prevState.filteredTodos.map((todo) => {
        if (todo.id === id) {
          todo.title = title;
        }
        return todo;
      }),
      editTodoId: 0,
    }));
  }

  toggleAllCompl = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        todo.completed = !prevState.toggleAll;
        return todo;
      }),
      filteredTodos: prevState.filteredTodos.map((todo) => {
        todo.completed = !prevState.toggleAll;
        return todo;
      }),
      toggleAll: !prevState.toggleAll,
    }),

    () => {
      this.handleFilter(this.state.showCompleted, this.state.showActive);
    },);
  }

  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              this.handleAddTodo(this.state.inputValue);
            }}
          >
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={this.state.inputValue}
              onChange={event => this.handleInputChange(event)}
            />
          </form>
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={this.state.toggleAll}
            onChange={() => this.toggleAllCompl()}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {this.state.filteredTodos.map(todo => (
              <li className={todo.completed ? 'completed' : ''} key={todo.id}>
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    id={todo.id}
                    checked={todo.completed}
                    onChange={() => this.handleCheckboxChange(todo.id)}
                  />

                  {this.state.editTodoId === todo.id
                    ? (
                      <form
                        onSubmit={(event) => {
                          event.preventDefault();
                          this.handleTodoSave(todo.id, this.state.todoValue);
                        }}
                      >
                        <input
                          className="new-todo"
                          style={{ border: '1px solid grey' }}
                          value={this.state.todoValue}
                          onChange={event => this.handleTodoChange(event)}
                          autoFocus
                          onBlur={(event) => {
                            event.preventDefault();
                            this.handleTodoSave(todo.id, this.state.todoValue);
                          }}
                        />
                      </form>
                    )
                    : (
                      <label
                        onDoubleClick={() => this.setState({
                          editTodoId: todo.id,
                          todoValue: todo.title,
                        })}
                      >
                        {todo.title}
                      </label>
                    )
                  }

                  <button
                    type="button"
                    className="destroy"
                    onClick={() => this.handleDelTodo(todo.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className="footer" style={{ display: 'block' }}>
          <span className="todo-count">
            {this.state.todos.filter(todo => todo.completed === false).length} items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={this.state.showCompleted && this.state.showActive
                  ? 'selected'
                  : ''
                }
                onClick={() => this.handleFilter(1, 1)}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={!this.state.showCompleted && this.state.showActive
                  ? 'selected'
                  : ''
                }
                onClick={() => this.handleFilter(0, 1)}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={this.state.showCompleted && !this.state.showActive
                  ? 'selected'
                  : ''
                }
                onClick={() => this.handleFilter(1, 0)}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={this.state.filteredTodos.some(todo => todo.completed)
              ? { display: 'block' }
              : { display: 'none' }
            }
            onClick={() => this.handleDelCompl()}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
