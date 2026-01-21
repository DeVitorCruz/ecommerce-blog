import { Component } from '@angular/core';
import { SlickListComponent } from './components/slick-list/slick-list/slick-list.component';
import { PRODUCT_LIST } from '../../../../../shared/constants/PRODUCT_LIST';
import { Product } from '../feature-products/interfaces/product/product';
import { Config } from '../../../../../shared/interfaces/config/config';

@Component({
  selector: 'app-product-carousel',
  imports: [
    SlickListComponent
  ],
  templateUrl: './product-carousel.component.html',
  styleUrl: './product-carousel.component.scss'
})
export class ProductCarouselComponent {
  public product_list: Product[] = PRODUCT_LIST;
  public interval: number = 5000;
  public config: Config = {
    interval: 5000,
    autoplay: true,
    showDots: true,
    showArrows: true,
    slidesToScroll: 1
  };
}
