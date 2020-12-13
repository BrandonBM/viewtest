export class Usuario {
    constructor(
        public cedula: number,
        public nombres: string,
        public apellidos: string,
        public correo: string,
        public telefono: number,
        public id?: number,
    ) {}
}