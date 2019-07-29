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
    const todo = newTodos.find(currentTodo => currentTodo.id === id);

    if (todo.complete === 'activ') {
      todo.complete = 'completed';
    } else {
      todo.complete = 'activ';
    }

    this.setState({
      todos: [...newTodos],
    });
  }

  changeAllStatus = (toggleAll) => {
    let newTodos = [...this.state.todos];

    if (!toggleAll) {
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

    this.setState({
      todos: [...newTodos],
    });
  }

  handleDestroy = (id) => {
    this.setState(prevState => (
      {
        todos: prevState.todos.filter(todo => todo.id !== id),
      }
    ));
  }

  clearCompleted = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todo.complete === 'activ'),
    }));
  }

  handleFilter = (filter) => {
    this.setState({
      filter,
    });
  }

  render() {
    const { todos, filter } = this.state;
    const countOfActiv = todos.filter(todo => todo.complete === 'activ').length;
    let filtredTodos = [];

    if (filter !== 'all') {
      filtredTodos = todos.filter(todo => todo.complete === filter);
    } else {
      filtredTodos = todos;
    }

    return (
      <section className="todoapp">
        <Header onSubmit={this.handleSubmit} />

        {(todos.length !== 0)
          ? (
            <>
              <TodoList
                filtredTodos={filtredTodos}
                onChangeStatus={this.changeStatus}
                onDestroyTodo={this.handleDestroy}
                toggleAll={countOfActiv === 0 && true}
                onChangeAllStatus={this.changeAllStatus}
              />

              <Footer
                activ={countOfActiv}
                completed={countOfActiv === 0}
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
