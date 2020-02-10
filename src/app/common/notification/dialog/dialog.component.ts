import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConnectionService } from '../../../services/connection.service';

declare var window: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
    title: any = 'Notification!';
    message: any = '';
    time_id: any;
    yes: any = "Ok";
    no: any = false;
    edit: boolean = false;
    start_time: any;
    end_time: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<DialogComponent>,
        private connection: ConnectionService
    ) { 
        this.title = this.data.title;
        this.message = this.data.message;
        
        if (this.data.time_id)
            this.time_id = this.data.time_id;

        if (this.data.start_time)
            this.start_time = this.data.start_time;
        
        if (this.data.end_time)
            this.end_time = this.data.end_time;

        if (this.data.yes)
            this.yes =this.data.yes;

        if (this.data.no)
            this.no = this.data.no;

        if (this.data.edit)
            this.edit = this.data.edit;
    }

    ngOnInit() {
    }

    close(response) {
        this.dialogRef.close(response);
    }

    editTime(start_time, end_time) {
        console.log(start_time, end_time, this.time_id)
        // let url = "http://localhost:5000/api/v1/timing";
        let url = window.api_endpoint_live + 'timing';
        let postData = {
            type: 'edit',
            start_time: start_time,
            end_time: end_time,
            time_id: this.time_id
        }
        this.connection.post(url, postData).subscribe(res => {
            if (res)
            {
                this.dialogRef.close(true);
            }
        })
        // send request along with data
    }

}
