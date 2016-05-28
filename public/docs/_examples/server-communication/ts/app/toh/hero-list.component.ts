// #docregion
// Observable Version
import { Component, OnInit } from '@angular/core';
import { Hero }              from './hero';
import { HeroService }       from './hero.service';

@Component({
  selector: 'hero-list',
  templateUrl: 'app/toh/hero-list.component.html',
  providers: [ HeroService ]
})
// #docregion component
export class HeroListComponent implements OnInit {

  constructor (private heroService: HeroService) {}

  errorMessage: string;
  heroes: Hero[];
  mode = 'Observable';

  ngOnInit() { this.getHeroes(); }

  // #docregion methods
  // #docregion getHeroes
  getHeroes() {
    this.heroService.getHeroes()
                     .subscribe(
                       heroes => this.heroes = heroes,
                       error =>  this.errorMessage = <any>error);
  }
  // #enddocregion getHeroes

  // #docregion addHero
  addHero (name: string) {
    if (!name) { return; }
    this.heroService.addHero(name)
                     .subscribe(
                       hero  => this.heroes.push(hero),
                       error =>  this.errorMessage = <any>error);
  }
  // #enddocregion addHero
  // #enddocregion methods
}
// #enddocregion component