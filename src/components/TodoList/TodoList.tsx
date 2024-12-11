/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useEffect, useRef, useState } from 'react';
import { TodosContext } from '../../context';
import { Filter, Names } from '../../enums/Enums';
import { myLocalStorage } from '../../localStorage';
import { TodoItem } from '../TodoItem/TodoItem';

export const TodoList: React.FC = () => {
  const { todos, filter, setTodos, toogleHandler, deleteHandler } =
    useContext(TodosContext);

  const [editableTodoById, setEditableTodoById] = useState(0);
  const [editableTitle, setEditableTitle] = useState('');
  const todoInputRef = useRef<HTMLInputElement | null>(null);

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case Filter.active:
        return !todo.completed;
      case Filter.completed:
        return todo.completed;
      default:
        return todo;
    }
  });

  const editHandler = (id: number, value: string) => {
    setEditableTodoById(id);
    setEditableTitle(value);
  };

  const onSubmit = (event: React.FormEvent, id: number) => {
    event.preventDefault();
    const trimmedTitle = editableTitle.trim();

    if (trimmedTitle.length > 0) {
      const updatedTodos = todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, title: trimmedTitle };
        }

        return todo;
      });

      setTodos(updatedTodos);
      myLocalStorage.setItem(Names.todos, JSON.stringify(updatedTodos));
    } else {
      deleteHandler([id]);
    }

    setEditableTodoById(0);
    setEditableTitle('');
  };

  const onKeyUpHandler = (key: React.KeyboardEvent<HTMLElement>) => {
    if (key.code === 'Escape') {
      setEditableTodoById(0);
      setEditableTitle('');
    }
  };

  useEffect(() => {
    todoInputRef.current?.focus();
  }, [editableTodoById]);

  return (
    <section
      className="todoapp__main"
      data-cy="TodoList"
      onKeyUp={event => onKeyUpHandler(event)}
    >
      {filteredTodos.map(todo => {
        const { id, title } = todo;
        const isTodoChecked = todo.completed;

        return (
          <TodoItem
            key={id}
            id={id}
            title={title}
            isTodoChecked={isTodoChecked}
            editableTitle={editableTitle}
            editableTodoById={editableTodoById}
            todoInputRef={todoInputRef}
            setEditableTitle={setEditableTitle}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
            toogleHandler={toogleHandler}
            onSubmit={onSubmit}
          />
        );
      })}
    </section>
  );
};
