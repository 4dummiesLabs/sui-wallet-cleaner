// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/protocol_config.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class ProtocolConfig extends jspb.Message { 

    hasProtocolVersion(): boolean;
    clearProtocolVersion(): void;
    getProtocolVersion(): number | undefined;
    setProtocolVersion(value: number): ProtocolConfig;

    getFeatureFlagsMap(): jspb.Map<string, boolean>;
    clearFeatureFlagsMap(): void;

    getAttributesMap(): jspb.Map<string, string>;
    clearAttributesMap(): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ProtocolConfig.AsObject;
    static toObject(includeInstance: boolean, msg: ProtocolConfig): ProtocolConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ProtocolConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ProtocolConfig;
    static deserializeBinaryFromReader(message: ProtocolConfig, reader: jspb.BinaryReader): ProtocolConfig;
}

export namespace ProtocolConfig {
    export type AsObject = {
        protocolVersion?: number,

        featureFlagsMap: Array<[string, boolean]>,

        attributesMap: Array<[string, string]>,
    }
}
