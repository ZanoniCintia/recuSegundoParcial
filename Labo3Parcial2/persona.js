var Persona;
(function (Persona) {
    var Personas = /** @class */ (function () {
        function Personas(id, nombre, apellido, edad) {
            this.id = id;
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Personas.prototype.getNombre = function () {
            return this.nombre;
        };
        Personas.prototype.setNombre = function (nombre) {
            this.nombre = nombre;
        };
        Personas.prototype.getApellido = function () {
            return this.nombre;
        };
        Personas.prototype.setApellido = function (apellido) {
            this.nombre = apellido;
        };
        Personas.prototype.getEdad = function () {
            return this.edad;
        };
        Personas.prototype.getId = function () {
            return this.id;
        };
        Personas.prototype.setId = function (id) {
            this.id = id;
        };
        return Personas;
    }());
    Persona.Personas = Personas;
})(Persona || (Persona = {}));
