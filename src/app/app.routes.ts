import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';
import { NotepaperComponent } from './notepaper/notepaper.component';
import { PostitboardComponent } from './postitboard/postitboard.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'notepaper', component: NotepaperComponent },
  { path: 'postit', component: PostitboardComponent },
  { path: '**', component: AppComponent }
];

export const appRoutingProviders = [
  provideRouter(routes)
];