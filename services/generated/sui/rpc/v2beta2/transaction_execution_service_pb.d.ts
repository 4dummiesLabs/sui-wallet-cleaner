// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/transaction_execution_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as sui_rpc_v2beta2_executed_transaction_pb from "../../../sui/rpc/v2beta2/executed_transaction_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";
import * as sui_rpc_v2beta2_transaction_pb from "../../../sui/rpc/v2beta2/transaction_pb";

export class ExecuteTransactionRequest extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): sui_rpc_v2beta2_transaction_pb.Transaction | undefined;
    setTransaction(value?: sui_rpc_v2beta2_transaction_pb.Transaction): ExecuteTransactionRequest;
    clearSignaturesList(): void;
    getSignaturesList(): Array<sui_rpc_v2beta2_signature_pb.UserSignature>;
    setSignaturesList(value: Array<sui_rpc_v2beta2_signature_pb.UserSignature>): ExecuteTransactionRequest;
    addSignatures(value?: sui_rpc_v2beta2_signature_pb.UserSignature, index?: number): sui_rpc_v2beta2_signature_pb.UserSignature;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): ExecuteTransactionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecuteTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ExecuteTransactionRequest): ExecuteTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecuteTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecuteTransactionRequest;
    static deserializeBinaryFromReader(message: ExecuteTransactionRequest, reader: jspb.BinaryReader): ExecuteTransactionRequest;
}

export namespace ExecuteTransactionRequest {
    export type AsObject = {
        transaction?: sui_rpc_v2beta2_transaction_pb.Transaction.AsObject,
        signaturesList: Array<sui_rpc_v2beta2_signature_pb.UserSignature.AsObject>,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class ExecuteTransactionResponse extends jspb.Message { 

    hasFinality(): boolean;
    clearFinality(): void;
    getFinality(): TransactionFinality | undefined;
    setFinality(value?: TransactionFinality): ExecuteTransactionResponse;

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction | undefined;
    setTransaction(value?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction): ExecuteTransactionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecuteTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ExecuteTransactionResponse): ExecuteTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecuteTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecuteTransactionResponse;
    static deserializeBinaryFromReader(message: ExecuteTransactionResponse, reader: jspb.BinaryReader): ExecuteTransactionResponse;
}

export namespace ExecuteTransactionResponse {
    export type AsObject = {
        finality?: TransactionFinality.AsObject,
        transaction?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction.AsObject,
    }
}

export class TransactionFinality extends jspb.Message { 

    hasCertified(): boolean;
    clearCertified(): void;
    getCertified(): sui_rpc_v2beta2_signature_pb.ValidatorAggregatedSignature | undefined;
    setCertified(value?: sui_rpc_v2beta2_signature_pb.ValidatorAggregatedSignature): TransactionFinality;

    hasCheckpointed(): boolean;
    clearCheckpointed(): void;
    getCheckpointed(): number;
    setCheckpointed(value: number): TransactionFinality;

    hasQuorumExecuted(): boolean;
    clearQuorumExecuted(): void;
    getQuorumExecuted(): google_protobuf_empty_pb.Empty | undefined;
    setQuorumExecuted(value?: google_protobuf_empty_pb.Empty): TransactionFinality;

    getFinalityCase(): TransactionFinality.FinalityCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionFinality.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionFinality): TransactionFinality.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionFinality, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionFinality;
    static deserializeBinaryFromReader(message: TransactionFinality, reader: jspb.BinaryReader): TransactionFinality;
}

export namespace TransactionFinality {
    export type AsObject = {
        certified?: sui_rpc_v2beta2_signature_pb.ValidatorAggregatedSignature.AsObject,
        checkpointed: number,
        quorumExecuted?: google_protobuf_empty_pb.Empty.AsObject,
    }

    export enum FinalityCase {
        FINALITY_NOT_SET = 0,
        CERTIFIED = 1,
        CHECKPOINTED = 2,
        QUORUM_EXECUTED = 3,
    }

}
