export class AbstractTodo {
  constructor() {
    if (this.constructor === AbstractTodo) {
      throw new Error("Abstract classes can't be instantiated.");
    }
  }

  static fromInput() {
    throw new Error("Method 'fromInput()' must be implemented.");
  }
}
