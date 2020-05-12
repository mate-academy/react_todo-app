import React from 'react';
import TodoList from './TodoList';
import Header from './Header';
import { FILTERS } from './filters';
import Footer from './Footer';

class App extends React.Component {
  state= {
    todosList: [],
    currentFilter: FILTERS.all,
  }

  addTodo = (newTodo) => {
    this.setState(({ todosList }) => (
      { todosList: [...todosList, newTodo] }
    ));
  }

  editTodo = (target, todoId, newTitle, escapeEditing) => {
    if (target.keyCode === 13) {
      this.setState(({ todosList }) => ({
        todosList: todosList.map((todo) => {
          if (todo.id === todoId) {
            return {
              ...todo, title: newTitle,
            };
          }

          return todo;
        }),
      }));

      if (newTitle === '') {
        return;
      }
    }

    escapeEditing(target);
  }

  deleteTodo = (todoId) => {
    this.setState(({ todosList }) => ({
      todosList: todosList.filter(({ id }) => id !== todoId),
    }));
  }

  checkCompletedAll = list => list.every(todo => todo.completed === true)

  markAllTodo = () => {
    this.setState(({ todosList }) => ({
      todosList: todosList.map((todo) => {
        if (!this.checkCompletedAll(todosList)) {
          return {
            ...todo,
            completed: true,
          };
        }

        return {
          ...todo,
          completed: false,
        };
      }),
    }));
  }

  clearCompletedTodo = () => {
    this.setState(({ todosList }) => ({
      todosList: todosList.filter(({ completed }) => !completed),
    }));
  }

  changeTodoStatus = (todoId) => {
    this.setState(({ todosList }) => ({
      todosList: todosList.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          completed: !todo.completed,
        };
      }),
    }));
  }

  changeVisibleList = (filterName) => {
    this.setState({
      currentFilter: filterName,
    });
  }

  render() {
    const { todosList, currentFilter } = this.state;

    let preparedTodos = todosList;
    let selectAllButton;
    let hideOnStart;
    const hideClearButton = preparedTodos.some(todo => todo.completed === true);

    preparedTodos.length > 0 ? hideOnStart = true : hideOnStart = false;

    if (this.checkCompletedAll(preparedTodos) && todosList.length > 0) {
      selectAllButton = true;
    } else {
      selectAllButton = false;
    }

    if (currentFilter === FILTERS.active) {
      preparedTodos = preparedTodos.filter(todo => !todo.completed);
    }

    if (currentFilter === FILTERS.completed) {
      preparedTodos = preparedTodos.filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />

        <section className="main">

          <TodoList
            todos={preparedTodos}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
            changeTodoStatus={this.changeTodoStatus}
            markAllTodo={this.markAllTodo}
            selectAllButton={selectAllButton}
            hideOnStart={hideOnStart}
          />
        </section>
        {hideOnStart && (
          <Footer
            todosList={todosList}
            hideClearButton={hideClearButton}
            currentFilter={currentFilter}
            changeVisibleList={this.changeVisibleList}
            clearCompletedTodo={this.clearCompletedTodo}
          />
        )}

      </section>
    );
  }
}

export default App;
