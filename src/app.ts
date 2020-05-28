function AutoBind(
  _target: any,
  _methodname: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}

class ProjectInput {
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
    this.element.addEventListener('submit', this.handleFormSubmit)
  }

  @AutoBind
  private handleFormSubmit(e: Event) {
    e.preventDefault();
    console.log('form', this.titleEl.value);
  }
}

const prjInput = new ProjectInput();
