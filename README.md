# To-Do App
A single-page application that allows users to create and manage a list of tasks.

# [Demo](https://anastasiia-tilikina.github.io/react_todo-app/)

# Technologies used
- React.js
- React Router(v6)
- React TRANSITION GROUP
- TypeScript
- JavaScript
- Fetch, REST API
- Sass (SCSS)
- Bulma
- FontAwesome

# Structure
App is built using functional components and React Hooks.
Each component is abstract and fully reusable.
CSS frameworks Bulma and FontAwesome are used to style the app along with custom SCSS.

# Features & Functionality

## Authentication
- User can register and login to the app
- Users data is fetched from the server
- User can logout from the app
- User's name is displayed in URL
- User is saved in local storage

## ToDos
- ToDos are stored in the server and fetched on login
- User can create a new todo
- User can delete a todo
- User can edit a todo
- User can mark a todo as completed
- User can mark all ToDos as completed
- User can delete all completed ToDos
- All changes are saved in the server
- `Wait` function was used to simulate server requests to demonstrate the loader.
- User can filter ToDos by all, active and completed. Filter is saved in URL
- User can see the number of active ToDos
- In case of server error, user is notified

# Reflections
One of the main goals of this project was to learn how to build a single-page application using React Router.
Another challenge was to learn and understand how to work with REST API, different fetch requests such as GET, POST, PATCH and DELETE and errors handling.

Additionally, usage of React Transition Group gave me an understanding how to animate the appearance and disappearance of React components.

### Inspired by [TodoMVC](https://todomvc.com/examples/vanillajs/)
