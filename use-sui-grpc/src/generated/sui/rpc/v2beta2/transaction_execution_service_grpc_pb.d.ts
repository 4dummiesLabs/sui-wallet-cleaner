// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/transaction_execution_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as sui_rpc_v2beta2_transaction_execution_service_pb from "../../../sui/rpc/v2beta2/transaction_execution_service_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as sui_rpc_v2beta2_executed_transaction_pb from "../../../sui/rpc/v2beta2/executed_transaction_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";
import * as sui_rpc_v2beta2_transaction_pb from "../../../sui/rpc/v2beta2/transaction_pb";

interface ITransactionExecutionServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    executeTransaction: ITransactionExecutionServiceService_IExecuteTransaction;
}

interface ITransactionExecutionServiceService_IExecuteTransaction extends grpc.MethodDefinition<sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse> {
    path: "/sui.rpc.v2beta2.TransactionExecutionService/ExecuteTransaction";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse>;
}

export const TransactionExecutionServiceService: ITransactionExecutionServiceService;

export interface ITransactionExecutionServiceServer extends grpc.UntypedServiceImplementation {
    executeTransaction: grpc.handleUnaryCall<sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse>;
}

export interface ITransactionExecutionServiceClient {
    executeTransaction(request: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse) => void): grpc.ClientUnaryCall;
    executeTransaction(request: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse) => void): grpc.ClientUnaryCall;
    executeTransaction(request: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse) => void): grpc.ClientUnaryCall;
}

export class TransactionExecutionServiceClient extends grpc.Client implements ITransactionExecutionServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public executeTransaction(request: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse) => void): grpc.ClientUnaryCall;
    public executeTransaction(request: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse) => void): grpc.ClientUnaryCall;
    public executeTransaction(request: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse) => void): grpc.ClientUnaryCall;
}
