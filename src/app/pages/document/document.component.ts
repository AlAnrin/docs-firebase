import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AppFirestoreService} from '../../app-firestore.service';
import {Doc} from '../../doc';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  id = '';
  document: Doc = null;

  constructor(private route: ActivatedRoute,
              private firestoreService: AppFirestoreService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.firestoreService.getById(this.id)
        .then(doc => {
          this.document = new Doc(doc.id, doc.data());
        })
        .catch(error => {
          console.log(error);
          this.document = null;
        });
      console.log(this.id);
    });
  }

  update(): void {
    this.firestoreService.update(this.document);
  }
}
