/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Header from './components/Header';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

class App extends React.Component {
  state = {
    todos: [],
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
    }));
  }

  changeStatus = (id) => {
    const newTodos = [...this.state.todos];
    const { toggleAll } = this.state;
    let newToggleAll = false;
    const index = newTodos.findIndex(todo => todo.id === id);
    const todo = newTodos[index];

    if (todo.complete === 'activ') {
      todo.complete = 'completed';
    } else {
      todo.complete = 'activ';
    }

    newTodos.splice(index, 1, todo);

    const countOfActiv = newTodos
      .filter(currentTodo => currentTodo.complete === 'activ')
      .length;

    if (countOfActiv === 0 && toggleAll === false) {
      newToggleAll = true;
    }

    this.setState({
      todos: [...newTodos],
      toggleAll: newToggleAll,
    });
  }

  changeAllStatus = () => {
    let newTodos = [...this.state.todos];

    if (!this.state.toggleAll) {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'completed',
      }));
    } else {
      newTodos = newTodos.map(todo => ({
        ...todo,
        complete: 'activ',
      }));
    }

    this.setState(prevState => ({
      todos: [...newTodos],
      toggleAll: !prevState.toggleAll,
    }));
  }

  handleDestroy = (id) => {
    const newTodos = [...this.state.todos];
    const index = newTodos.findIndex(todo => todo.id === id);

    newTodos.splice(index, 1);

    this.setState({
      todos: [...newTodos],
    });
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.complete === 'activ'),
      toggleAll: false,
    }));
  }

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  render() {
    const {
      todos, filter, toggleAll,
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
                activ={filtredTodos.activ.length}
                completed={filtredTodos.completed.length}
                filter={filter}
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
