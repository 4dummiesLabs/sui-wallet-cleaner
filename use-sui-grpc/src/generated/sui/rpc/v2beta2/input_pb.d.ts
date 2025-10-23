// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/input.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";

export class Input extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): Input.InputKind | undefined;
    setKind(value: Input.InputKind): Input;

    hasPure(): boolean;
    clearPure(): void;
    getPure(): Uint8Array | string;
    getPure_asU8(): Uint8Array;
    getPure_asB64(): string;
    setPure(value: Uint8Array | string): Input;

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string | undefined;
    setObjectId(value: string): Input;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): Input;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): Input;

    hasMutable(): boolean;
    clearMutable(): void;
    getMutable(): boolean | undefined;
    setMutable(value: boolean): Input;

    hasLiteral(): boolean;
    clearLiteral(): void;
    getLiteral(): google_protobuf_struct_pb.Value | undefined;
    setLiteral(value?: google_protobuf_struct_pb.Value): Input;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Input.AsObject;
    static toObject(includeInstance: boolean, msg: Input): Input.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Input, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Input;
    static deserializeBinaryFromReader(message: Input, reader: jspb.BinaryReader): Input;
}

export namespace Input {
    export type AsObject = {
        kind?: Input.InputKind,
        pure: Uint8Array | string,
        objectId?: string,
        version?: number,
        digest?: string,
        mutable?: boolean,
        literal?: google_protobuf_struct_pb.Value.AsObject,
    }

    export enum InputKind {
    INPUT_KIND_UNKNOWN = 0,
    PURE = 1,
    IMMUTABLE_OR_OWNED = 2,
    SHARED = 3,
    RECEIVING = 4,
    }

}
