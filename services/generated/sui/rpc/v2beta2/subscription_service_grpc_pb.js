// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('@grpc/grpc-js');
var sui_rpc_v2beta2_subscription_service_pb = require('../../../sui/rpc/v2beta2/subscription_service_pb.js');
var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js');
var sui_rpc_v2beta2_checkpoint_pb = require('../../../sui/rpc/v2beta2/checkpoint_pb.js');

function serialize_sui_rpc_v2beta2_SubscribeCheckpointsRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.SubscribeCheckpointsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_SubscribeCheckpointsRequest(buffer_arg) {
  return sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_SubscribeCheckpointsResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.SubscribeCheckpointsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_SubscribeCheckpointsResponse(buffer_arg) {
  return sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SubscriptionServiceService = exports.SubscriptionServiceService = {
  // Subscribe to the stream of checkpoints.
//
// This API provides a subscription to the checkpoint stream for the Sui
// blockchain. When a subscription is initialized the stream will begin with
// the latest executed checkpoint as seen by the server. Responses are
// guaranteed to return checkpoints in-order and without gaps. This enables
// clients to know exactly the last checkpoint they have processed and in the
// event the subscription terminates (either by the client/server or by the
// connection breaking), clients will be able to reinitailize a subscription
// and then leverage other APIs in order to request data for the checkpoints
// they missed.
subscribeCheckpoints: {
    path: '/sui.rpc.v2beta2.SubscriptionService/SubscribeCheckpoints',
    requestStream: false,
    responseStream: true,
    requestType: sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsRequest,
    responseType: sui_rpc_v2beta2_subscription_service_pb.SubscribeCheckpointsResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_SubscribeCheckpointsRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_SubscribeCheckpointsRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_SubscribeCheckpointsResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_SubscribeCheckpointsResponse,
  },
};

exports.SubscriptionServiceClient = grpc.makeGenericClientConstructor(SubscriptionServiceService, 'SubscriptionService');
