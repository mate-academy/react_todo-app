import React, { Component } from 'react';
import AddTodo from './components/AddTodo/AddTodo';
import TodoList from './components/TodoList/TodoList';

class App extends Component {
  state = {
    listTodos: localStorage.getItem('todos')
      ? [...JSON.parse(localStorage.getItem('todos'))]
      : [],
  }

  addTodo = (title) => {
    this.setState((prevState) => {
      const listTodos = [...prevState.listTodos,
        {
          id: prevState.listTodos
            .map(item => item.id)
            .sort((a, b) => a - b)[prevState.listTodos.length - 1] + 1 || 0,
          title,
          completed: false,
        },
      ];

      localStorage.setItem('todos', JSON.stringify(listTodos));

      return ({
        listTodos,
      });
    });
  }

  removeTodos = (ids) => {
    this.setState((prevState) => {
      const listTodos = [...prevState.listTodos]
        .filter(item => !ids.includes(item.id));

      localStorage.setItem('todos', JSON.stringify(listTodos));

      return ({
        listTodos,
      });
    });
  }

  changeCompleted = (id) => {
    this.setState((prevState) => {
      const listTodos = [...prevState.listTodos]
        .map(item => (item.id === id
          ? { ...item, completed: !item.completed }
          : { ...item }));

      localStorage.setItem('todos', JSON.stringify(listTodos));

      return ({
        listTodos,
      });
    });
  }

  setCompletedAll = (stateCompleted) => {
    this.setState((prevState) => {
      const listTodos = [...prevState.listTodos]
        .map(item => ({ ...item, completed: stateCompleted }));

      localStorage.setItem('todos', JSON.stringify(listTodos));

      return ({
        listTodos,
      });
    });
  }

  editTask = (id, newTitle) => {
    if (!newTitle) {
      this.removeTodos([id]);
    } else {
      this.setState((prevState) => {
        const listTodos = [...prevState.listTodos]
          .map(item => (item.id === id
            ? { ...item, title: newTitle }
            : { ...item }
          ));

        localStorage.setItem('todos', JSON.stringify(listTodos));

        return ({
          listTodos,
        });
      });
    }
  }

  createFilteredTodos = (list, switcher) => {
    switch (switcher) {
      case 'completed':
        return [...list].filter(item => item.completed);
      case 'active':
        return [...list].filter(item => !item.completed);
      default:
        return [...list];
    }
  };

  render() {
    const { listTodos } = this.state;

    return (
      <section className="todoapp">
        <AddTodo addTodo={this.addTodo} />

        <TodoList
          items={listTodos}
          changeCompleted={this.changeCompleted}
          removeTodos={this.removeTodos}
          setCompletedAll={this.setCompletedAll}
          editTask={this.editTask}
          createFilteredTodos={this.createFilteredTodos}
        />
      </section>
    );
  }
}

export default App;
