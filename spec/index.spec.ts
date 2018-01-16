import { json2xcom, xcom2json } from "../src/index";
import * as tmp from "tmp";
import * as fs from "fs";

describe('usage', () => {
    it('should print usage for xcom2json', (done) => {
        xcom2json('', 'out', (str: string): void => {
            expect(str).toContain("Usage:");
            done();
        });
    });

    it('should print usage for json2xcom', (done) => {
        json2xcom('', 'out', (str: string): void => {
            expect(str).toContain("Usage:");
            done();
        });
    });
});

describe('read', () => {
    it('should convert a file to json', (done) => {
        tmp.tmpName((err, path: string): void => {
            xcom2json('spec/save203', path, (str: string): void => {
                fs.readFile(path, "utf-8", (err, contents: string): void => {
                    console.log(path);
                    let json = JSON.parse(contents);
                    expect(json['header']['version']).toBe(16);
                    fs.unlink(path, () => {
                        done();
                    });
                });
            });
        });
    });

    it('should error on a bad version', (done) => {
        tmp.tmpName((err, outFile: string): void => {
            tmp.file((err, inFile, fd) => {
                let buf : Buffer = Buffer.alloc(16);
                buf.writeUInt32LE(12, 0);
                let nWritten = fs.writeSync(fd, buf, 0, 4);
                expect(nWritten).toBe(4);
                xcom2json(inFile, outFile, (s) => {
                    expect(s).toBe('asdf');
                    done();
                });
            });
        });
    })
});

