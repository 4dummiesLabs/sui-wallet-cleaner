// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/gas_cost_summary.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GasCostSummary extends jspb.Message { 

    hasComputationCost(): boolean;
    clearComputationCost(): void;
    getComputationCost(): number | undefined;
    setComputationCost(value: number): GasCostSummary;

    hasStorageCost(): boolean;
    clearStorageCost(): void;
    getStorageCost(): number | undefined;
    setStorageCost(value: number): GasCostSummary;

    hasStorageRebate(): boolean;
    clearStorageRebate(): void;
    getStorageRebate(): number | undefined;
    setStorageRebate(value: number): GasCostSummary;

    hasNonRefundableStorageFee(): boolean;
    clearNonRefundableStorageFee(): void;
    getNonRefundableStorageFee(): number | undefined;
    setNonRefundableStorageFee(value: number): GasCostSummary;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GasCostSummary.AsObject;
    static toObject(includeInstance: boolean, msg: GasCostSummary): GasCostSummary.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GasCostSummary, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GasCostSummary;
    static deserializeBinaryFromReader(message: GasCostSummary, reader: jspb.BinaryReader): GasCostSummary;
}

export namespace GasCostSummary {
    export type AsObject = {
        computationCost?: number,
        storageCost?: number,
        storageRebate?: number,
        nonRefundableStorageFee?: number,
    }
}
