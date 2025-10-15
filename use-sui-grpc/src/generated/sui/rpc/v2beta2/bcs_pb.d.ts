// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/bcs.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Bcs extends jspb.Message { 

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): Bcs;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): Uint8Array | string;
    getValue_asU8(): Uint8Array;
    getValue_asB64(): string;
    setValue(value: Uint8Array | string): Bcs;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Bcs.AsObject;
    static toObject(includeInstance: boolean, msg: Bcs): Bcs.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Bcs, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Bcs;
    static deserializeBinaryFromReader(message: Bcs, reader: jspb.BinaryReader): Bcs;
}

export namespace Bcs {
    export type AsObject = {
        name?: string,
        value: Uint8Array | string,
    }
}
