import React from 'react';
import TodoHeader from './components/TodoHeader';
import TodoMain from './components/TodoMain';
import TodoFooter from './components/TodoFooter';

const FILTER_TYPES = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class TodoApp extends React.Component {
  state = {
    todos: [],
    show: FILTER_TYPES.all,
  }

  setFilter = (show) => {
    this.setState({
      show: FILTER_TYPES[show],
    });
  }

  deleteTodo = (id) => {
    this.setState(state => ({
      todos: state.todos.filter(todo => todo.id !== id),
    }));
  }

  fixTodo = (title, id) => {
    if (!title.trim()) {
      this.deleteTodo(id);
    } else {
      this.setState(state => ({
        todos: state.todos.map(todo => (todo.id !== id
          ? todo
          : {
            ...todo,
            title,
          }
        )),
      }));
    }
  }

  isCompleted = (completed, todoId) => {
    this.setState(state => ({
      todos: state.todos.map((currentTodo) => {
        if (currentTodo.id !== todoId) {
          return currentTodo;
        }

        return ({
          ...currentTodo,
          completed,
        });
      }),
    }));
  }

  selectAll = (completed) => {
    this.setState(state => ({
      todos: state.todos.map(todo => ({
        ...todo,
        completed,
      })),
    }));
  }

  addNewTodo = (title) => {
    this.setState(state => ({
      todos: [
        ...state.todos,
        {
          title,
          id: +new Date(),
          completed: false,
        },
      ],
    }));
  }

  clearCompleted = () => {
    this.setState(state => ({
      todos: state.todos.filter(todo => !todo.completed),
    }));
  }

  render() {
    const todosFiltered = (() => {
      switch (this.state.show) {
        case 'active':
          return this.state.todos.filter(todo => !todo.completed);
        case 'completed':
          return this.state.todos.filter(todo => todo.completed);
        default:
          return this.state.todos;
      }
    })();

    return (
      <section className="todoapp">
        <TodoHeader
          addNewTodo={this.addNewTodo}
        />

        <TodoMain
          todos={this.state.todos}
          selectAll={this.selectAll}
          todosFiltered={todosFiltered}
          isCompleted={this.isCompleted}
          deleteTodo={this.deleteTodo}
          fixTodo={this.fixTodo}
        />

        <TodoFooter
          todos={this.state.todos}
          clearCompleted={this.clearCompleted}
          show={this.state.show}
          setFilter={this.setFilter}
        />
      </section>
    );
  }
}

export default TodoApp;
