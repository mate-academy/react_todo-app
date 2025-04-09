import React from "react";
import { useState,useMemo } from "react";
export const TodoContex = React.createContext({
  isInput:'',
  setIsInput: () => { }
});
type Props = {
  children: React.ReactNode;
}



export const TodoProvider: React.FC<Props> = ({children}) => {
  const [isInput, setIsInput] = useState('');

  const value = useMemo(() => ({
    isInput,setIsInput
  }),[isInput])
  return (
    <TodoContex.Provider value={value}>

      {children}
    </TodoContex.Provider>
  )
}
