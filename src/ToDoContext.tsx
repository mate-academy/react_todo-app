/* eslint-disable no-param-reassign */
import { cloneDeep } from 'lodash';
import React, { Dispatch, useEffect, useReducer } from 'react';
import { ToDo } from './types/ToDo';

export enum ACTIONS {
  ADD = 'addPost',
  REMOVE = 'removePost',
  UPDATE = 'updatePost',
  TOGGLE = 'completed',
  SORT = 'sortBy',
  TOGGLE_ALL = 'TOGGLE_ALL',
  CLEAR = 'removeComplited',
  SET_LENGTH = 'setLength',
}

type Action = { type: ACTIONS.ADD, payload: string }
| { type: ACTIONS.UPDATE, payload: ToDo }
| { type: ACTIONS.REMOVE, payload: ToDo }
| { type: ACTIONS.TOGGLE, payload: number }
| { type: ACTIONS.SORT, payload: string }
| { type: ACTIONS.TOGGLE_ALL, payload: boolean }
| { type: ACTIONS.CLEAR }
| { type: ACTIONS.SET_LENGTH, payload: number };

type State2 = {
  list: ToDo[];
  sortBy: string;
  totalLength: number,
};

type State = [
  state: State2,
  dispatch: Dispatch<Action>,
];

export enum FILTER {
  ALL = 'ALL',
  ACTIVE = 'ACTIVE',
  COMPLITED = 'COMPLITED',
}

function newToDo(name: string): ToDo {
  return { id: Date.now(), title: name, completed: false };
}

function toggle(list: ToDo[], id: number): ToDo[] {
  const copyList = cloneDeep(list);

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
  const copyList = cloneDeep(list);
  const index = copyList.findIndex(todo => todo.id === toDo.id);

  copyList.splice(index, 1, toDo);

  return copyList;
}

function remove(list: ToDo[], toDo: ToDo): ToDo[] {
  const copyList = cloneDeep(list);
  const index = copyList.findIndex(todo => todo.id === toDo.id);

  copyList.splice(index, 1);

  return copyList;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ACTIONS.ADD:
      return [
        {
          ...state[0],
          list: [...state[0].list, newToDo(action.payload)],
        },
        () => { },
      ];
    case ACTIONS.UPDATE:
      return [
        {
          ...state[0],
          list: update(state[0].list, action.payload),
        },
        () => { },
      ];
    case ACTIONS.REMOVE:
      return [
        {
          ...state[0],
          list: remove(state[0].list, action.payload),
        },
        () => { },
      ];
    case ACTIONS.TOGGLE:
      return [
        {
          ...state[0],
          list: toggle(state[0].list, action.payload),
        },
        () => { },
      ];
    case ACTIONS.SORT:
      return [
        {
          ...state[0],
          sortBy: action.payload,
        },
        () => { },
      ];
    case ACTIONS.CLEAR:
      return [
        {
          ...state[0],
          list: [...state[0].list.filter(elem => !elem.completed)],
        },
        () => { },
      ];
    case ACTIONS.TOGGLE_ALL:
      return [
        {
          ...state[0],
          list: [
            ...state[0].list.map(elem => toggleAllHelper(elem, action.payload)),
          ],
        },
        () => { },
      ];
    case ACTIONS.SET_LENGTH:
      return [
        {
          ...state[0],
          totalLength: action.payload,
        },
        () => { },
      ];
    default:
      return state;
  }
}

export const localStorageData = () => {
  const data = localStorage.getItem('list');
  let parsedData: ToDo[] = [];

  if (data) {
    parsedData = JSON.parse(data);
  } else {
    return parsedData;
  }

  return parsedData;
};

const initialState: State = [
  {
    list: localStorageData(),
    sortBy: FILTER.ALL,
    totalLength: localStorageData().length,
  },
  () => { },
];

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(state[0].list));
    dispatch({ type: ACTIONS.SET_LENGTH, payload: state[0].list.length });
  }, [state[0].list]);

  const visibleList = () => {
    switch (state[0].sortBy) {
      case FILTER.ALL:
        return [...state[0].list];
      case FILTER.COMPLITED:
        return state[0].list.filter(elem => elem.completed);
      case FILTER.ACTIVE:
        return state[0].list.filter(elem => !elem.completed);
      default:
        return state[0].list;
    }
  };

  return (
    <StateContext.Provider value={[{
      list: visibleList(),
      sortBy: state[0].sortBy,
      totalLength: localStorageData().length,
    }, dispatch]}
    >
      {children}
    </StateContext.Provider>
  );
};
