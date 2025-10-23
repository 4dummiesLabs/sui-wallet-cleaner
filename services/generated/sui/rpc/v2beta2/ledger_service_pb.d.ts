// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/ledger_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_rpc_status_pb from "../../../google/rpc/status_pb";
import * as sui_rpc_v2beta2_checkpoint_pb from "../../../sui/rpc/v2beta2/checkpoint_pb";
import * as sui_rpc_v2beta2_epoch_pb from "../../../sui/rpc/v2beta2/epoch_pb";
import * as sui_rpc_v2beta2_executed_transaction_pb from "../../../sui/rpc/v2beta2/executed_transaction_pb";
import * as sui_rpc_v2beta2_object_pb from "../../../sui/rpc/v2beta2/object_pb";

export class GetServiceInfoRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetServiceInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetServiceInfoRequest): GetServiceInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetServiceInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetServiceInfoRequest;
    static deserializeBinaryFromReader(message: GetServiceInfoRequest, reader: jspb.BinaryReader): GetServiceInfoRequest;
}

export namespace GetServiceInfoRequest {
    export type AsObject = {
    }
}

export class GetServiceInfoResponse extends jspb.Message { 

    hasChainId(): boolean;
    clearChainId(): void;
    getChainId(): string | undefined;
    setChainId(value: string): GetServiceInfoResponse;

    hasChain(): boolean;
    clearChain(): void;
    getChain(): string | undefined;
    setChain(value: string): GetServiceInfoResponse;

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): GetServiceInfoResponse;

    hasCheckpointHeight(): boolean;
    clearCheckpointHeight(): void;
    getCheckpointHeight(): number | undefined;
    setCheckpointHeight(value: number): GetServiceInfoResponse;

    hasTimestamp(): boolean;
    clearTimestamp(): void;
    getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): GetServiceInfoResponse;

    hasLowestAvailableCheckpoint(): boolean;
    clearLowestAvailableCheckpoint(): void;
    getLowestAvailableCheckpoint(): number | undefined;
    setLowestAvailableCheckpoint(value: number): GetServiceInfoResponse;

    hasLowestAvailableCheckpointObjects(): boolean;
    clearLowestAvailableCheckpointObjects(): void;
    getLowestAvailableCheckpointObjects(): number | undefined;
    setLowestAvailableCheckpointObjects(value: number): GetServiceInfoResponse;

    hasServer(): boolean;
    clearServer(): void;
    getServer(): string | undefined;
    setServer(value: string): GetServiceInfoResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetServiceInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetServiceInfoResponse): GetServiceInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetServiceInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetServiceInfoResponse;
    static deserializeBinaryFromReader(message: GetServiceInfoResponse, reader: jspb.BinaryReader): GetServiceInfoResponse;
}

export namespace GetServiceInfoResponse {
    export type AsObject = {
        chainId?: string,
        chain?: string,
        epoch?: number,
        checkpointHeight?: number,
        timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        lowestAvailableCheckpoint?: number,
        lowestAvailableCheckpointObjects?: number,
        server?: string,
    }
}

export class GetObjectRequest extends jspb.Message { 

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string | undefined;
    setObjectId(value: string): GetObjectRequest;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): GetObjectRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): GetObjectRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetObjectRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetObjectRequest): GetObjectRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetObjectRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetObjectRequest;
    static deserializeBinaryFromReader(message: GetObjectRequest, reader: jspb.BinaryReader): GetObjectRequest;
}

export namespace GetObjectRequest {
    export type AsObject = {
        objectId?: string,
        version?: number,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class GetObjectResponse extends jspb.Message { 

    hasObject(): boolean;
    clearObject(): void;
    getObject(): sui_rpc_v2beta2_object_pb.Object | undefined;
    setObject(value?: sui_rpc_v2beta2_object_pb.Object): GetObjectResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetObjectResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetObjectResponse): GetObjectResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetObjectResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetObjectResponse;
    static deserializeBinaryFromReader(message: GetObjectResponse, reader: jspb.BinaryReader): GetObjectResponse;
}

export namespace GetObjectResponse {
    export type AsObject = {
        object?: sui_rpc_v2beta2_object_pb.Object.AsObject,
    }
}

export class BatchGetObjectsRequest extends jspb.Message { 
    clearRequestsList(): void;
    getRequestsList(): Array<GetObjectRequest>;
    setRequestsList(value: Array<GetObjectRequest>): BatchGetObjectsRequest;
    addRequests(value?: GetObjectRequest, index?: number): GetObjectRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): BatchGetObjectsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BatchGetObjectsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BatchGetObjectsRequest): BatchGetObjectsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BatchGetObjectsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BatchGetObjectsRequest;
    static deserializeBinaryFromReader(message: BatchGetObjectsRequest, reader: jspb.BinaryReader): BatchGetObjectsRequest;
}

export namespace BatchGetObjectsRequest {
    export type AsObject = {
        requestsList: Array<GetObjectRequest.AsObject>,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class BatchGetObjectsResponse extends jspb.Message { 
    clearObjectsList(): void;
    getObjectsList(): Array<GetObjectResult>;
    setObjectsList(value: Array<GetObjectResult>): BatchGetObjectsResponse;
    addObjects(value?: GetObjectResult, index?: number): GetObjectResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BatchGetObjectsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BatchGetObjectsResponse): BatchGetObjectsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BatchGetObjectsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BatchGetObjectsResponse;
    static deserializeBinaryFromReader(message: BatchGetObjectsResponse, reader: jspb.BinaryReader): BatchGetObjectsResponse;
}

export namespace BatchGetObjectsResponse {
    export type AsObject = {
        objectsList: Array<GetObjectResult.AsObject>,
    }
}

export class GetObjectResult extends jspb.Message { 

    hasObject(): boolean;
    clearObject(): void;
    getObject(): sui_rpc_v2beta2_object_pb.Object | undefined;
    setObject(value?: sui_rpc_v2beta2_object_pb.Object): GetObjectResult;

    hasError(): boolean;
    clearError(): void;
    getError(): google_rpc_status_pb.Status | undefined;
    setError(value?: google_rpc_status_pb.Status): GetObjectResult;

    getResultCase(): GetObjectResult.ResultCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetObjectResult.AsObject;
    static toObject(includeInstance: boolean, msg: GetObjectResult): GetObjectResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetObjectResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetObjectResult;
    static deserializeBinaryFromReader(message: GetObjectResult, reader: jspb.BinaryReader): GetObjectResult;
}

export namespace GetObjectResult {
    export type AsObject = {
        object?: sui_rpc_v2beta2_object_pb.Object.AsObject,
        error?: google_rpc_status_pb.Status.AsObject,
    }

    export enum ResultCase {
        RESULT_NOT_SET = 0,
        OBJECT = 1,
        ERROR = 2,
    }

}

export class GetTransactionRequest extends jspb.Message { 

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): GetTransactionRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): GetTransactionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionRequest): GetTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionRequest;
    static deserializeBinaryFromReader(message: GetTransactionRequest, reader: jspb.BinaryReader): GetTransactionRequest;
}

export namespace GetTransactionRequest {
    export type AsObject = {
        digest?: string,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class GetTransactionResponse extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction | undefined;
    setTransaction(value?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction): GetTransactionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionResponse): GetTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionResponse;
    static deserializeBinaryFromReader(message: GetTransactionResponse, reader: jspb.BinaryReader): GetTransactionResponse;
}

export namespace GetTransactionResponse {
    export type AsObject = {
        transaction?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction.AsObject,
    }
}

export class BatchGetTransactionsRequest extends jspb.Message { 
    clearDigestsList(): void;
    getDigestsList(): Array<string>;
    setDigestsList(value: Array<string>): BatchGetTransactionsRequest;
    addDigests(value: string, index?: number): string;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): BatchGetTransactionsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BatchGetTransactionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: BatchGetTransactionsRequest): BatchGetTransactionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BatchGetTransactionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BatchGetTransactionsRequest;
    static deserializeBinaryFromReader(message: BatchGetTransactionsRequest, reader: jspb.BinaryReader): BatchGetTransactionsRequest;
}

export namespace BatchGetTransactionsRequest {
    export type AsObject = {
        digestsList: Array<string>,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class BatchGetTransactionsResponse extends jspb.Message { 
    clearTransactionsList(): void;
    getTransactionsList(): Array<GetTransactionResult>;
    setTransactionsList(value: Array<GetTransactionResult>): BatchGetTransactionsResponse;
    addTransactions(value?: GetTransactionResult, index?: number): GetTransactionResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BatchGetTransactionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BatchGetTransactionsResponse): BatchGetTransactionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BatchGetTransactionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BatchGetTransactionsResponse;
    static deserializeBinaryFromReader(message: BatchGetTransactionsResponse, reader: jspb.BinaryReader): BatchGetTransactionsResponse;
}

export namespace BatchGetTransactionsResponse {
    export type AsObject = {
        transactionsList: Array<GetTransactionResult.AsObject>,
    }
}

export class GetTransactionResult extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction | undefined;
    setTransaction(value?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction): GetTransactionResult;

    hasError(): boolean;
    clearError(): void;
    getError(): google_rpc_status_pb.Status | undefined;
    setError(value?: google_rpc_status_pb.Status): GetTransactionResult;

    getResultCase(): GetTransactionResult.ResultCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetTransactionResult.AsObject;
    static toObject(includeInstance: boolean, msg: GetTransactionResult): GetTransactionResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetTransactionResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetTransactionResult;
    static deserializeBinaryFromReader(message: GetTransactionResult, reader: jspb.BinaryReader): GetTransactionResult;
}

export namespace GetTransactionResult {
    export type AsObject = {
        transaction?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction.AsObject,
        error?: google_rpc_status_pb.Status.AsObject,
    }

    export enum ResultCase {
        RESULT_NOT_SET = 0,
        TRANSACTION = 1,
        ERROR = 2,
    }

}

export class GetCheckpointRequest extends jspb.Message { 

    hasSequenceNumber(): boolean;
    clearSequenceNumber(): void;
    getSequenceNumber(): number;
    setSequenceNumber(value: number): GetCheckpointRequest;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string;
    setDigest(value: string): GetCheckpointRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): GetCheckpointRequest;

    getCheckpointIdCase(): GetCheckpointRequest.CheckpointIdCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCheckpointRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetCheckpointRequest): GetCheckpointRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCheckpointRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCheckpointRequest;
    static deserializeBinaryFromReader(message: GetCheckpointRequest, reader: jspb.BinaryReader): GetCheckpointRequest;
}

export namespace GetCheckpointRequest {
    export type AsObject = {
        sequenceNumber: number,
        digest: string,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }

    export enum CheckpointIdCase {
        CHECKPOINT_ID_NOT_SET = 0,
        SEQUENCE_NUMBER = 1,
        DIGEST = 2,
    }

}

export class GetCheckpointResponse extends jspb.Message { 

    hasCheckpoint(): boolean;
    clearCheckpoint(): void;
    getCheckpoint(): sui_rpc_v2beta2_checkpoint_pb.Checkpoint | undefined;
    setCheckpoint(value?: sui_rpc_v2beta2_checkpoint_pb.Checkpoint): GetCheckpointResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCheckpointResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetCheckpointResponse): GetCheckpointResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCheckpointResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCheckpointResponse;
    static deserializeBinaryFromReader(message: GetCheckpointResponse, reader: jspb.BinaryReader): GetCheckpointResponse;
}

export namespace GetCheckpointResponse {
    export type AsObject = {
        checkpoint?: sui_rpc_v2beta2_checkpoint_pb.Checkpoint.AsObject,
    }
}

export class GetEpochRequest extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): GetEpochRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): GetEpochRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEpochRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetEpochRequest): GetEpochRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEpochRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEpochRequest;
    static deserializeBinaryFromReader(message: GetEpochRequest, reader: jspb.BinaryReader): GetEpochRequest;
}

export namespace GetEpochRequest {
    export type AsObject = {
        epoch?: number,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class GetEpochResponse extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): sui_rpc_v2beta2_epoch_pb.Epoch | undefined;
    setEpoch(value?: sui_rpc_v2beta2_epoch_pb.Epoch): GetEpochResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetEpochResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetEpochResponse): GetEpochResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetEpochResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetEpochResponse;
    static deserializeBinaryFromReader(message: GetEpochResponse, reader: jspb.BinaryReader): GetEpochResponse;
}

export namespace GetEpochResponse {
    export type AsObject = {
        epoch?: sui_rpc_v2beta2_epoch_pb.Epoch.AsObject,
    }
}
