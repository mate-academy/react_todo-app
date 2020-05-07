import React, { Component } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { FilterList } from './components/FilterList/FilterList';

const listItems = [
  {
    href: '#/',
    title: 'All',
  },
  {
    href: '#/active',
    title: 'Active',
  },
  {
    href: '#/completed',
    title: 'Completed',
  },
];

class App extends Component {
  state = {
    todos: [],
    todosLength: 0,
    inputText: '',
    prevId: 0,
    allTodos: [],
    currentFilter: 'All',
  }

  addNewTask = (e) => {
    if (e.key === 'Enter') {
      if (this.state.inputText.trim() === '') {
        this.setState({
          inputText: '',
        });
      } else {
        this.setState(prev => ({
          allTodos: [
            ...prev.allTodos,
            {
              id: prev.prevId + 1,
              title: prev.inputText.trim(),
              status: 'active',
              checked: false,
            },
          ],
          prevId: prev.prevId + 1,
          inputText: '',
          todosLength: prev.todos.length + 1,
        }));
        this.filterCurrentValue();
      }
    }
  }

  changeInput = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  filterCurrentValue = () => {
    if (this.state.currentFilter === 'All') {
      this.setState(prev => ({
        todos: [...prev.allTodos],
      }));
    } else {
      this.setState(prev => ({
        todos: prev.allTodos.filter(item => (
          item.status === prev.currentFilter.toLowerCase()
        )),
      }));
    }
  }

  changeAllItemsCallback = (status, checked) => {
    this.setState(prev => ({
      allTodos: prev.allTodos.map((item) => {
        const newItem = { ...item };

        newItem.status = status;
        newItem.checked = checked;

        return newItem;
      }),
    }));

    this.setState(prev => ({
      todos: [...prev.allTodos],
    }));
  }

  changeAllItems = (count) => {
    if (!count) {
      this.changeAllItemsCallback('active', false);
    } else {
      this.changeAllItemsCallback('completed', true);
    }
  }

  deleteItemList = (id) => {
    this.setState(prev => ({
      allTodos: prev.allTodos.filter(item => item.id !== id),
    }));

    this.filterCurrentValue();
  }

  counterItemsLeft = () => (
    this.state.allTodos.filter(item => item.status === 'active').length
  )

  switchTaskStatus = (id) => {
    this.setState(prev => ({
      allTodos: prev.allTodos.map((item) => {
        const newItem = { ...item };

        if (item.id === id) {
          newItem.status = item.status === 'completed' ? 'active' : 'completed';
          newItem.checked = !item.checked;
        }

        return newItem;
      }),
    }));

    this.filterCurrentValue();
  }

  clearCompleted = () => {
    this.setState(prev => ({
      allTodos: prev.allTodos.filter(item => item.status === 'active'),
      todos: prev.todos.filter(item => item.status === 'active'),
    }));
  }

  filterComponents = (e, method) => {
    e.preventDefault();

    if (method === 'All') {
      this.setState(prev => ({
        todos: [...prev.allTodos],
      }));
    } else {
      this.setState(prev => ({
        todos: prev.allTodos.filter(item => (
          item.status === method.toLowerCase()
        )),
      }));
    }

    this.setState({
      currentFilter: method,
    });
  }

  render() {
    const counter = this.counterItemsLeft();
    const {
      todosLength,
      todos,
      inputText,
      currentFilter,
    } = this.state;

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
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={!counter && todos.length}
            onChange={() => this.changeAllItems(counter)}
          />
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

          <FilterList
            filterComponents={this.filterComponents}
            listItems={listItems}
            currentFilter={currentFilter}
          />

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
