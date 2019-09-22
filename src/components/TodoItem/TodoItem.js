import React from 'react';
import createClass from 'classnames';

class TodoItem extends React.Component {
  state = {
    isTodoEditing: false,
    inputNewTodoValue: this.props.todo.title,
    editTodoId: null,
  }

  showTodoEditForm = () => {
    this.setState({
      isTodoEditing: true,
    });
  }

  onChangeInputEditTodo = ({ target: { value, dataset: { todoId } } }) => {
    this.setState({
      inputNewTodoValue: value,
      editTodoId: todoId,
    });
  }

  onKeyPressed = (event) => {
    if (event.key === "Escape" || event.key === "Esc") {
      this.editTodo(event);
    }
  }

  editTodo = (event) => {
    event.preventDefault();
    const { inputNewTodoValue, editTodoId } = this.state;

    if (editTodoId) {
      this.props.editTodoInData(editTodoId, inputNewTodoValue);
    }

    this.setState({
      isTodoEditing: false,
      editTodoId: null,
    });
  }

  render() {
    const { todo: { id, title, completed }, deleteTodoFromData, changeTodoCompleteStatus } = this.props;
    const { isTodoEditing, inputNewTodoValue } = this.state;
    const itemClass = createClass({ 'completed': completed });
    console.dir(this.state);

    return (
      <li className={itemClass}>
        <div className="view">
          <input
            type="checkbox"
            className="toggle"
            data-todo-id={`${id}`}
            id={`todo-${id}`}
            checked={completed}
            onChange={changeTodoCompleteStatus}
          />
          {isTodoEditing
            ?
            <form onSubmit={this.editTodo}>
              <input
                type="text"
                className="new-todo"
                data-todo-id={`${id}`}
                value={inputNewTodoValue}
                onChange={this.onChangeInputEditTodo}
                onBlur={this.editTodo}
                onKeyDown={this.onKeyPressed}
                autoFocus
              />
            </form>
            :
            <>
              <label
                htmlFor={`todo-${id}`}
                onClick={(event) => event.preventDefault()}
                onDoubleClick={this.showTodoEditForm}
              >
                {title}
              </label>
              <button type="button" className="destroy" data-todo-id={`${id}`} onClick={deleteTodoFromData} />
            </>
          }
        </div>
      </li>
    );
  }
}

export default TodoItem;
