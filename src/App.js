import React, { Component } from 'react';
import TodosFilter from './components/TodosFilter';
import TodoList from './components/TodoList';
import TodoInput from './components/TodoInput';

class App extends Component {
  state = {
    todoData: [
      {
        id: 1, label: 'Todo 123', completed: true,
      },
      {
        id: 2, label: 'Todo 124', completed: true,
      },
      {
        id: 3, label: 'Todo 125', completed: false,
      },
    ],
    filter: 'all', // all, active, completed
  }

  onToggleCompleted = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const oldItem = todoData[idx];
      const newItem = {
        ...oldItem, completed: !oldItem.completed,
      };

      const newArray = [
        ...todoData.slice(0, idx),
        newItem,
        ...todoData.slice(idx + 1),
      ];

      return { todoData: newArray };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onClearCompleted = () => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter(todo => !todo.completed),
    }));
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex(el => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return { todoData: newArray };
    });
  };

  // eslint-disable-next-line class-methods-use-this
  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.completed);
      case 'completed':
        return items.filter(item => item.completed);
      default:
        return items;
    }
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleData = this.filter(todoData, filter);

    const completedCount = todoData.filter(el => el.completed).length;
    const todoCount = todoData.length - completedCount;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <TodoInput />
        </header>

        <section className="main">
          <input type="checkbox" id="toggle-all" className="toggle-all" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            todos={visibleData}
            onToggleCompleted={this.onToggleCompleted}
            onDeleted={this.deleteItem}
          />
        </section>

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
      </section>
    );
  }
}

export default App;
