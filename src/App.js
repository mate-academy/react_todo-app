import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilters } from './components/TodosFilter';
import todos from './todos';

class App extends React.Component {
  state = {
    todos: [...todos],
    selectAll: false,
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

  removeTodo = (id) => {
    this.setState(prevState => ({
      todos: [...prevState.todos].filter(todo => id !== todo.id),
    }));
  }

  toggleSelectAll = (selectAll) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        ...todo,
        completed: !selectAll,
      })),
      selectAll: !selectAll,
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
          selectAll={this.state.selectAll}
          toggleComplete={this.toggleComplete}
          removeTodo={this.removeTodo}
          toggleSelectAll={this.toggleSelectAll}
        />
        <TodosFilters />
      </section>
    );
  }
}

export default App;
