import React, { Component } from 'react';
import { Header } from './components/Header';
import { TodoList } from './components/TodoList';
import { Footer } from './components/Footer';

class App extends Component {
  state = {
    todos: [],
    counter: 1,
    typeOfFilter: 'all',
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

    if (!newValue) {
      this.setState(prev => ({
        todos: prev.todos.filter(item => item.id !== id),
      }));
    }

    this.setState(prev => ({
      showChangeTitle: false,
      editingTodo: null,
      todos: prev.todos.map(item => (item.id === id ? {
        ...item, title: newValue,
      } : item)),
    }));
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

  handleCompletedAll = () => {
    this.setState(prev => ({
      todos: prev.todos.map(todo => ({
        ...todo,
        completed: !todo.completed,
      })),
    }));
  };

  render() {
    const { todos,
      typeOfFilter,
      newValue,
      editingTodo,
      showChangeTitle } = this.state;
    let visibleTodos = [...todos];

    if (typeOfFilter === 'completed') {
      visibleTodos = visibleTodos.filter(todo => todo.completed);
    }

    if (typeOfFilter === 'active') {
      visibleTodos = visibleTodos.filter(todo => !todo.completed);
    }

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
        />
        <Footer
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
