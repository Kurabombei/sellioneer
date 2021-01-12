import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class GoodsService {

  constructor(public db: AngularFirestore) { }

  getAvatars(){
    return this.db.collection('avatars').valueChanges();
  }

  getGood(goodKey){
    return this.db.collection('goods').doc(goodKey).snapshotChanges();
  }

  updateGood(goodKey, value){
    value.nameToSearch = value.name.toLowerCase();
    return this.db.collection('goods').doc(goodKey).set(value);
  }

  deleteGood(goodKey){
    return this.db.collection('goods').doc(goodKey).delete();
  }

  getGoods(){
    return this.db.collection('goods').snapshotChanges();
  }

  searchGoods(searchValue){
    return this.db.collection('goods', ref => ref.where('nameToSearch', '>=', searchValue)
      .where('nameToSearch', '<=', searchValue + '\uf8ff'))
      .snapshotChanges();
  }

  searchGoodsByPrice(value){
    return this.db.collection('goods', ref => ref.orderBy('price').startAt(value)).snapshotChanges();
  }

  createGood(value, avatar, providerID){
    return this.db.collection('goods').add({
      comment: value.comment,
      nameToSearch: value.name.toLowerCase(),
      name: value.name,
      pinId: 't1Ke4MVHY2g9YpquNZD5', //value.pinId
      price: parseInt(value.price),
      providerUID: providerID,
      quantity: value.quantity,
      avatar
    });
  }
}
