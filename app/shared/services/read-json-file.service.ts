import * as fs from 'fs';

export class ReadJsonFile {
  private url: string;

  constructor(file: string) {
    this.url = `app/config/${file}`;
  }

  readJsonFileSync<T>(file: string): T {
    // const url = `config/${file}`;
    return JSON.parse(fs.readFileSync(this.url, 'utf8')) as T;
  }

  readJsonFileAsync<T>(file: string, callback): void {
    // const url = `config/${file}`;
    fs.readFile(this.url, 'uft8', (err, data) => {
      if (err) throw err;
      callback(JSON.parse(data) as T);
    })
  }
}