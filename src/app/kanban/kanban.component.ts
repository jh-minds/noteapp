import { CdkDrag,CdkDragDrop,CdkDropList,CdkDropListGroup,moveItemInArray,transferArrayItem, } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';



@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [CdkDrag,CdkDropListGroup,CdkDropList],
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  drop(event: CdkDragDrop<string[]>) {
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
