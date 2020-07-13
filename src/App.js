import React from 'react';
import { uuid } from 'uuidv4';
import { Header } from './components/Header/Header';
import { TodoList } from './components/TodoList/TodoList';

class App extends React.Component {
  state = {
    task: '',
    dynamicList: JSON.parse(localStorage.getItem('dynamicList')) || [],
    checkBoxId: JSON.parse(localStorage.getItem('checkBoxId')) || {},
    isTouched: false,
  }

  componentDidUpdate() {
    const { dynamicList, checkBoxId } = this.state;

    localStorage.setItem('dynamicList', JSON.stringify(dynamicList));

    localStorage.setItem('checkBoxId', JSON.stringify(checkBoxId));
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
    }));
  }

  handleChecked = (id, event) => {
    this.setState(prevState => ({
      checkBoxId: {
        ...prevState.checkBoxId,
        [id]: event,
      },
    }));
  }

  handleClearCompleted = () => {
    this.setState(prevState => ({
      dynamicList: prevState.dynamicList
        .filter(task => !prevState.checkBoxId[task.id] === true),
      checkBoxId: {},
    }));
  }

  handleClearTask = (id) => {
    this.setState(prevState => ({
      dynamicList: prevState.dynamicList.filter(task => task.id !== id),
    }));

    delete this.state.checkBoxId[id];
  }

  handleMarkAll = () => {
    this.setState(prevState => ({
      isTouched: !prevState.isTouched,
    }), () => {
      if (this.state.isTouched === true) {
        this.state.dynamicList.forEach((currentValue) => {
          this.setState(prevState => ({
            checkBoxId: {
              ...prevState.checkBoxId,
              [currentValue.id]: true,
            },
          }));
        });
      } else {
        this.setState({
          checkBoxId: {},
        });
      }
    });
  }

  render() {
    const {
      task,
      dynamicList,
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
          handleClearCompleted={this.handleClearCompleted}
        />
      </section>
    );
  }
}

export default App;
