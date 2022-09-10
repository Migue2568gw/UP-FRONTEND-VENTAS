import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PersonaI } from '../../Modelos/persona.interface';
import { ApiService } from '../../servicios/api/api.service';
import { AlertasService } from '../../servicios/alertas/alertas.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ResponseI } from '../../Modelos/response.interface';

@Component({
  selector: 'app-modificarpersona',
  templateUrl: './modificarpersona.component.html',
  styleUrls: ['./modificarpersona.component.css']
})
export class ModificarpersonaComponent implements OnInit {

  dataPersona!: PersonaI;

  editarPer = new FormGroup({
    IdPersona: new FormControl(''),
    Nombre: new FormControl(''),
    Apellido: new FormControl(''),
    Cedula: new FormControl(''),
    Telefono: new FormControl('')
  });

  constructor(
    private activerouter: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private alerta: AlertasService
  ) { }


  ngOnInit(): void {
    let personaid = this.activerouter.snapshot.paramMap.get('id');
    this.api.getPersonasporID(personaid).subscribe(data => {
      this.dataPersona = data[0];
      this.editarPer.patchValue({
        IdPersona: this.dataPersona.IdPersona.toString(),
        Nombre: this.dataPersona.Nombre,
        Apellido: this.dataPersona.Apellido,
        Cedula: this.dataPersona.Cedula.toString(),
        Telefono: this.dataPersona.Telefono.toString()
      })
    })
  }

  onPersona(form: any) {
    this.dataPersona = form;
    if (this.dataPersona.Nombre == '' || this.dataPersona.Apellido == '' || this.dataPersona.Cedula.toString() == '' || this.dataPersona.Telefono.toString() == '') {
      this.alerta.mostrarError('Campos Vacios', 'Revisar')
    } else {
      this.api.ModificarPersona(form).subscribe((res) => {
        console.log(res)
        let dataResponde: ResponseI = res;
        if (dataResponde.codigo == 200 && dataResponde.descripcion != null) {
          this.alerta.mostrarExitoso('Se realizao la modificacion', 'Satisfactorio')
          this.router.navigate(['persona']);
        } else {
          this.alerta.mostrarError('No se realizo Modificacion', 'Error')
        }
      });
    }
  }

  onVolver() {
    this.router.navigate(['persona']);
  }
}
