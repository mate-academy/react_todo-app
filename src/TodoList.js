import React from 'react';
import { ShapeTodoList } from './Shapes';
import { Todo } from './Todo';

export const TodoList = ({
  transformedTodo, putChanges, startEditing, allSelected,
  hideActive, hideCompleted, onComplete, deleteTodo, completedTodos, todoList,
}) => {
  const changeTodo = (code, title, value, bool) => {
    const trimmed = value.trim();

    if (code === 27 || (trimmed === title && (code === 13 || bool))) {
      putChanges('cancel');
    } else if ((code === 13 || bool)
    && !todoList.includes(trimmed)) {
      if (!trimmed) {
        putChanges('cancel');
      } else if (trimmed) {
        const i = todoList.findIndex(todo => todo === title);
        const updatedTodoList = [...todoList];

        updatedTodoList.splice(i, 1, trimmed);
        const completed = { ...completedTodos };
        const state = completedTodos[title];

        delete completed[title];

        putChanges('put', updatedTodoList, completed, value.trim(), state);
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
                ref={input => input && input.focus()}
                onKeyUp={ev => changeTodo(ev.keyCode, todo, ev.target.value)}
                onBlur={ev => changeTodo(
                  ev.keyCode, todo, ev.target.value, true,
                )}
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
