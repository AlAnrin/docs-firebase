import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppFirestoreService} from '../../app-firestore.service';
import {Doc} from '../../doc';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit, OnDestroy {
  id = '';
  document: Doc = null;

  paramsSub: any;
  docChange: any;

  constructor(private route: ActivatedRoute, private router: Router,
              private firestoreService: AppFirestoreService) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.firestoreService.getById(this.id)
        .then(doc => {
          this.document = new Doc(doc.id, doc.data());
        })
        .catch(error => {
          console.log(error);
          this.document = null;
          this.router.navigate(['/']);
        });
      console.log(this.id);
    });

    this.docChange = this.firestoreService.docChange$
      .subscribe(data => {
        if (data.id === this.document.id) {
          switch (data.action) {
            case 'delete':
              this.router.navigate(['/']);
          }
        }
      });
  }

  update(): void {
    this.firestoreService.update(this.document);
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
    this.docChange.unsubscribe();
  }
}
