import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit, OnDestroy {
  userId: number = 0;
  isLoading = true;
  s1?: Subscription;

  constructor(private route: ActivatedRoute) {}

  async ngOnInit() {
    this.s1 = this.route.paramMap.subscribe(async (paramMap: ParamMap) => {
      this.isLoading = true;
      this.userId = Number(paramMap.get('id'));
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
  }
}
