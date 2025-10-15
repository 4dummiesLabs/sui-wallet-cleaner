// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/subscription_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as sui_rpc_v2beta2_subscription_service_pb from "../../../sui/rpc/v2beta2/subscription_service_pb";
import * as google_protobuf_field_mask_pb from "google-protobuf/google/protobuf/field_mask_pb";
import * as sui_rpc_v2beta2_checkpoint_pb from "../../../sui/rpc/v2beta2/checkpoint_pb";

interface ISubscriptionServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    subscribeCheckpoints: ISubscriptionServiceService_ISubscribeCheckpoints;
}

interface ISubscriptionServiceService_ISubscribeCheckpoints extends grpc.MethodDefinition<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest, sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse> {
    path: "/sui.rpc.v2beta2.SubscriptionService/SubscribeCheckpoints";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse>;
}

export const SubscriptionServiceService: ISubscriptionServiceService;

export interface ISubscriptionServiceServer extends grpc.UntypedServiceImplementation {
    subscribeCheckpoints: grpc.handleServerStreamingCall<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest, sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse>;
}

export interface ISubscriptionServiceClient {
    subscribeCheckpoints(request: sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse>;
    subscribeCheckpoints(request: sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse>;
}

export class SubscriptionServiceClient extends grpc.Client implements ISubscriptionServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public subscribeCheckpoints(request: sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse>;
    public subscribeCheckpoints(request: sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse>;
}
