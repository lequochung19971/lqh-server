import { connect, ConnectionOptions } from "mongoose";
import env from '../providers/config/ts/environment'
import { SERVER_CONFIG } from "../providers/config/ts/server-config";
export class Mongoose {
  protected uri: string = SERVER_CONFIG.DATABASE.LOCAL_URI;

  mongoSetup(): void {
    console.log(this.mongoDBUri);
    connect(this.mongoDBUri, this.mongoDBOption, (err) => {
      if (err) {
        console.log(err); 
      } else {
        console.log('Connected to DB!')
      }
    })
  }

  get mongoDBUri(): string {
    const uri = process.env.MONGODB_URI || this.uri.replace('<dbname>', env.DB_NAME)
    return uri;
  }

  get mongoDBOption(): ConnectionOptions {
    return { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  }
}
