import { Post } from "../entities/Post";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { sleep } from "../utils/sleep";

@InputType()
class PostInput {
    @Field()
    title: string;
    @Field()
    text: string;
}

@Resolver()
export class PostResolver{
    @Query(() => [Post]) // type of Array
    async posts(
    ) : Promise<Post[]> {
        await sleep(3000);
        return Post.find();
    }

    @Query(() => Post,{nullable : true}) // this is graphQl type
    post(
        @Arg('id') id: number,
    ) : Promise<Post | undefined> { // this is type script type
        return Post.findOne(id);
    }
    @Mutation(() => Post) // Mutation for edit insert update data
    async createPost(
        @Arg('input') input : PostInput,
        @Ctx() { req } : MyContext
    ) : Promise<Post> { // this is type script type
        if (!req.session.userId){
            throw new Error("not authenticated")
        }
        // 2 sql queries 1. insert it 2. save it|| select it
        return Post.create({ 
            ...input,
            creatorId : req.session.userId,
        }).save();
    }
    @Mutation(() => Post, {nullable : true}) // Mutation for edit insert update data
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, {nullable : true}) title : string,
    ) : Promise<Post | null> { // this is type script type
        const post = await Post.findOne({ where : { id } });
        if (!post){
            return null;
        }
        if (typeof title !== 'undefined'){
            await Post.update({id}, { title });
        }
        return post
    }
    @Mutation(() => Boolean) // Mutation for edit insert update data
    async deletePost(
        @Arg('id') id: number,
    ) : Promise<boolean> { // this is type script type
        Post.delete(id);
        return true
    }
}