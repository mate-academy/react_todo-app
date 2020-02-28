import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

function filter(arr, value, identifier) {
  return arr.map((item) => {
    const newItem = { ...item };

    if (newItem.id === identifier) {
      newItem.completed = value;
    }

    return newItem;
  });
}

class App extends React.Component {
  state = {
    task: '',
    todos: [],
    visibleTodos: [],
    isCheckedAll: false,
    activeTab: 'All',
  };

  componentDidMount = () => {
    const storageTodos = JSON.parse(localStorage.getItem('todos')) || [];

    this.setState({
      todos: storageTodos,
      visibleTodos: storageTodos,
    });
  }

  componentDidUpdate = () => {
    const storage = JSON.stringify(this.state.todos);

    localStorage.setItem('todos', storage);
  }

  handleChange = (event) => {
    const { value } = event.target;

    this.setState({
      task: value.replace(/^\s+$/g, ''),
    });
  }

  addTodo = (event) => {
    event.preventDefault();
    const { task } = this.state;

    this.setState(prevState => ({
      todos: [...prevState.todos, {
        id: uuidv4(),
        task,
        completed: false,
      }],
      task: '',
      visibleTodos: [...prevState.todos, {
        id: uuidv4(),
        task,
        completed: false,
      }],
      activeTab: 'All',
    }));
  }

  changeStatus = (event) => {
    const { checked, id } = event.target;
    const { todos, visibleTodos } = this.state;

    const newList = filter(todos, checked, id);
    const newListFiltered = filter(visibleTodos, checked, id);

    this.setState({
      todos: [...newList],
      visibleTodos: [...newListFiltered],
      isCheckedAll: newList.every(item => item.completed === true),
    });
  }

  removeTask = (event) => {
    const { name } = event.target;
    const { todos, visibleTodos } = this.state;
    const newList = todos.filter(item => item.id !== name);
    const newListFiltered = visibleTodos.filter(item => item.id !== name);

    this.setState({
      todos: [...newList],
      visibleTodos: [...newListFiltered],
    });
  }

  removeCompleted = () => {
    const { todos } = this.state;
    const newList = todos.filter(item => item.completed === false);

    this.setState({
      todos: [...newList],
      visibleTodos: [...newList],
      isCheckedAll: false,
    });
  }

  changeFilter = (event) => {
    event.preventDefault();
    const { name } = event.target;
    const { todos } = this.state;
    let newList;

    if (name === 'All') {
      this.setState({
        visibleTodos: [...todos],
        activeTab: name,
      });

      return;
    }

    if (name === 'Active') {
      newList = todos.filter(item => item.completed === false);
    }

    if (name === 'Completed') {
      newList = todos.filter(item => item.completed === true);
    }

    this.setState({
      visibleTodos: [...newList],
      activeTab: name,
    });
  }

  checkTaskValid = (event) => {
    event.preventDefault();
    const { task } = this.state;

    if (task) {
      this.addTodo(event);
    }
  }

  checkAll = () => {
    const { todos, isCheckedAll } = this.state;

    const newList = todos.map(item => ({
      ...item,
      completed: !isCheckedAll,
    }));

    this.setState(prevState => ({
      todos: [...newList],
      visibleTodos: [...newList],
      isCheckedAll: !prevState.isCheckedAll,
    }));
  }

  editTask = (newTask, name) => {
    const { todos } = this.state;

    const newList = todos.map((item) => {
      const newItem = { ...item };

      if (newItem.id === name) {
        newItem.task = newTask;
      }

      return newItem;
    });

    this.setState({
      todos: [...newList],
      visibleTodos: [...newList],
    });
  }

  render() {
    const {
      task,
      todos,
      visibleTodos,
      isCheckedAll,
      activeTab,
    } = this.state;
    const activeTodos = todos.filter(item => item.completed === false).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={this.checkTaskValid}>
            <input
              value={task}
              onChange={this.handleChange}
              className="new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList
          todos={visibleTodos}
          changeStatus={this.changeStatus}
          removeTask={this.removeTask}
          checkAll={this.checkAll}
          isCheckedAll={isCheckedAll}
          editTask={this.editTask}
        />

        <Footer
          activeTodos={activeTodos}
          activeTab={activeTab}
          changeFilter={this.changeFilter}
          removeCompleted={this.removeCompleted}
        />
      </section>
    );
  }
}

export default App;
