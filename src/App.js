import React from "react";

import ToDoItem from "./ToDoItem";
import Header from "./Header";
import Footer from "./Footer";

class App extends React.Component {
  state = {
    toDoItems: [],
    selectedFilter: "all"
  };

  saveToLocalSetState = state => {
    this.setState({ ...state }, () => {
      this.saveDataToLocalStorage();
    });
  };

  componentDidMount() {
    if (localStorage.getItem("toDoItems") !== null) {
      this.saveToLocalSetState({
        toDoItems: JSON.parse(localStorage.getItem("toDoItems")),
        selectedFilter: localStorage.getItem("selectedFilter")
      });
    }
  }

  saveDataToLocalStorage() {
    localStorage.setItem("toDoItems", JSON.stringify(this.state.toDoItems));
    localStorage.setItem("selectedFilter", this.state.selectedFilter);
  }

  addNewItem = newItem => {
    this.saveToLocalSetState({
      toDoItems: [...this.state.toDoItems, newItem]
    });
  };

  toggleItem = id => {
    const toDoArray = [...this.state.toDoItems];
    const index = toDoArray.findIndex(item => item.id === id);
    toDoArray[index].isCompleted = !toDoArray[index].isCompleted;
    this.saveToLocalSetState({
      toDoItems: toDoArray
    });
  };

  deleteToDoItem = id => {
    const toDoItems = [...this.state.toDoItems].filter(toDo => toDo.id !== id);
    this.saveToLocalSetState({
      toDoItems
    });
  };

  setSelectedFiler = selectedFilter => {
    this.saveToLocalSetState({
      selectedFilter
    });
  };

  generateFilteredDataSouce = () => {
    const { selectedFilter, toDoItems } = this.state;
    let res = [];
    switch (selectedFilter) {
      default:
        res = toDoItems;
        break;
      case "active":
        res = toDoItems.filter(item => !item.isCompleted);
        break;
      case "completed":
        res = toDoItems.filter(item => item.isCompleted);
        break;
    }

    return res;
  };

  render() {
    let visibleItems = this.generateFilteredDataSouce();

    return (
      <section className="todoapp">
        <Header addNewItem={this.addNewItem} />
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
