import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument,} from "mongoose";

@Schema({timestamps:true})
export class Auth {

    @Prop({type:String, required: true})
    name: string;

    @Prop({type:String, required: true})
    email: string;

    @Prop({type:String, required: true})
    phone: string;

    @Prop({type:String, required: true})
    password: string;

    @Prop({type:String,})
    avatar:string;

    @Prop({type:[String]})
    avatars: string[];

}

export const AuthSchema = SchemaFactory.createForClass(Auth);

export type AuthDocument = HydratedDocument<Auth>;
