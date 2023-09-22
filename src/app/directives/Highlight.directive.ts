import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
@Directive({ selector: '[highlight]' })
export class Highlight implements OnInit {
  @Input() highlight: string = 'yellow';
  constructor(private el: ElementRef) {}
  ngOnInit(): void {
    // this.highlight(this.highlightColor);
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.setHighlightColor(this.highlight);
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.setHighlightColor('#eee');
  }
  private setHighlightColor(color: string): void {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
