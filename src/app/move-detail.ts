import {Component, Input} from 'angular2/core';

export interface Event {
  id?: string;
  source?:string;
  youtubeVideoId?:string;
  start?:number;
  end?:number;
  title?:string;
  href?:string;
  description?:string;
}

@Component({
  selector: 'movie-detail',
  template: `
    <div *ngIf="event">
      {{event.description}}
    </div>
  `
})
export class MovieDetailComponent {
  @Input()
  event:Event;
}
