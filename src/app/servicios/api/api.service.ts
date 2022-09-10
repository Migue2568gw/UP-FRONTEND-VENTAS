import { Injectable } from '@angular/core';
import { VentasI } from '../../Modelos/ventas.interface';
import { ProductoI } from '../../Modelos/producto.interface';
import { PersonaI } from '../../Modelos/persona.interface';
import { ListaPersonasI } from '../../Modelos/listaPersonas.interface';
import { ListaProductosI } from '../../Modelos/listaProductos.interface';
import { ListaVentasI } from '../../Modelos/listaVentas.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ResponseI } from '../../Modelos/response.interface';

@Injectable({
  providedIn: 'root'
  
})
export class ApiService {

    // aca ira la url del api en este caso es local 
    url: string = "http://localhost:57944/api/"

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Your Token'
    }),
  };

// ---------------------------- SECCION DE PERSONAS ---------------------------
  getTodasPersonas():Observable<ListaPersonasI[]>{
    return this.http
    .get<ListaPersonasI[]>(
      this.url + 'persona/consultarpersona'
    )
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getPersonasporID(id: any):Observable<PersonaI[]>{
    return this.http
    .post<PersonaI[]>(
      this.url + 'persona/consultarpersonabyid?IdPersona=' + id,
      JSON.stringify(id),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.errorHandl));
  }  

  CrearPersona(form:PersonaI):Observable<ResponseI>{
    return this.http
    .post<ResponseI>(
      this.url + 'persona/crearpersona',
      JSON.stringify(form),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.errorHandl));
  }

  ModificarPersona(form:PersonaI):Observable<ResponseI>{
    return this.http
    .post<ResponseI>(
      this.url + 'persona/modificarpersona',
      JSON.stringify(form),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.errorHandl));
  }

  //----------------------------------SECCION PRODUCTOS ---------------------------------
  getTodosLosProductos():Observable<ListaProductosI[]>{
    return this.http
    .get<ListaProductosI[]>(
      this.url + 'producto/consultarproducto'
    )
    .pipe(retry(1), catchError(this.errorHandl));
  }

  getProductoPorID(id: any):Observable<ProductoI[]>{
    return this.http
    .post<ProductoI[]>(
      this.url + 'producto/consultarproductobyid?IdProducto=' + id,
      JSON.stringify(id),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.errorHandl));
  } 

  CrearProducto(form:ProductoI):Observable<ResponseI>{
    return this.http
    .post<ResponseI>(
      this.url + 'producto/crearproducto',
      JSON.stringify(form),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.errorHandl));
  }

  ModificarProducto(form:ProductoI):Observable<ResponseI>{
    return this.http
    .post<ResponseI>(
      this.url + 'producto/modificarproducto',
      JSON.stringify(form),
      this.httpOptions
    )
    .pipe(retry(1), catchError(this.errorHandl));
  }

    //----------------------------------SECCION VENTAS ---------------------------------

    getVentasPorID(id: any):Observable<ListaVentasI[]>{
      return this.http
      .post<ListaVentasI[]>(
        this.url + 'Venta/consultarventabyid?IdPersona=' + id,
        JSON.stringify(id),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
    } 

    CrearVenta(form:VentasI):Observable<ResponseI>{
      return this.http
      .post<ResponseI>(
        this.url + 'Venta/crearventa',
        JSON.stringify(form),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
    }

  errorHandl(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // se obtine el error por el lado del cliente
      errorMessage = error.error.message;
    } else {
    // se obtine el error por el lado del cliente
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
