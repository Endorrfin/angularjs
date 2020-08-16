import {of, from, Observable} from 'rxjs';
import {scan} from "rxjs/operators";

// создаем stream с помощью метода of
// // const stream$ = of (1, 2, 3, 4, 5, 6, 7, 8);
// const stream$ = of ('Hello', 'World');
//
// stream$.subscribe(value => {
//     console.log('Value: ', value);
// })



// создаем stream с помощью метода of
// const arr$ = from([1, 2, 3, 4]).pipe(
//         scan((acc, value) => acc.concat(value), [])
//         )
//         arr$.subscribe(value => console.log(value))



// создаем stream с помощью объекта Observable of
const stream$ = new Observable(observe => {
    observe.next('First value')
})

stream$.subscribe((value => console.log('Value: ', value))






