// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/event.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";

export class TransactionEvents extends jspb.Message { 

    hasBcs(): boolean;
    clearBcs(): void;
    getBcs(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setBcs(value?: sui_rpc_v2beta2_bcs_pb.Bcs): TransactionEvents;

    hasDigest(): boolean;
    clearDigest(): void;
    getDigest(): string | undefined;
    setDigest(value: string): TransactionEvents;
    clearEventsList(): void;
    getEventsList(): Array<Event>;
    setEventsList(value: Array<Event>): TransactionEvents;
    addEvents(value?: Event, index?: number): Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TransactionEvents.AsObject;
    static toObject(includeInstance: boolean, msg: TransactionEvents): TransactionEvents.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TransactionEvents, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TransactionEvents;
    static deserializeBinaryFromReader(message: TransactionEvents, reader: jspb.BinaryReader): TransactionEvents;
}

export namespace TransactionEvents {
    export type AsObject = {
        bcs?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        digest?: string,
        eventsList: Array<Event.AsObject>,
    }
}

export class Event extends jspb.Message { 

    hasPackageId(): boolean;
    clearPackageId(): void;
    getPackageId(): string | undefined;
    setPackageId(value: string): Event;

    hasModule(): boolean;
    clearModule(): void;
    getModule(): string | undefined;
    setModule(value: string): Event;

    hasSender(): boolean;
    clearSender(): void;
    getSender(): string | undefined;
    setSender(value: string): Event;

    hasEventType(): boolean;
    clearEventType(): void;
    getEventType(): string | undefined;
    setEventType(value: string): Event;

    hasContents(): boolean;
    clearContents(): void;
    getContents(): sui_rpc_v2beta2_bcs_pb.Bcs | undefined;
    setContents(value?: sui_rpc_v2beta2_bcs_pb.Bcs): Event;

    hasJson(): boolean;
    clearJson(): void;
    getJson(): google_protobuf_struct_pb.Value | undefined;
    setJson(value?: google_protobuf_struct_pb.Value): Event;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Event.AsObject;
    static toObject(includeInstance: boolean, msg: Event): Event.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Event, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Event;
    static deserializeBinaryFromReader(message: Event, reader: jspb.BinaryReader): Event;
}

export namespace Event {
    export type AsObject = {
        packageId?: string,
        module?: string,
        sender?: string,
        eventType?: string,
        contents?: sui_rpc_v2beta2_bcs_pb.Bcs.AsObject,
        json?: google_protobuf_struct_pb.Value.AsObject,
    }
}
