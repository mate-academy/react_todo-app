import React from 'react';
import { Header } from '../Header/Header';
import { Main } from '../Main/Main';
import { Footer } from '../Footer/Footer';

export class TodoApp extends React.Component {
  storageName = 'hvb-todos';

  state = {
    todos: [],
    notCompletedAmount: 0,
    filter: 'all',
  };

  componentDidMount() {
    const storedTodos
      = JSON.parse(window.localStorage.getItem(this.storageName));

    if (storedTodos) {
      this.setState({
        todos: storedTodos,
        notCompletedAmount: this.getNumOfNotCompletedTodos(storedTodos),
      });
    }
  }

  componentDidUpdate() {
    this.updateStorage(this.state.todos);
  }

  addTodo = (title) => {
    this.setState((prevState) => {
      const todosLength = prevState.todos.length;
      const updatedList = [...prevState.todos, {
        title,
        id: todosLength ? prevState.todos[todosLength - 1].id + 1 : 1,
        completed: false,
      }];

      return {
        todos: updatedList,
        notCompletedAmount: prevState.notCompletedAmount + 1,
      };
    });
  };

  removeTodo = (todoIndex) => {
    this.setState((prevState) => {
      const updatedTodos = [...prevState.todos];
      const removedItem = updatedTodos.splice(todoIndex, 1)[0];

      return {
        todos: updatedTodos,
        notCompletedAmount: prevState.notCompletedAmount
          - +(!removedItem.completed),
      };
    });
  };

  removeCompleted = () => {
    this.setState(prevState => ({
      todos: [...prevState.todos.filter(item => !item.completed)],
    }));
  };

  changeTodoStatus = (todoIndex, completed) => {
    this.setState((prevState) => {
      // todo: is copy needed?
      const updatedTodos = [...prevState.todos];
      const newStatus = completed || !updatedTodos[todoIndex].completed;

      updatedTodos[todoIndex].completed = newStatus;

      return {
        todos: updatedTodos,
        notCompletedAmount: (newStatus) ? (prevState.notCompletedAmount - 1)
          : (prevState.notCompletedAmount + 1),
      };
    });
  };

  toggleEveryTodoStatus = (event) => {
    const allChecked = event.target.checked;

    this.setState((prevState) => {
      // todo: is copy needed?
      const updatedTodos = [...prevState.todos];

      for (let i = 0; i < updatedTodos.length; i += 1) {
        updatedTodos[i].completed = allChecked;
      }

      return {
        todos: updatedTodos,
        notCompletedAmount: allChecked ? 0 : updatedTodos.length,
      };
    });
  };

  changeTodoTitle = (todoIndex, value) => {
    this.setState((prevState) => {
      const updatedTodos = [...prevState.todos];

      updatedTodos[todoIndex].title = value;

      return {
        todos: updatedTodos,
      };
    });
  };

  changeFilterStatus = (value) => {
    this.setState({
      filter: value,
    });
  };

  // eslint-disable-next-line max-len
  getNumOfNotCompletedTodos = todos => todos.filter(item => !item.completed).length;

  updateStorage = (todos) => {
    window.localStorage.setItem(
      this.storageName,
      JSON.stringify(todos),
    );
  };

  render() {
    const { todos, notCompletedAmount, filter } = this.state;

    return (
      <section className="todoapp">
        <Header onAddTodo={this.addTodo} />
        <Main
          todos={todos}
          handleStatusChange={this.changeTodoStatus}
          handleTitleChange={this.changeTodoTitle}
          handleTodoRemove={this.removeTodo}
          handleToggleAll={this.toggleEveryTodoStatus}
          notCompletedTodos={notCompletedAmount}
          filter={filter}
        />
        {
          todos.length > 0
          && (
            <Footer
              todosAmount={todos.length}
              notCompletedTodos={notCompletedAmount}
              handleCompletedRemove={this.removeCompleted}
              handleFilterStatusChange={this.changeFilterStatus}
              activeFilter={filter}
            />
          )
        }
      </section>
    );
  }
}
