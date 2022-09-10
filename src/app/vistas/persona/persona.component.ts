import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api/api.service';
import { ListaVentasI } from '../../Modelos/listaVentas.interface';
import { Router, ActivatedRoute } from '@angular/router';
import { ListaPersonasI } from '../../Modelos/listaPersonas.interface'
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {

  closeResult: string = '';

  constructor(
    private activerouter: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private modalService: NgbModal
  ) { }

  personas: ListaPersonasI[] = [];
  dataVentas: ListaVentasI[] = []

  ngOnInit(): void {
    this.api.getTodasPersonas().subscribe(data => {
      this.personas = data;
    })
  }

  editarPersona(id: any) {
    this.router.navigate(['modificarPersona', id]);
  }

  crearPersona() {
    this.router.navigate(['crearPersona']);
  }

  CrearCompra(id: any) {
    this.router.navigate(['crearVenta', id]);
  }
  VerCompra(id: any,contenido : any) {
    this.api.getVentasPorID(id).subscribe(data => {
      this.dataVentas = data;
      console.log(this.dataVentas)  

      this.modalService.open(contenido, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    })
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
