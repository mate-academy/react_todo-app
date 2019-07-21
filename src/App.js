import React from 'react';
import Todo from './Todo';

class App extends React.Component {
  state = {
    allToggled: false,
    showContent: false,
    isDoneTodoes: false,
    value: '',
    todoes: [],
  }

  handleFilterClear = () => {
    this.setState(prevState => ({
      todoes: [...prevState.todoes],
    }));
  }

  handleFilterCompleted = () => {
    this.setState(prevState => ({
      todoes: [...prevState.todoes.filter(todo => todo.isDone)],
    }));
  }

  handleFilterActive = () => {
    this.setState(prevState => ({
      todoes: [...prevState.todoes.filter(todo => !todo.isDone)],
    }));
  }

  toggle = (id) => {
    this.setState(prevState => ({
      todoes: prevState.todoes.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          isDone: !todo.isDone,
        };
      }),
      isDoneTodoes: !prevState.todoes.filter(todo => todo.isDone).length > 0,
    }));
  }

  toggleAll = () => {
    this.setState(prevState => ({
      todoes: prevState.todoes.map((todo) => {
        if (prevState.allToggled === false) {
          return {
            ...todo,
            isDone: true,
          };
        }

        return {
          ...todo,
          isDone: false,
        };
      }),
      allToggled: !prevState.allToggled,
      isDoneTodoes: !prevState.todoes.filter(todo => todo.isDone).length > 0,
    }));
  }

  addTask = (event) => {
    if (event.key === 'Enter' && event.target.value.length > 0) {
      this.setState(prevState => ({
        todoes: [...prevState.todoes, {
          id: Date.now(),
          title: prevState.value,
          isDone: false,
        }],
        value: '',
        showContent: true,
      }));
    }
  }

  destroy = (id) => {
    this.setState(prevState => ({
      todoes: prevState.todoes.filter(todo => todo.id !== id),
      showContent: !(prevState.todoes.length < 2),
      isDoneTodoes: !prevState.todoes.filter(todo => todo.isDone).length > 0,
    }));
  }

  destroyCompleted = () => {
    this.setState(prevState => ({
      todoes: prevState.todoes.filter(todo => todo.isDone === false),
      isDoneTodoes: false,
    }));
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const {
      showContent,
      isDoneTodoes,
      todoes,
      value,
    } = this.state;
    const resultingList = todoes.length !== 0

      ? todoes.map(todo => (
        <Todo todo={todo} toggle={this.toggle} destroy={this.destroy} />
      ))
      : '';

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={event => event.preventDefault()}>
            <input
              className="new-todo"
              onChange={this.handleChange}
              value={value}
              placeholder="What needs to be done?"
              onKeyDown={this.addTask}
            />

          </form>

        </header>

        {showContent
          && (
            <div className="content-group">

              <section className="main">
                <input
                  type="checkbox"
                  id="toggle-all"
                  className="toggle-all"
                  onClick={this.toggleAll}
                />
                <label
                  htmlFor="toggle-all"
                  id="label"
                >
                  Mark all as complete
                </label>

                <ul className="todo-list">

                  {resultingList}

                </ul>
              </section>

              <footer className="footer">
                <span className="todo-count">
                  {`${todoes.filter(todo => (!todo.isDone)).length} items left`}
                </span>

                <ul className="filters">
                  <li>
                    <a
                      href="#/"
                      className="selected"
                      onClick={this.handleFilterClear}
                    >
                      All
                    </a>
                  </li>

                  <li>
                    <a
                      href="#/active"
                      onClick={this.handleFilterActive}
                    >
                      Active
                    </a>
                  </li>

                  <li>
                    <a
                      href="#/completed"
                      onClick={this.handleFilterCompleted}
                    >
                      Completed
                    </a>
                  </li>
                </ul>
                {isDoneTodoes && (
                  <button
                    type="button"
                    onClick={this.destroyCompleted}
                    className="clear-completed"
                  >
                    Clear completed
                  </button>
                )}

              </footer>
            </div>)
        }
      </section>
    );
  }
}

export default App;
