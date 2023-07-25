import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  resultadosBusqueda: Subject<any[]> = new Subject<any[]>;

  constructor() { }

  // guardamos la data del buscador
  setResultadoBusqueda(results: any[]){
    this.resultadosBusqueda.next(results);
    //console.log(results);
    
  }

  // la obtenemos para la vista
  getResultadosBusqueda(){
    //console.log(this.resultadosBusqueda);
    
    return this.resultadosBusqueda.asObservable();
  }
}
