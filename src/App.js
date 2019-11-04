import React from 'react';

import ToDoItem from './components/ToDoItem';
import Header from './components/Header';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    toDoItems: [],
    selectedFilter: 'all',
  };

  componentDidMount() {
    if (localStorage.getItem('toDoItems') !== null) {
      this.saveToLocalSetState({
        toDoItems: JSON.parse(localStorage.getItem('toDoItems')),
        selectedFilter: localStorage.getItem('selectedFilter'),
      });
    }
  }

  saveToLocalSetState = (state) => {
    this.setState({ ...state }, () => {
      this.saveDataToLocalStorage();
    });
  };

  addNewItem = (newItem) => {
    this.saveToLocalSetState({
      toDoItems: [...this.state.toDoItems, newItem],
    });
  };

  toggleItem = (id) => {
    const toDoArray = [...this.state.toDoItems];
    const index = toDoArray.findIndex(item => item.id === id);
    toDoArray[index] = {
      ...toDoArray[index],
      isCompleted: !toDoArray[index].isCompleted,
    };
    this.saveToLocalSetState({
      toDoItems: toDoArray,
    });
  };

  deleteToDoItem = (id) => {
    const toDoItems = [...this.state.toDoItems].filter(toDo => toDo.id !== id);
    this.saveToLocalSetState({
      toDoItems,
    });
  };

  setSelectedFiler = (selectedFilter) => {
    this.saveToLocalSetState({
      selectedFilter,
    });
  };

  generateFilteredDataSouce = () => {
    const { selectedFilter, toDoItems } = this.state;
    let res = [];
    switch (selectedFilter) {
      case 'active':
        res = toDoItems.filter(item => !item.isCompleted);
        break;
      case 'completed':
        res = toDoItems.filter(item => item.isCompleted);
        break;
        default:
        res = toDoItems;
        break;
    }

    return res;
  };

  saveDataToLocalStorage() {
    localStorage.setItem('toDoItems', JSON.stringify(this.state.toDoItems));
    localStorage.setItem('selectedFilter', this.state.selectedFilter);
  }

  passId() {
    return this.state.toDoItems.length + 1;
  }

  render() {
    let visibleItems = this.generateFilteredDataSouce();

    return (
      <section className='todoapp'>
        <Header addNewItem={this.addNewItem} passIdBack={this.passId()}/>
        <ToDoItem
          toggleItem={this.toggleItem}
          deleteToDoItem={this.deleteToDoItem}
          items={visibleItems}
        />
        <Footer
          activeItemsLength={
            this.state.toDoItems.filter(item => item.isCompleted === false)
              .length
          }
          setSelectedFiler={this.setSelectedFiler}
          selectedFilter={this.state.selectedFilter}
        />
      </section>
    );
  }
}

export default App;
