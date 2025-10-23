// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/checkpoint.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as sui_rpc_v2beta2_checkpoint_contents_pb from "../../../sui/rpc/v2beta2/checkpoint_contents_pb";
import * as sui_rpc_v2beta2_checkpoint_summary_pb from "../../../sui/rpc/v2beta2/checkpoint_summary_pb";
import * as sui_rpc_v2beta2_executed_transaction_pb from "../../../sui/rpc/v2beta2/executed_transaction_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";

export class Checkpoint extends jspb.Message { 

    hasSequenceNumber(): boolean;
    clearSequenceNumber(): void;
    getSequenceNumber(): number | undefined;
    setSequenceNumber(value: number): Checkpoint;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): Checkpoint;

    hasSummary(): boolean;
    clearSummary(): void;
    getSummary(): sui_rpc_v2beta2_checkpoint_summary_pb.CheckpointSummary | undefined;
    setSummary(value?: sui_rpc_v2beta2_checkpoint_summary_pb.CheckpointSummary): Checkpoint;

    hasSignature(): boolean;
    clearSignature(): void;
    getSignature(): sui_rpc_v2beta2_signature_pb.ValidatorAggregatedSignature | undefined;
    setSignature(value?: sui_rpc_v2beta2_signature_pb.ValidatorAggregatedSignature): Checkpoint;

    hasContents(): boolean;
    clearContents(): void;
    getContents(): sui_rpc_v2beta2_checkpoint_contents_pb.CheckpointContents | undefined;
    setContents(value?: sui_rpc_v2beta2_checkpoint_contents_pb.CheckpointContents): Checkpoint;
    clearTransactionsList(): void;
    getTransactionsList(): Array<sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction>;
    setTransactionsList(value: Array<sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction>): Checkpoint;
    addTransactions(value?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction, index?: number): sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Checkpoint.AsObject;
    static toObject(includeInstance: boolean, msg: Checkpoint): Checkpoint.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Checkpoint, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Checkpoint;
    static deserializeBinaryFromReader(message: Checkpoint, reader: jspb.BinaryReader): Checkpoint;
}

export namespace Checkpoint {
    export type AsObject = {
        sequenceNumber?: number,
        digest?: string,
        summary?: sui_rpc_v2beta2_checkpoint_summary_pb.CheckpointSummary.AsObject,
        signature?: sui_rpc_v2beta2_signature_pb.ValidatorAggregatedSignature.AsObject,
        contents?: sui_rpc_v2beta2_checkpoint_contents_pb.CheckpointContents.AsObject,
        transactionsList: Array<sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction.AsObject>,
    }
}
