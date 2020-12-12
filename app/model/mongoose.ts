import { connect } from "mongoose";
import { mongoDBConfig } from '../shared/config/mongodb.config';
import env from '../environment';

export class Mongoose {
  protected url: string = mongoDBConfig.url;

  constructor() {}

  mongoSetup(): void {
    console.log(this.getMongoDBUrl());
    connect(this.getMongoDBUrl(), { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, (err) => {
      if (err) {
        console.log(err); 
      } else {
        console.log('connected to DB!')
      }
    })
  }

  getMongoDBUrl(): string {
    const url = this.url.replace('<dbname>', env.databaseName)
    return url;
  }
}
