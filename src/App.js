import React from 'react';

import Header from './components/Header/Header';
import AddForm from './components/AddForm/AddForm';
import ListTodos from './components/ListTodos/ListTodos';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    activeList: 'all',
    currentId: 1,
    selectAll: false,
  }

  componentDidMount() {
    localStorage.setItem(`${0}`, JSON.stringify({ startItem: 'startItem' }));
    this.valueOfLocalStorage();
    this.filterTodos();
  }

  componentDidUpdate() {
    localStorage.clear();
    this.state.todos.forEach((todo, i) => (
      localStorage.setItem(`${i + 1}`, JSON.stringify({ ...todo }))
    ));
  }

  validateInput = (newTodoValue) => {
    if (newTodoValue.length >= 3) {
      this.addTodo(newTodoValue);
    }
  }

  addTodo = (newTodoValue) => {
    const { currentId } = this.state;
    const newTodo = {};

    newTodo.value = newTodoValue;
    newTodo.id = currentId;
    newTodo.completed = false;
    this.setState(state => ({
      todos: [...state.todos, newTodo],
      currentId: state.currentId + 1,
      selectAll: false,
    }));
  }

  applyFilter = (list) => {
    const { todos } = this.state;

    switch (list) {
      case 'all':
        return todos;

      case 'active':
        return todos.filter(todo => !todo.completed);

      case 'completed':
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  }

  changeStatusComplete = (todoId) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed: todo.id === todoId
          ? !todo.completed
          : todo.completed,
      })),
    }), () => this.filterTodos());
  }

  destroyTodo = (todoId) => {
    const { todos } = this.state;
    const listWithOutDestroyedTodo = todos.filter(todo => todo.id !== todoId);

    localStorage.removeItem(`${todoId}`);

    this.setState(() => ({ todos: listWithOutDestroyedTodo }),
      () => {
        const { todos } = this.state;
        localStorage.clear();
        todos.forEach((todo, i) => (
          localStorage.setItem(`${i + 1}`, JSON.stringify({ ...todo }))
        ));
        if (!todos.length) {
          this.setState(({ currentId: 1 }));
        } else {
          const lastItem = todos.length - 1;
          const newCurrentId = todos[lastItem].id + 1;

          this.setState(({ currentId: newCurrentId }));
        }

        this.filterTodos();
      });
  }

  changePage = (changeTo) => {
    this.setState(({ activeList: changeTo }));
  }

  filterTodos = () => {
    const { todos } = this.state;
    const completedTodo = todos.filter(todo => todo.completed);
    todos.length === completedTodo.length
      ? this.setState(() => ({ selectAll: true }))
      : this.setState(() => ({ selectAll: false }));
  }

  clearCompletedTodo = () => {
    const { todos } = this.state;
    const clearCompleted = todos.filter(todo => !todo.completed);

    this.setState(() => ({
      todos: clearCompleted,
    }));
  }

  selectAllTodo = () => {
    const { selectAll } = this.state;

    this.setState(state => ({
      todos: [...state.todos.map(todo => ({
        ...todo,
        completed: !selectAll,
      }))],
      selectAll: !state.selectAll,
    }), () => this.filterTodos());
  }

  changeTodoValue = (todoId, newValue) => {
    const { todos } = this.state;

    this.setState(() => ({
      todos: todos.map(todo => ({
        ...todo,
        value: todo.id === todoId
          ? newValue
          : todo.value,
      })),
    }), () => {
      localStorage.clear();
      this.state.todos.forEach((todo, i) => (
        localStorage.setItem(`${i + 1}`, JSON.stringify({ ...todo }))
      ));
    });
  }

  valueOfLocalStorage = () => {
    const localTodos = [];

    for (let i = 1; i < localStorage.length + 1; i += 1) {
      const localTodo = JSON.parse(localStorage.getItem(`${i}`));

      if (localTodo) {
        localTodos.push(localTodo);
      }
    }

    if (localTodos.length) {
      const currentTodos = localTodos.map((todo, id) => ({
        ...todo,
        id: id + 1,
      }));
      const nextId = currentTodos[currentTodos.length - 1].id + 1;

      this.setState(() => ({
        todos: currentTodos, currentId: nextId,
      }), () => this.filterTodos());
    }
  }

  render() {
    const {
      activeList, todos, selectAll,
    } = this.state;
    const visibleList = this.applyFilter(activeList);

    return (
      <section className="todoapp" >
        <Header />
        <AddForm
          validateInput={this.validateInput}
          todos={todos}
          selectAllTodo={this.selectAllTodo}
          selectAll={selectAll}
        />
        <ListTodos
          list={visibleList}
          changeStatusComplete={this.changeStatusComplete}
          destroyTodo={this.destroyTodo}
          changeTodoValue={this.changeTodoValue}
        />
        {this.state.todos.length >= 1
          && (
            <Footer
              lengthItemsLeft={todos.filter(todo => !todo.completed).length}
              changePage={this.changePage}
              activeList={activeList}
              clearCompletedTodo={this.clearCompletedTodo}
            />
          )

        }
      </section>
    );
  }
}

export default App;
