import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { User } from '../../interface';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.scss'],
})
export class LiveSearchComponent implements OnInit {
  users$!: Observable<User[]>;
  searchField = new FormControl();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.users$ = combineLatest([
      this.searchField.valueChanges,
      this.dataService.getUsers(),
    ]).pipe(
      startWith([]),
      map(([input, users]) => this.filterUsers(input, users))
    );
  }

  private filterUsers(input: string, users: User[]): User[] {
    if (!input) {
      return [];
    }

    return users.filter((user) => {
      const { name, username, email, phone, address } = user;
      const { city, street, zipcode } = address;

      return [name, username, email, phone, city, street, zipcode].some(
        (field) => field.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      );
    });
  }
}
