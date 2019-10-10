import React from 'react';
import uuid from 'uuid';
import TodoList from './Components/TodoList/TodoList';
import TodoHeader from './Components/TodoHeader/TodoHeader';
import Footer from './Components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    tempValue: '',
    activeFilter: 'all',
  }

  handleChange = (event) => {
    this.setState({
      tempValue: event.target.value,
    });
  }

  handleSubmit = (event) => {
    if (this.state.tempValue.length > 0) {
      const id = uuid.v4();

      event.preventDefault();
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          text: prevState.tempValue,
          completed: false,
          id,
        }],
        tempValue: '',
      }));
    }
  }

  handleCheckBox = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (id === todo.id
        ? { text: todo.text, id: todo.id, completed: !todo.completed }
        : todo
      )),
    }));
  };

  handleDestroy = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => id !== todo.id),
    }));
  }

  handleActiveFilter = (activeFilter) => {
    this.setState({
      activeFilter,
    });
  }

  handleClearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => !todo.completed),
    }));
  }

  handleClickArrow = () => {
    this.setState(prevState => ({
      todos: prevState.todos.some(todo => !todo.completed)
        ? prevState.todos.map(todo => ({ ...todo, completed: true }))
        : prevState.todos.map(todo => ({ ...todo, completed: !todo.completed })),
    }));
  }

  render() {
    const {
      handleChange,
      handleSubmit,
      handleClickArrow,
      handleCheckBox,
      handleDestroy,
      handleClearCompleted,
      handleActiveFilter,
    } = this;

    const {
      todos,
      tempValue,
      activeFilter,
    } = this.state;

    let filteredTodos;

    switch (activeFilter) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = todos;
        break;
    }

    return (
      <section className="todoapp">
        <TodoHeader
          value={tempValue}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label
            htmlFor="toggle-all"
            onClick={handleClickArrow}
          >
            Mark all as complete
          </label>
          <TodoList
            todos={filteredTodos}
            handleCheckBox={handleCheckBox}
            handleDestroy={handleDestroy}
          />
        </section>
        {todos.length > 0
          && <Footer
            handleClearCompleted={handleClearCompleted}
            activeFilter={activeFilter}
            handleActiveFilter={handleActiveFilter}
            todos={todos}
          />
        }
      </section>
    );
  }
}

export default App;
