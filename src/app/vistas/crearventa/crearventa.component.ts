import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { AlertasService } from '../../servicios/alertas/alertas.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI } from '../../Modelos/response.interface';
import { ListaProductosI } from '../../Modelos/listaProductos.interface'
import { VentasI } from '../../Modelos/ventas.interface';

@Component({
  selector: 'app-crearventa',
  templateUrl: './crearventa.component.html',
  styleUrls: ['./crearventa.component.css']
})
export class CrearventaComponent implements OnInit {

  crearventa = new FormGroup({
    IdProducto: new FormControl('', Validators.required),
    IdPersona: new FormControl('', Validators.required),
    CantidadProducto: new FormControl('', Validators.required)
  })

  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alerta: AlertasService
  ) { }

  productos: ListaProductosI[] = [];
  venta!: VentasI;
  personID: string | null | undefined;
  numero: number = 0;

  ngOnInit(): void {
    let personaId = this.activerouter.snapshot.paramMap.get('id');
    this.personID = personaId;
    this.api.getTodosLosProductos().subscribe(data => {
      this.productos = data;
    })
  }

  Contador(valor: number) {
    this.numero += valor;
    if (valor <= 0) { this.numero = 0 }
  }

  onVenta(form: any) {
    this.venta = form;
    this.venta.IdPersona = Number(this.personID)
    this.venta.CantidadProducto = this.numero;
    this.venta = form;
    if (this.venta.IdProducto.toString() == '' || this.venta.CantidadProducto.toString() == '0') {
      this.alerta.mostrarError('Campos Vacios', 'Revisar')
    } else {
      this.api.CrearVenta(this.venta).subscribe((res) => {
        console.log(res)
        let dataResponde: ResponseI = res;
        if (dataResponde.codigo == 200 && dataResponde.descripcion != null) {
          this.alerta.mostrarExitoso('Se creo la compra exitosamente', 'Satisfactorio')
          this.router.navigate(['persona']);
        } else {
          this.alerta.mostrarError('No creo la compra', 'Error')
        }
      });
    }
  }

  onVolver(){
    this.router.navigate(['persona']);
  }
}
