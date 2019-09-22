import React, { Component } from 'react';
import TodoApp from './components/TodoApp/TodoApp';
import TodoList from './components/TodoList/TodoList';

class App extends Component {
  state = {
    listTodos: localStorage.getItem('todos')
      ? [...JSON.parse(localStorage.getItem('todos'))]
      : [],
  }

  addTodo = (title) => {
    this.setState(prevState => (
      {
        listTodos: [...prevState.listTodos,
          {
            id: prevState.listTodos
              .map(item => item.id)
              .sort((a, b) => a - b)[prevState.listTodos.length - 1] + 1 || 0,
            title,
            completed: false,
          },
        ],
      }
    ));
  }

  removeTodos = (ids) => {
    this.setState(prevState => (
      {
        listTodos: [...prevState.listTodos]
          .filter(item => !ids.includes(item.id)),
      }
    ));
  }

  changeCompleted = (id) => {
    this.setState(prevState => (
      {
        listTodos: [...prevState.listTodos]
          .map(item => (item.id === id
            ? { ...item, completed: !item.completed }
            : { ...item })),
      }
    ));
  }

  setCompletedAll = (stateCompleted) => {
    this.setState(prevState => ({
      listTodos: [...prevState.listTodos]
        .map(item => ({ ...item, completed: stateCompleted })),
    }
    ));
  }

  editTask = (id, newTitle) => {
    this.setState(prevState => ({
      listTodos: [...prevState.listTodos]
        .map(item => (item.id === id
          ? { ...item, title: newTitle }
          : { ...item }
        )),
    }));
  }

  render() {
    const { listTodos } = this.state;

    localStorage.setItem('todos', JSON.stringify(listTodos));

    return (
      <section className="todoapp">
        <TodoApp addTodo={this.addTodo} />

        <TodoList
          items={listTodos}
          changeCompleted={this.changeCompleted}
          removeTodos={this.removeTodos}
          setCompletedAll={this.setCompletedAll}
          editTask={this.editTask}
        />
      </section>
    );
  }
}

export default App;
