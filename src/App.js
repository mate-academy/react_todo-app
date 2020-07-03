import React from 'react';
import { Header } from './Header';
import { Toggler } from './Toggler';
import { TodoList } from './TodoList';
import { Footer } from './Footer';

class App extends React.Component {
  state = {
    inputValue: '',
    todoList: [],
    visibleFooter: false,
    completedTodos: {},
    hideCompleted: false,
    hideActive: false,
    allSelected: false,
    selected: 'all',
    transformedTodo: '',
  }

  /// change completed
  onComplete = (completed, state) => {
    const newStates = {
      ...this.state.completedTodos,
      [completed]: state,
    };

    if (Object.values(newStates).every(item => item === true)) {
      this.selectAll();
    } else if (this.state.allSelected) {
      this.setState(() => ({
        allSelected: false,
      }));
    }

    this.setState(prevState => ({
      completedTodos: {
        ...prevState.completedTodos,
        [completed]: state,
      },
    }));
  }

  /// add and delete todos
  deleteTodo = (listWithoutEl, visibility, completed) => {
    this.setState(prevState => ({
      todoList: [...listWithoutEl],
      visibleFooter: visibility,
      allSelected: (!listWithoutEl.length) ? false : prevState.allSelected,
      completedTodos: { ...completed },
    }));
  }

  addNewTodo = (ev) => {
    if (ev.keyCode === 13
      && !this.state.todoList.includes(this.state.inputValue.trim())
      && this.state.inputValue.trim().length) {
      (this.setState(prevState => ({
        todoList: (!prevState.todoList.includes(prevState.inputValue.trim()))
          ? [...prevState.todoList, prevState.inputValue.trim()]
          : [...prevState.todoList],
        inputValue: '',
        editorsId: {
          ...prevState.editorsId,
          [prevState.inputValue]: prevState.inputValue,
        },
        visibleFooter: true,
        completedTodos: {
          ...prevState.completedTodos,
          [prevState.inputValue]: false,
        },
        allSelected: false,
      })));
    }
  };

  /// buttons clear, show all, show completed, show active
  clear = (unfinished, tempStatus, visibility) => {
    this.setState(() => ({
      todoList: [...unfinished],
      completedTodos: { ...tempStatus },
      visibleFooter: visibility,
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

  handleInputChange = (ev) => {
    ev.persist();
    (this.setState(() => ({
      inputValue: ev.target.value,
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
    } else if (action === 'ignore') {
      (this.setState(prevState => ({
        todoList: prevState.todoList,
        transformedTodo: '',
      })));
    } else if (action === 'same' || action === 'cancel') {
      (this.setState(prevState => ({
        todoList: prevState.todoList,
        transformedTodo: '',
        completedTodos: prevState.completedTodos,
      })));
    }
  }

  render() {
    const { inputValue, todoList, visibleFooter,
      completedTodos, hideCompleted, hideActive,
      allSelected, selected, transformedTodo } = this.state;

    return (
      <section className="todoapp">
        <Header
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
        <Footer
          todoList={todoList}
          completedTodos={completedTodos}
          visibleFooter={visibleFooter}
          selectedButton={selected}
          showAll={this.showAll}
          showActive={this.showActive}
          showCompleted={this.showCompleted}
          clear={this.clear}
        />
      </section>
    );
  }
}

export default App;
