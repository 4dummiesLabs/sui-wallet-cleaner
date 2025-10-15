// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/epoch.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as sui_rpc_v2beta2_protocol_config_pb from "../../../sui/rpc/v2beta2/protocol_config_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";
import * as sui_rpc_v2beta2_system_state_pb from "../../../sui/rpc/v2beta2/system_state_pb";

export class Epoch extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): Epoch;

    hasCommittee(): boolean;
    clearCommittee(): void;
    getCommittee(): sui_rpc_v2beta2_signature_pb.ValidatorCommittee | undefined;
    setCommittee(value?: sui_rpc_v2beta2_signature_pb.ValidatorCommittee): Epoch;

    hasSystemState(): boolean;
    clearSystemState(): void;
    getSystemState(): sui_rpc_v2beta2_system_state_pb.SystemState | undefined;
    setSystemState(value?: sui_rpc_v2beta2_system_state_pb.SystemState): Epoch;

    hasFirstCheckpoint(): boolean;
    clearFirstCheckpoint(): void;
    getFirstCheckpoint(): number | undefined;
    setFirstCheckpoint(value: number): Epoch;

    hasLastCheckpoint(): boolean;
    clearLastCheckpoint(): void;
    getLastCheckpoint(): number | undefined;
    setLastCheckpoint(value: number): Epoch;

    hasStart(): boolean;
    clearStart(): void;
    getStart(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setStart(value?: google_protobuf_timestamp_pb.Timestamp): Epoch;

    hasEnd(): boolean;
    clearEnd(): void;
    getEnd(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setEnd(value?: google_protobuf_timestamp_pb.Timestamp): Epoch;

    hasReferenceGasPrice(): boolean;
    clearReferenceGasPrice(): void;
    getReferenceGasPrice(): number | undefined;
    setReferenceGasPrice(value: number): Epoch;

    hasProtocolConfig(): boolean;
    clearProtocolConfig(): void;
    getProtocolConfig(): sui_rpc_v2beta2_protocol_config_pb.ProtocolConfig | undefined;
    setProtocolConfig(value?: sui_rpc_v2beta2_protocol_config_pb.ProtocolConfig): Epoch;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Epoch.AsObject;
    static toObject(includeInstance: boolean, msg: Epoch): Epoch.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Epoch, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Epoch;
    static deserializeBinaryFromReader(message: Epoch, reader: jspb.BinaryReader): Epoch;
}

export namespace Epoch {
    export type AsObject = {
        epoch?: number,
        committee?: sui_rpc_v2beta2_signature_pb.ValidatorCommittee.AsObject,
        systemState?: sui_rpc_v2beta2_system_state_pb.SystemState.AsObject,
        firstCheckpoint?: number,
        lastCheckpoint?: number,
        start?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        end?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        referenceGasPrice?: number,
        protocolConfig?: sui_rpc_v2beta2_protocol_config_pb.ProtocolConfig.AsObject,
    }
}
