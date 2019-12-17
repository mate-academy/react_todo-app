import React from 'react';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import TodosFilter from './TodosFilter';

class App extends React.Component {
  state ={
    idFiltres: '',
    todosList: [],
    isCompleted: false,
    filtersList: [{
      id: 'filtersAll', title: 'All',
    },
    {
      id: 'filtersActive', title: 'Active',
    },
    {
      id: 'filtersCompleted', title: 'Completed',
    },
    ],
  }

  addNewTodo = (createNewTodo) => {
    this.setState(() => {
      const { todosList } = this.state;
      const todo = {
        complete: false,
        id: +new Date(),
        title: createNewTodo,
      };

      return {
        todosList: [...todosList, todo],
        createNewTodo: '',
      };
    });
  }

  clearCompleted = () => {
    this.setState(state => ({
      todosList: state.todosList.filter(todo => !todo.complete),
    }));
  }

  lengthCompeletedTodos = x => (
    this.state.todosList.filter(todo => todo.complete === x).length
  )

  setIdFiltres = (stateCompleted) => {
    this.setState({ idFiltres: stateCompleted });
  }

  filtresTodos = () => {
    switch (this.state.idFiltres) {
      case 'filtersActive':
        return this.state.todosList.filter(todo => !todo.complete);
      case 'filtersCompleted':
        return this.state.todosList.filter(todo => todo.complete === true);
      default: return this.state.todosList;
    }
  }

  checkboxValue = (event) => {
    this.setState({ isCompleted: event.target.checked });
    this.allSelectTodo(this.state.isCompleted);
  };

  allSelectTodo = (x) => {
    this.setState(state => ({
      todosList: state.todosList.map(todo => (
        {
          ...todo, complete: !x,
        })),
    }));
  }

  changeStateComplete = (todoId) => {
    this.setState(state => ({
      todosList: state.todosList.map((todo) => {
        if (todo.id !== todoId) {
          return todo;
        }

        return {
          ...todo,
          complete: !todo.complete,
        };
      }),
    }));
    setTimeout(this.editAllChecked);
  }

  editAllChecked = () => {
    if (this.state.todosList
      .filter(todo => !todo.complete).length === 0) {
      this.setState({ isCompleted: true });
    }

    if (this.state.todosList
      .filter(todo => !todo.complete).length > 0) {
      this.setState({ isCompleted: false });
    }
  }

  deleteTodo = (i) => {
    this.setState(state => state.todosList.splice(i, 1));
  }

  render() {
    const { todosList,
      isCompleted,
      idFiltres,
      filtersList } = this.state;

    const { changeStateComplete,
      deleteTodo,
      setIdFiltres,
      addNewTodo } = this;

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <TodoInput
            addNewTodo={addNewTodo}
          />
        </header>

        <section
          className="main"
          style={{ display: 'block' }}
        >
          <input
            onChange={this.checkboxValue}
            checked={isCompleted}
            type="checkbox"
            id="toggle-all"
            className="toggle-all"
          />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <TodoList
            filtresTodos={this.filtresTodos()}
            changeStateComplete={changeStateComplete}
            deleteTodo={deleteTodo}
          />
        </section>

        <footer
          className="footer"
          style={{
            display: `${todosList.length > 0 ? 'block' : 'none'}`,
          }}
        >
          <span className="todo-count">
            {this.lengthCompeletedTodos(false)}
            {` items left`}
          </span>
          <TodosFilter
            setIdFiltres={setIdFiltres}
            idFiltres={idFiltres}
            filtersList={filtersList}
          />
          <button
            type="button"
            className="clear-completed"
            style={{
              display: `${this.lengthCompeletedTodos(true) > 0
                ? 'block' : 'none'}`,
            }}
            onClick={() => this.clearCompleted()}
          >
            Clear-completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
