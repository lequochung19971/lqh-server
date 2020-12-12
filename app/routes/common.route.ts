import { Application, Request, Response } from "express";

export class CommonRoutes {

  route(app: Application): void {
    // app.all('*', (req: Request, res: Response) => {
    //   res.status(404).send({ error: true, message: 'Check your URL, please!' });
    // })
  }
}