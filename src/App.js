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

  getFilteredTodos = (filter, todosList) => {
    if (filter === FILTERS.active) {
      return todosList.filter(todo => !todo.completed);
    }

    if (filter === FILTERS.completed) {
      return todosList.filter(todo => todo.completed);
    }

    return todosList;
  }

  selectAllButton = (todosList) => {
    if (this.checkCompletedAll(todosList) && todosList.length > 0) {
      return true;
    }

    return false;
  }

  render() {
    const { todosList, currentFilter } = this.state;

    const hideClearButton = todosList.some(todo => todo.completed === true);

    return (
      <section className="todoapp">
        <Header addTodo={this.addTodo} />

        <section className="main">

          <TodoList
            todos={this.getFilteredTodos(currentFilter, todosList)}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
            changeTodoStatus={this.changeTodoStatus}
            markAllTodo={this.markAllTodo}
            selectAllButton={this.selectAllButton(todosList)}
          />
        </section>
        {todosList.length > 0 && (
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
