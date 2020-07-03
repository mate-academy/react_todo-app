import React from 'react';
import { ShapeTodoList } from './Shapes';
import { Todo } from './Todo';

export const TodoList = ({
  transformedTodo, putChanges, startEditing, allSelected,
  hideActive, hideCompleted, onComplete, deleteTodo, completedTodos, todoList,
}) => {
  const changeTodo = (ev, title, value, bool) => {
    ev.persist();
    if (ev.keyCode === 27) {
      putChanges('cancel');
    } else if (value.trim() === title && (ev.keyCode === 13 || bool)) {
      putChanges('same');
    } else if ((ev.keyCode === 13 || bool)
    && !todoList.includes(value.trim())) {
      if (!value.trim()) {
        putChanges('ignore');
      } else if (value.trim()) {
        const i = todoList.findIndex(todo => todo === title);
        const leftPart = todoList.slice(0, i);
        const rightPart = todoList.slice(i + 1, todoList.length);
        const changedTodo = [...leftPart, value, ...rightPart];
        const completed = { ...completedTodos };
        const state = completedTodos[title];

        delete completed[title];

        putChanges('put', changedTodo, completed, value.trim(), state);
      }
    }
  };

  return (
    <ul className="todo-list">
      {
        todoList.map((todo) => {
          const editedTodo = (todo === transformedTodo)
            ? (
              <input
                onKeyUp={ev => changeTodo(ev, todo, ev.target.value)}
                onBlur={ev => changeTodo(ev, todo, ev.target.value, true)}
                defaultValue={todo}
                type="text"
                className="edition"
                id={`${todo}_edit`}
              />
            )
            : <></>;

          return (
            <div className="wrap_li">
              <Todo
                startEditing={startEditing}
                selected={allSelected}
                hideActive={hideActive}
                hideCompleted={hideCompleted}
                key={todo}
                completed={completedTodos[todo]}
                title={todo}
                onComplete={onComplete}
                deleteTodo={deleteTodo}
                todoList={todoList}
                completedTodos={completedTodos}
              />
              {editedTodo}
            </div>
          );
        })
      }

    </ul>
  );
};

TodoList.propTypes = ShapeTodoList.isRequired;
