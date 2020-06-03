export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    beginningPosition: boolean,
    newElementId?: string
  ) {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById(templateId)!
    );
    this.hostElement = <T>document.getElementById(hostElementId)!;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );
    this.element = importedNode.firstElementChild as U;

    if (newElementId) {
      this.element.id = newElementId;
    }

    this.attachTemplate(beginningPosition);
  }

  private attachTemplate(beginningPosition: boolean) {
    this.hostElement.insertAdjacentElement(
      beginningPosition ? 'afterbegin' : 'beforeend',
      this.element
    );
  }

  abstract configure(): void;

  abstract renderContent(): void;
}
