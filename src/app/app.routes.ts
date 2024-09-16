import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { NotepaperComponent } from './notepaper/notepaper.component';
import { PostitboardComponent } from './postitboard/postitboard.component';
import { KanbanComponent } from './kanban/kanban.component';

export const routes: Routes = [
  { path: '', redirectTo: '/postit',  pathMatch: 'full' },
  { path: 'notepaper', component: NotepaperComponent },
  { path: 'postit', component: PostitboardComponent },
  { path: 'kanban', component: KanbanComponent },
  { path: '**', component: AppComponent }
];

export const appRoutingProviders = [
  provideRouter(routes)
];