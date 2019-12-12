import React from 'react';
import LayoutMain from './LayoutMain';
import LayoutHeader from './LayoutHeader';
import LayoutFooter from './LayoutFooter';

class LayoutAll extends React.Component {
  state = {
    listOfTodos: [],
    id: 0,
    show: 'All',
  };

  currentListOfTodos = () => ({
    listOfTodos: this.state.listOfTodos,
    show: this.state.show,
  })

  createNewDo = (name) => {
    this.setState(state => ({
      listOfTodos: [
        ...state.listOfTodos,
        {
          todoName: name,
          isDone: false,
          id: state.id,
        },
      ],
      id: state.id + 1,
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

  getShow = () => this.state.show;

  activeOnly = () => {
    this.setState({ show: 'Active' });
  }

  showAll = () => {
    this.setState({ show: 'All' });
  }

  completedOnly = () => {
    this.setState({ show: 'Completed' });
  }

  clearCompleted = () => {
    this.setState(state => ({
      listOfTodos: state.listOfTodos.filter(doos => doos.isDone === false),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <LayoutHeader addDo={this.createNewDo} />
        <LayoutMain
          getTodos={this.currentListOfTodos}
          destroyElement={this.destroyElement}
          checkDone={this.dooDone}
          allDone={this.allDone}
        />
        <LayoutFooter
          showFooter={this.showFooter}
          getShow={this.getShow}
          activeOnly={this.activeOnly}
          completedOnly={this.completedOnly}
          showAll={this.showAll}
          clearCompleted={this.clearCompleted}
        />
      </section>
    );
  }
}

export default LayoutAll;
