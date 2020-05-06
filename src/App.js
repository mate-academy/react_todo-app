import React, { Component } from 'react';
import { TodoList } from './components/TodoList/TodoList';

class App extends Component {
  state = {
    todos: [],
    todosLength: 0,
    inputText: '',
    prevId: 0,
    allTodos: [],
  }

  addNewTask = (e) => {
    if (e.key === 'Enter') {
      this.setState(prev => ({
        todos: [
          ...prev.todos,
          {
            id: prev.prevId + 1,
            title: prev.inputText,
            status: 'active',
            checked: false,
          },
        ],
        allTodos: [
          ...prev.todos,
          {
            id: prev.prevId + 1,
            title: prev.inputText,
            status: 'active',
            checked: false,
          },
        ],
        prevId: prev.prevId + 1,
        inputText: '',
        todosLength: prev.todos.length + 1,
      }));
    }
  }

  changeInput = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  deleteItemList = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(item => item.id !== id),
      allTodos: prev.todos.filter(item => item.id !== id),
    }));
  }

  counterItemsLeft = () => (
    this.state.todos.filter(item => item.status === 'active').length
  )

  switchTaskStatus = (id) => {
    this.setState(prev => ({
      todos: prev.todos.map((item) => {
        if (item.id === id) {
          // Шо тут линтер хочет, я не понимаю
          // eslint-disable-next-line no-param-reassign
          item.status = item.status === 'completed' ? 'active' : 'completed';
          // eslint-disable-next-line no-param-reassign
          item.checked = !item.checked;
        }

        return item;
      }),
      // allTodos: prev.allTodos.map((item, i , arr) => {
      //   console.log(arr)
      //   if (item.id === id) {
      //     item.status = item.status === 'completed' ? 'active' : 'completed';
      //     item.checked = !!item.checked;
      //   }
      //
      //   return item;
      // }),
    }));
  }

  clearCompleted = () => {
    this.setState(prev => ({
      todos: prev.todos.filter(item => item.status === 'active'),
      allTodos: prev.todos.filter(item => item.status === 'active'),
    }));
  }

  filterComponents = (method) => {
    if (method === 'all') {
      this.setState(prev => ({
        todos: prev.allTodos,
      }));
    }

    if (method === 'active') {
      this.setState(prev => ({
        todos: prev.allTodos.filter(item => item.status === 'active'),
      }));
    }

    if (method === 'completed') {
      this.setState(prev => ({
        todos: prev.allTodos.filter(item => item.status === 'completed'),
      }));
    }
  }

  render() {
    const counter = this.counterItemsLeft();
    const { todosLength, todos, inputText } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyPress={e => this.addNewTask(e)}
            onChange={e => this.changeInput(e)}
            value={inputText}
          />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          {!!todosLength && (
            <TodoList
              list={todos}
              deleteItem={this.deleteItemList}
              switchTaskStatus={this.switchTaskStatus}
            />
          )}

        </section>

        <footer className="footer">
          <span className="todo-count">
            {`${counter} items left`}
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className="selected"
                onClick={() => this.filterComponents('all')}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                onClick={() => this.filterComponents('active')}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                onClick={() => this.filterComponents('completed')}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearCompleted}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
