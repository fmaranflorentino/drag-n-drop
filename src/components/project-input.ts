namespace App {
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleEl: HTMLInputElement;
    descriptionEl: HTMLTextAreaElement;
    peopleEl: HTMLInputElement;

    constructor() {
      super('project-input', 'app', true, 'user-input');

      this.titleEl = <HTMLInputElement>this.element.querySelector('#title');
      this.descriptionEl = <HTMLTextAreaElement>(
        this.element.querySelector('#description')
      );
      this.peopleEl = <HTMLInputElement>this.element.querySelector('#people');

      this.configure();
    }

    configure() {
      this.element.addEventListener('submit', this.handleFormSubmit);
    }

    renderContent() {}

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
        min: 1,
        max: 5,
      };

      if (!validate(title) || !validate(description) || !validate(people)) {
        alert('invalid input');
        return;
      } else {
        return [
          title.value.toString(),
          description.value.toString(),
          +people.value,
        ];
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
        projectState.addProject(title, description, people);
        this.clearInputs();
      }
    }
  }
}
