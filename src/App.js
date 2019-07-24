import React from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todoItemsArr: [],
    sortedTodoItemsArr: [],
    sortState: 'All',
    allCompleted: false,
  }

  handleAllCompleted = (event) => {
    this.setState(prevState => ({
      todoItemsArr: prevState.todoItemsArr.map(todo => (
        { ...todo, completed: !prevState.allCompleted }
      )),
      allCompleted: !prevState.allCompleted,
    }));
  }

  writeNewTodo = (todoObj) => {
    this.setState(prevState => ({
      todoItemsArr: [todoObj, ...prevState.todoItemsArr],
      sortState: 'All',
    }));
  }

  rewriteExistingTodo = (title, id) => {
    this.setState(prevState => ({
      todoItemsArr: prevState.todoItemsArr.map((todo) => {
        if (todo.id === id) {
          todo = { ...todo, title };
        }
        return todo;
      }),
    }));
  }

  handleCompletedOrDestroy = (id, type) => {
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
      todoItemsArr: prevState.todoItemsArr.filter(item => (
        !item.completed
      )),

      allCompleted: false,
      sortState: 'All',
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

  render() {
    return (
      <section className="todoapp">
        <Header
          writeNewTodo={this.writeNewTodo}
          todoItemsArr={this.state.todoItemsArr}
        />

        <Main
          sortState={this.state.sortState}
          sortedTodoItemsArr={this.state.sortedTodoItemsArr}
          todoItemsArr={this.state.todoItemsArr}

          handleAllCompleted={this.handleAllCompleted}
          allCompleted={this.state.allCompleted}
          handleCompletedOrDestroy={this.handleCompletedOrDestroy}

          todoEditValue={this.state.todoEditValue}
          editingId={this.state.editingId}
          rewriteExistingTodo={this.rewriteExistingTodo}
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
