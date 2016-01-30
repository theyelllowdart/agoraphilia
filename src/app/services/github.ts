import {Injectable} from 'angular2/core';
import {Http, URLSearchParams} from 'angular2/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Github {
  constructor(private http:Http) {
  }

  getOrg(org:string) {
    return this.makeRequest(`orgs/${org}`);
  }

  getReposForOrg(org:string) {
    return this.makeRequest(`orgs/${org}/repos`);
  }

  getRepoForOrg(org:string, repo:string) {
    return this.makeRequest(`repos/${org}/${repo}`);
  }

  private makeRequest(path:string) {
    let params = new URLSearchParams();
    params.set('per_page', '100');
    let url = `https://api.github.com/${path}`;
    //return this.http.get("https://www.smallslive.com/events/calendar/2016/2/", {})
    //	.map((res) => {
    //		return {
    //     "name": "test",
    //     "org": "hello"
    //   };
    //
    //	});
    return this.http.get(url, {search: params})
      .map((res) => {
        return [{"name": "hi", "owner": {login: "login"}}];
      });

  }
}
