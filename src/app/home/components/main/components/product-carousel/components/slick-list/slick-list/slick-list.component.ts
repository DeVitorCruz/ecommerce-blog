import { Component, computed, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../../../../../shared/interfaces/product/product';
import { NgFor, NgIf } from '@angular/common';
import { ProductCardComponent } from '../../../../../../../../shared/components/product-card/product-card.component';
import { CarouselService } from '../../../../../../../../shared/services/carousel.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Config } from '../../../../../../../../shared/interfaces/config/config';

@Component({
  selector: 'app-slick-list',
  imports: [
    NgFor,
    NgIf,
    ProductCardComponent,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './slick-list.component.html',
  styleUrl: './slick-list.component.scss'
})
export class SlickListComponent implements OnDestroy, OnInit {

  @Input() public product_list!: Product[];
  @Input() public config!: Config;
  
  public currentOffset: ReturnType<typeof computed<number>> = computed(()=> this.carouselService.currentOffset());
  public currentGroup: ReturnType<typeof computed<number>> = computed(()=> this.carouselService.currentGroup());
  public isAnimating: ReturnType<typeof computed<boolean>> = computed(() => this.carouselService.isAnimating());
  private timer?: ReturnType<typeof setInterval>;

  constructor(public carouselService: CarouselService) {}

  get groupCount(): number {
    return this.carouselService.groupCount(this.product_list.length, this.config.slidesToScroll);
  }

  @HostListener('window:resize') public onResize(): void {
    this.setResponsive();
  }

  public ngOnInit(): void {
    this.setResponsive();
    if (this.config.autoplay) this.startAutoPlay();
  }

  private setResponsive(): void {
    this.carouselService.setItemPerView();
    this.goToGroup(this.currentGroup());
  }

  public next(): void {
    const nextGroup: number = (this.currentGroup() + 1) % (this.groupCount + 1);    
    this.goToGroup(nextGroup);
  }

  public prev(): void {
    const prevGroup: number = this.currentGroup() - 1 < 0 ? (this.groupCount + 1) - 1 : this.currentGroup() - 1;
    this.goToGroup(prevGroup);
  }

  public startAutoPlay(): void {
    this.timer = setInterval(() => this.next(), this.config.interval);
  }

  public pause(): void {
    if (this.timer) clearInterval(this.timer);
  }

  public resume(): void {
    if (this.config.autoplay) this.startAutoPlay();
  }

  public goToGroup(index: number): void {
    this.carouselService.setCurrentGroup(index);
    this.carouselService.setCurrentOffset(index, this.config.slidesToScroll);
    this.carouselService.animationTrigger();
  }

  public ngOnDestroy(): void {
    this.pause(); 
  }
}
