import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable} from 'rxjs/Rx';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable()
export class AdminService {

    private apiUrl = 'https://private-1e69fb-micradoc.apiary-mock.com';  // URL to web api
    private apiUrlTest = 'http://localhost:3000/api';  // URL to web api

    constructor(private http: HttpClient) { }

    getEmpresas():Observable<any[]>{
      const url = `${this.apiUrlTest}/empresas`;
        return this.http.get<any[]>(url).pipe(
            tap(empresas => this.log(`getEmpresas recuperadas`)),
            catchError(this.handleError('getEmpresas', []))
        );
    }

    /**
     * Retorna una empresa identificada por su ID.
     * 
     * @param idEmpresa - identificador de la empresa a recuperar
     */
    getEmpresaById(idEmpresa: number):Observable<any>{
        const url = `${this.apiUrl}/empresas/${idEmpresa}`;
        return this.http.get<any>(url).pipe(
          tap(_ => this.log(`getEmpresaById Empresa recuperada con id=${idEmpresa}`)),
          catchError(this.handleError<any>('getEmpresaById'))
        );
      }

    getConfiguracionesByEntidad(idEntidad):Observable<any[]>{
        const url = `${this.apiUrl}/configuraciones`;
          return this.http.get<any[]>(url).pipe(
              tap(configuraciones => this.log(`getConfiguracionesByEntidad recuperadas`)),
              catchError(this.handleError('getConfiguracionesByEntidad', []))
          );
    }

    getConfiguraciones():Observable<any[]>{
        const url = `${this.apiUrl}/configuraciones`;
          return this.http.get<any[]>(url).pipe(
              tap(configuraciones => this.log(`configuraciones recuperadas`)),
              catchError(this.handleError('getConfiguraciones', []))
          );
    }

    /**
     * Agrega una nueva configuracion
     * 
     * @param configuracion - nueva configuracion a guardar
     */
    addConfiguracion(configuracion:any):any{
      const url = `${this.apiUrlTest}/configuracionesfuncion`;
      return this.http.post<any>(url, configuracion, httpOptions).pipe(
        tap(_ => this.log(`addConfiguracion Configuracion guardada`)),
        catchError(this.handleError<any>('addConfiguracion'))
      );
    }

    /**
     * Actualiza una configuracion existente
     * 
     * @param configuracion - configuracion a actualizar
     */
    updateConfiguracion(configuracion:any):any{
        console.log("######UPDATE CONFIGURACION");
        console.log(configuracion);
        const url = `${this.apiUrlTest}/configuracionesfuncion/${configuracion.id}`;
        return this.http.put<any>(url, configuracion, httpOptions).pipe(
          tap(_ => this.log(`updateConfiguracion Configuracion actualizada`)),
          catchError(this.handleError<any>('updateConfiguracion'))
        );
      }

    getFuncionesByEmpresa(idEmpresa:number):Observable<any[]>{
        const url = `${this.apiUrlTest}/empresas/${idEmpresa}/funciones`;
          return this.http.get<any[]>(url).pipe(
              tap(funciones => this.log(`funcionesByEmpresa recuperadas`)),
              catchError(this.handleError('getFuncionesByEmpresa', []))
          );
    }

    getTiposDocumentosByEmpresa(idEmpresa:number):Observable<any[]>{
        // Analizar la URL si se determina que los tipos de documentos son
        // por empresa
        // const url = `${this.apiUrlTest}/empresas/${idEmpresa}/funciones`;
        const url = `${this.apiUrlTest}/tiposDocumentos`;
        return this.http.get<any[]>(url).pipe(
            tap(funciones => this.log(`getTiposDocumentosByEmpresa recuperadas`)),
            catchError(this.handleError('getTiposDocumentosByEmpresa', []))
        );
    }

    getFuncionesByEmpresaEntidad(idEmpresa:number, idEntidad:number):Observable<any[]>{
        const url = `${this.apiUrlTest}/empresas/${idEmpresa}/Funciones?filter[where][entidadId]=${idEntidad}&filter[include][configuracion]=tipoDocumento`;
        
          return this.http.get<any[]>(url).pipe(
              tap(funciones => this.log(`getFuncionesByEmpresaEntidad recuperadas`)),
              catchError(this.handleError('getFuncionesByEmpresaEntidad', []))
          );
    }

    getConfiguracionByFuncion(idFuncion:number):Observable<any[]>{
        const url = `${this.apiUrlTest}/funciones/${idFuncion}/configuracion?filter[include]=tipoDocumento`;
        // http://localhost:3000/api/Funciones/2/configuracion?filter[include]=tipoDocumento
        // http://localhost:3000/api/ConfiguracionesFuncion?filter[include]=tipoDocumento
          return this.http.get<any[]>(url).pipe(
              tap(configuracion => this.log(`getConfiguracionByFuncion recuperadas`)),
              catchError(this.handleError('getConfiguracionByFuncion', []))
          );
    }

    getFunciones():Observable<any[]>{
        const url = `${this.apiUrl}/funciones`;
          return this.http.get<any[]>(url).pipe(
              tap(funciones => this.log(`funciones recuperadas`)),
              catchError(this.handleError('getFunciones', []))
          );
    }

    getFuncionesByEntidad(idEntidad:number):Observable<any[]>{
        const url = `${this.apiUrlTest}/entidades/${idEntidad}/funciones`;
          return this.http.get<any[]>(url).pipe(
              tap(funciones => this.log(`funciones recuperadas`)),
              catchError(this.handleError('getFuncionesByEntidad', []))
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