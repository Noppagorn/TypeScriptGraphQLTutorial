import { Connection, EntityManager, IDatabaseDriver } from "@mikro-orm/core";

export type MyContext {
    em: EntityManager<any> & EntityManager<IDatabaseDriver<Connection>> // copy from mouse hover context orm.em in index.ts
}