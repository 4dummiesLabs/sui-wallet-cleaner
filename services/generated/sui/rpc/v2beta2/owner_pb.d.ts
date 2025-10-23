// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/owner.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Owner extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): Owner.OwnerKind | undefined;
    setKind(value: Owner.OwnerKind): Owner;

    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): string | undefined;
    setAddress(value: string): Owner;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): Owner;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Owner.AsObject;
    static toObject(includeInstance: boolean, msg: Owner): Owner.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Owner, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Owner;
    static deserializeBinaryFromReader(message: Owner, reader: jspb.BinaryReader): Owner;
}

export namespace Owner {
    export type AsObject = {
        kind?: Owner.OwnerKind,
        address?: string,
        version?: number,
    }

    export enum OwnerKind {
    OWNER_KIND_UNKNOWN = 0,
    ADDRESS = 1,
    OBJECT = 2,
    SHARED = 3,
    IMMUTABLE = 4,
    CONSENSUS_ADDRESS = 5,
    }

}
