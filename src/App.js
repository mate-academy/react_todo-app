import React from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todoItemsArr: [],
    currentArr: [],
    todoValue: '',
    todoEditValue: '',
    sortState: 'All',
    editingId: '',
    allCompleted: false,
  }

  handleType = (event) => {
    this.setState({
      todoValue: event.target.value,
    });
  };

  handleTypeEdit = (event) => {
    this.setState({
      todoEditValue: event.target.value,
    });
  };

  handleAllCompleted = (event) => {
    if (this.state.allCompleted) {
      this.setState(prevState => ({
        todoItemsArr: prevState.todoItemsArr.map((todo) => {
          todo.completed = false;
          return todo;
        }),
        allCompleted: !prevState.allCompleted,
      }));
    } else {
      (
        this.setState(prevState => ({
          todoItemsArr: prevState.todoItemsArr.map((todo) => {
            todo.completed = true;
            return todo;
          }),
          allCompleted: !prevState.allCompleted,
        }))
      );
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.editInput) {
      if (this.state.todoEditValue
        && !this.state.todoItemsArr
          .some(item => (item.title === this.state.todoEditValue))) {
        this.setState(prevState => ({
          todoItemsArr: prevState.todoItemsArr.map((todo) => {
            if (todo.id === prevState.editingId) {
              todo.title = prevState.todoEditValue;
            }

            return todo;
          }),

          currentArr: [...prevState.todoItemsArr],
          sortState: 'All',
        }));
      }
    }

    const todoObj = {
      title: this.state.todoValue,
      id: `${this.state.todoValue}-${this.state.todoItemsArr.length}`,
      completed: false,
    };

    if (this.state.todoValue
      && !this.state.todoItemsArr
        .some(item => item.title === this.state.todoValue)) {
      localStorage.setItem(
        'array', JSON.stringify([...this.state.todoItemsArr, todoObj])
      );

      this.setState(prevState => ({
        todoItemsArr: [...prevState.todoItemsArr, todoObj],
        todoValue: '',
        currentArr: [...prevState.todoItemsArr, todoObj],
        editingId: '',
        sortState: 'All',
      }));
    } else {
      this.setState(prevState => ({
        todoValue: prevState.value,
        editingId: '',
      }));
    }
  }

  handleItem = (id, type) => {
    switch (type) {
      case 'destroy':
        return (
          this.setState(prevState => ({
            todoItemsArr: prevState.todoItemsArr.filter(item => item.id !== id),
            currentArr: prevState.todoItemsArr.filter(item => item.id !== id),
          })));

      case 'completed':
        return (
          this.setState(prevState => ({
            todoItemsArr: [...prevState.todoItemsArr].map((item) => {
              item.id === id && (item.completed = !item.completed);
              return item;
            }),
          })));

      default:
        return this.state.currentArr;
    }
  }

  handleDestroyComleted = () => {
    this.setState(prevState => ({
      todoItemsArr: prevState.todoItemsArr.filter(item => !item.completed),
      currentArr: prevState.todoItemsArr.filter(item => !item.completed),
    }));
  }

  handleSort = (state) => {
    switch (state) {
      case 'Active':
        return (
          this.setState(prevState => ({
            currentArr: [...prevState.todoItemsArr]
              .filter(item => !item.completed),
            sortState: 'Active',
          })));

      case 'Completed':
        return (
          this.setState(prevState => ({
            currentArr: [...prevState.todoItemsArr]
              .filter(item => item.completed),
            sortState: 'Completed',
          })));

      default:
        return (
          this.setState(prevState => ({
            currentArr: prevState.todoItemsArr,
            sortState: 'All',
          })));
    }
  }

  handleEdit = (id) => {
    this.setState(prevState => ({
      editingId: id,
      todoEditValue: prevState.currentArr
        .filter(todo => todo.id === id).map(todo => todo.title),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <Header
          handleType={this.handleType}
          handleSubmit={this.handleSubmit}
          todoValue={this.state.todoValue}
        />

        <Main
          currentArr={this.state.currentArr}

          handleAllCompleted={this.handleAllCompleted}
          allCompleted={this.state.allCompleted}
          handleItem={this.handleItem}
          handleEdit={this.handleEdit}

          handleTypeEdit={this.handleTypeEdit}
          handleSubmit={this.handleSubmit}

          todoEditValue={this.state.todoEditValue}
          editingId={this.state.editingId}
        />

        <Footer
          todoItemsArr={this.state.todoItemsArr}

          handleSort={this.handleSort}
          handleDestroyComleted={this.handleDestroyComleted}

          sortState={this.state.sortState}
        />
      </section>
    );
  }
}

export default App;
