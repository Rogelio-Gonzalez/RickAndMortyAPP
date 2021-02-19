import  Swal  from 'sweetalert2';
import { Component, OnInit, Type } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import TypeModels from '../../models/characters.model';
import { Location } from '@angular/common';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {
  array : number[] = [1];
  characterId : string;
  character : TypeModels.Result;
  favorite : boolean = false;
  toast : any;
  constructor(private activatedRoute : ActivatedRoute, private http : HttpClient, private location : Location, private local : LocalstorageService) {
    this.characterId = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(`https://rickandmortyapi.com/api/character/${this.characterId}`)
    .subscribe((data : any)=>{
      this.character = data;
    });
    this.local.get();
    this.stayFavorite();
   }

  ngOnInit(): void {
  }
  goBack(): void{
    this.location.back();
  }
  favoriteCharacter(): void{
    this.favorite = !this.favorite;
    if(this.favorite == true){
      this.toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,

      })
      this.toast.fire({
        icon: 'success',
        title: 'Added to Favorites'
      })
      this.local.set(this.characterId);
    }
    if(this.favorite == false){
      this.toast.fire({
        icon: 'success',
        title: 'The caracter has been removed from your favorites '
      })
      localStorage.removeItem('favorites');

    }
  }
  stayFavorite():void{
    if(this.local.get() == this.characterId){
      this.favorite = true;
    }
  }
}
