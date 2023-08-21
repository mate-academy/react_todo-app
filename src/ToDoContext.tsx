/* eslint-disable no-param-reassign */
// eslint-disable-next-line
import _ from 'lodash';
import React, { useEffect, useReducer } from 'react';
import { ToDo } from './types/ToDo';

type Action = { type: 'addPost', payload: string }
| { type: 'updatePost', payload: ToDo }
| { type: 'removePost', payload: ToDo }
| { type: 'completed', payload: number }
| { type: 'sortBy', payload: string }
| { type: 'TOGGLE_ALL', payload: boolean }
| { type: 'removeComplited' };

interface State {
  list: ToDo[];
  sortBy: string;
}

function newToDo(name: string): ToDo {
  return { id: Date.now(), title: name, completed: false };
}

function toggle(list: ToDo[], id: number): ToDo[] {
  const copyList = _.cloneDeep(list);

  copyList.forEach(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  });

  return copyList;
}

function toggleAllHelper(elem: ToDo, trigger: boolean) {
  if (!trigger) {
    elem.completed = true;
  } else {
    elem.completed = false;
  }

  return elem;
}

function update(list: ToDo[], toDo: ToDo): ToDo[] {
  const copyList = _.cloneDeep(list);
  const index = copyList.findIndex(todo => todo.id === toDo.id);

  copyList.splice(index, 1, toDo);

  return copyList;
}

function remove(list: ToDo[], toDo: ToDo): ToDo[] {
  const copyList = _.cloneDeep(list);
  const index = copyList.findIndex(todo => todo.id === toDo.id);

  copyList.splice(index, 1);

  return copyList;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'addPost':
      return {
        ...state,
        list: [...state.list, newToDo(action.payload)],
      };
    case 'updatePost':
      return {
        ...state,
        list: update(state.list, action.payload),
      };
    case 'removePost':
      return {
        ...state,
        list: remove(state.list, action.payload),
      };
    case 'completed':
      return {
        ...state,
        list: toggle(state.list, action.payload),
      };
    case 'sortBy':
      return {
        ...state,
        sortBy: action.payload,
      };
    case 'removeComplited':
      return {
        ...state,
        list: [...state.list.filter(elem => !elem.completed)],
      };
    case 'TOGGLE_ALL':
      return {
        ...state,
        list: [...state.list.map(elem => toggleAllHelper(elem, action.payload)),
        ],
      };
    default:
      return state;
  }
}

const localStorageData = () => {
  const data = localStorage.getItem('list');
  let parsedData: ToDo[] = [];

  if (data !== null) {
    parsedData = JSON.parse(data);
  } else {
    return parsedData;
  }

  return parsedData;
};

const initialState: State = {
  list: localStorageData(),
  sortBy: 'ALL',
};

export const StateContext = React.createContext(initialState);
/* eslint-disable */
export const DispatchContext = React.createContext((_action: Action) => { });
/* eslint-enable */
type Props = {
  children: React.ReactNode;
};

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state.list));
  }, [state.list]);

  const visibleList = () => {
    switch (state.sortBy) {
      case 'ALL':
        return [...state.list];
      case 'COMPLITED':
        return state.list.filter(elem => elem.completed);
      case 'ACTIVE':
        return state.list.filter(elem => !elem.completed);
      default:
        return state.list;
    }
  };

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={{
        list: visibleList(),
        sortBy: state.sortBy,
      }}
      >
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
