import React from 'react';
import { Todo } from '../../Types/todo';
import { TodoList } from './TodoList';

type Props = {
  todos: Todo[];
  visibleTodos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const Main: React.FC<Props> = ({ todos, visibleTodos, setTodos }) => {
  const allChecked = todos.every(todo => todo.completed);

  const handleSelectAll = () => {
    setTodos(prevTodos =>
      prevTodos.map(todo => ({ ...todo, completed: !allChecked })),
    );
  };

  const handleChange = (toId: number, todoCompleted: boolean): void => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === toId ? { ...todo, completed: !todoCompleted } : todo,
      ),
    );
  };

  return (
    <section className="main">
      {todos.length !== 0 && (
        <>
          <input
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
            data-cy="toggleAll"
            onChange={handleSelectAll}
            checked={allChecked}
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
        </>
      )}

      <ul className="todo-list" data-cy="todosList">
        <TodoList handleChange={handleChange} visibleTodos={visibleTodos} />
      </ul>
    </section>
  );
};
//   {<li>
//   <div className="view">
//     <input type="checkbox" className="toggle" id="toggle-view" />
//     <label htmlFor="toggle-view">asdfghj</label>
//     <button type="button" className="destroy" data-cy="deleteTodo" />
//   </div>
//   <input type="text" className="edit" />
// </li> }

//   {<li className="completed">
//   <div className="view">
//     <input type="checkbox" className="toggle" id="toggle-completed" />
//     <label htmlFor="toggle-completed">qwertyuio</label>
//     <button type="button" className="destroy" data-cy="deleteTodo" />
//   </div>
//   <input type="text" className="edit" />
// </li>}

//   {<li className="editing">
//   <div className="view">
//     <input type="checkbox" className="toggle" id="toggle-editing" />
//     <label htmlFor="toggle-editing">zxcvbnm</label>
//     <button type="button" className="destroy" data-cy="deleteTodo" />
//   </div>
//   <input type="text" className="edit" />
// </li>}

//   {<li>
//   <div className="view">
//     <input type="checkbox" className="toggle" id="toggle-view2" />
//     <label htmlFor="toggle-view2">1234567890</label>
//     <button type="button" className="destroy" data-cy="deleteTodo" />
//   </div>
//   <input type="text" className="edit" />
// </li>}
