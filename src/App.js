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

  toggleComplete = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  render() {
    return (
      <section className="todoapp">
        <TodoApp
          addNewTodo={this.addNewTodo}
          todos={this.state.todos}
        />
        <TodoList
          todos={this.state.todos}
          toggleComplete={this.toggleComplete}
        />
        <TodosFilters />
      </section>
    );
  }
}

export default App;
