// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/move_package_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as sui_rpc_v2beta2_move_package_pb from "../../../sui/rpc/v2beta2/move_package_pb";

export class GetPackageRequest extends jspb.Message { 

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): GetPackageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetPackageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetPackageRequest): GetPackageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetPackageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetPackageRequest;
    static deserializeBinaryFromReader(message: GetPackageRequest, reader: jspb.BinaryReader): GetPackageRequest;
}

export namespace GetPackageRequest {
    export type AsObject = {
        packageId?: string,
    }
}

export class GetPackageResponse extends jspb.Message { 

    hasPackage(): boolean;
    clearPackage(): void;
    getPackage(): sui_rpc_v2beta2_move_package_pb.Package | undefined;
    setPackage(value?: sui_rpc_v2beta2_move_package_pb.Package): GetPackageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetPackageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetPackageResponse): GetPackageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetPackageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetPackageResponse;
    static deserializeBinaryFromReader(message: GetPackageResponse, reader: jspb.BinaryReader): GetPackageResponse;
}

export namespace GetPackageResponse {
    export type AsObject = {
        pb_package?: sui_rpc_v2beta2_move_package_pb.Package.AsObject,
    }
}

export class GetDatatypeRequest extends jspb.Message { 

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): GetDatatypeRequest;

    hasModuleName(): boolean;
    clearModuleName(): void;
    getModuleName(): string | undefined;
    setModuleName(value: string): GetDatatypeRequest;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): GetDatatypeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetDatatypeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetDatatypeRequest): GetDatatypeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetDatatypeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetDatatypeRequest;
    static deserializeBinaryFromReader(message: GetDatatypeRequest, reader: jspb.BinaryReader): GetDatatypeRequest;
}

export namespace GetDatatypeRequest {
    export type AsObject = {
        packageId?: string,
        moduleName?: string,
        name?: string,
    }
}

export class GetDatatypeResponse extends jspb.Message { 

    hasDatatype(): boolean;
    clearDatatype(): void;
    getDatatype(): sui_rpc_v2beta2_move_package_pb.DatatypeDescriptor | undefined;
    setDatatype(value?: sui_rpc_v2beta2_move_package_pb.DatatypeDescriptor): GetDatatypeResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetDatatypeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetDatatypeResponse): GetDatatypeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetDatatypeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetDatatypeResponse;
    static deserializeBinaryFromReader(message: GetDatatypeResponse, reader: jspb.BinaryReader): GetDatatypeResponse;
}

export namespace GetDatatypeResponse {
    export type AsObject = {
        datatype?: sui_rpc_v2beta2_move_package_pb.DatatypeDescriptor.AsObject,
    }
}

export class GetFunctionRequest extends jspb.Message { 

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): GetFunctionRequest;

    hasModuleName(): boolean;
    clearModuleName(): void;
    getModuleName(): string | undefined;
    setModuleName(value: string): GetFunctionRequest;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): GetFunctionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFunctionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFunctionRequest): GetFunctionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFunctionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFunctionRequest;
    static deserializeBinaryFromReader(message: GetFunctionRequest, reader: jspb.BinaryReader): GetFunctionRequest;
}

export namespace GetFunctionRequest {
    export type AsObject = {
        packageId?: string,
        moduleName?: string,
        name?: string,
    }
}

export class GetFunctionResponse extends jspb.Message { 

    hasFunction(): boolean;
    clearFunction(): void;
    getFunction(): sui_rpc_v2beta2_move_package_pb.FunctionDescriptor | undefined;
    setFunction(value?: sui_rpc_v2beta2_move_package_pb.FunctionDescriptor): GetFunctionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFunctionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFunctionResponse): GetFunctionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFunctionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFunctionResponse;
    static deserializeBinaryFromReader(message: GetFunctionResponse, reader: jspb.BinaryReader): GetFunctionResponse;
}

export namespace GetFunctionResponse {
    export type AsObject = {
        pb_function?: sui_rpc_v2beta2_move_package_pb.FunctionDescriptor.AsObject,
    }
}

export class ListPackageVersionsRequest extends jspb.Message { 

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): ListPackageVersionsRequest;

    hasPageSize(): boolean;
    clearPageSize(): void;
    getPageSize(): number | undefined;
    setPageSize(value: number): ListPackageVersionsRequest;

    hasPageToken(): boolean;
    clearPageToken(): void;
    getPageToken(): Uint8Array | string;
    getPageToken_asU8(): Uint8Array;
    getPageToken_asB64(): string;
    setPageToken(value: Uint8Array | string): ListPackageVersionsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListPackageVersionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListPackageVersionsRequest): ListPackageVersionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListPackageVersionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListPackageVersionsRequest;
    static deserializeBinaryFromReader(message: ListPackageVersionsRequest, reader: jspb.BinaryReader): ListPackageVersionsRequest;
}

export namespace ListPackageVersionsRequest {
    export type AsObject = {
        packageId?: string,
        pageSize?: number,
        pageToken: Uint8Array | string,
    }
}

export class ListPackageVersionsResponse extends jspb.Message { 
    clearVersionsList(): void;
    getVersionsList(): Array<PackageVersion>;
    setVersionsList(value: Array<PackageVersion>): ListPackageVersionsResponse;
    addVersions(value?: PackageVersion, index?: number): PackageVersion;

    hasNextPageToken(): boolean;
    clearNextPageToken(): void;
    getNextPageToken(): Uint8Array | string;
    getNextPageToken_asU8(): Uint8Array;
    getNextPageToken_asB64(): string;
    setNextPageToken(value: Uint8Array | string): ListPackageVersionsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListPackageVersionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListPackageVersionsResponse): ListPackageVersionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListPackageVersionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListPackageVersionsResponse;
    static deserializeBinaryFromReader(message: ListPackageVersionsResponse, reader: jspb.BinaryReader): ListPackageVersionsResponse;
}

export namespace ListPackageVersionsResponse {
    export type AsObject = {
        versionsList: Array<PackageVersion.AsObject>,
        nextPageToken: Uint8Array | string,
    }
}

export class PackageVersion extends jspb.Message { 

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): PackageVersion;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): PackageVersion;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PackageVersion.AsObject;
    static toObject(includeInstance: boolean, msg: PackageVersion): PackageVersion.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PackageVersion, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PackageVersion;
    static deserializeBinaryFromReader(message: PackageVersion, reader: jspb.BinaryReader): PackageVersion;
}

export namespace PackageVersion {
    export type AsObject = {
        packageId?: string,
        version?: number,
    }
}
