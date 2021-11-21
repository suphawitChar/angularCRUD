import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';

import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { collectionData, collection } from '@angular/fire/firestore';
import {
  Firestore,
  doc,
  setDoc,
  onSnapshot,
  DocumentReference,
  docSnapshots,
  updateDoc,
} from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  checkoutForm = this.formBuilder.group({
    name: '',
    age: '',
    address: '',
    id: '',
  });
  myArray: any;
  // single: any;
  // message!: string;
  // id: string = '';
  // edit: boolean = false;
  // item$: Observable<any[]>;
  favoriteColorControl = new FormControl('');
  // editForm: any;
  // message2!: string;

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder
  ) {
    this.myArray = this.firestore.collection('items').valueChanges();
    // .subscribe((doc) => {
    //   console.log(doc.docs);
    // });
  }

  // myapp(data: NgForm) {}

  onSubmit() {
    const data = this.firestore.collection('items', (ref) =>
      ref.where('id', '==', this.checkoutForm.value.id)
    );

    data.get().subscribe((res) => {
      if (res.docs.length != 0) {
        res.docs[0].ref.update(this.checkoutForm.value)
      } else {
        this.firestore.collection('items').add(this.checkoutForm.value);
      }
    });
    // if(this.firestore
    //   .collection('items')
    //   .doc(this.checkoutForm)
    //   .valueChanges(this.checkoutForm.value)
    //   ){

    // }

    // this.firestore.collection('items').add(this.checkoutForm.value);
  }

  onSelect(doc: any) {
    // this.edit = !this.edit;
    this.checkoutForm = this.formBuilder.group({
      name: doc.name,
      age: doc.age,
      address: doc.address,
      id: doc.id,
    });
  }

  onDelete() {
    if (confirm('delete')
    )
    this.firestore
    .collection('items').get().forEach(res=>{
      res.docs.forEach(r=>{
        console.log(r)
        r.ref.delete()
      })

    })
  }
}
