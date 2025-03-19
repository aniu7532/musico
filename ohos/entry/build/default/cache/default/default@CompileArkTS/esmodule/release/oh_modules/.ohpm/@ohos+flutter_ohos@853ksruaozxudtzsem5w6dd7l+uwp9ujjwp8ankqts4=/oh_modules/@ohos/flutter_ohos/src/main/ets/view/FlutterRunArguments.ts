export default class FlutterRunArguments {
    public bundlePath: string;
    public entrypoint: string;
    public libraryPath: string;
    constructor(x86: string, y86: string, z86: string) {
        this.bundlePath = x86;
        this.entrypoint = y86;
        this.libraryPath = z86;
    }
}
