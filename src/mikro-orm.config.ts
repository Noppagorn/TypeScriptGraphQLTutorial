import { __password_db__, __prod__, __username_db__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
export default {
        migrations : {
            path: './migrations', // path to the folder with migrations
            pattern: /^[\w-]+\d+\.ts$/, // regex pattern for the migration files
        },
        entities : [Post],
        dbName : 'lireddit',
        user : __username_db__,
        password : __password_db__,
        type : "postgresql",
        debug : !__prod__,
} as Parameters<typeof MikroORM.init>[0];// cast to type that init function want 
//this can get type that MikroORM.init expect

// check from bob . type if bob not cast to cosnt is have a type string
// if change export default to const bob = {...}
// bob.type