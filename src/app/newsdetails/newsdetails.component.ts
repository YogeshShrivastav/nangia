import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ZoommodleComponent } from '../zoommodle/zoommodle.component';
import { ActivatedRoute } from '@angular/router';
import { DatabaseService } from '../_services/databaseService';


@Component({
  selector: 'app-newsdetails',
  templateUrl: './newsdetails.component.html'
  // styleUrls: ['./newsdetails.component.scss']
})
export class NewsdetailsComponent implements OnInit {
  
  formm:any;
  loader:any='';
  news_id:any=0;
  upload_url:any='';
  constructor(public dialog: MatDialog,public route:ActivatedRoute,public db:DatabaseService) {
    this.route.params.subscribe(resp=>{
      this.news_id = this.db.crypto(resp['id'],false);
      console.log(this.news_id);
    })
  }
  
  ngOnInit() {
    this.get_news_detail();
    this.upload_url = this.db.myurl;
  }
  
  openDialog(image): void {
    const dialogRef = this.dialog.open(ZoommodleComponent, {
      width: '1024px',
      data: {
        image : image
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    
  }
  
  news_data:any={};
  news_image:any=[];
  get_news_detail()
  {
    this.loader='1';
    this.db.FetchData({'news_id':this.news_id},"User/get_news_detail")
    .subscribe(resp=>{
      console.log(resp);
      this.news_data = resp['news_data'];
      this.news_image = resp['news_image'];
      this.loader='';
    })
  }

  // change_status()
  // {
  //   console.log(this.news_data.status);
  //   this.news_data.status = !this.news_data.status;
  // }
}
