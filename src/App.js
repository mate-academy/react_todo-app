import React from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';

class App extends React.Component {
  state = {
    todoList: [],
    todoListCopy: [],
  }

  addTodo = (todo) => {
    if (!todo.title.length) {
      return;
    }

    this.setState(prevState => ({
      todoList: [...prevState.todoList, todo],
      todoListCopy: [...prevState.todoListCopy, todo],
    }));
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
          todoListCopy={this.state.todoListCopy}
          toogleAllTodosStatus={this.toogleAllTodosStatus}
          getTodos={this.getTodos}
        />
        <Footer
          todoList={this.state.todoList}
          todoListCopy={this.state.todoListCopy}
          getTodos={this.getTodos}
        />
      </section>
    );
  }
}

export default App;
