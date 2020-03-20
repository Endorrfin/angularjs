import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HEROES } from "../mock-heroes";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public selectedHero: Hero;

  // зона видимости TypeScript - указываем, что heroes - это массив класса Hero
  public heroes: Hero[] = HEROES;

  // метод onSelect для функционала клика в списке героев
  // selectedHero - герой на которого кликнули
  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }



  constructor() { }

  ngOnInit(): void {
  }

}
