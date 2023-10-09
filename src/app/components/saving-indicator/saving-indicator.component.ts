import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  map,
  startWith,
  tap
} from 'rxjs/operators';

enum Status {
  Saving = 'Saving...',
  Saved = 'Saved!',
  Updated = 'Last Updated:',
  SavedAll = 'All changes saved!',
}

@Component({
  selector: 'app-saving-indicator',
  templateUrl: './saving-indicator.component.html',
  styleUrls: ['./saving-indicator.component.scss'],
})
export class SavingIndicatorComponent implements OnInit {
  searchField = new FormControl();
  status!: Observable<Status>;

  constructor() {}

  ngOnInit(): void {
    this.status = this.searchField.valueChanges.pipe(
      startWith(Status.SavedAll),
      map((v) => (!v ? Status.SavedAll : v)),
      map((v) => (v !== Status.SavedAll ? Status.Saving : Status.SavedAll)),
      tap(console.log)
    );
  }
}
