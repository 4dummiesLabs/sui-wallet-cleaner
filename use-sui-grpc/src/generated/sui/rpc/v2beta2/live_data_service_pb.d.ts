// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/live_data_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as sui_rpc_v2beta2_argument_pb from "../../../sui/rpc/v2beta2/argument_pb";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_executed_transaction_pb from "../../../sui/rpc/v2beta2/executed_transaction_pb";
import * as sui_rpc_v2beta2_object_pb from "../../../sui/rpc/v2beta2/object_pb";
import * as sui_rpc_v2beta2_transaction_pb from "../../../sui/rpc/v2beta2/transaction_pb";

export class GetCoinInfoRequest extends jspb.Message { 

    hasCoinType(): boolean;
    clearCoinType(): void;
    getCoinType(): string | undefined;
    setCoinType(value: string): GetCoinInfoRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCoinInfoRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetCoinInfoRequest): GetCoinInfoRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCoinInfoRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCoinInfoRequest;
    static deserializeBinaryFromReader(message: GetCoinInfoRequest, reader: jspb.BinaryReader): GetCoinInfoRequest;
}

export namespace GetCoinInfoRequest {
    export type AsObject = {
        coinType?: string,
    }
}

export class GetCoinInfoResponse extends jspb.Message { 

    hasCoinType(): boolean;
    clearCoinType(): void;
    getCoinType(): string | undefined;
    setCoinType(value: string): GetCoinInfoResponse;

    hasMetadata(): boolean;
    clearMetadata(): void;
    getMetadata(): CoinMetadata | undefined;
    setMetadata(value?: CoinMetadata): GetCoinInfoResponse;

    hasTreasury(): boolean;
    clearTreasury(): void;
    getTreasury(): CoinTreasury | undefined;
    setTreasury(value?: CoinTreasury): GetCoinInfoResponse;

    hasRegulatedMetadata(): boolean;
    clearRegulatedMetadata(): void;
    getRegulatedMetadata(): RegulatedCoinMetadata | undefined;
    setRegulatedMetadata(value?: RegulatedCoinMetadata): GetCoinInfoResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetCoinInfoResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetCoinInfoResponse): GetCoinInfoResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetCoinInfoResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetCoinInfoResponse;
    static deserializeBinaryFromReader(message: GetCoinInfoResponse, reader: jspb.BinaryReader): GetCoinInfoResponse;
}

export namespace GetCoinInfoResponse {
    export type AsObject = {
        coinType?: string,
        metadata?: CoinMetadata.AsObject,
        treasury?: CoinTreasury.AsObject,
        regulatedMetadata?: RegulatedCoinMetadata.AsObject,
    }
}

export class CoinMetadata extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): CoinMetadata;

    hasDecimals(): boolean;
    clearDecimals(): void;
    getDecimals(): number | undefined;
    setDecimals(value: number): CoinMetadata;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): CoinMetadata;

    hasSymbol(): boolean;
    clearSymbol(): void;
    getSymbol(): string | undefined;
    setSymbol(value: string): CoinMetadata;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): string | undefined;
    setDescription(value: string): CoinMetadata;

    hasIconUrl(): boolean;
    clearIconUrl(): void;
    getIconUrl(): string | undefined;
    setIconUrl(value: string): CoinMetadata;

    hasMetadataCapId(): boolean;
    clearMetadataCapId(): void;
    getMetadataCapId(): string | undefined;
    setMetadataCapId(value: string): CoinMetadata;

    hasMetadataCapState(): boolean;
    clearMetadataCapState(): void;
    getMetadataCapState(): CoinMetadata.MetadataCapState | undefined;
    setMetadataCapState(value: CoinMetadata.MetadataCapState): CoinMetadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CoinMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: CoinMetadata): CoinMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CoinMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CoinMetadata;
    static deserializeBinaryFromReader(message: CoinMetadata, reader: jspb.BinaryReader): CoinMetadata;
}

export namespace CoinMetadata {
    export type AsObject = {
        id?: string,
        decimals?: number,
        name?: string,
        symbol?: string,
        description?: string,
        iconUrl?: string,
        metadataCapId?: string,
        metadataCapState?: CoinMetadata.MetadataCapState,
    }

    export enum MetadataCapState {
    METADATA_CAP_STATE_UNKNOWN = 0,
    CLAIMED = 1,
    UNCLAIMED = 2,
    DELETED = 3,
    }

}

export class CoinTreasury extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): CoinTreasury;

    hasTotalSupply(): boolean;
    clearTotalSupply(): void;
    getTotalSupply(): number | undefined;
    setTotalSupply(value: number): CoinTreasury;

    hasSupplyState(): boolean;
    clearSupplyState(): void;
    getSupplyState(): CoinTreasury.SupplyState | undefined;
    setSupplyState(value: CoinTreasury.SupplyState): CoinTreasury;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CoinTreasury.AsObject;
    static toObject(includeInstance: boolean, msg: CoinTreasury): CoinTreasury.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CoinTreasury, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CoinTreasury;
    static deserializeBinaryFromReader(message: CoinTreasury, reader: jspb.BinaryReader): CoinTreasury;
}

export namespace CoinTreasury {
    export type AsObject = {
        id?: string,
        totalSupply?: number,
        supplyState?: CoinTreasury.SupplyState,
    }

    export enum SupplyState {
    SUPPLY_STATE_UNKNOWN = 0,
    FIXED = 1,
    BURN_ONLY = 2,
    }

}

export class RegulatedCoinMetadata extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): RegulatedCoinMetadata;

    hasCoinMetadataObject(): boolean;
    clearCoinMetadataObject(): void;
    getCoinMetadataObject(): string | undefined;
    setCoinMetadataObject(value: string): RegulatedCoinMetadata;

    hasDenyCapObject(): boolean;
    clearDenyCapObject(): void;
    getDenyCapObject(): string | undefined;
    setDenyCapObject(value: string): RegulatedCoinMetadata;

    hasAllowGlobalPause(): boolean;
    clearAllowGlobalPause(): void;
    getAllowGlobalPause(): boolean | undefined;
    setAllowGlobalPause(value: boolean): RegulatedCoinMetadata;

    hasVariant(): boolean;
    clearVariant(): void;
    getVariant(): number | undefined;
    setVariant(value: number): RegulatedCoinMetadata;

    hasCoinRegulatedState(): boolean;
    clearCoinRegulatedState(): void;
    getCoinRegulatedState(): RegulatedCoinMetadata.CoinRegulatedState | undefined;
    setCoinRegulatedState(value: RegulatedCoinMetadata.CoinRegulatedState): RegulatedCoinMetadata;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RegulatedCoinMetadata.AsObject;
    static toObject(includeInstance: boolean, msg: RegulatedCoinMetadata): RegulatedCoinMetadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RegulatedCoinMetadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RegulatedCoinMetadata;
    static deserializeBinaryFromReader(message: RegulatedCoinMetadata, reader: jspb.BinaryReader): RegulatedCoinMetadata;
}

export namespace RegulatedCoinMetadata {
    export type AsObject = {
        id?: string,
        coinMetadataObject?: string,
        denyCapObject?: string,
        allowGlobalPause?: boolean,
        variant?: number,
        coinRegulatedState?: RegulatedCoinMetadata.CoinRegulatedState,
    }

    export enum CoinRegulatedState {
    COIN_REGULATED_STATE_UNKNOWN = 0,
    REGULATED = 1,
    UNREGULATED = 2,
    }

}

export class GetBalanceRequest extends jspb.Message { 

    hasOwner(): boolean;
    clearOwner(): void;
    getOwner(): string | undefined;
    setOwner(value: string): GetBalanceRequest;

    hasCoinType(): boolean;
    clearCoinType(): void;
    getCoinType(): string | undefined;
    setCoinType(value: string): GetBalanceRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBalanceRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetBalanceRequest): GetBalanceRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBalanceRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBalanceRequest;
    static deserializeBinaryFromReader(message: GetBalanceRequest, reader: jspb.BinaryReader): GetBalanceRequest;
}

export namespace GetBalanceRequest {
    export type AsObject = {
        owner?: string,
        coinType?: string,
    }
}

export class GetBalanceResponse extends jspb.Message { 

    hasBalance(): boolean;
    clearBalance(): void;
    getBalance(): Balance | undefined;
    setBalance(value?: Balance): GetBalanceResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetBalanceResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetBalanceResponse): GetBalanceResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetBalanceResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetBalanceResponse;
    static deserializeBinaryFromReader(message: GetBalanceResponse, reader: jspb.BinaryReader): GetBalanceResponse;
}

export namespace GetBalanceResponse {
    export type AsObject = {
        balance?: Balance.AsObject,
    }
}

export class ListBalancesRequest extends jspb.Message { 

    hasOwner(): boolean;
    clearOwner(): void;
    getOwner(): string | undefined;
    setOwner(value: string): ListBalancesRequest;

    hasPageSize(): boolean;
    clearPageSize(): void;
    getPageSize(): number | undefined;
    setPageSize(value: number): ListBalancesRequest;

    hasPageToken(): boolean;
    clearPageToken(): void;
    getPageToken(): Uint8Array | string;
    getPageToken_asU8(): Uint8Array;
    getPageToken_asB64(): string;
    setPageToken(value: Uint8Array | string): ListBalancesRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListBalancesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListBalancesRequest): ListBalancesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListBalancesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListBalancesRequest;
    static deserializeBinaryFromReader(message: ListBalancesRequest, reader: jspb.BinaryReader): ListBalancesRequest;
}

export namespace ListBalancesRequest {
    export type AsObject = {
        owner?: string,
        pageSize?: number,
        pageToken: Uint8Array | string,
    }
}

export class ListBalancesResponse extends jspb.Message { 
    clearBalancesList(): void;
    getBalancesList(): Array<Balance>;
    setBalancesList(value: Array<Balance>): ListBalancesResponse;
    addBalances(value?: Balance, index?: number): Balance;

    hasNextPageToken(): boolean;
    clearNextPageToken(): void;
    getNextPageToken(): Uint8Array | string;
    getNextPageToken_asU8(): Uint8Array;
    getNextPageToken_asB64(): string;
    setNextPageToken(value: Uint8Array | string): ListBalancesResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListBalancesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListBalancesResponse): ListBalancesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListBalancesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListBalancesResponse;
    static deserializeBinaryFromReader(message: ListBalancesResponse, reader: jspb.BinaryReader): ListBalancesResponse;
}

export namespace ListBalancesResponse {
    export type AsObject = {
        balancesList: Array<Balance.AsObject>,
        nextPageToken: Uint8Array | string,
    }
}

export class Balance extends jspb.Message { 

    hasCoinType(): boolean;
    clearCoinType(): void;
    getCoinType(): string | undefined;
    setCoinType(value: string): Balance;

    hasBalance(): boolean;
    clearBalance(): void;
    getBalance(): number | undefined;
    setBalance(value: number): Balance;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Balance.AsObject;
    static toObject(includeInstance: boolean, msg: Balance): Balance.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Balance, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Balance;
    static deserializeBinaryFromReader(message: Balance, reader: jspb.BinaryReader): Balance;
}

export namespace Balance {
    export type AsObject = {
        coinType?: string,
        balance?: number,
    }
}

export class ListDynamicFieldsRequest extends jspb.Message { 

    hasParent(): boolean;
    clearParent(): void;
    getParent(): string | undefined;
    setParent(value: string): ListDynamicFieldsRequest;

    hasPageSize(): boolean;
    clearPageSize(): void;
    getPageSize(): number | undefined;
    setPageSize(value: number): ListDynamicFieldsRequest;

    hasPageToken(): boolean;
    clearPageToken(): void;
    getPageToken(): Uint8Array | string;
    getPageToken_asU8(): Uint8Array;
    getPageToken_asB64(): string;
    setPageToken(value: Uint8Array | string): ListDynamicFieldsRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): ListDynamicFieldsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListDynamicFieldsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListDynamicFieldsRequest): ListDynamicFieldsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListDynamicFieldsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListDynamicFieldsRequest;
    static deserializeBinaryFromReader(message: ListDynamicFieldsRequest, reader: jspb.BinaryReader): ListDynamicFieldsRequest;
}

export namespace ListDynamicFieldsRequest {
    export type AsObject = {
        parent?: string,
        pageSize?: number,
        pageToken: Uint8Array | string,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class ListDynamicFieldsResponse extends jspb.Message { 
    clearDynamicFieldsList(): void;
    getDynamicFieldsList(): Array<DynamicField>;
    setDynamicFieldsList(value: Array<DynamicField>): ListDynamicFieldsResponse;
    addDynamicFields(value?: DynamicField, index?: number): DynamicField;

    hasNextPageToken(): boolean;
    clearNextPageToken(): void;
    getNextPageToken(): Uint8Array | string;
    getNextPageToken_asU8(): Uint8Array;
    getNextPageToken_asB64(): string;
    setNextPageToken(value: Uint8Array | string): ListDynamicFieldsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListDynamicFieldsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListDynamicFieldsResponse): ListDynamicFieldsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListDynamicFieldsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListDynamicFieldsResponse;
    static deserializeBinaryFromReader(message: ListDynamicFieldsResponse, reader: jspb.BinaryReader): ListDynamicFieldsResponse;
}

export namespace ListDynamicFieldsResponse {
    export type AsObject = {
        dynamicFieldsList: Array<DynamicField.AsObject>,
        nextPageToken: Uint8Array | string,
    }
}

export class DynamicField extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): DynamicField.DynamicFieldKind | undefined;
    setKind(value: DynamicField.DynamicFieldKind): DynamicField;

    hasParent(): boolean;
    clearParent(): void;
    getParent(): string | undefined;
    setParent(value: string): DynamicField;

    hasFieldId(): boolean;
    clearFieldId(): void;
    getFieldId(): string | undefined;
    setFieldId(value: string): DynamicField;

    hasNameType(): boolean;
    clearNameType(): void;
    getNameType(): string | undefined;
    setNameType(value: string): DynamicField;

    hasNameValue(): boolean;
    clearNameValue(): void;
    getNameValue(): Uint8Array | string;
    getNameValue_asU8(): Uint8Array;
    getNameValue_asB64(): string;
    setNameValue(value: Uint8Array | string): DynamicField;

    hasValueType(): boolean;
    clearValueType(): void;
    getValueType(): string | undefined;
    setValueType(value: string): DynamicField;

    hasDynamicObjectId(): boolean;
    clearDynamicObjectId(): void;
    getDynamicObjectId(): string | undefined;
    setDynamicObjectId(value: string): DynamicField;

    hasObject(): boolean;
    clearObject(): void;
    getObject(): sui_rpc_v2beta2_object_pb.Object | undefined;
    setObject(value?: sui_rpc_v2beta2_object_pb.Object): DynamicField;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DynamicField.AsObject;
    static toObject(includeInstance: boolean, msg: DynamicField): DynamicField.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DynamicField, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DynamicField;
    static deserializeBinaryFromReader(message: DynamicField, reader: jspb.BinaryReader): DynamicField;
}

export namespace DynamicField {
    export type AsObject = {
        kind?: DynamicField.DynamicFieldKind,
        parent?: string,
        fieldId?: string,
        nameType?: string,
        nameValue: Uint8Array | string,
        valueType?: string,
        dynamicObjectId?: string,
        object?: sui_rpc_v2beta2_object_pb.Object.AsObject,
    }

    export enum DynamicFieldKind {
    DYNAMIC_FIELD_KIND_UNKNOWN = 0,
    FIELD = 1,
    OBJECT = 2,
    }

}

export class SimulateTransactionRequest extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): sui_rpc_v2beta2_transaction_pb.Transaction | undefined;
    setTransaction(value?: sui_rpc_v2beta2_transaction_pb.Transaction): SimulateTransactionRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): SimulateTransactionRequest;

    hasChecks(): boolean;
    clearChecks(): void;
    getChecks(): SimulateTransactionRequest.TransactionChecks | undefined;
    setChecks(value: SimulateTransactionRequest.TransactionChecks): SimulateTransactionRequest;

    hasDoGasSelection(): boolean;
    clearDoGasSelection(): void;
    getDoGasSelection(): boolean | undefined;
    setDoGasSelection(value: boolean): SimulateTransactionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SimulateTransactionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SimulateTransactionRequest): SimulateTransactionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SimulateTransactionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SimulateTransactionRequest;
    static deserializeBinaryFromReader(message: SimulateTransactionRequest, reader: jspb.BinaryReader): SimulateTransactionRequest;
}

export namespace SimulateTransactionRequest {
    export type AsObject = {
        transaction?: sui_rpc_v2beta2_transaction_pb.Transaction.AsObject,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
        checks?: SimulateTransactionRequest.TransactionChecks,
        doGasSelection?: boolean,
    }

    export enum TransactionChecks {
    ENABLED = 0,
    DISABLED = 1,
    }

}

export class SimulateTransactionResponse extends jspb.Message { 

    hasTransaction(): boolean;
    clearTransaction(): void;
    getTransaction(): sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction | undefined;
    setTransaction(value?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction): SimulateTransactionResponse;
    clearOutputsList(): void;
    getOutputsList(): Array<CommandResult>;
    setOutputsList(value: Array<CommandResult>): SimulateTransactionResponse;
    addOutputs(value?: CommandResult, index?: number): CommandResult;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SimulateTransactionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SimulateTransactionResponse): SimulateTransactionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SimulateTransactionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SimulateTransactionResponse;
    static deserializeBinaryFromReader(message: SimulateTransactionResponse, reader: jspb.BinaryReader): SimulateTransactionResponse;
}

export namespace SimulateTransactionResponse {
    export type AsObject = {
        transaction?: sui_rpc_v2beta2_executed_transaction_pb.ExecutedTransaction.AsObject,
        outputsList: Array<CommandResult.AsObject>,
    }
}

export class CommandResult extends jspb.Message { 
    clearReturnValuesList(): void;
    getReturnValuesList(): Array<CommandOutput>;
    setReturnValuesList(value: Array<CommandOutput>): CommandResult;
    addReturnValues(value?: CommandOutput, index?: number): CommandOutput;
    clearMutatedByRefList(): void;
    getMutatedByRefList(): Array<CommandOutput>;
    setMutatedByRefList(value: Array<CommandOutput>): CommandResult;
    addMutatedByRef(value?: CommandOutput, index?: number): CommandOutput;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommandResult.AsObject;
    static toObject(includeInstance: boolean, msg: CommandResult): CommandResult.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommandResult, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommandResult;
    static deserializeBinaryFromReader(message: CommandResult, reader: jspb.BinaryReader): CommandResult;
}

export namespace CommandResult {
    export type AsObject = {
        returnValuesList: Array<CommandOutput.AsObject>,
        mutatedByRefList: Array<CommandOutput.AsObject>,
    }
}

export class CommandOutput extends jspb.Message { 

    hasArgument(): boolean;
    clearArgument(): void;
    getArgument(): sui_rpc_v2beta2_argument_pb.Argument | undefined;
    setArgument(value?: sui_rpc_v2beta2_argument_pb.Argument): CommandOutput;

    hasValue(): boolean;
    clearValue(): void;
    getValue(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setValue(value?: sui_rpc_v2beta2_bcs_pb.Bcs): CommandOutput;

    hasJson(): boolean;
    clearJson(): void;
    getJson(): google_protobuf_struct_pb.Value | undefined;
    setJson(value?: google_protobuf_struct_pb.Value): CommandOutput;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommandOutput.AsObject;
    static toObject(includeInstance: boolean, msg: CommandOutput): CommandOutput.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommandOutput, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommandOutput;
    static deserializeBinaryFromReader(message: CommandOutput, reader: jspb.BinaryReader): CommandOutput;
}

export namespace CommandOutput {
    export type AsObject = {
        argument?: sui_rpc_v2beta2_argument_pb.Argument.AsObject,
        value?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        json?: google_protobuf_struct_pb.Value.AsObject,
    }
}

export class ListOwnedObjectsRequest extends jspb.Message { 

    hasOwner(): boolean;
    clearOwner(): void;
    getOwner(): string | undefined;
    setOwner(value: string): ListOwnedObjectsRequest;

    hasPageSize(): boolean;
    clearPageSize(): void;
    getPageSize(): number | undefined;
    setPageSize(value: number): ListOwnedObjectsRequest;

    hasPageToken(): boolean;
    clearPageToken(): void;
    getPageToken(): Uint8Array | string;
    getPageToken_asU8(): Uint8Array;
    getPageToken_asB64(): string;
    setPageToken(value: Uint8Array | string): ListOwnedObjectsRequest;

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): ListOwnedObjectsRequest;

    hasObjectType(): boolean;
    clearObjectType(): void;
    getObjectType(): string | undefined;
    setObjectType(value: string): ListOwnedObjectsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListOwnedObjectsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ListOwnedObjectsRequest): ListOwnedObjectsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListOwnedObjectsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListOwnedObjectsRequest;
    static deserializeBinaryFromReader(message: ListOwnedObjectsRequest, reader: jspb.BinaryReader): ListOwnedObjectsRequest;
}

export namespace ListOwnedObjectsRequest {
    export type AsObject = {
        owner?: string,
        pageSize?: number,
        pageToken: Uint8Array | string,
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
        objectType?: string,
    }
}

export class ListOwnedObjectsResponse extends jspb.Message { 
    clearObjectsList(): void;
    getObjectsList(): Array<sui_rpc_v2beta2_object_pb.Object>;
    setObjectsList(value: Array<sui_rpc_v2beta2_object_pb.Object>): ListOwnedObjectsResponse;
    addObjects(value?: sui_rpc_v2beta2_object_pb.Object, index?: number): sui_rpc_v2beta2_object_pb.Object;

    hasNextPageToken(): boolean;
    clearNextPageToken(): void;
    getNextPageToken(): Uint8Array | string;
    getNextPageToken_asU8(): Uint8Array;
    getNextPageToken_asB64(): string;
    setNextPageToken(value: Uint8Array | string): ListOwnedObjectsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ListOwnedObjectsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ListOwnedObjectsResponse): ListOwnedObjectsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ListOwnedObjectsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ListOwnedObjectsResponse;
    static deserializeBinaryFromReader(message: ListOwnedObjectsResponse, reader: jspb.BinaryReader): ListOwnedObjectsResponse;
}

export namespace ListOwnedObjectsResponse {
    export type AsObject = {
        objectsList: Array<sui_rpc_v2beta2_object_pb.Object.AsObject>,
        nextPageToken: Uint8Array | string,
    }
}
