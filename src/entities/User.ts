import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./Post";


@ObjectType()
@Entity()
export class User extends BaseEntity{ // can make entity .find() .insert()
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({type : 'text',unique: true})
    username!: string;

    @Field()
    @Column({type : 'text',unique: true})
    email!: string;

    // remove Field() poperty because not allow to select this property
    @Column()
    password!: string;

    @OneToMany(() => Post,post  => post.creator)
    posts: Post[];
    

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}