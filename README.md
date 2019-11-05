# React ToDo App
- [DEMO LINK](https://volodymyr-roiuk.github.io/react_todo-app/)

## Tasks
1. Implement `TodoApp` component with an input field to create new todos on submit (Enter). Each item should have:
  - `title` - the text of todo
  - `id` - unique identifier
  - `completed` - current status (`false` by default)
1. Show the number of not completed todos in `TodoApp`
1. Implement `TodoList` component to display a list of todos ({ id, title, completed })
    ```jsx harmony
    <TodoList items={todos} />
    ```
1. Implement `TodoItem` component with ability to toggle the `complete` status.
1. Add ability to toggle the completed status of all the todos.
1. Create `TodosFilter` component to switch between `all`/`active`/`comleted` todos
1. Add ability to remove an item.
1. Add ability to clear completed items from the list
1. (*) Make inline editing for the TODO item (double click on the TODO item makes it editable)
![todoedit](./description/edittodo.gif)
1. (*) Save state of the APP to local storage

## Workflow
- Fork the repository with task
- Clone forked repository 
    ```bash
    git clone git@github.com:<user_name>/<task_repository>.git
    ```
- Run `npm install` to install dependencies.
- Then develop

## Development mode 
- Run `npm start` to start development server on `http://localhost:3000`
    When you run server the command line window will no longer be available for 
    writing commands until you stop server (`ctrl + c`). All other commands you 
    need to run in new command line window.
- Follow [HTML, CSS styleguide](https://mate-academy.github.io/style-guides/htmlcss.html)
- Follow [the simplified JS styleguide](https://mate-academy.github.io/style-guides/javascript-standard-modified)
- run `npm run lint` to check code style
- When you finished add correct `homepage` to `package.json` and run `npm run deploy` 
- Add links to your demo in readme.md.
  - `[DEMO LINK](https://<your_account>.github.io/<repo_name>/)` - this will be a 
  link to your index.html
- Commit and push all recent changes.
- Create `Pull Request` from forked repo `(<branch_name>)` to original repo 
(`master`).
- Add a link at `PR` to Google Spreadsheets.


## Project structure
- `src/` - directory for css, js, image, fonts files
- `build/` - directory for built pages

You should be writing code in `src/` directory.
