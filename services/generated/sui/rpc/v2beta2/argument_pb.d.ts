// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/argument.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Argument extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): Argument.ArgumentKind | undefined;
    setKind(value: Argument.ArgumentKind): Argument;

    hasInput(): boolean;
    clearInput(): void;
    getInput(): number | undefined;
    setInput(value: number): Argument;

    hasResult(): boolean;
    clearResult(): void;
    getResult(): number | undefined;
    setResult(value: number): Argument;

    hasSubresult(): boolean;
    clearSubresult(): void;
    getSubresult(): number | undefined;
    setSubresult(value: number): Argument;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Argument.AsObject;
    static toObject(includeInstance: boolean, msg: Argument): Argument.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Argument, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Argument;
    static deserializeBinaryFromReader(message: Argument, reader: jspb.BinaryReader): Argument;
}

export namespace Argument {
    export type AsObject = {
        kind?: Argument.ArgumentKind,
        input?: number,
        result?: number,
        subresult?: number,
    }

    export enum ArgumentKind {
    ARGUMENT_KIND_UNKNOWN = 0,
    GAS = 1,
    INPUT = 2,
    RESULT = 3,
    }

}
