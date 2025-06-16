export interface Usuario {
  _id: string;
  username: string;
}

export interface Gasto {
    _id: string; 
    descripcion: string;
    fecha: string;
    monto: number;
    categoria?: string;
    usuario: Usuario;
    metodoPago: string;
    comprobanteUrl: string;
}