import React, { useState } from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({
  todosVisible,
  todos,
  setTodos,
  saveData,
}) => {
  const [todosBeforeEdit, setTodosBeforeEdit] = useState([]);

  const onDelete = (todoId) => {
    setTodos(todos.filter(todo => todo.id !== todoId));
    saveData(todos.filter(todo => todo.id !== todoId));
  };

  const onComplete = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          completed: !todo.completed,
        };
      }

      return todo;
    });

    setTodos(newTodos);
    saveData(newTodos);
  };

  const onEdit = (event, todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          title: event.target.value,
        };
      }

      return todo;
    });

    setTodos(newTodos);
    saveData(newTodos);
  };

  const onActiveEditTodo = (todoId) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        return {
          ...todo,
          toggle: false,
        };
      }

      return todo;
    });

    setTodos(newTodos);
    saveData(newTodos);
  };

  const handleUpdatedDone = (event, todoId) => {
    if (event.key === 'Enter') {
      const newTodos = todos.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            toggle: true,
          };
        }

        return todo;
      });

      setTodos(newTodos);
      saveData(newTodos);
    } else if (event.key === 'Escape') {
      const newTodos = todosBeforeEdit.map((todo) => {
        if (todo.id === todoId) {
          return {
            ...todo,
            toggle: true,
          };
        }

        return todo;
      });

      setTodos(newTodos);
      saveData(newTodos);
    }
  };

  return (
    <ul className="todo-list">
      {todosVisible.map(todo => (
        todo.toggle
          ? (
            <li
              className={todo.completed ? 'completed' : null}
              key={todo.id}
            >
              <TodoItem
                todo={todo}
                onComplete={onComplete}
                onActiveEditTodo={onActiveEditTodo}
                onDelete={onDelete}
              />
            </li>
          ) : (
            <li className="editing" key={todo.id}>
              <input
                type="text"
                className="edit"
                value={todo.title}
                onChange={(event) => {
                  setTodosBeforeEdit(todosVisible);
                  onEdit(event, todo.id);
                }}
                onKeyDown={event => (
                  handleUpdatedDone(event, todo.id)
                )}
              />
            </li>
          )
      ))}
    </ul>
  );
};

TodoList.propTypes = {
  todosVisible: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired).isRequired,
  setTodos: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
};

export default TodoList;
