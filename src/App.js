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
    todosLength: 0,
    inputText: '',
    prevId: 0,
    allTodos: [],
    currentFilter: 'All',
  }

  addNewTask = (e) => {
    e.preventDefault();

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
        todosLength: prev.allTodos.length + 1,
      }));
    }
  }

  changeInput = (e) => {
    this.setState({
      inputText: e.target.value,
    });
  }

  filterCurrentValue = (str) => {
    this.setState({
      currentFilter: str,
    });
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
  }

  clearCompleted = () => {
    this.setState(prev => ({
      allTodos: prev.allTodos.filter(item => item.status === 'active'),
    }));
  }

  render() {
    let todos = [...this.state.allTodos];
    const counter = this.counterItemsLeft();
    const {
      todosLength,
      inputText,
      currentFilter,
    } = this.state;

    if (currentFilter !== 'All') {
      todos = this.state.allTodos.filter(item => (
        item.status === currentFilter.toLowerCase()
      ));
    }

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addNewTask}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              onChange={this.changeInput}
              value={inputText}
            />
          </form>
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
            listItems={listItems}
            currentFilter={currentFilter}
            filterCurrentValue={this.filterCurrentValue}
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
