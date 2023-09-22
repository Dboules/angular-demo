import { Component, OnInit } from '@angular/core';
import { Observable, interval, Subject } from 'rxjs';
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.less'],
})
export class WelcomeComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
  nameList = [{ name: 'DI' }, { name: '' }, { name: 'Hui' }];
  agree: number = 0;
  disagree: number = 0;
  date: Date = new Date();
  foo = new Observable((subscriber) => {
    console.log('Hello World');
    subscriber.next(12);
    subscriber.next(24);
    subscriber.next(36);
  });
  subject = new Subject<number>();
  changeName() {
    this.nameList[1].name = 'Kl';
    const ob = interval(1000);
    const sub = ob.subscribe((x) => console.log('first:', x));
    setTimeout(() => {
      sub.unsubscribe();
    }, 1000);
    this.subject.subscribe({
      next: (v) => console.log('observerA:', v),
    });
    this.subject.subscribe({
      next: (v) => console.log('observerB:', v),
    });
    this.subject.next(1);
    this.subject.next(2);
    this.foo.subscribe((x) => console.log(x));
  }
  onVoted(bool: boolean) {
    if (bool) {
      this.agree += 1;
    } else {
      this.disagree += 1;
    }
  }
}
