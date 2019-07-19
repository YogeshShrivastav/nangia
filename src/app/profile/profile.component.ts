import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../_services/databaseService';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user_data:any=[];
  form:any={};
  msg:any;
  msg1:any;
  msg3:any;
  loader:any = '';
  
  constructor(public db:DatabaseService, public dialog:DialogComponent) { }
  
  ngOnInit() 
  {
    this.db.datauser = JSON.parse( localStorage.getItem('access_result') ) || [];
    console.log( this.db.datauser );
    this.user_profile_data();
  }
  
  user_profile_data()
  {
    this.loader = '1';
    
    this.db.FetchData({user_id:this.db.datauser.id},'user/get_user_profile').subscribe(resp=>
      {
        console.log(resp);
        this.user_data=resp;
        this.form = this.user_data;
        this.loader = '';
      })
    }
    
    new_password_type:any = 'password';
    
    check_password(new_password:any,old_password:any,confirm_password:any)
    {
      this.new_password_type = 'text';
      
      if(old_password == new_password)
      {
        this.msg = "New Password is same as Old Password";
      }
      else
      {
        this.msg = "";
      }
      
      if(confirm_password!=undefined)
      {
        if(new_password != confirm_password)
        {
          this.msg1 = "Password is Not Same";
        }
        else
        {
          this.msg1 = "";
        }
      }
      else
      {
        this.msg1 = "";
      }
    }
    
    confirms_password(new_password,confirm_password)
    {
      
      if(new_password != confirm_password)
      {
        this.msg1 = "Password is Not Same";
      }
      else
      {
        this.msg1 = "";
      }
      
      if(new_password==confirm_password)
      {
        this.msg1="";
      }
    }
    
    update()
    {
      console.log(this.form);
      
      this.db.FetchData(this.form,'user/update_user_profile').subscribe(resp=>
        {
          console.log(resp);
          this.user_profile_data();
          
          if(resp==true)
          {
            this.dialog.success('Profile is Updated Successfully');
          }else{
            this.dialog.error('Error');
            
          }
        })
      }
      
      
    }
    