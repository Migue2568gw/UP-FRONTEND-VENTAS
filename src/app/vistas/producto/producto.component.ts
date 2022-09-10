import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { Router } from '@angular/router'; 
import {ListaProductosI} from '../../Modelos/listaProductos.interface'


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  productos: ListaProductosI[] = [];

  ngOnInit(): void {
    this.api.getTodosLosProductos().subscribe(data => {
      this.productos = data;
    })
  }
  crearProducto() {
    this.router.navigate(['crearProducto']);
  }

  editarProducto(id: any) {
    this.router.navigate(['modificarProducto', id]);
  }
}
