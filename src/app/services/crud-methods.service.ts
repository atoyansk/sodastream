import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CrudMethodsService {

  constructor(private firestore: AngularFirestore) { }

  getItems(basePath: string) {
    return this.firestore.collection(basePath).snapshotChanges();
  }

  getUser(basePath: string, docPath: string) {
    return this.firestore.doc(basePath + '/' + docPath).snapshotChanges();
  }

  getItem(basePath: string, field: string, value: any) {
    return this.firestore.collection(basePath, res => res.where(field, '==', value)).snapshotChanges();
  }

  getItemSort(basePath: string, field: string, value: any, field2: string, sort: any) {
    return this.firestore.collection(basePath, res => res.where(field, '==', value).orderBy(field2, sort)).snapshotChanges();
  }

  getFilter(basePath: string, field: string, value: any, field2: string, value2: any) {
    return this.firestore.collection(basePath, res => res.where(field, '==', value).where(field2, '==', value2)).snapshotChanges();
  }

  createItem(basePath: string, value: any) {
    return this.firestore.collection(basePath).add(value);
  }

  updateItem(basePath: string, value: any, key: string) {
    this.firestore.doc(basePath + '/' + key).update(value);
  }

  deleteItem(basePath: string, key: string) {
    return this.firestore.doc(basePath + '/' + key).delete();
  }
}
