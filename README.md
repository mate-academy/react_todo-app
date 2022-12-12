# React ToDo App

This is a todo app that allows a user to add, remove and edit todos, as well as mark one or all of them as complete.

> Here is a demo link to the app:
- [DEMO LINK](https://MeshackDev.github.io/react_todo-app/) and add it to the PR description.

> The `gif` below shows how each future works:
- ![todoapp](./description/todoapp.gif)

> The `gif` below shows how to edit a todo.
- ![todoedit](./description/edittodo.gif)


> The following steps outline how I implemented the ToDo app:

1. Implemented a `TodoApp` component with an input field to create new todos on submit (Enter). Each item has:
    - `id` - unique identifier (`+new Date()`)
    - `title` - the text of a todo
    - `completed` - current status (`false` by default)
1. Shows the number of not completed todos in `TodoApp`;
1. Implemented a `TodoList` component to display a list of todos;
    ```jsx harmony
    <TodoList items={todos} />
    ```
1. Implemented a `TodoItem` component with ability to toggle the `completed` status using a checkbox.
    - added class `completed` if todo is completed;
1. Added the ability to toggle the completed status of all the todos with the `toggleAll` checkbox.
    - `toggleAll` checkbox is active only if all the todos are completed;
    - if you click the checkbox all the items are marked as `completed`/`not completed` depending on `toggleAll` checked;
1. Created a `TodosFilter` component to switch between `All`/`Active`/`Completed` todos.
    - added the `FilterStatus` enum with the required values;
1. Filter links update the URL (`/`, `/active` or `/completed`)
    - correct filter is applied after page reload;
    - used `HashRouter`;
1. Added ability to remove a todo using the `destroy` button (`X`).
1. Added ability to clear completed todos - remove all completed items from the list. The button contains text `Clear completed` in it.
    - It is visible if there is at least 1 completed item in the list.
1. Hid everything except the input to add new todo if there are no todos. But not if todos are just filtered out.
1. Made inline editing for the TODO item
    - double click on the TODO title makes it editable (just added a class `editing` to a `div`)
    - `Enter` saves changes
    - `Ecs` cancels editing
    - Todo title can't be empty! If a user presses `Enter` when the title is empty, this todo is removed.
1. Saved state of the APP to the `localStorage` using the name `todos` for the key.
    - used `JSON.stringify` before saving and `JSON.parse` on reading
