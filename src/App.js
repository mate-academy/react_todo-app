import React from 'react';
import TodoAdd from './components/TodoAdd';
import TodoList from './components/TodoList';
import { Footer } from './components/Footer';

const Exampletodos = [
  // {
  //   id: 1,
  //   title: 'learn Html',
  //   isTodoCompleted: true,
  // },
  // {
  //   id: 2,
  //   title: 'learn CSS',
  //   isTodoCompleted: true,
  // },
  // {
  //   id: 3,
  //   title: 'learn JS',
  //   isTodoCompleted: true,
  // },
  // {
  //   id: 4,
  //   title: 'learn React',
  //   isTodoCompleted: false,
  // },

];

class App extends React.Component {
  state = {
    todos: [...Exampletodos],
  }

  updateTodosList = (newTodoTitle) => {
    this.setState((state) => {
      const newTodo = {
        title: newTodoTitle,
        id: state.todos.length + 1,
        isTodoCompleted: false,
      };

      return {
        todos: [...state.todos, newTodo],
      };
    });
  }

  clearTodo = ({ target }) => {
    const todoId = this.state.todos.findIndex(todo => todo.id === +target.id);

    this.setState((state) => {
      const remainingTodos = [...state.todos];

      remainingTodos.splice(todoId, 1);

      return (
        {
          todos: [...remainingTodos],
        }
      );
    });
  };

  selectAllTodos = ({ target }) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        isTodoCompleted: target.checked,
      })),
    }));
  }

  handlerStatus = (id) => {
    this.setState(state => ({
      todos: state.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isTodoCompleted: !todo.isTodoCompleted,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <TodoAdd updateTodosList={this.updateTodosList} />
        <TodoList
          todos={this.state.todos}
          handlerStatus={this.handlerStatus}
          selectAllTodos={this.selectAllTodos}
          clearTodo={this.clearTodo}
        />
        <Footer
          todos={this.state.todos}
        />
      </section>
    );
  }
}

export default App;
