import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertasService } from '../../servicios/alertas/alertas.service'
import { ResponseI } from '../../Modelos/response.interface';
import { ProductoI } from 'src/app/Modelos/producto.interface';

@Component({
  selector: 'app-crearproducto',
  templateUrl: './crearproducto.component.html',
  styleUrls: ['./crearproducto.component.css']
})
export class CrearproductoComponent implements OnInit {
  dataProducto!: ProductoI;

  CrearPro = new FormGroup({
    Producto: new FormControl('', Validators.required),
    ValorUnitario: new FormControl('', Validators.required)
  })

  constructor(
    private router: Router,
    private api: ApiService,
    private alerta: AlertasService
  ) { }

  ngOnInit(): void {
  }

  onProducto(form: any) {
    this.dataProducto = form;
    if (this.dataProducto.Producto == '' || this.dataProducto.ValorUnitario.toString() == '') {
      this.alerta.mostrarError('Campos Vacios', 'Revisar')
    } else {
      this.api.CrearProducto(form).subscribe((res) => {
        console.log(res)
        let dataResponde: ResponseI = res;
        if (dataResponde.codigo == 200 && dataResponde.descripcion != null) {
          this.alerta.mostrarExitoso('Se creo el producto existosamente', 'Satisfactorio')
          this.router.navigate(['producto']);
        } else {
          this.alerta.mostrarError('No se creo el producto', 'Error')
        }
      });
    }
  }

  onVolver(){
    this.router.navigate(['producto']);
  }
}
