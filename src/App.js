import React from 'react';
import TodoApp from './TodoApp';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state = {
    todos: [],
    todoFilter: 'All',
    toggleAll: true,
  }

  addTodo = (todo) => {
    this.setState(state => ({
      todos: [...state.todos, todo],
    }));
  }

  doneTask = (id) => {
    this.setState(state => ({
      todos: state.todos.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }

        return item;
      }),
    }));
  }

  handlFilter = (string) => {
    const str = string;

    this.setState(() => ({
      todoFilter: str,
    }));
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(item => item.id !== id),
    }));
  }

  deleteCompleted = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(item => !item.completed),
    }));
  }

  markAll = () => {
    this.setState(state => ({
      todos: state.todos.map(item => ({
        ...item,
        completed: state.toggleAll,
      })),
      toggleAll: !state.toggleAll,
    }));
  }

  render() {
    let todos = [];

    if (this.state.todoFilter === 'All') {
      todos = [...this.state.todos];
    } else if (this.state.todoFilter === 'Active') {
      todos = this.state.todos.filter(item => !item.completed);
    } else if (this.state.todoFilter === 'Completed') {
      todos = this.state.todos.filter(item => item.completed);
    }

    return (
      <section className="todoapp">
        <TodoApp
          addTodo={this.addTodo}
        />

        <section className="main">
          {todos
            && (
              <TodoList
                items={todos}
                doneTask={this.doneTask}
                deleteTodo={this.deleteTodo}
                markAll={this.markAll}
              />
            )}
        </section>
        {this.state.todos.filter(item => item).length >= 1 ? (
          <TodosFilter
            item={todos.filter(item => !item.completed).length}
            completed={todos.filter(item => item.completed).length}
            handlFilter={this.handlFilter}
            filter={this.state.todoFilter}
            deleteCompleted={this.deleteCompleted}
          />
        ) : ''}

      </section>
    );
  }
}

export default App;
