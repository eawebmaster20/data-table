import {AfterViewInit, Component, Input, OnChanges, SimpleChange, SimpleChanges, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { MatButtonModule } from '@angular/material/button';




@Component({
  selector: 'app-base-table',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatCheckboxModule , 
    MatInputModule, 
    MatTableModule, 
    MatSortModule, 
    MatPaginatorModule, 
    CommonModule,
    MatButtonModule, 
    FormsModule],
  templateUrl: './base-table.component.html',
  styleUrl: './base-table.component.scss'
})
export class BaseTableComponent implements AfterViewInit, OnChanges{
  dataSource: MatTableDataSource<any>;
  selectedRows = new Set<any>();
  searchTerm:string = '';
  loadingTableData: any[]= tableData
  @Input() tableData: any[]=[]
  @Input() showSearch: boolean=false;
  @Input() tableColumns: string[]=[]
  @Input() pageSizeOptions: number[]=[5, 10, 25, 100];
  @Input() enablePagination: boolean=true;
  @Input() enableSort: boolean=true;
  @Input() enableSelect: boolean=true;
  @Input() isLoading: boolean=false;


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.tableData);
  }

  ngAfterViewInit() {
    if (this.enablePagination) {
      this.dataSource.paginator = this.paginator;
    }
    if (this.enableSort) {
      this.dataSource.sort = this.sort;
    }
  }

  applyFilter(event: Event) {
    if (this.isLoading) return;
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDataType(data: any): string {
    return typeof data;
  }

  openObjectViewer(object:any):void {
    this.dialog.open(BaseModalComponent, {
      data: object,
    });
  }

  buildTableColumns(){}

    // Toggle selection for an individual row
  toggleSelection(row: any) {
    if (this.selectedRows.has(row)) {
      this.selectedRows.delete(row);
    } else {
      this.selectedRows.add(row);
    }
  }

  // Toggle 'Select All' functionality
  toggleSelectAll(event: any) {
    if (event.checked) {
      this.selectedRows = new Set(this.dataSource.data);
    } else {
      this.selectedRows.clear();
    }
  }

  // Check if all rows are selected
  isAllSelected() {
    return this.dataSource.data.length > 0 && this.selectedRows.size === this.dataSource.data.length;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tableColumns'] || changes['tableData']) {
      this.dataSource.data = this.tableData;
      if (this.tableColumns.length > 0 && this.enableSelect) {
        this.tableColumns.unshift('select')
        console.log(this.tableColumns);
      }
      this.buildTableColumns();
      if (this.enablePagination) {
        this.dataSource.paginator = this.paginator;
      }
      if (this.enableSort) {
        this.dataSource.sort = this.sort;
      }
    }
    if (changes['isLoading']) {
      console.log('Loading');
      if (this.isLoading) {
        this.tableColumns = ['id']
        this.dataSource = new MatTableDataSource(this.loadingTableData);
      }
    }
    // if (changes['enableSelect'] && this.enableSelect) {
    //   // console.log('enableSelect');
    //   this.tableColumns.unshift('select')
    //   console.log(this.tableColumns);
    // }
  }
}