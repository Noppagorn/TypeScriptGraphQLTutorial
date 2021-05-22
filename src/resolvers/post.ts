import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { sleep } from "../utils/sleep";

@Resolver()
export class PostResolver{
    @Query(() => [Post]) // type of Array
    async posts(
        @Ctx() {em} : MyContext
    ) : Promise<Post[]> {
        await sleep(3000);
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
    @Mutation(() => Post, {nullable : true}) // Mutation for edit insert update data
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, {nullable : true}) title : string,
        @Ctx() {em} : MyContext
    ) : Promise<Post | null> { // this is type script type
        const post = await em.findOne(Post,{id});
        if (!post){
            return null;
        }
        if (typeof title !== 'undefined'){
            post.title = title
            await em.persistAndFlush(post);
        }
        return post
    }
    @Mutation(() => Boolean) // Mutation for edit insert update data
    async deletePost(
        @Arg('id') id: number,
        @Ctx() {em} : MyContext
    ) : Promise<boolean> { // this is type script type
        await em.nativeDelete(Post,{id})
        return true
    }
}