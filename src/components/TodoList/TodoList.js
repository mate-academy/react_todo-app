import React from 'react';
import TodoListItem from '../TodoListItem/TodoListItem';
import PropTypes from 'prop-types';

export default class TodoList extends React.Component {
  state = {
    todos: this.props.todos
  }

  filter(filter) {
    switch (filter) {
      case 'active':
        return this.props.todos.filter(todo => !todo.completed);
      case 'done':
        return this.props.todos.filter(todo => todo.completed);
      default:
        return this.props.todos;
    }
  }


  render() {
    const { filter } = this.props;

    let todoList = this.filter(filter).map(todo => {
      return <TodoListItem
        key={('todo_item_' + todo.id)}
        todoListItem={todo}
        deleteTodo={this.props.deleteTodo}
        onClickCompleted={this.props.onClickCompleted}

      />
    })
    return (
      <section className="main">
        <ul className="todo-list">
          {todoList}
        </ul>
      </section>
    )
  }
}



