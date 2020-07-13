import React from 'react';
import { Header } from './Header';
import { TodoList } from './TodoList';
import { Filters } from './Filters';

export class TodoApp extends React.Component {
  state = {
    todos: [],
    todosOnView: '',
    isAllTodoCompleted: false,
  };

  componentDidMount() {
    const todos = JSON.parse(localStorage.getItem('TodoList')) || [];

    this.setState({
      todos,
    });
  }

  componentDidUpdate() {
    const { todos } = this.state;

    localStorage.setItem('TodoList', JSON.stringify(todos));
  }

  handleTodoEdit = (id, value) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            value,
          };
        }

        return todo;
      }),
    }));
  }

  clearCompletedTodos = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(
        ({ isCompleted }) => isCompleted === false,
      ),
    }));
  }

  todoFilterByFilterName = (filterName) => {
    const { todos, isAllTodoCompleted } = this.state;

    if (isAllTodoCompleted) {
      return todos.map(todo => ({
        ...todo,
        isCompleted: true,
      }));
    }

    if (filterName === 'All') {
      return todos;
    }

    if (filterName === 'Active') {
      return todos.filter(({ isCompleted }) => isCompleted === false);
    }

    if (filterName === 'Completed') {
      return todos.filter(({ isCompleted }) => isCompleted === true);
    }

    return todos;
  }

  handleActiveFilter = (name) => {
    this.setState({
      todosOnView: name,
    });
  }

  handleNewToDo = (todo) => {
    this.setState(prevState => ({
      todos: [
        todo,
        ...prevState.todos,
      ],
    }));
  }

  handleIsCompletedTodo = (taskId) => {
    this.setState(prevState => ({
      todos: prevState.todos.map((todo) => {
        if (todo.id !== taskId) {
          return todo;
        }

        return {
          ...todo,
          isCompleted: !todo.isCompleted,
        };
      }),
    }));
  }

  handleDestroy = (taskId) => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(({ id }) => id !== taskId),
    }));
  }

  handleIsAllTodoCompleted = () => {
    this.setState(prevState => ({
      isAllTodoCompleted: !prevState.isAllTodoCompleted,
    }));
  }

  render() {
    const { handleNewToDo,
      handleIsCompletedTodo,
      handleDestroy,
      handleActiveFilter,
      todoFilterByFilterName,
      handleIsAllTodoCompleted,
      clearCompletedTodos, handleTodoEdit } = this;
    const { todosOnView, todos } = this.state;
    const tasks = todoFilterByFilterName(todosOnView);
    const UnCompletedTodosLeft = todos.filter(
      ({ isCompleted }) => isCompleted === false,
    ).length;

    return (
      <section className="todoapp">
        <Header
          addTodo={handleNewToDo}
          onClick={handleIsAllTodoCompleted}
        />

        <section className="main">
          <TodoList
            items={tasks}
            changeCompleteness={handleIsCompletedTodo}
            destroyTodo={handleDestroy}
            handleTodoEdit={handleTodoEdit}
          />
        </section>

        {!!UnCompletedTodosLeft && (
          <footer className="footer">
            <span className="todo-count">
              {`${UnCompletedTodosLeft} items left`}
            </span>

            <Filters selectedFilter={handleActiveFilter} />

            <button
              type="button"
              className="clear-completed"
              onClick={clearCompletedTodos}
            >
              Clear completed
            </button>
          </footer>
        )}
      </section>
    );
  }
}
