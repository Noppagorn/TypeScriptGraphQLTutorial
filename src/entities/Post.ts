import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";


@ObjectType()
@Entity()
export class Post extends BaseEntity {

  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  
  @Field()
  @Column({type : 'text'})
  title!: string;

  @Field()
  @Column({type : 'text'})
  text!: string;

  @Field()
  @Column({type : 'int', default : 0})
  points!: number;

  @Field()
  @Column()
  creatorId: number; 

  @ManyToOne(() => User, user => user.posts) // foreigh key to the user table
  creator: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

}
