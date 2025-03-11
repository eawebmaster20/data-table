import { Component, OnInit } from '@angular/core';
import { BaseTableComponent } from '../../shared/components/base-table/base-table.component';
import { ApiService } from '../../core/services/api/api.service';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [BaseTableComponent],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent implements OnInit {
  columnsToDisplay:string[] = [];
  data: any[] = [];
  isLoading:boolean = false;

  constructor(private api: ApiService) { }
  
  ngOnInit(): void {
    this.isLoading = true;
    this.api.get<any>('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (users) => {
        this.data = users
        this.columnsToDisplay = Object.keys(this.data[0])
        this.isLoading = false;
        console.log(this.data)
      },
      error: (error) => {
        console.error('Error:', error);
        this.isLoading = false;
      }
    });
  }
}
