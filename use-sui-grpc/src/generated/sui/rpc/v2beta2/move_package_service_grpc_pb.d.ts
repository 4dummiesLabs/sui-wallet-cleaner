// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/move_package_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as sui_rpc_v2beta2_move_package_service_pb from "../../../sui/rpc/v2beta2/move_package_service_pb";
import * as sui_rpc_v2beta2_move_package_pb from "../../../sui/rpc/v2beta2/move_package_pb";

interface IMovePackageServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getPackage: IMovePackageServiceService_IGetPackage;
    getDatatype: IMovePackageServiceService_IGetDatatype;
    getFunction: IMovePackageServiceService_IGetFunction;
    listPackageVersions: IMovePackageServiceService_IListPackageVersions;
}

interface IMovePackageServiceService_IGetPackage extends grpc.MethodDefinition<sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse> {
    path: "/sui.rpc.v2beta2.MovePackageService/GetPackage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse>;
}
interface IMovePackageServiceService_IGetDatatype extends grpc.MethodDefinition<sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse> {
    path: "/sui.rpc.v2beta2.MovePackageService/GetDatatype";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse>;
}
interface IMovePackageServiceService_IGetFunction extends grpc.MethodDefinition<sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse> {
    path: "/sui.rpc.v2beta2.MovePackageService/GetFunction";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse>;
}
interface IMovePackageServiceService_IListPackageVersions extends grpc.MethodDefinition<sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse> {
    path: "/sui.rpc.v2beta2.MovePackageService/ListPackageVersions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse>;
}

export const MovePackageServiceService: IMovePackageServiceService;

export interface IMovePackageServiceServer extends grpc.UntypedServiceImplementation {
    getPackage: grpc.handleUnaryCall<sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse>;
    getDatatype: grpc.handleUnaryCall<sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse>;
    getFunction: grpc.handleUnaryCall<sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse>;
    listPackageVersions: grpc.handleUnaryCall<sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse>;
}

export interface IMovePackageServiceClient {
    getPackage(request: sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse) => void): grpc.ClientUnaryCall;
    getPackage(request: sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse) => void): grpc.ClientUnaryCall;
    getPackage(request: sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse) => void): grpc.ClientUnaryCall;
    getDatatype(request: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse) => void): grpc.ClientUnaryCall;
    getDatatype(request: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse) => void): grpc.ClientUnaryCall;
    getDatatype(request: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse) => void): grpc.ClientUnaryCall;
    getFunction(request: sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse) => void): grpc.ClientUnaryCall;
    getFunction(request: sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse) => void): grpc.ClientUnaryCall;
    getFunction(request: sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse) => void): grpc.ClientUnaryCall;
    listPackageVersions(request: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse) => void): grpc.ClientUnaryCall;
    listPackageVersions(request: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse) => void): grpc.ClientUnaryCall;
    listPackageVersions(request: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse) => void): grpc.ClientUnaryCall;
}

export class MovePackageServiceClient extends grpc.Client implements IMovePackageServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getPackage(request: sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse) => void): grpc.ClientUnaryCall;
    public getPackage(request: sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse) => void): grpc.ClientUnaryCall;
    public getPackage(request: sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse) => void): grpc.ClientUnaryCall;
    public getDatatype(request: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse) => void): grpc.ClientUnaryCall;
    public getDatatype(request: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse) => void): grpc.ClientUnaryCall;
    public getDatatype(request: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse) => void): grpc.ClientUnaryCall;
    public getFunction(request: sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse) => void): grpc.ClientUnaryCall;
    public getFunction(request: sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse) => void): grpc.ClientUnaryCall;
    public getFunction(request: sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse) => void): grpc.ClientUnaryCall;
    public listPackageVersions(request: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse) => void): grpc.ClientUnaryCall;
    public listPackageVersions(request: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse) => void): grpc.ClientUnaryCall;
    public listPackageVersions(request: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse) => void): grpc.ClientUnaryCall;
}
