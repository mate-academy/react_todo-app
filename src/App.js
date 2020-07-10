import React from 'react';
import { Header } from './Header';
import { Toggler } from './Toggler';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

class App extends React.Component {
  state = {
    inputValue: '',
    todoList: [],
    completedTodos: {},
    hideCompleted: false,
    hideActive: false,
    allSelected: false,
    selected: 'all',
    transformedTodo: '',
  }

  componentDidMount() {
    const localState = JSON.parse(localStorage.getItem('todoApp'));

    if (localState) {
      this.setState({ ...localState });
    }
  }

  componentDidUpdate() {
    localStorage.setItem('todoApp', JSON.stringify(this.state));
  }

  onComplete = (newStates) => {
    if (Object.values(newStates).every(item => item === true)) {
      this.selectAll();
    } else if (this.state.allSelected) {
      this.setState(() => ({
        allSelected: false,
      }));
    }

    this.setState(() => ({
      completedTodos: { ...newStates },
    }));
  }

  deleteTodo = (listWithoutEl, visibility, completed) => {
    if (Object.values(completed).every(item => item === true)
     && !this.state.allSelected) {
      this.selectAll();
    }

    this.setState(prevState => ({
      todoList: [...listWithoutEl],
      allSelected: (!listWithoutEl.length) ? false : prevState.allSelected,
      completedTodos: { ...completed },
    }));
  }

  addNewTodo = (valid) => {
    if (valid) {
      (this.setState(prevState => ({
        todoList: (!prevState.todoList.includes(prevState.inputValue.trim()))
          ? [...prevState.todoList, prevState.inputValue.trim()]
          : [...prevState.todoList],
        inputValue: '',
        completedTodos: {
          ...prevState.completedTodos,
          [prevState.inputValue]: false,
        },
        allSelected: false,
      })));
    }
  };

  clear = (unfinished, tempStatus) => {
    this.setState(() => ({
      todoList: [...unfinished],
      completedTodos: { ...tempStatus },
      allSelected: false,
    }));
  }

  showActive = () => {
    (this.setState(() => ({
      selected: 'active',
      hideCompleted: true,
      hideActive: false,
    })));
  }

  showAll = () => {
    (this.setState(() => ({
      hideCompleted: false,
      hideActive: false,
      selected: 'all',
    })));
  }

  showCompleted = () => {
    (this.setState(() => ({
      hideCompleted: false,
      hideActive: true,
      selected: 'completed',
    })));
  }

  selectAll = () => {
    const obj = {};

    this.state.todoList.forEach((key) => {
      obj[key] = !this.state.allSelected;
    });

    this.setState(prevState => ({
      allSelected: !prevState.allSelected,
      completedTodos: { ...obj },
    }));
  }

  handleInputChange = (event) => {
    const { value } = event.target;

    (this.setState(() => ({
      inputValue: value,
    })));
  };

  startEditing = (name) => {
    (this.setState(() => ({
      transformedTodo: name,
    })));
  }

  putChanges = (action, changedTodo, completed, value, state) => {
    if (action === 'put') {
      (this.setState(() => ({
        todoList: [...changedTodo],
        completedTodos: {
          ...completed,
          [value]: state,
        },
      })));
    } else {
      (this.setState(prevState => ({
        todoList: prevState.todoList,
        transformedTodo: '',
      })));
    }
  }

  render() {
    const { inputValue, todoList, completedTodos, hideCompleted, hideActive,
      allSelected, selected, transformedTodo } = this.state;

    return (
      <section className="todoapp">
        <Header
          todoList={todoList}
          addTodo={this.addNewTodo}
          handleInputChange={this.handleInputChange}
          value={inputValue}
        />
        <section className="main">
          <Toggler selectAll={this.selectAll} allSelected={allSelected} />
          <TodoList
            todoList={todoList}
            transformedTodo={transformedTodo}
            putChanges={this.putChanges}
            startEditing={this.startEditing}
            allSelected={allSelected}
            hideActive={hideActive}
            hideCompleted={hideCompleted}
            onComplete={this.onComplete}
            deleteTodo={this.deleteTodo}
            completedTodos={completedTodos}
          />
        </section>
        {
          (todoList.length)
            ? (
              <Footer
                todoList={todoList}
                completedTodos={completedTodos}
                selectedButton={selected}
                showAll={this.showAll}
                showActive={this.showActive}
                showCompleted={this.showCompleted}
                clear={this.clear}
              />
            )
            : <></>
        }

      </section>
    );
  }
}

export default App;
