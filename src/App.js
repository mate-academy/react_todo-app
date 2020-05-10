import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    typeOfFilter: 'all',
    editMode: false,
  }

  setTodoTitle = (id, title, editing) => {
    this.setState(prev => ({
      todos: prev.todos.map((todo) => {
        if (todo.id === +id) {
          return {
            ...todo,
            title,
            editing,
          };
        }

        return todo;
      }),
      editMode: !prev.editMode,
    }));
  }

  setEditStatus = (id) => {
    if (this.state.editMode) {
      return;
    }

    this.setState(prev => ({
      todos: prev.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            editing: !todo.editing,
          };
        }

        return todo;
      }),
      editMode: !prev.editMode,
    }));
  }

  handleToggleAll = ({ target }) => {
    this.setState(prev => ({
      todos: prev.todos.map(todo => ({
        ...todo,
        completed: target.checked,
      })),
    }));
  }

  handleAddTodo = (newTodo) => {
    this.setState(prev => ({
      todos: [...prev.todos, newTodo],
    }));
  }

  handleRemoveTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => todo.id !== id),
    }));
  }

  statusOfTodo = (id) => {
    this.setState(prev => ({
      todos: prev.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  handleTypeOfFilter = (type) => {
    this.setState({
      typeOfFilter: type,
    });
  }

  handleClearCompleted = () => {
    this.setState(prev => ({
      todos: prev.todos.filter(todo => !todo.completed),
    }));

    if (this.state.typeOfFilter === 'completed') {
      this.handleTypeOfFilter('all');
    }
  }

  render() {
    const { todos, typeOfFilter } = this.state;
    const isCompletedPresent = todos.some(todo => todo.completed);
    let visibleTodos = [...todos];

    if (typeOfFilter === 'completed') {
      visibleTodos = todos.filter(todo => todo.completed);
    }

    if (typeOfFilter === 'active') {
      visibleTodos = todos.filter(todo => !todo.completed);
    }

    return (
      <section className="todoapp">
        <Header handleAddTodo={this.handleAddTodo} />
        <TodoList
          todos={todos}
          visibleTodos={visibleTodos}
          handleRemoveTodo={this.handleRemoveTodo}
          statusOfTodo={this.statusOfTodo}
          handleToggleAll={this.handleToggleAll}
          setEditStatus={this.setEditStatus}
          setTodoTitle={this.setTodoTitle}
        />
        <Footer
          todos={todos}
          isCompletedPresent={isCompletedPresent}
          handleClearCompleted={this.handleClearCompleted}
          handleTypeOfFilter={this.handleTypeOfFilter}
          typeOfFilter={typeOfFilter}
        />
      </section>
    );
  }
}

export default App;
