import React from 'react';
import TodoList from './components/TodoList';
import Header from './components/Header';
import Footer from './components/Footer';

const todosData = JSON.parse(localStorage.getItem('todosData')) || [];

class App extends React.Component {
  state={
    todos: [...todosData],
    newTodoId: todosData.length + 1 || 1,
    initialInputValue: '',
    isAllTodos: true,
    isActiveTodos: false,
    isCompletedTodos: false,
  }

  componentDidUpdate() {
    localStorage.setItem('todosData', JSON.stringify([...this.state.todos]));
  }

  addTodo = (e) => {
    if (e.key !== 'Enter') {
      return;
    }

    const newTodo = this.state.initialInputValue.trim();
    const { newTodoId } = this.state;

    if (newTodo) {
      const todo = {
        id: newTodoId,
        title: newTodo,
        completed: false,
      };

      this.setState(state => ({
        todos: [...state.todos, todo],
        newTodoId: state.newTodoId + 1,
        initialInputValue: '',
      }));
    }
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id)
        .map(item => (
          (item.id > id)
            ? {
              ...item, id: item.id - 1,
            }
            : item
        )),
      newTodoId: state.todos.length,
    }));
  }

  deleteCompletedTodos = () => {
    let newId = 1;

    this.setState(state => ({
      todos: state.todos
        .filter(todo => !todo.completed)
        .map(task => ({
        // eslint-disable-next-line
          ...task, id: newId++,
        })),
    }));

    this.setState(state => ({
      newTodoId: state.todos.length + 1,
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
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: target.checked,
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
    const type = e.target.title;

    switch (type) {
      case 'all': {
        this.setState({
          isAllTodos: true,
          isActiveTodos: false,
          isCompletedTodos: false,
        });
        break;
      }

      case 'active': {
        this.setState({
          isAllTodos: false,
          isActiveTodos: true,
          isCompletedTodos: false,
        });
        break;
      }

      case 'completed': {
        this.setState({
          isAllTodos: false,
          isActiveTodos: false,
          isCompletedTodos: true,
        });
        break;
      }

      default: break;
    }
  }

  setTypeTodos = (todo) => {
    const { isActiveTodos, isCompletedTodos } = this.state;

    if (isActiveTodos) {
      return !todo.completed;
    }

    if (isCompletedTodos) {
      return todo.completed;
    }

    return true;
  }

  render() {
    const { todos, initialInputValue } = this.state;
    const { isActiveTodos, isCompletedTodos, isAllTodos } = this.state;

    return (
      <section className="todoapp">
        <Header
          initialInputValue={initialInputValue}
          handleInputValue={this.handleInputValue}
          addTodo={this.addTodo}
        />

        <section className="main">
          {Boolean(todos.length) && (
            <>
              <input
                type="checkbox"
                id="toggle-all"
                className="toggle-all"
                onClick={this.toggleAllTodosStatus}
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
          isAllTodos={isAllTodos}
          isActiveTodos={isActiveTodos}
          isCompletedTodos={isCompletedTodos}
          chooseTypeTodos={this.chooseTypeTodos}
          deleteCompletedTodos={this.deleteCompletedTodos}
        />

      </section>
    );
  }
}

export default App;
