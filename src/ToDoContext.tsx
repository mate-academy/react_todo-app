/* eslint-disable no-param-reassign */
// eslint-disable-next-line
import _ from 'lodash';
import React, { useEffect, useReducer } from 'react';
import { ToDo } from './types/ToDo';

export enum ACTIONS {
  ADD = 'addPost',
  REMOVE = 'removePost',
  UPDATE = 'updatePost',
  TOGGLE = 'completed',
  SORT = 'sortBy',
  TOGGLE_ALL = 'TOGGLE_ALL',
  CLEAR = 'removeComplited',

}

type Action = { type: ACTIONS.ADD, payload: string }
| { type: ACTIONS.UPDATE, payload: ToDo }
| { type: ACTIONS.REMOVE, payload: ToDo }
| { type: ACTIONS.TOGGLE, payload: number }
| { type: ACTIONS.SORT, payload: string }
| { type: ACTIONS.TOGGLE_ALL, payload: boolean }
| { type: ACTIONS.CLEAR };

interface State {
  list: ToDo[];
  sortBy: string;
}

export enum FILTER {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLITED = 'COMPLITED',
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
    case ACTIONS.ADD:
      return {
        ...state,
        list: [...state.list, newToDo(action.payload)],
      };
    case ACTIONS.UPDATE:
      return {
        ...state,
        list: update(state.list, action.payload),
      };
    case ACTIONS.REMOVE:
      return {
        ...state,
        list: remove(state.list, action.payload),
      };
    case ACTIONS.TOGGLE:
      return {
        ...state,
        list: toggle(state.list, action.payload),
      };
    case ACTIONS.SORT:
      return {
        ...state,
        sortBy: action.payload,
      };
    case ACTIONS.CLEAR:
      return {
        ...state,
        list: [...state.list.filter(elem => !elem.completed)],
      };
    case ACTIONS.TOGGLE_ALL:
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

  if (data) {
    parsedData = JSON.parse(data);
  } else {
    return parsedData;
  }

  return parsedData;
};

const initialState: State = {
  list: localStorageData(),
  sortBy: FILTER.ALL,
};

export const StateContext = React.createContext(initialState);
/* eslint-disable */
export const DispatchContext = React.createContext((_action: Action) => {});
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
      case FILTER.ALL:
        return [...state.list];
      case FILTER.COMPLITED:
        return state.list.filter(elem => elem.completed);
      case FILTER.ACTIVE:
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
