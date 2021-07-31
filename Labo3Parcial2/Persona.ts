namespace Persona
{
    export class Personas
    {
        private nombre : string;
        private id : number;
        private apellido: string;
        private edad:number;

        constructor(id:number,nombre:string,apellido:string,edad:number)
        {
            this.id=id;
            this.nombre=nombre;
            this.apellido=apellido;
            this.edad=edad;
        }

        public getNombre():string
        {
            return this.nombre;
        }

        public setNombre(nombre:string):void
        {
            this.nombre=nombre;
        }

        public getApellido():string
        {
            return this.nombre;
        }

        public setApellido(apellido:string):void
        {
            this.nombre=apellido;
        }

        public getEdad():number
        {
            return this.edad;
        }


        public getId():number
        {
            return this.id;
        }

        public setId(id:number):void
        {
            this.id=id;
        }
            
    }

       
}
