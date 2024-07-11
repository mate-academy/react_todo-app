export class Todo {
  id = +new Date();

  title: string;

  completed = false;

  constructor(title: string) {
    this.title = title;
  }
}
