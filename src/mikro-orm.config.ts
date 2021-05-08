import { __password_db__, __prod__, __username_db__ } from "./constants";
import { Post } from "./entities/Post";
import { MikroORM } from "@mikro-orm/core";
import path from 'path';
import { User } from "./entities/User";
console.log("dirname: ", __dirname)
export default {
        migrations : {
            path: path.join(__dirname,'./migrations'), // path to the folder with migrations
            pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files  [tj] is t or j (typescript or javascript)
        },
        entities : [Post,User],
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