import Validatable from '../interfaces/validatable';
import { AutoBind } from '../decorators/autobind';
import { validate } from '../utils/validation';
export default class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleEl: HTMLInputElement;
  descriptionEl: HTMLTextAreaElement;
  peopleEl: HTMLInputElement;

  constructor() {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById('project-input')!
    );
    this.hostElement = <HTMLDivElement>document.getElementById('app')!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleEl = <HTMLInputElement>this.element.querySelector('#title');
    this.descriptionEl = <HTMLTextAreaElement>(
      this.element.querySelector('#description')
    );
    this.peopleEl = <HTMLInputElement>this.element.querySelector('#people');

    this.attachTemplate();
    this.configure();
  }

  private attachTemplate() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  private configure() {
    this.element.addEventListener('submit', this.handleFormSubmit);
  }

  private gatherUserInput(): [string, string, number] | void {
    const title: Validatable = {
      value: this.titleEl.value,
      required: true,
    };
    const description: Validatable = {
      value: this.descriptionEl.value,
      required: true,
      minLength: 10,
      maxLength: 100,
    };
    const people: Validatable = {
      value: +this.peopleEl.value,
      min: 2,
      max: 5,
    };


    if (
      !validate(title) ||
      !validate(description) ||
      !validate(people)
    ) {
      alert('invalid input');
      return;
    } else {
      return [title.value.toString(), description.value.toString(), +people.value];
    }
  }

  private clearInputs() {
    this.titleEl.value = '';
    this.descriptionEl.value = '';
    this.peopleEl.value = '';
  }

  @AutoBind
  private handleFormSubmit(e: Event) {
    e.preventDefault();

    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      console.log(title, description, people);

      this.clearInputs();
    }
  }
}