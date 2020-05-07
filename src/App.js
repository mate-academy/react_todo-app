import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilters } from './components/TodosFilter';
import todos from './todos';

class App extends React.Component {
  state = {
    todos: [...todos],
  }

  addNewTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  };

  render() {
    return (
      <section className="todoapp">
        <TodoApp
          addNewTodo={this.addNewTodo}
          todos={this.state.todos}
        />
        <TodoList todos={this.state.todos} />
        <TodosFilters />
      </section>
    );
  }
}

export default App;
