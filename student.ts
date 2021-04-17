export class Student {
    imagen: string;
    codigo: number;
    cedula: number;
    edad: number;
    direccion: string;
    telefono: number;

    constructor(imagen: string, codigo: number, cedula: number, edad: number, direccion: string, telefono: number) {
        this.imagen = imagen;
        this.codigo = codigo;
        this.cedula = cedula;
        this.edad = edad;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}