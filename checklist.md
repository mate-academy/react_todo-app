# Checklist Todo app
#### Basic React Checklist.
1. PropTypes should describe objects and arrays which come in the component.
2. Use destructuring wherever possible. It makes code more readable.
3. Functions should do one thing. Don't make monsters!)
4. Variable names should describe what is stored in them.
5. The functional component should be used if the state doesn't use.
6. Functions names should describe the result, and use verbs for this.
Bad: `newTodo`, `title`
Good `addTodo`, `setTitle`
7. Use `classnames` lib for calculated classes.

#### Task checklist.
1. App.js code should be split into several components like Header, TodoList, Footer.
2. Callbacks that work with the main state should take prepared data instead of all children state.
3. Code should be split to small, reusable components if it possible (FilterList, Filter, TodoList, Todo, NewTodo)
4. ID for new todos should be unique, you can use an internal ID counter for this, and also increment it.
5. “Toggle all” should be active only in case when all todos are completed.
6. If you manually toggle all todos to completed state, “Toggle all” should stay active.
7. "Toggle all" should stay inactive if at least one todo is not completed.
8. NewTodo form shouldn’t create empty Todos.
9. NewTodo form should trim redundant spaces.
10. Do not rely on the unknown string, make constants for this.
Example:
```
const FILTERS = {
  all: ‘all’,
  completed: ‘completed’,
  active: ‘active’,
};
```
11. Footer, TodoList and ToggleAll should be hidden if todos array is empty.

#### Advanced.
1. After editing the todo, empty todo shouldn’t apply to the state.
