// toggler.component.ts
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TemplateService } from '@services/template.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-toggler',
  templateUrl: './color-toggler.component.html',
  styleUrls: ['./color-toggler.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})

export class ColorTogglerComponent implements OnInit, OnDestroy {

  flipState: string = 'inactive';
  private destroy$ = new Subject<void>();

  constructor(
    private templateService: TemplateService
  ) { }

  ngOnInit(): void {
    this.templateService.color$
      .pipe(takeUntil(this.destroy$))
      .subscribe(color => {
        this.flipState = color;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleFlip() {
    this.flipState = (this.flipState == 'inactive') ? 'active' : 'inactive';
    this.templateService.setColorMode(this.flipState);
  }

}
