import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductoI } from '../../Modelos/producto.interface';
import { AlertasService } from '../../servicios/alertas/alertas.service'
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI } from '../../Modelos/response.interface';

@Component({
  selector: 'app-modificarproducto',
  templateUrl: './modificarproducto.component.html',
  styleUrls: ['./modificarproducto.component.css']
})
export class ModificarproductoComponent implements OnInit {

  dataProducto!: ProductoI;

  editarPro = new FormGroup({
    IdProducto : new FormControl(''),
    Producto : new FormControl('', Validators.required),
    ValorUnitario : new FormControl('', Validators.required)
  })

  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alerta: AlertasService
  ) { }

  ngOnInit(): void {
    let productoid = this.activerouter.snapshot.paramMap.get('id');
    this.api.getProductoPorID(productoid).subscribe(data => {
      this.dataProducto = data[0];
      this.editarPro.patchValue({
        IdProducto: this.dataProducto.IdProducto.toString(),
        Producto: this.dataProducto.Producto,
        ValorUnitario: this.dataProducto.ValorUnitario.toString(),
      }) 
      console.log(this.editarPro.value)  
    })
  }

  onproducto(form: any) {
    this.dataProducto = form;
    if (this.dataProducto.Producto == '' || this.dataProducto.ValorUnitario.toString() == '') {
      this.alerta.mostrarError('Campos Vacios', 'Revisar')
    } else {
      this.api.ModificarProducto(form).subscribe((res) => {     
        console.log(res)
        let dataResponde:ResponseI = res;
        if(dataResponde.codigo == 200 && dataResponde.descripcion != null){
          this.alerta.mostrarExitoso('Se realizao la modificacion','Satisfactorio')
          this.router.navigate(['producto']);
        }else {
          this.alerta.mostrarError('No se realizo Modificacion','Error')
        }
      });
    } 
  }

  onVolver(){
    this.router.navigate(['producto']);
  }
}
