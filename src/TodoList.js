import React from 'react';
import { ShapeTodoList } from './Shapes';
import { Todo } from './Todo';

export const TodoList = ({
  transformedTodo, putChanges, startEditing, allSelected,
  hideActive, hideCompleted, onComplete, deleteTodo, completedTodos, todoList,
}) => {
  const changeTodo = (event, title, bool) => {
    const code = event.keyCode;
    const { value } = event.target;
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

        putChanges('put', updatedTodoList, completed, trimmed, state);
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
                onKeyUp={event => changeTodo(event, todo)}
                onBlur={event => changeTodo(event, todo, true)}
                defaultValue={todo}
                type="text"
                className="edition"
                id={`${todo}_edit`}
              />
            )
            : <></>;

          return (
            <div className="wrap_li" key={todo}>
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
