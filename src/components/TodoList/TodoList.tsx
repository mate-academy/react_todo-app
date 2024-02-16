import React, { useContext } from 'react';
import { TodoItem } from '../TodoItem';
import { DispatchContext, StateContext } from '../TodoContext';
import { Status } from '../../types/status';
import { Todo } from '../../types/todo';

const getPreparedTodos = (todosList: Todo[], selectedPage: string) => {
  switch (selectedPage) {
    case Status.ACTIVE:
      return todosList.filter(todo => !todo.completed);

    case Status.COMPLETED:
      return todosList.filter(todo => todo.completed);

    default:
      return todosList;
  }
};

export const TodoList: React.FC = () => {
  const dispatch = useContext(DispatchContext);
  const { todos, select } = useContext(StateContext);

  const visibleTodos = getPreparedTodos(todos, select);

  console.log(visibleTodos);

  return (
    <section className="main">
      {!!todos.length && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={() => dispatch({ type: 'CompletedAll' })}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todosList">
        {visibleTodos.map(todo => (
          <TodoItem
            todo={todo}
            key={todo.id}
          />
        ))}
      </ul>
    </section>
  );
};

// (
//   {todos.map(todo => (
//     <li
//       key={`${todo.id}`}
//       className={cn(
//         'toggle-view',
//         { completed: todo.completed },
//       )}
//     >
//       <div className="view">
//         <input
//           type="checkbox"
//           className="toggle"
//           id="toggle-view"
//           onChange={() => finishedTodo(todo.id)}
//         />
//         <label htmlFor="toggle-view">
//           {todo.title}
//         </label>
//         <button
//           type="button"
//           className="destroy"
//           data-cy="deleteTodo"
//           onClick={() => deleteTodo(todo.id)}
//         />
//       </div>
//       <input type="text" className="edit" />
//     </li>
//   ))}
//   <li>
//     <div className="view">
//       <input type="checkbox" className="toggle" id="toggle-view" />
//       <label htmlFor="toggle-view">asdfghj</label>
//       <button type="button" className="destroy" data-cy="deleteTodo" />
//     </div>
//     <input type="text" className="edit" />
//   </li>

//   <li className="completed">
//     <div className="view">
//       <input type="checkbox" className="toggle" id="toggle-completed" />
//       <label htmlFor="toggle-completed">qwertyuio</label>
//       <button type="button" className="destroy" data-cy="deleteTodo" />
//     </div>
//     <input type="text" className="edit" />
//   </li>

//   <li className="editing">
//     <div className="view">
//       <input type="checkbox" className="toggle" id="toggle-editing" />
//       <label htmlFor="toggle-editing">zxcvbnm</label>
//       <button type="button" className="destroy" data-cy="deleteTodo" />
//     </div>
//     <input type="text" className="edit" />
//   </li>

//   <li>
//     <div className="view">
//       <input type="checkbox" className="toggle" id="toggle-view2" />
//       <label htmlFor="toggle-view2">1234567890</label>
//       <button type="button" className="destroy" data-cy="deleteTodo" />
//     </div>
//     <input type="text" className="edit" />
//   </li>
// </ul>)
