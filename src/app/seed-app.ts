import {Component} from 'angular2/core';
import {Router, Route, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Home} from './components/home/home';
import {About} from './components/about/about';
import {RepoBrowser} from './components/repo-browser/repo-browser';
import {MovieDetailComponent, Event} from './move-detail';
import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import moment from "moment"

interface Section {
  id?:string;
  eventGroups?:Array<Array<Event>>;
}

@Component({
  selector: 'seed-app',
  providers: [],
  templateUrl: 'app/seed-app.html',
  directives: [MovieDetailComponent],
  pipes: []
})

@Injectable()
export class SeedApp {
  sections:Observable<any>;

  a = [{
    "title": "The Mike DiRubbo Quintet",
    "href": "/events/11207-the-mike-dirubbo-quintet/",
    "interval": "1463279400000-1463288400000",
    "youtubeVideoId": "jsFVxTvUQtQ"
  }, {
    "title": "The Philip Harper Quintet",
    "href": "/events/11248-the-philip-harper-quintet/",
    "interval": "1463288400000-1463299200000",
    "youtubeVideoId": "wFGWU6qonDs"
  }, {
    "title": "Vocal Masterclass with Marion Cowings",
    "href": "/events/11245-vocal-masterclass-with-marion-cowings/",
    "interval": "1463331600000-1463338800000",
    "youtubeVideoId": "nYRvrONjlUQ"
  }, {
    "title": "The Ai Murakami Trio feat. Sacha Perry",
    "href": "/events/11258-the-ai-murakami-trio-feat-sacha-perry/",
    "interval": "1463344200000-1463353200000",
    "youtubeVideoId": "hAldOWTGjHo"
  }, {
    "title": "The Johnny O'Neal Trio",
    "href": "/events/11282-the-johnny-oneal-trio/",
    "interval": "1463355000000-1463364000000",
    "youtubeVideoId": "ue7v6bddlg8"
  }, {
    "title": "The Dmitry Baevsky Quartet",
    "href": "/events/11257-the-dmitry-baevsky-quartet/",
    "interval": "1463365800000-1463374800000",
    "youtubeVideoId": "BqTfVdnC8rQ"
  }, {
    "title": "Hillel Salem - \"Afterhours\"",
    "href": "/events/11297-hillel-salem-afterhours/",
    "interval": "1463374800000-1463385600000"
  }];

  response:Array<Event> = [{
    source: "IFC",
    start: 1463244878280,
    end: 1463244892157,
    youtubeVideoId: "h2tY82z3xXU",
    title: "Fargo",
    href: "http://www.ifccenter.com/films/fargo-2/",
    description: "DCP projection"
  }, {
    source: "IFC",
    start: 1463244878280,
    end: 1463244892157,
    youtubeVideoId: "hKCJxsO1jt8",
    title: "Needful Things",
    href: "http://www.ifccenter.com/films/fargo-2/",
    description: "35mm print"
  }, {
    source: "IFC",
    start: 1463244878280,
    end: 1463244892157,
    youtubeVideoId: "XBrfxHOXsDE",
    title: "Pelé: Birth of a Legend",
    href: "http://www.ifccenter.com/films/fargo-2/",
    description: "35mm print"
  }, {
    source: "Smalls Jazz Club",
    start: 1463244878280,
    end: 1463244892157,
    youtubeVideoId: "LC5KMt3Ew1c",
    title: "Jonathan Thomas - Afternoon Jam Session",
    href: "http://www.ifccenter.com/films/fargo-2/",
  }, {
    source: "Smalls Jazz Club",
    start: 1463244878280,
    end: 1463244892157,
    youtubeVideoId: "Qe9oxNtsmBE",
    title: "The Tardo Hammer Trio",
    href: "http://www.ifccenter.com/films/fargo-2/",
  }];


  constructor(http:Http) {
    let params = new URLSearchParams();
    params.set('startDate', new Date().toISOString());
    params.set('endDate', new Date().toISOString());
    this.sections = http.get('/events', {search: params})
      .map((response) => {
        return _.chain(response.json())
          .groupBy((event) => {
            var section;
            if (event.source === "IFC") {
              section = "Movie";
            }
            else {
              section = "Jazz";
            }
            return section;
          })
          .mapValues((events:Array<Event>, section) => {
            return {
              id: section,
              events: events
            }
          })
          .toArray()
          .sortBy((section:Section) => section.id)
          .value();
      });
  }
}
