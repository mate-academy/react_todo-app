/// <reference types="react-scripts" />

interface User {
  id: number,
  name: string,
  username: string,
  email: string,
  phone: string,
}

interface Todo {
  id: number,
  userId: number,
  title: string,
  completed: boolean,
}

interface TodoToPost {
  userId: number,
  title: string,
  completed: boolean,
}
