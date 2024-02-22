// import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';
// import classNames from 'classnames';
// import { TodoList } from './components/TodoList/TodoList';

// export interface Todo {
//   id: number;
//   title: string;
//   completed: boolean;
// }

// enum filtering {
//   all = 'all',
//   active = 'active',
//   complete = 'complete',
//   clean = 'clear',
// }

// interface Context {
//   data: Todo[] | [];
//   deleteTodo: (id: number) => void;
//   updateCompleteTodo: (id: number) => void;
// }

// export const TodosContext = React.createContext<Context | null>(null);

// export const App: React.FC = () => {
//   const [data, setData] = useState<Todo[] | []>([]);
//   const [query, setQuery] = useState('');
//   const [activeFilter, setActiveFilter] = useState<string>(filtering.all); // Track active filter
//   const itemsLeft = `${data.length - data.filter(elem => elem.completed).length} `;

//   // Function to update the data
//   const deleteTodo = (id: number): void => {
//     setData(cur => cur.filter(elem => elem.id !== id));
//   };

//   const filterData = (action?: string) => {
//     switch (action) {
//       case filtering.active:
//         return data.filter(elem => elem.completed === false);
//       case filtering.complete:
//         return data.filter(elem => elem.completed === true);
//       case filtering.clean:
//         const filteredData = data.filter(elem => elem.completed === false);

//         setData(filteredData);

//         return;
//       case filtering.all:
//         return data;
//       default:
//         return data;
//     }
//   };

//   const updateCompleteTodo = (id: number): void => {
//     setData(prevData =>
//       prevData.map(elem => {
//         if (elem.id === id) {
//           return { ...elem, completed: !elem.completed };
//         }

//         return elem;
//       }),
//     );
//   };

//   const addItem = (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (query.trim() !== '') {
//       setData(cur => [
//         ...cur,
//         {
//           id: +new Date(),
//           title: query,
//           completed: false,
//         },
//       ]);
//       setQuery('');
//     }
//   };

//   const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
//     setQuery(event.target.value);
//   };

//   const handleFilter = (action: string) => {
//     setActiveFilter(action);
//     filterData(action);
//   };

//   const value = useMemo(() => {
//     return {
//       data,
//       deleteTodo,
//       updateCompleteTodo,
//     };
//   }, [data]);

//   // Provide data and updateData function as values to the context
//   return (
//     <TodosContext.Provider value={value}>
//       <div className="todoapp">
//         <header className="header">
//           <h1>todos</h1>

//           <form onSubmit={addItem}>
//             <input
//               type="text"
//               data-cy="createTodo"
//               className="new-todo"
//               placeholder="What needs to be done?"
//               value={query}
//               onChange={handleInput}
//             />
//           </form>
//         </header>

//         {data.length > 0 && (
//           <section className="main">
//             <input
//               type="checkbox"
//               id="toggle-all"
//               className="toggle-all"
//               data-cy="toggleAll"
//             />
//             <label htmlFor="toggle-all">Mark all as complete</label>

//             {data.length > 0 && (
//               <TodoList data={filterData(activeFilter) || []} />
//             )}
//           </section>
//         )}

//         {data.length > 0 && (
//           <footer className="footer">
//             <span className="todo-count" data-cy="todosCounter">
//               {itemsLeft}
//               item left
//             </span>

//             <ul className="filters">
//               <li>
//                 <a
//                   href="#/"
//                   className={classNames({
//                     selected: activeFilter === filtering.all,
//                   })}
//                   onClick={() => handleFilter(filtering.all)}
//                 >
//                   All
//                 </a>
//               </li>

//               <li>
//                 <a
//                   href="#/active"
//                   className={classNames({
//                     selected: activeFilter === filtering.active,
//                   })}
//                   onClick={() => handleFilter(filtering.active)}
//                 >
//                   Active
//                 </a>
//               </li>

//               <li>
//                 <a
//                   href="#/completed"
//                   className={classNames({
//                     selected: activeFilter === filtering.complete,
//                   })}
//                   onClick={() => handleFilter(filtering.complete)}
//                 >
//                   Completed
//                 </a>
//               </li>
//             </ul>

//             <button
//               type="button"
//               className="clear-completed"
//               // style={}
//               onClick={() => handleFilter(filtering.clean)}
//             >
//               Clear completed
//             </button>
//           </footer>
//         )}
//       </div>
//     </TodosContext.Provider>
//   );
// };
