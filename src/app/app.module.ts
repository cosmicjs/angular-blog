import { BrowserModule } from '@angular/platform-browser';
import { NgModule, enableProdMode } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { AuthGuard } from './services/auth-guard.service';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DropdownModule } from "ngx-dropdown";
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AllblogsComponent } from './components/allblogs/allblogs.component';
import { SinglepostComponent } from './components/singlepost/singlepost.component';
import { UsersinglepostComponent } from './components/usersinglepost/usersinglepost.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CosmicService} from './services/cosmic.service'
import { NgxEditorModule } from 'ngx-editor';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AllblogsComponent,
    SinglepostComponent,
    UsersinglepostComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
        
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    DropdownModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot([
    ]),
    NgxEditorModule,
    AngularFontAwesomeModule,    
  ],
  exports: [BsDropdownModule, TooltipModule, ModalModule],
  providers: [HttpClient, AuthGuard, CosmicService],
  bootstrap: [AppComponent]
})
export class AppModule {


}

