import React from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';

const todosData = JSON.parse(localStorage.getItem('todosData')) || [];

class App extends React.Component {
  state={
    todos: [...todosData],
    initialInputValue: '',
    selectedTodos: 'all',
  }

  componentDidUpdate() {
    localStorage.setItem('todosData', JSON.stringify([...this.state.todos]));
  }

  addTodo = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    const newTodo = this.state.initialInputValue.trim();

    if (newTodo) {
      const todo = {
        id: +new Date(),
        title: newTodo,
        completed: false,
      };

      this.setState(state => ({
        todos: [...state.todos, todo],
        initialInputValue: '',
      }));
    }
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todos: [...state.todos].filter(todo => todo.id !== id),
    }));
  }

  deleteCompletedTodos = () => {
    this.setState(state => ({
      todos: [...state.todos]
        .filter(todo => !todo.completed),
    }));
  }

  changeTodoStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (
        (todo.id === id)
          ? {
            ...todo, completed: !todo.completed,
          }
          : todo
      )),
    }));
  }

  toggleAllTodosStatus = ({ target }) => {
    const isCompleted = this.state.todos.some(todo => !todo.completed);

    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: isCompleted,
      })),
    }));
  }

  changeTodoValue = (id, newTitle) => {
    this.setState(state => ({
      todos: state.todos.map(todo => (
        todo.id === id
          ? {
            ...todo, title: newTitle,
          }
          : todo
      )),
    }));
  }

  handleInputValue = (e) => {
    const { value } = e.target;

    this.setState({
      initialInputValue: value,
    });
  }

  chooseTypeTodos = (e) => {
    const typeOfTodos = e.target.title;

    this.setState({
      selectedTodos: typeOfTodos,
    });
  }

  setTypeTodos = (todo) => {
    const { selectedTodos } = this.state;

    if (selectedTodos === 'active') {
      return !todo.completed;
    }

    if (selectedTodos === 'completed') {
      return todo.completed;
    }

    return true;
  }

  render() {
    const { todos, initialInputValue, selectedTodos } = this.state;
    const isAllChecked = todos.every(item => item.completed);

    return (
      <section className="todoapp">
        <Header
          initialInputValue={initialInputValue}
          handleInputValue={this.handleInputValue}
          addTodo={this.addTodo}
        />

        <section className="main">
          {todos.length > 0 && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onClick={this.toggleAllTodosStatus}
                checked={isAllChecked}
              />
              <label htmlFor="toggle-all">Mark all as complete</label>
            </>
          )}

          <TodoList
            todos={todos.filter(this.setTypeTodos)}
            changeTodoStatus={this.changeTodoStatus}
            deleteTodo={this.deleteTodo}
            changeTodoValue={this.changeTodoValue}
          />
        </section>

        <Footer
          todos={todos}
          selectedTodos={selectedTodos}
          chooseTypeTodos={this.chooseTypeTodos}
          deleteCompletedTodos={this.deleteCompletedTodos}
        />
      </section>
    );
  }
}

export default App;
