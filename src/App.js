import React from 'react';
import InputTodo from './Components/InputTodo';
import TodoList from './Components/TodoList';
import Footer from './Components/Footer';

class App extends React.Component {
  state = {
    todos: [],
    filter: '',
  }

  handleAddTodo = todo => (
    this.setState(state => ({
      todos: [...state.todos, {
        title: todo,
        isCompleted: false,
      }],
    }))
  )

  handleChangeTodo = todos => (
    this.setState({ todos })
  )

  setCurrentFilter = filter => (
    this.setState({ filter })
  )

  filterTodo = () => {
    const { todos } = this.state;

    switch (this.state.filter) {
      case 'active':
        return todos.filter(
          elem => (!elem.isCompleted)
        );
      case 'completed':
        return todos.filter(
          elem => (elem.isCompleted)
        );
      default:
        return [...todos];
    }
  }

  render() {
    const todoFilter = this.filterTodo();
    const { todos, filter } = this.state;

    return (
      <section className="todoapp">
        <InputTodo handleTodo={this.handleAddTodo} />
        <TodoList
          todo={todoFilter}
          todoState={todos}
          allCompleted={this.handleChangeTodo}
        />
        {todos.length > 0
          ? (
            <Footer
              todoState={todos}
              todo={todoFilter}
              handleTodo={this.handleChangeTodo}
              setFilter={this.setCurrentFilter}
              selectFilter={filter}
            />
          )
          : ''}
      </section>
    );
  }
}

export default App;
