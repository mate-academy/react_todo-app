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
      = JSON.parse(localStorage.getItem(this.storageName));

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

  // eslint-disable-next-line max-len
  getNotCompletedAmount = list => list.reduce((sum, item) => ((item.completed) ? sum : sum + 1), 0);

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

  removeTodo = (todoId) => {
    this.setState((prevState) => {
      let notCompletedNum = prevState.notCompletedAmount;

      const updatedTodos = prevState.todos.filter((todo) => {
        if (todoId === todo.id && !todo.completed) {
          notCompletedNum -= 1;
        }

        return todoId !== todo.id;
      });

      return {
        todos: updatedTodos,
        notCompletedAmount: notCompletedNum,
      };
    });
  };

  removeCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => !item.completed),
    }));
  };

  changeTodoStatus = (todoId) => {
    this.setState((prevState) => {
      /* eslint-disable no-param-reassign */
      const updatedTodos = prevState.todos.map((todo) => {
        if (todoId === todo.id) {
          todo.completed = !todo.completed;
        }

        return todo;
      });

      return {
        todos: updatedTodos,
        notCompletedAmount: this.getNotCompletedAmount(updatedTodos),
      };
    });
  };

  toggleEveryTodoStatus = (event) => {
    const allChecked = event.target.checked;

    this.setState((prevState) => {
      /* eslint-disable no-param-reassign */
      const updatedTodos = prevState.todos.map((todo) => {
        todo.completed = allChecked;

        return todo;
      });

      return {
        todos: updatedTodos,
        notCompletedAmount: allChecked ? 0 : updatedTodos.length,
      };
    });
  };

  changeTodoTitle = (todoId, value) => {
    this.setState((prevState) => {
      /* eslint-disable no-param-reassign */
      const updatedTodos = prevState.todos.map((todo) => {
        if (todoId === todo.id) {
          todo.title = value;
        }

        return todo;
      });

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
    localStorage.setItem(
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
