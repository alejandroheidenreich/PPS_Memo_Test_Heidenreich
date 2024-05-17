import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Subscription, interval } from 'rxjs';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-dificil',
  templateUrl: './dificil.page.html',
  styleUrls: ['./dificil.page.scss'],
})
export class DificilPage implements OnInit, OnDestroy {

  public imgManzana: string = 'assets/manzana.png';
  public imgBanana: string = 'assets/banana.png';
  public imgCoco: string = 'assets/coco.png';
  public imgDurazno: string = 'assets/durazno.png';
  public imgFrutilla: string = 'assets/frutilla.png';
  public imgPalta: string = 'assets/palta.png';
  public imgUva: string = 'assets/uva.png';
  public imgAnana: string = 'assets/anana.png';


  public arrayRespuesta: string[] = [this.imgManzana, this.imgBanana, this.imgCoco, this.imgDurazno, this.imgFrutilla, this.imgPalta, this.imgUva, this.imgAnana, this.imgManzana, this.imgBanana, this.imgCoco, this.imgDurazno, this.imgFrutilla, this.imgPalta, this.imgUva, this.imgAnana];
  public pregunta: string = 'assets/pregunta.png';
  public arrayGame: string[] = [this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta];
  public active = true;
  private timerId = setTimeout(() => {
    this.arrayGame[this.selectedIndex[0]] = this.pregunta;
    this.arrayGame[this.selectedIndex[1]] = this.pregunta;
    this.selectedIndex = [];
    this.selected = [];
    this.active = true;
  }, 2000)

  public selected: string[] = [];
  public selectedIndex: number[] = [];

  public seconds: number = 0;
  private subscription!: Subscription;

  constructor(private alertController: AlertController, private gameService: GameService) { }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit() {
    this.arrayRespuesta = this.shuffleArray(this.arrayRespuesta);
    this.subscription = interval(1000).subscribe(() => {
      this.seconds++;
      if (this.seconds >= 30) {
        this.endGame();
      }
    });

  }

  shuffleArray(array: string[]): string[] {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }

  async selectPic(index: number) {
    if (this.active && !this.selectedIndex.includes(index, 1)) {
      this.selected.push(this.arrayRespuesta[index])
      this.selectedIndex.push(index)
      this.arrayGame[index] = this.arrayRespuesta[index]
      if (this.selected.length == 2) {
        if (this.selected[0] == this.selected[1]) {
          this.selectedIndex = [];
          this.selected = [];
          this.active = true;
          if (!this.arrayGame.includes(this.pregunta)) {
            const alert = await this.alertController.create({
              message: '¡¡¡ GANASTE !!!',
              htmlAttributes: {
                'aria-label': 'alert dialog',
              },
              buttons: [
                {
                  text: 'Aceptar',
                  handler: () => {
                    this.saveGame()
                  },
                  htmlAttributes: {
                    'aria-label': 'close',
                  },
                },
              ]

            });
            await alert.present();
          }
        } else {
          this.active = false;
          this.timerId = setTimeout(() => {
            this.arrayGame[this.selectedIndex[0]] = this.pregunta;
            this.arrayGame[this.selectedIndex[1]] = this.pregunta;
            this.selectedIndex = [];
            this.selected = [];
            this.active = true;
          }, 2000)
        }
      }
    }
  }


  saveGame() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.gameService.saveGame(this.seconds, "dificil");
    }
  }

  async endGame() {
    // this.reset();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    const alert = await this.alertController.create({
      message: 'Se acabó el tiempo Perdiste',
      htmlAttributes: {
        'aria-label': 'alert dialog',
      },
      buttons: [
        {
          text: 'Reinciar',
          handler: () => {
            this.reset()
          },
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ]

    });
    await alert.present();
  }

  reset() {
    this.arrayGame = [this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta, this.pregunta];
    this.selectedIndex = [];
    this.selected = [];
    this.active = true;
    this.arrayRespuesta = this.shuffleArray(this.arrayRespuesta);
    clearTimeout(this.timerId);
    this.subscription.unsubscribe();
    this.seconds = 0;
    this.subscription = interval(1000).subscribe(() => {
      this.seconds++;
      if (this.seconds >= 30) {
        this.endGame();
      }
    });
  }
}
