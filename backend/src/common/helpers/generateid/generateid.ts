export class generateIdUser {
    private static counter: number = 0;

    static generateId(prefix: string) {
        this.counter++;
        return prefix + this.counter.toString();
    }
}