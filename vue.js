const { createApp } = Vue

createApp({
    data() {
        return {
            isButtonDisabled: false,
            verEntrada: true,
            campoFiltro: "",
            texto: "",
            prioSelected: "",
            notas: [],
            arrayFiltrado: this.notas,
            madeBy: "Isabel Cobo"
        }
    },
    methods: {
        muestraTareasTotales() {
            try {
                return this.notas.length
            } catch (error) {
                return 0;
            }
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

            this.actualizarStorage();
        },
        borrar(nota) {
            this.notas = this.notas.filter(not => not !== nota);
            this.actualizarStorage();
        },
        check(nota) {
            this.changeCheck(nota, true);
            this.actualizarStorage();
        },
        unCheck(nota) {
            this.changeCheck(nota, false);
            this.actualizarStorage();
        }, changeCheck(nota, checked) {
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

            this.actualizarStorage();
        },
        borrarCompletadas() {
            let completadas = this.notas.filter(not => not.isCompletada == true);
            completadas.forEach(completada => {
                this.borrar(completada);
            });
            this.showAll();
        },
        ordenar(array) {
            try {
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
            } catch (error) {

            }

        },
        filtrarElementos() {
            let arrayFiltrado = this.notas.filter((not) => (not.titulo.toLowerCase()).includes(this.campoFiltro.toLowerCase()));
            this.arrayFiltrado = this.ordenar(arrayFiltrado);
        },
        showAll() {
            this.arrayFiltrado = this.ordenar(this.notas);
        },
        actualizarStorage() {
            window.localStorage.setItem("listaNotas", JSON.stringify(this.notas));
        }
    },
    computed: {
        tareasPendientes() {
            try {
                return this.notas.filter((not) => not.isCompletada == false).length
            } catch (error) {
                return 0;
            }
        },
        filtrarPorPrioridad() {
            let arrayFiltrado = this.notas;

            if (this.prioSelected != 0) {
                arrayFiltrado = this.notas.filter((not) => not.prioridad == parseInt(this.prioSelected));
            }

            this.arrayFiltrado = this.ordenar(arrayFiltrado);
        }
    },
    created() {
        let lista = JSON.parse(window.localStorage.getItem("listaNotas"));
        if (typeof this.notas !== 'null' && typeof this.notas !== 'undefined') {
            this.notas = lista;
        } else {
            this.notas = [];
        }
    }
}).mount('body')