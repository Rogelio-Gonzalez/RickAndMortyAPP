import { Component, OnInit, Input } from '@angular/core';
import TypeModels from '../../models/characters.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  array : number[] = [1];
  config = {
    id: 'custom',
    itemsPerPage: 12,
    currentPage: 1,
    totalItems: 671
  };
  characters : TypeModels.Result[];
  constructor(private http : HttpClient) {
    for(let i = 2; i <= 671; i++){
      this.array.push(i);
    }
    this.http.get(`https://rickandmortyapi.com/api/character/`+ this.array)
      .subscribe((data : any)=>{
      this.characters = data;
    });
  }
  setItemsPerPage(event): void{
    this.config.itemsPerPage = event;
  }
   onPageChange(event): void{
    this.config.currentPage = event;
  }
  ngOnInit(): void {
  }
}
