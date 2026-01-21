import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product/product';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-product-card',
  imports: [
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() public product!: Product;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon('heart-regular', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/features-products/card/hidden-list/heart-regular.svg')
    );
    
    this.matIconRegistry.addSvgIcon('eye-regular', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/features-products/card/hidden-list/eye-regular.svg')
    );
    
    this.matIconRegistry.addSvgIcon('cart-shopping-solid', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/features-products/card/hidden-list/cart-shopping-solid.svg')
    );

    this.matIconRegistry.addSvgIcon('arrow-right-arrow-left-solid', 
      this.domSanitizer.bypassSecurityTrustResourceUrl('assets/features-products/card/hidden-list/arrow-right-arrow-left-solid.svg')
    );
  }

}
