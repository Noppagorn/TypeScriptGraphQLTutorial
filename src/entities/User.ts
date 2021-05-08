import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";


@ObjectType()
@Entity()
export class User{
    @Field()
    @PrimaryKey()
    id!: number;

    @Field(() => String)
    @Property({type : "date"})
    createdAt: Date = new Date();

    @Field(() => String)
    @Property({type: "date",onUpdate: () => new Date() })
    updatedAt: Date = new Date();

    @Field()
    @Property({type : 'text',unique: true})
    username!: string;

    // remove Field() poperty because not allow to select this property
    @Property({type : 'text'})
    password!: string;
}