// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/move_package.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Package extends jspb.Message { 

    hasStorageId(): boolean;
    clearStorageId(): void;
    getStorageId(): string | undefined;
    setStorageId(value: string): Package;

    hasOriginalId(): boolean;
    clearOriginalId(): void;
    getOriginalId(): string | undefined;
    setOriginalId(value: string): Package;

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): Package;
    clearModulesList(): void;
    getModulesList(): Array<Module>;
    setModulesList(value: Array<Module>): Package;
    addModules(value?: Module, index?: number): Module;
    clearTypeOriginsList(): void;
    getTypeOriginsList(): Array<TypeOrigin>;
    setTypeOriginsList(value: Array<TypeOrigin>): Package;
    addTypeOrigins(value?: TypeOrigin, index?: number): TypeOrigin;
    clearLinkageList(): void;
    getLinkageList(): Array<Linkage>;
    setLinkageList(value: Array<Linkage>): Package;
    addLinkage(value?: Linkage, index?: number): Linkage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Package.AsObject;
    static toObject(includeInstance: boolean, msg: Package): Package.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Package, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Package;
    static deserializeBinaryFromReader(message: Package, reader: jspb.BinaryReader): Package;
}

export namespace Package {
    export type AsObject = {
        storageId?: string,
        originalId?: string,
        version?: number,
        modulesList: Array<Module.AsObject>,
        typeOriginsList: Array<TypeOrigin.AsObject>,
        linkageList: Array<Linkage.AsObject>,
    }
}

export class Module extends jspb.Message { 

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): Module;

    hasContents(): boolean;
    clearContents(): void;
    getContents(): Uint8Array | string;
    getContents_asU8(): Uint8Array;
    getContents_asB64(): string;
    setContents(value: Uint8Array | string): Module;
    clearDatatypesList(): void;
    getDatatypesList(): Array<DatatypeDescriptor>;
    setDatatypesList(value: Array<DatatypeDescriptor>): Module;
    addDatatypes(value?: DatatypeDescriptor, index?: number): DatatypeDescriptor;
    clearFunctionsList(): void;
    getFunctionsList(): Array<FunctionDescriptor>;
    setFunctionsList(value: Array<FunctionDescriptor>): Module;
    addFunctions(value?: FunctionDescriptor, index?: number): FunctionDescriptor;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Module.AsObject;
    static toObject(includeInstance: boolean, msg: Module): Module.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Module, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Module;
    static deserializeBinaryFromReader(message: Module, reader: jspb.BinaryReader): Module;
}

export namespace Module {
    export type AsObject = {
        name?: string,
        contents: Uint8Array | string,
        datatypesList: Array<DatatypeDescriptor.AsObject>,
        functionsList: Array<FunctionDescriptor.AsObject>,
    }
}

export class DatatypeDescriptor extends jspb.Message { 

    hasTypeName(): boolean;
    clearTypeName(): void;
    getTypeName(): string | undefined;
    setTypeName(value: string): DatatypeDescriptor;

    hasDefiningId(): boolean;
    clearDefiningId(): void;
    getDefiningId(): string | undefined;
    setDefiningId(value: string): DatatypeDescriptor;

    hasModule(): boolean;
    clearModule(): void;
    getModule(): string | undefined;
    setModule(value: string): DatatypeDescriptor;

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): DatatypeDescriptor;
    clearAbilitiesList(): void;
    getAbilitiesList(): Array<Ability>;
    setAbilitiesList(value: Array<Ability>): DatatypeDescriptor;
    addAbilities(value: Ability, index?: number): Ability;
    clearTypeParametersList(): void;
    getTypeParametersList(): Array<TypeParameter>;
    setTypeParametersList(value: Array<TypeParameter>): DatatypeDescriptor;
    addTypeParameters(value?: TypeParameter, index?: number): TypeParameter;

    hasKind(): boolean;
    clearKind(): void;
    getKind(): DatatypeDescriptor.DatatypeKind | undefined;
    setKind(value: DatatypeDescriptor.DatatypeKind): DatatypeDescriptor;
    clearFieldsList(): void;
    getFieldsList(): Array<FieldDescriptor>;
    setFieldsList(value: Array<FieldDescriptor>): DatatypeDescriptor;
    addFields(value?: FieldDescriptor, index?: number): FieldDescriptor;
    clearVariantsList(): void;
    getVariantsList(): Array<VariantDescriptor>;
    setVariantsList(value: Array<VariantDescriptor>): DatatypeDescriptor;
    addVariants(value?: VariantDescriptor, index?: number): VariantDescriptor;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DatatypeDescriptor.AsObject;
    static toObject(includeInstance: boolean, msg: DatatypeDescriptor): DatatypeDescriptor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DatatypeDescriptor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DatatypeDescriptor;
    static deserializeBinaryFromReader(message: DatatypeDescriptor, reader: jspb.BinaryReader): DatatypeDescriptor;
}

export namespace DatatypeDescriptor {
    export type AsObject = {
        typeName?: string,
        definingId?: string,
        module?: string,
        name?: string,
        abilitiesList: Array<Ability>,
        typeParametersList: Array<TypeParameter.AsObject>,
        kind?: DatatypeDescriptor.DatatypeKind,
        fieldsList: Array<FieldDescriptor.AsObject>,
        variantsList: Array<VariantDescriptor.AsObject>,
    }

    export enum DatatypeKind {
    DATATYPE_KIND_UNKNOWN = 0,
    STRUCT = 1,
    ENUM = 2,
    }

}

export class TypeParameter extends jspb.Message { 
    clearConstraintsList(): void;
    getConstraintsList(): Array<Ability>;
    setConstraintsList(value: Array<Ability>): TypeParameter;
    addConstraints(value: Ability, index?: number): Ability;

    hasIsPhantom(): boolean;
    clearIsPhantom(): void;
    getIsPhantom(): boolean | undefined;
    setIsPhantom(value: boolean): TypeParameter;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TypeParameter.AsObject;
    static toObject(includeInstance: boolean, msg: TypeParameter): TypeParameter.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TypeParameter, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TypeParameter;
    static deserializeBinaryFromReader(message: TypeParameter, reader: jspb.BinaryReader): TypeParameter;
}

export namespace TypeParameter {
    export type AsObject = {
        constraintsList: Array<Ability>,
        isPhantom?: boolean,
    }
}

export class FieldDescriptor extends jspb.Message { 

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): FieldDescriptor;

    hasPosition(): boolean;
    clearPosition(): void;
    getPosition(): number | undefined;
    setPosition(value: number): FieldDescriptor;

    hasType(): boolean;
    clearType(): void;
    getType(): OpenSignatureBody | undefined;
    setType(value?: OpenSignatureBody): FieldDescriptor;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FieldDescriptor.AsObject;
    static toObject(includeInstance: boolean, msg: FieldDescriptor): FieldDescriptor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FieldDescriptor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FieldDescriptor;
    static deserializeBinaryFromReader(message: FieldDescriptor, reader: jspb.BinaryReader): FieldDescriptor;
}

export namespace FieldDescriptor {
    export type AsObject = {
        name?: string,
        position?: number,
        type?: OpenSignatureBody.AsObject,
    }
}

export class VariantDescriptor extends jspb.Message { 

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): VariantDescriptor;

    hasPosition(): boolean;
    clearPosition(): void;
    getPosition(): number | undefined;
    setPosition(value: number): VariantDescriptor;
    clearFieldsList(): void;
    getFieldsList(): Array<FieldDescriptor>;
    setFieldsList(value: Array<FieldDescriptor>): VariantDescriptor;
    addFields(value?: FieldDescriptor, index?: number): FieldDescriptor;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): VariantDescriptor.AsObject;
    static toObject(includeInstance: boolean, msg: VariantDescriptor): VariantDescriptor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: VariantDescriptor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): VariantDescriptor;
    static deserializeBinaryFromReader(message: VariantDescriptor, reader: jspb.BinaryReader): VariantDescriptor;
}

export namespace VariantDescriptor {
    export type AsObject = {
        name?: string,
        position?: number,
        fieldsList: Array<FieldDescriptor.AsObject>,
    }
}

export class OpenSignatureBody extends jspb.Message { 

    hasType(): boolean;
    clearType(): void;
    getType(): OpenSignatureBody.Type | undefined;
    setType(value: OpenSignatureBody.Type): OpenSignatureBody;

    hasTypeName(): boolean;
    clearTypeName(): void;
    getTypeName(): string | undefined;
    setTypeName(value: string): OpenSignatureBody;
    clearTypeParameterInstantiationList(): void;
    getTypeParameterInstantiationList(): Array<OpenSignatureBody>;
    setTypeParameterInstantiationList(value: Array<OpenSignatureBody>): OpenSignatureBody;
    addTypeParameterInstantiation(value?: OpenSignatureBody, index?: number): OpenSignatureBody;

    hasTypeParameter(): boolean;
    clearTypeParameter(): void;
    getTypeParameter(): number | undefined;
    setTypeParameter(value: number): OpenSignatureBody;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OpenSignatureBody.AsObject;
    static toObject(includeInstance: boolean, msg: OpenSignatureBody): OpenSignatureBody.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OpenSignatureBody, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OpenSignatureBody;
    static deserializeBinaryFromReader(message: OpenSignatureBody, reader: jspb.BinaryReader): OpenSignatureBody;
}

export namespace OpenSignatureBody {
    export type AsObject = {
        type?: OpenSignatureBody.Type,
        typeName?: string,
        typeParameterInstantiationList: Array<OpenSignatureBody.AsObject>,
        typeParameter?: number,
    }

    export enum Type {
    TYPE_UNKNOWN = 0,
    ADDRESS = 1,
    BOOL = 2,
    U8 = 3,
    U16 = 4,
    U32 = 5,
    U64 = 6,
    U128 = 7,
    U256 = 8,
    VECTOR = 9,
    DATATYPE = 10,
    TYPE_PARAMETER = 11,
    }

}

export class FunctionDescriptor extends jspb.Message { 

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): FunctionDescriptor;

    hasVisibility(): boolean;
    clearVisibility(): void;
    getVisibility(): FunctionDescriptor.Visibility | undefined;
    setVisibility(value: FunctionDescriptor.Visibility): FunctionDescriptor;

    hasIsEntry(): boolean;
    clearIsEntry(): void;
    getIsEntry(): boolean | undefined;
    setIsEntry(value: boolean): FunctionDescriptor;
    clearTypeParametersList(): void;
    getTypeParametersList(): Array<TypeParameter>;
    setTypeParametersList(value: Array<TypeParameter>): FunctionDescriptor;
    addTypeParameters(value?: TypeParameter, index?: number): TypeParameter;
    clearParametersList(): void;
    getParametersList(): Array<OpenSignature>;
    setParametersList(value: Array<OpenSignature>): FunctionDescriptor;
    addParameters(value?: OpenSignature, index?: number): OpenSignature;
    clearReturnsList(): void;
    getReturnsList(): Array<OpenSignature>;
    setReturnsList(value: Array<OpenSignature>): FunctionDescriptor;
    addReturns(value?: OpenSignature, index?: number): OpenSignature;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): FunctionDescriptor.AsObject;
    static toObject(includeInstance: boolean, msg: FunctionDescriptor): FunctionDescriptor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: FunctionDescriptor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): FunctionDescriptor;
    static deserializeBinaryFromReader(message: FunctionDescriptor, reader: jspb.BinaryReader): FunctionDescriptor;
}

export namespace FunctionDescriptor {
    export type AsObject = {
        name?: string,
        visibility?: FunctionDescriptor.Visibility,
        isEntry?: boolean,
        typeParametersList: Array<TypeParameter.AsObject>,
        parametersList: Array<OpenSignature.AsObject>,
        returnsList: Array<OpenSignature.AsObject>,
    }

    export enum Visibility {
    VISIBILITY_UNKNOWN = 0,
    PRIVATE = 1,
    PUBLIC = 2,
    FRIEND = 3,
    }

}

export class OpenSignature extends jspb.Message { 

    hasReference(): boolean;
    clearReference(): void;
    getReference(): OpenSignature.Reference | undefined;
    setReference(value: OpenSignature.Reference): OpenSignature;

    hasBody(): boolean;
    clearBody(): void;
    getBody(): OpenSignatureBody | undefined;
    setBody(value?: OpenSignatureBody): OpenSignature;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): OpenSignature.AsObject;
    static toObject(includeInstance: boolean, msg: OpenSignature): OpenSignature.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: OpenSignature, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): OpenSignature;
    static deserializeBinaryFromReader(message: OpenSignature, reader: jspb.BinaryReader): OpenSignature;
}

export namespace OpenSignature {
    export type AsObject = {
        reference?: OpenSignature.Reference,
        body?: OpenSignatureBody.AsObject,
    }

    export enum Reference {
    REFERENCE_UNKNOWN = 0,
    IMMUTABLE = 1,
    MUTABLE = 2,
    }

}

export class TypeOrigin extends jspb.Message { 

    hasModuleName(): boolean;
    clearModuleName(): void;
    getModuleName(): string | undefined;
    setModuleName(value: string): TypeOrigin;

    hasDatatypeName(): boolean;
    clearDatatypeName(): void;
    getDatatypeName(): string | undefined;
    setDatatypeName(value: string): TypeOrigin;

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): TypeOrigin;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TypeOrigin.AsObject;
    static toObject(includeInstance: boolean, msg: TypeOrigin): TypeOrigin.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TypeOrigin, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TypeOrigin;
    static deserializeBinaryFromReader(message: TypeOrigin, reader: jspb.BinaryReader): TypeOrigin;
}

export namespace TypeOrigin {
    export type AsObject = {
        moduleName?: string,
        datatypeName?: string,
        packageId?: string,
    }
}

export class Linkage extends jspb.Message { 

    hasOriginalId(): boolean;
    clearOriginalId(): void;
    getOriginalId(): string | undefined;
    setOriginalId(value: string): Linkage;

    hasUpgradedId(): boolean;
    clearUpgradedId(): void;
    getUpgradedId(): string | undefined;
    setUpgradedId(value: string): Linkage;

    hasUpgradedVersion(): boolean;
    clearUpgradedVersion(): void;
    getUpgradedVersion(): number | undefined;
    setUpgradedVersion(value: number): Linkage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Linkage.AsObject;
    static toObject(includeInstance: boolean, msg: Linkage): Linkage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Linkage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Linkage;
    static deserializeBinaryFromReader(message: Linkage, reader: jspb.BinaryReader): Linkage;
}

export namespace Linkage {
    export type AsObject = {
        originalId?: string,
        upgradedId?: string,
        upgradedVersion?: number,
    }
}

export enum Ability {
    ABILITY_UNKNOWN = 0,
    COPY = 1,
    DROP = 2,
    STORE = 3,
    KEY = 4,
}
