import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product [] =[
    {
      id:'1',
      name: 'product 1',
      image: './assets/images/album.jpg',
      price: 100
    },
    {
      id:'2',
      name: 'product 2',
      image: './assets/images/bike.jpg',
      price: 200
    },
    {
      id:'3',
      name: 'product 3',
      image: './assets/images/books.jpg',
      price: 300
    },
    {
      id:'4',
      name: 'product 4',
      image: './assets/images/house.jpg',
      price: 400
    }
]
  constructor() { }

  ngOnInit(): void {
  }

}
