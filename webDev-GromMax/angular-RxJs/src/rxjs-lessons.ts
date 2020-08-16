import {fromEvent, Observable} from "rxjs";
import {debounceTime, distinctUntilChanged, map, take, takeUntil} from "rxjs/operators";

const search$ = new Observable<Event>(observer => {
  const search = document.getElementById('search');
  const stop = document.getElementById('stop');

  if (!search || !stop) {
    observer.error('Element does not exist on the page');
    return;
  }

  const onSearch = event => {
    console.log(123);
    observer.next(event);
  };

  const onStop = event => {
    observer.complete();
    clear();
  }

  search.addEventListener('input', onSearch);
  stop.addEventListener('click', onStop);

  const clear = () => {
    search.removeEventListener('input', onSearch);
    stop.removeEventListener('click', onStop);
  };
});


// search$.subscribe( value => {
//   console.log(value);
// });

// const search$: Observable<Event> = fromEvent<Event>(
//   document.getElementById('search'),
//   'input'
// );




const searchSubscription = search$.pipe(
  map(event => {
    return (event.target as HTMLInputElement).value;
  }),
  debounceTime(800),
  map(value => value.length > 3 ? value : ''),
  distinctUntilChanged(),
  // takeUntil(stop$),
).subscribe( value => {
  console.log(value);
});


setTimeout(() => {
  console.log('unsubscribed');
  searchSubscription.unsubscribe();
}, 5000);



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
