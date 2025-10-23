// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/signature.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_signature_scheme_pb from "../../../sui/rpc/v2beta2/signature_scheme_pb";

export class UserSignature extends jspb.Message { 

    hasBcs(): boolean;
    clearBcs(): void;
    getBcs(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setBcs(value?: sui_rpc_v2beta2_bcs_pb.Bcs): UserSignature;

    hasScheme(): boolean;
    clearScheme(): void;
    getScheme(): sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme | undefined;
    setScheme(value: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme): UserSignature;

    hasSimple(): boolean;
    clearSimple(): void;
    getSimple(): SimpleSignature | undefined;
    setSimple(value?: SimpleSignature): UserSignature;

    hasMultisig(): boolean;
    clearMultisig(): void;
    getMultisig(): MultisigAggregatedSignature | undefined;
    setMultisig(value?: MultisigAggregatedSignature): UserSignature;

    hasZklogin(): boolean;
    clearZklogin(): void;
    getZklogin(): ZkLoginAuthenticator | undefined;
    setZklogin(value?: ZkLoginAuthenticator): UserSignature;

    hasPasskey(): boolean;
    clearPasskey(): void;
    getPasskey(): PasskeyAuthenticator | undefined;
    setPasskey(value?: PasskeyAuthenticator): UserSignature;

    getSignatureCase(): UserSignature.SignatureCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UserSignature.AsObject;
    static toObject(includeInstance: boolean, msg: UserSignature): UserSignature.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UserSignature, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UserSignature;
    static deserializeBinaryFromReader(message: UserSignature, reader: jspb.BinaryReader): UserSignature;
}

export namespace UserSignature {
    export type AsObject = {
        bcs?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        scheme?: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme,
        simple?: SimpleSignature.AsObject,
        multisig?: MultisigAggregatedSignature.AsObject,
        zklogin?: ZkLoginAuthenticator.AsObject,
        passkey?: PasskeyAuthenticator.AsObject,
    }

    export enum SignatureCase {
        SIGNATURE_NOT_SET = 0,
        SIMPLE = 3,
        MULTISIG = 4,
        ZKLOGIN = 5,
        PASSKEY = 6,
    }

}

export class SimpleSignature extends jspb.Message { 

    hasScheme(): boolean;
    clearScheme(): void;
    getScheme(): sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme | undefined;
    setScheme(value: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme): SimpleSignature;

    hasSignature(): boolean;
    clearSignature(): void;
    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): SimpleSignature;

    hasPublicKey(): boolean;
    clearPublicKey(): void;
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): SimpleSignature;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SimpleSignature.AsObject;
    static toObject(includeInstance: boolean, msg: SimpleSignature): SimpleSignature.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SimpleSignature, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SimpleSignature;
    static deserializeBinaryFromReader(message: SimpleSignature, reader: jspb.BinaryReader): SimpleSignature;
}

export namespace SimpleSignature {
    export type AsObject = {
        scheme?: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme,
        signature: Uint8Array | string,
        publicKey: Uint8Array | string,
    }
}

export class ZkLoginPublicIdentifier extends jspb.Message { 

    hasIss(): boolean;
    clearIss(): void;
    getIss(): string | undefined;
    setIss(value: string): ZkLoginPublicIdentifier;

    hasAddressSeed(): boolean;
    clearAddressSeed(): void;
    getAddressSeed(): string | undefined;
    setAddressSeed(value: string): ZkLoginPublicIdentifier;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZkLoginPublicIdentifier.AsObject;
    static toObject(includeInstance: boolean, msg: ZkLoginPublicIdentifier): ZkLoginPublicIdentifier.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZkLoginPublicIdentifier, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZkLoginPublicIdentifier;
    static deserializeBinaryFromReader(message: ZkLoginPublicIdentifier, reader: jspb.BinaryReader): ZkLoginPublicIdentifier;
}

export namespace ZkLoginPublicIdentifier {
    export type AsObject = {
        iss?: string,
        addressSeed?: string,
    }
}

export class MultisigMemberPublicKey extends jspb.Message { 

    hasScheme(): boolean;
    clearScheme(): void;
    getScheme(): sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme | undefined;
    setScheme(value: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme): MultisigMemberPublicKey;

    hasPublicKey(): boolean;
    clearPublicKey(): void;
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): MultisigMemberPublicKey;

    hasZklogin(): boolean;
    clearZklogin(): void;
    getZklogin(): ZkLoginPublicIdentifier | undefined;
    setZklogin(value?: ZkLoginPublicIdentifier): MultisigMemberPublicKey;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MultisigMemberPublicKey.AsObject;
    static toObject(includeInstance: boolean, msg: MultisigMemberPublicKey): MultisigMemberPublicKey.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MultisigMemberPublicKey, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MultisigMemberPublicKey;
    static deserializeBinaryFromReader(message: MultisigMemberPublicKey, reader: jspb.BinaryReader): MultisigMemberPublicKey;
}

export namespace MultisigMemberPublicKey {
    export type AsObject = {
        scheme?: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme,
        publicKey: Uint8Array | string,
        zklogin?: ZkLoginPublicIdentifier.AsObject,
    }
}

export class MultisigMember extends jspb.Message { 

    hasPublicKey(): boolean;
    clearPublicKey(): void;
    getPublicKey(): MultisigMemberPublicKey | undefined;
    setPublicKey(value?: MultisigMemberPublicKey): MultisigMember;

    hasWeight(): boolean;
    clearWeight(): void;
    getWeight(): number | undefined;
    setWeight(value: number): MultisigMember;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MultisigMember.AsObject;
    static toObject(includeInstance: boolean, msg: MultisigMember): MultisigMember.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MultisigMember, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MultisigMember;
    static deserializeBinaryFromReader(message: MultisigMember, reader: jspb.BinaryReader): MultisigMember;
}

export namespace MultisigMember {
    export type AsObject = {
        publicKey?: MultisigMemberPublicKey.AsObject,
        weight?: number,
    }
}

export class MultisigCommittee extends jspb.Message { 
    clearMembersList(): void;
    getMembersList(): Array<MultisigMember>;
    setMembersList(value: Array<MultisigMember>): MultisigCommittee;
    addMembers(value?: MultisigMember, index?: number): MultisigMember;

    hasThreshold(): boolean;
    clearThreshold(): void;
    getThreshold(): number | undefined;
    setThreshold(value: number): MultisigCommittee;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MultisigCommittee.AsObject;
    static toObject(includeInstance: boolean, msg: MultisigCommittee): MultisigCommittee.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MultisigCommittee, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MultisigCommittee;
    static deserializeBinaryFromReader(message: MultisigCommittee, reader: jspb.BinaryReader): MultisigCommittee;
}

export namespace MultisigCommittee {
    export type AsObject = {
        membersList: Array<MultisigMember.AsObject>,
        threshold?: number,
    }
}

export class MultisigAggregatedSignature extends jspb.Message { 
    clearSignaturesList(): void;
    getSignaturesList(): Array<MultisigMemberSignature>;
    setSignaturesList(value: Array<MultisigMemberSignature>): MultisigAggregatedSignature;
    addSignatures(value?: MultisigMemberSignature, index?: number): MultisigMemberSignature;

    hasBitmap(): boolean;
    clearBitmap(): void;
    getBitmap(): number | undefined;
    setBitmap(value: number): MultisigAggregatedSignature;
    clearLegacyBitmapList(): void;
    getLegacyBitmapList(): Array<number>;
    setLegacyBitmapList(value: Array<number>): MultisigAggregatedSignature;
    addLegacyBitmap(value: number, index?: number): number;

    hasCommittee(): boolean;
    clearCommittee(): void;
    getCommittee(): MultisigCommittee | undefined;
    setCommittee(value?: MultisigCommittee): MultisigAggregatedSignature;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MultisigAggregatedSignature.AsObject;
    static toObject(includeInstance: boolean, msg: MultisigAggregatedSignature): MultisigAggregatedSignature.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MultisigAggregatedSignature, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MultisigAggregatedSignature;
    static deserializeBinaryFromReader(message: MultisigAggregatedSignature, reader: jspb.BinaryReader): MultisigAggregatedSignature;
}

export namespace MultisigAggregatedSignature {
    export type AsObject = {
        signaturesList: Array<MultisigMemberSignature.AsObject>,
        bitmap?: number,
        legacyBitmapList: Array<number>,
        committee?: MultisigCommittee.AsObject,
    }
}

export class MultisigMemberSignature extends jspb.Message { 

    hasScheme(): boolean;
    clearScheme(): void;
    getScheme(): sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme | undefined;
    setScheme(value: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme): MultisigMemberSignature;

    hasSignature(): boolean;
    clearSignature(): void;
    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): MultisigMemberSignature;

    hasZklogin(): boolean;
    clearZklogin(): void;
    getZklogin(): ZkLoginAuthenticator | undefined;
    setZklogin(value?: ZkLoginAuthenticator): MultisigMemberSignature;

    hasPasskey(): boolean;
    clearPasskey(): void;
    getPasskey(): PasskeyAuthenticator | undefined;
    setPasskey(value?: PasskeyAuthenticator): MultisigMemberSignature;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MultisigMemberSignature.AsObject;
    static toObject(includeInstance: boolean, msg: MultisigMemberSignature): MultisigMemberSignature.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MultisigMemberSignature, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MultisigMemberSignature;
    static deserializeBinaryFromReader(message: MultisigMemberSignature, reader: jspb.BinaryReader): MultisigMemberSignature;
}

export namespace MultisigMemberSignature {
    export type AsObject = {
        scheme?: sui_rpc_v2beta2_signature_scheme_pb.SignatureScheme,
        signature: Uint8Array | string,
        zklogin?: ZkLoginAuthenticator.AsObject,
        passkey?: PasskeyAuthenticator.AsObject,
    }
}

export class ZkLoginAuthenticator extends jspb.Message { 

    hasInputs(): boolean;
    clearInputs(): void;
    getInputs(): ZkLoginInputs | undefined;
    setInputs(value?: ZkLoginInputs): ZkLoginAuthenticator;

    hasMaxEpoch(): boolean;
    clearMaxEpoch(): void;
    getMaxEpoch(): number | undefined;
    setMaxEpoch(value: number): ZkLoginAuthenticator;

    hasSignature(): boolean;
    clearSignature(): void;
    getSignature(): SimpleSignature | undefined;
    setSignature(value?: SimpleSignature): ZkLoginAuthenticator;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZkLoginAuthenticator.AsObject;
    static toObject(includeInstance: boolean, msg: ZkLoginAuthenticator): ZkLoginAuthenticator.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZkLoginAuthenticator, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZkLoginAuthenticator;
    static deserializeBinaryFromReader(message: ZkLoginAuthenticator, reader: jspb.BinaryReader): ZkLoginAuthenticator;
}

export namespace ZkLoginAuthenticator {
    export type AsObject = {
        inputs?: ZkLoginInputs.AsObject,
        maxEpoch?: number,
        signature?: SimpleSignature.AsObject,
    }
}

export class ZkLoginInputs extends jspb.Message { 

    hasProofPoints(): boolean;
    clearProofPoints(): void;
    getProofPoints(): ZkLoginProof | undefined;
    setProofPoints(value?: ZkLoginProof): ZkLoginInputs;

    hasIssBase64Details(): boolean;
    clearIssBase64Details(): void;
    getIssBase64Details(): ZkLoginClaim | undefined;
    setIssBase64Details(value?: ZkLoginClaim): ZkLoginInputs;

    hasHeaderBase64(): boolean;
    clearHeaderBase64(): void;
    getHeaderBase64(): string | undefined;
    setHeaderBase64(value: string): ZkLoginInputs;

    hasAddressSeed(): boolean;
    clearAddressSeed(): void;
    getAddressSeed(): string | undefined;
    setAddressSeed(value: string): ZkLoginInputs;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZkLoginInputs.AsObject;
    static toObject(includeInstance: boolean, msg: ZkLoginInputs): ZkLoginInputs.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZkLoginInputs, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZkLoginInputs;
    static deserializeBinaryFromReader(message: ZkLoginInputs, reader: jspb.BinaryReader): ZkLoginInputs;
}

export namespace ZkLoginInputs {
    export type AsObject = {
        proofPoints?: ZkLoginProof.AsObject,
        issBase64Details?: ZkLoginClaim.AsObject,
        headerBase64?: string,
        addressSeed?: string,
    }
}

export class ZkLoginProof extends jspb.Message { 

    hasA(): boolean;
    clearA(): void;
    getA(): CircomG1 | undefined;
    setA(value?: CircomG1): ZkLoginProof;

    hasB(): boolean;
    clearB(): void;
    getB(): CircomG2 | undefined;
    setB(value?: CircomG2): ZkLoginProof;

    hasC(): boolean;
    clearC(): void;
    getC(): CircomG1 | undefined;
    setC(value?: CircomG1): ZkLoginProof;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZkLoginProof.AsObject;
    static toObject(includeInstance: boolean, msg: ZkLoginProof): ZkLoginProof.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZkLoginProof, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZkLoginProof;
    static deserializeBinaryFromReader(message: ZkLoginProof, reader: jspb.BinaryReader): ZkLoginProof;
}

export namespace ZkLoginProof {
    export type AsObject = {
        a?: CircomG1.AsObject,
        b?: CircomG2.AsObject,
        c?: CircomG1.AsObject,
    }
}

export class ZkLoginClaim extends jspb.Message { 

    hasValue(): boolean;
    clearValue(): void;
    getValue(): string | undefined;
    setValue(value: string): ZkLoginClaim;

    hasIndexMod4(): boolean;
    clearIndexMod4(): void;
    getIndexMod4(): number | undefined;
    setIndexMod4(value: number): ZkLoginClaim;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ZkLoginClaim.AsObject;
    static toObject(includeInstance: boolean, msg: ZkLoginClaim): ZkLoginClaim.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ZkLoginClaim, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ZkLoginClaim;
    static deserializeBinaryFromReader(message: ZkLoginClaim, reader: jspb.BinaryReader): ZkLoginClaim;
}

export namespace ZkLoginClaim {
    export type AsObject = {
        value?: string,
        indexMod4?: number,
    }
}

export class CircomG1 extends jspb.Message { 

    hasE0(): boolean;
    clearE0(): void;
    getE0(): string | undefined;
    setE0(value: string): CircomG1;

    hasE1(): boolean;
    clearE1(): void;
    getE1(): string | undefined;
    setE1(value: string): CircomG1;

    hasE2(): boolean;
    clearE2(): void;
    getE2(): string | undefined;
    setE2(value: string): CircomG1;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CircomG1.AsObject;
    static toObject(includeInstance: boolean, msg: CircomG1): CircomG1.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CircomG1, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CircomG1;
    static deserializeBinaryFromReader(message: CircomG1, reader: jspb.BinaryReader): CircomG1;
}

export namespace CircomG1 {
    export type AsObject = {
        e0?: string,
        e1?: string,
        e2?: string,
    }
}

export class CircomG2 extends jspb.Message { 

    hasE00(): boolean;
    clearE00(): void;
    getE00(): string | undefined;
    setE00(value: string): CircomG2;

    hasE01(): boolean;
    clearE01(): void;
    getE01(): string | undefined;
    setE01(value: string): CircomG2;

    hasE10(): boolean;
    clearE10(): void;
    getE10(): string | undefined;
    setE10(value: string): CircomG2;

    hasE11(): boolean;
    clearE11(): void;
    getE11(): string | undefined;
    setE11(value: string): CircomG2;

    hasE20(): boolean;
    clearE20(): void;
    getE20(): string | undefined;
    setE20(value: string): CircomG2;

    hasE21(): boolean;
    clearE21(): void;
    getE21(): string | undefined;
    setE21(value: string): CircomG2;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CircomG2.AsObject;
    static toObject(includeInstance: boolean, msg: CircomG2): CircomG2.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CircomG2, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CircomG2;
    static deserializeBinaryFromReader(message: CircomG2, reader: jspb.BinaryReader): CircomG2;
}

export namespace CircomG2 {
    export type AsObject = {
        e00?: string,
        e01?: string,
        e10?: string,
        e11?: string,
        e20?: string,
        e21?: string,
    }
}

export class PasskeyAuthenticator extends jspb.Message { 

    hasAuthenticatorData(): boolean;
    clearAuthenticatorData(): void;
    getAuthenticatorData(): Uint8Array | string;
    getAuthenticatorData_asU8(): Uint8Array;
    getAuthenticatorData_asB64(): string;
    setAuthenticatorData(value: Uint8Array | string): PasskeyAuthenticator;

    hasClientDataJson(): boolean;
    clearClientDataJson(): void;
    getClientDataJson(): string | undefined;
    setClientDataJson(value: string): PasskeyAuthenticator;

    hasSignature(): boolean;
    clearSignature(): void;
    getSignature(): SimpleSignature | undefined;
    setSignature(value?: SimpleSignature): PasskeyAuthenticator;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PasskeyAuthenticator.AsObject;
    static toObject(includeInstance: boolean, msg: PasskeyAuthenticator): PasskeyAuthenticator.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PasskeyAuthenticator, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PasskeyAuthenticator;
    static deserializeBinaryFromReader(message: PasskeyAuthenticator, reader: jspb.BinaryReader): PasskeyAuthenticator;
}

export namespace PasskeyAuthenticator {
    export type AsObject = {
        authenticatorData: Uint8Array | string,
        clientDataJson?: string,
        signature?: SimpleSignature.AsObject,
    }
}

export class ValidatorCommittee extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): ValidatorCommittee;
    clearMembersList(): void;
    getMembersList(): Array<ValidatorCommitteeMember>;
    setMembersList(value: Array<ValidatorCommitteeMember>): ValidatorCommittee;
    addMembers(value?: ValidatorCommitteeMember, index?: number): ValidatorCommitteeMember;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorCommittee.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorCommittee): ValidatorCommittee.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorCommittee, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorCommittee;
    static deserializeBinaryFromReader(message: ValidatorCommittee, reader: jspb.BinaryReader): ValidatorCommittee;
}

export namespace ValidatorCommittee {
    export type AsObject = {
        epoch?: number,
        membersList: Array<ValidatorCommitteeMember.AsObject>,
    }
}

export class ValidatorCommitteeMember extends jspb.Message { 

    hasPublicKey(): boolean;
    clearPublicKey(): void;
    getPublicKey(): Uint8Array | string;
    getPublicKey_asU8(): Uint8Array;
    getPublicKey_asB64(): string;
    setPublicKey(value: Uint8Array | string): ValidatorCommitteeMember;

    hasWeight(): boolean;
    clearWeight(): void;
    getWeight(): number | undefined;
    setWeight(value: number): ValidatorCommitteeMember;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorCommitteeMember.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorCommitteeMember): ValidatorCommitteeMember.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorCommitteeMember, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorCommitteeMember;
    static deserializeBinaryFromReader(message: ValidatorCommitteeMember, reader: jspb.BinaryReader): ValidatorCommitteeMember;
}

export namespace ValidatorCommitteeMember {
    export type AsObject = {
        publicKey: Uint8Array | string,
        weight?: number,
    }
}

export class ValidatorAggregatedSignature extends jspb.Message { 

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): ValidatorAggregatedSignature;

    hasSignature(): boolean;
    clearSignature(): void;
    getSignature(): Uint8Array | string;
    getSignature_asU8(): Uint8Array;
    getSignature_asB64(): string;
    setSignature(value: Uint8Array | string): ValidatorAggregatedSignature;
    clearBitmapList(): void;
    getBitmapList(): Array<number>;
    setBitmapList(value: Array<number>): ValidatorAggregatedSignature;
    addBitmap(value: number, index?: number): number;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorAggregatedSignature.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorAggregatedSignature): ValidatorAggregatedSignature.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorAggregatedSignature, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorAggregatedSignature;
    static deserializeBinaryFromReader(message: ValidatorAggregatedSignature, reader: jspb.BinaryReader): ValidatorAggregatedSignature;
}

export namespace ValidatorAggregatedSignature {
    export type AsObject = {
        epoch?: number,
        signature: Uint8Array | string,
        bitmapList: Array<number>,
    }
}
