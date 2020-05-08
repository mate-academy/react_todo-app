import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';
import { filterUtils } from './utils/FilterUtils';
import TodosFilter from './components/TodosFilter';

class App extends Component {
  state = {
    todoData: [],
    filter: filterUtils.FILTER.ALL,
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((todo) => {
        if (todo.id !== id) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter(todo => !todo.completed),
    }));
  }

  addItem = (text) => {
    const newItem = {
      id: uuidv4(),
      label: text,
      completed: false,
    };

    this.setState(({ todoData }) => {
      const newArr = [...todoData, newItem];

      return { todoData: newArr };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return { todoData: newArray };
    });
  };

  onToggleAllCompleted =({ target }) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  filterTodos = (items, filter) => {
    switch (filter) {
      case filterUtils.FILTER.ALL:
        return items;
      case filterUtils.FILTER.ACTIVE:
        return items.filter(item => !item.completed);
      case filterUtils.FILTER.COMPLETED:
        return items.filter(item => item.completed);
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleData = this.filterTodos(todoData, filter);

    const completedCount = todoData.filter(el => el.completed).length;
    const todoCount = todoData.length - completedCount;

    const allChecked = todoData.length
      ? todoData.every(el => el.completed)
      : false;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoInput onItemAdded={this.addItem} />
        </header>

        <section className="main">
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={allChecked}
            onChange={this.onToggleAllCompleted}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={visibleData}
            onToggleCompleted={this.onToggleCompleted}
            onDeleted={this.deleteItem}
          />
        </section>

        {!todoData.length ? '' : (
          <footer className="footer">
            <span className="todo-count">
              {todoCount}
              {' '}
              items left
            </span>

            <TodosFilter
              onFilterChange={this.onFilterChange}
              filter={filter}
            />
            <button
              type="button"
              onClick={this.onClearCompleted}
              className="clear-completed"
              disabled={completedCount ? '' : 'disabled'}
            >
              Clear completed
            </button>
          </footer>
        )}

      </section>
    );
  }
}

export default App;
