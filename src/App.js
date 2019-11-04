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
  }

  componentDidMount() {
    const { lastList, lastLastId } = this.getFromLocalStorage();

    this.setState({
      list: lastList,
      lastId: lastLastId,
    });
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
        editMode: false,
      }],
      lastId: prevState.lastId + 1,
    }),
    this.putInLocalStorage);
  };

  toDelete = (id) => {
    this.setState(({ list }) => {
      const index = list.findIndex(item => item.id === id);
      const slicedTodos = list.slice(0, index).concat(list.slice(index + 1));

      return { list: slicedTodos };
    },
    this.putInLocalStorage);
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

      const newList = list.map(item => ({
        ...item,
        done: false,
      }));

      return {
        list: newList,
      };
    },
    this.putInLocalStorage);
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
    }),
    this.putInLocalStorage);
  };

  clearDone = () => {
    this.setState(prevState => ({
      ...prevState,
      list: [...prevState.list].filter(item => !item.done),
    }),
    this.putInLocalStorage);
  };

  activeFilter = (e) => {
    e.preventDefault();
    const tab = e.target;
    const activeTab = tab.innerText;

    switch (activeTab) {
      case 'All':
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'All',
        }),
        this.putInLocalStorage);
        break;
      case 'Active':
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'Active',
        }),
        this.putInLocalStorage);
        break;
      case 'Completed':
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'Completed',
        }),
        this.putInLocalStorage);
        break;
      default:
        this.setState(prevState => ({
          ...prevState,
          activeTab: 'All',
        }),
        this.putInLocalStorage);
        break;
    }
  };

  putInLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(this.state.list));
    localStorage.setItem('lastId', JSON.stringify(this.state.lastId));
  };

  getFromLocalStorage = () => {
    const list = JSON.parse(localStorage.getItem('list'));
    const lastId = JSON.parse(localStorage.getItem('lastId'));

    return ({
      lastList: list || [],
      lastLastId: lastId || 0,
    });
  };

  editText = (itemToEdit) => {
    this.setState(prevState => ({
      list: [...prevState.list.map((item) => {
        if (itemToEdit.id === item.id && item.editMode) {
          return { ...item, editMode: false };
        }

        if (itemToEdit.id === item.id && !item.editMode) {
          return { ...item, editMode: true };
        }

        return item;
      })],
    }),
    this.putInLocalStorage);
  };

  editEnter = (event) => {
    const { key, target } = event;
    const text = target.value;
    const id = +(target.id.match(/[0-9]/g).join(''));

    if (key === 'Enter' && text.trim() !== '') {
      this.setState(prevState => ({
        list: [...prevState.list.map((item) => {
          if (id === item.id) {
            return {
              ...item,
              editMode: false,
              title: text,
              id: prevState.lastId + 1,
              done: false,
            };
          }

          return item;
        })],
      }),
      this.putInLocalStorage);
    }
  }

  render() {
    let filtredList;

    switch (this.state.activeTab) {
      case 'All':
        filtredList = this.state.list;
        break;
      case 'Active':
        filtredList = this.state.list.filter(item => !item.done);
        break;
      case 'Completed':
        filtredList = this.state.list.filter(item => item.done);
        break;
      default:
        filtredList = this.state.list;
        break;
    }

    return (
      <section className="todoapp">
        <Input onSubmit={this.addTodo} />

        <TodoList
          list={filtredList}
          toDelete={this.toDelete}
          clearDone={this.clearDone}
          toggled={this.toggled}
          toggledAll={this.toggledAll}
          activeFilter={this.activeFilter}
          props={this.state}
          editText={this.editText}
          editEnter={this.editEnter}
          addTodo={this.addTodo}
        />

      </section>
    );
  }
}

export default App;
