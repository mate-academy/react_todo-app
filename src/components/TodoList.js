import React from 'react';
import ControlPanel from './ControlPanel';
import TodoItem from './todoItem';

function TodoList({
  list,
  toDelete,
  toggled,
  clearDone,
  toggledAll,
  activeFilter,
  props,
  editText,
  editEnter,
}) {
  return (
    <>

      <section className="main" style={{ display: 'block' }}>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggledAll}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          { list.map(item => (
            <TodoItem
              item={item}
              toDelete={toDelete}
              toggled={toggled}
              editText={editText}
              editEnter={editEnter}
            />
          ))}
        </ul>
      </section>

      {list.length > 0 ? (
        <ControlPanel
          list={list}
          clearDone={clearDone}
          activeFilter={activeFilter}
          props={props}
        />
      ) : ''}
    </>
  );
}

export default TodoList;
