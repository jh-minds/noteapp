import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { KanbanService } from './kanban.service';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CdkDrag, CdkDropListGroup, CdkDropList, CommonModule, FormsModule,MatButtonModule],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit {
  containers: { name: string, items: { text: string }[], newItemText: string }[] = [];

  constructor(private kanbanService: KanbanService) {}

  ngOnInit() {
    this.loadContainers();
  }

  loadContainers() {
    this.kanbanService.getContainers().subscribe(data => {
      this.containers = data;
    });
  }

  generateExampleContainers() {
    const exampleContainers = [
      { name: 'Placeholder', items: [{ text: '' }], newItemText: '' }
    ];
    this.containers = exampleContainers;
  }

  addContainer() {
    if (this.containers.length >= 4) {
      console.log('Maximum container limit reached');
      return;
    }

    let newContainerName = `Placeholder ${this.containers.length + 1}`;
    let counter = this.containers.length + 1;

    while (this.containers.some(container => container.name === newContainerName)) {
      counter++;
      newContainerName = `Placeholder ${counter}`;
    }

    const newContainer = { name: newContainerName, items: [], newItemText: '' };
    this.containers.push(newContainer);
    this.kanbanService.saveContainer(newContainer).subscribe();
  }

  deleteContainer(containerName: string) {
    this.containers = this.containers.filter(container => container.name !== containerName);
    this.kanbanService.deleteContainer(containerName).subscribe();
  }

  addItem(containerName: string) {
    const container = this.containers.find(c => c.name === containerName);
    if (container) {
      const newItem = { text: '' };
      container.items.push(newItem);
      this.kanbanService.saveItem(containerName, newItem).subscribe();
    }
  }

  deleteItem(containerName: string, itemIndex: number) {
    const container = this.containers.find(c => c.name === containerName);
    if (container) {
      container.items.splice(itemIndex, 1);
      this.kanbanService.deleteItem(containerName, itemIndex).subscribe();
    }
  }
  drop(event: CdkDragDrop<{ text: string }[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}