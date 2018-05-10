import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

import { IDocumento } from './../interfaces/IDocumento';
import { IEntidad } from '../interfaces/IEntidad';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class DocumentoService {

    private apiUrl = 'https://private-1e69fb-micradoc.apiary-mock.com';  // URL to web api
    private apiUrlTest = 'http://localhost:3000/api';  // URL to web api

    constructor(private http: HttpClient) { }

    getFormulario():Observable<any>{
      const url = `${this.apiUrl}/config`;
        return this.http.get<any>(url).pipe(
            tap(config => this.log(`config recuperada`)),
            catchError(this.handleError('getFormulario', []))
        );
    }

    getDocumentos():Observable<IDocumento[]>{
      const url = `${this.apiUrl}/documentos`;
        return this.http.get<IDocumento[]>(url).pipe(
            tap(documentos => this.log(`documentos recuperados`)),
            catchError(this.handleError('getDocumentos', []))
        );
    }

    /**
     * Retorna un documento identificado por su ID. El objeto retornado 
     * conforma la interface IDocumento. Ver getDocumentoDinamicoById
     * para otros usos.
     * 
     * @param idDocumento - identificar del documento a recuperar
     */
    getDocumentoById(idDocumento: number):Observable<IDocumento>{
      const url = `${this.apiUrl}/documentos/${idDocumento}`;
      return this.http.get<IDocumento>(url).pipe(
        tap(_ => this.log(`documento recuperado con id=${idDocumento}`)),
        catchError(this.handleError<IDocumento>('getDocumentoById'))
      );
    }

    /**
     * Retorna un documento identificado por su ID. El objeto retornado 
     * no conforma ninguna interface específica y por lo tanto el objeto
     * recuperado puede variar su estructura en forma independiente del 
     * resto de los documentos.
     * Utilizar principalmente para la vista o edicion de documentos que
     * se han definido en forma dimanica por ejemplo atraves de form.io
     * 
     * @param idDocumento - identificar del documento a recuperar
     */
    getDocumentoDinamicoById(idDocumento: number):Observable<any>{
      const url = `${this.apiUrl}/documentos/${idDocumento}`;
      return this.http.get<any>(url).pipe(
        tap(_ => this.log(`documento recuperado con id=${idDocumento}`)),
        catchError(this.handleError<any>('getDocumentoDinamicoById'))
      );
    }

    /**
     * Retorna un listado de documentos pertenecientes a una entidad.
     * 
     * @param idEntidad - identificar de la entidad que interesa recuperar docs
     */
    getDocumentosByEntidad(idEntidad: number):Observable<IDocumento[]>{
      const url = `${this.apiUrl}/entidades/${idEntidad}/documentos`;
      return this.http.get<IDocumento[]>(url).pipe(
          tap(documentos => this.log(`documentos recuperados de la entidad con id =${idEntidad}`)),
          catchError(this.handleError('getDocumentosIdEntidad', []))
      );
    }

    /**
     * Retorna un listado de entidades!!!
     * Dentro de cada entidad se espera que se encuentren los documentos
     */
    getDocumentosVehiculos():Observable<IEntidad[]>{
      const url = `${this.apiUrl}/entidades/vehiculos`;
      return this.http.get<IEntidad[]>(url).pipe(
          tap(entidades => this.log(`documentos vehiculos recuperados`)),
          catchError(this.handleError('getDocumentosVehiculos', []))
      );
    }

    /**
     * Retorna una identificada por su ID.
     * 
     * @param idEntidad - identificar de la entidad a recuperar
     */
    getEntidadById(idEntidad: number):Observable<IEntidad>{
      const url = `${this.apiUrl}/entidades/${idEntidad}`;
      return this.http.get<IEntidad>(url).pipe(
        tap(_ => this.log(`entidad recuperada con id=${idEntidad}`)),
        catchError(this.handleError<IEntidad>('getEntidadById'))
      );
    }

    /**
     * Retorna un listado de tipos de documentos.
     * @deprecated Usar admin.service
     */
    getTiposDocumentos():Observable<any[]>{
      const url = `${this.apiUrl}/documentos/tipos_documentos`;
      return this.http.get<any[]>(url).pipe(
          tap(entidades => this.log(`tipos documentos recuperados`)),
          catchError(this.handleError('getTiposDocumentos', []))
      );
    }

    /**
     * Retorna un tipo de documento por su ID.
     * 
     * @param idTipoDocumento - identificar del tipo de documento
     */
    getTipoDocumentoById(idTipoDocumento: number):Observable<any>{
      const url = `${this.apiUrl}/documentos/tipos_documentos/${idTipoDocumento}`;
      return this.http.get<IEntidad>(url).pipe(
        tap(_ => this.log(`tipo documento recuperado con id=${idTipoDocumento}`)),
        catchError(this.handleError<IEntidad>('getTipoDocumentoById'))
      );
    }

    /**
     * Agrega un nuevo documento.
     * 
     * @param documento - nuevo documento a guardar
     */
    addDocumentoDinamico(documento:any):any{
      console.log(documento)
      const url = `${this.apiUrl}/documentos`;
      return this.http.post<any>(url, documento, httpOptions).pipe(
        tap(_ => this.log(`documento guardado`)),
        catchError(this.handleError<any>('addDocumentoDinamico'))
      );
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