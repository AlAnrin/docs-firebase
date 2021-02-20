import firebase from 'firebase';
import { Doc } from './doc';
import {Observable} from 'rxjs';
import {EventEmitter} from '@angular/core';

export class AppFirestoreService {
  documents: Doc[] = [];
  user = null;
  token = '';

  firebaseConfig = {
  };

  initialize = firebase.initializeApp(this.firebaseConfig);
  analytics = firebase.analytics();
  provider = new firebase.auth.GoogleAuthProvider();
  db = firebase.firestore();

  docChange$: EventEmitter<any> = new EventEmitter<any>();

  async auth(): Promise<any> {
    await firebase.auth()
      .signInWithPopup(this.provider)
      .then((result) => {
        const credential = result.credential;
        // @ts-ignore
        this.token = credential.accessToken;
        this.user = result.user;
      }).catch((error) => {
      console.log(error);
    });
  }

  get(): void {
    this.db.collection('docs')
      .where('user_id', '==', this.user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.documents.push(new Doc(doc.id, doc.data()));
        });
      });
  }

  getById(id: string): Promise<any> {
    return this.db.collection('docs').doc(id)
      .get();
  }

  add(): void {
    this.db.collection('docs').add(
      {
        title: 'new title',
        content: '',
        created: Date.now(),
        updated: Date.now(),
        user_id: this.user.uid
      }
    )
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        this.getById(docRef.id)
          .then(doc => {
            this.documents.push(new Doc(doc.id, doc.data()));
          });
      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
  }

  delete(doc: Doc): Promise<any> {
    return this.db.collection('docs').doc(doc.id)
      .delete()
      .then(res => {
        this.documents.splice(this.documents.findIndex(val => val.id === doc.id), 1);
        this.docChange$.emit({id: doc.id, action: 'delete'});
      });
  }

  update(doc: Doc): void {
    this.db.collection('docs').doc(doc.id)
      .update({
        content: doc.content,
        title: doc.title,
        updated: Date.now(),
      })
      .then(res => {
        const find = this.documents.find(val => val.id === doc.id);
        find.title = doc.title;
      })
      .catch(err => console.log(err));
  }
}
