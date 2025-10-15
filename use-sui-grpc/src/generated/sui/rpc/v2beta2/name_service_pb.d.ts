// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/name_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class LookupNameRequest extends jspb.Message { 

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): LookupNameRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LookupNameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: LookupNameRequest): LookupNameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LookupNameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LookupNameRequest;
    static deserializeBinaryFromReader(message: LookupNameRequest, reader: jspb.BinaryReader): LookupNameRequest;
}

export namespace LookupNameRequest {
    export type AsObject = {
        name?: string,
    }
}

export class LookupNameResponse extends jspb.Message { 

    hasRecord(): boolean;
    clearRecord(): void;
    getRecord(): NameRecord | undefined;
    setRecord(value?: NameRecord): LookupNameResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): LookupNameResponse.AsObject;
    static toObject(includeInstance: boolean, msg: LookupNameResponse): LookupNameResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: LookupNameResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): LookupNameResponse;
    static deserializeBinaryFromReader(message: LookupNameResponse, reader: jspb.BinaryReader): LookupNameResponse;
}

export namespace LookupNameResponse {
    export type AsObject = {
        record?: NameRecord.AsObject,
    }
}

export class ReverseLookupNameRequest extends jspb.Message { 

    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): string | undefined;
    setAddress(value: string): ReverseLookupNameRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReverseLookupNameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ReverseLookupNameRequest): ReverseLookupNameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReverseLookupNameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReverseLookupNameRequest;
    static deserializeBinaryFromReader(message: ReverseLookupNameRequest, reader: jspb.BinaryReader): ReverseLookupNameRequest;
}

export namespace ReverseLookupNameRequest {
    export type AsObject = {
        address?: string,
    }
}

export class ReverseLookupNameResponse extends jspb.Message { 

    hasRecord(): boolean;
    clearRecord(): void;
    getRecord(): NameRecord | undefined;
    setRecord(value?: NameRecord): ReverseLookupNameResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ReverseLookupNameResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ReverseLookupNameResponse): ReverseLookupNameResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ReverseLookupNameResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ReverseLookupNameResponse;
    static deserializeBinaryFromReader(message: ReverseLookupNameResponse, reader: jspb.BinaryReader): ReverseLookupNameResponse;
}

export namespace ReverseLookupNameResponse {
    export type AsObject = {
        record?: NameRecord.AsObject,
    }
}

export class NameRecord extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): NameRecord;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): NameRecord;

    hasRegistrationNftId(): boolean;
    clearRegistrationNftId(): void;
    getRegistrationNftId(): string | undefined;
    setRegistrationNftId(value: string): NameRecord;

    hasExpirationTimestamp(): boolean;
    clearExpirationTimestamp(): void;
    getExpirationTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setExpirationTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): NameRecord;

    hasTargetAddress(): boolean;
    clearTargetAddress(): void;
    getTargetAddress(): string | undefined;
    setTargetAddress(value: string): NameRecord;

    getDataMap(): jspb.Map<string, string>;
    clearDataMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): NameRecord.AsObject;
    static toObject(includeInstance: boolean, msg: NameRecord): NameRecord.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NameRecord, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NameRecord;
    static deserializeBinaryFromReader(message: NameRecord, reader: jspb.BinaryReader): NameRecord;
}

export namespace NameRecord {
    export type AsObject = {
        id?: string,
        name?: string,
        registrationNftId?: string,
        expirationTimestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        targetAddress?: string,

        dataMap: Array<[string, string]>,
    }
}
