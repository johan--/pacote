import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { IDocumento } from './../interfaces/IDocumento';
import { IEntidad } from '../interfaces/IEntidad';


@Injectable()
export class DocumentoService {

    private apiUrl = 'https://private-1e69fb-micradoc.apiary-mock.com/documentos';  // URL to web api

    constructor(private http: HttpClient) { }


    getDocumentos():Observable<IDocumento[]>{
        return this.http.get<IDocumento[]>(this.apiUrl).pipe(
            tap(documentos => this.log(`documentos recuperados`)),
            catchError(this.handleError('getDocumentos', []))
        );
    }

    getDocumentosVehiculos():Observable<IEntidad[]>{
      const url = `${this.apiUrl}/vehiculos/`;
      return this.http.get<IEntidad[]>(url).pipe(
          tap(entidades => this.log(`documentos vehiculos recuperados`)),
          catchError(this.handleError('getDocumentosVehiculos', []))
      );
    }

    // /**
    //  * Retorna un listado de documentos pertenecientes a una entidad.
    //  * 
    //  * @param idEntidad - identificar de la entidad que interesa recuperar docs
    //  */
    // getDocumentosVehiculoById(idEntidad: number):Observable<IEntidad>{
    //   const url = `${this.apiUrl}/vehiculos/${idEntidad}`;
    //   return this.http.get<IEntidad>(url).pipe(
    //       tap(_ => this.log(`documentos recuperados del vehiculo id =${idEntidad}`)),
    //       catchError(this.handleError<IEntidad>('getDocumentosVehiculoById'))
    //   );
    // }
    
    /**
     * Retorna un listado de documentos pertenecientes a una entidad.
     * 
     * @param idEntidad - identificar de la entidad que interesa recuperar docs
     */
    getDocumentosByEntidad(idEntidad: number):Observable<IDocumento[]>{
      const url = `${this.apiUrl}/vehiculos/${idEntidad}`;
      return this.http.get<IDocumento[]>(url).pipe(
          tap(documentos => this.log(`documentos recuperados del vehiculo id =${idEntidad}`)),
          catchError(this.handleError('getDocumentosIdEntidad', []))
      );
    }

    getDocumentoById(id: number):Observable<IDocumento>{
      const url = `${this.apiUrl}/${id}`;
      return this.http.get<IDocumento>(url).pipe(
        tap(_ => this.log(`documento recuperado id=${id}`)),
        catchError(this.handleError<IDocumento>('getDocumentoById'))
      );
    }

    getEntidadById(id: number):Observable<IEntidad>{
      let entidad:IEntidad;
      entidad ={
        id: "id",
        nombre: "AAN 348. Toyota Hilux",
        tipo: "Vehiculo",
        funcion: "Camioneta",
        url: "",
        statusOk: false,
        documentos:null
      }
      return of(entidad);
    }


    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
    
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
    
        // TODO: better job of transforming error for user consumption
        this.log(`${operation} failed: ${error.message}`);
    
        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }


    /** Log a HeroService message with the MessageService */
    private log(message: string) {
        console.log('DocumentoService: ' + message);
  }
}