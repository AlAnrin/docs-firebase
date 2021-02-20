import { Component } from '@angular/core';
import {AppFirestoreService} from './app-firestore.service';
import {Doc} from './doc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  documents: Doc[] = [];

  constructor(private firestoreService: AppFirestoreService) {
    this.firestoreService.auth()
      .then(res => {
        this.firestoreService.get();
      });

    this.documents = this.firestoreService.documents;
  }

  add(): void {
    this.firestoreService.add();
  }

  delete(doc: Doc): void {
    this.firestoreService.delete(doc);
  }
}
