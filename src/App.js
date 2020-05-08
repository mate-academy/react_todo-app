import React from 'react';
import { TodoApp } from './components/TodoApp';
import { TodoList } from './components/TodoList';
import { TodosFilters } from './components/TodosFilter';
import todos from './todos';

const filters = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class App extends React.Component {
  state = {
    todos: [...todos],
    selectAll: false,
    currentFilter: filters.all,
  }

  // handleFilterTodos = () => {
  //   const { todos, currentFilter } = this.state;

  //   if (currentFilter === filters.complited) {
  //     return todos.filter(todo => todo.complited);
  //   }

  //   if (currentFilter === filters.active) {
  //     return todos.filter(todo => !todo.complited);
  //   }

  //   return todos;
  // }

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

  activeTodoCounter = () => this.state.todos
    .filter(task => !task.completed).length

  // getFilteredTodos = () => {
  //   const { todoList, activeFilter } = this.state;

  //   if (activeFilter === FILTER_TYPES.completed) {
  //     return todoList.filter(todo => todo.completed);
  //   }

  //   if (activeFilter === FILTER_TYPES.active) {
  //     return todoList.filter(todo => !todo.completed);
  //   }

  //   return todoList;
  // }

  render() {
    return (
      <section className="todoapp">
        <TodoApp
          addNewTodo={this.addNewTodo}
          todos={this.state.todos}
        />
        <TodoList
          todos={this.handleFilterTodos()}
          // todos={this.state.todos}
          selectAll={this.state.selectAll}
          toggleComplete={this.toggleComplete}
          removeTodo={this.removeTodo}
          toggleSelectAll={this.toggleSelectAll}
        />
        <TodosFilters
          todos={this.state.todos}
          currentFilter={this.state.currentFilter}
          activeTodoCounter={this.activeTodoCounter}
        />
      </section>
    );
  }
}

export default App;
