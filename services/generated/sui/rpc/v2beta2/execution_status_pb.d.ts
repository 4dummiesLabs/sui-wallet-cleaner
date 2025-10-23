// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/execution_status.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ExecutionStatus extends jspb.Message { 

    hasSuccess(): boolean;
    clearSuccess(): void;
    getSuccess(): boolean | undefined;
    setSuccess(value: boolean): ExecutionStatus;

    hasError(): boolean;
    clearError(): void;
    getError(): ExecutionError | undefined;
    setError(value?: ExecutionError): ExecutionStatus;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutionStatus.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutionStatus): ExecutionStatus.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutionStatus, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutionStatus;
    static deserializeBinaryFromReader(message: ExecutionStatus, reader: jspb.BinaryReader): ExecutionStatus;
}

export namespace ExecutionStatus {
    export type AsObject = {
        success?: boolean,
        error?: ExecutionError.AsObject,
    }
}

export class ExecutionError extends jspb.Message { 

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): string | undefined;
    setDescription(value: string): ExecutionError;

    hasCommand(): boolean;
    clearCommand(): void;
    getCommand(): number | undefined;
    setCommand(value: number): ExecutionError;

    hasKind(): boolean;
    clearKind(): void;
    getKind(): ExecutionError.ExecutionErrorKind | undefined;
    setKind(value: ExecutionError.ExecutionErrorKind): ExecutionError;

    hasAbort(): boolean;
    clearAbort(): void;
    getAbort(): MoveAbort | undefined;
    setAbort(value?: MoveAbort): ExecutionError;

    hasSizeError(): boolean;
    clearSizeError(): void;
    getSizeError(): SizeError | undefined;
    setSizeError(value?: SizeError): ExecutionError;

    hasCommandArgumentError(): boolean;
    clearCommandArgumentError(): void;
    getCommandArgumentError(): CommandArgumentError | undefined;
    setCommandArgumentError(value?: CommandArgumentError): ExecutionError;

    hasTypeArgumentError(): boolean;
    clearTypeArgumentError(): void;
    getTypeArgumentError(): TypeArgumentError | undefined;
    setTypeArgumentError(value?: TypeArgumentError): ExecutionError;

    hasPackageUpgradeError(): boolean;
    clearPackageUpgradeError(): void;
    getPackageUpgradeError(): PackageUpgradeError | undefined;
    setPackageUpgradeError(value?: PackageUpgradeError): ExecutionError;

    hasIndexError(): boolean;
    clearIndexError(): void;
    getIndexError(): IndexError | undefined;
    setIndexError(value?: IndexError): ExecutionError;

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string;
    setObjectId(value: string): ExecutionError;

    hasCoinDenyListError(): boolean;
    clearCoinDenyListError(): void;
    getCoinDenyListError(): CoinDenyListError | undefined;
    setCoinDenyListError(value?: CoinDenyListError): ExecutionError;

    hasCongestedObjects(): boolean;
    clearCongestedObjects(): void;
    getCongestedObjects(): CongestedObjects | undefined;
    setCongestedObjects(value?: CongestedObjects): ExecutionError;

    getErrorDetailsCase(): ExecutionError.ErrorDetailsCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutionError.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutionError): ExecutionError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutionError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutionError;
    static deserializeBinaryFromReader(message: ExecutionError, reader: jspb.BinaryReader): ExecutionError;
}

export namespace ExecutionError {
    export type AsObject = {
        description?: string,
        command?: number,
        kind?: ExecutionError.ExecutionErrorKind,
        abort?: MoveAbort.AsObject,
        sizeError?: SizeError.AsObject,
        commandArgumentError?: CommandArgumentError.AsObject,
        typeArgumentError?: TypeArgumentError.AsObject,
        packageUpgradeError?: PackageUpgradeError.AsObject,
        indexError?: IndexError.AsObject,
        objectId: string,
        coinDenyListError?: CoinDenyListError.AsObject,
        congestedObjects?: CongestedObjects.AsObject,
    }

    export enum ExecutionErrorKind {
    EXECUTION_ERROR_KIND_UNKNOWN = 0,
    INSUFFICIENT_GAS = 1,
    INVALID_GAS_OBJECT = 2,
    INVARIANT_VIOLATION = 3,
    FEATURE_NOT_YET_SUPPORTED = 4,
    OBJECT_TOO_BIG = 5,
    PACKAGE_TOO_BIG = 6,
    CIRCULAR_OBJECT_OWNERSHIP = 7,
    INSUFFICIENT_COIN_BALANCE = 8,
    COIN_BALANCE_OVERFLOW = 9,
    PUBLISH_ERROR_NON_ZERO_ADDRESS = 10,
    SUI_MOVE_VERIFICATION_ERROR = 11,
    MOVE_PRIMITIVE_RUNTIME_ERROR = 12,
    MOVE_ABORT = 13,
    VM_VERIFICATION_OR_DESERIALIZATION_ERROR = 14,
    VM_INVARIANT_VIOLATION = 15,
    FUNCTION_NOT_FOUND = 16,
    ARITY_MISMATCH = 17,
    TYPE_ARITY_MISMATCH = 18,
    NON_ENTRY_FUNCTION_INVOKED = 19,
    COMMAND_ARGUMENT_ERROR = 20,
    TYPE_ARGUMENT_ERROR = 21,
    UNUSED_VALUE_WITHOUT_DROP = 22,
    INVALID_PUBLIC_FUNCTION_RETURN_TYPE = 23,
    INVALID_TRANSFER_OBJECT = 24,
    EFFECTS_TOO_LARGE = 25,
    PUBLISH_UPGRADE_MISSING_DEPENDENCY = 26,
    PUBLISH_UPGRADE_DEPENDENCY_DOWNGRADE = 27,
    PACKAGE_UPGRADE_ERROR = 28,
    WRITTEN_OBJECTS_TOO_LARGE = 29,
    CERTIFICATE_DENIED = 30,
    SUI_MOVE_VERIFICATION_TIMEDOUT = 31,
    CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 32,
    INPUT_OBJECT_DELETED = 33,
    EXECUTION_CANCELED_DUE_TO_CONSENSUS_OBJECT_CONGESTION = 34,
    ADDRESS_DENIED_FOR_COIN = 35,
    COIN_TYPE_GLOBAL_PAUSE = 36,
    EXECUTION_CANCELED_DUE_TO_RANDOMNESS_UNAVAILABLE = 37,
    MOVE_VECTOR_ELEM_TOO_BIG = 38,
    MOVE_RAW_VALUE_TOO_BIG = 39,
    INVALID_LINKAGE = 40,
    }


    export enum ErrorDetailsCase {
        ERROR_DETAILS_NOT_SET = 0,
        ABORT = 4,
        SIZE_ERROR = 5,
        COMMAND_ARGUMENT_ERROR = 6,
        TYPE_ARGUMENT_ERROR = 7,
        PACKAGE_UPGRADE_ERROR = 8,
        INDEX_ERROR = 9,
        OBJECT_ID = 10,
        COIN_DENY_LIST_ERROR = 11,
        CONGESTED_OBJECTS = 12,
    }

}

export class MoveAbort extends jspb.Message { 

    hasAbortCode(): boolean;
    clearAbortCode(): void;
    getAbortCode(): number | undefined;
    setAbortCode(value: number): MoveAbort;

    hasLocation(): boolean;
    clearLocation(): void;
    getLocation(): MoveLocation | undefined;
    setLocation(value?: MoveLocation): MoveAbort;

    hasCleverError(): boolean;
    clearCleverError(): void;
    getCleverError(): CleverError | undefined;
    setCleverError(value?: CleverError): MoveAbort;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoveAbort.AsObject;
    static toObject(includeInstance: boolean, msg: MoveAbort): MoveAbort.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoveAbort, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoveAbort;
    static deserializeBinaryFromReader(message: MoveAbort, reader: jspb.BinaryReader): MoveAbort;
}

export namespace MoveAbort {
    export type AsObject = {
        abortCode?: number,
        location?: MoveLocation.AsObject,
        cleverError?: CleverError.AsObject,
    }
}

export class MoveLocation extends jspb.Message { 

    hasPackage(): boolean;
    clearPackage(): void;
    getPackage(): string | undefined;
    setPackage(value: string): MoveLocation;

    hasModule(): boolean;
    clearModule(): void;
    getModule(): string | undefined;
    setModule(value: string): MoveLocation;

    hasFunction(): boolean;
    clearFunction(): void;
    getFunction(): number | undefined;
    setFunction(value: number): MoveLocation;

    hasInstruction(): boolean;
    clearInstruction(): void;
    getInstruction(): number | undefined;
    setInstruction(value: number): MoveLocation;

    hasFunctionName(): boolean;
    clearFunctionName(): void;
    getFunctionName(): string | undefined;
    setFunctionName(value: string): MoveLocation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoveLocation.AsObject;
    static toObject(includeInstance: boolean, msg: MoveLocation): MoveLocation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoveLocation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoveLocation;
    static deserializeBinaryFromReader(message: MoveLocation, reader: jspb.BinaryReader): MoveLocation;
}

export namespace MoveLocation {
    export type AsObject = {
        pb_package?: string,
        module?: string,
        pb_function?: number,
        instruction?: number,
        functionName?: string,
    }
}

export class CleverError extends jspb.Message { 

    hasErrorCode(): boolean;
    clearErrorCode(): void;
    getErrorCode(): number | undefined;
    setErrorCode(value: number): CleverError;

    hasLineNumber(): boolean;
    clearLineNumber(): void;
    getLineNumber(): number | undefined;
    setLineNumber(value: number): CleverError;

    hasConstantName(): boolean;
    clearConstantName(): void;
    getConstantName(): string | undefined;
    setConstantName(value: string): CleverError;

    hasConstantType(): boolean;
    clearConstantType(): void;
    getConstantType(): string | undefined;
    setConstantType(value: string): CleverError;

    hasRendered(): boolean;
    clearRendered(): void;
    getRendered(): string;
    setRendered(value: string): CleverError;

    hasRaw(): boolean;
    clearRaw(): void;
    getRaw(): Uint8Array | string;
    getRaw_asU8(): Uint8Array;
    getRaw_asB64(): string;
    setRaw(value: Uint8Array | string): CleverError;

    getValueCase(): CleverError.ValueCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CleverError.AsObject;
    static toObject(includeInstance: boolean, msg: CleverError): CleverError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CleverError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CleverError;
    static deserializeBinaryFromReader(message: CleverError, reader: jspb.BinaryReader): CleverError;
}

export namespace CleverError {
    export type AsObject = {
        errorCode?: number,
        lineNumber?: number,
        constantName?: string,
        constantType?: string,
        rendered: string,
        raw: Uint8Array | string,
    }

    export enum ValueCase {
        VALUE_NOT_SET = 0,
        RENDERED = 5,
        RAW = 6,
    }

}

export class SizeError extends jspb.Message { 

    hasSize(): boolean;
    clearSize(): void;
    getSize(): number | undefined;
    setSize(value: number): SizeError;

    hasMaxSize(): boolean;
    clearMaxSize(): void;
    getMaxSize(): number | undefined;
    setMaxSize(value: number): SizeError;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SizeError.AsObject;
    static toObject(includeInstance: boolean, msg: SizeError): SizeError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SizeError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SizeError;
    static deserializeBinaryFromReader(message: SizeError, reader: jspb.BinaryReader): SizeError;
}

export namespace SizeError {
    export type AsObject = {
        size?: number,
        maxSize?: number,
    }
}

export class IndexError extends jspb.Message { 

    hasIndex(): boolean;
    clearIndex(): void;
    getIndex(): number | undefined;
    setIndex(value: number): IndexError;

    hasSubresult(): boolean;
    clearSubresult(): void;
    getSubresult(): number | undefined;
    setSubresult(value: number): IndexError;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): IndexError.AsObject;
    static toObject(includeInstance: boolean, msg: IndexError): IndexError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: IndexError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): IndexError;
    static deserializeBinaryFromReader(message: IndexError, reader: jspb.BinaryReader): IndexError;
}

export namespace IndexError {
    export type AsObject = {
        index?: number,
        subresult?: number,
    }
}

export class CoinDenyListError extends jspb.Message { 

    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): string | undefined;
    setAddress(value: string): CoinDenyListError;

    hasCoinType(): boolean;
    clearCoinType(): void;
    getCoinType(): string | undefined;
    setCoinType(value: string): CoinDenyListError;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CoinDenyListError.AsObject;
    static toObject(includeInstance: boolean, msg: CoinDenyListError): CoinDenyListError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CoinDenyListError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CoinDenyListError;
    static deserializeBinaryFromReader(message: CoinDenyListError, reader: jspb.BinaryReader): CoinDenyListError;
}

export namespace CoinDenyListError {
    export type AsObject = {
        address?: string,
        coinType?: string,
    }
}

export class CongestedObjects extends jspb.Message { 
    clearObjectsList(): void;
    getObjectsList(): Array<string>;
    setObjectsList(value: Array<string>): CongestedObjects;
    addObjects(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CongestedObjects.AsObject;
    static toObject(includeInstance: boolean, msg: CongestedObjects): CongestedObjects.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CongestedObjects, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CongestedObjects;
    static deserializeBinaryFromReader(message: CongestedObjects, reader: jspb.BinaryReader): CongestedObjects;
}

export namespace CongestedObjects {
    export type AsObject = {
        objectsList: Array<string>,
    }
}

export class CommandArgumentError extends jspb.Message { 

    hasArgument(): boolean;
    clearArgument(): void;
    getArgument(): number | undefined;
    setArgument(value: number): CommandArgumentError;

    hasKind(): boolean;
    clearKind(): void;
    getKind(): CommandArgumentError.CommandArgumentErrorKind | undefined;
    setKind(value: CommandArgumentError.CommandArgumentErrorKind): CommandArgumentError;

    hasIndexError(): boolean;
    clearIndexError(): void;
    getIndexError(): IndexError | undefined;
    setIndexError(value?: IndexError): CommandArgumentError;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommandArgumentError.AsObject;
    static toObject(includeInstance: boolean, msg: CommandArgumentError): CommandArgumentError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CommandArgumentError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CommandArgumentError;
    static deserializeBinaryFromReader(message: CommandArgumentError, reader: jspb.BinaryReader): CommandArgumentError;
}

export namespace CommandArgumentError {
    export type AsObject = {
        argument?: number,
        kind?: CommandArgumentError.CommandArgumentErrorKind,
        indexError?: IndexError.AsObject,
    }

    export enum CommandArgumentErrorKind {
    COMMAND_ARGUMENT_ERROR_KIND_UNKNOWN = 0,
    TYPE_MISMATCH = 1,
    INVALID_BCS_BYTES = 2,
    INVALID_USAGE_OF_PURE_ARGUMENT = 3,
    INVALID_ARGUMENT_TO_PRIVATE_ENTRY_FUNCTION = 4,
    INDEX_OUT_OF_BOUNDS = 5,
    SECONDARY_INDEX_OUT_OF_BOUNDS = 6,
    INVALID_RESULT_ARITY = 7,
    INVALID_GAS_COIN_USAGE = 8,
    INVALID_VALUE_USAGE = 9,
    INVALID_OBJECT_BY_VALUE = 10,
    INVALID_OBJECT_BY_MUT_REF = 11,
    CONSENSUS_OBJECT_OPERATION_NOT_ALLOWED = 12,
    INVALID_ARGUMENT_ARITY = 13,
    }

}

export class PackageUpgradeError extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): PackageUpgradeError.PackageUpgradeErrorKind | undefined;
    setKind(value: PackageUpgradeError.PackageUpgradeErrorKind): PackageUpgradeError;

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): PackageUpgradeError;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): PackageUpgradeError;

    hasPolicy(): boolean;
    clearPolicy(): void;
    getPolicy(): number | undefined;
    setPolicy(value: number): PackageUpgradeError;

    hasTicketId(): boolean;
    clearTicketId(): void;
    getTicketId(): string | undefined;
    setTicketId(value: string): PackageUpgradeError;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PackageUpgradeError.AsObject;
    static toObject(includeInstance: boolean, msg: PackageUpgradeError): PackageUpgradeError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PackageUpgradeError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PackageUpgradeError;
    static deserializeBinaryFromReader(message: PackageUpgradeError, reader: jspb.BinaryReader): PackageUpgradeError;
}

export namespace PackageUpgradeError {
    export type AsObject = {
        kind?: PackageUpgradeError.PackageUpgradeErrorKind,
        packageId?: string,
        digest?: string,
        policy?: number,
        ticketId?: string,
    }

    export enum PackageUpgradeErrorKind {
    PACKAGE_UPGRADE_ERROR_KIND_UNKNOWN = 0,
    UNABLE_TO_FETCH_PACKAGE = 1,
    NOT_A_PACKAGE = 2,
    INCOMPATIBLE_UPGRADE = 3,
    DIGEST_DOES_NOT_MATCH = 4,
    UNKNOWN_UPGRADE_POLICY = 5,
    PACKAGE_ID_DOES_NOT_MATCH = 6,
    }

}

export class TypeArgumentError extends jspb.Message { 

    hasTypeArgument(): boolean;
    clearTypeArgument(): void;
    getTypeArgument(): number | undefined;
    setTypeArgument(value: number): TypeArgumentError;

    hasKind(): boolean;
    clearKind(): void;
    getKind(): TypeArgumentError.TypeArgumentErrorKind | undefined;
    setKind(value: TypeArgumentError.TypeArgumentErrorKind): TypeArgumentError;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TypeArgumentError.AsObject;
    static toObject(includeInstance: boolean, msg: TypeArgumentError): TypeArgumentError.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TypeArgumentError, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TypeArgumentError;
    static deserializeBinaryFromReader(message: TypeArgumentError, reader: jspb.BinaryReader): TypeArgumentError;
}

export namespace TypeArgumentError {
    export type AsObject = {
        typeArgument?: number,
        kind?: TypeArgumentError.TypeArgumentErrorKind,
    }

    export enum TypeArgumentErrorKind {
    TYPE_ARGUMENT_ERROR_KIND_UNKNOWN = 0,
    TYPE_NOT_FOUND = 1,
    CONSTRAINT_NOT_SATISFIED = 2,
    }

}
