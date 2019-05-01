import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../app.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from 'angular5-social-login';
import { RecapchaModule } from '../recapcha/recapcha.module';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';

// import { RecapchaComponent } from '../recapcha/recapcha.component';
import {AuthServiceConfig , SocialLoginModule} from 'angular5-social-login';
// import {provideConfig} from '../app.module';
const loginRoutes: Routes = [
  { path: '', component: LoginComponent }
];
export function provideConfig() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('230320559604-67srei5t0tretdu5hcskccia6df5qatq.apps.googleusercontent.com')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('346354716089456')
    }

  ]);
  return config;
}
@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes),
    MaterialModule,
    CommonModule,
    SocialLoginModule,
    RecapchaModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },

    AuthService],
  declarations: [
    LoginComponent,
  ]
})
export class LoginModule { }
