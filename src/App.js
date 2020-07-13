import React from 'react';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import Content from './Content';

const filters = {
  all: 'all',
  completed: 'completed',
  active: 'active',
};

class App extends React.Component {
  state = {
    todos: [],
    completed: false,
    filter: filters.all,
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  toggleTodoCompleted = (id) => {
    this.setState(({ todos }) => (
      { todos: todos.map(item => (
        item.id === id
          ? {
            ...item, completed: !item.completed,
          } : item)) }));

    this.setState(({ todos }) => (
      { completed: todos.every(item => item.completed) }
    ));
  };

  deleteTodo = (id) => {
    this.setState(({ todos }) => (
      { todos: todos.filter(item => item.id !== id) }
    ));
  };

  markAllTodo = () => {
    this.setState(({ todos, completed }) => ({
      completed: !completed,
      todos: todos
        .map(item => ({
          ...item, completed: !completed,
        })),
    }));
  };

  clearCompleted= () => {
    this.setState(({ todos }) => (
      { todos: todos.filter(item => !item.completed) }
    ));
  };

  setFilter = (filter) => {
    this.setState({ filter: filters[filter] });
  };

  render() {
    const { todos, completed, filter } = this.state;
    const filteredTodos = (filterType) => {
      switch (filterType) {
        case 'active':
          return todos.filter(todo => !todo.completed);
        case 'completed':
          return todos.filter(todo => todo.completed);
        default:
          return todos;
      }
    };

    const visibleTodos = filteredTodos(filter);

    return (
      <section className="todoapp">
        <TodoHeader addTodo={this.addTodo} />
        <Content
          todos={visibleTodos}
          completed={completed}
          onCheck={this.toggleTodoCompleted}
          onDelete={this.deleteTodo}
          completeAll={this.markAllTodo}
          todosLength={todos.length}
        />
        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            currentFilter={filter}
            setFilter={this.setFilter}
            onClearTodos={this.clearCompleted}
          />
        )}
      </section>
    );
  }
}

export default App;
