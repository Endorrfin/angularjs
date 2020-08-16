import {interval } from 'rxjs';
import {filter, map, take, scan} from 'rxjs/operators';

const btn = document.getElementById('interval')
const rxjsBtn = document.getElementById('rxjs')
const display = document.querySelector('#problem .result')

const people = [
  {name: 'Vladilen', age: 25},
  {name: 'Elena', age: 17},
  {name: 'Ivan', age: 18},
  {name: 'Igor', age: 14},
  {name: 'Lisa', age: 32},
  {name: 'Irina', age: 23},
  {name: 'Oleg', age: 20},
  {name: 'Kira', age: 17},
  {name: 'Rick', age: 92},
  {name: 'Roy', age: 54}
]

btn.addEventListener('click', () => {
  btn.disabled = true;
  let i = 0;
  const canDrink = [];
  const interval = setInterval(() =>{
    if(people[i]) {
      if(people[i].age >= 18) {
         canDrink.push(people[i].name)
      }
      display.textContent = canDrink.join(', ');
      i++
    }else {
      clearInterval(interval)
      btn.disabled = false;
    }
  }, 100);
})


// RxJS implementation
rxjsBtn.addEventListener('click', () => {
  rxjsBtn.disabled = true;
  interval(100)
      .pipe(
          take(people.length),
          filter(value => people[value].age >= 18),
          map(value => people[value].name),
          scan((acc, value) => acc.concat(value), [])
      )
      .subscribe(res => {
        display.textContent = res.join(' ');
      }, null, () => rxjsBtn.disabled = false)
})
