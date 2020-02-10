import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { FilterPipe } from '../../../pipes/filter.pipe';
import { ConnectionService } from '../../../services/connection.service';
// import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableListComponent implements OnInit, OnChanges {
	@Input() total: number = 1;
    @Input() per_page: number = 25;
    @Input() page_size: any = [5,10,25,50];
    @Input() pageIndex: number = 0;
    @Input() list_url: any = false;
    @Input() data: any = false;
    @Input() top_pagination: boolean = false;
	@Input() contained: boolean = false;
	
	@Input() updated: any;

    @Input() filter: string = "";
    @Output() doAction: EventEmitter<any> = new EventEmitter();

    // initialSelection: any = [];
    // allowMultiSelect:boolean = true;
    // selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
	displayedColumns:any = false;
	@Input() columns: any = [];
    // dataSource = new MatTableDataSource();
    // dataSource: Data[];

	constructor(
		private connection: ConnectionService,
		private dataChanged: ChangeDetectorRef,
	) { }

	ngOnInit() {
		let columns = [];
		this.columns.forEach(col => {
			columns.push(col.name);
		});
		this.displayedColumns = columns;

		this.getList().subscribe(list => {
		});	
	}

	// dataChanged
	ngOnChanges() {
		let columns = [];
		this.columns.forEach(col => {
			columns.push(col.name);
		});
		this.displayedColumns = columns;
		
		this.getList().subscribe(list => {

		});
	}

	getList(): Observable<any> {
		return new Observable(observer => {
			observer.next(true);
			observer.complete();
		});
	}

    runAction(action, col) {
    	if (action) {
	    	let item_action = {action: action, col: col};
			this.doAction.emit(item_action);
		}
    }

	switchPage($event) {
		this.per_page = $event.pageSize;
	    this.pageIndex = $event.pageIndex;
		this.getList().subscribe(list => {
	        
		});
	}
}
