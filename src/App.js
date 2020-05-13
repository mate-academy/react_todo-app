import React, { Component } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

const filters = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class App extends Component {
  state = {
    todos: [],
    counter: 1,
    typeOfFilter: filters.all,
    newValue: '',
    editingTodo: null,
    showChangeTitle: false,
  };

  addTodo = (title, id) => {
    const currentTodo = {
      id,
      title,
      completed: false,
    };

    this.setState(prev => ({
      todos: [
        ...prev.todos,
        currentTodo,
      ],
      counter: prev.counter + 1,
    }));
  };

  deleteTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(item => item.id !== id),
    }));
  };

  completedTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item, completed: !item.completed,
          };
        }

        return item;
      }),
    }));
  };

  clearCompleted = () => {
    this.setState(prev => ({
      todos: prev.todos.filter(item => item.completed === false),
    }));
  };

  handleTypeOfFilter = (type) => {
    this.setState({
      typeOfFilter: type,
    });
  };

  handleSubmit = (id) => {
    const { newValue } = this.state;

    if (!newValue.trim()) {
      this.setState(prev => ({
        todos: prev.todos.filter(item => item.id !== id),
      }));
    }

    this.setState(prev => ({
      showChangeTitle: false,
      editingTodo: null,
      todos: prev.todos.map(item => (item.id === id ? {
        ...item, title: newValue.trim(),
      } : item)),
    }));
  };

  handleCompletedAll = ({ target }) => {
    this.setState(prev => ({
      todos: prev.todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  };

  cancelEditing = ({ key, target, type }) => {
    // eslint-disable-next-line consistent-return
    this.setState((prev) => {
      if (type === 'blur' && target.value.trim() !== '') {
        return {
          showChangeTitle: false,
          editingTodo: null,
          todos: prev.todos.map((todo) => {
            if (todo.id === +target.id) {
              return {
                ...todo,
                title: target.value,
              };
            }

            return todo;
          }),
        };
      }

      if (key === 'Escape') {
        return {
          showChangeTitle: false,
          editingTodo: null,
        };
      }
    });
  };

  changeTitle = (id) => {
    this.setState(prev => ({
      newValue: prev.todos.find(el => el.id === id).title,
      editingTodo: id,
      showChangeTitle: true,
    }));
  };

  handleChangeTitle = (e) => {
    this.setState({
      newValue: e.target.value,
    });
  };

  getFilterderTodos = () => {
    const { typeOfFilter, todos } = this.state;

    if (typeOfFilter === filters.completed) {
      return [...todos].filter(todo => todo.completed);
    }

    if (typeOfFilter === filters.active) {
      return [...todos].filter(todo => !todo.completed);
    }

    return [...todos];
  };

  render() {
    const { todos,
      typeOfFilter,
      newValue,
      editingTodo,
      showChangeTitle } = this.state;

    const visibleTodos = this.getFilterderTodos();

    return (
      <section className="todoapp">
        <Header
          todos={todos}
          addTodo={this.addTodo}
          id={this.state.counter}
        />
        <TodoList
          visibleTodos={visibleTodos}
          deleteTodo={this.deleteTodo}
          completedTodo={this.completedTodo}
          handleSubmit={this.handleSubmit}
          changeTitle={this.changeTitle}
          newValue={newValue}
          editingTodo={editingTodo}
          showChangeTitle={showChangeTitle}
          handleChangeTitle={this.handleChangeTitle}
          handleCompletedAll={this.handleCompletedAll}
          cancelEditing={this.cancelEditing}
        />
        <Footer
          filters={filters}
          invisibleFooter={todos.length}
          countCompleted={todos.filter(item => item.completed === false).length}
          handleTypeOfFilter={this.handleTypeOfFilter}
          typeOfFilter={typeOfFilter}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
