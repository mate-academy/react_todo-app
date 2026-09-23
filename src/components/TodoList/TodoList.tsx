import React, { useContext } from 'react';
import { TodoItem } from '../Todo/Todo';
import { StateContext, DispatchContext } from '../../context/Store';
import { Filter } from '../../types/Filter';
import { ActionType } from '../../types/ActionType';

export const TodoList: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const handleUpdate = (title: string, id: number) => {
    dispatch({
      type: ActionType.TODO_EDIT,
      payload: { title: title, id: id },
    })
  }

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {state.todos.map(todo => {
        if (state.filter === Filter.COMPLETED && !todo.completed) {
          return null;
        }

        if (state.filter === Filter.ACTIVE && todo.completed) {
          return null;
        }

        return (
          <TodoItem
            data={todo}
            key={todo.id}
            onUpdate={handleUpdate}
            onToggle={() => dispatch({ type: ActionType.TODO_TOGGLE, payload: todo.id })}
            onDelete={() => dispatch({ type: ActionType.TODO_REMOVE, payload: todo.id })}
          />
        );
      })}
    </section>
  );
};
