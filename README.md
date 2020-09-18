# React ToDo App
- Replace `<your_account>` with your Github username in the [DEMO LINK](https://martakupka.github.io/react_todo-app/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## Description
Implement simple [TODO app](http://todomvc.com/examples/vanillajs/) working as described below.

> If you are not sure about how a feature should work just open the real TodoApp and look how it works there

![todoapp](./description/todoapp.gif)

## Tasks
1. Implement `TodoApp` component with an input field to create new todos on submit (Enter). Each item should have:
    - `id` - unique identifier (`+new Date()` is good enough)
    - `title` - the text of a todo
    - `completed` - current status (`false` by default)
1. Show the number of not completed todos in `TodoApp`
1. Implement `TodoList` component to display a list of todos
    ```jsx harmony
    <TodoList items={todos} />
    ```
1. Implement `TodoItem` component with ability to toggle the `completed` status.
    - move the `li` tag inside the `TodoItem`
    - add class `completed` if todo is completed
1. Add ability to toggle the completed status of all the todos.
    - `toggleAll` checkbox is active only if all the todos are completed
    - if you click the checkbox all the items should be marked as `comlpeted`/`not completed`  depending on `toggleAll` status
1. Create `TodosFilter` component to switch between `all`/`active`/`completed` todos (add it to the `App`)
    - Use constants instead of just strings (for example `FILTERS.all`)
1. Add ability to remove an item.
1. Add ability to `clear completed` - remove all completed items from the list.
    - It should be visible if there is at least 1 completed item in the list.
1. Hide everything except the input to add new todo if there are no todos. But not if todos are just filtered out.
1. Make inline editing for the TODO item
    - double click on the TODO title makes it editable (just add a class `editing` to a `li`)
    - DON'T add `htmlFor` to the label!!!
    - `Enter` saves changes
    - `Ecs` cancels editing
    - Todo title can't be empty!
    - (*) save changes `onBlur`
1. Save state of the APP to the `localStorage` ([Required theory](https://javascript.info/localstorage))
    - use `JSON.stringify` before saving and `JSON.parse` on reading

![todoedit](./description/edittodo.gif)

## (*) Advanced tasks (Optional)
Implement saving the todos in [the API](https://mate-academy.github.io/fe-students-api/).

**BEFORE you started:**
1. Create a user by sending a POST request to the `/users`.
1. Save the `userId` in your code and use it for all the future request where it is required

**Tasks**
1. Load a user from `/users/:userId` and show your name on the page
1. Load all the todos from `/todos` and filter them by `userId` to show only your todos in the App
1. Save new todos by sending POST request to `/todos` (don't forget to add `userId`)
    - use `JSON.stringify` when sending a `body`
    - Think what to do in case of a server error (at least notify the user)
1. Delete the todo by sending DELETE to `/todos/:todoId`
1. Toggle completed status or rename the todo by sending `PATCH` to the `/todos/:todoId`
    - you can send only changed fields (`completed` of `title`)
1. Implement `toggleAll` functionality (try to send as few requests as possible)
1. Implement `clear completed` sending as few requests as possible

##  If you want to implement styles yourself
- Font: 'helvetica neue'
- Font sizes to use: 100px, 24px, 14px
- implement arrow by rotating '❯' symbol
- Use '✕' symbol to remove TODO item on hover
- [checked](./public/icons/checked.svg)
- [unchecked](./public/icons/unchecked.svg)
