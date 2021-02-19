import { Component } from '@angular/core';
import firebase from 'firebase';

export class Doc {
  id: string;
  title: string;
  content: string;
  created: Date;
  updated: Date;

  constructor(id, data) {
    this.id = id;
    this.title = data.title;
    this.content = data.content;
    this.created = new Date(data.created.seconds * 1000);
    this.updated = new Date(data.updated.seconds * 1000);
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  documents: Doc[] = [];
  isCollapsed = false;

  firebaseConfig = {
  };

  initialize = firebase.initializeApp(this.firebaseConfig);
  analytics = firebase.analytics();
  provider = new firebase.auth.GoogleAuthProvider();
  db = firebase.firestore();

  constructor() {
    this.get().then(r => console.log(r));
  }

  async get(): Promise<any> {
    let user = null;
    let token = '';
    await firebase.auth()
      .signInWithPopup(this.provider)
      .then((result) => {
        const credential = result.credential;
        // @ts-ignore
        token = credential.accessToken;
        user = result.user;
      }).catch((error) => {
      console.log(error);
    });

    this.db.collection('docs')
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.documents.push(new Doc(doc.id, doc.data()));
        });
      });
  }
}
