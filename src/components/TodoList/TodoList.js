import React from 'react';
import PropTypes from 'prop-types';
import CN from 'classnames';

export class TodoList extends React.Component {
  state = {
    newValue: '',
    editingTodo: null,
    visibleAll: true,
  };

  changeTitle = (id, title) => {
    this.setState({
      newValue: title,
      editingTodo: id,
    });
  };

  handleChangeTitle = (e) => {
    this.setState({
      newValue: e.target.value,
    });
  };

  handleSubmit = (e) => {
    // const { newValue } = this.state;
    //
    // this.props.newTodo(
    //   this.props.id,
    // );
    // this.resetForm();
  };

  handleVisibleAll = () => {
    this.setState(prev => ({
      visibleAll: !prev.visibleAll,
    }));
  };

  render() {
    const { newValue, editingTodo, visibleAll } = this.state;
    const { visibleTodos, deleteTodo, completedTodo } = this.props;

    return (
      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onClick={this.handleVisibleAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>
        {visibleAll ? (
          <ul className="todo-list">
            {visibleTodos.map(item => (
              <li
                onDoubleClick={() => this.changeTitle(item.id, item.title)}
                key={item.id}
                className={CN({
                  editing: editingTodo === item.id,
                  completed: editingTodo !== item.id && item.completed,
                  '': editingTodo !== item.id && !item.completed,
                })}
              >
                <div className="view">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    className="toggle"
                    id={`todo-${item.id}`}
                    onClick={() => completedTodo(item.id)}
                  />
                  <label htmlFor={`todo-${item.id}`}>
                    {item.title}
                  </label>
                  <button
                    type="button"
                    className="destroy"
                    onClick={() => deleteTodo(item.id)}
                  />
                </div>
                <input
                  value={newValue}
                  onChange={this.handleChangeTitle}
                  type="text"
                  className="edit"
                  onKeyDown={this.handleSubmit}
                />
              </li>
            ))}
          </ul>
        ) : ''}
      </section>
    );
  }
}

TodoList.propTypes = {
  deleteTodo: PropTypes.func.isRequired,
  completedTodo: PropTypes.func.isRequired,
  visibleTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })),
};

TodoList.defaultProps = {
  visibleTodos: [],
};
