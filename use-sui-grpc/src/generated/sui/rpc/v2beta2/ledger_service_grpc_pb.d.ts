// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/ledger_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as sui_rpc_v2beta2_ledger_service_pb from "../../../sui/rpc/v2beta2/ledger_service_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_rpc_status_pb from "../../../google/rpc/status_pb";
import * as sui_rpc_v2beta2_checkpoint_pb from "../../../sui/rpc/v2beta2/checkpoint_pb";
import * as sui_rpc_v2beta2_epoch_pb from "../../../sui/rpc/v2beta2/epoch_pb";
import * as sui_rpc_v2beta2_executed_transaction_pb from "../../../sui/rpc/v2beta2/executed_transaction_pb";
import * as sui_rpc_v2beta2_object_pb from "../../../sui/rpc/v2beta2/object_pb";

interface ILedgerServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getServiceInfo: ILedgerServiceService_IGetServiceInfo;
    getObject: ILedgerServiceService_IGetObject;
    batchGetObjects: ILedgerServiceService_IBatchGetObjects;
    getTransaction: ILedgerServiceService_IGetTransaction;
    batchGetTransactions: ILedgerServiceService_IBatchGetTransactions;
    getCheckpoint: ILedgerServiceService_IGetCheckpoint;
    getEpoch: ILedgerServiceService_IGetEpoch;
}

interface ILedgerServiceService_IGetServiceInfo extends grpc.MethodDefinition<sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse> {
    path: "/sui.rpc.v2beta2.LedgerService/GetServiceInfo";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse>;
}
interface ILedgerServiceService_IGetObject extends grpc.MethodDefinition<sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse> {
    path: "/sui.rpc.v2beta2.LedgerService/GetObject";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse>;
}
interface ILedgerServiceService_IBatchGetObjects extends grpc.MethodDefinition<sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse> {
    path: "/sui.rpc.v2beta2.LedgerService/BatchGetObjects";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse>;
}
interface ILedgerServiceService_IGetTransaction extends grpc.MethodDefinition<sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse> {
    path: "/sui.rpc.v2beta2.LedgerService/GetTransaction";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse>;
}
interface ILedgerServiceService_IBatchGetTransactions extends grpc.MethodDefinition<sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse> {
    path: "/sui.rpc.v2beta2.LedgerService/BatchGetTransactions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse>;
}
interface ILedgerServiceService_IGetCheckpoint extends grpc.MethodDefinition<sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse> {
    path: "/sui.rpc.v2beta2.LedgerService/GetCheckpoint";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse>;
}
interface ILedgerServiceService_IGetEpoch extends grpc.MethodDefinition<sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse> {
    path: "/sui.rpc.v2beta2.LedgerService/GetEpoch";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse>;
}

export const LedgerServiceService: ILedgerServiceService;

export interface ILedgerServiceServer extends grpc.UntypedServiceImplementation {
    getServiceInfo: grpc.handleUnaryCall<sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse>;
    getObject: grpc.handleUnaryCall<sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse>;
    batchGetObjects: grpc.handleUnaryCall<sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse>;
    getTransaction: grpc.handleUnaryCall<sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse>;
    batchGetTransactions: grpc.handleUnaryCall<sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse>;
    getCheckpoint: grpc.handleUnaryCall<sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse>;
    getEpoch: grpc.handleUnaryCall<sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse>;
}

export interface ILedgerServiceClient {
    getServiceInfo(request: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse) => void): grpc.ClientUnaryCall;
    getServiceInfo(request: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse) => void): grpc.ClientUnaryCall;
    getServiceInfo(request: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse) => void): grpc.ClientUnaryCall;
    getObject(request: sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse) => void): grpc.ClientUnaryCall;
    getObject(request: sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse) => void): grpc.ClientUnaryCall;
    getObject(request: sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse) => void): grpc.ClientUnaryCall;
    batchGetObjects(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse) => void): grpc.ClientUnaryCall;
    batchGetObjects(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse) => void): grpc.ClientUnaryCall;
    batchGetObjects(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse) => void): grpc.ClientUnaryCall;
    getTransaction(request: sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse) => void): grpc.ClientUnaryCall;
    getTransaction(request: sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse) => void): grpc.ClientUnaryCall;
    getTransaction(request: sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse) => void): grpc.ClientUnaryCall;
    batchGetTransactions(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse) => void): grpc.ClientUnaryCall;
    batchGetTransactions(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse) => void): grpc.ClientUnaryCall;
    batchGetTransactions(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse) => void): grpc.ClientUnaryCall;
    getCheckpoint(request: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse) => void): grpc.ClientUnaryCall;
    getCheckpoint(request: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse) => void): grpc.ClientUnaryCall;
    getCheckpoint(request: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse) => void): grpc.ClientUnaryCall;
    getEpoch(request: sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse) => void): grpc.ClientUnaryCall;
    getEpoch(request: sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse) => void): grpc.ClientUnaryCall;
    getEpoch(request: sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse) => void): grpc.ClientUnaryCall;
}

export class LedgerServiceClient extends grpc.Client implements ILedgerServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getServiceInfo(request: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse) => void): grpc.ClientUnaryCall;
    public getServiceInfo(request: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse) => void): grpc.ClientUnaryCall;
    public getServiceInfo(request: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse) => void): grpc.ClientUnaryCall;
    public getObject(request: sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse) => void): grpc.ClientUnaryCall;
    public getObject(request: sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse) => void): grpc.ClientUnaryCall;
    public getObject(request: sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse) => void): grpc.ClientUnaryCall;
    public batchGetObjects(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse) => void): grpc.ClientUnaryCall;
    public batchGetObjects(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse) => void): grpc.ClientUnaryCall;
    public batchGetObjects(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse) => void): grpc.ClientUnaryCall;
    public getTransaction(request: sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse) => void): grpc.ClientUnaryCall;
    public getTransaction(request: sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse) => void): grpc.ClientUnaryCall;
    public getTransaction(request: sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse) => void): grpc.ClientUnaryCall;
    public batchGetTransactions(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse) => void): grpc.ClientUnaryCall;
    public batchGetTransactions(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse) => void): grpc.ClientUnaryCall;
    public batchGetTransactions(request: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse) => void): grpc.ClientUnaryCall;
    public getCheckpoint(request: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse) => void): grpc.ClientUnaryCall;
    public getCheckpoint(request: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse) => void): grpc.ClientUnaryCall;
    public getCheckpoint(request: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse) => void): grpc.ClientUnaryCall;
    public getEpoch(request: sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse) => void): grpc.ClientUnaryCall;
    public getEpoch(request: sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse) => void): grpc.ClientUnaryCall;
    public getEpoch(request: sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse) => void): grpc.ClientUnaryCall;
}
