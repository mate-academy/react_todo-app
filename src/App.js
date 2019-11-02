import React, { Component } from 'react';
import Header from './components/header/Header';
import InputField from './components/inputField/InputField';
import ToDoList from './components/ToDoList/ToDoList';
import StatusPanel from './components/statusPanel/StatusPanel';

export default class App extends Component {

  state = {
    toDoList: [],
    lastId: 0,
    filterType: 'All'
  }

  addItem = (value) => {
    const newItem = {
      text: value,
      done: false,
      id: this.state.lastId + 1
    }
    this.setState(prevState => {
      return {
        ...prevState,
        toDoList: [...prevState.toDoList, newItem],
        lastId: newItem.id
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({toDoList}) => {
      return {
        toDoList: [...toDoList.filter(e => e.id !== id)]
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({toDoList}) => {
      const index = toDoList.findIndex(item => item.id === id);
      const oldToDoItem = toDoList.find(todo => todo.id === id);

      const newToDoItem = { ...oldToDoItem,
                            done: !oldToDoItem.done};
      // Слабо представляю как сделать без слайса.
      const beforeToggleItem = toDoList.slice(0, index);
      const afterToggleItem = toDoList.slice(index + 1);

      return {
        toDoList: [...beforeToggleItem, newToDoItem, ...afterToggleItem]
      }
    })
  }

  toggleAll = () => {
    this.setState(({toDoList}) => {

      if (toDoList.every(item => item.done === true)) {
        const newToDoList = toDoList.map(item => ({
          ...item,
          done: false
        }));

        return {
          toDoList: newToDoList
        }
      }

      const newToDoList = toDoList.map(item => ({
        ...item,
        done: true
      }));

      return {
        toDoList: newToDoList
      }
    });
  }

  clearCompleted = () => {
    this.setState(({toDoList}) => {
      const clearList = toDoList.filter(item => !item.done);
      return {
        toDoList: clearList
      }
    });
  }

  filter = (items, filterType) => {

    switch(filterType) {
      case 'All':
        return items;
      case 'Active':
        return items.filter(item => !item.done);
      case 'Completed':
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filterType) => {
    this.setState({filterType})
  }

  componentDidMount() {
    const storageToDoList = JSON.parse(localStorage.getItem('toDoList')) || [];
    const storageId = localStorage.getItem('lastId');
    this.setState(prevState => {
      return {
        ...prevState,
        toDoList: [...storageToDoList],
        lastId: +storageId,
      };
    });
  }

  componentDidUpdate() {
    const toDoListToStorage = JSON.stringify(this.state.toDoList);
    localStorage.setItem('toDoList', toDoListToStorage);
    localStorage.setItem('lastId', this.state.lastId);
  }

  render() {
    const { toDoList, filterType } = this.state;
    const visibleList = this.filter(toDoList, filterType)

    return (
      <section className="todoapp">
        <Header />
        <InputField onSubmit={this.addItem}/>
        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" onChange={this.toggleAll}/>
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ToDoList todolist={visibleList}
          onDelete={this.deleteItem}
          onToggle={this.onToggleDone}
          />
        </section>
        <StatusPanel todolist={visibleList}
        getClearList={this.clearCompleted}
        filterStatus={filterType}
        onFilterChange={this.onFilterChange}/>
      </section>
    );
  }

}
