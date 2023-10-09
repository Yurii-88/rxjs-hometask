import { Component, OnInit } from '@angular/core';
import { fromEvent, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss'],
})
export class DraggableComponent implements OnInit {
  draggableElement: any;
  mouseDown$ = fromEvent(document, 'mousedown');
  mouseMove$ = fromEvent(document, 'mousemove');
  mouseUp$ = fromEvent(document, 'mouseup');

  constructor() {}

  ngOnInit() {
    this.draggableElement = document.getElementsByClassName('draggable')[0];

    this.mouseDown$
      .pipe(
        switchMap((start) =>
          this.mouseMove$.pipe(
            map((moveEvent) => ({
              originalEvent: moveEvent,
              deltaX:
                (moveEvent as MouseEvent).pageX - (start as MouseEvent).pageX,
              deltaY:
                (moveEvent as MouseEvent).pageY - (start as MouseEvent).pageY,
              startOffsetX: (start as MouseEvent).offsetX,
              startOffsetY: (start as MouseEvent).offsetY,
            })),
            takeUntil(this.mouseUp$)
          )
        )
      )
      .subscribe((move) => {
        const offsetX =
          (move.originalEvent as MouseEvent).x - move.startOffsetX;
        const offsetY =
          (move.originalEvent as MouseEvent).y - move.startOffsetY;
        this.draggableElement.style.left = offsetX + 'px';
        this.draggableElement.style.top = offsetY + 'px';
      });
  }
}
