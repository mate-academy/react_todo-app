import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import TodoEdit from './TodoEdit';

const TodoList = ({
  todosVisible,
  todos,
  setTodos,
  saveData,
}) => {
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
              <TodoEdit
                todos={todos}
                todo={todo}
                saveData={saveData}
                setTodos={setTodos}
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
