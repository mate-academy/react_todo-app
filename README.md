# React ToDo App
**To view a live version click [here](https://dmtrhrytsak.github.io/react_todo-app/)<**

## Requirements
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
1. Save state of the APP to the `localStorage`
    - use `JSON.stringify` before saving and `JSON.parse` on reading
