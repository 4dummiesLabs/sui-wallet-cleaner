// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/balance_change.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class BalanceChange extends jspb.Message { 

    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): string | undefined;
    setAddress(value: string): BalanceChange;

    hasCoinType(): boolean;
    clearCoinType(): void;
    getCoinType(): string | undefined;
    setCoinType(value: string): BalanceChange;

    hasAmount(): boolean;
    clearAmount(): void;
    getAmount(): string | undefined;
    setAmount(value: string): BalanceChange;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BalanceChange.AsObject;
    static toObject(includeInstance: boolean, msg: BalanceChange): BalanceChange.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BalanceChange, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BalanceChange;
    static deserializeBinaryFromReader(message: BalanceChange, reader: jspb.BinaryReader): BalanceChange;
}

export namespace BalanceChange {
    export type AsObject = {
        address?: string,
        coinType?: string,
        amount?: string,
    }
}
