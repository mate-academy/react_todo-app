import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList/TodoList';
import { Footer } from './components/Footer/Footer';

function filter(arr, value, identifier, property) {
  return arr.map((item) => {
    const newItem = { ...item };

    if (newItem.id === identifier) {
      newItem[property] = value;
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
    const storageTodos = localStorage.getItem('todos');

    if (storageTodos && storageTodos.length) {
      this.setState({
        todos: JSON.parse(storageTodos),
        visibleTodos: JSON.parse(storageTodos),
      });
    }
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevState.todos !== this.state.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
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
    const newTodo = {
      id: uuidv4(),
      task,
      completed: false,
    };

    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo],
      task: '',
      visibleTodos: [...prevState.todos, newTodo],
      activeTab: 'All',
    }));
  }

  changeStatus = (event) => {
    const { checked, id } = event.target;

    this.setState(prevState => ({
      todos: filter(prevState.todos, checked, id, 'completed'),
      visibleTodos: filter(prevState.visibleTodos, checked, id, 'completed'),
      isCheckedAll: filter(prevState.todos, checked, id, 'completed')
        .every(item => item.completed === true),
    }));
  }

  removeTask = (event) => {
    const { name } = event.target;

    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.id !== name),
      visibleTodos: prevState.visibleTodos.filter(item => item.id !== name),
    }));
  }

  removeCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.completed === false),
      visibleTodos: prevState.visibleTodos
        .filter(item => item.completed === false),
      isCheckedAll: false,
    }));
  }

  changeFilter = (event) => {
    event.preventDefault();
    const { name } = event.target.dataset;
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

  checkAll = (event) => {
    const { checked } = event.target;
    const { todos } = this.state;

    const newList = todos.map(item => ({
      ...item,
      completed: checked,
    }));

    this.setState({
      todos: [...newList],
      visibleTodos: [...newList],
      isCheckedAll: checked,
      activeTab: 'All',
    });
  }

  editTask = (newTask, name) => {
    this.setState(prevState => ({
      todos: filter(prevState.todos, newTask, name, 'task'),
      visibleTodos: filter(prevState.visibleTodos, newTask, name, 'task'),
    }));
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
