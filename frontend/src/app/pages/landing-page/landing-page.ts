import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  private track!: HTMLDivElement;
  private animationId = 0;
  private offset = 0;
  private readonly speed = 1.5;
  private setWidth = 0;

  ngAfterViewInit() {
    this.track = document.querySelector('.carousel-track')!;
    const img = this.track.querySelector('.album-cover') as HTMLImageElement;
    this.setWidth = this.calcSetWidth(img);

    const imgs = this.track.querySelectorAll<HTMLImageElement>('.album-cover');
    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded >= 1) {
        imgs.forEach(i => i.removeEventListener('load', onLoad));
        this.setWidth = this.calcSetWidth(img);
        this.scroll();
      }
    };
    imgs.forEach(i => i.addEventListener('load', onLoad));

    if (img.complete) {
      imgs.forEach(i => i.removeEventListener('load', onLoad));
      this.scroll();
    }
  }

  private calcSetWidth(img: HTMLImageElement) {
    const style = getComputedStyle(this.track);
    const gap = parseFloat(style.gap);
    const imgWidth = img.offsetWidth;
    return 15 * imgWidth + 14 * gap;
  }

  private scroll = () => {
    this.offset -= this.speed;
    if (this.offset <= -this.setWidth) {
      this.offset += this.setWidth;
    }
    this.track.style.transform = `translateX(${this.offset}px)`;
    this.animationId = requestAnimationFrame(this.scroll);
  };

  ngOnDestroy() {
    cancelAnimationFrame(this.animationId);
  }
}
