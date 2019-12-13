import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Todo from './Todo';

class TodoList extends React.Component {
  state = {
    selectToEditId: null,
  };

  selectToEdit = (id) => {
    this.setState({
      selectToEditId: id,
    });
  };

  render() {
    const { todos, deleteTodo, checkTodo, editTodoTitle } = this.props;

    return (
      <ul className={cn('todo-list')}>
        {todos.map(todo => (
          <Todo
            key={todo.id}
            todo={todo}
            deleteTodo={deleteTodo}
            checkTodo={checkTodo}
            editTodoTitle={editTodoTitle}
            selectToEdit={this.selectToEdit}
            canEdit={this.state.selectToEditId === todo.id}
          />
        ))}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteTodo: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
  editTodoTitle: PropTypes.func.isRequired,
};

export default TodoList;
