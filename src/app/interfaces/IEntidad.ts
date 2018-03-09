import { IDocumento } from "./IDocumento";

export interface IEntidad {
    id: string,
    nombre: string,
    tipo: string,
    funcion: string,
    url: string,
    statusOk: Boolean,
    documentos: [IDocumento],
}