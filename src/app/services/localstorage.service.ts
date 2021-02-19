import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  array : any = [1];
  constructor() {
    this.get();
  }
  set(id : string){
    try{
      this.array.push(id);
      localStorage.setItem('favorites', this.array);
    }catch(e){
      console.log(e);
    }
  }
  get(){
    try{
      return localStorage.getItem('favorites');
    }catch(e){
      console.log(e);
    }
  }
  remove(id :string){
    try{
      localStorage.removeItem(this.array);
    }catch(e){
      console.log(e);
    }
  }
}
