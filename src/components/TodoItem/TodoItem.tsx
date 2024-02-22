// import React, { useContext } from 'react';
// import classNames from 'classnames';
// import { TodosContext, Todo } from '../../App';

// interface Props {
//   item: Todo;
//   // key: number;
// }

//   const todos = useContext(TodosContext);

// export const TodoItem: React.FC<Props> = ({ item }) => {


//   const handleCompleted = () => {
//     todos?.updateCompleteTodo(item.id);
//   };

//   const handleDeleteItem = () => {
//     todos?.deleteTodo(item.id);
//   };

//   return (
//     <li className={classNames({ completed: item.completed })}>
//       <div className="view">
//         <input
//           type="checkbox"
//           className="toggle"
//           id="toggle-view"
//           onChange={handleCompleted}
//         />
//         <label htmlFor="toggle-view"> {item.title} </label>
//         <button
//           type="button"
//           className="destroy"
//           data-cy="deleteTodo"
//           onClick={handleDeleteItem}
//         />
//       </div>
//       <input type="text" className="edit" />
//     </li>
//   );
// };
