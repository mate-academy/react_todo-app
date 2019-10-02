import React from 'react';

import TodoList from './components/TodoList/TodoList';
import Form from './components/Form/Form';
import Filters from './components/Filters/Filters';
// import './base.css';
// import './index.css';

class App extends React.Component {
  state = {
    todoList: [],
    todoListOriginal: [],
    completedAll: 0, // eslint-disable-line
  }

  AddTodo = (inputFormValue) => {
    this.setState(prevState => ({
      todoListOriginal: [
        ...prevState.todoListOriginal,
        inputFormValue,
      ],
      todoList: [
        ...prevState.todoListOriginal,
        inputFormValue,
      ],
    }));
  }

  destroyTodo = (idTodoToDestroy) => {
    this.setState(prevState => ({
      todoList: prevState.todoList.filter(todo => todo.id !== idTodoToDestroy),
    }));
  }

  changeStatus = (idTodoToChange) => {
    this.setState(prevState => ({
      todoListOriginal: prevState.todoListOriginal.map(todo => (
        todo.id !== idTodoToChange
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
      )),
      todoList: prevState.todoList.map(todo => (
        todo.id !== idTodoToChange
          ? todo
          : {
            ...todo,
            completed: !todo.completed,
          }
      )),
    }));
  }

  changeStatusAll = () => {
    this.setState(prevState => (
      prevState.completedAll === 0
        ? {
          todoList: prevState.todoList.map(todo => (
            {
              ...todo,
              completed: true,
            }
          )),
          completedAll: 1,
        }
        : {
          todoList: prevState.todoList.map(todo => (
            {
              ...todo,
              completed: false,
            }
          )),
          completedAll: 0,
        }
    ));
  }

  nonCompletedCount = (e) => {
    const count = this.state.todoListOriginal
      .filter(todo => todo.completed !== true);

    if (e) {
      this.setState({
        todoList: count,
      });
    }

    if (count.length) {
      return `${count.length} todos left`;
    }

    return false;
  }

  completedAppears = () => {
    const arr = this.state.todoListOriginal
      .filter(todo => todo.completed === true);

    return !!arr.length;
  }

  nonCompletedTodosSorting = () => {
    this.setState(prevState => ({
      todoList: prevState.todoListOriginal
        .filter(todo => todo.completed !== true),
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todoList: prevState.todoListOriginal
        .filter(todo => todo.completed !== true),
      todoListOriginal: prevState.todoListOriginal
        .filter(todo => todo.completed !== true),
    }));
  }

  completedTodosSorting = () => {
    this.setState(prevState => ({
      todoList: prevState.todoListOriginal
        .filter(todo => todo.completed === true),
    }));
  }

  allTodosToShowSorting = () => {
    this.setState({
      todoList: this.state.todoListOriginal, // eslint-disable-line
    });
  }

  handleTodoTitleEdit = (id, title) => {
    if (title) {
      this.setState(({ todoList }) => ({
        todoList: todoList.map(todo => (todo.id === id
          ? { ...todo, todoTitle: title }
          : todo)),
      }));
    } else {
      this.destroyTodo(id);
    }
  };

  onInputChange = (value) => {
    this.setState({ todoTitle: value }); // eslint-disable-line
  };

  render() {
    const { todoList, todoListOriginal } = this.state;

    localStorage.setItem('todoListOriginal', JSON.stringify(todoListOriginal));
    const listOfTodos = localStorage.getItem('todoListOriginal');
    /* eslint-disable */
    let footerDisplay = '';
    listOfTodos !== "[]"
    ? footerDisplay = 'block'
    : footerDisplay = 'none';
    /* eslint-enable */

    return (
      <section className="todoapp">
        <Form AddTodo={this.AddTodo} />
        <TodoList
          handleTodoTitleEdit={this.handleTodoTitleEdit}
          changeStatusAll={this.changeStatusAll}
          changeStatus={this.changeStatus}
          destroyTodo={this.destroyTodo}
          todos={todoList}
        />
        <Filters
          footerDisplay={footerDisplay}
          clearCompleted={this.clearCompleted}
          completedAppears={this.completedAppears}
          allTodosToShowSorting={this.allTodosToShowSorting}
          nonCompletedCount={this.nonCompletedCount}
          nonCompletedTodosSorting={this.nonCompletedTodosSorting}
          completedTodosSorting={this.completedTodosSorting}
        />
      </section>
    );
  }
}

export default App;
