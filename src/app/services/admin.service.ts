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

    constructor(private http: HttpClient) { }

    getEmpresas():Observable<any[]>{
      const url = `${this.apiUrl}/empresas`;
        return this.http.get<any[]>(url).pipe(
            tap(empresas => this.log(`empresas recuperadas`)),
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
          tap(_ => this.log(`empresa recuperada con id=${idEmpresa}`)),
          catchError(this.handleError<any>('getEmpresaById'))
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
     * Agrega un nuevo documento.
     * 
     * @param documento - nuevo documento a guardar
     */
    addConfiguracion(configuracion:any):any{
      console.log(configuracion)
      const url = `${this.apiUrl}/configuraciones`;
      return this.http.post<any>(url, configuracion, httpOptions).pipe(
        tap(_ => this.log(`configuracion guardada`)),
        catchError(this.handleError<any>('addConfiguracion'))
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