import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

class App extends React.Component {
  state = {
    todoList: [],
    todoListCopy: [],
    viewStatus: 'All',
  }

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('todoList'));

    if (todos) {
      this.setState({
        todoList: todos,
        todoListCopy: todos,
      });
    }
  }

  componentDidUpdate(prevState) {
    if (this.state.todoList !== prevState.todoList) {
      localStorage
        .setItem('todoList', JSON.stringify(this.state.todoList));
    }
  }

  status = (todo) => {
    switch (this.state.viewStatus) {
      case 'All':
        return true;

      case 'Active':
        return !todo.completed;

      case 'Completed':
        return todo.completed;

      default:
        return true;
    }
  }

  handleStatusChange = (event) => {
    const status = event.target.id;

    this.setState({ viewStatus: status });
  }

  addTodo = (todo) => {
    if (!todo.title.length) {
      return;
    }

    localStorage
      .setItem('todoList', JSON.stringify([...this.state.todoList, todo]));

    this.setState(prevState => ({
      todoList: [...prevState.todoList, todo],
      todoListCopy: [...prevState.todoListCopy, todo],
    }));
  }

  changeTodo = (e, id) => {
    const { value } = e.target;

    const todos = this.state.todoList.map((item) => {
      if (item.id === id) {
        return (
          {
            ...item,
            title: value,
          }
        );
      }

      return item;
    });

    this.getTodos(todos, todos);
  }

  toogleAllTodosStatus = () => {
    this.setState((prevstate) => {
      if (prevstate.todoList.some(todo => todo.completed === false)) {
        const items = prevstate.todoList.map((item) => {
          const currentItem = item;

          currentItem.completed = true;

          return currentItem;
        });

        return {
          todolist: items, todoListCopy: items,
        };
      }

      const items = prevstate.todoList.map((item) => {
        const currentItem = item;

        currentItem.completed = false;

        return currentItem;
      });

      return {
        todolist: items, todoListCopy: items,
      };
    });
  }

  getTodos = (todos, todosCopy) => (
    this.setState({
      todoListCopy: todosCopy,
      todoList: todos,
    })
  )

  render() {
    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <Main
          todoList={this.state.todoList}
          todoListCopy={this.state.todoListCopy.filter(this.status)}
          toogleAllTodosStatus={this.toogleAllTodosStatus}
          getTodos={this.getTodos}
          changeTodo={this.changeTodo}
        />
        <Footer
          todoList={this.state.todoList}
          todoListCopy={this.state.todoListCopy}
          getTodos={this.getTodos}
          handleStatusChange={this.handleStatusChange}
        />
      </section>
    );
  }
}

export default App;
