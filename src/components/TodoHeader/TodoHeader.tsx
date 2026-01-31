import { useContext } from "react";
import { TodoForm } from "../TodoForm";
import { TodosContext } from "../../context/TodosContext";

export const TodoHeader = () => {
  const {todos, toggleAllTodo} = useContext(TodosContext);

  const allCompleted  = todos.length > 0 && todos.every((todo) => todo.completed === true)
    return (
        <header className="todoapp__header">
          {todos.length > 0 && (
            <button
              type="button"
              className={`todoapp__toggle-all ${allCompleted  ? 'active' : ''}`}
              data-cy="ToggleAllButton"
              onClick={toggleAllTodo}
            />
          )}

          <TodoForm/>
        </header>
    )
}