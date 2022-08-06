import { Todo } from '../Types/Todo';
import { TodoItem } from './TodoItem';

type Props = {
  todos: Todo[],
  deleteTodo: (todoId: number) => void,
  setTodoCompleted: (todoId: number) => void,
  updateTodo: (todoId: number, title: string) => void,
  toggleAll: () => void,
};

export const TodoList: React.FC<Props> = ({
  todos,
  deleteTodo,
  setTodoCompleted,
  updateTodo,
  toggleAll,
}) => {
  return (
    <section className="main">
      <input
        type="checkbox"
        id="toggle-all"
        className="toggle-all"
        data-cy="toggleAll"
        checked={todos.every(todo => todo.completed)}
        onClick={toggleAll}
      />
      <label htmlFor="toggle-all">Mark all as complete</label>

      <ul className="todo-list" data-cy="todoList">

        {todos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
            deleteTodo={deleteTodo}
            setTodoCompleted={setTodoCompleted}
            updateTodo={updateTodo}
          />
        ))}

      </ul>
    </section>
  );
};

// {/* <li className="completed">
//           <div className="view">
//             <input type="checkbox" className="toggle" id="toggle-completed" />
//             <label htmlFor="toggle-completed">qwertyuio</label>
//             <button type="button" className="destroy" data-cy="deleteTodo" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li className="editing">
//           <div className="view">
//             <input type="checkbox" className="toggle" id="toggle-editing" />
//             <label htmlFor="toggle-editing">zxcvbnm</label>
//             <button type="button" className="destroy" data-cy="deleteTodo" />
//           </div>
//           <input type="text" className="edit" />
//         </li>

//         <li>
//           <div className="view">
//             <input type="checkbox" className="toggle" id="toggle-view2" />
//             <label htmlFor="toggle-view2">1234567890</label>
//             <button type="button" className="destroy" data-cy="deleteTodo" />
//           </div>
//           <input type="text" className="edit" />
//         </li> */}
