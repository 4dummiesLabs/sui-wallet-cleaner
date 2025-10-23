// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/executed_transaction.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as sui_rpc_v2beta2_balance_change_pb from "../../../sui/rpc/v2beta2/balance_change_pb";
import * as sui_rpc_v2beta2_effects_pb from "../../../sui/rpc/v2beta2/effects_pb";
import * as sui_rpc_v2beta2_event_pb from "../../../sui/rpc/v2beta2/event_pb";
import * as sui_rpc_v2beta2_object_pb from "../../../sui/rpc/v2beta2/object_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";
import * as sui_rpc_v2beta2_transaction_pb from "../../../sui/rpc/v2beta2/transaction_pb";

export class ExecutedTransaction extends jspb.Message { 

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): ExecutedTransaction;

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): sui_rpc_v2beta2_transaction_pb.Transaction | undefined;
    setTransaction(value?: sui_rpc_v2beta2_transaction_pb.Transaction): ExecutedTransaction;
    clearSignaturesList(): void;
    getSignaturesList(): Array<sui_rpc_v2beta2_signature_pb.UserSignature>;
    setSignaturesList(value: Array<sui_rpc_v2beta2_signature_pb.UserSignature>): ExecutedTransaction;
    addSignatures(value?: sui_rpc_v2beta2_signature_pb.UserSignature, index?: number): sui_rpc_v2beta2_signature_pb.UserSignature;

    hasEffects(): boolean;
    clearEffects(): void;
    getEffects(): sui_rpc_v2beta2_effects_pb.TransactionEffects | undefined;
    setEffects(value?: sui_rpc_v2beta2_effects_pb.TransactionEffects): ExecutedTransaction;

    hasEvents(): boolean;
    clearEvents(): void;
    getEvents(): sui_rpc_v2beta2_event_pb.TransactionEvents | undefined;
    setEvents(value?: sui_rpc_v2beta2_event_pb.TransactionEvents): ExecutedTransaction;

    hasCheckpoint(): boolean;
    clearCheckpoint(): void;
    getCheckpoint(): number | undefined;
    setCheckpoint(value: number): ExecutedTransaction;

    hasTimestamp(): boolean;
    clearTimestamp(): void;
    getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): ExecutedTransaction;
    clearBalanceChangesList(): void;
    getBalanceChangesList(): Array<sui_rpc_v2beta2_balance_change_pb.BalanceChange>;
    setBalanceChangesList(value: Array<sui_rpc_v2beta2_balance_change_pb.BalanceChange>): ExecutedTransaction;
    addBalanceChanges(value?: sui_rpc_v2beta2_balance_change_pb.BalanceChange, index?: number): sui_rpc_v2beta2_balance_change_pb.BalanceChange;
    clearInputObjectsList(): void;
    getInputObjectsList(): Array<sui_rpc_v2beta2_object_pb.Object>;
    setInputObjectsList(value: Array<sui_rpc_v2beta2_object_pb.Object>): ExecutedTransaction;
    addInputObjects(value?: sui_rpc_v2beta2_object_pb.Object, index?: number): sui_rpc_v2beta2_object_pb.Object;
    clearOutputObjectsList(): void;
    getOutputObjectsList(): Array<sui_rpc_v2beta2_object_pb.Object>;
    setOutputObjectsList(value: Array<sui_rpc_v2beta2_object_pb.Object>): ExecutedTransaction;
    addOutputObjects(value?: sui_rpc_v2beta2_object_pb.Object, index?: number): sui_rpc_v2beta2_object_pb.Object;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutedTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutedTransaction): ExecutedTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutedTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutedTransaction;
    static deserializeBinaryFromReader(message: ExecutedTransaction, reader: jspb.BinaryReader): ExecutedTransaction;
}

export namespace ExecutedTransaction {
    export type AsObject = {
        digest?: string,
        transaction?: sui_rpc_v2beta2_transaction_pb.Transaction.AsObject,
        signaturesList: Array<sui_rpc_v2beta2_signature_pb.UserSignature.AsObject>,
        effects?: sui_rpc_v2beta2_effects_pb.TransactionEffects.AsObject,
        events?: sui_rpc_v2beta2_event_pb.TransactionEvents.AsObject,
        checkpoint?: number,
        timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        balanceChangesList: Array<sui_rpc_v2beta2_balance_change_pb.BalanceChange.AsObject>,
        inputObjectsList: Array<sui_rpc_v2beta2_object_pb.Object.AsObject>,
        outputObjectsList: Array<sui_rpc_v2beta2_object_pb.Object.AsObject>,
    }
}
