# React - People table
- Replace `<your_account>` with your Github username in the
  [DEMO LINK](https://mykhailoivchenko.github.io/react_todo-app/)
- Follow the [React task guideline](https://github.com/mate-academy/react_task-guideline#react-tasks-guideline)

## If you don't use **Typescript**
1. Rename `.tsx` files to `.jsx`
1. use `eslint-config-react` in `.eslintrs.js` 

## Advanced tasks
Using code from previous task implement next tasks:

1. Implement `PersonName` component rendering the name as a link to a person using its `slug` property
    ```
    /people/carolus-haverbeke-1832
    ```
    - It should be used for `name`, `mother` and `father` columns
    - Use `CSS` `color: rgb(0, 71, 171)` for male name text and  and `color: rgb(255, 0, 0)` for female.
    - If mother or father were not found in the array by their name show just a name (black, bold) instead of `PersonName` component
1. Highlight the `PersonRow` mentioned in the URL with some background-color
    - Highlight nobody if the `slug` in the URL is not found among the people

### Filtering and sorting
1. Add an `<input>` with `data-cy="filterInput"` attribut to filter people by `name`, `motherName` and `fatherName`
    - it should update the URL with `?query=car` where `car` is a string entered by the user
    - Read the `query` from the URL and set its value to the input when the page is loaded
1. `PeoplePage` should read the `query` from the URL and filter people accordingly
    - check if the `query` matches the `name`, `motherName` or `fatherName`
1. Implement the sorting by `name`, `sex`, `born` and `died` by clicking on the cell containing column title
    - Highlight the column with the *
    - Add `?sortBy=born` param to the URL
    - Sort the people by selected column
    - If the page is loaded with `sortBy` it should be applied (column is highilghted and people are sorted)
    - If the `sortBy` value is not valid don't highlight any column and don't sort people

## Advanced sorting and filtering
1. Sort should work together with filtering
1. The `query` and `sortBy` should stay in the URL when you select a user (keep `location.search` on navigation)
1. Implement the ability to sort people in both directions `?sortOrder=asc` or `desc`
    - add [Sort both icon](public/images/sort_both.png) to show that column allows sorting
    - The first click sorts `ascending` (A-Z) the second sorts `descending` (Z-A)
    - add `sort_ask` or `sort_desc` icons accordingly to the applied sorting
1. Update the `query` in the URL with `debounce` of 500ms

## (* OPTIONAL) Adding a person
1. (* OPTIONAL) Create a `NewPerson` component with a form to add new people and show it above the table
    - all the fields should be required for now
    - `sex` should be chosen among 2 options (radio buttons)
    - `mother` and `father` are selects with all the `women` and `men` from the table accordingly
1. (* OPTIONAL) Create an `Add person` button navigating to `/people/new`
    - the `NewPerson` should appear instead of a button
    - When the person is added you should navigate back to the `/people` page
1. (* OPTIONAL) Add data validations:
    - `name` should contain only letters and spaces
    - `born` and `died` are valid years between `1400` and the current year
    - `died` should be disabled if `born` is empty
    - `died - born` should be >= 0 and < 150
    - make `mother` and `father` field optional
    - update the list of `mothers` and `fathers` according to the entered `born` year (they must be alive)
    (selects should be empty and disabled before the born year was entered)
