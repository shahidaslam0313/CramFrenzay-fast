import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RatingModule } from 'ng2-rating';
import { SlickModule } from 'ngx-slick';
import { MatTableModule } from '@angular/material/table';
import { GlobalService } from './global.service';
import { SocialLoginModule, AuthService } from 'angular5-social-login';
import { TextMaskModule } from 'angular2-text-mask';
import { CountdownModule } from 'ng2-countdown-timer';
import { WinbidDialogComponent } from '../app/userdashboard/winbid-dialog/winbid-dialog.component';
import { AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider } from 'angular5-social-login';
import { JwSocialButtonsModule } from 'jw-angular-social-buttons';

import {
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatIconModule,
  MatCheckboxModule,
  MatInputModule,
  MatSelectModule,
  MatTabsModule, MatSlideToggleModule, MatNativeDateModule, MatButtonModule,
} from '@angular/material';

import { Routing } from './app.routing';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SimpleGlobal } from 'ng2-simple-global';
import { LoaderModule } from './loader/loader.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component';
import { DataService } from './data.service';
import { PagerService } from './paginator.service';
import { MycourceService } from './mycource.service';
import { headerservice } from './includes/header/header.service';
import { BidHistoryService } from './bid-history/bid-history.service';
import { FooterService } from './includes/footer/footer.service';
import { ActivateAccountService } from './activate-account/activate-account.service';
import { LoginService } from './login/login.service';
import { SignupService } from './signup/signup.service';
import { WishlistService } from './wishlist/wishlist.service';
import { GeneralsearchService } from './generalsearch/generalsearch.service';
import { BiditemsService } from './userdashboard/biditems/biditems.service';
//  MainPage Module
import { mainpageservice } from './MainPage/mainpage/mainpage.service';
import { SeemorempService } from './MainPage/seemoremp/seemoremp.service';
//  NotesGenie Module
import { categorywisenotesservice } from './NotesGenie/category-wise-notes/category-wise-notes.service';
import { NgseemoreService } from './NotesGenie/ngseemore/ngseemore.service';
import { NotesService } from './NotesGenie/notes/notes.service';
import { notescategoryservice } from './NotesGenie/notes-category/notes-category.service';
import { NotessearchService } from './NotesGenie/notessearch/notessearch.service';
import { notesgenieservice } from './NotesGenie/notesgenie/notesgenie.service';
//  Books Module
import { booksservice } from './Books/books/books.service';
import { detailservice } from './Books/detail/detail.service';
import { BookcategoryService } from './Books/bookcategory/bookcategory.service';
import { AllbooksService } from './Books/allbooks/allbooks.service';
import { SearchbooksService } from './Books/searchbooks/searchbooks.service';
import { BookseemoreService } from './Books/bookseemore/bookseemore.service';
//  Event Module
import { InstituteeventsService } from './Events/instituteevents/instituteevents.service';
import { InstituteService } from './Events/institute/institute.service';
import { EventsService } from './Events/events/events.service';
import { UpcomingeventsService } from './Events/upcomingevents/upcomingevents.service';
//  Scholarships Module
import { SearchscholarshipService } from './Scholarships/searchscholarship/searchscholarship.service';
import { ScholarshipService } from './Scholarships/scholarship/scholarship.service';
import { ScholarshipdetailService } from './Scholarships/scholarshipdetail/scholarshipdetail.service';
import { ScholarshiplistService } from './Scholarships/scholarshiplist/scholarshiplist.service';
import { ScholarshiplistdetailService } from './Scholarships/scholarshiplistdetail/scholarshiplistdetail.service';
import { UpcomingscholarshipService } from './Scholarships/upcomingscholarship/upcomingscholarship.service';
//  Courses Module
import { subcategoryservice } from './Course/subcategory/subcategory.service';
import { CourseService } from './Course/course/course.service';
import { EachcourseService } from './Course/eachcourse/eachcourse.service';
import { CoursesearchService } from './Course/coursesearch/coursesearch.service';
//  import { CoursesmService } from './Course/coursesm/coursesm.service';
import { categoriesservice } from './Course/categories/categories.service';
import { NormalLayoutComponent } from './normal/normal-layout.component';
//  FlashCard Module
import { flashcardservice } from './FlashCard/flashcard/flashcard.service';
import { FlashcardlistService } from './FlashCard/flashcardlist/flashcardlist.service';
import { FlashsearchService } from './FlashCard/flashsearch/flashsearch.service';
import { FcseemoreService } from './FlashCard/fcseemore/fcseemore.service';
import { fcdetailservice } from './FlashCard/fcdetail/fcdetail.service';
import { MainpageComponent } from './MainPage/mainpage/mainpage.component';
import { cardsubcategoryeservice } from './FlashCard/flashcard-subcategory/flashcard-subcategory.service'
//  Tutors Module
import { TeachersService } from './Tutors/teachers/teachers.service';
import { TutorregistrationService } from './Tutors/tutorregistration/tutorregistration.service';
import { FindtutorService } from './Tutors/findtutor/findtutor.service';
import { TutorsearchService } from './Tutors/tutorsearch/tutorsearch.service';
import { tutorservice } from './Tutors/tutor/tutor.service';
//  Footer Module
import { contactusService } from './Footer/contactus/contactus.service';
import { BecomepartnerService } from './Footer/becomepartner/becomepartner.service';
// Userdahboard Module
import { PurchaseService } from './userdashboard/purchase/purchase.service';
import { uploadservice } from './userdashboard/upload/upload.service';
import { uploadnotesservice } from './userdashboard/uploadnotes/uploadnotes.service';
import { UserprofileService } from './userdashboard/userprofile/userprofile.service';
import { ChangePasswordService } from './userdashboard/change-password/change-password.service';
import { MylibraryService } from './userdashboard/mylibrary/mylibrary.service';
import { ChangePasswordComponent } from './userdashboard/change-password/change-password.component';
import { PaymentComponent } from './userdashboard/payment/payment.component';
import { paymentservice } from './userdashboard/payment/payment.service';
import { uploadbookservice } from './userdashboard/uploadbook/uploadbook.service';
import { uploadcardservice } from './userdashboard/uploadcard/uploadcard.service';
import { AddtocartService } from '././addtocart/addtocart.service';
import { CarddetailService } from './service/carddetail.service';
import { FlashcardetailService } from './userdashboard/flashcarddetail/flashcardetail.service';
import { AddtocartComponent } from './addtocart/addtocart.component';
import { InstitutedetailService } from './institutedashboard/institutedetail/institutedetail.service';
import { AddscholarshipService } from './institutedashboard/addscholarship/addscholarship.service';
import { AddeventsService } from './institutedashboard/addevents/addevents.service';
// { path: 'addevents', loadChildren: './institutedashboard/addevents/addeventsupload.module#AddeventsModule', canActivate: [Auth2Service] },
import { InstitutelibraryService } from './institutedashboard/institutelibrary/institutelibrary.service';
import { AuthguardService } from './authguard.service';
import { Auth2Service } from './auth2.service';
import { AdminLayoutComponent } from './adminlayout/admin-layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { DashboardService } from './admin/dashboard/dashboard.service';
import { PartnersService } from './admin/partners/partners.service';
import { CoursevideoService } from './userdashboard/coursevideo/coursevideo.service';
import { AcceptofferComponent } from './acceptoffer/acceptoffer.component';
import { OfferactivityComponent , OfferactivityPaymentComponent } from './userdashboard/offeractivity/offeractivity.component';
import { OfferactivityService } from './userdashboard/offeractivity/offeractivity.service';
import { NestedcateroyComponent } from './nestedcateroy/nestedcateroy.component';
import { NestedcategorylistComponent } from './nestedcategorylist/nestedcategorylist.component';
import {NestedcategorylistService} from './nestedcategorylist/nestedcategorylist.service';
import { categorywisecourseservice } from './Course/course-subcategory/course-subcategory.service';
import {CoursesmService} from './Course/coursesm/coursesm.service';
import {VgBufferingModule} from "videogular2/buffering";
import {VgCoreModule} from "videogular2/core";
import {VgOverlayPlayModule} from "videogular2/overlay-play";
import {VgControlsModule} from "videogular2/controls";
import {AddVideoComponent, IntroVideoComponent} from "./userdashboard/coursevideo/coursevideo.component";
import {VideoShowDialogComponent} from "./userdashboard/coursevideo/video-show-dialog/video-show-dialog.component";
import {CoursevideoComponent} from "./userdashboard/coursevideo/coursevideo.component";
import {EachcourseComponent} from "./Course/eachcourse/eachcourse.component";
import { MycartComponent } from './userdashboard/mycart/mycart.component';
import { MycartService } from './userdashboard/mycart/mycart.service';
import { PendingoffersComponent } from './userdashboard/pendingoffers/pendingoffers.component';
import { PendingoffersService } from './userdashboard/pendingoffers/pendingoffers.service';
// import { PagerServicenew } from './pager.service';
// import { NeutronRatingModule } from 'neutron-star-rating';
// import { ChatComponent } from './chat/chat.component';
//  import { FlashcardSubcategoryComponent } from './FlashCard/flashcard-subcategory/flashcard-subcategory.component';

//  import { CourseSubcategoryComponent } from './Course/course-subcategory/course-subcategory.component';
export function provideConfig() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider('230320559604-67srei5t0tretdu5hcskccia6df5qatq.apps.googleusercontent.com')
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider('2243800905848514')
    }

  ]);
  return config;
}

@NgModule({
  exports: [
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatTabsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    SlickModule,
    MatIconModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  declarations: [],
})

export class MaterialModule { }

@NgModule({

  imports: [

    BrowserModule.withServerTransition({appId: 'CramFrenzy'}),
    BrowserTransferStateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    BrowserAnimationsModule,
    // NeutronRatingModule,
    MatInputModule,
    VgBufferingModule,
    VgCoreModule,
    VgOverlayPlayModule,
    VgControlsModule,
    LoaderModule,
    CountdownModule,
    MatButtonModule,
    HttpModule,
    Routing,

    HttpClientModule,
    RatingModule,
    SocialLoginModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    TextMaskModule,
    JwSocialButtonsModule,

  ],
  declarations: [
    AdminLayoutComponent,
    SidebarComponent,
    AppComponent,
    HeaderComponent,
    CoursevideoComponent,
    FooterComponent,
    ChangePasswordComponent,
    PaymentComponent,
    NormalLayoutComponent,
    MainpageComponent,
    WinbidDialogComponent,
    AcceptofferComponent,
    OfferactivityComponent,
    OfferactivityPaymentComponent,
      NestedcateroyComponent,
    EachcourseComponent,
      NestedcategorylistComponent,
    AddVideoComponent,
    IntroVideoComponent ,
    VideoShowDialogComponent,
    MycartComponent,
    PendingoffersComponent
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    AddtocartComponent,
    SimpleGlobal,
    DataService,
    PendingoffersService,
    PagerService,
    // PagerServicenew,
    GlobalService,
    BidHistoryService,
    MycourceService,
    DashboardService,
    AuthService,
    headerservice,
    MycartService,
    FooterService,
    CoursevideoService,
    FooterService,
    ActivateAccountService,
    SignupService,
    LoginService,
    FormBuilder,
    WishlistService,
    GeneralsearchService,
    AddtocartService,
    PartnersService,
    PurchaseService,
    OfferactivityService,
    uploadservice,
    uploadservice,
    uploadnotesservice,
    uploadbookservice,
    uploadcardservice,
    //  UserprofileService,
    ChangePasswordService,
    UserprofileService,
    paymentservice,
    MylibraryService,
    FlashcardetailService,
    AuthguardService,
    InstitutedetailService,
    AddscholarshipService,
    AddeventsService,
    InstitutelibraryService,
    CarddetailService,
    categorywisenotesservice,
    NgseemoreService,
    NotesService,
    notescategoryservice,
    NotessearchService,
    notesgenieservice,
    BiditemsService,
    Auth2Service,
    AllbooksService,
    SearchbooksService,
    BookseemoreService,
    BookcategoryService,
    booksservice,
    detailservice,
    PagerService,
    // Event Module
    EventsService,
    InstituteeventsService,
    UpcomingeventsService,
    InstituteService,
    // Scholarships Module
    UpcomingscholarshipService,
    SearchscholarshipService,
    ScholarshipService,
    ScholarshipdetailService,
    ScholarshiplistService,
    ScholarshiplistdetailService,
    // Courses Module
    CourseService,
      CoursesmService,
    EachcourseService,
    CoursesearchService,
    subcategoryservice,
    categoriesservice,
    categorywisecourseservice,
    // FlashCards Module
    flashcardservice,
    FlashcardlistService,
    FlashsearchService,
    cardsubcategoryeservice,
    fcdetailservice,
    FcseemoreService,
    // Tutors Module
    TutorregistrationService,
    tutorservice,
    FindtutorService,
    TutorsearchService,
    TeachersService,
    // MainPage Module
    mainpageservice,
    SeemorempService,
    // Footer Module
    contactusService,
    BecomepartnerService,
      NestedcategorylistService
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  entryComponents: [
    WinbidDialogComponent,
    AcceptofferComponent,
    OfferactivityPaymentComponent,
      NestedcateroyComponent,NestedcategorylistComponent,
    AddVideoComponent,
    IntroVideoComponent ,
    VideoShowDialogComponent

  ],

  bootstrap: [AppComponent]
})

export class AppModule { }
//  {"status":"OK","code":200,"data":{"status":"Successfully Downloaded"}}
