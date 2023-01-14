const arrayNotas = [
    {
        codigoNota: 0,
        titulo: "Hacer compra",
        prioridad: 1,
        fechaCreada: new Date(2011, 4, 14, 20, 21, 22),
        isCompletada: false
    },
    {
        codigoNota: 1,
        titulo: "Recoger regalos",
        prioridad: 2,
        fechaCreada: new Date(),
        isCompletada: false
    },
    {
        codigoNota: 2,
        titulo: "Revisar correo",
        prioridad: 3,
        fechaCreada: new Date(),
        isCompletada: true
    }
]

const { createApp } = Vue

createApp({
    data() {
        return {
            isButtonDisabled: false,
            verEntrada: true,
            campoFiltro: "",
            texto: "",
            prioSelected: "",
            arrayFiltrado: arrayNotas,
            notas: arrayNotas,
            madeBy: "Isabel Cobo"
        }
    },
    methods: {
        muestraTareasTotales() {
            return this.notas.length
        },
        cambiarVerEntrada() {
            this.verEntrada = !this.verEntrada;
        },
        nuevaNota() {
            this.notas.push(
                {
                    codigoNota: this.notas.length - 1,
                    titulo: this.texto,
                    prioridad: 1,
                    fechaCreada: new Date(),
                    isCompletada: false
                })
            this.texto = "";
        },
        borrar(nota) {
            this.notas = this.notas.filter(not => not !== nota);
        },
        check(nota) {
            this.changeCheck(nota, true);
        },
        unCheck(nota) {
            this.changeCheck(nota, false);
        },changeCheck(nota, checked) {
            this.notas = this.notas.map(not => {
                if (not == nota) {
                    return {
                        codigoNota: nota.codigoNota,
                        titulo: nota.titulo,
                        prioridad: nota.prioridad,
                        fechaCreada: nota.fechaCreada,
                        isCompletada: checked
                    }
                }
                return not;
            })
        },
        changePriority(nota, priority) {
            this.notas = this.notas.map(not => {
                if (not == nota) {
                    return {
                        codigoNota: nota.codigoNota,
                        titulo: nota.titulo,
                        prioridad: priority,
                        fechaCreada: nota.fechaCreada,
                        isCompletada: nota.isCompletada
                    }
                }
                return not;
            })
        },
        borrarCompletadas() {
            let completadas = this.notas.filter(not => not.isCompletada == true);
            completadas.forEach(completada => {
                this.borrar(completada);
            });
            this.showAll();
        },
        ordenar(array) {
            array.sort((a, b) => {
                if (a.prioridad < b.prioridad) {
                    return 1;
                }
                if (a.prioridad > b.prioridad) {
                    return -1;
                }
                return 0;
            });
            return array;
        },
        filtrarElementos() {
            let arrayFiltrado = this.notas.filter((not) => (not.titulo.toLowerCase()).includes(this.campoFiltro.toLowerCase()));
            this.arrayFiltrado = this.ordenar(arrayFiltrado);
        },
        showAll(){            
            this.arrayFiltrado = this.ordenar(this.notas);
        }
    },
    computed: {
        
        filtrarPorPrioridad() {
            let arrayFiltrado= this.notas;

            if (this.prioSelected != 0) {
                arrayFiltrado = this.notas.filter((not) => not.prioridad == parseInt(this.prioSelected));
            }
            
            this.arrayFiltrado = this.ordenar(arrayFiltrado);
        }
    }
}).mount('#main')