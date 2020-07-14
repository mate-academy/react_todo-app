import React from 'react';
import TodoList from './TodoList';
import { MainShape } from '../Shapes';

const Main = (props) => {
  const {
    todos,
    allCompleted,
    onCheck,
    onDelete,
    checkAll,
    todosLength,
  } = props;

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        onChange={checkAll}
        checked={allCompleted}
      />

      { (todosLength > 0) && (
        <label htmlFor="toggle-all">
          { allCompleted ? 'Set all to active' : 'Set all to completed' }
        </label>
      )}

      <TodoList
        todos={todos}
        onCheck={onCheck}
        onDelete={onDelete}
      />
    </section>
  );
};

Main.propTypes = MainShape.isRequired;

export default Main;
