import React, { PropsWithChildren, useContext, useState } from 'react';

import { useProducer, Producer } from '../../hooks/useProducer';

import { Todo, TodoPatchProps } from '../../types';

import * as TodosService from '../../services/todos/TodosService';

type State = {
  todos: Todo[];
};

type Contract = {
  addTodo: Producer<() => void, (title: string) => void>;
  deleteTodo: Producer<() => void, (id: number) => void>;
  updateTodo: (id: number, props: TodoPatchProps) => void;
  clearCompleted: Producer<() => void, () => void>;
};

const StateContext = React.createContext<State | null>(null);
const ContractContext = React.createContext<Contract | null>(null);

const Provider = ({ children }: PropsWithChildren) => {
  const [todos, setTodosState] = useState(TodosService.initStorage());

  function setTodos(value: React.SetStateAction<Todo[]>) {
    setTodosState(prev => {
      const next = typeof value === 'function' ? value(prev) : value;

      TodosService.setTodos(next);

      return next;
    });
  }

  const state: State = {
    todos,
  };

  const contract: Contract = {
    addTodo: useProducer((consumers, title) => {
      const todo: Todo = {
        title,
        id: Number(Date.now()),
        completed: false,
      };

      setTodos(prev => [...prev, todo]);

      for (const consumer of consumers) {
        consumer();
      }
    }),

    deleteTodo: useProducer((consumers, id) => {
      setTodos(prev => prev.filter(todo => todo.id !== id));

      for (const consumer of consumers) {
        consumer();
      }
    }),

    updateTodo: (id, props) => {
      setTodos(prev =>
        prev.map(item => (item.id === id ? { ...item, ...props } : item)),
      );
    },

    clearCompleted: useProducer(consumers => {
      setTodos(prev => prev.filter(({ completed }) => !completed));

      for (const consumer of consumers) {
        consumer();
      }
    }),
  };

  return (
    <StateContext.Provider value={state}>
      <ContractContext.Provider value={contract}>
        {children}
      </ContractContext.Provider>
    </StateContext.Provider>
  );
};

export default {
  Provider,
  useState: () => useContext(StateContext) as State,
  useContract: () => useContext(ContractContext) as Contract,
};
