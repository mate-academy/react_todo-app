import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      id: 1,
      title: '',
      selectedTab: 'All',
    };
  }

  handleSubmit = (event) => {
    if (event.which === 13 || event.keyCode === 13) {
      if (this.state.title !== '') {
        this.setState(prevState => ({
          ...prevState,
          id: prevState.id + 1,
          todos: [
            {
              id: prevState.id,
              title: prevState.title,
              completed: false,
            },
            ...prevState.todos,
          ],
          title: '',
        }));
      }
    }
  }

  handleTitleChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  }

  toggleOne = (event) => {
    const eTargetId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map((item) => {
        if (eTargetId === item.id && item.completed) {
          return { ...item, completed: false };
        }

        if (eTargetId === item.id && !item.completed) {
          return { ...item, completed: true };
        }

        return item;
      }),
    }));
  }

  toggleAll = () => {
    this.setState(prevState => ({
      ...prevState,
      todos: prevState.todos.map((item) => {
        if (prevState.todos.every(todo => todo.completed)) {
          return { ...item, completed: false };
        }

        return { ...item, completed: true };
      }),
    }));
  }

  handleFilter = (event) => {
    document.querySelector('.filters .selected').className = '';
    const tab = event.target;
    const tabName = tab.innerText;

    if (tabName === 'All') {
      tab.className = 'selected';
      this.setState({
        selectedTab: 'All',
      });
    } else if (tabName === 'Active') {
      tab.className = 'selected';
      this.setState({
        selectedTab: 'Active',
      });
    } else if (tabName === 'Completed') {
      tab.className = 'selected';
      this.setState({
        selectedTab: 'Completed',
      });
    }
  }

  clearItem = (event) => {
    const eTargetId = +event.target.id;

    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos].filter(item => item.id !== eTargetId),
    }));
  }

  clearCompleted = (event) => {
    this.setState(prevState => ({
      ...prevState,
      todos: [...prevState.todos].filter(item => !item.completed),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <TodoInput
          handleSubmit={this.handleSubmit}
          handleTitleChange={this.handleTitleChange}
          value={this.state.title}
        />
        <TodoList
          items={this.state.todos}
          toggleOne={this.toggleOne}
          toggleAll={this.toggleAll}
          handleFilter={this.handleFilter}
          selectedTab={this.state.selectedTab}
          clearItem={this.clearItem}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default App;
