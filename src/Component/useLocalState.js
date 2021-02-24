// import { useState } from 'react';
//  export function useLocalStorage(key, initialValue) {
//     const [storedValues, setStoredValues] = useState(() => {
//       try {
//         const item = window.localStorage.getItem(key);

//         return item ? JSON.parse(item) : initialValue;
//       } catch (error) {
//         console.log(error);

//         return initialValue;
//       }
//     });

//     const setValue = (value) => {
//       try {
//         const valueToStore
//           = value instanceof Function ? value(storedValues) : value;

//         setStoredValues(valueToStore);

//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     return [storedValues, setValue];
//   }
