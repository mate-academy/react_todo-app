import React from 'react';
import Header from './Components/Header';
import ToDoList from './Components/ToDoList';
import Footer from './Components/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todolist: [],
      currentValue: '',
      lastId: 0,
      filter: 'all',
    };
  }

  componentDidMount() {
    const todosFromLocalStorage = JSON.parse(localStorage.getItem('todolist')) || [];

    this.setState({
      todolist: [...todosFromLocalStorage],
      lastId: +localStorage.getItem('lastId'),
    });
  }

  componentDidUpdate() {
    localStorage.setItem('todolist', JSON.stringify(this.state.todolist));
    localStorage.setItem('lastId', this.state.lastId);
  }

  changeInput = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      ...prevState,
      currentValue: value,
    }));
  };

  addItem = (event) => {
    const curVal = this.state.currentValue;

    const newItem = {
      text: curVal,
      done: false,
      id: this.state.lastId + 1,
    };

    if (event.keyCode !== 13) {
      return;
    }

    if (!this.state.currentValue.match(/\w/g)) {
      this.setState(prevState => ({
        ...prevState,
        currentValue: '',
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        todolist: [...prevState.todolist, newItem],
        currentValue: '',
        lastId: newItem.id,
      }));
    }
  };

  deleteItem = (id) => {
    this.setState(prevState => ({
      todolist: prevState.todolist.filter(todo => todo.id !== id),
    }));
  };

  clearDone = () => {
    const list = [...this.state.todolist].filter(item => item.done === false);

    this.setState(PrevState => ({
      todolist: list,
    }));
  };

  toggleItem = (id) => {
    this.setState((prevState) => {
      const newTodo = prevState.todolist.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item.done,
          };
        }

        return item;
      });

      return ({
        todolist: newTodo,
      });
    });
  };

  toggleAll = () => {
    const oldList = [...this.state.todolist];

    this.setState(({ todolist }) => {
      const completed = oldList.every(item => item.done === true);
      const toggledList = oldList.map(item => ({ ...item, done: true }));

      if (completed) {
        const untoggledList = oldList.map(item => ({ ...item, done: false }));

        return {
          todolist: untoggledList,
        };
      }

      return {
        todolist: toggledList,
      };
    });
  };

  changeFilter = (filChange) => {
    this.setState(({ filter }) => ({
      filter: filChange,
    }));
  };

  checked = () => {
    const completed = this.state.todolist
      .every(item => item.done === true);

    return completed;
  };

  render() {
    let filteredList;

    switch (this.state.filter) {
      case 'All':
        filteredList = this.state.todolist;
        break;
      case 'Active':
        filteredList = this.state.todolist.filter(item => item.done === false);
        break;
      case 'Completed':
        filteredList = this.state.todolist.filter(item => item.done === true);
        break;
      default:
        filteredList = this.state.todolist;
    }

    return (
      <section className="todoapp">
        <h1>todos</h1>
        <Header
          changeInput={this.changeInput}
          addItem={this.addItem}
          value={this.state.currentValue}
        />
        <ToDoList
          todolist={filteredList}
          deleteItem={this.deleteItem}
          toggleItem={this.toggleItem}
          toggleAll={this.toggleAll}
          checked={this.checked}
        />

        <Footer
          todolist={this.state.todolist}
          clearDone={this.clearDone}
          filter={this.state.filter}
          changeFilter={this.changeFilter}
        />
      </section>
    );
  }
}

export default App;
