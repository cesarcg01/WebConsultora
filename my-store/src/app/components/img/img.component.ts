import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit ,Input ,Output ,EventEmitter, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit ,OnChanges, AfterViewInit, OnDestroy{
  img: string= '';
  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    // console.log('Change just img =>', this.img);
  }
  
  @Input() alt: string ='';
  @Output() loaded = new EventEmitter<String>();
  imageDefault = './assets/images/default.jpg';
  // counter =0;
  // counterFn : number | undefined;

  constructor() { 
    //before render
    //No async --once time
    // console.log('constructor','imgValue =>', this.img);
  }
  ngOnChanges(){
    //before - during render
    //changes inputs -- multiples times
    // console.log('ngOnChanges','imgValue =>', this.img);
  }
  ngOnInit(): void {
    //before render
    //async -- fetch -- once time
    // console.log('ngOnInit','imgValue =>', this.img);
    // this.counterFn = window.setInterval(() =>{
    //   this.counter +=1;
    //   console.log('run counter');
    // },1000);

  }

  ngAfterViewInit(){
    //after render
    //handler children --once time
    // console.log('AfterViewInit');
  }


  ngOnDestroy(){
    // console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }

  imgError(){
  this.img = this.imageDefault;
  }

  imgLoaded(){
    // console.log("Log Hijo");
    this.loaded.emit(this.img);
  }

 

}
