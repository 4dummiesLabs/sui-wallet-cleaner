// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/effects.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_execution_status_pb from "../../../sui/rpc/v2beta2/execution_status_pb";
import * as sui_rpc_v2beta2_gas_cost_summary_pb from "../../../sui/rpc/v2beta2/gas_cost_summary_pb";
import * as sui_rpc_v2beta2_owner_pb from "../../../sui/rpc/v2beta2/owner_pb";

export class TransactionEffects extends jspb.Message { 

    hasBcs(): boolean;
    clearBcs(): void;
    getBcs(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setBcs(value?: sui_rpc_v2beta2_bcs_pb.Bcs): TransactionEffects;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): TransactionEffects;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): TransactionEffects;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): sui_rpc_v2beta2_execution_status_pb.ExecutionStatus | undefined;
    setStatus(value?: sui_rpc_v2beta2_execution_status_pb.ExecutionStatus): TransactionEffects;

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): TransactionEffects;

    hasGasUsed(): boolean;
    clearGasUsed(): void;
    getGasUsed(): sui_rpc_v2beta2_gas_cost_summary_pb.GasCostSummary | undefined;
    setGasUsed(value?: sui_rpc_v2beta2_gas_cost_summary_pb.GasCostSummary): TransactionEffects;

    hasTransactionDigest(): boolean;
    clearTransactionDigest(): void;
    getTransactionDigest(): string | undefined;
    setTransactionDigest(value: string): TransactionEffects;

    hasGasObject(): boolean;
    clearGasObject(): void;
    getGasObject(): ChangedObject | undefined;
    setGasObject(value?: ChangedObject): TransactionEffects;

    hasEventsDigest(): boolean;
    clearEventsDigest(): void;
    getEventsDigest(): string | undefined;
    setEventsDigest(value: string): TransactionEffects;
    clearDependenciesList(): void;
    getDependenciesList(): Array<string>;
    setDependenciesList(value: Array<string>): TransactionEffects;
    addDependencies(value: string, index?: number): string;

    hasLamportVersion(): boolean;
    clearLamportVersion(): void;
    getLamportVersion(): number | undefined;
    setLamportVersion(value: number): TransactionEffects;
    clearChangedObjectsList(): void;
    getChangedObjectsList(): Array<ChangedObject>;
    setChangedObjectsList(value: Array<ChangedObject>): TransactionEffects;
    addChangedObjects(value?: ChangedObject, index?: number): ChangedObject;
    clearUnchangedConsensusObjectsList(): void;
    getUnchangedConsensusObjectsList(): Array<UnchangedConsensusObject>;
    setUnchangedConsensusObjectsList(value: Array<UnchangedConsensusObject>): TransactionEffects;
    addUnchangedConsensusObjects(value?: UnchangedConsensusObject, index?: number): UnchangedConsensusObject;

    hasAuxiliaryDataDigest(): boolean;
    clearAuxiliaryDataDigest(): void;
    getAuxiliaryDataDigest(): string | undefined;
    setAuxiliaryDataDigest(value: string): TransactionEffects;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionEffects.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionEffects): TransactionEffects.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionEffects, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionEffects;
    static deserializeBinaryFromReader(message: TransactionEffects, reader: jspb.BinaryReader): TransactionEffects;
}

export namespace TransactionEffects {
    export type AsObject = {
        bcs?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        digest?: string,
        version?: number,
        status?: sui_rpc_v2beta2_execution_status_pb.ExecutionStatus.AsObject,
        epoch?: number,
        gasUsed?: sui_rpc_v2beta2_gas_cost_summary_pb.GasCostSummary.AsObject,
        transactionDigest?: string,
        gasObject?: ChangedObject.AsObject,
        eventsDigest?: string,
        dependenciesList: Array<string>,
        lamportVersion?: number,
        changedObjectsList: Array<ChangedObject.AsObject>,
        unchangedConsensusObjectsList: Array<UnchangedConsensusObject.AsObject>,
        auxiliaryDataDigest?: string,
    }
}

export class ChangedObject extends jspb.Message { 

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string | undefined;
    setObjectId(value: string): ChangedObject;

    hasInputState(): boolean;
    clearInputState(): void;
    getInputState(): ChangedObject.InputObjectState | undefined;
    setInputState(value: ChangedObject.InputObjectState): ChangedObject;

    hasInputVersion(): boolean;
    clearInputVersion(): void;
    getInputVersion(): number | undefined;
    setInputVersion(value: number): ChangedObject;

    hasInputDigest(): boolean;
    clearInputDigest(): void;
    getInputDigest(): string | undefined;
    setInputDigest(value: string): ChangedObject;

    hasInputOwner(): boolean;
    clearInputOwner(): void;
    getInputOwner(): sui_rpc_v2beta2_owner_pb.Owner | undefined;
    setInputOwner(value?: sui_rpc_v2beta2_owner_pb.Owner): ChangedObject;

    hasOutputState(): boolean;
    clearOutputState(): void;
    getOutputState(): ChangedObject.OutputObjectState | undefined;
    setOutputState(value: ChangedObject.OutputObjectState): ChangedObject;

    hasOutputVersion(): boolean;
    clearOutputVersion(): void;
    getOutputVersion(): number | undefined;
    setOutputVersion(value: number): ChangedObject;

    hasOutputDigest(): boolean;
    clearOutputDigest(): void;
    getOutputDigest(): string | undefined;
    setOutputDigest(value: string): ChangedObject;

    hasOutputOwner(): boolean;
    clearOutputOwner(): void;
    getOutputOwner(): sui_rpc_v2beta2_owner_pb.Owner | undefined;
    setOutputOwner(value?: sui_rpc_v2beta2_owner_pb.Owner): ChangedObject;

    hasIdOperation(): boolean;
    clearIdOperation(): void;
    getIdOperation(): ChangedObject.IdOperation | undefined;
    setIdOperation(value: ChangedObject.IdOperation): ChangedObject;

    hasObjectType(): boolean;
    clearObjectType(): void;
    getObjectType(): string | undefined;
    setObjectType(value: string): ChangedObject;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangedObject.AsObject;
    static toObject(includeInstance: boolean, msg: ChangedObject): ChangedObject.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangedObject, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangedObject;
    static deserializeBinaryFromReader(message: ChangedObject, reader: jspb.BinaryReader): ChangedObject;
}

export namespace ChangedObject {
    export type AsObject = {
        objectId?: string,
        inputState?: ChangedObject.InputObjectState,
        inputVersion?: number,
        inputDigest?: string,
        inputOwner?: sui_rpc_v2beta2_owner_pb.Owner.AsObject,
        outputState?: ChangedObject.OutputObjectState,
        outputVersion?: number,
        outputDigest?: string,
        outputOwner?: sui_rpc_v2beta2_owner_pb.Owner.AsObject,
        idOperation?: ChangedObject.IdOperation,
        objectType?: string,
    }

    export enum InputObjectState {
    INPUT_OBJECT_STATE_UNKNOWN = 0,
    INPUT_OBJECT_STATE_DOES_NOT_EXIST = 1,
    INPUT_OBJECT_STATE_EXISTS = 2,
    }

    export enum OutputObjectState {
    OUTPUT_OBJECT_STATE_UNKNOWN = 0,
    OUTPUT_OBJECT_STATE_DOES_NOT_EXIST = 1,
    OUTPUT_OBJECT_STATE_OBJECT_WRITE = 2,
    OUTPUT_OBJECT_STATE_PACKAGE_WRITE = 3,
    }

    export enum IdOperation {
    ID_OPERATION_UNKNOWN = 0,
    NONE = 1,
    CREATED = 2,
    DELETED = 3,
    }

}

export class UnchangedConsensusObject extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): UnchangedConsensusObject.UnchangedConsensusObjectKind | undefined;
    setKind(value: UnchangedConsensusObject.UnchangedConsensusObjectKind): UnchangedConsensusObject;

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string | undefined;
    setObjectId(value: string): UnchangedConsensusObject;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): UnchangedConsensusObject;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): UnchangedConsensusObject;

    hasObjectType(): boolean;
    clearObjectType(): void;
    getObjectType(): string | undefined;
    setObjectType(value: string): UnchangedConsensusObject;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UnchangedConsensusObject.AsObject;
    static toObject(includeInstance: boolean, msg: UnchangedConsensusObject): UnchangedConsensusObject.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UnchangedConsensusObject, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UnchangedConsensusObject;
    static deserializeBinaryFromReader(message: UnchangedConsensusObject, reader: jspb.BinaryReader): UnchangedConsensusObject;
}

export namespace UnchangedConsensusObject {
    export type AsObject = {
        kind?: UnchangedConsensusObject.UnchangedConsensusObjectKind,
        objectId?: string,
        version?: number,
        digest?: string,
        objectType?: string,
    }

    export enum UnchangedConsensusObjectKind {
    UNCHANGED_CONSENSUS_OBJECT_KIND_UNKNOWN = 0,
    READ_ONLY_ROOT = 1,
    MUTATE_CONSENSUS_STREAM_ENDED = 2,
    READ_CONSENSUS_STREAM_ENDED = 3,
    CANCELED = 4,
    PER_EPOCH_CONFIG = 5,
    }

}
