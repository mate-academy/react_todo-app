import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  listTodo: Todo,
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos: number[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<number[]>>,
};

export const TodoItem: React.FC<Props> = (props) => {
  const {
    listTodo,
    completedTodos,
    setCompletedTodos,
    todos,
    setTodos,
  } = props;
  const [editingId, setEditingId] = useState<number>();
  const [initialTitle, setInitialTitle] = useState<string[]>([]);

  const handleComplete = (event: React.ChangeEvent<HTMLInputElement>, todoId: number) => {
    if (event.target.checked) {
      setCompletedTodos([...completedTodos, todoId]);
    } else {
      setCompletedTodos(completedTodos.filter(id => id !== todoId));
    }
  };

  const handleChangeInput = (todo: Todo, title: string) => {
    const newTodo = { ...todo, title };

    setTodos([...todos.map((oldTodo) => {
      if (oldTodo.id === newTodo.id) {
        return newTodo;
      }

      return oldTodo;
    })]);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, todo: Todo) => {
    if (initialTitle.length === 0) {
      setInitialTitle([todo.title]);
    }

    handleChangeInput(todo, event.target.value);
  };

  const handleDelete = (todoId: number) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
    setCompletedTodos(completedTodos.filter(id => id !== todoId));
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    setEditingId(0);
    setInitialTitle([]);

    if (event.target.value.length === 0) {
      setTodos(todos.filter(oldTodo => oldTodo.title !== event.target.value));
    }
  };

  const handleKeyDown = (event: any, todo: Todo) => {
    if (event.key === 'Enter') {
      event.target.blur();
    }

    if (event.key === 'Escape') {
      handleChangeInput(todo, initialTitle[0]);
      setInitialTitle([]);
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
        <span className="todo__text" onDoubleClick={() => setEditingId(listTodo.id)}>{listTodo.title}</span>
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
