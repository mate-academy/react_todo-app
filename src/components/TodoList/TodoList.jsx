import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TodoItem } from '../TodoItem/TodoItem';
import { TodosFilter } from '../TodosFilter/TodosFilter';
import './TodoList.scss';

export const TodoList = ({
  todos,
  handleClearing,
  onDelete,
  onChange,
  handleEditChanges,
}) => {
  const [sortedTodo, setSortedTodo] = useState('All');
  const [notes, setNotes] = useState(todos);

  useEffect(() => {
    if (sortedTodo === 'All') {
      setNotes(todos);
    } else if (sortedTodo === 'Active') {
      setNotes(todos.filter(it => it.completed === false));
    } else {
      setNotes(todos.filter(it => it.completed === true));
    }
  }, [sortedTodo, todos]);

  const sortTodos = (event) => {
    const buttom = event.target;

    if (buttom.name === 'All') {
      setSortedTodo('All');
    }

    if (buttom.name === 'Active') {
      setSortedTodo('Active');
    }

    if (buttom.name === 'Completed') {
      setSortedTodo('Completed');
    }
  };

  return (
    <>
      <ul className="todo-list">
        {notes && notes.map(todo => (
          <TodoItem
            key={todo.id}
            onDelete={onDelete}
            onChange={onChange}
            handleEditChanges={handleEditChanges}
            todo={todo}
          />
        ))}
      </ul>

      {notes.length > 0 && (
        <TodosFilter
          length={todos.length}
          sortTodos={sortTodos}
          clearing={handleClearing}
        />
      )}

    </>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  onDelete: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  handleClearing: PropTypes.func.isRequired,
  handleEditChanges: PropTypes.func.isRequired,
};
