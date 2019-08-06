import React from 'react';
import TodoList from './TodoList';

class App extends React.Component {
  state = {
    todoList: [],
    query: '',
  };

  componentWillMount() {
    if (localStorage.getItem('todoList')) {
      this.setState({
        todoList: JSON.parse(localStorage.getItem('todoList')),
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value,
    });
    this.forceUpdate();
  };

  handleTodoCheck = (id) => {
    this.setState((prevState) => {
      const currentTodo = prevState.todoList.find(todo => todo.id === id);

      currentTodo.completed = !currentTodo.completed;
    });
    this.forceUpdate();
  };

  addTodo = (event) => {
    event.preventDefault();
    if (this.state.query !== '') {
      const todo = {
        completed: false,
        todo: this.state.query,
        id: Date.now(),
      };

      this.setState(state => ({
        todoList: state.todoList.concat(todo),
        query: '',
      }));
      this.forceUpdate();
    }
  };

  handleCheckAll = () => {
    this.setState((prevState) => {
      if (prevState.todoList.every(todo => todo.completed)) {
        return {
          todoList: prevState.todoList.map(todo => ({
            ...todo,
            completed: !todo.completed,
          })),
        };
      }

      return {
        todoList: prevState.todoList.map(todo => ({
          ...todo,
          completed: true,
        })),
      };
    });
  };

  deleteChecked = () => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => !todo.completed),
    }));
  };

  filter = (event) => {
    const { name } = event.target;

    this.setState({ selected: name });
  };

  todoFilter = (selected) => {
    const { todoList } = this.state;

    if (selected === 'active') {
      return todoList.filter(todo => todo.completed === false);
    }

    if (selected === 'completed') {
      return todoList.filter(todo => todo.completed === true);
    }

    return todoList;
  };

  deleteTodo = (id) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== id),
    }));
  };

  render() {
    const {
      todoList,
      query,
      selected,
    } = this.state;

    const filteredTodoList = this.todoFilter(selected);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.addTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={query}
              onChange={this.handleChange}
            />
          </form>
        </header>

        <section
          className="main"
          style={
            todoList.length
              ? { display: 'block' }
              : { display: 'none' }
          }
        >
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            onClick={this.handleCheckAll}
          />
          {/* eslint-disable-next-line max-len */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
          <label htmlFor="toggle-all">
            Mark all as complete
          </label>

          <ul className="todo-list">
            {
              todoList.length > 0 ? (
                filteredTodoList.map(todo => (
                  <TodoList
                    deleteTodo={this.deleteTodo}
                    onCheck={this.handleTodoCheck}
                    onRemove={this.deleteTodo}
                    todo={todo}
                    onToggle={this.handleCheckAll}
                  />
                ))
              ) : []
            }
          </ul>
        </section>

        <footer
          className="footer"
          style={todoList.length > 0
            ? { display: 'block' }
            : { display: 'none' }}
        >
          <span className="todo-count">
            {
              `${todoList.filter(todo => !todo.completed).length}
             items left`
            }
          </span>

          <ul className="filters">
            <li>
              <button
                type="button"
                onClick={this.filter}
                className="all"
                name="all"
              >
                All
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={this.filter}
                name="active"
                className="active"
              >
                Active
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={this.filter}
                className="completed"
                name="completed"
              >
                Completed
              </button>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            style={{ display: 'block' }}
            onClick={this.deleteChecked}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
