namespace Persona
{
    export class Cliente extends Personas
    {
        private sexo :string;

        constructor(id:number,nombre:string,apellido:string,edad:number,sexo:string)
        {
            super(id,nombre,apellido,edad);
            this.sexo=sexo;
        }
    }
}    

