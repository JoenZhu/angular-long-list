import { Directive, ElementRef, EventEmitter, Output } from '@angular/core';

@Directive({
  selector: '[appScroll]'
})
export class ScrollDirective {
  listener: (evt) => void = null;
  @Output() load = new EventEmitter();

  constructor(private el: ElementRef) {
    this.listener = this._bindEvent();
  }

  ngOnDestroy () {
    this._removeEvent();
  }

  private _bindEvent () {
    let eventListener = (evt) => {
      const LEFT_BOTTOM = 100;
      const LEFT_TOP = 300;
      let { scrollTop, clientHeight, scrollHeight } = evt.target;
      let needLoad = scrollHeight - (scrollTop + clientHeight) <= LEFT_BOTTOM;
      let needRemove =  scrollTop <  scrollHeight - (LEFT_TOP + clientHeight);

      if (needLoad) {
        this.load.emit({load: needLoad});
      } 
      
      if (needRemove) {
        this.load.emit({remove: needRemove});
      }
    }
    this.el.nativeElement.addEventListener('scroll', eventListener);

    return eventListener;
  }

  private _removeEvent () {
    this.el.nativeElement.removeEventListener('scroll', this.listener);
    this.listener = null;
  }
}
