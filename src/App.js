import React, { Component } from 'react';
import uuid from 'uuidv4';
import TodoList from './components/TodoList/TodoList';
import ItemAddForm from './components/ItemAddForm/ItemAddForm';
import ItemStatusFilter from './components/ItemStatusFilter/ItemStatusFilter';
import SelectAllDone from './components/SelectAllDone/SelectAllDone';
import TodoCounter from './components/TodoCounter/TodoCounter';
import RemoveAllDone from './components/RemoveAllDone/RemoveAllDone';

class App extends Component {
  state = {
    todoData: JSON.parse(localStorage.getItem('todoData')) || [],
    filter: 'all',
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.todoData.length !== this.state.todoData.length) {
      const json = JSON.stringify(this.state.todoData);

      localStorage.setItem('todoData', json);
    }
  }

  getTodosfromLocalStorage = (objectFromLS) => {
    this.setState(({ todoData }) => ({
      todoData: [...todoData, ...objectFromLS],
    }));
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.filter(todo => todo.id !== id),
    }));
  };

  removeAllDone = (doneTodos) => {
    doneTodos.map(todo => this.deleteItem(todo.id));
  };

  addItem = (text) => {
    if (text === '' || text === ' ') {
      return;
    }

    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];

      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(el => el.id === id);

    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };

    return [
      ...arr.slice(0, idx),
      newItem,
      ...arr.slice(idx + 1),
    ];
  };

  onToggleDone = (id) => {
    localStorage.setItem(
      'todoData', JSON.stringify(
        this.toggleProperty(this.state.todoData, id, 'completed')
      )
    );

    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'completed'),
    }));
  };

  onToggleDoneAll = (todos) => {
    todos.map(todo => this.onToggleDone(todo.id));
    if (todos.length === 0) {
      this.state.todoData.map(todo => this.onToggleDone(todo.id));
    }
  };

  filter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.completed);
      case 'completed':
        return items.filter(item => item.completed === true);
      default:
        return items;
    }
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  createTodoItem(label) {
    return {
      label,
      completed: false,
      isEditing: false,
      id: this.id = uuid(),
    };
  }

  render() {
    const { todoData, filter } = this.state;

    const visibleItems = this.filter(todoData, filter);
    const doneTodos = todoData.filter(el => el.completed);

    const doneCount = doneTodos.length;
    const todos = todoData.filter(el => !el.completed);

    const todoCount = todos.length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <ItemAddForm onItemAdded={this.addItem} />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <SelectAllDone
            todos={todos}
            onToggleDoneAll={this.onToggleDoneAll}
          />
          <TodoList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onSubmitEditedChange={this.onSubmitEditedChange}
          />
        </section>

        {todoData.length > 0 && (
          <footer className="footer" style={{ display: 'block' }}>
            <TodoCounter ToDo={todoCount} done={doneCount} />
            <ItemStatusFilter
              filter={filter}
              onFilterChange={this.onFilterChange}
            />
            <RemoveAllDone
              doneTodos={doneTodos}
              onDeletedAllDone={this.removeAllDone}
            />
          </footer>
        )}
      </section>
    );
  }
}

export default App;
