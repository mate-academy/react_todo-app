import React from 'react';
import Todo from './Todo'

const myStorage = window.localStorage;

window.onbeforeunload = closingCode;
function closingCode() {
  // do something...
  return null;
}

class App extends React.Component {
  state = {
    allToggled: false,
    showContent: true,
    todoes: [{
      id: '1',
      title: '11111',
      isDone: false,
    },
    {
      id: '2',
      title: '2222',
      isDone: false,
    },
    {
      id: '3',
      title: '33333',
      isDone: false,
    },
    ],
  }

  componentDidMount() {
    const myLocaleStorage = myStorage.getItem('todoes');
    if (myLocaleStorage === 'undefined') {
      this.setState({
        todoes: JSON.parse(myLocaleStorage)
      })
    }
  }

  componentWillUnmount() {
    myStorage.setItem('todoes', JSON.stringify(this.state.todoes));
  }

  toggle = (id) => {
    this.setState(prevState => ({
      todoes: prevState.todoes.map(todo => {
        if (todo.id !== id) {
          return todo
        }
        else {
          return {
            ...todo,
            isDone: !todo.isDone,
          }
        }
      }
      )
    }))
  }

  toggleAll = () => {
    this.setState(prevState => ({
      todoes: prevState.todoes.map(todo => {
        if (prevState.allToggled===false) {
          return {
            ...todo,
            isDone: true,
          }
        } else {
          return {
            ...todo,
            isDone: false,
          }
        }

      }
      ),
      allToggled: !prevState.allToggled
    }))
  }

  destroy =(id) => {
    this.setState(prevState => ({
      todoes: prevState.todoes.filter(todo =>todo.id!==id),
      showContent: prevState.todoes.length < 2 ? false : true,
    }))
  }

  render() {
    console.log(this.state.todoes);
    const { showContent, todoes } = this.state;
    const resultingList = (todoes.length !== 0) ? todoes.map(todo => (
      <Todo todo={todo} toggle={this.toggle} destroy = {this.destroy} />
    )) : '';
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
          />
        </header>

        {showContent === true ? (<div className="content-group" >

          <section className="main">
            <input type="checkbox" id="toggle-all" className="toggle-all" onClick ={this.toggleAll}/ >
            <label htmlFor="toggle-all">Mark all as complete</label>

            <ul className="todo-list">

              {resultingList}

            </ul>
          </section>

          <footer className="footer">
            <span className="todo-count">
              {`${todoes.length} items left`}
</span>

            <ul className="filters">
              <li>
                <a href="#/" className="selected">All</a>
              </li>

              <li>
                <a href="#/active">Active</a>
              </li>

              <li>
                <a href="#/completed">Completed</a>
              </li>
            </ul>

            <button
              type="button"
              className="clear-completed"
              style={{ display: 'block' }}
            />
          </footer>
        </div>) : <span></span>}
      </section>
    );

  }

}

export default App;
