import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { OrderItems } from '../types/Type';
import { TodoContext } from '../context/TodosContext';

interface Props {
  todo: OrderItems;
}

export const TodoItem: React.FC<Props> = ({ todo }) => {
  const { orderItems, setOrderItems } = useContext(TodoContext);
  const [query, setQuery] = useState(todo.title);

  const hendlerDestroyOne = (ItemId: number) => {
    const visibleTodos = [...orderItems];

    setOrderItems(visibleTodos.filter(values => values.id !== ItemId));
  };

  const handleClickKeybord = (event: React.KeyboardEvent, ItemID: number) => {
    if (event.key === 'Escape') {
      setOrderItems(
        orderItems.map(prevItem => {
          setQuery(todo.title);

          return {
            ...prevItem,
            editing: false,
          };
        }),
      );
    }

    if (event.key === 'Enter') {
      if (query) {
        setOrderItems(
          orderItems.map(prevItem => {
            if (prevItem.id === ItemID) {
              return {
                ...prevItem,
                title: query,
                editing: false,
              };
            }

            return prevItem;
          }),
        );
      } else {
        hendlerDestroyOne(ItemID);
      }
    }
  };

  const handleChecker = (ItemID: number) => {
    setOrderItems(
      orderItems.map(prevItem => {
        if (prevItem.id === ItemID) {
          return {
            ...prevItem,
            completed: !prevItem.completed,
          };
        }

        return prevItem;
      }),
    );
  };

  const handleQueryEditChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setQuery(event.target.value);
  };

  const handlerDoubleClick = (ItemId: number) => {
    setOrderItems(
      orderItems
        .map(prevItem => {
          setQuery(todo.title);

          return {
            ...prevItem,
            editing: false,
          };
        })
        .map(prevItem => {
          if (prevItem.id === ItemId) {
            return {
              ...prevItem,
              editing: true,
            };
          }

          return prevItem;
        }),
    );
  };

  return (
    <li
      className={classNames({
        completed: todo.completed,
        editing: todo.editing,
      })}
      onKeyUp={event => handleClickKeybord(event, todo.id)}
    >
      <div className="view">
        <input
          type="checkbox"
          className="toggle"
          id="toggle-view"
          checked={todo.completed}
          onChange={() => handleChecker(todo.id)}
        />
        <label
          htmlFor="toggle-view"
          onDoubleClick={() => handlerDoubleClick(todo.id)}
        >
          {todo.title}
        </label>
        <button
          type="button"
          className="destroy"
          data-cy="deleteTodo"
          onClick={() => hendlerDestroyOne(todo.id)}
        />
      </div>
      <input
        type="text"
        className="edit"
        value={query}
        onChange={handleQueryEditChange}
      />
    </li>
  );
};
