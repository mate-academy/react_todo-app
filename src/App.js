import React, { Component } from 'react';
import TodoItem from './components/TodoItem';

class App extends Component {
  constructor(props) {
    super(props);
    if (localStorage.getItem('state') !== null) {
      this.state = JSON.parse(localStorage.getItem('state'));
    } else {
      this.state = {
        todos: [],
        inputValue: '',
        counter: 0,
        kindOfList: 'all',
      };
    }

    this.AddTodo = this.AddTodo.bind(this);
    this.changeTodoInput = this.changeTodoInput.bind(this);
    this.countHowMuchLeftToDo = this.countHowMuchLeftToDo.bind(this);
    this.destroyTodo = this.destroyTodo.bind(this);
    this.howToShowList = this.howToShowList.bind(this);
    this.changeKindOfList = this.changeKindOfList.bind(this);
    this.changeTodoStatus = this.changeTodoStatus.bind(this);
    this.changeTitleOfTodo = this.changeTitleOfTodo.bind(this);
    this.allCompleted = this.allCompleted.bind(this);
    this.deleteCompleted = this.deleteCompleted.bind(this);
  }

  AddTodo(action) {
    action.preventDefault();
    const { inputValue, counter } = this.state;

    if (inputValue !== '') {
      const todo = {
        title: inputValue,
        id: counter + 1,
        completed: false,
      };

      this.setState(prevState => ({
        todos: [...prevState.todos, todo],
        counter: counter + 1,
        inputValue: '',
      }));
    }
  }

  changeTodoInput(action) {
    this.setState({ inputValue: action.target.value });
  }

  countHowMuchLeftToDo() {
    return this.state.todos.reduce((accum, todo) => accum + !todo.completed, 0);
  }

  destroyTodo(todo) {
    const indexTODelete = this.state.todos.findIndex(todoItem => (
      todoItem.id === todo.id
    ));

    this.setState((prevState) => {
      const UpdatedTodos = [...prevState.todos];

      UpdatedTodos.splice(indexTODelete, 1);

      return ({
        ...prevState,
        todos: [...UpdatedTodos],
      });
    });
  }

  howToShowList(kindOfShow = this.state.kindOfList) {
    let showTodos = [];

    switch (kindOfShow) {
      case 'all':
        showTodos = [...this.state.todos];
        break;
      case 'active':
        showTodos = this.state.todos.filter(todo => todo.completed === false);
        break;
      case 'completed':
        showTodos = this.state.todos.filter(todo => todo.completed === true);
        break;
      default:
    }

    return showTodos;
  }

  changeKindOfList(action) {
    if (action.target.tagName === 'A') {
      const kindOfShow = action.target.href.match(/#+\/[a-z]+/gi)
        .join('').match(/[a-z]/gi).join('');

      this.setState({ kindOfList: kindOfShow });
    }
  }

  changeTodoStatus(todo) {
    this.setState((prevState) => {
      const index = prevState.todos.findIndex(todoItem => (
        todoItem.id === todo.id
      ));
      const changeTodos = [...prevState.todos];

      changeTodos[index].completed = !changeTodos[index].completed;

      return ({ ...prevState, todos: [...changeTodos] });
    });
  }

  changeTitleOfTodo(todo, title) {
    if (title === '') {
      this.destroyTodo(todo);
    } else {
      const { todos } = this.state;
      const index = todos.findIndex(todoItem => todoItem.id === todo.id);

      this.setState((prevState) => {
        const changebleTodos = [...prevState.todos];

        changebleTodos[index].title = title;

        return ({ ...prevState, todos: changebleTodos });
      });
    }
  }

  allCompleted() {
    const { todos } = this.state;
    let completeBool = true;

    if (todos.every(todo => todo.completed)) {
      completeBool = false;
    }

    this.setState((prevState) => {
      const changebleTodo = [...prevState.todos];

      changebleTodo.forEach((todo) => {
        const tempTodo = todo;

        tempTodo.completed = completeBool;
      });

      return ({ ...prevState, todos: [...changebleTodo] });
    });
  }

  deleteCompleted() {
    this.setState((prevState) => {
      const changebleTodos = prevState.todos.filter(todo => !todo.completed);

      return ({ ...prevState, todos: [...changebleTodos] });
    });
  }

  render() {
    const { inputValue, kindOfList, todos } = this.state;
    const todosForShow = [...this.howToShowList(kindOfList)];
    const counterLeftToDo = this.countHowMuchLeftToDo();
    const { state } = this;

    localStorage.setItem('state', JSON.stringify(state));

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.AddTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={this.changeTodoInput}
            />
          </form>
        </header>
        <section
          className="main"
          style={
            todos.length !== 0 ? { display: 'block' } : { display: 'none' }
          }
        >
          <label
            htmlFor="toggle-all"
            className={
              `label-toggle-all ${
                todos.every(todo => todo.completed)
                  ? 'label-toggle-all-checked'
                  : ''
              }`
            }
          >
            <input
              type="checkbox"
              id="toggle-all"
              className="toggle-all"
              onChange={this.allCompleted}
              // checked={todos.every(todo => todo.completed)}
            />
          </label>

          <ul className="todo-list">
            {
              todosForShow.map(
                todo => (
                  <TodoItem
                    todo={todo}
                    key={todo.id}
                    change={this.changeTodoStatus}
                    destroy={this.destroyTodo}
                    changeTitle={this.changeTitleOfTodo}
                  />
                )
              )
            }
          </ul>
        </section>
        <footer
          className="footer"
          style={
            todos.length !== 0 ? { display: 'block' } : { display: 'none' }
          }
        >
          <span className="todo-count">
            {`${counterLeftToDo} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/all"
                className={kindOfList === 'all' ? 'selected' : ''}
                onClick={this.changeKindOfList}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={kindOfList === 'active' ? 'selected' : ''}
                onClick={this.changeKindOfList}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={kindOfList === 'completed' ? 'selected' : ''}
                onClick={this.changeKindOfList}
              >
                Completed
              </a>
            </li>

          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.deleteCompleted}
          >
            {todos.some(todo => todo.completed) ? 'Clear-completed' : ''}
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
