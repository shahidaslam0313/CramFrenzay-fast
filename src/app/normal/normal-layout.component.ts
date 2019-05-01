import { Component, OnInit, OnDestroy, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
// import { NavItem, NavItemType } from '../../md/md.module';
import { Subscription } from 'rxjs/Subscription';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import 'rxjs/add/operator/filter';


declare const $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './normal-layout.component.html'
})

export class NormalLayoutComponent {

}
