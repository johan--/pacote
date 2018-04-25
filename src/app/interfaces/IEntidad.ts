import { IDocumento } from "./IDocumento";

export interface IEntidad {
    id: number,
    nombre: string,
    tipo: string,
    funcion: string,
    url: string,
    statusOk: Boolean,
    documentos: [IDocumento],
}

// function esOperador(entidadObj: IEntidad) {
//     return entidadObj.id == 1;
// }

