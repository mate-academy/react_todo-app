import React, { useContext } from "react";
import { TodoItem } from "./TodoItem"
import { TodosContext } from "./TodosContext";

export const TodoList: React.FC = () => {
  const { filteredTodos, todos, setTodos } = useContext(TodosContext);

  const toggleTodos = () => {
    let newTodos;

    if (todos.some(item => !item.completed)) {
      newTodos = todos.map(item => {
        if (!item.completed) {
          return {
            ...item,
            completed: true,
          };
        }

        return item;
      });
    } else {
      newTodos = todos.map(item => {
        return {
          ...item,
          completed: false,
        };
      });
    }

    setTodos(newTodos);
  };

  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        onClick={() => toggleTodos()}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todos={todos}
            todo={todo}
            setTodos={setTodos}
          />
        ))}
      </ul>
    </section>
  );
};
