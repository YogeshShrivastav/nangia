import * as Msal from 'msal'

import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { DatabaseService } from "./../_services/databaseService";
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-m-login',
  templateUrl: './m-login.component.html'
})
export class MLoginComponent  {
constructor(){


}
 
applicationConfig : any = {
    clientID: "0b27c770-00d2-4612-ae98-33dc728d6c9f",
    authority: "https://login.microsoftonline.com/MYTENANTID",
    graphScopes: ["https://management.azure.com/user_impersonation"],
    graphEndpoint: "https://graph.microsoft.com/v1.0/me"
};

// userAgentApplication:any = new Msal.UserAgentApplication( this.applicationConfig.clientID );


headers:any = new Headers();


// clicked(){
//     console.log('clicked');
//     this.userAgentApplication.loginPopup(this.applicationConfig.graphScopes).then(function (idToken) {
//         this.userAgentApplication.acquireTokenSilent(this.applicationConfig.graphScopes).then(function (accessToken) {
//             var bearer = "Bearer " + accessToken;
//             this.headers.append("Authorization", bearer);
//             var options = {
//                 method: "GET",
//                 headers: this.headers
//             };
//             var endpoint = "https://management.azure.com/subscriptions?api-version=2016-06-01";
//             fetch(endpoint, options).then(function (response) {
//                 var body = response.body;
//             });
//         }, function (error) {
//         });
//     }, function (error) {
//         //login failure
//     });



// }

}