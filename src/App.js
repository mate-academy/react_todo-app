import React from 'react';
import ListToDo from './ListToDo';

class App extends React.Component {
  state = {
    todos: [],
    nextId: 1,
    typeOfFilter: 'all',
    isAllButtonActive: true,
    isActiveButtonActive: false,
    isComplitedButtonActiv: false,
    isToggleAll: true,
    FieldValue: '',
  }

  componentDidMount() {
    if (!localStorage.getItem('ToDoAppData')) {
      return;
    }

    const initState = JSON.parse(localStorage.getItem('ToDoAppData'));
    const { todos,
      nextId,
      typeOfFilter,
      isAllButtonActive,
      isActiveButtonActive,
      isComplitedButtonActiv,
      isToggleAll,
      FieldValue } = initState;

    this.setState({
      todos,
      nextId,
      typeOfFilter,
      isAllButtonActive,
      isActiveButtonActive,
      isComplitedButtonActiv,
      isToggleAll,
      FieldValue,
    });
  }

  componentDidUpdate() {
    localStorage.setItem('ToDoAppData', JSON.stringify(this.state));
  }

  handleIsActiveChange = (event) => {
    const id = event.target.getAttribute('list-id');
    const indexOfElement = this.state.todos.findIndex(item => (
      item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].isActive = !tempTodos[indexOfElement].isActive;

      return (
        {
          todos: [...tempTodos],
        }
      );
    });
  }

  addNewToDo = (event) => {
    if (event.key === 'Enter'
      && this.state.FieldValue.trim() !== '') {
      this.setState(prevState => ({
        todos: [...prevState.todos,
          {
            description: prevState.FieldValue,
            isActive: true,
            id: prevState.nextId,
            isEdited: false,
          }],
        nextId: prevState.nextId + 1,
        FieldValue: '',
      }));
    }
  }

  changeAddField = (event) => {
    const { value } = event.target;

    this.setState({ FieldValue: value });
  }

  deleteToDo = (event) => {
    const id = event.target.getAttribute('list-id');
    const indexOfDeletedElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos.splice(indexOfDeletedElement, 1);

      return (
        {
          todos: [...tempTodos],
        }
      );
    });
  }

  clearComplited = () => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(item => item.isActive),
    }));
  }

  setFilterToAll = (event) => {
    this.setState({
      typeOfFilter: 'all',
      isAllButtonActive: true,
      isActiveButtonActive: false,
      isComplitedButtonActiv: false,

    });
  }

  setFilterToActive = (event) => {
    this.setState({
      typeOfFilter: 'active',
      isAllButtonActive: false,
      isActiveButtonActive: true,
      isComplitedButtonActiv: false,

    });
  }

  setFilterToCompleted = (event) => {
    this.setState({
      typeOfFilter: 'completed',
      isAllButtonActive: false,
      isActiveButtonActive: false,
      isComplitedButtonActiv: true,

    });
  }

  handleToggleAllChange = () => {
    this.setState(prevState => ({
      isToggleAll: !prevState.isToggleAll,
      todos: prevState.todos.map((item) => {
        const tempItem = { ...item };

        tempItem.isActive = !prevState.isToggleAll;

        return tempItem;
      }),
    }));
  }

  handleItemDoubleClick = (event) => {
    const id = event.target.getAttribute('list-id');
    const indexOfElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].isEdited = !tempTodos[indexOfElement].isEdited;

      return (
        {
          todos: [...tempTodos],
        }
      );
    });
  }

  handleEditEnter = (event) => {
    if (event.key !== 'Enter' && event.type !== 'blur') {
      return;
    }

    if (event.target.value.trim() === '') {
      return;
    }

    const id = event.target.getAttribute('list-id');
    const indexOfElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].isEdited = false;

      return (
        {
          todos: [...tempTodos],
        }
      );
    });
  }

  handleEditFieldChange = (event) => {
    const id = event.target.getAttribute('list-id');
    const indexOfElement = this
      .state
      .todos
      .findIndex(item => (item.id === parseInt(id, 10)));
    const { value } = event.target;

    this.setState((prevState) => {
      const tempTodos = [...prevState.todos];

      tempTodos[indexOfElement].description = value;

      return (
        {
          todos: [...tempTodos],

        }
      );
    });
  }

  render() {
    let filteredTodos = [...this.state.todos];

    if (this.state.typeOfFilter === 'active') {
      filteredTodos = this.state.todos.filter(item => item.isActive);
    }

    if (this.state.typeOfFilter === 'completed') {
      filteredTodos = this.state.todos.filter(item => !item.isActive);
    }

    const activeItemCount = this
      .state
      .todos
      .filter(item => item.isActive).length;

    const { isActiveButtonActive,
      FieldValue,
      isAllButtonActive,
      isComplitedButtonActiv,
      isToggleAll } = this.state;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onKeyDown={this.addNewToDo}
            onChange={this.changeAddField}
            value={FieldValue}
          />
        </header>

        <section className="main">
          <input
            onChange={this.handleToggleAllChange}
            checked={isToggleAll}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ListToDo
            todos={filteredTodos}
            changeToDo={this.handleChangeToDo}
            deleteToDo={this.deleteToDo}
            handleIsActiveChange={this.handleIsActiveChange}
            handleItemDoubleClick={this.handleItemDoubleClick}
            handleEditEnter={this.handleEditEnter}
            handleEditFieldChange={this.handleEditFieldChange}

          />
        </section>

        <footer className="footer">
          <span className="todo-count">
            {activeItemCount}
            {' '}
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={isAllButtonActive ? 'selected' : ''}
                onClick={this.setFilterToAll}
              >
                All
              </a>
            </li>

            <li>
              <a
                href="#/active"
                className={isActiveButtonActive ? 'selected' : ''}
                onClick={this.setFilterToActive}
              >
                Active
              </a>
            </li>

            <li>
              <a
                href="#/completed"
                className={isComplitedButtonActiv ? 'selected' : ''}
                onClick={this.setFilterToCompleted}
              >
                Completed
              </a>
            </li>
          </ul>

          <button
            type="button"
            className="clear-completed"
            onClick={this.clearComplited}
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
