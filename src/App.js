import React from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todoItemsArr: [],
    sortedTodoItemsArr: [],
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
    this.setState(prevState => ({
      todoItemsArr: prevState.todoItemsArr.map(todo => (
        { ...todo, completed: !prevState.allCompleted }
      )),
      allCompleted: !prevState.allCompleted,
    }));
  }

  isExistingAndUnique = (value, arr) => {
    if (value && !arr.some(item => item.title === value)) {
      return true;
    }
    return false;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const todoObj = {
      title: this.state.todoValue,
      id: this.state.todoValue,
      completed: false,
    };

    this.setState((prevState) => {
      if (this.isExistingAndUnique(
        prevState.todoValue,
        prevState.todoItemsArr
      )) {
        return ({
          todoItemsArr: [todoObj, ...prevState.todoItemsArr],
          todoValue: '',
          editingId: '',
          sortState: 'All',
        });
      }
      return ({
        todoValue: prevState.todoValue,
        editingId: '',
      });
    });
  }

  handleSubmitEdit = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (this.isExistingAndUnique(
        prevState.todoEditValue,
        prevState.todoItemsArr
      )) {
        return ({
          todoItemsArr: prevState.todoItemsArr.map((todo) => {
            if (todo.id === prevState.editingId) {
              todo = { ...todo, title: prevState.todoEditValue };
            }
            return todo;
          }),
          todoEditValue: '',
          editingId: '',
          sortState: 'All',
        });
      }
      return ({
        todoEditValue: prevState.todoEditValue,
        editingId: '',
      });
    });
  }

  handleItem = (id, type) => {
    switch (type) {
      case 'destroy':
        return (
          this.setState(prevState => ({
            todoItemsArr: prevState.todoItemsArr.filter(item => item.id !== id),
            sortState: 'All',
          })));

      case 'completed':
        return (
          this.setState(prevState => ({
            todoItemsArr: prevState.todoItemsArr.map((item) => {
              item.id === id
              && (item = { ...item, completed: !item.completed });

              return item;
            }),

            sortState: 'All',
          })));

      default:
        return this.state.todoItemsArr;
    }
  }

  handleDestroyComleted = () => {
    this.setState(prevState => ({
      todoItemsArr: prevState.todoItemsArr.filter(item => !item.completed),

      allCompleted: false,
    }));
  }

  handleSort = (state) => {
    this.setState((prevState) => {
      switch (state) {
        case 'Active':
          return ({
            sortedTodoItemsArr: [...prevState.todoItemsArr]
              .filter(item => !item.completed),
            sortState: 'Active',
          });

        case 'Completed':
          return ({
            sortedTodoItemsArr: [...prevState.todoItemsArr]
              .filter(item => item.completed),
            sortState: 'Completed',
          });

        default:
          return ({
            sortedTodoItemsArr: prevState.todoItemsArr,
            sortState: 'All',
          });
      }
    });
  }

  handleEdit = (id) => {
    this.setState(prevState => ({
      editingId: id,
      todoEditValue: prevState.todoItemsArr
        .find(todo => todo.id === id).title,
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
          sortState={this.state.sortState}
          sortedTodoItemsArr={this.state.sortedTodoItemsArr}
          todoItemsArr={this.state.todoItemsArr}

          handleAllCompleted={this.handleAllCompleted}
          allCompleted={this.state.allCompleted}
          handleItem={this.handleItem}
          handleEdit={this.handleEdit}

          handleTypeEdit={this.handleTypeEdit}
          handleSubmitEdit={this.handleSubmitEdit}

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
