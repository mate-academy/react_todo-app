import React from 'react';
import { Header } from './components/Header/Header';
import { Main } from './components/Main/Main';
import { Footer } from './components/Footer/Footer';

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

  isAllTodoToggle = () => {
    this.setState((prevState) => {
      if (prevState.todoList.some(todo => todo.isCompleted === false)) {
        const items = prevState.todoList.map((item) => {
          const currentItem = item;

          currentItem.isCompleted = true;

          return currentItem;
        });

        return {
          todoList: items,
          todoListCopy: items,
        };
      }

      const items = prevState.todoList.map((item) => {
        const currentItem = item;

        currentItem.isCompleted = false;

        return currentItem;
      });

      return {
        todoList: items,
        todoListCopy: items,
      };
    });
  }

  getTodos = (todos, todosCopy) => {
    this.setState({
      todoListCopy: todosCopy,
      todoList: todos,
    });
  }

  render() {
    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />
        <Main
          todoList={this.state.todoList}
          todoListCopy={this.state.todoListCopy}
          isAllTodoToggle={this.isAllTodoToggle}
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
