import { Component } from '@angular/core';
import { FeatureProductContent } from './interfaces/feature-product-content/feature-product-content';
import { FEATURE_PRODUCT_CONTENT_LIST } from './constants/FEATURE_PRODUCT_CONTENT_LIST';
import { NgFor } from '@angular/common';
import { ProductCardComponent } from '../../../../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-feature-products',
  imports: [
    NgFor,
    ProductCardComponent
  ],
  templateUrl: './feature-products.component.html',
  styleUrl: './feature-products.component.scss'
})
export class FeatureProductsComponent {
  public featureProductContentList: FeatureProductContent[] = FEATURE_PRODUCT_CONTENT_LIST;
}
