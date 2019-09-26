import React from 'react';
import uuid from 'uuid';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoFilters from './TodoFilters/TodoFilters';

class TodoApp extends React.Component {
  state = {
    todos: [],
    activeFilter: 'all',
  }

  handleSubmitForm = (todo) => {
    const idForTodo = uuid.v4();

    if (todo !== '') {
      this.setState(prevState => ({
        todos: [...prevState.todos, {
          id: idForTodo,
          title: todo,
          checked: false,
        }],
      }));
    }
  }

  handleChecked = (id) => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => (
        todo.id === id
          ? { title: todo.title, checked: !todo.checked, id: todo.id }
          : todo
      )),
    }));
  }

  handleCheckedAll = () => {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => ({
        title: todo.title,
        checked: !prevState.todos.every(item => item.checked),
        id: todo.id,
      })),
    }));
  }

  handleDestroyButton = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id),
    }));
  }

  handleClearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.checked),
    }));
  }

  handleFilterTodos = (props) => {
    this.setState({
      activeFilter: props,
    });
  }

  render() {
    const {
      todos,
      activeFilter,
    } = this.state;

    const filteredTodos = activeFilter === 'active'
      ? todos.filter(todo => !todo.checked)
      : todos.filter(todo => todo.checked);

    return (
      <section className="todoapp">
        <TodoForm onAdd={this.handleSubmitForm} />
        <TodoList
          onDestroy={this.handleDestroyButton}
          onCheckedAll={this.handleCheckedAll}
          onChecked={this.handleChecked}
          todos={activeFilter === 'all' ? todos : filteredTodos}
        />
        <TodoFilters
          onFilterAll={() => this.handleFilterTodos('all')}
          onFilterActive={() => this.handleFilterTodos('active')}
          onFilterComplete={() => this.handleFilterTodos('complete')}
          onClearCompleted={this.handleClearCompleted}
          todos={todos}
        />
      </section>
    );
  }
}

export default TodoApp;
