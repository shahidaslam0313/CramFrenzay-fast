import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './userdashboard/change-password/change-password.component';
import { PaymentComponent } from './userdashboard/payment/payment.component';
import { NormalLayoutComponent } from './normal/normal-layout.component';
import { MainpageComponent } from './MainPage/mainpage/mainpage.component';
import { Auth2Service } from './auth2.service';
import { AdminLayoutComponent } from './adminlayout/admin-layout.component';
import { AcceptofferComponent } from './acceptoffer/acceptoffer.component';
import { OfferactivityComponent } from './userdashboard/offeractivity/offeractivity.component';
import { HeaderComponent } from './includes/header/header.component';
import {FooterComponent} from './includes/footer/footer.component';
import {NestedcateroyComponent} from './nestedcateroy/nestedcateroy.component';
import { NestedcategorylistComponent } from './nestedcategorylist/nestedcategorylist.component';

export const appRoutes: Routes = [
  { path: '', component: MainpageComponent },
  { path : 'header' , component: HeaderComponent},
    { path : 'footer' , component: FooterComponent},
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: 'dashboard/:name', loadChildren: './admin/dashboard/dashboard.module#DashboardModule' },
      { path: 'partners', loadChildren: './admin/partners/partners.module#PartnersModule' },
    ],

  },
  {
    path: '',
    component: NormalLayoutComponent,
    children: [
      //MainPage Module
      { path: 'seemoremp/:name', loadChildren: './MainPage/seemoremp/seemoremp.module#SeemorempModule' },
      { path: 'acceptoffer', component: AcceptofferComponent },
      { path : 'offeractivity' , component: OfferactivityComponent},
        { path : 'nestedcateroy/:id' , component: NestedcateroyComponent},
        { path : 'nestedcategorylist/:id' , component: NestedcategorylistComponent},
      { path: 'generalsearch/:name', loadChildren: './generalsearch/generalsearch.module#GeneralsearchModule' },
      { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
      { path: 'login', loadChildren: './login/login.module#LoginModule' },
      { path: 'activateaccount/:code', loadChildren: './activate-account/activate_account.module#ActivateAccountModule' },
      { path: 'wishlist', loadChildren: './wishlist/wishlist.module#WishlistModule' },
      { path: 'addtocart', loadChildren: './addtocart/addtocart.module#AddtocartModule' },
      { path: 'bid-history', loadChildren: './bid-history/bid-history.module#BidHistoryModule' },
      { path: 'bid-history', loadChildren: './recapcha/recapcha.module#RecapchaModule' },
      ///institute dashboard /////
      { path: 'institutedetail', loadChildren: './institutedashboard/institutedetail/institutedetail.module#InstitutedetailModule', canActivate: [Auth2Service] },
      { path: 'institutedetail/:name', loadChildren: './institutedashboard/institutedetail/institutedetail.module#InstitutedetailModule', canActivate: [Auth2Service] },
      { path: 'addscholarship', loadChildren: './institutedashboard/addscholarship/addscholarship.module#AddscholarshipModule', canActivate: [Auth2Service] },
      { path: 'addevents', loadChildren: './institutedashboard/addevents/addevents.module#AddeventsModule', canActivate: [Auth2Service] },
      { path: 'institutelibrary', loadChildren: './institutedashboard/institutelibrary/institutelibrary.module#InstitutedetailModule', canActivate: [Auth2Service] },
      //Userdashboard Module
      { path: 'coursevideo', loadChildren: './userdashboard/coursevideo/coursevideo.module#CoursevideoModule', canActivate: [Auth2Service] },
      { path: 'experience', loadChildren: './userdashboard/experience/experience.module#ExperienceModule' },
      { path: 'paymentmethods', loadChildren: './userdashboard/paymentmethods/paymentmethods.module#PaymentmethodsModule' },
      { path: 'biddingactivity', loadChildren: './userdashboard/biditems/biditems.module#BiditemsModule', canActivate: [Auth2Service] },
      { path: 'userprofile', loadChildren: './userdashboard/userprofile/userprofile.module#UserprofileModule', canActivate: [Auth2Service] },
      { path: 'userprofile/:name', loadChildren: './userdashboard/userprofile/userprofile.module#UserprofileModule', canActivate: [Auth2Service] },
      { path: 'upload', loadChildren: './userdashboard/upload/upload.module#UploadModule', canActivate: [Auth2Service] },
      { path: 'uploadnotes', loadChildren: './userdashboard/uploadnotes/uploadnotes.module#UploadnotesModule', canActivate: [Auth2Service] },
      { path: 'uploadcard', loadChildren: './userdashboard/uploadcard/uploadcard.module#UploadcardModule', canActivate: [Auth2Service] },
      { path: 'uploadbook', loadChildren: './userdashboard/uploadbook/uploadbook.module#UploadbookModule', canActivate: [Auth2Service] },
      { path: 'Bought', loadChildren: './userdashboard/purchase/purchase.module#PurchaseModule' },
      { path: 'winloss', loadChildren: './userdashboard/winloss/winloss.module#WinlossModule' },
      { path: 'mylibrary', loadChildren: './userdashboard/mylibrary/mylibrary.module#MylibraryModule', canActivate: [Auth2Service] },
      { path: 'change-password', component: ChangePasswordComponent, canActivate: [Auth2Service] },
      { path: 'flashcarddetail/:id', loadChildren: './userdashboard/flashcarddetail/flashcarddetail.module#FlashcarddetailModule', canActivate: [Auth2Service] },
      { path: 'payment', component: PaymentComponent },
      { path: 'forgotpassword/:forgotcode', loadChildren: './forgotpassword/forgotpassword.module#ForgotpasswordModule' },
      //NotesGenie Module
      { path: 'notessearch/:name', loadChildren: './NotesGenie/notessearch/notessearch.module#NotessearchModule' },
      { path: 'notes-category', loadChildren: './NotesGenie/notes-category/notes-category.module#NotesCategoryModule' },
      { path: 'category-wise-notes/:id', loadChildren: './NotesGenie/category-wise-notes/category-wise-notes.module#CategoryWiseNotesModule' },
      { path: 'notesgenie', loadChildren: './NotesGenie/notesgenie/notesgenie.module#NotesgenieModule' },
      { path: 'notes/:id', loadChildren: './NotesGenie/notes/notes.module#NotesModule' },
      { path: 'ngseemore/:name', loadChildren: './NotesGenie/ngseemore/ngseemore.module#NgseemoreModule' },
      //FlashCard Module
      { path: 'fcseemore/:id', loadChildren: './FlashCard/fcseemore/fcseemore.module#FcseemoreModule' },
      { path: 'flashcard', loadChildren: './FlashCard/flashcard/flashcard.module#FlashcardModule' },
      { path: 'fcdetail/:id', loadChildren: './FlashCard/fcdetail/fcdetail.module#FcdetailModule' },
      { path: 'flashsearch/:name', loadChildren: './FlashCard/flashsearch/flashsearch.module#FlashsearchModule' },
      { path: 'flashcardlist', loadChildren: './FlashCard/flashcardlist/flashcardlist.module#FlashcardlistModule' },
      // Books Module
      { path: 'allbooks', loadChildren: './Books/allbooks/allbooks.module#AllbooksModule' },
      { path: 'textbooks', loadChildren: './Books/textbooks/textbooks.module#TextbooksModule' },
      { path: 'books', loadChildren: './Books/books/books.module#BooksModule' },
      { path: 'bookseemore/:name', loadChildren: './Books/bookseemore/bookseemore.module#BookseemoreModule' },
      { path: 'searchbooks/:name', loadChildren: './Books/searchbooks/searchbooks.module#SearchbooksModule' },
      { path: 'detail/:id', loadChildren: './Books/detail/detail.module#DetailModule' },
      { path: 'bookcategory/:id', loadChildren: './Books/bookcategory/bookcategory.module#BookcategoryModule' },
      //Event Module
      { path: 'events', loadChildren: './Events/events/events.module#EventsModule' },
      { path: 'upcomingevents', loadChildren: './Events/upcomingevents/upcomingevents.module#UpcomingeventsModule' },
      { path: 'instituteevents/:id', loadChildren: './Events/instituteevents/instituteevents.module#InstituteeventsModule' },
      { path: 'institute', loadChildren: './Events/institute/institute.module#InstituteModule' },
      //Course Module
      { path: 'subcategory/:id', loadChildren: './Course/subcategory/subcategory.module#SubcategoryModule' },
      { path: 'course-subactegory/:id', loadChildren: './Course/course-subcategory/course-subcategory.module#coursecategoryModule' },
      { path: 'coursesearch/:name', loadChildren: './Course/coursesearch/coursesearch.module#CoursesearchModule' },
      { path: 'eachcourse/:id', loadChildren: './Course/eachcourse/eachcourse.module#EachcourseModule' },
      { path: 'course', loadChildren: './Course/course/course.module#CourseModule' },
      { path: 'coursesm/:name', loadChildren: './Course/coursesm/coursesm.module#CoursesmModule' },
      { path: 'categories', loadChildren: './Course/categories/categories.module#CategoriesModule' },
      //Scholarships Module
      { path: 'scholarship', loadChildren: './Scholarships/scholarship/scholarship.module#ScholarshipModule' },
      { path: 'scholarshipdetail/:id', loadChildren: './Scholarships/scholarshipdetail/scholarshipdetail.module#ScholarshipdetailModule' },
      { path: 'scholarshiplist', loadChildren: './Scholarships/scholarshiplist/scholarshiplist.module#ScholarshiplistModule' },
      { path: 'scholarshiplistdetail/:id', loadChildren: './Scholarships/scholarshiplistdetail/scholarshiplistdetail.module#ScholarshiplistdetailModule' },
      { path: 'searchscholarship/:name', loadChildren: './Scholarships/searchscholarship/searchscholarship.module#SearchscholarshipModule' },
      { path: 'upcomingscholarship', loadChildren: './Scholarships/upcomingscholarship/upcomingscholarship.module#UpcomingscholarshipModule' },
      //Tutors Module
      { path: 'tutor', loadChildren: './Tutors/tutor/tutor.module#TutorModule' },
      { path: 'tutorsearch/:name', loadChildren: './Tutors/tutorsearch/tutorsearch.module#TutorsearchModule' },
      { path: 'tutorinterview', loadChildren: './Tutors/tutorinterview/tutorinterview.module#TutorinterviewModule' },
      { path: 'tutorregistration', loadChildren: './Tutors/tutorregistration/tutorregistration.module#TutorregistrationModule' },
      { path: 'findtutor', loadChildren: './Tutors/findtutor/findtutor.module#FindtutorModule' },
      { path: 'teachers/:id', loadChildren: './Tutors/teachers/teachers.module#TeachersModule' },
      //Footer Module
      { path: 'comparison-matrix', loadChildren: './Footer/comparison-matrix/comparison-matrix.module#ComparisonMatrixModule' },
      { path: 'intellectual-property', loadChildren: './Footer/intellectual-property/intellectual-property.module#IntellectualPropertyModule' },
      { path: 'faqs', loadChildren: './Footer/faqs/faqs.module#FaqsModule' },
      { path: 'becomepartner', loadChildren: './Footer/becomepartner/becomepartner.module#BecomepartnerModule' },
      { path: 'how-it-works', loadChildren: './Footer/how-it-works/how-it-works.module#HowItWorksModule' },
      { path: 'contactus', loadChildren: './Footer/contactus/contactus.module#ContactusModule' },
      { path: 'aboutus', loadChildren: './Footer/aboutus/aboutus.module#AboutusModule' },
      { path: 'who-are-we', loadChildren: './Footer/who-are-we/who-are-we.module#WhoAreWeModule' },
      { path: 'terms', loadChildren: './Footer/terms/terms.module#TermsModule' },
      { path: 'privacy-policy', loadChildren: './Footer/privacy-policy/privacy-policy.module#PrivacyPolicyModule' },
    ],
  }

];
export const AppRoutingProvider: any[] = [];
export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
