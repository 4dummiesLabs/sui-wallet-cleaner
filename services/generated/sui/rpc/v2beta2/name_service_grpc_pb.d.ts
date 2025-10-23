// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/name_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as sui_rpc_v2beta2_name_service_pb from "../../../sui/rpc/v2beta2/name_service_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

interface INameServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    lookupName: INameServiceService_ILookupName;
    reverseLookupName: INameServiceService_IReverseLookupName;
}

interface INameServiceService_ILookupName extends grpc.MethodDefinition<sui_rpc_v2beta2_name_service_pb.LookupNameRequest, sui_rpc_v2beta2_name_service_pb.LookupNameResponse> {
    path: "/sui.rpc.v2beta2.NameService/LookupName";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_name_service_pb.LookupNameRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_name_service_pb.LookupNameRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_name_service_pb.LookupNameResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_name_service_pb.LookupNameResponse>;
}
interface INameServiceService_IReverseLookupName extends grpc.MethodDefinition<sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse> {
    path: "/sui.rpc.v2beta2.NameService/ReverseLookupName";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse>;
}

export const NameServiceService: INameServiceService;

export interface INameServiceServer extends grpc.UntypedServiceImplementation {
    lookupName: grpc.handleUnaryCall<sui_rpc_v2beta2_name_service_pb.LookupNameRequest, sui_rpc_v2beta2_name_service_pb.LookupNameResponse>;
    reverseLookupName: grpc.handleUnaryCall<sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse>;
}

export interface INameServiceClient {
    lookupName(request: sui_rpc_v2beta2_name_service_pb.LookupNameRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.LookupNameResponse) => void): grpc.ClientUnaryCall;
    lookupName(request: sui_rpc_v2beta2_name_service_pb.LookupNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.LookupNameResponse) => void): grpc.ClientUnaryCall;
    lookupName(request: sui_rpc_v2beta2_name_service_pb.LookupNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.LookupNameResponse) => void): grpc.ClientUnaryCall;
    reverseLookupName(request: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse) => void): grpc.ClientUnaryCall;
    reverseLookupName(request: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse) => void): grpc.ClientUnaryCall;
    reverseLookupName(request: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse) => void): grpc.ClientUnaryCall;
}

export class NameServiceClient extends grpc.Client implements INameServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public lookupName(request: sui_rpc_v2beta2_name_service_pb.LookupNameRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.LookupNameResponse) => void): grpc.ClientUnaryCall;
    public lookupName(request: sui_rpc_v2beta2_name_service_pb.LookupNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.LookupNameResponse) => void): grpc.ClientUnaryCall;
    public lookupName(request: sui_rpc_v2beta2_name_service_pb.LookupNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.LookupNameResponse) => void): grpc.ClientUnaryCall;
    public reverseLookupName(request: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse) => void): grpc.ClientUnaryCall;
    public reverseLookupName(request: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse) => void): grpc.ClientUnaryCall;
    public reverseLookupName(request: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse) => void): grpc.ClientUnaryCall;
}
