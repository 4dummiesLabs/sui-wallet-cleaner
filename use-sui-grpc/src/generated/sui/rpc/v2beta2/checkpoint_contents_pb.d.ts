// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/checkpoint_contents.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";

export class CheckpointContents extends jspb.Message { 

    hasBcs(): boolean;
    clearBcs(): void;
    getBcs(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setBcs(value?: sui_rpc_v2beta2_bcs_pb.Bcs): CheckpointContents;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): CheckpointContents;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): CheckpointContents;
    clearTransactionsList(): void;
    getTransactionsList(): Array<CheckpointedTransactionInfo>;
    setTransactionsList(value: Array<CheckpointedTransactionInfo>): CheckpointContents;
    addTransactions(value?: CheckpointedTransactionInfo, index?: number): CheckpointedTransactionInfo;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckpointContents.AsObject;
    static toObject(includeInstance: boolean, msg: CheckpointContents): CheckpointContents.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckpointContents, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckpointContents;
    static deserializeBinaryFromReader(message: CheckpointContents, reader: jspb.BinaryReader): CheckpointContents;
}

export namespace CheckpointContents {
    export type AsObject = {
        bcs?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        digest?: string,
        version?: number,
        transactionsList: Array<CheckpointedTransactionInfo.AsObject>,
    }
}

export class CheckpointedTransactionInfo extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): string | undefined;
    setTransaction(value: string): CheckpointedTransactionInfo;

    hasEffects(): boolean;
    clearEffects(): void;
    getEffects(): string | undefined;
    setEffects(value: string): CheckpointedTransactionInfo;
    clearSignaturesList(): void;
    getSignaturesList(): Array<sui_rpc_v2beta2_signature_pb.UserSignature>;
    setSignaturesList(value: Array<sui_rpc_v2beta2_signature_pb.UserSignature>): CheckpointedTransactionInfo;
    addSignatures(value?: sui_rpc_v2beta2_signature_pb.UserSignature, index?: number): sui_rpc_v2beta2_signature_pb.UserSignature;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckpointedTransactionInfo.AsObject;
    static toObject(includeInstance: boolean, msg: CheckpointedTransactionInfo): CheckpointedTransactionInfo.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckpointedTransactionInfo, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckpointedTransactionInfo;
    static deserializeBinaryFromReader(message: CheckpointedTransactionInfo, reader: jspb.BinaryReader): CheckpointedTransactionInfo;
}

export namespace CheckpointedTransactionInfo {
    export type AsObject = {
        transaction?: string,
        effects?: string,
        signaturesList: Array<sui_rpc_v2beta2_signature_pb.UserSignature.AsObject>,
    }
}
