import React, {PureComponent} from 'react';
import TodoItem from '../TodoItem/TodoItem';
import NewTodo from '../NewTodo/NewTodo';
import ControlPanel from '../ControlPanel/ControlPanel';

class TodoApp extends PureComponent {
  state = {
    todos: [],
    idCounter: 0,
    title: '',
    activeTab: 'All',
  };

  componentDidMount() {
    const { storageTodos, storageIdCounter } = this.getLocalStorage();

    this.setState({
      todos: storageTodos,
      idCounter: storageIdCounter,
    });
  }

  handleKeyPress = (event) => {
    const { key, target } = event;

    if (key === 'Enter' && this.state.title !== '') {
      target.value = '';
      this.setState((prevState) => {
        const newTodo = {
          id: prevState.idCounter + 1,
          title: prevState.title,
          completed: false,
          editing: false,
        };

        return ({
          ...prevState,
          idCounter: newTodo.id,
          todos: [...prevState.todos, newTodo],
          title: '',
        });
      }, this.setLocalStorage);
    }
  };

  handleNewTodoChange = (event) => {
    this.setState({
      title: event.target.value,
    });
  };

  handleToggleAllChange = (event) => {
    const { target } = event;

    this.setState((prevState) => ({
      ...prevState,
      todos: prevState.todos.map(todo => ({ ...todo, completed: !!target.checked })),
    }), this.setLocalStorage);
  }

  handleTodoCompleteChange = (event) => {
    const todoId = Number(event.target.dataset.id);

    this.setState((prevState) => {
      const newTodoList = [...prevState.todos];
      const todoIndex = newTodoList.findIndex(todo => todo.id === Number(todoId));
      const newTodo = { ...newTodoList[todoIndex] };

      newTodo.completed = !newTodo.completed;
      newTodoList[todoIndex] = newTodo;

      return ({
        ...prevState,
        todos: newTodoList,
      });
    }, this.setLocalStorage);
  };

  handleTodoBtnDestroyClick = (event) => {
    const todoId = Number(event.target.dataset.id);

    this.setState((prevState) => {
      const newTodoList = [...prevState.todos];
      const todoIndex = newTodoList.findIndex(todo => todo.id === Number(todoId));

      newTodoList.splice(todoIndex, 1);

      return ({
        ...prevState,
        todos: newTodoList,
      });
    }, this.setLocalStorage);
  };

  getFiltredTodos = (filterName, todos) => {
    let newFilteredTodos = null;

    if (filterName === 'All') {
      newFilteredTodos = [...todos];
    } else if (filterName === 'Active') {
      newFilteredTodos = [...todos.filter(todo => !todo.completed)];
    } else if (filterName === 'Completed') {
      newFilteredTodos = [...todos.filter(todo => todo.completed)];
    }

    return newFilteredTodos;
  };

  handleTabListClick = (event) => {
    const { textContent } = event.target;

    if (textContent === 'All' || textContent === 'Active' || textContent === 'Completed') {
      const newActiveTab = textContent;
      const tabList = [...event.currentTarget.children];

      tabList.forEach((tab) => {
        tab.children[0].className = tab.textContent === textContent ? 'selected' : '';
      });
      this.setState({
        activeTab: newActiveTab,
      });
    }
  };

  handleClearCompletedClick = (event) => {
    this.setState((prevState) => {
      const newTodosList = [...prevState.todos.filter(todo => !todo.completed)];

      return ({
        ...prevState,
        todos: newTodosList,
      });
    }, this.setLocalStorage);
  };

  handleTodoItemDoubleClick = (event) => {
    const { currentTarget } = event;
    const id = Number(currentTarget.dataset.id);

    currentTarget.className = 'editing';

    this.setState((prevState) => {
      const todoIndex = prevState.todos.findIndex(todo => todo.id === id);
      const newTodos = [...prevState.todos];

      newTodos[todoIndex] = { ...newTodos[todoIndex], editing: true }

      return ({
        ...prevState,
        todos: newTodos,
      });
    }, this.setLocalStorage);
  };

  handleEditInpuPressKey = (event) => {
    const { key, target } = event;
    const liElem = target.parentElement;

    if (key === 'Enter') {
      this.setState((prevState) => {
        const todoIndex = prevState.todos.findIndex(todo => todo.id === Number(target.dataset.id));
        const newTodoList = [...prevState.todos];

        newTodoList[todoIndex] = { ...prevState.todos[todoIndex], title: target.value, editing: false };
        liElem.className = newTodoList[todoIndex].completed ? 'completed' : '';

        return ({
          todos: newTodoList,
        });
      }, this.setLocalStorage);
    }
  };

  setLocalStorage = () => {
    localStorage.setItem('todos', JSON.stringify(this.state.todos));
    localStorage.setItem('idCounter', JSON.stringify(this.state.idCounter));
  }

  getLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    const idCounter = JSON.parse(localStorage.getItem('idCounter'));

    return ({
      storageTodos: todos ? todos : [],
      storageIdCounter: idCounter ? idCounter : 0,
    });
  }

  render() {
    const filteredTodos = this.getFiltredTodos(this.state.activeTab, this.state.todos);
    const isCompletedSomething = this.getFiltredTodos('Completed', this.state.todos);

    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>

          <NewTodo
            onChange={this.handleNewTodoChange}
            onKeyPress={this.handleKeyPress}
          />
        </header>

        <section className="main" style={{ display: 'block' }}>
          <input type="checkbox" id="toggle-all" className="toggle-all" onChange={this.handleToggleAllChange} />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todoItem={todo}
                checkBoxChange={this.handleTodoCompleteChange}
                btnDestroyClick={this.handleTodoBtnDestroyClick}
                onDoubleClick={this.handleTodoItemDoubleClick}
                editInputPressKey={this.handleEditInpuPressKey}
              />
            ))}
          </ul>
        </section>
        <ControlPanel
          todosCount={this.state.todos.length}
          isCompletedSomething={isCompletedSomething}
          tabListClick={this.handleTabListClick}
          clearCompleted={this.handleClearCompletedClick}
        />
      </section>
    );
  }
}

TodoApp.propTypes = {};

export default TodoApp;
