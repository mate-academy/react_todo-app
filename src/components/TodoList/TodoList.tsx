import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FilterBy, setAllFinished, setAllUnfinished } from '../../store';
import { getFilterBy, getTodosSelector } from '../../store/selectors';
import { TodoItem } from '../TodoItem';

export const TodoList: React.FC = () => {
  const [editableTodoId, setEditableTodoId] = useState(0);
  const todos = useSelector(getTodosSelector);
  const filterBy = useSelector(getFilterBy);
  const dispatch = useDispatch();
  const allCompleted = todos.every((todo) => todo.completed === true);

  const toggleAllHandler = () => {
    if (allCompleted) {
      dispatch(setAllUnfinished());
    } else {
      dispatch(setAllFinished());
    }
  };

  const visibleTodos = todos.filter(todo => {
    switch (filterBy) {
      case FilterBy.ALL_TODOS:
        return [...todos];
      case FilterBy.ACTIVE_TODOS:
        return !todo.completed;
      case FilterBy.COMPLETED_TODOS:
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            checked={allCompleted}
            onChange={toggleAllHandler}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todoList">
        {visibleTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            editableTodoId={editableTodoId}
            setEditableTodoId={setEditableTodoId}
          />
        ))}

        {/* <li className="completed">
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-completed" />
            <label htmlFor="toggle-completed">qwertyuio</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" />
        </li>

        <li className="editing">
          <div className="view">
            <input type="checkbox" className="toggle" id="toggle-editing" />
            <label htmlFor="toggle-editing">zxcvbnm</label>
            <button type="button" className="destroy" />
          </div>
          <input type="text" className="edit" id="editTodo" />
        </li> */}
      </ul>
    </section>
  );
};
