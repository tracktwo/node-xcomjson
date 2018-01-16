
import * as cp from "child_process";


export function xcom2json(inFile: string, outFile: string, cb: (s: string) => void): void {
   cp.execFile("dist/xcom2json", [inFile, "-o", outFile], (error, stdout, stderr) => {
       cb(stdout);
   });
}

export function json2xcom(inFile: string, outFile: string, cb: (s: string) => void): void {
    cp.execFile("dist/json2xcom", [inFile, "-o", outFile], (error, stdout, stderr) => {
        cb(stdout);
    });
}
