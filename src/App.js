import React from 'react';
import Todo from './Todo';

/*
const myStorage = window.localStorage;

window.onbeforeunload = closingCode;
function closingCode() {
  // do something...
  return null;
}

 */

class App extends React.Component {
  state = {
    allToggled: false,
    showContent: false,
    value: '',
    todoes: [],
  }

  /*   componentDidMount() {
      const myLocaleStorage = myStorage.getItem('todoes');

      if (myLocaleStorage === 'undefined') {
        this.setState({
          todoes: JSON.parse(myLocaleStorage),
        })
      }
    }

    componentWillUnmount() {
      myStorage.setItem('todoes', JSON.stringify(this.state.todoes));
    } */

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
    }));
  }

  destroy = (id) => {
    this.setState(prevState => ({
      todoes: prevState.todoes.filter(todo => todo.id !== id),
      showContent: !(prevState.todoes.length < 2),
    }));
  }

  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  /*   handleFilterDone = () => {
      this.setState(prevState => ({
        todoes: prevState.todoes.filter(todo => (
          todo.isDone
        )),
      }))
    }

    handleFilterNotDone = () => {
      this.setState(prevState => ({
        todoes: prevState.todoes.filter(todo => (
          !todo.isDone
        )),
      }))
    }
   */

  render() {
    const { showContent, todoes, value } = this.state;
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
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
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
              }}
            />

          </form>

        </header>

        {showContent === true
          ? (
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
                    >
                      All
                    </a>
                  </li>

                  <li>
                    <a
                      href="#/active"
                      onClick={() => this.handleFilterNotDone}
                    >
                      Active
                    </a>
                  </li>

                  <li>
                    <a
                      href="#/completed"
                      onClick={() => this.handleFilterDone}
                    >
                      Completed
                    </a>
                  </li>
                </ul>

                <button
                  type="button"
                  className="clear-completed"
                  style={{ display: 'block' }}
                />
              </footer>
            </div>)
          : <span></span>}
      </section>
    );
  }
}

export default App;
