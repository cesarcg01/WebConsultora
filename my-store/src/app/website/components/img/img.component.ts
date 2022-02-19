import { CompileShallowModuleMetadata } from '@angular/compiler';
import { Component, OnInit ,Input ,Output ,EventEmitter, OnChanges, AfterViewInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent  {
  img: string= '';
  // eslint-disable-next-line @angular-eslint/no-input-rename
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
  imgError(){
  this.img = this.imageDefault;
  }

  imgLoaded(){
    // console.log("Log Hijo");
    this.loaded.emit(this.img);
  }

 

}
