/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    activ: 0,
    completed: 0,
    filter: 'all',
    toggleAll: false,
  }

  handleSubmit = (newTodo) => {
    const currentDate = new Date();

    this.setState(prevState => ({
      todos: [
        ...prevState.todos,
        {
          id: currentDate.getTime(),
          text: newTodo,
          complete: 'activ',
        },
      ],
      activ: prevState.activ + 1,
    }));
  }

  changeStatus = (id) => {
    const newTodos = [...this.state.todos];
    const { activ, toggleAll } = this.state;
    let newActiv = 0;
    let newCompleted = 0;
    let newToggleAll = false;
    const index = newTodos.findIndex(todo => todo.id === id);
    const todo = newTodos[index];

    if (todo.complete === 'activ') {
      todo.complete = 'completed';
      newActiv = -1;
      newCompleted = 1;
    } else {
      todo.complete = 'activ';
      newActiv = 1;
      newCompleted = -1;
    }

    newTodos.splice(index, 1, todo);

    if (activ + newActiv === 0 && toggleAll === false) {
      newToggleAll = true;
    }

    this.setState(prevState => ({
      todos: [...newTodos],
      activ: prevState.activ + newActiv,
      completed: prevState.completed + newCompleted,
      toggleAll: newToggleAll,
    }));
  }

  changeAllStatus = () => {
    let newTodos = [...this.state.todos];
    let newActiv = 0;
    let newCompleted = 0;

    if (!this.state.toggleAll) {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'completed',
      }));
      newActiv = 0;
      newCompleted = newTodos.length;
    } else {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'activ',
      }));
      newActiv = newTodos.length;
      newCompleted = 0;
    }

    this.setState(prevState => ({
      todos: [...newTodos],
      activ: newActiv,
      completed: newCompleted,
      toggleAll: !prevState.toggleAll,
    }));
  }

  handleDestroy = (id) => {
    const newTodos = [...this.state.todos];
    const index = newTodos.findIndex(todo => todo.id === id);
    let newActiv = 0;
    let newCompleted = 0;

    if (newTodos[index].complete === 'activ') {
      newActiv = -1;
    } else {
      newCompleted = -1;
    }

    newTodos.splice(index, 1);

    this.setState(prevState => ({
      todos: [...newTodos],
      activ: prevState.activ + newActiv,
      completed: prevState.completed + newCompleted,
    }));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.complete === 'activ'),
      completed: 0,
    }));
  }

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  render() {
    const {
      todos, activ, completed, filter, toggleAll,
    } = this.state;
    const filtredTodos = {
      activ: todos.filter(todo => todo.complete === 'activ'),
      completed: todos.filter(todo => todo.complete === 'completed'),
      all: todos,
    };

    return (
      <section className="todoapp">
        <Header onSubmit={this.handleSubmit} />

        {(todos.length !== 0)
          ? (
            <>
              <TodoList
                filtredTodos={filtredTodos[filter]}
                onChangeStatus={this.changeStatus}
                onDestroyTodo={this.handleDestroy}
                toggleAll={toggleAll}
                onChangeAllStatus={this.changeAllStatus}
              />

              <Footer
                activ={activ}
                completed={completed}
                onFilter={this.handleFilter}
                onClear={this.clearCompleted}
              />
            </>
          )
          : ''
        }
      </section>
    );
  }
}

export default App;
