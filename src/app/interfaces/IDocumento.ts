import { IEntidad } from './IEntidad';

export interface IDocumento {
    id: string,
    tipoDocumento: string,
    metadata: string,
    created: string,
    updated: string,
    fileDownloadUrl: string,
    filetype : string,
    filetypeIcon : string,
    fileThumbnail : string,
    requerido: Boolean,
    vencido: Boolean,
    status: string,
    archivado: Boolean,
    replacedBy : string,
    entidad: [IEntidad],
    fechaVencimiento: string,
    fechaPreaviso: string,
}