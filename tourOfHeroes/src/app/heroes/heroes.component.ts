import { Component, OnInit } from '@angular/core';
import { Hero } from "../hero";
import { HeroService } from "../hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  public selectedHero: Hero;

  // зона видимости TypeScript - указываем, что heroes - это массив класса Hero
  public heroes: Hero[];

  // метод onSelect для функционала клика в списке героев
  // selectedHero - герой на которого кликнули
  public onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  // heroService - имя переменной, которое придумываем самостоятельно, но чаще все принято использовать
  // имя аналогичное имени сервиса но с маленькой буквы.
  constructor(private heroService: HeroService) { }

  private getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}
