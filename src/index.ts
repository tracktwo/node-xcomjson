import * as cp from "child_process";
import * as path from 'path';

export function xcom2json(inFile: string, outFile: string, cb: (c: number, so: string, se: string) => void): void {
    cp.execFile(path.resolve(__dirname, "../xcom2json"), [inFile, "-o", outFile], (error: any, stdout: string, stderr: string) => {
        if (error != null) {
            cb(error['code'] as number, stdout, stderr);
        }
        else {
            cb(0, stdout, stderr);
        }
    });
}

export function json2xcom(inFile: string, outFile: string, cb: (c: number, so: string, se: string) => void): void {
    cp.execFile(path.resolve(__dirname, "../json2xcom"), [inFile, "-o", outFile], (error: any, stdout: string, stderr: string) => {
        if (error != null) {
            cb(error['code'] as number, stdout, stderr);
        }
        else {
            cb(0, stdout, stderr);
        }
    });
}
