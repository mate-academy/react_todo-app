import React from 'react';
import LayoutMain from './LayoutMain';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';
import FILTER_TYPES from './filterTypes';

class LayoutAll extends React.Component {
  state = {
    listOfTodos: [],
    lastIdOfTodos: 0,
    currentFilter: FILTER_TYPES.all,
  };

  currentListOfTodos = () => ({
    listOfTodos: this.state.listOfTodos,
    currentFilter: this.state.currentFilter,
  })

  createNewDo = (title) => {
    this.setState(state => ({
      listOfTodos: [
        ...state.listOfTodos,
        {
          todoName: title,
          isDone: false,
          id: state.lastIdOfTodos,
        },
      ],
      lastIdOfTodos: state.lastIdOfTodos + 1,
    }));
  }

  destroyElement = (id) => {
    this.setState(state => ({
      listOfTodos:
      state.listOfTodos.filter(dos => dos.id !== +id),
    }));
  }

  dooDone = (id) => {
    this.setState(state => ({
      listOfTodos: state.listOfTodos.map(doos => ({
        todoName: doos.todoName,
        isDone: doos.id === +id ? !doos.isDone : doos.isDone,
        id: doos.id,
      })),
    }));
  }

  allDone = () => {
    const notCompleted = (
      this.state.listOfTodos.some(todo => todo.isDone === false)
    );

    this.setState(state => ({
      listOfTodos: state.listOfTodos.map(doos => ({
        todoName: doos.todoName,
        isDone: notCompleted === true,
        id: doos.id,
      })),
    }));
  }

  showFooter = () => {
    const doosData = {
      length: this.state.listOfTodos.length,
      isNotDone:
      this.state.listOfTodos.filter(doo => doo.isDone === false).length,
    };

    return doosData;
  }

  getCurrentFilter = () => this.state.currentFilter;

  showActiveToDos = () => {
    this.setState({ currentFilter: FILTER_TYPES.active });
  }

  showAllToDos = () => {
    this.setState({ currentFilter: FILTER_TYPES.all });
  }

  showCompletedToDos = () => {
    this.setState({ currentFilter: FILTER_TYPES.completed });
  }

  clearCompletedToDos = () => {
    this.setState(state => ({
      listOfTodos: state.listOfTodos.filter(doos => doos.isDone === false),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <LayoutHeader addToDo={this.createNewDo} />
        <LayoutMain
          getTodos={this.currentListOfTodos}
          destroyElement={this.destroyElement}
          checkDone={this.dooDone}
          allDone={this.allDone}
        />
        <LayoutFooter
          showFooter={this.showFooter}
          getCurrentFilter={this.getCurrentFilter}
          showActiveToDos={this.showActiveToDos}
          showCompletedToDos={this.showCompletedToDos}
          showAllToDos={this.showAllToDos}
          clearCompletedToDos={this.clearCompletedToDos}
        />
      </section>
    );
  }
}

export default LayoutAll;
