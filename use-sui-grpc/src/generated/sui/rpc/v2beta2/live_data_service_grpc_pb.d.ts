// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/live_data_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as sui_rpc_v2beta2_live_data_service_pb from "../../../sui/rpc/v2beta2/live_data_service_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as google_protobuf_struct_pb from "google-protobuf/google/protobuf/struct_pb";
import * as sui_rpc_v2beta2_argument_pb from "../../../sui/rpc/v2beta2/argument_pb";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_executed_transaction_pb from "../../../sui/rpc/v2beta2/executed_transaction_pb";
import * as sui_rpc_v2beta2_object_pb from "../../../sui/rpc/v2beta2/object_pb";
import * as sui_rpc_v2beta2_transaction_pb from "../../../sui/rpc/v2beta2/transaction_pb";

interface ILiveDataServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    listDynamicFields: ILiveDataServiceService_IListDynamicFields;
    listOwnedObjects: ILiveDataServiceService_IListOwnedObjects;
    getCoinInfo: ILiveDataServiceService_IGetCoinInfo;
    getBalance: ILiveDataServiceService_IGetBalance;
    listBalances: ILiveDataServiceService_IListBalances;
    simulateTransaction: ILiveDataServiceService_ISimulateTransaction;
}

interface ILiveDataServiceService_IListDynamicFields extends grpc.MethodDefinition<sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse> {
    path: "/sui.rpc.v2beta2.LiveDataService/ListDynamicFields";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse>;
}
interface ILiveDataServiceService_IListOwnedObjects extends grpc.MethodDefinition<sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse> {
    path: "/sui.rpc.v2beta2.LiveDataService/ListOwnedObjects";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse>;
}
interface ILiveDataServiceService_IGetCoinInfo extends grpc.MethodDefinition<sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse> {
    path: "/sui.rpc.v2beta2.LiveDataService/GetCoinInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse>;
}
interface ILiveDataServiceService_IGetBalance extends grpc.MethodDefinition<sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse> {
    path: "/sui.rpc.v2beta2.LiveDataService/GetBalance";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse>;
}
interface ILiveDataServiceService_IListBalances extends grpc.MethodDefinition<sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse> {
    path: "/sui.rpc.v2beta2.LiveDataService/ListBalances";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse>;
}
interface ILiveDataServiceService_ISimulateTransaction extends grpc.MethodDefinition<sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse> {
    path: "/sui.rpc.v2beta2.LiveDataService/SimulateTransaction";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse>;
}

export const LiveDataServiceService: ILiveDataServiceService;

export interface ILiveDataServiceServer extends grpc.UntypedServiceImplementation {
    listDynamicFields: grpc.handleUnaryCall<sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse>;
    listOwnedObjects: grpc.handleUnaryCall<sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse>;
    getCoinInfo: grpc.handleUnaryCall<sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse>;
    getBalance: grpc.handleUnaryCall<sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse>;
    listBalances: grpc.handleUnaryCall<sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse>;
    simulateTransaction: grpc.handleUnaryCall<sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse>;
}

export interface ILiveDataServiceClient {
    listDynamicFields(request: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse) => void): grpc.ClientUnaryCall;
    listDynamicFields(request: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse) => void): grpc.ClientUnaryCall;
    listDynamicFields(request: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse) => void): grpc.ClientUnaryCall;
    listOwnedObjects(request: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse) => void): grpc.ClientUnaryCall;
    listOwnedObjects(request: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse) => void): grpc.ClientUnaryCall;
    listOwnedObjects(request: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse) => void): grpc.ClientUnaryCall;
    getCoinInfo(request: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse) => void): grpc.ClientUnaryCall;
    getCoinInfo(request: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse) => void): grpc.ClientUnaryCall;
    getCoinInfo(request: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse) => void): grpc.ClientUnaryCall;
    getBalance(request: sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse) => void): grpc.ClientUnaryCall;
    getBalance(request: sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse) => void): grpc.ClientUnaryCall;
    getBalance(request: sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse) => void): grpc.ClientUnaryCall;
    listBalances(request: sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse) => void): grpc.ClientUnaryCall;
    listBalances(request: sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse) => void): grpc.ClientUnaryCall;
    listBalances(request: sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse) => void): grpc.ClientUnaryCall;
    simulateTransaction(request: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse) => void): grpc.ClientUnaryCall;
    simulateTransaction(request: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse) => void): grpc.ClientUnaryCall;
    simulateTransaction(request: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse) => void): grpc.ClientUnaryCall;
}

export class LiveDataServiceClient extends grpc.Client implements ILiveDataServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public listDynamicFields(request: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse) => void): grpc.ClientUnaryCall;
    public listDynamicFields(request: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse) => void): grpc.ClientUnaryCall;
    public listDynamicFields(request: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse) => void): grpc.ClientUnaryCall;
    public listOwnedObjects(request: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse) => void): grpc.ClientUnaryCall;
    public listOwnedObjects(request: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse) => void): grpc.ClientUnaryCall;
    public listOwnedObjects(request: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse) => void): grpc.ClientUnaryCall;
    public getCoinInfo(request: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse) => void): grpc.ClientUnaryCall;
    public getCoinInfo(request: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse) => void): grpc.ClientUnaryCall;
    public getCoinInfo(request: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse) => void): grpc.ClientUnaryCall;
    public getBalance(request: sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse) => void): grpc.ClientUnaryCall;
    public getBalance(request: sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse) => void): grpc.ClientUnaryCall;
    public getBalance(request: sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse) => void): grpc.ClientUnaryCall;
    public listBalances(request: sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse) => void): grpc.ClientUnaryCall;
    public listBalances(request: sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse) => void): grpc.ClientUnaryCall;
    public listBalances(request: sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse) => void): grpc.ClientUnaryCall;
    public simulateTransaction(request: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse) => void): grpc.ClientUnaryCall;
    public simulateTransaction(request: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse) => void): grpc.ClientUnaryCall;
    public simulateTransaction(request: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse) => void): grpc.ClientUnaryCall;
}
