import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from "../../_services/databaseService";
import { DialogComponent } from '../../dialog/dialog.component';

import {Router} from "@angular/router";

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html'
})
export class NewsListComponent implements OnInit {
  
  
  loader:any = '';
  progress:any = '';
  start:any = "0";
  pagelimit:any = "1";
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
  login_data:any={};
  constructor(public db:DatabaseService, public dialog:DialogComponent) {
    
  }
  
  ngOnInit() {
    this.login_data = this.db.datauser;
    this.db.setData();
    this.GetUserList();
    console.log(this.login_data);
    
  }
  
  GetUserList(pagelimit:any=10,start:any=0,action:any='')
  {
    this.loader = "1";
    this.progress = "1";
    this.pagelimit = pagelimit;
    this.start = start;
    console.log(this.start);
    console.log(this.login_data);
    
    if(action == "refresh"){
      this.search = {};
    }
    
    this.db.FetchData({'search':this.search,'start':this.start,'pagelimit':this.pagelimit,'data':this.login_data},'User/get_all_news')
    .subscribe((result:any)=>{
      console.log(result);
      this.user = result['data']
      console.log(this.user);
      this.user_count = result['user_count'];
      this.rqst_count = result['count'][0]['totalRecords'];
      console.log(this.rqst_count);
      this.total_page = Math.ceil(this.rqst_count/this.pagelimit);
      this.pagenumber =  Math.ceil(this.start/this.pagelimit)+1;
      this.loader = '';
      this.progress = '';
      
    },error=>{
      console.log(error);
      this.loader = '';
      this.progress = '';
      this.dialog.error('Something went wrong !!! Try again... ');
    });
  }
  
  edit_user(index){
    this.index = index;
    console.log(this.index);
    this.form = Object.assign({}, this.user[index]);
    console.log(this.user);
    console.log(this.form);
    
  }
  
  delete_news(index,newsid:any)
  {
    console.log(index);
    console.log(newsid);
    this.dialog.delete('News Data').then((result)=>{
      console.log(result);
      if(result){
        this.db.FetchData({'newsid':newsid},'User/delete_news')
        .subscribe(res => {
          console.log(res);
          this.lead.splice(index,1);
          this.dialog.success('News has been deleted !');
          this.GetUserList();
        },err=>{
          console.log(err);
          this.dialog.error('Somthing Went wrong! Try Again....');
        }
        )
      }
    })
    
  }
  
  change_status(indx,news_id,status)
  {
    status == 0 ? this.user[indx].status = 1 : this.user[indx].status = 0;
    
    this.loader = "1";
    this.progress = "1";
    this.db.FetchData({'status':this.user[indx].status,'news_id':news_id},'User/change_news_status')
    .subscribe((result:any)=>{
      console.log(result);
      this.loader = '';
      this.progress = '';
      this.GetUserList();
      this.dialog.success('Status Changed Successfully ! ');
      
    },error=>{
      console.log(error);
      this.loader = '';
      this.progress = '';
      this.dialog.error('Something went wrong !!! Try again... ');
    });
    
  }
  
  
  
}
