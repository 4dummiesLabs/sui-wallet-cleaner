// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/checkpoint_summary.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_gas_cost_summary_pb from "../../../sui/rpc/v2beta2/gas_cost_summary_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";

export class CheckpointSummary extends jspb.Message { 

    hasBcs(): boolean;
    clearBcs(): void;
    getBcs(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setBcs(value?: sui_rpc_v2beta2_bcs_pb.Bcs): CheckpointSummary;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): CheckpointSummary;

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): CheckpointSummary;

    hasSequenceNumber(): boolean;
    clearSequenceNumber(): void;
    getSequenceNumber(): number | undefined;
    setSequenceNumber(value: number): CheckpointSummary;

    hasTotalNetworkTransactions(): boolean;
    clearTotalNetworkTransactions(): void;
    getTotalNetworkTransactions(): number | undefined;
    setTotalNetworkTransactions(value: number): CheckpointSummary;

    hasContentDigest(): boolean;
    clearContentDigest(): void;
    getContentDigest(): string | undefined;
    setContentDigest(value: string): CheckpointSummary;

    hasPreviousDigest(): boolean;
    clearPreviousDigest(): void;
    getPreviousDigest(): string | undefined;
    setPreviousDigest(value: string): CheckpointSummary;

    hasEpochRollingGasCostSummary(): boolean;
    clearEpochRollingGasCostSummary(): void;
    getEpochRollingGasCostSummary(): sui_rpc_v2beta2_gas_cost_summary_pb.GasCostSummary | undefined;
    setEpochRollingGasCostSummary(value?: sui_rpc_v2beta2_gas_cost_summary_pb.GasCostSummary): CheckpointSummary;

    hasTimestamp(): boolean;
    clearTimestamp(): void;
    getTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): CheckpointSummary;
    clearCommitmentsList(): void;
    getCommitmentsList(): Array<CheckpointCommitment>;
    setCommitmentsList(value: Array<CheckpointCommitment>): CheckpointSummary;
    addCommitments(value?: CheckpointCommitment, index?: number): CheckpointCommitment;

    hasEndOfEpochData(): boolean;
    clearEndOfEpochData(): void;
    getEndOfEpochData(): EndOfEpochData | undefined;
    setEndOfEpochData(value?: EndOfEpochData): CheckpointSummary;

    hasVersionSpecificData(): boolean;
    clearVersionSpecificData(): void;
    getVersionSpecificData(): Uint8Array | string;
    getVersionSpecificData_asU8(): Uint8Array;
    getVersionSpecificData_asB64(): string;
    setVersionSpecificData(value: Uint8Array | string): CheckpointSummary;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckpointSummary.AsObject;
    static toObject(includeInstance: boolean, msg: CheckpointSummary): CheckpointSummary.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckpointSummary, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckpointSummary;
    static deserializeBinaryFromReader(message: CheckpointSummary, reader: jspb.BinaryReader): CheckpointSummary;
}

export namespace CheckpointSummary {
    export type AsObject = {
        bcs?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        digest?: string,
        epoch?: number,
        sequenceNumber?: number,
        totalNetworkTransactions?: number,
        contentDigest?: string,
        previousDigest?: string,
        epochRollingGasCostSummary?: sui_rpc_v2beta2_gas_cost_summary_pb.GasCostSummary.AsObject,
        timestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        commitmentsList: Array<CheckpointCommitment.AsObject>,
        endOfEpochData?: EndOfEpochData.AsObject,
        versionSpecificData: Uint8Array | string,
    }
}

export class EndOfEpochData extends jspb.Message { 
    clearNextEpochCommitteeList(): void;
    getNextEpochCommitteeList(): Array<sui_rpc_v2beta2_signature_pb.ValidatorCommitteeMember>;
    setNextEpochCommitteeList(value: Array<sui_rpc_v2beta2_signature_pb.ValidatorCommitteeMember>): EndOfEpochData;
    addNextEpochCommittee(value?: sui_rpc_v2beta2_signature_pb.ValidatorCommitteeMember, index?: number): sui_rpc_v2beta2_signature_pb.ValidatorCommitteeMember;

    hasNextEpochProtocolVersion(): boolean;
    clearNextEpochProtocolVersion(): void;
    getNextEpochProtocolVersion(): number | undefined;
    setNextEpochProtocolVersion(value: number): EndOfEpochData;
    clearEpochCommitmentsList(): void;
    getEpochCommitmentsList(): Array<CheckpointCommitment>;
    setEpochCommitmentsList(value: Array<CheckpointCommitment>): EndOfEpochData;
    addEpochCommitments(value?: CheckpointCommitment, index?: number): CheckpointCommitment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EndOfEpochData.AsObject;
    static toObject(includeInstance: boolean, msg: EndOfEpochData): EndOfEpochData.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EndOfEpochData, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EndOfEpochData;
    static deserializeBinaryFromReader(message: EndOfEpochData, reader: jspb.BinaryReader): EndOfEpochData;
}

export namespace EndOfEpochData {
    export type AsObject = {
        nextEpochCommitteeList: Array<sui_rpc_v2beta2_signature_pb.ValidatorCommitteeMember.AsObject>,
        nextEpochProtocolVersion?: number,
        epochCommitmentsList: Array<CheckpointCommitment.AsObject>,
    }
}

export class CheckpointCommitment extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): CheckpointCommitment.CheckpointCommitmentKind | undefined;
    setKind(value: CheckpointCommitment.CheckpointCommitmentKind): CheckpointCommitment;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): CheckpointCommitment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckpointCommitment.AsObject;
    static toObject(includeInstance: boolean, msg: CheckpointCommitment): CheckpointCommitment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckpointCommitment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckpointCommitment;
    static deserializeBinaryFromReader(message: CheckpointCommitment, reader: jspb.BinaryReader): CheckpointCommitment;
}

export namespace CheckpointCommitment {
    export type AsObject = {
        kind?: CheckpointCommitment.CheckpointCommitmentKind,
        digest?: string,
    }

    export enum CheckpointCommitmentKind {
    CHECKPOINT_COMMITMENT_KIND_UNKNOWN = 0,
    ECMH_LIVE_OBJECT_SET = 1,
    CHECKPOINT_ARTIFACTS = 2,
    }

}
