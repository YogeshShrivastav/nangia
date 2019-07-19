import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DatabaseService } from '../_services/databaseService';

@Component({
  selector: 'app-zoommodle',
  templateUrl: './zoommodle.component.html',
  styleUrls: ['./zoommodle.component.scss']
})
export class ZoommodleComponent implements OnInit {

  image:any='';
  upload_url:any='';
  constructor(private dialogRef: MatDialogRef<ZoommodleComponent>,@Inject(MAT_DIALOG_DATA) data,public db :DatabaseService) { 
      console.log(data);
      this.image = data.image;
    }

  ngOnInit() {
    this.upload_url = this.db.myurl;
  }

  onNoClick()
  {
    
  }

}
