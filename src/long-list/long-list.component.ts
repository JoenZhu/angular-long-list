import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-long-list',
  templateUrl: './long-list.component.html',
  styleUrls: ['./long-list.component.css']
})
export class LongListComponent implements OnInit {
  longList: Array<any> = [];
  pickedList: Array<any> = [];
  cursor: number = 0;

  ngOnInit () {
    this.longList = this._initList();
    this.cursor = 10;
    this.pickedList = this.longList.slice(0, this.cursor);
  }

  trackByFn (key) {
    return key
  }

  loadMoreData (evt) {
    if (evt.load) {
      let addList = this.longList.slice(this.cursor, this.cursor + 2);
      this.pickedList.splice(0, this.cursor <= 10 ? 1 : 2);
      this.pickedList.push(...addList);
      this.cursor += 2;
    }

    if (evt.remove) {
      if (this.pickedList[0] === this.longList[0]) {
        this.cursor = 10;
        return;
      }

      let headList = this.longList.slice(this.cursor - 12, this.cursor - 10);
      this.pickedList.splice(this.cursor <= 10 ? -1 : -2, 2);
      this.pickedList.unshift(...headList);
      this.cursor -= 2;
    }
  }

  currentStyles (index) {
    return {
      transform: `translate3d(0px, ${(index - 1) * 100}px, 0px)`
    }
  }

  private _initList () {
    return Array.apply(null, {length: 100000}).map((v, key) => key + 1);
  }
}
