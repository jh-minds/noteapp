import { Component, OnInit } from '@angular/core';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-postitboard',
  standalone: true,
  imports: [CdkDrag, CommonModule,FormsModule],
  templateUrl: './postitboard.component.html',
  styleUrls: ['./postitboard.component.css']
})
export class PostitboardComponent implements OnInit {
  postIts = [
    {
      id: 'postit-1',
      text: '',
      position: { x: 0, y: 0 }
    }
  ];

  ngOnInit(): void {
    const savedPostIts = localStorage.getItem('postIts');
    if (savedPostIts) {
      this.postIts = JSON.parse(savedPostIts);
    }
  }


  deleteItems() {
    localStorage.clear();
  }


  onDragEnded(event: CdkDragEnd, index: number): void {
    const { x, y } = event.source.getFreeDragPosition();
    const constrainedPosition = this.constrainPosition(x, y, event.source.element.nativeElement);
    this.postIts[index].position = constrainedPosition;
    this.savePostIts();
  }

  constrainPosition(x: number, y: number, element: HTMLElement): { x: number, y: number } {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;

    const constrainedX = Math.max(0, Math.min(x, viewportWidth - elementWidth));
    const constrainedY = Math.max(0, Math.min(y, viewportHeight - elementHeight));

    return { x: constrainedX, y: constrainedY };
  }

  onTextChanged(event: Event, index: number): void {
    const textarea = event.target as HTMLTextAreaElement;
    this.postIts[index].text = textarea.value;
    this.savePostIts();
  }

  addPostIt(): void {
    const newPostIt = {
      id: `postit-${this.postIts.length + 1}`,
      text: '',
      position: { x: 0, y: 0 }
    };
    this.postIts.push(newPostIt);
    this.savePostIts();
    console.log('Post-its array:', this.postIts);
  }

  deletePostIt(index: number): void {
    this.postIts.splice(index, 1);
    this.savePostIts();
    console.log('Post-it deleted:', this.postIts);
  }

  savePostIts(): void {
    localStorage.setItem('postIts', JSON.stringify(this.postIts));
    console.log('Post-its array saved:', this.postIts);
  }
}