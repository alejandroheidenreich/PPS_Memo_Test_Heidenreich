import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Game } from '../interfaces/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private dataRef = collection(this.firestore, 'games');

  constructor(private firestore: Firestore, private userService: UserService, private auth: AuthService) { }

  async saveGame(seconds: number, tipo: string) {
    this.auth.getUser().then(res => {
      this.userService.getUserByEmail(res?.email!).subscribe(async (user) => {
        const docs = doc(this.dataRef);
        await setDoc(docs, { id: docs.id, tiempo: seconds, user: user.email.split("@")[0], tipo: tipo });
      })
    });
  }

  traer(): Observable<Game[]> {
    return new Observable<Game[]>((observer) => {
      onSnapshot(this.dataRef, (snap) => {
        const games: Game[] = [];
        snap.docChanges().forEach(x => {
          const one = x.doc.data() as Game;
          games.push(one);
        });
        observer.next(games);
      });
    });
  }
}
