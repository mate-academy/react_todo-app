import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { TodoItems } from '../TodoItems/TodoItems';
import { Footer } from '../Footer/Footer';

export class TodoApp extends Component {
  state = {
    todosList: this.props.todosList,
    urlPath: '#/',
  }

  onAddTodo = (todo) => {
    this.setState(prevState => ({
      todosList: [...prevState.todosList, todo],
    }));
  }

  onDeleteTodo = (id) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => todo.id !== id),
    }));
  }

  onClearCompletedTodo = () => {
    this.setState(prevState => ({
      todosList: prevState.todosList.filter(todo => !todo.completed),
    }));
  }

  onChangeUrlPath = (href) => {
    this.setState({
      urlPath: href,
    });
  }

  onChangeCompleted = (event) => {
    const { value } = event.target;

    this.setState(prevState => ({
      todosList: prevState.todosList.map((todo) => {
        if (todo.id === value) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }

        return todo;
      }),
    }));
  }

  onDoneAllTodo = () => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo => ({
        ...todo,
        completed: true,
      })),
    }));
  }

  render() {
    const {
      todosList,
      urlPath,
    } = this.state;

    const {
      onAddTodo,
      onChangeCompleted,
      onDeleteTodo,
      onClearCompletedTodo,
      onChangeUrlPath,
      onDoneAllTodo,
    } = this;

    const activeTodoQuantity = todosList.filter(todo => !todo.completed).length;

    let renderedList = todosList;

    if (urlPath === '#/active') {
      renderedList = todosList.filter(todo => !todo.completed);
    } else if (urlPath === '#/completed') {
      renderedList = todosList.filter(todo => todo.completed);
    }

    return (
      <section className="todoapp">
        <Header
          onAddTodo={onAddTodo}
        />

        <TodoItems
          todosList={renderedList}
          onChangeCompleted={onChangeCompleted}
          onDeleteTodo={onDeleteTodo}
          onDoneAllTodo={onDoneAllTodo}
        />

        <Footer
          todoCount={activeTodoQuantity}
          onClearCompletedTodo={onClearCompletedTodo}
          onChangeUrlPath={onChangeUrlPath}
        />
      </section>
    );
  }
}

TodoApp.propTypes = {
  todosList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
};
