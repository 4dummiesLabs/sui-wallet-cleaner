// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('@grpc/grpc-js');
var sui_rpc_v2beta2_name_service_pb = require('../../../sui/rpc/v2beta2/name_service_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_sui_rpc_v2beta2_LookupNameRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_name_service_pb.LookupNameRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.LookupNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_LookupNameRequest(buffer_arg) {
  return sui_rpc_v2beta2_name_service_pb.LookupNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_LookupNameResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_name_service_pb.LookupNameResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.LookupNameResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_LookupNameResponse(buffer_arg) {
  return sui_rpc_v2beta2_name_service_pb.LookupNameResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ReverseLookupNameRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ReverseLookupNameRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ReverseLookupNameRequest(buffer_arg) {
  return sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ReverseLookupNameResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ReverseLookupNameResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ReverseLookupNameResponse(buffer_arg) {
  return sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var NameServiceService = exports.NameServiceService = {
  lookupName: {
    path: '/sui.rpc.v2beta2.NameService/LookupName',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_name_service_pb.LookupNameRequest,
    responseType: sui_rpc_v2beta2_name_service_pb.LookupNameResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_LookupNameRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_LookupNameRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_LookupNameResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_LookupNameResponse,
  },
  reverseLookupName: {
    path: '/sui.rpc.v2beta2.NameService/ReverseLookupName',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameRequest,
    responseType: sui_rpc_v2beta2_name_service_pb.ReverseLookupNameResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_ReverseLookupNameRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_ReverseLookupNameRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_ReverseLookupNameResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_ReverseLookupNameResponse,
  },
};

exports.NameServiceClient = grpc.makeGenericClientConstructor(NameServiceService, 'NameService');
