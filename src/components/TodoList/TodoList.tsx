import React, { useContext } from 'react';
import { TodoItem } from '../Todo/Todo';
import { StateContext, DispatchContext } from '../../context/Store';
import { Filter } from '../../types/Filter';

export const TodoList: React.FC = () => {
  const state = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

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
            onUpdate={(title: string) =>
              dispatch({
                type: 'TODO_EDIT',
                payload: { title: title, id: todo.id },
              })
            }
            onToggle={() => dispatch({ type: 'TODO_TOGGLE', payload: todo.id })}
            onDelete={() => dispatch({ type: 'TODO_REMOVE', payload: todo.id })}
          />
        );
      })}
    </section>
  );
};
