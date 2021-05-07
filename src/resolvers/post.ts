import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class PostResolver{
    @Query(() => [Post]) // type of Array
    posts(
        @Ctx() {em} : MyContext
    ) : Promise<Post[]> {
        return em.find(Post,{});
    }

    @Query(() => Post,{nullable : true}) // this is graphQl type
    post(
        @Arg('id') id: number,
        @Ctx() {em} : MyContext
    ) : Promise<Post | null> { // this is type script type
        return em.findOne(Post,{ id });
    }
    @Mutation(() => Post) // Mutation for edit insert update data
    async createPost(
        @Arg('title') title : string,
        @Ctx() {em} : MyContext
    ) : Promise<Post> { // this is type script type
        const post = em.create(Post,{title})
        await em.persistAndFlush(post)
        return post
    }
}