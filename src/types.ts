import { Request,Response } from 'express'
import { Redis } from "ioredis";

export type MyContext = {
    // em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>> // copy from mouse hover context orm.em in index.ts
    req: Request & {session?: Express.Session};
    redis: Redis;
    res: Response;
}