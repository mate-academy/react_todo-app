import React, {useState} from 'react';

export const TodoContext = React.createContext({
  todos: [],
  visibleTodos: [],
  setTodo: () => {}
});

  export const useLocalStorage = (key, initialValue) => {
    const [value, setValue] = useState(() => {
      try {
        return JSON.parse(localStorage.getItem(key)) || initialValue;
      } catch {
        return initialValue;
      }
    });

  const save = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, save];
};
// export const TodoProvider = ({children}) => {
//   // const [title, setTitle] = useState('');
//   const [todos, setTodo] = useState(
//     JSON.parse(localStorage.getItem('todos') || [])
//   );
//   const contextValue = {
//     todos,
//     setTodo
//   };
  // const createTodo = (event) => {
  //   event.preventDefault();
  //   const newTodo = {
  //     id: +new Date(),
  //     title: title,
  //     completed: false
  //   };

  //   setTodo([...todos, newTodo]);
  //   localStorage.setItem('todos', JSON.stringify([...todos, newTodo]));
  //   setTitle('');
  // };

//   return (
//     <TodoContext.Provider value={contextValue}>
//       {children}
//     </TodoContext.Provider>
//   )
// }
