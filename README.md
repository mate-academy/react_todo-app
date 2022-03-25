React ToDo app

Input field creates new todos on submit (Enter). Each item has:
    - `id` - unique identifier
    - `title` - the text of a todo
    - `completed` - current status (`false` by default)
Number of not completed todos in `TodoApp` is shown in the left bottom corner
`TodoItem` component has ability to toggle the `completed` status.
The ability to toggle the completed status of all the todos added
`TodosFilter` component switches between `all`/`active`/`completed` todos
Ability to remove an item added
Ability to `clear completed` removes all completed items from the list.
It remaines visible if there is at least 1 completed item in the list. 

Double click on the TODO title makes it editable
`Enter`  saves changes
`Ecs` cancels editing
Todo title can't be empty!

Used technology stack: React / HTML / CSS
