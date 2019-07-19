import { Injectable } from '@angular/core';
import { Router, RouterModule, Routes, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import {SessionStorage} from '../_services/SessionService';
import { DatabaseService } from '../_services/databaseService';
import { JwtHelperService } from '@auth0/angular-jwt';

import { DialogComponent } from './../dialog/dialog.component';


@Injectable()
export class AuthGuard implements CanActivate {
  users: any = [];
  token: any = '';
  current_component:any = '';
  constructor(public router: Router, public db: DatabaseService ,  public dialog: DialogComponent ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    console.log( 'this.router' );
    console.log( this.router );
    console.log( this.router );
    console.log( 'route' );
    console.log( route );
    // console.log( this.router.routerState );
    this.current_component =route.routeConfig.component.name;
    
    console.log(this.current_component );
    
    const expectedRole = route.data.expectedRole || [];
    
    this.db.datauser = JSON.parse( localStorage.getItem('access_result') ) || [];
    console.log( this.db.datauser );
    
    if ( this.db.getSe() && this.db.token && ( !expectedRole.length  || expectedRole.indexOf( parseInt( this.db.datauser.access_level) ) > -1 ) )  
    {
      const helper = new JwtHelperService();
      console.log( this.db.token );
      console.log( this.db.token );
      return true;

    }else if ( this.db.getSe() && this.db.token )  {
      console.log('No Static permission' );
      console.log(this.current_component );
      console.log( this.current_component == 'NewsAddComponent' && this.db.datauser.news_uploader == '1'  );
      
      if( this.current_component == 'NewsAddComponent' && this.db.datauser.news_uploader == '1' )
      return true;
      if( this.current_component == 'KnowledgeDocComponent' && this.db.datauser.add_document == '1' )
      return true;
      if( this.current_component == 'NewsdetailsComponent')
      return true;
      
      this.dialog.error('You have No permission to access page! Redirect you Home Page');
      return  this.db.navigation();
      
      
    }
    this.db.token = '';
    
    this.db.logoutSession();
    this.router.navigate([''], { queryParams: { returnUrl: state.url }});
  }
}
