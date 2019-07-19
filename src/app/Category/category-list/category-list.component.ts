import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../_services/databaseService";

import { DialogComponent } from '../../dialog/dialog.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html'
})
export class CategoryListComponent implements OnInit {
  subCat:any=[];
  allCat:any=[];
  cat=false;
  loader:any = '';
  constructor(public db:DatabaseService , public dialog:DialogComponent) { }
  
  ngOnInit() {
    this.db.setData();
    this.getAllCat();
  }
  getAllCat()
  {
    this.loader = "1";
    this.db.FetchData({},'Category/get_category_list')
    .subscribe((result)=>{
      console.log(result);   
      this.allCat=result['data'];     
    this.loader = "";
    console.log(this.allCat);
    });   
  } 
  len= 0;
  getAllSubCat(category_id,pop)
  { 
    if(category_id > 0)    
    console.log("hello Sub Category");
    this.db.FetchData({'category_id':category_id},'Category/get_subcategory_by_categoryId/' +category_id)
    .subscribe((result)=>{
      this.subCat=result;      
      console.log("subCategory");          
      console.log(this.subCat);
      console.log("ending Sub Category");
      
    });
    if(this.allCat!="")
    {
      this.subCat=[];
    }
    
  }
  
  newFreshData:any=[];
  deleteFunction(category_id , level){
    console.log( category_id);
    
    this.db.FetchData({ 'category_id' : category_id ,'level' : level },"Category/delete_category")
    .subscribe( r => {
      console.log(r);
      if( r == 'Exist' ){
        this.dialog.warning('This category already reserved!');
        return;
      }
      this.getAllCat();
      this.dialog.warning('Category Deleted Successfully!');
      
    }); 
    
  }
  
  
  
  
}