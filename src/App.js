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

  addTodos = (newTodo) => {
    this.setState(prev => (
      { todosList: [...prev.todosList, newTodo] }
    ));
  }

  submitEditingTodo = (todoId, todoTitle) => {
    this.setState(({ todosList }) => ({
      todosList: todosList.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo, title: todoTitle,
          };
        }

        return todo;
      }),
    }));
  }

  deleteTodo = (todoId) => {
    this.setState(({ todosList }) => ({
      todosList: todosList.filter(({ id }) => id !== todoId),
    }));
  }

  checkCompleted = list => list.every(x => x.completed === true)

  markAll = () => {
    this.setState(state => ({
      todosList: state.todosList.map((todo) => {
        if (this.checkCompleted(state.todosList)) {
          return {
            ...todo,
            completed: false,
          };
        }

        return {
          ...todo,
          completed: true,
        };
      }),
    }));
  }

  handleClearCompleted = () => {
    this.setState(({ todosList }) => ({
      todosList: todosList.filter(({ completed }) => !completed),
    }));
  }

  changeTodoStatus = (todoId) => {
    this.setState(state => ({
      todosList: state.todosList.map((todo) => {
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

  handlerChangeList = (name) => {
    this.setState({
      currentFilter: name,
    });
  }

  render() {
    const { todosList, currentFilter } = this.state;

    let preparedTodo = todosList;
    let selectAllButton;
    let hideOnStart;
    const hideClearButton = todosList.some(todo => todo.completed === true);

    todosList.length > 0 ? hideOnStart = true : hideOnStart = false;

    if (this.checkCompleted(todosList) && todosList.length > 0) {
      selectAllButton = true;
    } else {
      selectAllButton = false;
    }

    if (currentFilter === FILTERS.active) {
      preparedTodo = preparedTodo.filter(todo => !todo.completed);
    }

    if (currentFilter === FILTERS.completed) {
      preparedTodo = preparedTodo.filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <Header addTodos={this.addTodos} />

        <section className="main">

          <TodoList
            todos={preparedTodo}
            deleteTodo={this.deleteTodo}
            submitEditingTodo={this.submitEditingTodo}
            changeTodoStatus={this.changeTodoStatus}
            markAll={this.markAll}
            selectAllButton={selectAllButton}
            hideOnStart={hideOnStart}
          />
        </section>
        {hideOnStart && (
          <Footer
            todosList={todosList}
            hideClearButton={hideClearButton}
            selectAllButton={selectAllButton}
            currentFilter={currentFilter}
            handlerChangeList={this.handlerChangeList}
            handleClearCompleted={this.handleClearCompleted}
          />
        )}

      </section>
    );
  }
}

export default App;
