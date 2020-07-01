import React from 'react';
import { Todo } from './Todo';
// import { nominalTypeHack } from 'prop-types';

class App extends React.Component {

  state = {
    inputValue: '',
    todoList: [],
    visibleFooter: 'none',
    completedTodos: {},
    hideCompleted: false,
    hideActive: false,
    allSelected: false,
  }

  clear = () => {
    const tempStatus = { ...this.state.completedTodos };
    const finished = this.state.todoList.filter(todo => this.state.completedTodos[todo] === true);
    const unfinished = this.state.todoList.filter(todo => !finished.includes(todo));
    const visibility = (unfinished.length) ? 'block' : 'none';

    finished.forEach((todo) => {
      delete tempStatus[todo];
    });
    this.setState(() => ({
      todoList: [...unfinished],
      completedTodos: { ...tempStatus },
      visibleFooter: visibility,
    }));
  }

  onComplete = (completed, state) => {
    this.setState(prevState => ({
      completedTodos: {
        ...prevState.completedTodos,
        [completed]: state,
      },
    }));
  }

  deleteTodo = (ev) => {
    const el = ev.target.previousElementSibling.textContent;
    const listWithoutEl = this.state.todoList.filter(item => item !== el);
    const visibility = (listWithoutEl.length) ? 'block' : 'none';
    const completed = { ...this.state.completedTodos };

    delete completed[el];

    this.setState(() => ({
      todoList: [...listWithoutEl],
      visibleFooter: visibility,
      completedTodos: { ...completed },
    }));
  }

  addNewTodo = (ev) => {
    if (ev.keyCode === 13) {
      (this.setState(prevState => ({
        todoList: (!prevState.todoList.includes(prevState.inputValue))
          ? [...prevState.todoList, prevState.inputValue]
          : [...prevState.todoList],
        inputValue: '',
        visibleFooter: 'block',
        completedTodos: {
          ...prevState.completedTodos,
          [prevState.inputValue]: false,
        },
      })));
    }
  };

  showActive = () => {
    (this.setState(() => ({
      hideCompleted: true,
      hideActive: false,
    })));
  }

  showAll = () => {
    (this.setState(() => ({
      hideCompleted: false,
      hideActive: false,
    })));
  }

  selectAll = () => {
    const obj = {};

    this.state.todoList.forEach((key) => {
      obj[key] = !this.state.allSelected;
    });

    this.setState(prevState => ({
      allSelected: !prevState.allSelected,
      completedTodos: { ...obj },
    }));
  }

  showCompleted = () => {
    (this.setState(() => ({
      hideCompleted: false,
      hideActive: true,
    })));
  }

  handleInputChange = (ev) => {
    ev.persist();
    (this.setState(() => ({
      inputValue: ev.target.value,
    })));
  };

  render() {
    const amountOfCompleted = Object.values(this.state.completedTodos).filter(state => state === true).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyUp={ev => this.addNewTodo(ev)}
            onChange={ev => this.handleInputChange(ev)}
            value={this.state.inputValue}
          />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.selectAll}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {
              this.state.todoList.map(todo => (
                <Todo
                  hideActive={this.state.hideActive}
                  hideCompleted={this.state.hideCompleted}
                  key={todo}
                  completed={this.state.completedTodos[todo]}
                  title={todo}
                  onComplete={this.onComplete}
                  deleteTodo={this.deleteTodo}
                />
              ))
            }

          </ul>
        </section>

        <footer className="footer" style={{ display: this.state.visibleFooter }}>
          <span className="todo-count">
            {this.state.todoList.length - amountOfCompleted}
            &nbsp;
            items left
          </span>

          <ul className="filters">
            <li>
              <a href="#/" className="selected" onClick={this.showAll}>All</a>
            </li>

            <li>
              <a href="#/active" onClick={this.showActive}>Active</a>
            </li>

            <li>
              <a href="#/completed" onClick={this.showCompleted}>Completed</a>
            </li>
          </ul>

          <button type="button" className="clear-completed" onClick={this.clear}>
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
