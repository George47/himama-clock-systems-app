import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RowPaginatorComponent } from './row-paginator/row-paginator.component';
import { ConnectionService } from '../../services/connection.service';

declare var window: any;

@Component({
	selector: 'view-timings',
	templateUrl: './view-timings.component.html',
	styleUrls: ['./view-timings.component.css'],
	encapsulation: ViewEncapsulation.None,	animations: [
		trigger('detailExpand', [
			state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
			state('expanded', style({ height: '*', visibility: 'visible' })),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	]
})
export class ViewTimingsComponent implements OnInit {
	@Input() total: number = 1;
	@Input() per_page: number = 25;
	@Input() pageIndex: number = 0;
	@Input() tax_percentage: number = 0;
	@Input() top_pagination: boolean = false;
	@Input() contained: boolean = false;
	@Input() filter: string = "";
	@Input() page_size: any = [5, 10, 25, 50];
	@Input() columns: any = [];
	@Input() bulkOptions: any = [];
	@Input() priceMapping: any = {};

	@Output() bulkOptionChange: EventEmitter<any> = new EventEmitter();
	@Output() searchChange: EventEmitter<any> = new EventEmitter();
	@Output() refreshOrderList: EventEmitter<any> = new EventEmitter();
	@Output() exportFile: EventEmitter<any> = new EventEmitter();

	dbConnected: boolean = true;

	isExpansionDetailRow = (i: number, row: Object) => {
		return row.hasOwnProperty('detailRow');
	}

	data: any = [];
	data_rows: any = [];
	displayData: any = [];
	initialSelection: any = [];
	allowMultiSelect: boolean = true;
	displayedColumns: any = false;

	selection = new SelectionModel<any>(this.allowMultiSelect, this.initialSelection);
	dataSource = new MatTableDataSource();

	@ViewChild(RowPaginatorComponent) customPaginator: RowPaginatorComponent;

	constructor(
		private connection: ConnectionService
	) { }

	ngOnInit() {
		this.dataSource.paginator = this.customPaginator;

		this.columns = [
			{ name: 'time_id', type: 'text', header: 'Time ID', value_name: 'time_id' },
			{ name: 'user_id', type: 'text', header: 'User ID', value_name: 'user_id' },
			{ name: 'name', type: 'text', header: 'Name', value_name: 'name' },
			{ name: 'email', type: 'text', header: 'Email', value_name: 'email' },
			{ name: 'start_time', type: 'text', header: 'Start Time', value_name: 'start_time' },
			{ name: 'end_time', type: 'text', header: 'End Time', value_name: 'end_time' }
		];
		
		this.getList().subscribe(list => {

		});
	}


	getList(): Observable<any> {
		return new Observable(observer => {

			this.data_rows = [];

			// const url = "http://localhost:5000/api/v1/timing";
			let url = window.api_endpoint_live + 'timing';
			this.connection.get(url).subscribe(times => {
				for (let i = 0; i < times.length; i++)
				{
					let data = {
						'time_id': times[i].time_id,
						'user_id': times[i].user_id,
						'name': times[i].name,
						'email': times[i].email,
						'start_time': times[i].start_time,
						'end_time': times[i].end_time
					}

					this.data_rows.push(data); 
					
				}
				// this.buildDisplayList();
		
					if (this.data) {
						observer.next(true);
						observer.complete();
					}

			},
			
			err => {
				// this.dbConnected = false;
			})

		});
	}

	isAllSelected() {
		const numSelected = this.selection.selected.length;
		const numRows = this.dataSource.data.length;
		return numSelected == numRows;
	}

	runAction(action, col) {
		this[action](col);
	}

	export() {
		this.exportFile.emit();
	}

	switchPage($event) {
		this.per_page = $event.pageSize;
		this.pageIndex = $event.pageIndex;
		this.getList().subscribe(list => { });
	}
}