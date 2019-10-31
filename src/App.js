import React, { Component } from 'react';
import Header from './components/header/Header';
import InputField from './components/inputField/InputField';
import ToDoList from './components/ToDoList/ToDoList';
import StatusPanel from './components/statusPanel/StatusPanel';

export default class App extends Component {

  state = {
    todolist: [
    ],
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
        todolist: [...this.state.todolist, newItem],
        lastId: newItem.id
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({todolist}) => {
      const index = todolist.findIndex(item => item.id === id);

      const beforeDeletedItem = todolist.slice(0, index);
      const afterDeletedItem = todolist.slice(index + 1);

      return {
        todolist: [...beforeDeletedItem, ...afterDeletedItem]
      }
    });
  }

  onToggleDone = (id) => {
    this.setState(({todolist}) => {
      const index = todolist.findIndex(item => item.id === id);
      const oldToDoItem = todolist.find(todo => todo.id === id);

      const newToDoItem = { ...oldToDoItem,
                            done: !oldToDoItem.done};

      const beforeToggleItem = todolist.slice(0, index);
      const afterToggleItem = todolist.slice(index + 1);
      return {
        todolist: [...beforeToggleItem, newToDoItem, ...afterToggleItem]
      }
    })
  }

  toggleAll = () => {
    this.setState(({todolist}) => {

      if (todolist.every(item => item.done === true)) {
        const newToDoList = todolist.map(item => ({
          ...item,
          done: false
        }));

        return {
          todolist: newToDoList
        }
      }

      const newToDoList = todolist.map(item => ({
        ...item,
        done: true
      }));

      return {
        todolist: newToDoList
      }
    });
  }

  clearCompleted = () => {
    this.setState(({todolist}) => {
      const clearList = todolist.filter(item => !item.done);
      return {
        todolist: clearList
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

  render() {

    const visibleList = this.filter(this.state.todolist, this.state.filterType)

    return (
      <section className="todoapp">
        <Header />
        <InputField onSubmit={this.addItem}/>
        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" onChange={this.toggleAll}/>
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ToDoList todolist={visibleList}
          onDelete={this.deleteItem}
          onToggle={this.onToggleDone}/>
        </section>
        <StatusPanel todolist={visibleList}
        getClearList={this.clearCompleted}
        filterStatus={this.state.filterType}
        onFilterChange={this.onFilterChange}/>
      </section>
    );
  }

}
