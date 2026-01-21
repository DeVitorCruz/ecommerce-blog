import { HostListener, Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarouselService {

  public currentGroup: WritableSignal<number> = signal(0);
  public itemsPerGroup: WritableSignal<number> = signal(1);
  public currentOffset: WritableSignal<number> = signal(0);
  public isAnimating: WritableSignal<boolean> = signal(false);

  public setItemPerView(): void {
    const width: number = window.innerWidth;

    if (width >= 1300) this.itemsPerGroup.set(5);
    else if (width >= 992) this.itemsPerGroup.set(4);
    else if (width >= 480) this.itemsPerGroup.set(2);
    else this.itemsPerGroup.set(1);
  }
  
  public groupCount(listLength: number, itemToScroll: number): number {
    return Math.ceil((listLength - this.itemsPerGroup())/itemToScroll);
  }

  public animationTrigger(): void {
    this.isAnimating.set(true);
    setTimeout(()=> (this.isAnimating.set(false)), 500);
  }

  public setCurrentGroup(index: number): void {
    this.currentGroup.set(index);
  }

  public setCurrentOffset(index: number, itemToScroll: number): void {
    const slideTranslation: number = index * (100/this.itemsPerGroup()) * itemToScroll;
    this.currentOffset.set(slideTranslation);
  }
}
