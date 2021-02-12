import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialmodule } from './angular-material.module'; //materials
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AutoFocusDirective } from './auto-focus.directive';
import { PostsCreateComponent } from './posts/posts-create/posts-create.component';
import { PostListComponent } from './posts/post-list/post-list.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LogoutDialogComponent } from './main-nav/logout-dialog/logout-dialog.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { SnackBarComponent } from './auth/snack-bar/snack-bar.component';
import { ErrorInterceptor } from './error-interceptor';
import { ErrorComponent } from './error/error.component';
import { AuthRoutingModule } from './auth/auth-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    PostsCreateComponent,
    PostListComponent,
    MainNavComponent,
    AutoFocusDirective,
    SnackBarComponent,
    ErrorComponent,
    LogoutDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    LayoutModule,
    AngularMaterialmodule, //materials
    AuthRoutingModule // login and signup routing
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ErrorComponent, SnackBarComponent]
})
export class AppModule { }
