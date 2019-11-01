import React from 'react';
import Input from './components/Input';
import TodoList from './components/TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      lastId: 0,
      activeTab: '',
    };
    this.toggled = this.toggled.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.toDelete = this.toDelete.bind(this);
  }

  addTodo = (item) => {
    if (item.trim() === '') {
      return;
    }

    this.setState(prevState => ({
      list: [...prevState.list, {
        title: item,
        done: false,
        id: prevState.lastId + 1,
      }],
      lastId: prevState.lastId + 1,
    }));
  };

  toDelete = (id) => {
    this.setState(({ list }) => {
      const index = list.findIndex(item => item.id === id);
      const slicedTodos = list.slice(0, index).concat(list.slice(index + 1));

      return { list: slicedTodos };
    });
  };

  toggledAll = () => {
    this.setState(({ list }) => {
      if (list.every(item => item.done === false)) {
        const newList = list.map(item => ({
          ...item,
          done: true,
        }));

        return {
          list: newList,
        };
      }

      const newList =  list.map(item => ({
        ...item,
        done: false,
      }));

      return {
        list: newList,
      }
    });
  };

  toggled = (targetId) => {
    this.setState(prevState => ({
      list: [...prevState.list.map((item) => {
        if (targetId === item.id && item.done) {
          return { ...item, done: false };
        }

        if (targetId === item.id && !item.done) {
          return { ...item, done: true };
        }

        return item;

      })],
    }));
  };

  clearDone = (event) => {
    this.setState(prevState => ({
      ...prevState,
      list: [...prevState.list].filter(item => !item.done),
    }));
  };

  activeFilter = (e) => {
    const tab = e.target;
    const activeTab = tab.innerText;

    switch (activeTab) {
      case 'All':
        this.setState(prevState => ({
          ...prevState,
          list: prevState.list,
          activeTab: 'All',
        }));
        break;
      case 'Active':
        this.setState(prevState => ({
          ...prevState,
          list: prevState.list.filter(item => !item.done),
          activeTab: 'Active',
        }));
        break;
      case 'Completed':
        this.setState(prevState => ({
          ...prevState,
          list: prevState.list.filter(item => item.done),
          activeTab: 'Completed',
        }));
        break;
      default:
        this.setState(prevState => ({
          ...prevState,
          list: prevState.list,
          activeTab: 'All',
        }));
        break;
    }
  };

  render() {
    return (
      <section className="todoapp">
        <Input onSubmit={this.addTodo} />

        <TodoList
          list={this.state.list}
          toDelete={this.toDelete}
          clearDone={this.clearDone}
          toggled={this.toggled}
          toggledAll={this.toggledAll}
          activeFilter={this.activeFilter}
          props={this.state}
        />

      </section>
    );
  }
}

export default App;
