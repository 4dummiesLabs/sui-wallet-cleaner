// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/transaction.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_duration_pb from "google-protobuf/google/protobuf/duration_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as sui_rpc_v2beta2_argument_pb from "../../../sui/rpc/v2beta2/argument_pb";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_input_pb from "../../../sui/rpc/v2beta2/input_pb";
import * as sui_rpc_v2beta2_object_pb from "../../../sui/rpc/v2beta2/object_pb";
import * as sui_rpc_v2beta2_object_reference_pb from "../../../sui/rpc/v2beta2/object_reference_pb";

export class Transaction extends jspb.Message { 

    hasBcs(): boolean;
    clearBcs(): void;
    getBcs(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setBcs(value?: sui_rpc_v2beta2_bcs_pb.Bcs): Transaction;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): Transaction;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): Transaction;

    hasKind(): boolean;
    clearKind(): void;
    getKind(): TransactionKind | undefined;
    setKind(value?: TransactionKind): Transaction;

    hasSender(): boolean;
    clearSender(): void;
    getSender(): string | undefined;
    setSender(value: string): Transaction;

    hasGasPayment(): boolean;
    clearGasPayment(): void;
    getGasPayment(): GasPayment | undefined;
    setGasPayment(value?: GasPayment): Transaction;

    hasExpiration(): boolean;
    clearExpiration(): void;
    getExpiration(): TransactionExpiration | undefined;
    setExpiration(value?: TransactionExpiration): Transaction;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Transaction.AsObject;
    static toObject(includeInstance: boolean, msg: Transaction): Transaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Transaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Transaction;
    static deserializeBinaryFromReader(message: Transaction, reader: jspb.BinaryReader): Transaction;
}

export namespace Transaction {
    export type AsObject = {
        bcs?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        digest?: string,
        version?: number,
        kind?: TransactionKind.AsObject,
        sender?: string,
        gasPayment?: GasPayment.AsObject,
        expiration?: TransactionExpiration.AsObject,
    }
}

export class GasPayment extends jspb.Message { 
    clearObjectsList(): void;
    getObjectsList(): Array<sui_rpc_v2beta2_object_reference_pb.ObjectReference>;
    setObjectsList(value: Array<sui_rpc_v2beta2_object_reference_pb.ObjectReference>): GasPayment;
    addObjects(value?: sui_rpc_v2beta2_object_reference_pb.ObjectReference, index?: number): sui_rpc_v2beta2_object_reference_pb.ObjectReference;

    hasOwner(): boolean;
    clearOwner(): void;
    getOwner(): string | undefined;
    setOwner(value: string): GasPayment;

    hasPrice(): boolean;
    clearPrice(): void;
    getPrice(): number | undefined;
    setPrice(value: number): GasPayment;

    hasBudget(): boolean;
    clearBudget(): void;
    getBudget(): number | undefined;
    setBudget(value: number): GasPayment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GasPayment.AsObject;
    static toObject(includeInstance: boolean, msg: GasPayment): GasPayment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GasPayment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GasPayment;
    static deserializeBinaryFromReader(message: GasPayment, reader: jspb.BinaryReader): GasPayment;
}

export namespace GasPayment {
    export type AsObject = {
        objectsList: Array<sui_rpc_v2beta2_object_reference_pb.ObjectReference.AsObject>,
        owner?: string,
        price?: number,
        budget?: number,
    }
}

export class TransactionExpiration extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): TransactionExpiration.TransactionExpirationKind | undefined;
    setKind(value: TransactionExpiration.TransactionExpirationKind): TransactionExpiration;

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): TransactionExpiration;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionExpiration.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionExpiration): TransactionExpiration.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionExpiration, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionExpiration;
    static deserializeBinaryFromReader(message: TransactionExpiration, reader: jspb.BinaryReader): TransactionExpiration;
}

export namespace TransactionExpiration {
    export type AsObject = {
        kind?: TransactionExpiration.TransactionExpirationKind,
        epoch?: number,
    }

    export enum TransactionExpirationKind {
    TRANSACTION_EXPIRATION_KIND_UNKNOWN = 0,
    NONE = 1,
    EPOCH = 2,
    }

}

export class TransactionKind extends jspb.Message { 

    hasProgrammableTransaction(): boolean;
    clearProgrammableTransaction(): void;
    getProgrammableTransaction(): ProgrammableTransaction | undefined;
    setProgrammableTransaction(value?: ProgrammableTransaction): TransactionKind;

    hasProgrammableSystemTransaction(): boolean;
    clearProgrammableSystemTransaction(): void;
    getProgrammableSystemTransaction(): ProgrammableTransaction | undefined;
    setProgrammableSystemTransaction(value?: ProgrammableTransaction): TransactionKind;

    hasChangeEpoch(): boolean;
    clearChangeEpoch(): void;
    getChangeEpoch(): ChangeEpoch | undefined;
    setChangeEpoch(value?: ChangeEpoch): TransactionKind;

    hasGenesis(): boolean;
    clearGenesis(): void;
    getGenesis(): GenesisTransaction | undefined;
    setGenesis(value?: GenesisTransaction): TransactionKind;

    hasConsensusCommitPrologueV1(): boolean;
    clearConsensusCommitPrologueV1(): void;
    getConsensusCommitPrologueV1(): ConsensusCommitPrologue | undefined;
    setConsensusCommitPrologueV1(value?: ConsensusCommitPrologue): TransactionKind;

    hasAuthenticatorStateUpdate(): boolean;
    clearAuthenticatorStateUpdate(): void;
    getAuthenticatorStateUpdate(): AuthenticatorStateUpdate | undefined;
    setAuthenticatorStateUpdate(value?: AuthenticatorStateUpdate): TransactionKind;

    hasEndOfEpoch(): boolean;
    clearEndOfEpoch(): void;
    getEndOfEpoch(): EndOfEpochTransaction | undefined;
    setEndOfEpoch(value?: EndOfEpochTransaction): TransactionKind;

    hasRandomnessStateUpdate(): boolean;
    clearRandomnessStateUpdate(): void;
    getRandomnessStateUpdate(): RandomnessStateUpdate | undefined;
    setRandomnessStateUpdate(value?: RandomnessStateUpdate): TransactionKind;

    hasConsensusCommitPrologueV2(): boolean;
    clearConsensusCommitPrologueV2(): void;
    getConsensusCommitPrologueV2(): ConsensusCommitPrologue | undefined;
    setConsensusCommitPrologueV2(value?: ConsensusCommitPrologue): TransactionKind;

    hasConsensusCommitPrologueV3(): boolean;
    clearConsensusCommitPrologueV3(): void;
    getConsensusCommitPrologueV3(): ConsensusCommitPrologue | undefined;
    setConsensusCommitPrologueV3(value?: ConsensusCommitPrologue): TransactionKind;

    hasConsensusCommitPrologueV4(): boolean;
    clearConsensusCommitPrologueV4(): void;
    getConsensusCommitPrologueV4(): ConsensusCommitPrologue | undefined;
    setConsensusCommitPrologueV4(value?: ConsensusCommitPrologue): TransactionKind;

    getKindCase(): TransactionKind.KindCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionKind.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionKind): TransactionKind.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionKind, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionKind;
    static deserializeBinaryFromReader(message: TransactionKind, reader: jspb.BinaryReader): TransactionKind;
}

export namespace TransactionKind {
    export type AsObject = {
        programmableTransaction?: ProgrammableTransaction.AsObject,
        programmableSystemTransaction?: ProgrammableTransaction.AsObject,
        changeEpoch?: ChangeEpoch.AsObject,
        genesis?: GenesisTransaction.AsObject,
        consensusCommitPrologueV1?: ConsensusCommitPrologue.AsObject,
        authenticatorStateUpdate?: AuthenticatorStateUpdate.AsObject,
        endOfEpoch?: EndOfEpochTransaction.AsObject,
        randomnessStateUpdate?: RandomnessStateUpdate.AsObject,
        consensusCommitPrologueV2?: ConsensusCommitPrologue.AsObject,
        consensusCommitPrologueV3?: ConsensusCommitPrologue.AsObject,
        consensusCommitPrologueV4?: ConsensusCommitPrologue.AsObject,
    }

    export enum KindCase {
        KIND_NOT_SET = 0,
        PROGRAMMABLE_TRANSACTION = 2,
        PROGRAMMABLE_SYSTEM_TRANSACTION = 3,
        CHANGE_EPOCH = 100,
        GENESIS = 101,
        CONSENSUS_COMMIT_PROLOGUE_V1 = 102,
        AUTHENTICATOR_STATE_UPDATE = 103,
        END_OF_EPOCH = 104,
        RANDOMNESS_STATE_UPDATE = 105,
        CONSENSUS_COMMIT_PROLOGUE_V2 = 106,
        CONSENSUS_COMMIT_PROLOGUE_V3 = 107,
        CONSENSUS_COMMIT_PROLOGUE_V4 = 108,
    }

}

export class ProgrammableTransaction extends jspb.Message { 
    clearInputsList(): void;
    getInputsList(): Array<sui_rpc_v2beta2_input_pb.Input>;
    setInputsList(value: Array<sui_rpc_v2beta2_input_pb.Input>): ProgrammableTransaction;
    addInputs(value?: sui_rpc_v2beta2_input_pb.Input, index?: number): sui_rpc_v2beta2_input_pb.Input;
    clearCommandsList(): void;
    getCommandsList(): Array<Command>;
    setCommandsList(value: Array<Command>): ProgrammableTransaction;
    addCommands(value?: Command, index?: number): Command;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProgrammableTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: ProgrammableTransaction): ProgrammableTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProgrammableTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProgrammableTransaction;
    static deserializeBinaryFromReader(message: ProgrammableTransaction, reader: jspb.BinaryReader): ProgrammableTransaction;
}

export namespace ProgrammableTransaction {
    export type AsObject = {
        inputsList: Array<sui_rpc_v2beta2_input_pb.Input.AsObject>,
        commandsList: Array<Command.AsObject>,
    }
}

export class Command extends jspb.Message { 

    hasMoveCall(): boolean;
    clearMoveCall(): void;
    getMoveCall(): MoveCall | undefined;
    setMoveCall(value?: MoveCall): Command;

    hasTransferObjects(): boolean;
    clearTransferObjects(): void;
    getTransferObjects(): TransferObjects | undefined;
    setTransferObjects(value?: TransferObjects): Command;

    hasSplitCoins(): boolean;
    clearSplitCoins(): void;
    getSplitCoins(): SplitCoins | undefined;
    setSplitCoins(value?: SplitCoins): Command;

    hasMergeCoins(): boolean;
    clearMergeCoins(): void;
    getMergeCoins(): MergeCoins | undefined;
    setMergeCoins(value?: MergeCoins): Command;

    hasPublish(): boolean;
    clearPublish(): void;
    getPublish(): Publish | undefined;
    setPublish(value?: Publish): Command;

    hasMakeMoveVector(): boolean;
    clearMakeMoveVector(): void;
    getMakeMoveVector(): MakeMoveVector | undefined;
    setMakeMoveVector(value?: MakeMoveVector): Command;

    hasUpgrade(): boolean;
    clearUpgrade(): void;
    getUpgrade(): Upgrade | undefined;
    setUpgrade(value?: Upgrade): Command;

    getCommandCase(): Command.CommandCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Command.AsObject;
    static toObject(includeInstance: boolean, msg: Command): Command.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Command, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Command;
    static deserializeBinaryFromReader(message: Command, reader: jspb.BinaryReader): Command;
}

export namespace Command {
    export type AsObject = {
        moveCall?: MoveCall.AsObject,
        transferObjects?: TransferObjects.AsObject,
        splitCoins?: SplitCoins.AsObject,
        mergeCoins?: MergeCoins.AsObject,
        publish?: Publish.AsObject,
        makeMoveVector?: MakeMoveVector.AsObject,
        upgrade?: Upgrade.AsObject,
    }

    export enum CommandCase {
        COMMAND_NOT_SET = 0,
        MOVE_CALL = 1,
        TRANSFER_OBJECTS = 2,
        SPLIT_COINS = 3,
        MERGE_COINS = 4,
        PUBLISH = 5,
        MAKE_MOVE_VECTOR = 6,
        UPGRADE = 7,
    }

}

export class MoveCall extends jspb.Message { 

    hasPackage(): boolean;
    clearPackage(): void;
    getPackage(): string | undefined;
    setPackage(value: string): MoveCall;

    hasModule(): boolean;
    clearModule(): void;
    getModule(): string | undefined;
    setModule(value: string): MoveCall;

    hasFunction(): boolean;
    clearFunction(): void;
    getFunction(): string | undefined;
    setFunction(value: string): MoveCall;
    clearTypeArgumentsList(): void;
    getTypeArgumentsList(): Array<string>;
    setTypeArgumentsList(value: Array<string>): MoveCall;
    addTypeArguments(value: string, index?: number): string;
    clearArgumentsList(): void;
    getArgumentsList(): Array<sui_rpc_v2beta2_argument_pb.Argument>;
    setArgumentsList(value: Array<sui_rpc_v2beta2_argument_pb.Argument>): MoveCall;
    addArguments(value?: sui_rpc_v2beta2_argument_pb.Argument, index?: number): sui_rpc_v2beta2_argument_pb.Argument;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoveCall.AsObject;
    static toObject(includeInstance: boolean, msg: MoveCall): MoveCall.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoveCall, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoveCall;
    static deserializeBinaryFromReader(message: MoveCall, reader: jspb.BinaryReader): MoveCall;
}

export namespace MoveCall {
    export type AsObject = {
        pb_package?: string,
        module?: string,
        pb_function?: string,
        typeArgumentsList: Array<string>,
        argumentsList: Array<sui_rpc_v2beta2_argument_pb.Argument.AsObject>,
    }
}

export class TransferObjects extends jspb.Message { 
    clearObjectsList(): void;
    getObjectsList(): Array<sui_rpc_v2beta2_argument_pb.Argument>;
    setObjectsList(value: Array<sui_rpc_v2beta2_argument_pb.Argument>): TransferObjects;
    addObjects(value?: sui_rpc_v2beta2_argument_pb.Argument, index?: number): sui_rpc_v2beta2_argument_pb.Argument;

    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): sui_rpc_v2beta2_argument_pb.Argument | undefined;
    setAddress(value?: sui_rpc_v2beta2_argument_pb.Argument): TransferObjects;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransferObjects.AsObject;
    static toObject(includeInstance: boolean, msg: TransferObjects): TransferObjects.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransferObjects, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransferObjects;
    static deserializeBinaryFromReader(message: TransferObjects, reader: jspb.BinaryReader): TransferObjects;
}

export namespace TransferObjects {
    export type AsObject = {
        objectsList: Array<sui_rpc_v2beta2_argument_pb.Argument.AsObject>,
        address?: sui_rpc_v2beta2_argument_pb.Argument.AsObject,
    }
}

export class SplitCoins extends jspb.Message { 

    hasCoin(): boolean;
    clearCoin(): void;
    getCoin(): sui_rpc_v2beta2_argument_pb.Argument | undefined;
    setCoin(value?: sui_rpc_v2beta2_argument_pb.Argument): SplitCoins;
    clearAmountsList(): void;
    getAmountsList(): Array<sui_rpc_v2beta2_argument_pb.Argument>;
    setAmountsList(value: Array<sui_rpc_v2beta2_argument_pb.Argument>): SplitCoins;
    addAmounts(value?: sui_rpc_v2beta2_argument_pb.Argument, index?: number): sui_rpc_v2beta2_argument_pb.Argument;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SplitCoins.AsObject;
    static toObject(includeInstance: boolean, msg: SplitCoins): SplitCoins.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SplitCoins, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SplitCoins;
    static deserializeBinaryFromReader(message: SplitCoins, reader: jspb.BinaryReader): SplitCoins;
}

export namespace SplitCoins {
    export type AsObject = {
        coin?: sui_rpc_v2beta2_argument_pb.Argument.AsObject,
        amountsList: Array<sui_rpc_v2beta2_argument_pb.Argument.AsObject>,
    }
}

export class MergeCoins extends jspb.Message { 

    hasCoin(): boolean;
    clearCoin(): void;
    getCoin(): sui_rpc_v2beta2_argument_pb.Argument | undefined;
    setCoin(value?: sui_rpc_v2beta2_argument_pb.Argument): MergeCoins;
    clearCoinsToMergeList(): void;
    getCoinsToMergeList(): Array<sui_rpc_v2beta2_argument_pb.Argument>;
    setCoinsToMergeList(value: Array<sui_rpc_v2beta2_argument_pb.Argument>): MergeCoins;
    addCoinsToMerge(value?: sui_rpc_v2beta2_argument_pb.Argument, index?: number): sui_rpc_v2beta2_argument_pb.Argument;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MergeCoins.AsObject;
    static toObject(includeInstance: boolean, msg: MergeCoins): MergeCoins.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MergeCoins, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MergeCoins;
    static deserializeBinaryFromReader(message: MergeCoins, reader: jspb.BinaryReader): MergeCoins;
}

export namespace MergeCoins {
    export type AsObject = {
        coin?: sui_rpc_v2beta2_argument_pb.Argument.AsObject,
        coinsToMergeList: Array<sui_rpc_v2beta2_argument_pb.Argument.AsObject>,
    }
}

export class Publish extends jspb.Message { 
    clearModulesList(): void;
    getModulesList(): Array<Uint8Array | string>;
    getModulesList_asU8(): Array<Uint8Array>;
    getModulesList_asB64(): Array<string>;
    setModulesList(value: Array<Uint8Array | string>): Publish;
    addModules(value: Uint8Array | string, index?: number): Uint8Array | string;
    clearDependenciesList(): void;
    getDependenciesList(): Array<string>;
    setDependenciesList(value: Array<string>): Publish;
    addDependencies(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Publish.AsObject;
    static toObject(includeInstance: boolean, msg: Publish): Publish.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Publish, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Publish;
    static deserializeBinaryFromReader(message: Publish, reader: jspb.BinaryReader): Publish;
}

export namespace Publish {
    export type AsObject = {
        modulesList: Array<Uint8Array | string>,
        dependenciesList: Array<string>,
    }
}

export class MakeMoveVector extends jspb.Message { 

    hasElementType(): boolean;
    clearElementType(): void;
    getElementType(): string | undefined;
    setElementType(value: string): MakeMoveVector;
    clearElementsList(): void;
    getElementsList(): Array<sui_rpc_v2beta2_argument_pb.Argument>;
    setElementsList(value: Array<sui_rpc_v2beta2_argument_pb.Argument>): MakeMoveVector;
    addElements(value?: sui_rpc_v2beta2_argument_pb.Argument, index?: number): sui_rpc_v2beta2_argument_pb.Argument;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MakeMoveVector.AsObject;
    static toObject(includeInstance: boolean, msg: MakeMoveVector): MakeMoveVector.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MakeMoveVector, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MakeMoveVector;
    static deserializeBinaryFromReader(message: MakeMoveVector, reader: jspb.BinaryReader): MakeMoveVector;
}

export namespace MakeMoveVector {
    export type AsObject = {
        elementType?: string,
        elementsList: Array<sui_rpc_v2beta2_argument_pb.Argument.AsObject>,
    }
}

export class Upgrade extends jspb.Message { 
    clearModulesList(): void;
    getModulesList(): Array<Uint8Array | string>;
    getModulesList_asU8(): Array<Uint8Array>;
    getModulesList_asB64(): Array<string>;
    setModulesList(value: Array<Uint8Array | string>): Upgrade;
    addModules(value: Uint8Array | string, index?: number): Uint8Array | string;
    clearDependenciesList(): void;
    getDependenciesList(): Array<string>;
    setDependenciesList(value: Array<string>): Upgrade;
    addDependencies(value: string, index?: number): string;

    hasPackage(): boolean;
    clearPackage(): void;
    getPackage(): string | undefined;
    setPackage(value: string): Upgrade;

    hasTicket(): boolean;
    clearTicket(): void;
    getTicket(): sui_rpc_v2beta2_argument_pb.Argument | undefined;
    setTicket(value?: sui_rpc_v2beta2_argument_pb.Argument): Upgrade;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Upgrade.AsObject;
    static toObject(includeInstance: boolean, msg: Upgrade): Upgrade.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Upgrade, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Upgrade;
    static deserializeBinaryFromReader(message: Upgrade, reader: jspb.BinaryReader): Upgrade;
}

export namespace Upgrade {
    export type AsObject = {
        modulesList: Array<Uint8Array | string>,
        dependenciesList: Array<string>,
        pb_package?: string,
        ticket?: sui_rpc_v2beta2_argument_pb.Argument.AsObject,
    }
}

export class RandomnessStateUpdate extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): RandomnessStateUpdate;

    hasRandomnessRound(): boolean;
    clearRandomnessRound(): void;
    getRandomnessRound(): number | undefined;
    setRandomnessRound(value: number): RandomnessStateUpdate;

    hasRandomBytes(): boolean;
    clearRandomBytes(): void;
    getRandomBytes(): Uint8Array | string;
    getRandomBytes_asU8(): Uint8Array;
    getRandomBytes_asB64(): string;
    setRandomBytes(value: Uint8Array | string): RandomnessStateUpdate;

    hasRandomnessObjectInitialSharedVersion(): boolean;
    clearRandomnessObjectInitialSharedVersion(): void;
    getRandomnessObjectInitialSharedVersion(): number | undefined;
    setRandomnessObjectInitialSharedVersion(value: number): RandomnessStateUpdate;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RandomnessStateUpdate.AsObject;
    static toObject(includeInstance: boolean, msg: RandomnessStateUpdate): RandomnessStateUpdate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RandomnessStateUpdate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RandomnessStateUpdate;
    static deserializeBinaryFromReader(message: RandomnessStateUpdate, reader: jspb.BinaryReader): RandomnessStateUpdate;
}

export namespace RandomnessStateUpdate {
    export type AsObject = {
        epoch?: number,
        randomnessRound?: number,
        randomBytes: Uint8Array | string,
        randomnessObjectInitialSharedVersion?: number,
    }
}

export class ChangeEpoch extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): ChangeEpoch;

    hasProtocolVersion(): boolean;
    clearProtocolVersion(): void;
    getProtocolVersion(): number | undefined;
    setProtocolVersion(value: number): ChangeEpoch;

    hasStorageCharge(): boolean;
    clearStorageCharge(): void;
    getStorageCharge(): number | undefined;
    setStorageCharge(value: number): ChangeEpoch;

    hasComputationCharge(): boolean;
    clearComputationCharge(): void;
    getComputationCharge(): number | undefined;
    setComputationCharge(value: number): ChangeEpoch;

    hasStorageRebate(): boolean;
    clearStorageRebate(): void;
    getStorageRebate(): number | undefined;
    setStorageRebate(value: number): ChangeEpoch;

    hasNonRefundableStorageFee(): boolean;
    clearNonRefundableStorageFee(): void;
    getNonRefundableStorageFee(): number | undefined;
    setNonRefundableStorageFee(value: number): ChangeEpoch;

    hasEpochStartTimestamp(): boolean;
    clearEpochStartTimestamp(): void;
    getEpochStartTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setEpochStartTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): ChangeEpoch;
    clearSystemPackagesList(): void;
    getSystemPackagesList(): Array<SystemPackage>;
    setSystemPackagesList(value: Array<SystemPackage>): ChangeEpoch;
    addSystemPackages(value?: SystemPackage, index?: number): SystemPackage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ChangeEpoch.AsObject;
    static toObject(includeInstance: boolean, msg: ChangeEpoch): ChangeEpoch.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ChangeEpoch, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ChangeEpoch;
    static deserializeBinaryFromReader(message: ChangeEpoch, reader: jspb.BinaryReader): ChangeEpoch;
}

export namespace ChangeEpoch {
    export type AsObject = {
        epoch?: number,
        protocolVersion?: number,
        storageCharge?: number,
        computationCharge?: number,
        storageRebate?: number,
        nonRefundableStorageFee?: number,
        epochStartTimestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        systemPackagesList: Array<SystemPackage.AsObject>,
    }
}

export class SystemPackage extends jspb.Message { 

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): SystemPackage;
    clearModulesList(): void;
    getModulesList(): Array<Uint8Array | string>;
    getModulesList_asU8(): Array<Uint8Array>;
    getModulesList_asB64(): Array<string>;
    setModulesList(value: Array<Uint8Array | string>): SystemPackage;
    addModules(value: Uint8Array | string, index?: number): Uint8Array | string;
    clearDependenciesList(): void;
    getDependenciesList(): Array<string>;
    setDependenciesList(value: Array<string>): SystemPackage;
    addDependencies(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemPackage.AsObject;
    static toObject(includeInstance: boolean, msg: SystemPackage): SystemPackage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemPackage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemPackage;
    static deserializeBinaryFromReader(message: SystemPackage, reader: jspb.BinaryReader): SystemPackage;
}

export namespace SystemPackage {
    export type AsObject = {
        version?: number,
        modulesList: Array<Uint8Array | string>,
        dependenciesList: Array<string>,
    }
}

export class GenesisTransaction extends jspb.Message { 
    clearObjectsList(): void;
    getObjectsList(): Array<sui_rpc_v2beta2_object_pb.Object>;
    setObjectsList(value: Array<sui_rpc_v2beta2_object_pb.Object>): GenesisTransaction;
    addObjects(value?: sui_rpc_v2beta2_object_pb.Object, index?: number): sui_rpc_v2beta2_object_pb.Object;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GenesisTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: GenesisTransaction): GenesisTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GenesisTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GenesisTransaction;
    static deserializeBinaryFromReader(message: GenesisTransaction, reader: jspb.BinaryReader): GenesisTransaction;
}

export namespace GenesisTransaction {
    export type AsObject = {
        objectsList: Array<sui_rpc_v2beta2_object_pb.Object.AsObject>,
    }
}

export class ConsensusCommitPrologue extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): ConsensusCommitPrologue;

    hasRound(): boolean;
    clearRound(): void;
    getRound(): number | undefined;
    setRound(value: number): ConsensusCommitPrologue;

    hasCommitTimestamp(): boolean;
    clearCommitTimestamp(): void;
    getCommitTimestamp(): google_protobuf_timestamp_pb.Timestamp | undefined;
    setCommitTimestamp(value?: google_protobuf_timestamp_pb.Timestamp): ConsensusCommitPrologue;

    hasConsensusCommitDigest(): boolean;
    clearConsensusCommitDigest(): void;
    getConsensusCommitDigest(): string | undefined;
    setConsensusCommitDigest(value: string): ConsensusCommitPrologue;

    hasSubDagIndex(): boolean;
    clearSubDagIndex(): void;
    getSubDagIndex(): number | undefined;
    setSubDagIndex(value: number): ConsensusCommitPrologue;

    hasConsensusDeterminedVersionAssignments(): boolean;
    clearConsensusDeterminedVersionAssignments(): void;
    getConsensusDeterminedVersionAssignments(): ConsensusDeterminedVersionAssignments | undefined;
    setConsensusDeterminedVersionAssignments(value?: ConsensusDeterminedVersionAssignments): ConsensusCommitPrologue;

    hasAdditionalStateDigest(): boolean;
    clearAdditionalStateDigest(): void;
    getAdditionalStateDigest(): string | undefined;
    setAdditionalStateDigest(value: string): ConsensusCommitPrologue;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConsensusCommitPrologue.AsObject;
    static toObject(includeInstance: boolean, msg: ConsensusCommitPrologue): ConsensusCommitPrologue.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConsensusCommitPrologue, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConsensusCommitPrologue;
    static deserializeBinaryFromReader(message: ConsensusCommitPrologue, reader: jspb.BinaryReader): ConsensusCommitPrologue;
}

export namespace ConsensusCommitPrologue {
    export type AsObject = {
        epoch?: number,
        round?: number,
        commitTimestamp?: google_protobuf_timestamp_pb.Timestamp.AsObject,
        consensusCommitDigest?: string,
        subDagIndex?: number,
        consensusDeterminedVersionAssignments?: ConsensusDeterminedVersionAssignments.AsObject,
        additionalStateDigest?: string,
    }
}

export class VersionAssignment extends jspb.Message { 

    hasObjectId(): boolean;
    clearObjectId(): void;
    getObjectId(): string | undefined;
    setObjectId(value: string): VersionAssignment;

    hasStartVersion(): boolean;
    clearStartVersion(): void;
    getStartVersion(): number | undefined;
    setStartVersion(value: number): VersionAssignment;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): VersionAssignment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VersionAssignment.AsObject;
    static toObject(includeInstance: boolean, msg: VersionAssignment): VersionAssignment.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VersionAssignment, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VersionAssignment;
    static deserializeBinaryFromReader(message: VersionAssignment, reader: jspb.BinaryReader): VersionAssignment;
}

export namespace VersionAssignment {
    export type AsObject = {
        objectId?: string,
        startVersion?: number,
        version?: number,
    }
}

export class CanceledTransaction extends jspb.Message { 

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): CanceledTransaction;
    clearVersionAssignmentsList(): void;
    getVersionAssignmentsList(): Array<VersionAssignment>;
    setVersionAssignmentsList(value: Array<VersionAssignment>): CanceledTransaction;
    addVersionAssignments(value?: VersionAssignment, index?: number): VersionAssignment;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CanceledTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: CanceledTransaction): CanceledTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CanceledTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CanceledTransaction;
    static deserializeBinaryFromReader(message: CanceledTransaction, reader: jspb.BinaryReader): CanceledTransaction;
}

export namespace CanceledTransaction {
    export type AsObject = {
        digest?: string,
        versionAssignmentsList: Array<VersionAssignment.AsObject>,
    }
}

export class ConsensusDeterminedVersionAssignments extends jspb.Message { 

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): ConsensusDeterminedVersionAssignments;
    clearCanceledTransactionsList(): void;
    getCanceledTransactionsList(): Array<CanceledTransaction>;
    setCanceledTransactionsList(value: Array<CanceledTransaction>): ConsensusDeterminedVersionAssignments;
    addCanceledTransactions(value?: CanceledTransaction, index?: number): CanceledTransaction;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConsensusDeterminedVersionAssignments.AsObject;
    static toObject(includeInstance: boolean, msg: ConsensusDeterminedVersionAssignments): ConsensusDeterminedVersionAssignments.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConsensusDeterminedVersionAssignments, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConsensusDeterminedVersionAssignments;
    static deserializeBinaryFromReader(message: ConsensusDeterminedVersionAssignments, reader: jspb.BinaryReader): ConsensusDeterminedVersionAssignments;
}

export namespace ConsensusDeterminedVersionAssignments {
    export type AsObject = {
        version?: number,
        canceledTransactionsList: Array<CanceledTransaction.AsObject>,
    }
}

export class AuthenticatorStateUpdate extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): AuthenticatorStateUpdate;

    hasRound(): boolean;
    clearRound(): void;
    getRound(): number | undefined;
    setRound(value: number): AuthenticatorStateUpdate;
    clearNewActiveJwksList(): void;
    getNewActiveJwksList(): Array<ActiveJwk>;
    setNewActiveJwksList(value: Array<ActiveJwk>): AuthenticatorStateUpdate;
    addNewActiveJwks(value?: ActiveJwk, index?: number): ActiveJwk;

    hasAuthenticatorObjectInitialSharedVersion(): boolean;
    clearAuthenticatorObjectInitialSharedVersion(): void;
    getAuthenticatorObjectInitialSharedVersion(): number | undefined;
    setAuthenticatorObjectInitialSharedVersion(value: number): AuthenticatorStateUpdate;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthenticatorStateUpdate.AsObject;
    static toObject(includeInstance: boolean, msg: AuthenticatorStateUpdate): AuthenticatorStateUpdate.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthenticatorStateUpdate, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthenticatorStateUpdate;
    static deserializeBinaryFromReader(message: AuthenticatorStateUpdate, reader: jspb.BinaryReader): AuthenticatorStateUpdate;
}

export namespace AuthenticatorStateUpdate {
    export type AsObject = {
        epoch?: number,
        round?: number,
        newActiveJwksList: Array<ActiveJwk.AsObject>,
        authenticatorObjectInitialSharedVersion?: number,
    }
}

export class ActiveJwk extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): JwkId | undefined;
    setId(value?: JwkId): ActiveJwk;

    hasJwk(): boolean;
    clearJwk(): void;
    getJwk(): Jwk | undefined;
    setJwk(value?: Jwk): ActiveJwk;

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): ActiveJwk;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ActiveJwk.AsObject;
    static toObject(includeInstance: boolean, msg: ActiveJwk): ActiveJwk.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ActiveJwk, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ActiveJwk;
    static deserializeBinaryFromReader(message: ActiveJwk, reader: jspb.BinaryReader): ActiveJwk;
}

export namespace ActiveJwk {
    export type AsObject = {
        id?: JwkId.AsObject,
        jwk?: Jwk.AsObject,
        epoch?: number,
    }
}

export class JwkId extends jspb.Message { 

    hasIss(): boolean;
    clearIss(): void;
    getIss(): string | undefined;
    setIss(value: string): JwkId;

    hasKid(): boolean;
    clearKid(): void;
    getKid(): string | undefined;
    setKid(value: string): JwkId;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): JwkId.AsObject;
    static toObject(includeInstance: boolean, msg: JwkId): JwkId.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: JwkId, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): JwkId;
    static deserializeBinaryFromReader(message: JwkId, reader: jspb.BinaryReader): JwkId;
}

export namespace JwkId {
    export type AsObject = {
        iss?: string,
        kid?: string,
    }
}

export class Jwk extends jspb.Message { 

    hasKty(): boolean;
    clearKty(): void;
    getKty(): string | undefined;
    setKty(value: string): Jwk;

    hasE(): boolean;
    clearE(): void;
    getE(): string | undefined;
    setE(value: string): Jwk;

    hasN(): boolean;
    clearN(): void;
    getN(): string | undefined;
    setN(value: string): Jwk;

    hasAlg(): boolean;
    clearAlg(): void;
    getAlg(): string | undefined;
    setAlg(value: string): Jwk;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Jwk.AsObject;
    static toObject(includeInstance: boolean, msg: Jwk): Jwk.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Jwk, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Jwk;
    static deserializeBinaryFromReader(message: Jwk, reader: jspb.BinaryReader): Jwk;
}

export namespace Jwk {
    export type AsObject = {
        kty?: string,
        e?: string,
        n?: string,
        alg?: string,
    }
}

export class EndOfEpochTransaction extends jspb.Message { 
    clearTransactionsList(): void;
    getTransactionsList(): Array<EndOfEpochTransactionKind>;
    setTransactionsList(value: Array<EndOfEpochTransactionKind>): EndOfEpochTransaction;
    addTransactions(value?: EndOfEpochTransactionKind, index?: number): EndOfEpochTransactionKind;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EndOfEpochTransaction.AsObject;
    static toObject(includeInstance: boolean, msg: EndOfEpochTransaction): EndOfEpochTransaction.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EndOfEpochTransaction, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EndOfEpochTransaction;
    static deserializeBinaryFromReader(message: EndOfEpochTransaction, reader: jspb.BinaryReader): EndOfEpochTransaction;
}

export namespace EndOfEpochTransaction {
    export type AsObject = {
        transactionsList: Array<EndOfEpochTransactionKind.AsObject>,
    }
}

export class EndOfEpochTransactionKind extends jspb.Message { 

    hasChangeEpoch(): boolean;
    clearChangeEpoch(): void;
    getChangeEpoch(): ChangeEpoch | undefined;
    setChangeEpoch(value?: ChangeEpoch): EndOfEpochTransactionKind;

    hasAuthenticatorStateExpire(): boolean;
    clearAuthenticatorStateExpire(): void;
    getAuthenticatorStateExpire(): AuthenticatorStateExpire | undefined;
    setAuthenticatorStateExpire(value?: AuthenticatorStateExpire): EndOfEpochTransactionKind;

    hasExecutionTimeObservations(): boolean;
    clearExecutionTimeObservations(): void;
    getExecutionTimeObservations(): ExecutionTimeObservations | undefined;
    setExecutionTimeObservations(value?: ExecutionTimeObservations): EndOfEpochTransactionKind;

    hasAuthenticatorStateCreate(): boolean;
    clearAuthenticatorStateCreate(): void;
    getAuthenticatorStateCreate(): google_protobuf_empty_pb.Empty | undefined;
    setAuthenticatorStateCreate(value?: google_protobuf_empty_pb.Empty): EndOfEpochTransactionKind;

    hasRandomnessStateCreate(): boolean;
    clearRandomnessStateCreate(): void;
    getRandomnessStateCreate(): google_protobuf_empty_pb.Empty | undefined;
    setRandomnessStateCreate(value?: google_protobuf_empty_pb.Empty): EndOfEpochTransactionKind;

    hasDenyListStateCreate(): boolean;
    clearDenyListStateCreate(): void;
    getDenyListStateCreate(): google_protobuf_empty_pb.Empty | undefined;
    setDenyListStateCreate(value?: google_protobuf_empty_pb.Empty): EndOfEpochTransactionKind;

    hasBridgeStateCreate(): boolean;
    clearBridgeStateCreate(): void;
    getBridgeStateCreate(): string;
    setBridgeStateCreate(value: string): EndOfEpochTransactionKind;

    hasBridgeCommitteeInit(): boolean;
    clearBridgeCommitteeInit(): void;
    getBridgeCommitteeInit(): number;
    setBridgeCommitteeInit(value: number): EndOfEpochTransactionKind;

    hasAccumulatorRootCreate(): boolean;
    clearAccumulatorRootCreate(): void;
    getAccumulatorRootCreate(): google_protobuf_empty_pb.Empty | undefined;
    setAccumulatorRootCreate(value?: google_protobuf_empty_pb.Empty): EndOfEpochTransactionKind;

    hasCoinRegistryCreate(): boolean;
    clearCoinRegistryCreate(): void;
    getCoinRegistryCreate(): google_protobuf_empty_pb.Empty | undefined;
    setCoinRegistryCreate(value?: google_protobuf_empty_pb.Empty): EndOfEpochTransactionKind;

    hasDisplayRegistryCreate(): boolean;
    clearDisplayRegistryCreate(): void;
    getDisplayRegistryCreate(): google_protobuf_empty_pb.Empty | undefined;
    setDisplayRegistryCreate(value?: google_protobuf_empty_pb.Empty): EndOfEpochTransactionKind;

    getKindCase(): EndOfEpochTransactionKind.KindCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EndOfEpochTransactionKind.AsObject;
    static toObject(includeInstance: boolean, msg: EndOfEpochTransactionKind): EndOfEpochTransactionKind.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EndOfEpochTransactionKind, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EndOfEpochTransactionKind;
    static deserializeBinaryFromReader(message: EndOfEpochTransactionKind, reader: jspb.BinaryReader): EndOfEpochTransactionKind;
}

export namespace EndOfEpochTransactionKind {
    export type AsObject = {
        changeEpoch?: ChangeEpoch.AsObject,
        authenticatorStateExpire?: AuthenticatorStateExpire.AsObject,
        executionTimeObservations?: ExecutionTimeObservations.AsObject,
        authenticatorStateCreate?: google_protobuf_empty_pb.Empty.AsObject,
        randomnessStateCreate?: google_protobuf_empty_pb.Empty.AsObject,
        denyListStateCreate?: google_protobuf_empty_pb.Empty.AsObject,
        bridgeStateCreate: string,
        bridgeCommitteeInit: number,
        accumulatorRootCreate?: google_protobuf_empty_pb.Empty.AsObject,
        coinRegistryCreate?: google_protobuf_empty_pb.Empty.AsObject,
        displayRegistryCreate?: google_protobuf_empty_pb.Empty.AsObject,
    }

    export enum KindCase {
        KIND_NOT_SET = 0,
        CHANGE_EPOCH = 2,
        AUTHENTICATOR_STATE_EXPIRE = 3,
        EXECUTION_TIME_OBSERVATIONS = 4,
        AUTHENTICATOR_STATE_CREATE = 200,
        RANDOMNESS_STATE_CREATE = 201,
        DENY_LIST_STATE_CREATE = 202,
        BRIDGE_STATE_CREATE = 203,
        BRIDGE_COMMITTEE_INIT = 204,
        ACCUMULATOR_ROOT_CREATE = 205,
        COIN_REGISTRY_CREATE = 206,
        DISPLAY_REGISTRY_CREATE = 207,
    }

}

export class AuthenticatorStateExpire extends jspb.Message { 

    hasMinEpoch(): boolean;
    clearMinEpoch(): void;
    getMinEpoch(): number | undefined;
    setMinEpoch(value: number): AuthenticatorStateExpire;

    hasAuthenticatorObjectInitialSharedVersion(): boolean;
    clearAuthenticatorObjectInitialSharedVersion(): void;
    getAuthenticatorObjectInitialSharedVersion(): number | undefined;
    setAuthenticatorObjectInitialSharedVersion(value: number): AuthenticatorStateExpire;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AuthenticatorStateExpire.AsObject;
    static toObject(includeInstance: boolean, msg: AuthenticatorStateExpire): AuthenticatorStateExpire.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AuthenticatorStateExpire, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AuthenticatorStateExpire;
    static deserializeBinaryFromReader(message: AuthenticatorStateExpire, reader: jspb.BinaryReader): AuthenticatorStateExpire;
}

export namespace AuthenticatorStateExpire {
    export type AsObject = {
        minEpoch?: number,
        authenticatorObjectInitialSharedVersion?: number,
    }
}

export class ExecutionTimeObservations extends jspb.Message { 

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): ExecutionTimeObservations;
    clearObservationsList(): void;
    getObservationsList(): Array<ExecutionTimeObservation>;
    setObservationsList(value: Array<ExecutionTimeObservation>): ExecutionTimeObservations;
    addObservations(value?: ExecutionTimeObservation, index?: number): ExecutionTimeObservation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutionTimeObservations.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutionTimeObservations): ExecutionTimeObservations.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutionTimeObservations, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutionTimeObservations;
    static deserializeBinaryFromReader(message: ExecutionTimeObservations, reader: jspb.BinaryReader): ExecutionTimeObservations;
}

export namespace ExecutionTimeObservations {
    export type AsObject = {
        version?: number,
        observationsList: Array<ExecutionTimeObservation.AsObject>,
    }
}

export class ExecutionTimeObservation extends jspb.Message { 

    hasKind(): boolean;
    clearKind(): void;
    getKind(): ExecutionTimeObservation.ExecutionTimeObservationKind | undefined;
    setKind(value: ExecutionTimeObservation.ExecutionTimeObservationKind): ExecutionTimeObservation;

    hasMoveEntryPoint(): boolean;
    clearMoveEntryPoint(): void;
    getMoveEntryPoint(): MoveCall | undefined;
    setMoveEntryPoint(value?: MoveCall): ExecutionTimeObservation;
    clearValidatorObservationsList(): void;
    getValidatorObservationsList(): Array<ValidatorExecutionTimeObservation>;
    setValidatorObservationsList(value: Array<ValidatorExecutionTimeObservation>): ExecutionTimeObservation;
    addValidatorObservations(value?: ValidatorExecutionTimeObservation, index?: number): ValidatorExecutionTimeObservation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ExecutionTimeObservation.AsObject;
    static toObject(includeInstance: boolean, msg: ExecutionTimeObservation): ExecutionTimeObservation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ExecutionTimeObservation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ExecutionTimeObservation;
    static deserializeBinaryFromReader(message: ExecutionTimeObservation, reader: jspb.BinaryReader): ExecutionTimeObservation;
}

export namespace ExecutionTimeObservation {
    export type AsObject = {
        kind?: ExecutionTimeObservation.ExecutionTimeObservationKind,
        moveEntryPoint?: MoveCall.AsObject,
        validatorObservationsList: Array<ValidatorExecutionTimeObservation.AsObject>,
    }

    export enum ExecutionTimeObservationKind {
    EXECUTION_TIME_OBSERVATION_KIND_UNKNOWN = 0,
    MOVE_ENTRY_POINT = 1,
    TRANSFER_OBJECTS = 2,
    SPLIT_COINS = 3,
    MERGE_COINS = 4,
    PUBLISH = 5,
    MAKE_MOVE_VECTOR = 6,
    UPGRADE = 7,
    }

}

export class ValidatorExecutionTimeObservation extends jspb.Message { 

    hasValidator(): boolean;
    clearValidator(): void;
    getValidator(): Uint8Array | string;
    getValidator_asU8(): Uint8Array;
    getValidator_asB64(): string;
    setValidator(value: Uint8Array | string): ValidatorExecutionTimeObservation;

    hasDuration(): boolean;
    clearDuration(): void;
    getDuration(): google_protobuf_duration_pb.Duration | undefined;
    setDuration(value?: google_protobuf_duration_pb.Duration): ValidatorExecutionTimeObservation;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorExecutionTimeObservation.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorExecutionTimeObservation): ValidatorExecutionTimeObservation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorExecutionTimeObservation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorExecutionTimeObservation;
    static deserializeBinaryFromReader(message: ValidatorExecutionTimeObservation, reader: jspb.BinaryReader): ValidatorExecutionTimeObservation;
}

export namespace ValidatorExecutionTimeObservation {
    export type AsObject = {
        validator: Uint8Array | string,
        duration?: google_protobuf_duration_pb.Duration.AsObject,
    }
}
