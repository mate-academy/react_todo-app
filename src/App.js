import React from 'react';

import ToDoItem from './ToDoItem'
import Header from './Header'
import Footer from './Footer'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      toDoItems: [],
      selectedFilter: "all"
    }
  }

  componentDidMount() {
    if (localStorage.getItem("toDoItems") !== null) {
      this.setState({
        toDoItems: JSON.parse(localStorage.getItem("toDoItems")),
        selectedFilter: JSON.parse(localStorage.getItem("selectedFilter"))
      })
    }
  }

  saveDataToLocalStorage() {
    localStorage.setItem('toDoItems', JSON.stringify(this.state.toDoItems))
    localStorage.setItem('selectedFilter', JSON.stringify(this.state.selectedFilter))
  }

  updateToDoItems = (newItem) => {
    this.setState({
      toDoItems: [...this.state.toDoItems, newItem],
    })
  }

  replaceItemWithChangedState = (itemToReplace) => {
    const toDoArray = [...this.state.toDoItems];
    const index = toDoArray.indexOf(itemToReplace);
    itemToReplace.isCompleted = !itemToReplace.isCompleted;
    toDoArray[index] = itemToReplace;
    this.setState({
      toDoItems: toDoArray
    })
  }

  deleteToDoItem = (item) => {
    const toDoArray = [...this.state.toDoItems];
    toDoArray.splice(toDoArray.indexOf(item), 1);
    this.setState({
      toDoItems: toDoArray,
    })
  }

  setSelectedFiler = (value) => {
    this.setState({
      selectedFilter: value
    })
  }

  render() {
    let visibleItems;
    if (this.state.selectedFilter === "all") {
      visibleItems = this.state.toDoItems
    } else if (this.state.selectedFilter === "active") {
      visibleItems = this.state.toDoItems.filter(item => item.isCompleted === false)
    } else {
      visibleItems = this.state.toDoItems.filter(item => item.isCompleted === true)
    }

    this.state.toDoItems.length > 0 && this.saveDataToLocalStorage();
    return (
      <section className="todoapp" >
        <Header
          updateToDoItems={this.updateToDoItems} />
        <ToDoItem
          replaceItemWithChangedState={this.replaceItemWithChangedState}
          deleteToDoItem={this.deleteToDoItem}
          items={visibleItems} />
        <Footer
          activeItemsLength={this.state.toDoItems.filter(item => item.isCompleted === false).length}
          setSelectedFiler={this.setSelectedFiler}
          selectedFilter={this.state.selectedFilter} />
      </section>
    )
  }

}

export default App;
