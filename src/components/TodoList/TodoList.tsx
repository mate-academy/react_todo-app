import React, { useContext } from 'react';
import { Todo } from '../Todo/Todo';
import { ITodo, StatusType } from '../../types';
import { Section } from '../Section';
import { Toggler } from '../Toggler';
import { DispatchContext, StateContext } from '../Store';

const getVisibleTodos = (todos: ITodo[], filter: StatusType) => {
  switch (filter) {
    case StatusType.Active:
      return todos.filter((todo) => !todo.completed);
    case StatusType.Completed:
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const TodoList: React.FC = () => {
  const { todos, filter } = useContext(StateContext);
  const dispatch = useContext(DispatchContext);

  const visibleTodos = getVisibleTodos(todos, filter);

  const deleteTodo = (todoId: number) => {
    dispatch({ type: 'DELETE_TODO', payload: todoId });
  };

  const toggleTodoStatus = (todoId: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: todoId });
  };

  const editTodo = (todoId: number, newTitle: string) => {
    dispatch({ type: 'EDIT_TODO', payload: { id: todoId, title: newTitle } });
  };

  return (
    <Section>

      <Toggler />

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            toggleTodoStatus={toggleTodoStatus}
          />
        ))}
      </ul>
    </Section>
  );
};
