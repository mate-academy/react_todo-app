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
  changeClass,
  props,
}) {
  return list.length > 0 ? (
    <>
      <section className="main" style={{ display: 'block' }}>
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          onChange={toggledAll}
          activeFilter={activeFilter}
        />
        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          { list.map(item => (
            <TodoItem item={item} toDelete={toDelete} toggled={toggled} />
          ))}
        </ul>
      </section>
      <ControlPanel
        list={list}
        clearDone={clearDone}
        activeFilter={activeFilter}
        changeClass={changeClass}
        props={props}
      />
    </>
  ) : '';
}

export default TodoList;
