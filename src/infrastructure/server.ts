import express from "express"
import routes from "./api/routes"
import { errorHandlerMiddleware } from "./api/middleware/error_handler_middleware";


export class ExpressServer {



    config(app: express.Application){

        //Middlewares
        app.use(express.urlencoded({ extended: true }));
        app.use(express.json());


        //Routes
        routes(app,express)

        //Override Express Error Handler
        app.use(errorHandlerMiddleware)
        
        return app;
    }

    //Start
   async startServer(app: express.Application,port: any,db_connect: Function) {
    try {
    await db_connect();
    app.listen(port, () => { console.log(`App listening on http://localhost:${port}`) })
    } catch (error) {
        console.log(error)
    }
    }

}






