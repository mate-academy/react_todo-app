import React, { useMemo } from 'react';

import './TodoMain.scss';

import { useParams } from 'react-router-dom';
import classNames from 'classnames';
import { TodoList } from '../TodoList';
import {
  todoPageSelector,
  updateTodo,
} from '../../features/TodoPage/todoPageSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import TodoStatus from '../../enums/TodoStatus';

const TodoMain: React.FC = () => {
  const { status } = useParams();

  const dispatch = useAppDispatch();
  const { todos } = useAppSelector(todoPageSelector);

  const completedTodosAmount = useMemo(() => {
    return todos.reduce((sum, curr) => (
      curr.completed ? sum + 1 : sum
    ), 0);
  }, [todos]);
  const isAllCompleted = completedTodosAmount === todos.length;

  const handleCompletedTodosSelector = () => {
    todos.forEach(todo => {
      if (todo.completed === !isAllCompleted) {
        return;
      }

      dispatch(updateTodo({
        id: todo.id,
        completed: !isAllCompleted,
      }));
    });
  };

  const prepareTodos = () => {
    switch (status) {
      case TodoStatus.Active: {
        return todos.filter(todo => !todo.completed);
      }

      case TodoStatus.Completed: {
        return todos.filter(todo => todo.completed);
      }

      default:
        return todos;
    }
  };

  const preparedTodos = prepareTodos();

  return (
    <section className="TodoMain">
      <input
        type="checkbox"
        id="toggle-all"
        className="TodoMain-ToggleAll"
        checked={isAllCompleted}
        onChange={handleCompletedTodosSelector}
        data-cy="toggleAll"
      />

      <label
        htmlFor="toggle-all"
        className={classNames({
          'TodoMain-Label': true,
          'TodoMain-Label_allChecked': isAllCompleted,
        })}
      >
        Mark all as complete
      </label>

      <TodoList todos={preparedTodos} />
    </section>
  );
};

export default TodoMain;
