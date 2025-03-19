import type Want from "@ohos:app.ability.Want";
export default class FlutterShellArgs {
    static ARG_KEY_TRACE_STARTUP = "trace-startup";
    static ARG_TRACE_STARTUP = "--trace-startup";
    static ARG_KEY_START_PAUSED = "start-paused";
    static ARG_START_PAUSED = "--start-paused";
    static ARG_KEY_DISABLE_SERVICE_AUTH_CODES = "disable-service-auth-codes";
    static ARG_DISABLE_SERVICE_AUTH_CODES = "--disable-service-auth-codes";
    static ARG_KEY_ENDLESS_TRACE_BUFFER = "endless-trace-buffer";
    static ARG_ENDLESS_TRACE_BUFFER = "--endless-trace-buffer";
    static ARG_KEY_USE_TEST_FONTS = "use-test-fonts";
    static ARG_USE_TEST_FONTS = "--use-test-fonts";
    static ARG_KEY_ENABLE_DART_PROFILING = "enable-dart-profiling";
    static ARG_ENABLE_DART_PROFILING = "--enable-dart-profiling";
    static ARG_KEY_ENABLE_SOFTWARE_RENDERING = "enable-software-rendering";
    static ARG_ENABLE_SOFTWARE_RENDERING = "--enable-software-rendering";
    static ARG_KEY_SKIA_DETERMINISTIC_RENDERING = "skia-deterministic-rendering";
    static ARG_SKIA_DETERMINISTIC_RENDERING = "--skia-deterministic-rendering";
    static ARG_KEY_TRACE_SKIA = "trace-skia";
    static ARG_TRACE_SKIA = "--trace-skia";
    static ARG_KEY_TRACE_SKIA_ALLOWLIST = "trace-skia-allowlist";
    static ARG_TRACE_SKIA_ALLOWLIST = "--trace-skia-allowlist=";
    static ARG_KEY_TRACE_SYSTRACE = "trace-systrace";
    static ARG_TRACE_SYSTRACE = "--trace-systrace";
    static ARG_KEY_ENABLE_IMPELLER = "enable-impeller";
    static ARG_ENABLE_IMPELLER = "--enable-impeller";
    static ARG_KEY_DUMP_SHADER_SKP_ON_SHADER_COMPILATION = "dump-skp-on-shader-compilation";
    static ARG_DUMP_SHADER_SKP_ON_SHADER_COMPILATION = "--dump-skp-on-shader-compilation";
    static ARG_KEY_CACHE_SKSL = "cache-sksl";
    static ARG_CACHE_SKSL = "--cache-sksl";
    static ARG_KEY_PURGE_PERSISTENT_CACHE = "purge-persistent-cache";
    static ARG_PURGE_PERSISTENT_CACHE = "--purge-persistent-cache";
    static ARG_KEY_VERBOSE_LOGGING = "verbose-logging";
    static ARG_VERBOSE_LOGGING = "--verbose-logging";
    static ARG_KEY_OBSERVATORY_PORT = "observatory-port";
    static ARG_OBSERVATORY_PORT = "--observatory-port=";
    static ARG_KEY_DART_FLAGS = "dart-flags";
    static ARG_DART_FLAGS = "--dart-flags=";
    static ARG_KEY_MSAA_SAMPLES = "msaa-samples";
    static ARG_MSAA_SAMPLES = "--msaa-samples=";
    static fromWant(d14: Want): FlutterShellArgs {
        let e14: FlutterShellArgs = new FlutterShellArgs();
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_TRACE_STARTUP, FlutterShellArgs.ARG_TRACE_STARTUP, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_START_PAUSED, FlutterShellArgs.ARG_START_PAUSED, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_DISABLE_SERVICE_AUTH_CODES, FlutterShellArgs.ARG_DISABLE_SERVICE_AUTH_CODES, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_ENDLESS_TRACE_BUFFER, FlutterShellArgs.ARG_ENDLESS_TRACE_BUFFER, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_USE_TEST_FONTS, FlutterShellArgs.ARG_USE_TEST_FONTS, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_ENABLE_DART_PROFILING, FlutterShellArgs.ARG_ENABLE_DART_PROFILING, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_ENABLE_SOFTWARE_RENDERING, FlutterShellArgs.ARG_ENABLE_SOFTWARE_RENDERING, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_SKIA_DETERMINISTIC_RENDERING, FlutterShellArgs.ARG_SKIA_DETERMINISTIC_RENDERING, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_TRACE_SKIA, FlutterShellArgs.ARG_TRACE_SKIA, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_TRACE_SYSTRACE, FlutterShellArgs.ARG_TRACE_SYSTRACE, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_ENABLE_IMPELLER, FlutterShellArgs.ARG_ENABLE_IMPELLER, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_DUMP_SHADER_SKP_ON_SHADER_COMPILATION, FlutterShellArgs.ARG_DUMP_SHADER_SKP_ON_SHADER_COMPILATION, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_CACHE_SKSL, FlutterShellArgs.ARG_CACHE_SKSL, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_PURGE_PERSISTENT_CACHE, FlutterShellArgs.ARG_PURGE_PERSISTENT_CACHE, d14, e14);
        FlutterShellArgs.checkArg(FlutterShellArgs.ARG_KEY_VERBOSE_LOGGING, FlutterShellArgs.ARG_VERBOSE_LOGGING, d14, e14);
        let f14: Object = d14.parameters![FlutterShellArgs.ARG_KEY_TRACE_SKIA_ALLOWLIST];
        if (f14 != undefined) {
            e14.add(FlutterShellArgs.ARG_TRACE_SKIA_ALLOWLIST + (f14 as string));
        }
        let g14: Object = d14.parameters![FlutterShellArgs.ARG_KEY_OBSERVATORY_PORT];
        if (g14 != undefined && (g14 as number > 0)) {
            e14.add(FlutterShellArgs.ARG_OBSERVATORY_PORT + (g14 as number));
        }
        let h14: Object = d14.parameters![FlutterShellArgs.ARG_KEY_MSAA_SAMPLES];
        if (h14 != undefined && (h14 as number > 1)) {
            e14.add(FlutterShellArgs.ARG_MSAA_SAMPLES + (h14 as number));
        }
        let i14: Object = d14.parameters![FlutterShellArgs.ARG_KEY_DART_FLAGS];
        if (i14 != undefined) {
            e14.add(FlutterShellArgs.ARG_DART_FLAGS + (h14 as string));
        }
        return e14;
    }
    static checkArg(y13: string, z13: string, a14: Want, b14: FlutterShellArgs) {
        if (a14.parameters == undefined) {
            return;
        }
        let c14: Object = a14.parameters![y13];
        if (c14 != undefined && c14 as Boolean) {
            b14.add(z13);
        }
    }
    args: Set<string> = new Set();
    add(x13: string) {
        this.args.add(x13);
    }
    remove(w13: string) {
        this.args.delete(w13);
    }
    toArray(): Array<string> {
        return Array.from(this.args);
    }
}
