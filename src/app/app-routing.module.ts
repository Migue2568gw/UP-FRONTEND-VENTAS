import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaComponent } from './vistas/persona/persona.component'
import { CrearpersonaComponent } from './vistas/crearpersona/crearpersona.component'
import { ModificarpersonaComponent } from './vistas/modificarpersona/modificarpersona.component'
import { ProductoComponent } from './vistas/producto/producto.component'
import { CrearproductoComponent } from './vistas/crearproducto/crearproducto.component'
import { ModificarproductoComponent } from './vistas/modificarproducto/modificarproducto.component'
import { CrearventaComponent } from './vistas/crearventa/crearventa.component'

const routes: Routes = [
  {path:'' ,redirectTo:'persona' , pathMatch:'full'},
  {path:'persona' ,component:PersonaComponent},
  {path:'crearPersona' ,component:CrearpersonaComponent},
  {path:'modificarPersona/:id' ,component:ModificarpersonaComponent},
  {path:'producto' ,component:ProductoComponent},
  {path:'crearProducto' ,component:CrearproductoComponent},
  {path:'modificarProducto/:id' ,component:ModificarproductoComponent},
  {path:'crearVenta/:id' ,component:CrearventaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponets = [
  PersonaComponent,
  CrearpersonaComponent,
  ModificarpersonaComponent,
  ProductoComponent,
  CrearproductoComponent,
  ModificarproductoComponent,
  CrearventaComponent
]
