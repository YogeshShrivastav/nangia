import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { AuthService } from "../app/auth.service";
// import { AuthgurdService } from "../app/gaurd/authgurd.service";



import { AuthGuard } from './_guards/authGuard';
import { AuthGuardLog } from './_guards/authGuardLog';
import { DatabaseService } from './_services/databaseService';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { DialogComponent } from './dialog/dialog.component';

import { LoginComponent } from './login/login.component';
import { MaterialModule } from './material';
import { HeaderComponent } from './header/header.component';
import { KnowledgeDocComponent } from './knowledge/knowledge-doc/knowledge-doc.component';
import { KnowledgeListComponent } from './knowledge/knowledge-list/knowledge-list.component';
import { CategoryModalComponent } from './knowledge/category-modal/category-modal.component';
import { SubCategoryModalComponent } from './knowledge/sub-category-modal/sub-category-modal.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { EdituserComponent } from './user/edituser/edituser.component';
import { KnowledgeDetailComponent } from './knowledge/knowledge-detail/knowledge-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './Category/add-category/add-category.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { AddCategoryModuleComponent } from './Category/add-category-module/add-category-module.component';
import { AddSubCategoryModuleComponent } from './Category/add-sub-category-module/add-sub-category-module.component';
import { MydocumentComponent } from './mydocument/mydocument.component';
import { MydocdetailComponent } from './mydocdetail/mydocdetail.component';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { KnowledgeEditComponent } from './knowledge/knowledge-edit/knowledge-edit.component';
import { UserDownloadsComponent } from './user-downloads/user-downloads.component';
import { MyDownloadComponent } from './my-download/my-download.component';
import { MyUploadComponent } from './my-upload/my-upload.component';
import { KnowledgeRequestModalComponent } from './knowledge/knowledge-request-modal/knowledge-request-modal.component';

import { PushNotificationsModule } from 'ng-push';
import { ReloginComponent } from './relogin/relogin.component';
import { UserDownloadExceedComponent } from './user-download-exceed/user-download-exceed.component';
import { TagLisitComponent } from './tag-lisit/tag-lisit.component'; //import the module

import { ConvertArray } from './_pipes/ConvertArray.pipe';
import { StrReplace } from './_pipes/StrReplace.pipe';
import { Crypto } from './_pipes/Crypto.pipe';
import { DatePikerFormat } from './_pipes/DatePikerFormat.pipe';
import { NewsAddComponent } from './news/news-add/news-add.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { RecycleKnowledgeComponent } from './knowledge/recycle-knowledge/recycle-knowledge.component';
import { RejectKnowledgeComponent } from './knowledge/reject-knowledge/reject-knowledge.component';
import { ReportsComponent } from './reports/reports.component';
// import { NewComponent } from './new/new.component';
import { NewsdetailsComponent } from './newsdetails/newsdetails.component';
import { ZoommodleComponent } from './zoommodle/zoommodle.component';
import { ProfileComponent } from './profile/profile.component';
import { MLoginComponent } from './m-login/m-login.component';
// import { PathLocationStrategy, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MomentModule } from 'angular2-moment';

const routes: Routes = [
    { path: "", component:LoginComponent , canActivate:[AuthGuardLog]   },
    { path: "dashboard", component: DashboardComponent,canActivate:[AuthGuard]  , data: { expectedRole: [1,4,3,2] } },
    { path: "knowledge-doc", component: KnowledgeDocComponent , canActivate:[AuthGuard]  , data: { expectedRole: [1,4,2] } },
    { path: "knowledge-edit/:id", component: KnowledgeEditComponent,canActivate:[AuthGuard] , data: { expectedRole: [1,4] }},
    
    { path: "reject-knowledge", component: RejectKnowledgeComponent ,canActivate:[AuthGuard]  , data: { expectedRole: [1,4,3] } },
    
    { path: "knowledge-list", component: KnowledgeListComponent ,canActivate:[AuthGuard]  , data: { expectedRole: [1,4,2,3] } },
    { path: "knowledge-detail/:id", component: KnowledgeDetailComponent ,canActivate:[ AuthGuard ]},
    { path: "knowledge-detail/:id/:user_id", component: KnowledgeDetailComponent ,canActivate:[ AuthGuard ]},
    { path: "add-user", component: AddUserComponent,canActivate:[ AuthGuard ]},
    { path: "user-list/:pagestart", component: UserListComponent,canActivate:[ AuthGuard ]},
    { path: "user-detail/:id", component: UserDetailComponent,canActivate:[ AuthGuard ]},
    { path: "edituser/:id/:pagestart", component: EdituserComponent,canActivate:[ AuthGuard ] , data: { expectedRole: [1,4] }},
    { path: "category-list", component:CategoryListComponent,canActivate:[ AuthGuard ]},
    { path: "add-category", component:AddCategoryComponent,canActivate:[ AuthGuard ]},
    { path: "mydocument", component:MydocumentComponent,canActivate:[ AuthGuard ]},
    { path: "mydocdetail/:id", component:MydocdetailComponent,canActivate:[ AuthGuard] },
    { path: "user-download-list", component:UserDownloadsComponent,canActivate:[ AuthGuard ] , data: { expectedRole: [1,4,3] }},
    { path: "my-download", component:MyDownloadComponent,canActivate:[ AuthGuard ]},
    { path: "my-download/:id", component:MyDownloadComponent,canActivate:[ AuthGuard ]},
    { path: "my-upload", component:MyUploadComponent,canActivate:[ AuthGuard ]},
    
    { path: "download-exceed", component:UserDownloadExceedComponent,canActivate:[ AuthGuard ]  , data: { expectedRole: [1,4,3] }},
    { path: "tags", component:TagLisitComponent,canActivate:[ AuthGuard ]  },
    { path: "news-add", component: NewsAddComponent ,canActivate:[ AuthGuard ]  , data: { expectedRole: [1,2,4] }  },
    { path: "news-lisit", component: NewsListComponent ,canActivate:[ AuthGuard ]   },
    { path: "recycle", component: RecycleKnowledgeComponent ,canActivate:[ AuthGuard ]  ,   data: { expectedRole: [1,4] }  },
    { path: "reports", component: ReportsComponent ,canActivate:[ AuthGuard ]  ,   data: { expectedRole: [1,4] }  },
    { path: "newsdetails/:id", component:NewsdetailsComponent ,canActivate:[AuthGuard] },
    // { path: "newsdetails/:id", component:NewsdetailsComponent ,canActivate:[AuthGuard] , data:{expectedRole: [1,4]}},
    { path: "profile", component:ProfileComponent ,canActivate:[AuthGuard]},
    { path: '**', redirectTo: ''}
    
];


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        KnowledgeDocComponent,
        KnowledgeListComponent,
        CategoryModalComponent,
        SubCategoryModalComponent,
        AddUserComponent,
        UserListComponent,
        UserDetailComponent,
        EdituserComponent,
        KnowledgeDetailComponent,
        DashboardComponent,
        AddCategoryComponent,
        CategoryListComponent,
        AddCategoryModuleComponent,
        AddSubCategoryModuleComponent,
        MydocumentComponent,
        MydocdetailComponent,
        KnowledgeEditComponent,
        UserDownloadsComponent,
        MyDownloadComponent,
        MyUploadComponent,
        KnowledgeRequestModalComponent,
        DialogComponent,
        ReloginComponent,
        UserDownloadExceedComponent,
        TagLisitComponent,
        Crypto,
        StrReplace,
        ConvertArray,
        DatePikerFormat,
        NewsAddComponent,
        NewsListComponent,
        RecycleKnowledgeComponent,
        RejectKnowledgeComponent,
        ReportsComponent,
        // NewsComponent,
        NewsdetailsComponent,
        ZoommodleComponent,
        ProfileComponent,
        MLoginComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MaterialModule,
        RouterModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        AutocompleteLibModule,
        PushNotificationsModule,
        MomentModule
    ],
    
    entryComponents: [
        CategoryModalComponent,
        SubCategoryModalComponent,
        AddCategoryModuleComponent,
        AddSubCategoryModuleComponent,
        KnowledgeRequestModalComponent,
        ReloginComponent,
        NewsAddComponent,
        ZoommodleComponent
    ],
    providers: [      
        AuthGuard,
        AuthGuardLog,
        DatabaseService,
        DialogComponent,
        // {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
