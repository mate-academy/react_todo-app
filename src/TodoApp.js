import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import TodoForm from './TodoForm/TodoForm';
import TodoList from './TodoList/TodoList';
import TodoFilter from './TodoFilter/TodoFilter';

class TodoApp extends React.Component {
  state = {
    todoList: [],
    todoID: Math.ceil(Math.random() * 1e8),
  };

  componentDidMount() {
    const initialState = JSON.parse(localStorage.getItem('state'));

    if (initialState) {
      this.setState({ todoList: initialState.todoList });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  handleAddTodo = (newTodo) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList, newTodo],
      todoID: Math.ceil(Math.random() * 1e8),
    }));
  };

  handleDeleteTodo = (id) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList].filter(todo => todo.id !== +id),
    }));
  };

  handleEditTodo = (id, newTitle) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList].map(todo => ({
        ...todo,
        title: todo.id === id ? newTitle : todo.title,
      })),
    }));
  };

  handleCompleteTodo = (id) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList].map(todo => ({
        ...todo,
        completed: todo.id === id ? !todo.completed : todo.completed,
      })),
    }));
  };

  handleFilterTodo = (filterValue) => {
    this.setState({ filter: filterValue });
  };

  toggleAllTodo = ({ target }) => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList].map(todo => ({
        ...todo, completed: !!target.checked,
      })),
    }));
  };

  deleteAllCompleted = () => {
    this.setState(prevState => ({
      todoList: [...prevState.todoList].filter(todo => !todo.completed),
    }));
  };

  getFilteredTodos = (todoList, filter) => {
    switch (filter) {
      case 'active':
        return todoList.filter(todo => !todo.completed);
      case 'completed':
        return todoList.filter(todo => todo.completed);
      default:
        return todoList;
    }
  };

  render() {
    const { todoList, filter, todoID } = this.state;
    const countCompleted = todoList.filter(todo => !todo.completed).length;
    const filteredTodoList = filter
      ? this.getFilteredTodos(todoList, filter)
      : todoList;

    return (
      <section className="todoapp">
        <Header>
          <TodoForm todoID={todoID} onAdd={this.handleAddTodo} />
        </Header>

        <Main onMarkAllTodo={this.toggleAllTodo}>
          <TodoList
            todos={filteredTodoList}
            onComplete={this.handleCompleteTodo}
            onDelete={this.handleDeleteTodo}
            onEdit={this.handleEditTodo}
          />
        </Main>

        <Footer counter={countCompleted} onDeleteAll={this.deleteAllCompleted}>
          <TodoFilter onFilterClick={this.handleFilterTodo} />
        </Footer>
      </section>
    );
  }
}

export default TodoApp;
