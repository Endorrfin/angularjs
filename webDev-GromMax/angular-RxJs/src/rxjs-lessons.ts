import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators";

// const search$ = new Observable<Event>(observer => {
//   const search = document.getElementById('search');
//
//   if (!search) {
//     observer.error('Element does not exist on the page');
//     return;
//   }
//
//   search.addEventListener('input', event => {
//     observer.next(event);
//     // observer.complete();
//   });
// });
//
//
// // search$.subscribe( value => {
// //   console.log(value);
// // });

const search$: Observable<Event> = fromEvent<Event>(
  document.getElementById('search'),
  'input'
);

search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value;
  }),
  debounceTime(800),
  map(value => value.length > 3 ? value : ''),
  distinctUntilChanged(),
).subscribe( value => {
  console.log(value);
});





// console.log('Start subscribe')
// search$.subscribe(value => {
//   console.log(1);
//   console.log(value);
// });
//
// search$.subscribe(value => {
//   console.log(2);
//   console.log(value);
// });
//
// console.log('End subscribe')
