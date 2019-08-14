import React from 'react';
import propTypes from './propTypes';
import TodoList from './TodoList';

function MainComponent(props) {
  const {
    todoList,
    checkedAll,
    filteredTodoList,
    handleCheckAll,
    deleteTodo,
    handleTodoCheck,
  } = props;

  return (
    <section
      className="main"
      style={
        todoList.length
          ? { display: 'block' }
          : { display: 'none' }
      }
    >
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        checked={checkedAll}
        onChange={handleCheckAll}
      />
      {/* eslint-disable-next-line max-len */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control,jsx-a11y/label-has-for */}
      <label htmlFor="toggle-all">
        Mark all as complete
      </label>

      <ul className="todo-list">
        {
          todoList.length > 0 ? (
            filteredTodoList.map(todo => (
              <li key={todo.id} className="">
                <TodoList
                  deleteTodo={deleteTodo}
                  onCheck={handleTodoCheck}
                  onRemove={deleteTodo}
                  todo={todo}
                  onToggle={handleCheckAll}
                />
              </li>
            ))
          ) : []
        }
      </ul>
    </section>
  );
}

MainComponent.defaultProps = {
  checkedAll: false,
};
MainComponent.propTypes = propTypes.state;

export default MainComponent;
