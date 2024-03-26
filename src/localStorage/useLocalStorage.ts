import React, { Dispatch, useEffect, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

const STORAGE_KEY = 'todos';

const initialValue = () => {
  const storedTodos = localStorage.getItem(STORAGE_KEY);

  return storedTodos ? JSON.parse(storedTodos) : [];
};

export const useLocalStorage = (
  reducer: React.Reducer<Todo[], Action>,
  startValue: Todo[],
): [Todo[], Dispatch<Action>] => {
  const [todos, dispatch] = useReducer(reducer, startValue, initialValue);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  });

  return [todos, dispatch];
};

// Ten fragment kodu definiuje niestandardowy hook o nazwie useLocalStorage, który łączy w sobie funkcjonalność hooka useReducer z możliwościami przechowywania danych w localStorage w celu utrzymywania stanu aplikacji między sesjami.

// Oto jak działa ten hook:

// initialTodos: Funkcja initialTodos jest odpowiedzialna za pobranie danych z localStorage po kluczu STORAGE_KEY (który jest zdefiniowany jako 'todos'). Jeśli w localStorage są zapisane dane, są one parsowane za pomocą JSON.parse i zwracane jako początkowy stan todos. Jeśli danych nie ma, zwracana jest pusta tablica [].

// useLocalStorage: To główna funkcja hooka. Przyjmuje dwa argumenty: reducer, który jest reduktorem (React.Reducer) i startValue, który jest początkowym stanem danych Todo[]. Funkcja ta zwraca parę [todos, dispatch], gdzie todos to aktualny stan aplikacji, a dispatch to funkcja służąca do wysyłania akcji do reduktora.

// useEffect: Ten hook efektu ubocznego reaguje na zmiany w stanie todos. Za każdym razem, gdy todos ulega zmianie, zawartość localStorage jest aktualizowana za pomocą localStorage.setItem, gdzie todos są zapisywane jako ciąg znaków za pomocą JSON.stringify.

// Dzięki temu hookowi useLocalStorage, stan aplikacji (lista zadań todos) jest przechowywany w localStorage, co oznacza, że nawet po odświeżeniu strony lub zamknięciu przeglądarki, dane te pozostaną zachowane. W efekcie, hook ten zapewnia sposób na trwałe przechowywanie danych aplikacji między sesjami użytkownika.
