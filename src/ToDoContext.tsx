// eslint-disable
/* eslint-disable */
// eslint-disable
import React, { useReducer } from "react";
import _ from 'lodash';
import { ToDo } from "./types/ToDo";

type Action = { type: 'addPost', payload: string }
            | { type: 'updatePost', payload: ToDo }
            | { type: 'removePost', payload: ToDo }
            | { type: 'completed', payload: number }
            | { type: 'filter', payload: boolean }

interface State {
  list: ToDo[];
}

function newToDo(name: string): ToDo {
  return { id: Date.now(), title: name, completed: false }
}

function toggle(list: ToDo[], id: number): ToDo[] {
  list.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  })
  return list;
}


function update(list: ToDo[], toDo: ToDo): ToDo[] {
  const copyList = [...list];
  const index = copyList.findIndex(todo => todo.id === toDo.id);
  copyList.splice(index, 1, toDo);
  return copyList;
}
function remove(list: ToDo[], toDo: ToDo): ToDo[] {
  const copyList = [...list];
  const index = copyList.findIndex(todo => todo.id === toDo.id);
  copyList.splice(index, 1);
  return copyList;
}
function reducer(state: State, action: Action): State {

  switch (action.type) {
    case 'addPost':
      return {
        ...state,
        list: [...state.list, newToDo(action.payload)]
      }
    case 'updatePost':
      return {
        ...state,
        list: update(state.list, action.payload)
      }
    case 'removePost':
      return {
        ...state,
        list: remove(state.list, action.payload)
      }
    case 'filter':
      return {
        ...state,
        list: state.list.filter(elem => elem.completed === true)
      }
    case 'completed':
      return {
        ...state,
        list: toggle(state.list, action.payload),
      }
    default:
      return state;
  }
}

const initialState: State = {
  list: []
}

export const StateContext = React.createContext(initialState);

export const DispatchContext = React.createContext((_action: Action) => { });

type Props = {
  children: React.ReactNode;
}

export const ToDoProvider: React.FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}
