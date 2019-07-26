import React, { Component } from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

export default class App extends Component {
  state = {
    todos: [],
    search: '',
    filter: 'all',
    // complete: false,
    // editabled: false
  };

  async componentWillMount() {
    const getedTodos = await this.getFromLocalStorage();
    this.setState(state => ({
      todos: [...state.todos, ...getedTodos],
    }));
  }

  getFromLocalStorage = () => {
    const storageData = localStorage.getItem('todos');
    const getTodos = JSON.parse(storageData);

    return getTodos;
  };

  saveToLocalStorage = () => {
    const data = this.state.todos;
    localStorage.setItem('todos', JSON.stringify(data));
  };

  onItemAdded = (title) => {
    if (title.length > 2) {
      this.setState((state) => {
        const todo = this.createItem(title);
        return { todos: [...state.todos, todo] };
      });
    }

    this.saveToLocalStorage();
  };

  createItem = title => ({
    id: +new Date(),
    title,
    complete: false,
    editabled: false,
  });

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex(item => item.id === id);
    const oldItem = arr[idx];
    const value = !oldItem[propName];

    const item = { ...arr[idx], [propName]: value };
    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  };

  onToggleDone = (id) => {
    this.setState((state) => {
      const todos = this.toggleProperty(state.todos, id, 'complete');
      return { todos };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  onDelete = (id) => {
    this.setState((state) => {
      const idx = state.todos.findIndex(todo => todo.id === id);
      const todos = [
        ...state.todos.slice(0, idx),
        ...state.todos.slice(idx + 1),
      ];
      return { todos };
    });
  };

  handleDeleteAllCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.complete),
    }));

    localStorage.setItem(
      'todos',
      JSON.stringify({
        title: '',
        id: 0,
        complete: false,
        editabled: false,
      })
    );
  };

  onMarkedAll = () => {
    this.setState((state) => {
      state.todos.map(todo => (todo.complete = true));
    });

    if (this.state.todos.every(todo => todo.complete === true)) {
      this.setState((state) => {
        state.todos.map(todo => (todo.complete = false));
      });
    }

    this.forceUpdate();
  };

  filterItems = (todos, filter) => {
    if (filter === 'active') {
      return todos.filter(todo => !todo.complete);
    }
    if (filter === 'complete') {
      return todos.filter(todo => todo.complete);
    }

    return todos;
  };

  searchItems = (todos, search) => {
    if (search.length === 0) {
      return todos;
    }

    return todos.filter(
      todo => todo.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  handleEditabled = (id) => {
    this.setState((state) => {
      const todos = this.toggleProperty(state.todos, id, 'editabled');
      return { todos };
    });
  };

  render() {
    const { todos, filter, search } = this.state;
    const doneCount = todos.filter(todo => todo.complete).length;
    const toDoCount = todos.length - doneCount;
    const visibleTodos = this.searchItems(
      this.filterItems(todos, filter),
      search
    );

    this.saveToLocalStorage('todos', JSON.stringify([]));

    return (
      <section className="todoapp">
        {todos.length < 1 ? (
          <>
            <Header
              onItemAdded={this.onItemAdded}
            />
          </>
        ) : (
          <>
            <Header
              onItemAdded={this.onItemAdded}
            />
            <TodoList
              todos={visibleTodos}
              onDelete={this.onDelete}
              onToggleDone={this.onToggleDone}
              onMarkedAll={this.onMarkedAll}
              handleEditabled={this.handleEditabled}
            />
            <Footer
              todos={visibleTodos}
              onFilterChange={this.onFilterChange}
              filter={filter}
              handleDeleteAllCompleted={this.handleDeleteAllCompleted}
              toDoCount={toDoCount}
            />
          </>
        )}
      </section>
    );
  }
}
