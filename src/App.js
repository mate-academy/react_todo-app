import React from 'react';
import { uuid } from 'uuidv4';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    task: '',
    dynamicList: [],
    isSubmitted: false,
    checkBoxId: new Map(),
    isTouched: false,
  }

  handleAddTask = (event) => {
    this.setState({
      task: event.replace(/^\s/, '').replace(/\s/g, ' '),
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState(prevState => ({
      dynamicList: [...prevState.dynamicList, {
        task: prevState.task,
        id: uuid(),
      }],
      task: '',
      isSubmitted: true,
    }));
  }

  handleChecked = (id, event) => {
    this.setState(prevState => ({
      checkBoxId: prevState.checkBoxId.set(id, event),
    }));
  }

  handleClearCompleted = () => {
    this.setState(prevState => ({
      dynamicList: prevState.dynamicList
        .filter(task => !prevState.checkBoxId.get(task.id)),
      checkBoxId: new Map(),
    }));
  }

  handleClearTask = (id) => {
    this.setState(prevState => ({
      dynamicList: prevState.dynamicList.filter(task => task.id !== id),
      checkBoxId: new Map(),
    }));
  }

  handleMarkAll = () => {
    this.setState(prevState => ({
      isTouched: !prevState.isTouched,
    }), () => {
      if (this.state.isTouched === true) {
        this.state.dynamicList.forEach((currentValue) => {
          this.setState(prevState => ({
            checkBoxId: prevState.checkBoxId.set(currentValue.id, true),
          }));
        });
      } else {
        this.setState({
          checkBoxId: new Map(),
        });
      }
    });
  }

  render() {
    const {
      task,
      dynamicList,
      isSubmitted,
      checkBoxId,
      isTouched,
    } = this.state;

    return (
      <section className="todoapp">
        <Header
          handleAddTask={this.handleAddTask}
          task={task}
          handleSubmit={this.handleSubmit}
        />
        <TodoList
          generalList={dynamicList}
          checkBoxId={checkBoxId}
          handleChecked={this.handleChecked}
          isTouched={isTouched}
          handleMarkAll={this.handleMarkAll}
          handleClearTask={this.handleClearTask}
          isSubmitted={isSubmitted}
          handleClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

export default App;
