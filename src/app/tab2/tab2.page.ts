import { Component, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { Game } from '../interfaces/game';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  public games: Game[] = [];
  public facilGames: Game[] = [];
  public medioGames: Game[] = [];
  public dificilGames: Game[] = [];


  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.gameService.traer().subscribe(g => {
      this.games = g;

      this.games.forEach(game => {
        switch (game.tipo) {
          case "facil":
            this.facilGames.push(game);
            break;
          case "medio":
            this.medioGames.push(game);
            break;
          case "dificil":
            this.dificilGames.push(game);
            break;

        }
      })
      this.ordenarPorTiempo(this.facilGames)
      this.ordenarPorTiempo(this.medioGames)
      this.ordenarPorTiempo(this.dificilGames)

      this.facilGames = this.facilGames.slice(0, 5);
      this.medioGames = this.medioGames.slice(0, 5);
      this.dificilGames = this.dificilGames.slice(0, 5);
    });
  }

  ordenarPorTiempo(games: Game[]) {
    games.sort((a: Game, b: Game) => {
      return a.tiempo - b.tiempo;
    });
  }

}
