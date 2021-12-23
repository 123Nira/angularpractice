import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularCrud';
  result: any = [];
  constructor(private http: HttpClient) {

    this.http.get('https://jsonplaceholder.typicode.com/comments').toPromise()
      .then((data: any) => {
        console.log(data);
        this.result = data;
      }).catch(err => {
        console.log("error", err)
      })
  }
}
