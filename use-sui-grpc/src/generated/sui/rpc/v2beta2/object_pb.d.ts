// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/object.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_move_package_pb from "../../../sui/rpc/v2beta2/move_package_pb";
import * as sui_rpc_v2beta2_owner_pb from "../../../sui/rpc/v2beta2/owner_pb";

export class Object extends jspb.Message { 

    hasBcs(): boolean;
    clearBcs(): void;
    getBcs(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setBcs(value?: sui_rpc_v2beta2_bcs_pb.Bcs): Object;

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string | undefined;
    setObjectId(value: string): Object;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): Object;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): Object;

    hasOwner(): boolean;
    clearOwner(): void;
    getOwner(): sui_rpc_v2beta2_owner_pb.Owner | undefined;
    setOwner(value?: sui_rpc_v2beta2_owner_pb.Owner): Object;

    hasObjectType(): boolean;
    clearObjectType(): void;
    getObjectType(): string | undefined;
    setObjectType(value: string): Object;

    hasHasPublicTransfer(): boolean;
    clearHasPublicTransfer(): void;
    getHasPublicTransfer(): boolean | undefined;
    setHasPublicTransfer(value: boolean): Object;

    hasContents(): boolean;
    clearContents(): void;
    getContents(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setContents(value?: sui_rpc_v2beta2_bcs_pb.Bcs): Object;

    hasPackage(): boolean;
    clearPackage(): void;
    getPackage(): sui_rpc_v2beta2_move_package_pb.Package | undefined;
    setPackage(value?: sui_rpc_v2beta2_move_package_pb.Package): Object;

    hasPreviousTransaction(): boolean;
    clearPreviousTransaction(): void;
    getPreviousTransaction(): string | undefined;
    setPreviousTransaction(value: string): Object;

    hasStorageRebate(): boolean;
    clearStorageRebate(): void;
    getStorageRebate(): number | undefined;
    setStorageRebate(value: number): Object;

    hasJson(): boolean;
    clearJson(): void;
    getJson(): google_protobuf_struct_pb.Value | undefined;
    setJson(value?: google_protobuf_struct_pb.Value): Object;

    hasBalance(): boolean;
    clearBalance(): void;
    getBalance(): number | undefined;
    setBalance(value: number): Object;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Object.AsObject;
    static toObject(includeInstance: boolean, msg: Object): Object.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Object, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Object;
    static deserializeBinaryFromReader(message: Object, reader: jspb.BinaryReader): Object;
}

export namespace Object {
    export type AsObject = {
        bcs?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        objectId?: string,
        version?: number,
        digest?: string,
        owner?: sui_rpc_v2beta2_owner_pb.Owner.AsObject,
        objectType?: string,
        hasPublicTransfer?: boolean,
        contents?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        pb_package?: sui_rpc_v2beta2_move_package_pb.Package.AsObject,
        previousTransaction?: string,
        storageRebate?: number,
        json?: google_protobuf_struct_pb.Value.AsObject,
        balance?: number,
    }
}
