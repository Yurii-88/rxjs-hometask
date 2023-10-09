import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { User } from '../../interface';

@Component({
  selector: 'app-live-search',
  templateUrl: './live-search.component.html',
  styleUrls: ['./live-search.component.scss'],
})
export class LiveSearchComponent implements OnInit {
  initialUsers!: User[];
  users: User[] = [];
  searchField = new FormControl();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.searchField.valueChanges
      .pipe(map((value) => this.filterUsers(value)))
      .subscribe((filtered) => (this.users = filtered));
  }

  fetchUsers(): void {
    this.dataService.getUsers().subscribe((users) => {
      this.users = users;
      this.initialUsers = users;
    });
  }

  private filterUsers(input: string): User[] {
    if (!input) {
      this.users = this.initialUsers;
    }

    return this.initialUsers.filter((user) => {
      const { name, username, email, phone, address } = user;
      const { city, street, zipcode } = address;

      return [name, username, email, phone, city, street, zipcode].some(
        (field) => field.toLocaleLowerCase().includes(input.toLocaleLowerCase())
      );
    });
  }
}
