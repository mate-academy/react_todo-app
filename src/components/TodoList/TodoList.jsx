import React from 'react';
import { Todo } from '../Todo';

export const TodoList = ({ items, renameTitle, deleteTodo, checkTodo }) => (
  <section className="main">
    <input type="checkbox" id="toggle-all" className="toggle-all" />
    <label htmlFor="toggle-all">Mark all as complete</label>

    <ul className="todo-list">
      {items.map(item => 
        <Todo
          key={item.id}
          renameTitle={renameTitle}
          item={item}
          deleteTodo={deleteTodo}
          checkTodo={checkTodo}
        />
        )}
    </ul>
  </section>
)



// <li>
//             <div className="view">
//               <input type="checkbox" className="toggle" />
//               <label>asdfghj</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>

//           <li className="completed">
//             <div className="view">
//               <input type="checkbox" className="toggle" />
//               <label>qwertyuio</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>

//           <li className="editing">
//             <div className="view">
//               <input type="checkbox" className="toggle" />
//               <label>zxcvbnm</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>

//           <li>
//             <div className="view">
//               <input type="checkbox" className="toggle" />
//               <label>1234567890</label>
//               <button type="button" className="destroy" />
//             </div>
//             <input type="text" className="edit" />
//           </li>