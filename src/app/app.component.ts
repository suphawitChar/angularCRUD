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
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  dataForm: FormGroup  = this.formBuilder.group({
    name: null,
    age: null,
    address: null,
    id: null,
  });
  myArray: any;

  constructor(
    private firestore: AngularFirestore,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  )
  { this.myArray = this.firestore.collection('items', (ref) =>
  ref.orderBy('id', 'asc' ),
  ).valueChanges(); }


  onSubmit() {
    const data = this.firestore.collection('items', (ref) =>
      ref.where('id', '==', this.dataForm.value.id)
    );

    data.get().subscribe((res) => {
      if (res.docs.length != 0) {
        res.docs[0].ref.update(this.dataForm.value);
        console.log(this.dataForm.value);
        this.toastr.success('Update success', 'Name : '+ this.dataForm.value.name); //green
      } else {
        this.firestore.collection('items').add(this.dataForm.value);
        this.toastr.show('Add success', 'Name : '+ this.dataForm.value.name); //black
      }
    });
  }

  onEdit(doc: any) {
    this.dataForm = this.formBuilder.group({
      name: doc.name,
      age: doc.age,
      address: doc.address,
      id: doc.id,
    });
  }

  onDelete(id: string, name: string) {
    if (confirm('Do you want to delete '+name+'?')) {
      const data = this.firestore.collection('items', (ref) =>
        ref.where('id', '==', id)
      );

      data.get().subscribe((res) => {
        if (res.docs.length != 0) {
          res.docs[0].ref.delete();
          this.toastr.error('Delete success error', ); //red
          this.toastr.info('Delete success info', ); //blue
          this.toastr.warning('Delete success warning', ); //yellow

        }
      });
    }
  }
}
