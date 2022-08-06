/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useContext, useState } from 'react';
import classNames from 'classnames';

import { TodoContext } from '../../TodoContext';

import Todo from '../../types/Todo';

// TODO: implement todo app using context first, then save it on GitHub and try to implement with just props passing
// It is not such a large app to use context, but if someone will check your code - they want me to have as much complicated things
// to use, as possible

/* THOUGHTS
 FOR CONTEXT: to apply edits I firstly need a value in context responsible for keeping only one input editable
 So on submit I need to somehow save changed field. FOR BOTH

 FOR PASSING PROPS: I need to keep an id of editable input in App, or even better - in list.
 To save changes - I can pass function from App, or I can use custom hook in Item, but it makes application having several
 places of truth, I am not mistaken

 FOR BOTH: I also need to change already existing tod0's title, but it is a mutation, so I need to somehow make page reload
 maybe I need to find that tod0, then edit it and after that - concat tods before and after it in one array
 Also, the same thing about completed state. And how to complete all todos.

 !!! CHECK one of Misha's lessons, where he has implemented such edit of tod0 !!!

 */

// IT IS POSSIBLE AND MAY BE BETTER TO USE DISPATCH HOOK HERE

type Props = {
  item: Todo;
};

export const TodoItem: React.FC<Props> = ({ item }) => {
  const { setTodos } = useContext(TodoContext);

  const [isInEditMode, setIsInEditMode] = useState(false);
  const [todoNewTitle, setTodoNewTitle] = useState(item.title);

  const deleteTodo = () => {
    setTodos(prevValue => (
      prevValue.filter(todo => todo.id !== item.id)
    ));
  };

  const updateTodo = (title: string, completed = item.completed) => {
    if (title === '') {
      deleteTodo();

      return;
    }

    setTodos(prevValue => {
      return prevValue.map(todo => {
        if (todo.id !== item.id) {
          return todo;
        }

        return {
          ...todo,
          title,
          completed,
        };
      });
    });
  };

  const applyChanges = () => {
    updateTodo(todoNewTitle);
    setIsInEditMode(false);
    setTodoNewTitle(todoNewTitle);
  };

  const discardChanges = () => {
    setIsInEditMode(false);
    setTodoNewTitle(item.title);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      applyChanges();
    }

    if (event.key === 'Escape') {
      discardChanges();
    }
  };

  return (
    <li
      className={classNames({
        completed: item.completed,
        editing: isInEditMode,
      })}
      onDoubleClick={() => setIsInEditMode(true)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          defaultChecked={item.completed}
          onClick={() => updateTodo(item.title, !item.completed)}
        />

        <label>
          {item.title}
        </label>

        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={deleteTodo}
        />
      </div>

      <input
        type="text"
        className="edit"
        ref={inputRef => inputRef?.focus()}
        value={todoNewTitle}
        onChange={({ target }) => setTodoNewTitle(target.value)}
        onBlur={applyChanges}
        onKeyDown={handleInputKeyDown}
      />
    </li>
  );
};

export default TodoItem;
