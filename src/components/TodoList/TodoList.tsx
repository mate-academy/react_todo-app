import { useContext } from "react"
import { TodoItem } from "../TodoItem"
import { FilterTodo } from "../../types/Filter"
import { TodosContext } from "../../context/TodosContext"


export const TodoList = () => {
  const {todos, filterTodo} = useContext(TodosContext);
  
  const filteredTodos = todos.filter((todo) => {
    if (filterTodo === FilterTodo.All) return true;
    if (filterTodo === FilterTodo.Active) return !todo.completed;
    return todo.completed;
  })
    return (
        <section className="todoapp__main" data-cy="TodoList">
          
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </section>
    )
}