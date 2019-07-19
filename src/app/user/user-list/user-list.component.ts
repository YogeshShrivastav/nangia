import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from "../../_services/databaseService";
import { DialogComponent } from '../../dialog/dialog.component';

import {Router, ActivatedRoute} from "@angular/router";
// import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  loader:any = '';
  progress:any = '';
  start:any = "";
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

  constructor(public db:DatabaseService, public dialog:DialogComponent,public route:ActivatedRoute) {
    this.route.params.subscribe(resp=>{
      console.log(resp);
      this.start = resp['pagestart'];
    })
   }

  ngOnInit() {
    this.db.setData();
    this.get_role();
    this.GetUserList(50,this.start,'');
  }

  refresh()
  {
    this.start = 0;
    this.GetUserList(50,this.start,'')
  }

  GetUserList(pagelimit,start,action) 
  {
    this.loader = "1";
    this.progress = "1";
    this.pagelimit = parseInt(pagelimit);
    this.start = parseInt(start);
    console.log(this.start);
    console.log(action);

    if(action == "refresh"){
      this.search = {};
    }

    console.log(this.start);
    console.log("start");
    
    this.db.FetchData({'search':this.search,'start':this.start,'pagelimit':this.pagelimit},'User/get_all_user')
    .subscribe((result:any)=>{
      console.log(result);
      this.user = result['data']
      
      console.log(this.user);

      for(var i=0;i<this.user.length;i++)
      {
        this.user[i]["active"]=true;
      }

      this.user_count = result['user_count'];
      this.rqst_count = result['count'][0]['totalRecords'];
      console.log(this.rqst_count);
      
      this.total_page = Math.ceil(this.rqst_count/this.pagelimit);
      this.pagenumber = Math.ceil(this.start/this.pagelimit)+1;
      this.loader = '';
      this.progress = '';
      console.log(this.pagenumber);
      console.log(this.total_page);
      
      

    },error=>{
      console.log(error);
      this.loader = '';
      this.progress = '';
      this.dialog.error('Something went wrong !!! Try again... ');
    });
  }
  
  role_list:any=[];
  get_role()
  {
    this.db.FetchData({'access_level':this.db.datauser.access_level},"User/get_role")
    .subscribe(resp=>{
      console.log(resp);
      this.role_list = resp;
    })
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
    this.GetUserList(50,this.start,'');
  }

  active:any = {};
  type:any='';
  toggleterritory(key,action,index)
  {
    if(action == 'open')
    { 
      this.type="password";      
      this.user[index].active = true;
    }
    if(action == 'close')
    { 
      this.type="text";     
      this.user[index].active = false;
    }
  }


edit_user(index){
  this.index = index;
  console.log(this.index);
  //this.db.navigate_type = '1';
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
        this.dialog.success('User has been deleted !');
        this.GetUserList(50,this.start,'');
      },err=>{
        console.log(err);
        this.dialog.error('Somthing Went wrong! Try Again....');
      }
      )
    }
  })

}


 


}
