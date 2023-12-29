import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ForsaleComponent } from '../forsale/forsale.component';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent{
  @ViewChild(ForsaleComponent) forsaleComponent: ForsaleComponent;
  @Input() currentPage: number=0;
  @Input() totalPages: number;
  @Output() pageChange = new EventEmitter<number>();

    pages(): number[] {
    const maxVisiblePages = 5;
    const visiblePages: number[] = [];

    const startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(this.totalPages, startPage + maxVisiblePages - 1);

    for (let page = startPage; page <= endPage; page++) {
      visiblePages.push(page);
    }

    return visiblePages;
  
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }
}
