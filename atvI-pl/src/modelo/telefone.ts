export default class Telefone {
    private ddd: string;
    private numero: string;

    constructor(ddd: string, numero: string) {
        this.ddd = ddd;
        this.numero = numero;
    }

    public get getDdd(): string {
        return this.ddd;
    }

    public get getNumero(): string {
        return this.numero;
    }

    public setDdd(ddd: string): void {
        this.ddd = ddd;
    }

    public setNumero(numero: string): void {
        this.numero = numero;
    }
}