import React from 'react';
import InputTodo from './Components/InputTodo';
import TodoList from './Components/TodoList';
import Footer from './Components/Footer';

class App extends React.Component {
  state = {
    todo: [],
    filter: '',
    enterTodo: false,
  }

  handleAddTodo = todo => (
    this.setState(state => ({
      todo: [...state.todo, {
        title: todo,
        isCompleted: false,
      }],
      enterTodo: true,
    }))
  )

  handleChangeTodo = todo => (
    this.setState({ todo })
  )

  handleSetFilter = filter => (
    this.setState({ filter })
  )

  filterTodo = () => {
    switch (this.state.filter) {
      case 'Active':
        return this.state.todo.filter(
          elem => (!elem.isCompleted)
        );
      case 'Completed':
        return this.state.todo.filter(
          elem => (elem.isCompleted)
        );
      default:
        return [...this.state.todo];
    }
  }

  render() {
    const todoFilter = this.filterTodo();
    const { enterTodo, todo } = this.state;

    return (
      <section className="todoapp">
        <InputTodo handleTodo={this.handleAddTodo} />
        <TodoList
          todo={todoFilter}
          todoState={todo}
          allCompleted={this.handleChangeTodo}
        />
        {enterTodo && todo.length > 0
          ? (
            <Footer
              todoState={todo}
              todo={todoFilter}
              handleTodo={this.handleChangeTodo}
              setFilter={this.handleSetFilter}
            />
          )
          : ''}
      </section>
    );
  }
}

export default App;
