import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from "./../_services/databaseService";
import { DialogComponent } from './../dialog/dialog.component';

import {Router} from "@angular/router";


@Component({
  selector: 'app-user-downloads',
  templateUrl: './user-downloads.component.html'
})
export class UserDownloadsComponent implements OnInit {
  
  
  loader:any = '';
  progress:any = '';
  start:any = "0";
  pagelimit:any = "20";
  search:any = {};
  rqst_count:any = '';
  total_page:any = ''
  lead:any = [];
  lead_count:any = [];
  pagenumber:any = '';
  user:any = [];
  user_count:any = [];
  i:any = 0;
  index:any = '0';
  navigate_type:any = '';
  form:any = {};
  // MobileNumber:any[];
  
  
  
  constructor(public db:DatabaseService, public dialog:DialogComponent) { }
  
  ngOnInit() {
    this.db.setData();
    this.GetUserList();
  }
  
  GetUserList(pagelimit:any=20,start:any=0,action:any='')
  {
    this.loader = "1";
    this.progress = "1";
    this.pagelimit = pagelimit;
    this.start = start;
    console.log(this.start);
    console.log(action);
    
    if(action == "refresh"){
      this.search = {};
    }
    
    this.db.FetchData({'search':this.search,'start':this.start,'pagelimit':this.pagelimit},'Knowledge/get_users_knowledge_base')
    .subscribe((result:any)=>{
      console.log(result);
      this.user = result['data']
      console.log(this.user);
      this.user_count = result['user_count'];
      this.rqst_count = result['count'][0]['totalRecords'];
      console.log(this.rqst_count);
      
      this.total_page = Math.ceil(this.rqst_count/this.pagelimit);
      this.pagenumber = Math.ceil(this.start/this.pagelimit)+1;
      this.loader = '';
      this.progress = '';
      
      
      
    },error=>{
      console.log(error);
      this.dialog.error('Something went wrong !!! Try again... ');
    });
  }
  
  sort:any=false;
  sort_by_name()
  {
    console.log(this.sort);
    if(this.sort)
    {
      this.search.sort_by = "name";
    }
    else
    {
      this.search={};
    }
    this.GetUserList();
  }
  
  
  edit_user(index){
    this.index = index;
    console.log(this.index);
    this.form = Object.assign({}, this.user[index]);
    console.log(this.user);
    console.log(this.form);
    
  }
  
  delete_user(index,userid:any){
    console.log(index);
    console.log(userid);
    this.dialog.delete('Lead Data').then((result)=>{
      console.log(result);
      if(result){
        this.db.FetchData({'userid':userid},'User/delete_user')
        .subscribe(res => {
          console.log(res);
          this.lead.splice(index,1);
          this.dialog.success('Deleted Lead has been deleted');
          this.GetUserList();
        },err=>{
          console.log(err);
          this.dialog.error('Somthing Went wrong! Try Again....');
        }
        )
      }
    })
    
  }
  
  
  
  
  
}
