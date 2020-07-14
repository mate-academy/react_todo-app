import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import { TodoItems } from '../TodoItems/TodoItems';
import { Footer } from '../Footer/Footer';
import { ShapeTodo } from '../../Shapes/Shapes';

export class TodoApp extends Component {
  state = {
    todosList: this.props.todosList,
    filteredValue: 'All',
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

  onChangeFilterValue = (filteredValue) => {
    this.setState({
      filteredValue,
    });
  }

  onChangeCompleted = (event) => {
    const { value: id } = event.target;

    this.setState(prevState => ({
      todosList: prevState.todosList.map((todo) => {
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

  onChangeUpdate = (value, id) => {
    this.setState(prevState => ({
      todosList: prevState.todosList.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            title: value,
          };
        }

        return todo;
      }),
    }));
  }

  onDoneAllTodo = (event) => {
    const { checked } = event.target;

    this.setState(prevState => ({
      todosList: prevState.todosList.map(todo => ({
        ...todo,
        completed: checked,
      })),
    }));
  }

  render() {
    const {
      todosList,
      filteredValue,
    } = this.state;

    const {
      onAddTodo,
      onChangeCompleted,
      onDeleteTodo,
      onClearCompletedTodo,
      onChangeFilterValue,
      onDoneAllTodo,
      onChangeUpdate,
    } = this;

    const activeTodoQuantity = todosList.filter(todo => !todo.completed).length;

    let renderedList = todosList;

    if (filteredValue === 'Active') {
      renderedList = todosList.filter(todo => !todo.completed);
    } else if (filteredValue === 'Completed') {
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
          onChangeUpdate={onChangeUpdate}
        />

        <Footer
          todoCount={activeTodoQuantity}
          onClearCompletedTodo={onClearCompletedTodo}
          onChangeFilterValue={onChangeFilterValue}
        />
      </section>
    );
  }
}

TodoApp.propTypes = {
  todosList: PropTypes.arrayOf(ShapeTodo).isRequired,
};
