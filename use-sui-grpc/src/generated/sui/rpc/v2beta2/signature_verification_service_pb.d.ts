// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/signature_verification_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";
import * as sui_rpc_v2beta2_transaction_pb from "../../../sui/rpc/v2beta2/transaction_pb";

export class VerifySignatureRequest extends jspb.Message { 

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setMessage(value?: sui_rpc_v2beta2_bcs_pb.Bcs): VerifySignatureRequest;

    hasSignature(): boolean;
    clearSignature(): void;
    getSignature(): sui_rpc_v2beta2_signature_pb.UserSignature | undefined;
    setSignature(value?: sui_rpc_v2beta2_signature_pb.UserSignature): VerifySignatureRequest;

    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): string | undefined;
    setAddress(value: string): VerifySignatureRequest;
    clearJwksList(): void;
    getJwksList(): Array<sui_rpc_v2beta2_transaction_pb.ActiveJwk>;
    setJwksList(value: Array<sui_rpc_v2beta2_transaction_pb.ActiveJwk>): VerifySignatureRequest;
    addJwks(value?: sui_rpc_v2beta2_transaction_pb.ActiveJwk, index?: number): sui_rpc_v2beta2_transaction_pb.ActiveJwk;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VerifySignatureRequest.AsObject;
    static toObject(includeInstance: boolean, msg: VerifySignatureRequest): VerifySignatureRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VerifySignatureRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VerifySignatureRequest;
    static deserializeBinaryFromReader(message: VerifySignatureRequest, reader: jspb.BinaryReader): VerifySignatureRequest;
}

export namespace VerifySignatureRequest {
    export type AsObject = {
        message?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        signature?: sui_rpc_v2beta2_signature_pb.UserSignature.AsObject,
        address?: string,
        jwksList: Array<sui_rpc_v2beta2_transaction_pb.ActiveJwk.AsObject>,
    }
}

export class VerifySignatureResponse extends jspb.Message { 

    hasIsValid(): boolean;
    clearIsValid(): void;
    getIsValid(): boolean | undefined;
    setIsValid(value: boolean): VerifySignatureResponse;

    hasReason(): boolean;
    clearReason(): void;
    getReason(): string | undefined;
    setReason(value: string): VerifySignatureResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VerifySignatureResponse.AsObject;
    static toObject(includeInstance: boolean, msg: VerifySignatureResponse): VerifySignatureResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VerifySignatureResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VerifySignatureResponse;
    static deserializeBinaryFromReader(message: VerifySignatureResponse, reader: jspb.BinaryReader): VerifySignatureResponse;
}

export namespace VerifySignatureResponse {
    export type AsObject = {
        isValid?: boolean,
        reason?: string,
    }
}
