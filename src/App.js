import React from 'react';

import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
      todoId: 1,
      allToggle: false,
      activeFilter: 'all',
    };
  }

  addNewTodo = (todo) => {
    const fullTodo = {
      title: todo,
      id: this.state.todoId,
      status: false,
    };

    this.setState((prev) => {
      return {
        ...prev,
        todoList: [...prev.todoList, fullTodo],
        todoId: prev.todoId + 1,
      };
    });
  }

  deleteTodo = (event) => {
    const { todoList } = this.state;
    const workList = [...todoList];
    const delIndex = workList
      .map(todo => todo.title === event.target.value);
    workList.splice (delIndex, 1);
    this.setState(prev => {
      return {
        ...prev,
        todoList: [...workList]
      }
    })
  }

  leftItems = () => {
    let countLeftItem = 0;
    this.state.todoList.forEach(todo => {
      if (todo.status === false) {
        countLeftItem++
      }
    })

    return countLeftItem;
  }

  chooseFinishTask = (id) => {
    const { todoList } = this.state;
    let workList = [...todoList];
    const chooseTask = workList
      .findIndex(todo => todo.id === id);
      workList[chooseTask].status === true
      ? workList[chooseTask].status = false
      : workList[chooseTask].status = true;
    this.setState(prev => {
      return {
        ...prev,
        todoList: [...workList]
      }
    })
  }

  toggleAllTodos = () => {
    const { todoList, allToggle } = this.state;
    let workList = [...todoList]
    if (!allToggle) {
      workList.forEach(todo => todo.status = true);
    } else {
      workList.forEach(todo => todo.status = false)
    }

    this.setState(prev => {
      return {
        ...prev,
        todoList: [...workList],
        allToggle: !prev.allToggle
      }
    })
  }

  clearCompleted = () => {
    this.setState(prev => {
      return {
        ...prev,
        todoList: []
      }
    })
  }

  handleActiveFilter = (status) => {
    this.setState(prev => {
      return {
        ...prev,
        activeFilter: status
      }
    })
  }


  render() {
    const { todoList, activeFilter } = this.state;

    return (
      <section className="todoapp">
        <Header onSubmit={this.addNewTodo}/>
        <Main
          todoList={todoList}
          deleteItem={this.deleteTodo}
          chooseFinishTask={this.chooseFinishTask}
          toggleAllTodos={this.toggleAllTodos}
          activeFilter={activeFilter}
        />
        <Footer
          todoListLength={this.leftItems()}
          todoList={this.state.todoList}
          clearCompleted={this.clearCompleted}
          activeFilter={activeFilter}
          handleActiveFilter={this.handleActiveFilter}
        />
      </section>
    );
  }
}

export default App;
