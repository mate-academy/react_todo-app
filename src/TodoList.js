import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

const mark = 'Mark all as complete';

class TodoList extends React.Component {
  state = { editValue: '' }

  editChangeHandler = ({ target }) => {
    this.setState(prevState => ({
      editValue: target.value,
    }));
  }

  render() {
    const { visibleTodos,
      todos,
      selectAllTodos,
      deleteTodo,
      handleKeyPress,
      editTodo,
      toggleTodoCompleted } = this.props;

    return (
      <section className={cn(
        'main',
        { hidden: todos.length === 0 }
      )}
      >
        <input
          type="checkbox"
          onChange={selectAllTodos}
          checked={todos.every(todo => todo.completed)}
          id="toggle-all"
          className="toggle-all"
        />
        <label htmlFor="toggle-all">{mark}</label>
        <ul className="todo-list">
          {visibleTodos.map(todo => (
            <li key={todo.id}>
              <li
                className={cn(
                  {
                    completed: todo.completed,
                    editing: todo.editable,
                  }
                )}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    className="toggle"
                    id={todo.id}
                    checked={todo.completed}
                    onChange={() => toggleTodoCompleted(todo.id)}
                  />
                  <label
                    onDoubleClick={() => editTodo(todo.id)}
                    htmlFor={`todo-${todo.id}`}
                  >
                    {todo.title}
                  </label>
                  <button
                    type="button"
                    onClick={() => deleteTodo(todo.id)}
                    className="destroy"
                  />
                </div>
                {todo.editable && (
                  <input
                    type="text"
                    className="edit"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                    defaultValue={todo.title}
                    onChange={this.editChangeHandler}
                    onKeyDown={
                      e => handleKeyPress(e, todo.id, this.state.editValue)
                    }
                  />
                )
                }
              </li>

            </li>
          ))}
        </ul>
      </section>
    );
  }
}
TodoList.propTypes = {
  selectAllTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleTodoCompleted: PropTypes.func.isRequired,
  editTodo: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  visibleTodos: PropTypes
    .arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })).isRequired,
  todos: PropTypes
    .arrayOf(PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    })).isRequired,
};

export default TodoList;
