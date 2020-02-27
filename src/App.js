import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    task: '',
    todos: [],
    filtered: [],
    isAnyFiltered: false,
    isCheckedAll: false,
    activeTab: 'All',
  };

  componentDidMount = () => {
    this.setState({
      todos: JSON.parse(localStorage.getItem('state')),
    });
  }

  componentDidUpdate = () => {
    const { todos } = this.state;
    const storage = JSON.stringify(todos);

    localStorage.setItem('state', storage);
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
      isAnyFiltered: false,
      filtered: [],
      activeTab: 'All',
    }));
  }

  changeStatus = (event) => {
    const { checked, id } = event.target;
    const { todos, filtered } = this.state;
    let newListFiltered;

    const newList = todos.map((item) => {
      const newItem = { ...item };

      if (newItem.id === id) {
        newItem.completed = checked;
      }

      return newItem;
    });

    if (filtered) {
      newListFiltered = filtered.map((item) => {
        const newItem = { ...item };

        if (newItem.id === id) {
          newItem.completed = checked;
        }

        return newItem;
      });
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
      isCheckedAll: newList.every(item => item.completed === true),
    });
  }

  removeTask = (event) => {
    const { name } = event.target;
    const { todos, filtered } = this.state;
    const newList = todos.filter(item => item.id !== name);
    let newListFiltered;

    if (filtered) {
      newListFiltered = filtered.filter(item => item.id !== name);
    } else {
      newListFiltered = filtered;
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
    });
  }

  removeCompleted = () => {
    const { todos, filtered } = this.state;
    const newList = todos.filter(item => item.completed === false);
    let newListFiltered;

    if (filtered) {
      newListFiltered = filtered.filter(item => item.completed === false);
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
      isCheckedAll: false,
    });
  }

  showAll = (event) => {
    event.preventDefault();
    const { innerText } = event.target;

    this.setState({
      filtered: [],
      isAnyFiltered: false,
      activeTab: innerText,
    });
  }

  showCompleted = (event) => {
    event.preventDefault();
    const { innerText } = event.target;
    const { todos } = this.state;
    const newList = todos.filter(item => item.completed === true);

    this.setState({
      filtered: [...newList],
      isAnyFiltered: true,
      activeTab: innerText,
    });
  }

  showActive = (event) => {
    event.preventDefault();
    const { innerText } = event.target;
    const { todos } = this.state;
    const newList = todos.filter(item => item.completed === false);

    this.setState({
      filtered: [...newList],
      isAnyFiltered: true,
      activeTab: innerText,
    });
  }

  validatedForm = (event) => {
    event.preventDefault();
  }

  checkedAll = () => {
    const { todos, isCheckedAll } = this.state;

    const newList = todos.map((item) => {
      const newItem = { ...item };

      if (!isCheckedAll) {
        newItem.completed = true;
      } else {
        newItem.completed = false;
      }

      return newItem;
    });

    this.setState(prevState => ({
      todos: [...newList],
      filtered: [],
      isAnyFiltered: false,
      isCheckedAll: !prevState.isCheckedAll,
    }));
  }

  taskEdited = (edtiTitle, name) => {
    const { todos, filtered } = this.state;
    let newListFiltered;

    const newList = todos.map((item) => {
      const newItem = { ...item };

      if (newItem.id === name) {
        newItem.task = edtiTitle;
      }

      return newItem;
    });

    if (filtered) {
      newListFiltered = filtered.map((item) => {
        const newItem = { ...item };

        if (newItem.id === name) {
          newItem.task = edtiTitle;
        }

        return newItem;
      });
    } else {
      newListFiltered = filtered;
    }

    this.setState({
      todos: [...newList],
      filtered: newListFiltered,
    });
  }

  render() {
    const {
      task,
      todos,
      filtered,
      isAnyFiltered,
      isCheckedAll,
      activeTab,
    } = this.state;
    const activeItems = todos.filter(item => item.completed === false).length;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <form onSubmit={
            !task ? this.validatedForm : this.addTodo
          }
          >
            <input
              value={task}
              onChange={this.handleChange}
              className="new-todo"
              placeholder="What needs to be done?"
            />
          </form>
        </header>

        <TodoList
          items={!isAnyFiltered ? todos : filtered}
          changeStatus={this.changeStatus}
          removeTask={this.removeTask}
          removeCompleted={this.removeCompleted}
          showAll={this.showAll}
          showCompleted={this.showCompleted}
          showActive={this.showActive}
          activeItems={activeItems}
          checkedAll={this.checkedAll}
          isCheckedAll={isCheckedAll}
          activeTab={activeTab}
          taskEdited={this.taskEdited}
        />
      </section>
    );
  }
}

export default App;
