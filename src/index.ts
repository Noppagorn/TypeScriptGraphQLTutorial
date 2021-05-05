import { MikroORM } from "@mikro-orm/core";
import { __prod__,__username_db__,__password_db__ } from "./constants";
import { Post } from "./entities/Post"
import microConfig from "./mikro-orm.config"
const main = async() =>{
    const orm = await MikroORM.init(microConfig);

    const post = orm.em.create(Post, {title : "My first post"})
    await orm.em.persistAndFlush(post);   
    console.log("------------sql2---------")
    await orm.em.nativeInsert(Post, {title : 'my first post 2 '})
}
console.log("hello world 22sdasfdsf");
console.log("Password DB ->",process.env)
main().catch((err) =>{
    console.log("ERROR -> ",err);
})