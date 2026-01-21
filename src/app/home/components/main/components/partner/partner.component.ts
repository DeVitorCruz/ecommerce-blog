import { Component, computed, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PARTNER_LIST } from './constants/partner-list/PARTNER_LIST'; 
import { Card } from '../../../../../shared/interfaces/card/Card';
import { AsyncPipe, NgFor } from '@angular/common';
import { InfiniteSlideService } from '../../../../../shared/services/infinite-slide/infinite-slide.service';
import { BehaviorSubject, delay, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-partner',
  imports: [
    NgFor,
    AsyncPipe 
  ],
  templateUrl: './partner.component.html',
  styleUrl: './partner.component.scss'
})
export class PartnerComponent implements OnInit, OnDestroy {
  public partner_list: Card[] = PARTNER_LIST;
  public period: number = 2000;
  private sub!: Subscription;
  public visibleItems$!: Observable<Card[]>;

  public currentIndex: ReturnType<typeof computed<number>> = computed(()=> this.infiniteService.currentIndex());
  public isAnimating: ReturnType<typeof computed<boolean>> = computed(()=> this.infiniteService.isAnimating());
  public itemsPerView: ReturnType<typeof computed<number>> = computed(()=> this.infiniteService.itemsPerView());
  public currentOffset: ReturnType<typeof computed<number>> = computed(()=> this.infiniteService.currentOffset());

  constructor(public infiniteService: InfiniteSlideService<Card>) {
    this.visibleItems$ = this.infiniteService.slide$.pipe(delay(1000));
  }

  @HostListener('window:resize') public onResize(): void {
    this.infiniteService.setVisibleItems();
  }

  public ngOnInit(): void {
    this.infiniteService.init(this.partner_list);
    this.applySubscription();
    this.infiniteService.start(this.period);
  }

  public applySubscription(): void {
    this.sub = this.infiniteService.slide$.subscribe();
  }

  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  public onTransitionEnd(): void {
    this.infiniteService.onTransitionEnd();
  }
}
