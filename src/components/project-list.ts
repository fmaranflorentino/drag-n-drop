import { Component } from "./base-component";
import { DragTarget } from "../interfaces/drag-drop";
import { Project, ProjectStatus } from "../models/project";
import { AutoBind } from "../decorators/autobind";
import { projectState } from "../state/project";
import { ProjectItem } from "./project-item";


  export class ProjectList extends Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
      super('project-list', 'app', false, `${type}-projects`);
      this.configure();
      this.renderContent();
    }

    @AutoBind
    dragOverHandler(event: DragEvent) {
      if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
        const listElement = <HTMLUListElement>this.element.querySelector('ul')!;
        listElement.classList.add('droppable');
      }
    }

    @AutoBind
    dropHandler(event: DragEvent) {
      const projectId = event.dataTransfer!.getData('text/plain');
      projectState.moveProject(
        projectId,
        this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }

    @AutoBind
    dragLeaveHandler(_: DragEvent) {
      const listElement = <HTMLUListElement>this.element.querySelector('ul')!;
      listElement.classList.remove('droppable');
    }

    configure() {
      this.element.addEventListener('dragover', this.dragOverHandler);
      this.element.addEventListener('dragleave', this.dragLeaveHandler);
      this.element.addEventListener('drop', this.dropHandler);

      projectState.addListener((projects: Project[]) => {
        const filteredProjects = projects.filter((project: Project) => {
          if (this.type === 'active') {
            return project.status === ProjectStatus.Active;
          }

          return project.status === ProjectStatus.Finished;
        });

        this.assignedProjects = filteredProjects;
        this.renderProjects();
      });
    }

    renderContent() {
      const listId = `${this.type}-projects-list`;

      this.element.querySelector('ul')!.id = listId;
      this.element.querySelector('h2')!.textContent = `${this.type} Projects`;
    }

    private renderProjects() {
      const listId = `${this.type}-projects-list`;
      const listElement = <HTMLUListElement>document.getElementById(listId)!;
      listElement.innerHTML = '';

      for (const project of this.assignedProjects) {
        new ProjectItem(this.element.querySelector('ul')!.id, project);
      }
    }
  }
