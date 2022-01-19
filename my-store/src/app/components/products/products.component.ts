import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { switchMap} from 'rxjs/operators';
import { zip} from 'rxjs';

import {Product,CreateProductDTO,UpdateProductDTO} from '../../models/product.model'
import {StoreService} from '../../services/store.service'
import {ProductsService} from '../../services/products.service'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  myShoppingCart:Product [] =[];
  total = 0;
  products: Product [] =[];
  showProductDetail = false;
  productChosen: Product ={
    id:'',
    title:'',
    price:0,
    images:[],
    description:'',
    category: {
      id:'',
      name:''
    }
  }

  limit =10;
  offset=0;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = storeService.getMyShoppingCart();
   }

  ngOnInit(): void {
    this.productsService.getProductsByPage(10,0)
    .subscribe(data =>{
      this.products = data;
    });
  }

  onAddToShoppingCart(product:Product){
    this.storeService.addProduct(product);
    this.total =  this.storeService.getTotal();
  }
  
  toggleProductDetail(){
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id:string){
    this.statusDetail ='loading';
    this.productsService.getProduct(id)
    .subscribe(data =>{
      this.toggleProductDetail();
      this.productChosen = data;
      this.statusDetail ='success';
    }, errorMsg =>{
      window.alert(errorMsg);
      this.statusDetail ='error';
    })
  }

  readAndUpadte(id: string){
    this.productsService.getProduct(id)
    .pipe(
      switchMap((product)=> this.productsService.update(product.id, {title: 'change'})),
    )
    .subscribe(data =>{
        console.log(data);
    });
    this.productsService.fetchReadAndUpadte(id,{title: 'change'})
    .subscribe(response =>{
      const read = response[0];
      const update = response[1];
    });
  }

  createNewProduct(){
    const product : CreateProductDTO ={
      title:'Nuevo Producto',
      price:1000,
      images:['https://placeimg.com/640/480/any?random=${Math.random()}'],
      description:'Nuevo',
      categoryId: 1,

    }
    this.productsService.create(product)
    .subscribe(data =>{
      this.products.unshift(data);
    });
  }

  updateProduct(){
    const changes = {
      title: 'nuevo title',
    }
    const id = this.productChosen.id; 
    this.productsService.update(id,changes)
    .subscribe(data =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
    });
  }
  
  deleteProduct(){
    const id = this.productChosen.id; 
    this.productsService.delete(id)
    .subscribe(() =>{
      const productIndex = this.products.findIndex(item => item.id === this.productChosen.id)
      this.products.splice(productIndex,1);
      this.showProductDetail = false;
    });
  }

  loadMore(){
    this.productsService.getAllProducts(this.limit,this.offset)
    .subscribe(data =>{
      this.products = this.products.concat(data);
      this.offset += this.limit;
    });
  }
}
