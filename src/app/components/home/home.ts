import {Component} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {LoDashStatic as _} from 'lodash';
import moment = require('moment');

declare var $:any;

@Component({
  selector: 'home',
  templateUrl: 'app/components/home/home.html',
  styleUrls: ['app/components/home/home.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Home {
  repos:Observable<any>;

  constructor(private http:Http) {
    this.repos = this.http.get("https://www.smallslive.com/events/calendar/2016/2/").map((res) => {
      var smallsHTML = document.createElement('html');
      smallsHTML.innerHTML = res.text();
      var allActs = _.flatMap(smallsHTML.getElementsByClassName("day"), (dayElem:Element) => {
        var date = moment(dayElem.getElementsByClassName("day__date")[0].textContent, "MM/DD/YYYY");

        var titles = _.map(dayElem.getElementsByClassName("day__event-title"), (titleElem) => {
          return titleElem.textContent;
        });

        var periods = _.map(dayElem.getElementsByClassName("day__event-time"), (timeElem) => {
          var timeRanges = timeElem.textContent.split("-");
          var dateTimes = _.map(timeRanges, (timeString) => {
            var dateFormat = "YYYY-MM-DD";
            var newDate = date.clone();
            if (timeString.includes("AM")) {
              newDate.add(1, 'day');
            }
            return moment(newDate.format(dateFormat) + " " + timeString.trim(), dateFormat + " H:m A");
          });
          return _.zipObject(["start", "end"], dateTimes);
        });

        return _.zipWith(titles, periods, (title, period) => {
          return {title: title, period: period}
        });
      });
      var a = _.chain(allActs).groupBy((act) => {
        var start = act.period.start.clone();
        if (start.hour() <= 4) {
          start.subtract(1, 'day');
        }
        return start.format("YYYY-MM-DD");
      }).toPairs().map(pair => _.zipObject(['date', 'acts'], pair)).value();
      return a;
    });
  }
}
