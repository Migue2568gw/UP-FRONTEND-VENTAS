import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor(
    private toast:ToastrService
  ) { }

  mostrarExitoso(texto: any,titulo:any){
    this.toast.success(texto,titulo)
  }

  mostrarError(texto: any,titulo:any){
    this.toast.error(texto,titulo)
  }
}
