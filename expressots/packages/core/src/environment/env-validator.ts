import fs from "fs";
import path from "path";
import dotenv from "dotenv";

import { provide } from "inversify-binding-decorators";
import { LogLevel, log } from "../logger";

@provide(EnvValidatorProvider)
class EnvValidatorProvider {

    public static get(key: string, defaultValue: any = undefined): any {
        return process.env[key] ?? defaultValue;
    }

    public static checkAll(): void {

        /* Load .env file */
        dotenv.config();

        /* Verify if .env file exists */
        const envFilePath: string = path.join(process.cwd(), ".",".env");

        if (!fs.existsSync(envFilePath)) {
            log(LogLevel.Info, "Environment file .env is not defined.", "env-validator-provider");
            process.exit(1);
        }

        const regexIgnoreDefaultEnvKeys: RegExp = /^npm_config_/;
        let hasError: boolean = false;

        for (const key in process.env) {
            if (regexIgnoreDefaultEnvKeys.test(key)) {
                continue;
            }

            if (!process.env[key] || process.env[key] === "") {
                log(LogLevel.Info, `Environment variable ${key} is not defined.`, "env-validator-provider");
                hasError = true;
            }
        }

        if (hasError) {
            process.exit(1);
        }
    }
}

declare global {
    interface String {
        AsBoolean(): boolean | undefined;
        AsNumber(): number | undefined;
        AsString(): string | undefined;
    }
}

String.prototype.AsBoolean = function (): boolean | undefined {
    switch (this.toLowerCase().trim()) {
        case "true":
        case "1":
        case "yes":
            return true;
        case "false":
        case "0":
        case "no":
            return false;
        default:
            return undefined;
    }
};

String.prototype.AsNumber = function (): number | undefined {
    return Number(this);
};

String.prototype.AsString = function (): string | undefined {
    return String(this);
};

export { EnvValidatorProvider as Environments }