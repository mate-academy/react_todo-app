import React from 'react';
import uuid from 'uuid';
import TodoList from './Components/TodoList/TodoList';
import TodoHeader from './Components/TodoHeader/TodoHeader';
import Footer from './Components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    title: '',
    activeFilter: 'all',
  }

  handleChange = ({ target }) => {
    this.setState({
      title: target.value,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.title.trim().length > 0) {
      const id = uuid.v4();

      this.setState(prevState => ({
        todos: [...prevState.todos, {
          text: prevState.title,
          completed: false,
          id,
        }],
        title: '',
      }));
    }
  }

  handleCheckBox = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (id === todo.id
        ? {
            ...todo,
            completed: !todo.completed,
          }
        : todo
      )),
    }));
  };

  handleRemove = (id) => {
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

  handleClickAll = () => {
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
      handleClickAll,
      handleCheckBox,
      handleRemove,
      handleClearCompleted,
      handleActiveFilter,
    } = this;

    const {
      todos,
      title,
      activeFilter,
    } = this.state;

    let filteredTodos = [];

    switch (activeFilter) {
      case 'active':
        filteredTodos = todos.filter(todo => !todo.completed);
        break;

      case 'completed':
        filteredTodos = todos.filter(todo => todo.completed);
        break;

      default:
        filteredTodos = todos;
    }

    return (
      <section className="todoapp">
        <TodoHeader
          value={title}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
        <section className="main" style={{ display: 'block' }}>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            checked={todos.every(todo => todo.completed)}
            onClick={handleClickAll}
          />
          {todos.length === 0 ||
            <label htmlFor="toggle-all">
              Mark all as complete
            </label>
          }
          <TodoList
            todos={filteredTodos}
            handleCheckBox={handleCheckBox}
            handleRemove={handleRemove}
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
