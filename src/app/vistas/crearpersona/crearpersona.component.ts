import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertasService } from '../../servicios/alertas/alertas.service'
import { PersonaI } from '../../Modelos/persona.interface';
import { ResponseI } from '../../Modelos/response.interface';

@Component({
  selector: 'app-crearpersona',
  templateUrl: './crearpersona.component.html',
  styleUrls: ['./crearpersona.component.css']
})
export class CrearpersonaComponent implements OnInit {

  Persona!: PersonaI;

  crearper = new FormGroup({
    Nombre: new FormControl('', [Validators.required]),
    Apellido: new FormControl('', Validators.required),
    Cedula: new FormControl('', Validators.required),
    Telefono: new FormControl('', Validators.required),
  })

  constructor(
    private router: Router,
    private api: ApiService,
    private alerta: AlertasService
  ) { }

  ngOnInit(): void {
  }

  onPersona(form: any) {
    this.Persona = form;
    if (this.Persona.Nombre == '' || this.Persona.Apellido == '' || this.Persona.Cedula.toString() == '' || this.Persona.Telefono.toString() == '') {
      this.alerta.mostrarError('Campos Vacios', 'Revisar')
    } else {
      this.api.CrearPersona(form).subscribe((res) => {
        console.log(res)
        let dataResponde: ResponseI = res;
        if (dataResponde.codigo == 200 && dataResponde.descripcion != null) {
          this.alerta.mostrarExitoso('Se creo el cliente existosamente', 'Satisfactorio')
          this.router.navigate(['persona']);
        } else {
          this.alerta.mostrarError('No se creo el cliente', 'Error')
        }
      });
    }
  }

  onVolver(){
    this.router.navigate(['persona']);
  }

}
