import React, { useContext, useState } from 'react';
import { Todo } from '../types/Todo';
import classNames from 'classnames';
import { TodosContext } from './TodosContext';

type Props = {
  todo: Todo;
};

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { todos, setTodos } = useContext(TodosContext);
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [newTitle, setNewTitle] = useState(todo.title);

  function handleClickDeleteTodo(TodoId: number) {
    const newTodos = todos.filter(currTodo => currTodo.id !== TodoId);

    setTodos(newTodos);
  }

  const handleEditTodo = (TodoChange: Todo) => {
    let newTodos = todos;

    if (newTitle === TodoChange.title) {
      setEditingTodoId(null);

      return;
    }

    if (newTitle.trim()) {
      newTodos = todos.map(curr => {
        if (curr.id === todo.id) {
          return {
            ...curr,
            title: newTitle,
          };
        }

        return curr;
      });
    } else {
      handleClickDeleteTodo(todo.id);

      return;
    }

    setTodos(newTodos);
    setEditingTodoId(null);
  };

  const handleChangeChecked = (todoChange: Todo) => {
    const newTodos = todos.map(currTodo => {
      if (currTodo.id === todoChange.id) {
        return {
          ...currTodo,
          completed: !todoChange.completed,
        };
      }

      return currTodo;
    });

    setTodos(newTodos);
  };

  const handleDoubleClickEdit = () => {
    console.log(todo.id)
    setEditingTodoId(todo.id);
    setNewTitle(todo.title);
  };

  return (
    <li
      data-id={todo.id}
      className={classNames({
        completed: todo.completed,
        editing: todo.id === editingTodoId,
      })}
      onDoubleClick={handleDoubleClickEdit}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleChangeChecked(todo)}
        />
        <label>{todo.title}</label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => handleClickDeleteTodo(todo.id)}
        />
      </div>
      {todo.id === editingTodoId && (
        <input
          type="text"
          className="edit"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          onBlur={() => handleEditTodo(todo)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              handleEditTodo(todo);
            }

            if (e.key === 'Escape') {
              setEditingTodoId(null);
              setNewTitle(todo.title);
            }
          }}
          autoFocus
        />
      )}
    </li>
  );
};
