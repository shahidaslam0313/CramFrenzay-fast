import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Injectable()
export class Config {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  public static api: string = 'https://apis.cramfrenzy.com/';
  public static Imageurl: string = 'https://apis.cramfrenzy.com/media/';
  public static webapi:string="wss://apis.cramfrenzy.com/chat/";
  // public static api: string = 'http://192.168.29.148:8000/';
  // public static api: string = 'http://127.0.0.1:8000/';

  // public static api: string = 'http://192.168.18.43:8000/';
  // public static Imageurl: string = 'http://192.168.30.172:8000/media/';
  public static uploadfile = 'https://storage.cramfrenzy.com/cram_pdf.php';
  public static Imageurleach = 'https://storage.cramfrenzy.com/images/';
  public static Imageurlget = 'https://storage.cramfrenzy.com/Thumbnail/';
  // public static Imageurlget = 'https://s3-us-west-1.amazonaws.com/cramfrenzy/Thumbnail/';
  public static Imageurlupload = 'https://storage.cramfrenzy.com/upload_image.php';
  public static VideoUrl = 'https://storage.cramfrenzy.com/video/';
  public static pdf = "https://storage.cramfrenzy.com/uploads/";

}
