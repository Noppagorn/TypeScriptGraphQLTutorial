import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";
import { Request,Response } from 'express'

export type MyContext = {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>> // copy from mouse hover context orm.em in index.ts
    req: Request & {session?: Express.Session};
    res: Response;
}