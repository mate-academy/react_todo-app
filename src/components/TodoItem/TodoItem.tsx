import React from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCompletedTodosAction,
  setEditingIdAction,
  setInitialTitleAction,
  setTodosAction,
} from '../../store/actions';
import { getEditingIdSelector, getInitialTitleSelector } from '../../store/selectors';

type Props = {
  listTodo: Todo,
  todos: Todo[],
  completedTodos: number[],
};

export const TodoItem: React.FC<Props> = (props) => {
  const {
    listTodo,
    completedTodos,
    todos,
  } = props;
  const dispatch = useDispatch();
  const editingId = useSelector(getEditingIdSelector);
  const initialTitle = useSelector(getInitialTitleSelector);

  const handleComplete = (event: React.ChangeEvent<HTMLInputElement>, todoId: number) => {
    if (event.target.checked) {
      dispatch(setCompletedTodosAction([...completedTodos, todoId]));
    } else {
      dispatch(setCompletedTodosAction(completedTodos.filter(id => id !== todoId)));
    }
  };

  const handleChangeInput = (todo: Todo, title: string) => {
    const newTodo = { ...todo, title };

    dispatch(setTodosAction([...todos.map((oldTodo) => {
      if (oldTodo.id === newTodo.id) {
        return newTodo;
      }

      return oldTodo;
    })]));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    if (initialTitle.length === 0) {
      dispatch(setInitialTitleAction([todo.title]));
    }

    handleChangeInput(todo, event.target.value);
  };

  const handleDelete = (todoId: number) => {
    dispatch(setTodosAction(todos.filter(todo => todo.id !== todoId)));
    dispatch(setCompletedTodosAction(completedTodos.filter(id => id !== todoId)));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    dispatch(setEditingIdAction(0));
    dispatch(setInitialTitleAction([]));

    if (event.target.value.length === 0) {
      dispatch(setTodosAction(todos.filter(oldTodo => oldTodo.title !== event.target.value)));
    }
  };

  const handleKeyDown = (event: any, todo: Todo) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }

    if (event.key === 'Escape') {
      handleChangeInput(todo, initialTitle[0]);
      dispatch(setInitialTitleAction([]));
      event.target.blur();
    }
  };

  return (
    <li
      className={classNames(
        'main__item',
        'todo',
        { completed: completedTodos.includes(listTodo.id) },
        { editing: editingId === listTodo.id },
      )}
      key={listTodo.id}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id={`${listTodo.id}`}
          onChange={(event) => handleComplete(event, listTodo.id)}
        />
        <span className="todo__text" onDoubleClick={() => dispatch(setEditingIdAction(listTodo.id))}>{listTodo.title}</span>
        <button type="button" className="destroy" onClick={() => handleDelete(listTodo.id)}>
          <div className="destroy-icon" />
        </button>
      </div>
      <input
        type="text"
        className="todoapp__input edit"
        value={listTodo.title}
        onChange={(event) => handleChange(event, listTodo)}
        onKeyDown={(event) => handleKeyDown(event, listTodo)}
        onBlur={(event) => handleBlur(event)}
      />
    </li>
  );
};
