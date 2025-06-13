import {computed, Injectable, signal} from '@angular/core';
import {FilterSortFields, OrderByFields, TFilters} from '../interfaces/pagination-filter.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PaginationFilterService {
  private _page = signal(0);
  private _size = signal(6);
  private _sortBy = signal<FilterSortFields>('createdAt');
  private _sortDir = signal<OrderByFields>('ASC');
  private _filters = signal<TFilters>({});

  page = this._page.asReadonly();
  size = this._size.asReadonly();
  sortBy = this._sortBy.asReadonly();
  sortDir = this._sortDir.asReadonly();
  filters = this._filters.asReadonly();

  getQuery = computed(() => {
    return {
      ...this._filters(),
      page: this._page(),
      size: this._size(),
      sortBy: this._sortBy(),
      orderBy: this._sortDir(),
    }
  })

  setSize(size: number) {
    this._size.set(size);
  }

  setPage(page: number) {
    this._page.set(page);
  }

  nextPage() {
    this._page.update(p => p + 1);
  }

  prevPage() {
    this._page.update(p => Math.max(p - 1, 0));
  }

  setSort(field: FilterSortFields, dir: OrderByFields) {
    this._sortBy.set(field);
    this._sortDir.set(dir);
    this._page.set(0);
  }

  updateFilters(filters: Partial<TFilters>) {
    this._filters.set({ ...this._filters(), ...filters });
    this._page.set(0);
  }

  clearFilters() {
    this._filters.set({});
    this._page.set(0);
  }

  reset() {
    this._page.set(0);
    this._filters.set({});
    this._sortBy.set('createdAt');
    this._sortDir.set('ASC');
  }

  areFiltersEmpty = computed(() => Object.keys(this._filters()).length === 0);
}
