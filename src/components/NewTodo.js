import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addTodo } from '../redux/actions';

const NewTodo = ({ addTodo: addNewTodo }) => {
  const [title, setTitle] = useState('');

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (title.trim() !== '') {
          addNewTodo({
            title,
            id: +new Date(),
            completed: false,
          });
          setTitle('');
        }
      }}
    >
      <input
        onChange={(event) => {
          setTitle(event.target.value);
        }}
        value={title}
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
      />
    </form>
  );
};

NewTodo.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default connect(null, { addTodo })(NewTodo);
