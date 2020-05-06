import React from 'react';
import PropTypes, { objectOf, shape } from 'prop-types';

class AddForm extends React.Component {
  state = {
    newTodoValue: '',
    errorAddNewTodo: false,
  }

  writeNewTodo = (e) => {
    const { errorAddNewTodo, newTodoValue } = this.state;
    const letter = e.target.value.replace(/^\s+/, '');

    this.setState({ newTodoValue: letter });

    if (newTodoValue.length >= 2 && errorAddNewTodo) {
      this.setState({ errorAddNewTodo: false });
    }
  }

  submitTodo = (e) => {
    const { validateInput } = this.props;
    const { newTodoValue } = this.state;

    e.preventDefault();
    validateInput(newTodoValue);

    if (newTodoValue.length >= 3) {
      this.setState(() => ({
        newTodoValue: '',
      }));
    } else {
      this.setState({ errorAddNewTodo: true });
    }
  }

  render() {
    const { newTodoValue, errorAddNewTodo } = this.state;
    const { todos, selectAllTodo, selectAll } = this.props;

    return (
      <>
        <form
          onSubmit={this.submitTodo}
          className="formAddTodo"
        >
          {todos.length >= 1
            && (
              <button
                type="button"
                className={selectAll
                  ? 'buttonSelectAll act'
                  : 'buttonSelectAll dis'}
                onClick={() => selectAllTodo()}
              >
                ❯
              </button>
            )
          }
          <input
            className={errorAddNewTodo
              ? 'new-todo new-todo__error'
              : 'new-todo'}
            placeholder="What needs to be done?"
            value={newTodoValue}
            onChange={this.writeNewTodo}
          />
        </form>
      </>
    );
  }
}

AddForm.propTypes = {
  validateInput: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf(objectOf(shape({
    value: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
  }))).isRequired,
  selectAllTodo: PropTypes.func.isRequired,
  selectAll: PropTypes.bool.isRequired,
};

export default AddForm;
