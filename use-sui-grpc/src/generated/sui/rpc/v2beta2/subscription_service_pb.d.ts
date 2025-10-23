// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/subscription_service.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as sui_rpc_v2beta2_checkpoint_pb from "../../../sui/rpc/v2beta2/checkpoint_pb";

export class SubscribeCheckpointsRequest extends jspb.Message { 

    hasReadMask(): boolean;
    clearReadMask(): void;
    getReadMask(): google_protobuf_field_mask_pb.FieldMask | undefined;
    setReadMask(value?: google_protobuf_field_mask_pb.FieldMask): SubscribeCheckpointsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeCheckpointsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeCheckpointsRequest): SubscribeCheckpointsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeCheckpointsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeCheckpointsRequest;
    static deserializeBinaryFromReader(message: SubscribeCheckpointsRequest, reader: jspb.BinaryReader): SubscribeCheckpointsRequest;
}

export namespace SubscribeCheckpointsRequest {
    export type AsObject = {
        readMask?: google_protobuf_field_mask_pb.FieldMask.AsObject,
    }
}

export class SubscribeCheckpointsResponse extends jspb.Message { 

    hasCursor(): boolean;
    clearCursor(): void;
    getCursor(): number | undefined;
    setCursor(value: number): SubscribeCheckpointsResponse;

    hasCheckpoint(): boolean;
    clearCheckpoint(): void;
    getCheckpoint(): sui_rpc_v2beta2_checkpoint_pb.Checkpoint | undefined;
    setCheckpoint(value?: sui_rpc_v2beta2_checkpoint_pb.Checkpoint): SubscribeCheckpointsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SubscribeCheckpointsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SubscribeCheckpointsResponse): SubscribeCheckpointsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SubscribeCheckpointsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SubscribeCheckpointsResponse;
    static deserializeBinaryFromReader(message: SubscribeCheckpointsResponse, reader: jspb.BinaryReader): SubscribeCheckpointsResponse;
}

export namespace SubscribeCheckpointsResponse {
    export type AsObject = {
        cursor?: number,
        checkpoint?: sui_rpc_v2beta2_checkpoint_pb.Checkpoint.AsObject,
    }
}
