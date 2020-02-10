import { Component, OnInit, ElementRef, ViewChild, Pipe, PipeTransform } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material';
import { DialogService } from '../../common/notification/dialog/dialog.service';

import { ConnectionService } from '../../services/connection.service';
import { ViewTimingsComponent} from '../view-timings/view-timings.component';

declare var window: any;

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
    
    actionbar: boolean = false;
    loading: boolean = false;
    index: number = 0;
    query: string = '';
    sortdirection: string = 'asc';
    page: number = 1;
    maxpages: number = 1;
    limit: number = 10;

    currentTime: any;
    startTime: any;

    timing: boolean = false;
    timingSeconds: number = 0;
    timingMinutes: number = 0;
    timingHours: number = 0;
    userTimed: boolean = false;

    userEmail: string = '';
    userPassword: string = '';
    userName: string = '';
    loginAs: string = this.getCookie('himama_user_name');
    
    loggedIn: boolean = false;

    columns: any = [
        {
            name: 'time_id',
            type: 'text',
            header: 'Time ID',
            value_name: 'time_id'
        },
        {
            name: 'start_time',
            type: 'text',
            header: 'Start Time',
            value_name: 'start_time'
        },
        {
            name: 'end_time',
            type: 'text',
            header: 'End Time',
            value_name: 'end_time'
        },
        {
            name: 'time_duration',
            type: 'text',
            header: 'Duration (Seconds)',
            value_name: 'time_duration'
        },
        {
            name: 'actions',
            type: 'actions',
            header: 'Actions',
            value_name: 'actions'
        }
    ];

    userTiming:any = [];

    arrayBuffer: any;
    bulkOptions: any;

    constructor(
        private elRef: ElementRef,
        private dialog: DialogService,
        private connection: ConnectionService
    ) {}

    @ViewChild(ViewTimingsComponent) private viewReportsComponent: ViewTimingsComponent;

    ngOnInit() {
        // if logged in, go to clock page
        let user_id = this.getCookie('himama_user_id');
        if (user_id)
        {
            this.loadUserTimingData(user_id);
            this.loggedIn = true;
        } else {
            this.loggedIn = false;
        }

        // keep updating current time every second
        setInterval(()=>{
            this.currentTime = new Date();
        }, 1000)
    }

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        let index = tabChangeEvent.index;
        this.index = tabChangeEvent.index;

        if (index === 1) {
            this.viewReportsComponent.getList().subscribe(res => {});
        }

    }

    // using email and password to log in
    userLogin() {
        // let url = "http://localhost:5000/api/v1/users";
        let url = window.api_endpoint_live + 'users';
        let postData = {
            email: this.userEmail,
            password: this.userPassword
        };
        this.connection.post(url, postData).subscribe(res => {
            if (res[0].id > 0)
            {
                this.setCookie(res[0].id, this.userEmail);
                this.loggedIn = true;    
                this.loadUserTimingData(res[0].id);
                this.reload();
            } else {
                alert('failed');
            }
        });
    }

    // using name to log in
    userLoginWithName() {
        // let url = "http://localhost:5000/api/v1/users";
        let url = window.api_endpoint_live + 'users';
        let postData = {
            name: this.userName
        };
        this.connection.post(url, postData).subscribe(res => {
            if (res)
            {
                this.setCookie(res, this.userName);
                this.loggedIn = true;
                this.loadUserTimingData(res);
            }
        });
    }

    // if logged in, load user timing data, hide section if not found
    loadUserTimingData(id)
    {
        // this.userTiming
        // let url = "http://localhost:5000/api/v1/timing/" + id;
        let url = window.api_endpoint_live + 'timing/' + id;
        this.connection.get(url).subscribe(res => {
            if (res)
            {
                for (let i = 0; i < res.length; i++)
                {
                    let newTime = {
                        time_id: res[i].time_id,
                        start_time: res[i].start_time,
                        end_time: res[i].end_time,
                        time_duration: res[i].duration
                    }
            
                    this.userTiming.push(newTime)
                }
                this.userTimed = true;
            }
        });

    }

    timingToggled() {
        //start timing
        if (!this.timing)
        {
            this.timing = true;
            this.timingSeconds = 0;
            this.startTime = new Date();

            setInterval(() => {
                this.timingSeconds =  this.timingSeconds + 1;
            }, 1000);
        } else {
            // end timing
                this.userTimed = true;
                this.timing = false;

                // log timing
                this.logTiming();
        }
    }

    // store current timing
    logTiming()
    {
         var end_time = new Date(this.startTime);
         end_time.setSeconds( end_time.getSeconds() + this.timingSeconds )

        let postData = {
            user_id: this.getCookie('himama_user_id'),
            start_time: this.startTime.toLocaleString(),
            end_time: end_time.toLocaleString(),
            duration: this.timingSeconds
        }

        // let url = "http://localhost:5000/api/v1/timing";
        let url = window.api_endpoint_live + 'timing';

        this.connection.post(url, postData).subscribe(res=>{
            // dialog to confirm success
            this.dialog.showDialogSuccess('Save Time', 'Time saved successfully!').subscribe(res =>{
                this.reload();
            })
        })

        this.userTiming.push(postData)
    }

    logOut()
    {
        this.dialog.showConfirmationdialog("Log Out?", "Are you sure you want to log out?", "Yes", "No").subscribe(res => {
            if(res)
            {
                this.deleteCookie();
                this.loggedIn = false;
        
            }
        });
    }

    // get cookie
    getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }

    // editing and deleting times
    doAction(event)
    {
        // edit and delete
        if (event.action === 'delete')
        {
            this.dialog.showConfirmationdialog("Delete?", "Are you sure you want to delete this timing?", "Yes", "No").subscribe(res => {
                if (res)
                {
                    // let url = "http://localhost:5000/api/v1/timing";
                    let url = window.api_endpoint_live + 'timing';
                    let postData = {
                        action: "delete",
                        time_id: event.col.time_id
                    }
                    // send request to delete
                    this.connection.post(url, postData).subscribe(res => {
                        this.reload();
                    })
                }
            });
        } else if (event.action === 'edit')
        {
            this.dialog.editTiming("Edit", "", event.col.time_id, event.col.start_time, event.col.end_time, "Yes", "No").subscribe(res => {
                if (res)
                {
                    this.reload();
                }
            });
        }
    }

    setCookie(id, name)
    {
        document.cookie = "himama_user_id = " + id;
        document.cookie = "himama_user_name = " + name;

        this.loginAs = name;
    }

    deleteCookie()
    {
        document.cookie = 'himama_user_id=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';        
        document.cookie = 'himama_user_name=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';        
    }

    reload()
    {
        window.location.reload();
    }

    assign(obj, keyPath, value) {
        let lastKeyIndex = keyPath.length - 1;
        for (var i = 0; i < lastKeyIndex; ++i) {
            let key = keyPath[i];
            if (!(key in obj)) {
                obj[key] = {}
            }
            obj = obj[key];
        }
        obj[keyPath[lastKeyIndex]] = value;
    }
}