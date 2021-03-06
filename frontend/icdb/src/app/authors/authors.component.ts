import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Author } from '../author';
import { AuthorPage } from '../author-page';
import { DatabaseService } from '../database.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})
export class AuthorsComponent implements OnInit {
  displayedColumns = ['Name', 'Hometown', 'Characters', 'Issues'];
  dataSource: MatTableDataSource<Author>;

  authors: Author[];
  currPage = 1;
  totalPages = 2;

  searchModel = 'authors';

  filter = '';
  sortA='';

  constructor(private databaseService: DatabaseService, private stateService: StateService, private router: Router) { }

  authorsHandler = {
    next: data => {
      let authorPage: AuthorPage;
      authorPage = data;
      this.authors = authorPage.results;
      this.dataSource = new MatTableDataSource<Author>(this.authors);
      this.currPage = authorPage.page_num;
      this.totalPages = authorPage.pages_total;
    }
  };

  backPage() {
    this.databaseService.getAuthors(this.currPage - 1, this.filter,this.sortA).subscribe(this.authorsHandler);
  }

  forwardPage() {
    this.databaseService.getAuthors(this.currPage + 1, this.filter,this.sortA).subscribe(this.authorsHandler);
  }

  detailAuthor(row: Author) {
    this.stateService.setAuthor(row);
    this.router.navigateByUrl('/author');
  }

  ngOnInit(): void {
    this.databaseService.getAuthors(1, this.filter, this.sortA).subscribe(this.authorsHandler);
  }

  search(value) {
	  this.router.navigateByUrl('search-page');
  }

  applyFilter(filter: string) {
    this.filter = filter;
    this.databaseService.getAuthors(this.currPage, filter, this.sortA).subscribe(this.authorsHandler);
  }

  SortAZ(){
    this.sortA='False';
   this.databaseService.getAuthors(this.currPage,this.filter,this.sortA).subscribe(this.authorsHandler);
 }
 SortZA(){
   this.sortA='True';
   this.databaseService.getAuthors(this.currPage,this.filter,this.sortA).subscribe(this.authorsHandler);
 }
}

