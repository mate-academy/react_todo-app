import React, { useContext } from "react"
import { TodosContext } from "./TodosContext"
import { TodosFilter } from "./TodosFilter";

export const TodoFooter: React.FC = () => {
  const { todos, setTodos } = useContext(TodosContext);

  function clearCompleted() {
    const newTodos = todos.filter(item => !item.completed);

    setTodos(newTodos);
  }

  return (
    <footer className="footer">
      <span className="todo-count" data-cy="todosCounter">
        {`${todos.filter(item => !item.completed).length} items left`}
      </span>

      <TodosFilter />

      {todos.some(todo => todo.completed) && (
        <button
          type="button"
          className="clear-completed"
          onClick={clearCompleted}
        >
          Clear completed
        </button>
      )}
    </footer>
  )
}
