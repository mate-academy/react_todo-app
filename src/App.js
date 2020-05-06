import React from 'react';

import Header from './components/Header/Header';
import AddForm from './components/AddForm/AddForm';
import ListTodos from './components/ListTodos/ListTodos';
import Footer from './components/Footer/Footer';

class App extends React.Component {
  state = {
    todos: [],
    activeTodo: [],
    completedTodo: [],
    activeList: 'all',
    currentId: 1,
    selectAll: false,
  }

  componentDidMount() {
    this.valueOfLocalStorage();
    localStorage.setItem(`${0}`, JSON.stringify({ startItem: 'startItem' }));
  }

  componentDidUpdate() {
    localStorage.clear();
    this.state.todos.forEach((todo, i) => (
      localStorage.setItem(`${i + 1}`, JSON.stringify({ ...todo }))
    ));
  }

  validationInput = (newTodoValue) => {
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
    localStorage.setItem(`${currentId}`, JSON.stringify({ ...newTodo }));

    this.setState(state => ({
      todos: [...state.todos, newTodo],
      activeTodo: [...state.activeTodo, newTodo],
      currentId: state.currentId + 1,
      selectAll: false,
    }));
  }

  choosePage = (list) => {
    const { todos, activeTodo, completedTodo } = this.state;

    switch (list) {
      case 'all':
        return todos;

      case 'active':
        return activeTodo;

      case 'completed':
        return completedTodo;

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
    const destroyedTodo = todos.filter(todo => todo.id !== todoId);

    localStorage.removeItem(`${todoId}`);

    this.setState(() => ({ todos: destroyedTodo }));

    setTimeout(() => {
      localStorage.clear();
      this.state.todos.forEach((todo, i) => (
        localStorage.setItem(`${i + 1}`, JSON.stringify({ ...todo }))
      ));
      if (!this.state.todos.length) {
        this.setState(({ currentId: 1 }));
      } else {
        const lastItem = this.state.todos.length - 1;
        const newCurrentId = this.state.todos[lastItem].id + 1;

        this.setState(({ currentId: newCurrentId }));
      }

      this.filterTodos();
    }, 0);
  }

  changePage = (changeTo) => {
    this.setState(({ activeList: changeTo }));
  }

  filterTodos = () => {
    this.setState(state => ({
      activeTodo: state.todos.filter(todo => !todo.completed),
      completedTodo: state.todos.filter(todo => todo.completed),
    }), () => {
      const { todos, completedTodo } = this.state;

      todos.length === completedTodo.length
        ? this.setState(() => ({ selectAll: true }))
        : this.setState(() => ({ selectAll: false }));
    });
  }

  clearCompletedTodo = () => {
    const { todos } = this.state;
    const clearCompleted = todos.filter(todo => !todo.completed);

    this.setState(() => ({
      todos: clearCompleted,
      completedTodo: [],
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
    }));

    this.filterTodos();
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
    const user = [];

    for (let i = 1; i < localStorage.length + 1; i += 1) {
      const localTodo = JSON.parse(localStorage.getItem(`${i}`));

      if (localTodo) {
        user.push(localTodo);
      }
    }

    if (user.length) {
      const currentTodos = user.map((todo, id) => ({
        ...todo,
        id: id + 1,
      }));
      const nextId = currentTodos[currentTodos.length - 1].id + 1;

      this.setState(() => ({
        todos: currentTodos, currentId: nextId,
      }));
      this.filterTodos();
    }
  }

  render() {
    const {
      activeList, todos, selectAll, activeTodo,
    } = this.state;
    const visibleList = this.choosePage(activeList);

    return (
      <section className="todoapp">
        <Header />
        <AddForm
          validationInput={this.validationInput}
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
              lengthItemsLeft={activeTodo.length}
              changePage={this.changePage}
              todos={todos}
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
