import { Query, Resolver } from "type-graphql";

@Resolver()
export class HelloResolver{
    @Query(() => String) // graph Ql query
    hello(){
        return "hello world 22"
    }
}