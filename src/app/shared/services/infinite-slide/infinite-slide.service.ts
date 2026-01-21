import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfiniteSlideService<T> {

  private items!: T[];
  public currentIndex: WritableSignal<number> = signal(0);
  public itemsPerView: WritableSignal<number> = signal(5);
  public currentOffset: WritableSignal<number> = signal(0);
  public isBrowser: WritableSignal<boolean>= signal(false);
  public isAnimating: WritableSignal<boolean> = signal(false);
  public slide$ = new BehaviorSubject<T[]>([]);

  constructor(@Inject(PLATFORM_ID) public platformId: object) {
    this.isBrowser.set(isPlatformBrowser(platformId));
  }

  public setVisibleItems(): void {
    const width: number = window.innerWidth;
    
    if (width >= 1300) this.setItemsPerView(5);
    else if (width >= 992) this.setItemsPerView(4);
    else if (width >= 480) this.setItemsPerView(3);
    else this.setItemsPerView(3);
  }

  public init(items: T[]): void {
    this.spreadArray(items);
    this.emit();
  }

  public start(periodMs: number = 1000): void {
    if (this.isBrowser()) {
      interval(periodMs).subscribe(() => this.next());
    }
  }
  
  public setCurrentIndex(index: number): void {
    this.currentIndex.set(index);
  }

  public setItemsPerView(index: number): void {
    this.itemsPerView.set(index);
  }

  public setAnimating(state: boolean): void {
    this.isAnimating.set(state);
  }

  public spreadArray(items: T[]): void {
    this.items = [...items];
  }

  private next(): void {
    this.slide(1);
  }
  
  private slide(direction: 1 | -1): void {
    if (this.isAnimating()) return;
    this.setAnimating(true);
    this.setCurrentIndex(this.currentIndex() + direction);
    this.setCurrentOffset(this.currentIndex());
  }

  public onTransitionEnd(): void {
    this.setAnimating(false);

    const len: number = this.items.length;

    if (this.currentIndex() === len - 1) this.setCurrentIndex(1);
    else if (this.currentIndex() === 0) this.setCurrentIndex(len - 2);

    this.setCurrentOffset(this.currentIndex());
  }

  private emit(): void {
    const arr: T[] = [...this.items];
    const len: number = this.items.length;

    for (let i = 0; i < len; ++i) {
      arr.push(this.items[i]);
    }

    this.slide$.next(arr); 
  }

  public setCurrentOffset(index: number): void {
    const slideTranslation: number = index * (100/this.visibleCount);
    this.currentOffset.set(slideTranslation);
  }  

  get visibleCount(): number {
    return this.itemsPerView();
  }
}
