
import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";
import { __prod__,__username_db__,__password_db__ } from "./constants";
import { Post } from "./entities/Post"
import microConfig from "./mikro-orm.config"
import { ApolloServer } from "apollo-server-express"
import express from "express"
import {buildSchema} from 'type-graphql';
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

import redis from 'redis';
import session from 'express-session'
import connectRedis from 'connect-redis'
import { MyContext } from "./types";


const main = async() =>{
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up(); // run migration

    const app = express();


    const RedisStore = connectRedis(session)
    const redisClient = redis.createClient()

    app.use( // must run before middleware
        session({
            name: 'qid', // name of cokkie
            store: new RedisStore({
                client : redisClient,
                disableTouch : true,
            }),
            cookie:{
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10,// 10 year
                httpOnly: true,
                sameSite: 'lax',  // csrf
                secure : __prod__, // cookie only works in https if use __prod__ or true 
            },
            saveUninitialized: false, // create session by defualt even if not store data on it
            secret: "dkfajeifaergarhgjkafgfadjhf", // want to hide it
            resave: false,
        })
    )

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers:[HelloResolver , PostResolver,UserResolver],
            validate : false,
        }),
        context: ({ req,res }):MyContext => ({em: orm.em, req,res})
    })

    apolloServer.applyMiddleware({app});  // create graph QL endpoint on express
    // app.get("/",(_,res) => { // _ ignore variable
    // thist is create end point 
    //     res.send("hello");
    // })
    app.listen(4000, () => {
        console.log("server started on localhost:4000")
    })
    // const post = orm.em.create(Post, {title : "My first post"})
    // await orm.em.persistAndFlush(post);   
    // console.log("------------sql2---------")
    // await orm.em.nativeInsert(Post, {title : 'my first post 2 '})

    // const posts = await orm.em.find(Post,{});
    // console.log(posts)
}
// console.log("Password DB ->",process.env)
main().catch((err) =>{
    console.log("ERROR -> ",err);
})