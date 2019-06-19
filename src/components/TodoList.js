import React, { Component } from 'react';
import TodoListItem from './TodoListItem';

class TodoList extends Component {
  state = {
    length: 0,
    todoList: [],
  };

  componentDidMount() {
    const { todos, filter } = this.props;
    const todoList = this.filterList(todos, filter);
    this.setState({ todoList, length: todoList.length });
  }

  componentDidUpdate(prevState, state) {
    if (prevState.length !== state.length) {
      const { updateLength } = this.props;
      //const { todos, filter } = this.props;
      //const todoList = this.filterList(todos, filter);
      updateLength(state.length);
    }
  }

  filterList = (todos, filter) => {
    let todoList = [];
    switch (filter) {
      case 'active':
        todoList = todos.filter(({ completed }) => !completed);
        break;
      case 'completed':
        todoList = todos.filter(({ completed }) => completed);
        break;
      default:
        todoList = [...todos];
    }
    return todoList;
  };

  render() {
    const { deleteTodo, toggleTodo } = this.props;
    const { todoList } = this.state;
    return (
      <ul className="todo-list">
        {todoList.map(todo => {
          return <TodoListItem todo={todo} key={todo.title} deleteTodo={deleteTodo} toggleTodo={toggleTodo} />;
        })}
      </ul>
    );
  }
}

export default TodoList;
