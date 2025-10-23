// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/object_reference.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ObjectReference extends jspb.Message { 

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string | undefined;
    setObjectId(value: string): ObjectReference;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): ObjectReference;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): ObjectReference;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ObjectReference.AsObject;
    static toObject(includeInstance: boolean, msg: ObjectReference): ObjectReference.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ObjectReference, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ObjectReference;
    static deserializeBinaryFromReader(message: ObjectReference, reader: jspb.BinaryReader): ObjectReference;
}

export namespace ObjectReference {
    export type AsObject = {
        objectId?: string,
        version?: number,
        digest?: string,
    }
}
