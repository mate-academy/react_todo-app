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
    if (todo === '') {
      return
    }
    const fullTodo = {
      title: todo,
      id: this.state.todoId,
      status: false,
      edit: false,
    };

    this.setState((prev) => {
      return {
        ...prev,
        todoList: [...prev.todoList, fullTodo],
        todoId: prev.todoId + 1,
      };
    });
  }

  deleteItem = (id) => {
    const { todoList } = this.state;
    const workList = todoList
      .filter(todo => todo.id !== id);
    this.setState(prev => {
      return {
        ...prev,
        todoList: [...workList]
      }
    })
  }

  countRelevantTodo = () => {
    let countRelevantItem = 0;
    this.state.todoList.forEach(todo => {
      if (todo.status === false) {
        countRelevantItem++
      }
    })

    return countRelevantItem;
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
        todoList: [...prev.todoList
          .filter(todo => todo.status === false)],
      };
    });
  }

  handleActiveFilter = (status) => {
    this.setState(prev => {
      return {
        ...prev,
        activeFilter: status
      }
    })
  }

  changeTodoItem = (id) => {
    const currentTodo = this.state.todoList.findIndex(todo => todo.id === id)
    const newTodo = [...this.state.todoList];
    newTodo[currentTodo].edit = true;
    this.setState(prev => {
      return {
        ...prev,
        todoList: [...newTodo],
      }
    })
  }

  editItem = (inputValue, id) => {
    const { todoList } = this.state;
    const copyTodoList = [...todoList];
    const currentTodo = copyTodoList.findIndex(todo => todo.id === id);
    copyTodoList[currentTodo] = {
      ...todoList[currentTodo],
      title: inputValue,
      edit: false
    }
    if (!inputValue) {
      copyTodoList.splice(currentTodo, 1)
    }
    this.setState(prev => {
      return {
        ...prev,
        todoList: [...copyTodoList],
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
          deleteItem={this.deleteItem}
          chooseFinishTask={this.chooseFinishTask}
          toggleAllTodos={this.toggleAllTodos}
          activeFilter={activeFilter}
          changeTodoItem={this.changeTodoItem}
          editItem={this.editItem}
        />
        <Footer
          todoListLength={this.countRelevantTodo()}
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
