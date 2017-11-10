import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
