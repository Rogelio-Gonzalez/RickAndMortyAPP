import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import TypeModels from 'src/app/models/characters.model';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  localS : string;
  deleted : boolean = true;
  characters : TypeModels.Result;
  constructor(private http : HttpClient, private router : Router, private local : LocalstorageService) {
    this.localS = localStorage.getItem('favorites');
    this.http.get(`https://rickandmortyapi.com/api/character/`+ this.localS)
    .subscribe((data : TypeModels.Result)=>{
      this.characters = data;
    });
   }
  ngOnInit(): void {
  }
  deleteFavorite(): void{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

        localStorage.removeItem('favorites');
        swalWithBootstrapButtons.fire(
          'Deleted!',
          'Your info has been deleted.',
          'success'
        )
        this.deleted = false;
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'Your info still saved',
          'error'
        )
        this.deleted = true;
      }
    })
  }

}
