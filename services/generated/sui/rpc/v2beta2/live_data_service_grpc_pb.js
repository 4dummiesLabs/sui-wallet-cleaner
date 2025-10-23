// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('@grpc/grpc-js');
var sui_rpc_v2beta2_live_data_service_pb = require('../../../sui/rpc/v2beta2/live_data_service_pb.js');
var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js');
var google_protobuf_struct_pb = require('google-protobuf/google/protobuf/struct_pb.js');
var sui_rpc_v2beta2_argument_pb = require('../../../sui/rpc/v2beta2/argument_pb.js');
var sui_rpc_v2beta2_bcs_pb = require('../../../sui/rpc/v2beta2/bcs_pb.js');
var sui_rpc_v2beta2_executed_transaction_pb = require('../../../sui/rpc/v2beta2/executed_transaction_pb.js');
var sui_rpc_v2beta2_object_pb = require('../../../sui/rpc/v2beta2/object_pb.js');
var sui_rpc_v2beta2_transaction_pb = require('../../../sui/rpc/v2beta2/transaction_pb.js');

function serialize_sui_rpc_v2beta2_GetBalanceRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetBalanceRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetBalanceRequest(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetBalanceResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetBalanceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetBalanceResponse(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetCoinInfoRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetCoinInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetCoinInfoRequest(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetCoinInfoResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetCoinInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetCoinInfoResponse(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListBalancesRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListBalancesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListBalancesRequest(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListBalancesResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListBalancesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListBalancesResponse(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListDynamicFieldsRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListDynamicFieldsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListDynamicFieldsRequest(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListDynamicFieldsResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListDynamicFieldsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListDynamicFieldsResponse(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListOwnedObjectsRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListOwnedObjectsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListOwnedObjectsRequest(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListOwnedObjectsResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListOwnedObjectsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListOwnedObjectsResponse(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_SimulateTransactionRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.SimulateTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_SimulateTransactionRequest(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_SimulateTransactionResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.SimulateTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_SimulateTransactionResponse(buffer_arg) {
  return sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LiveDataServiceService = exports.LiveDataServiceService = {
  listDynamicFields: {
    path: '/sui.rpc.v2beta2.LiveDataService/ListDynamicFields',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsRequest,
    responseType: sui_rpc_v2beta2_live_data_service_pb.ListDynamicFieldsResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_ListDynamicFieldsRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_ListDynamicFieldsRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_ListDynamicFieldsResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_ListDynamicFieldsResponse,
  },
  listOwnedObjects: {
    path: '/sui.rpc.v2beta2.LiveDataService/ListOwnedObjects',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsRequest,
    responseType: sui_rpc_v2beta2_live_data_service_pb.ListOwnedObjectsResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_ListOwnedObjectsRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_ListOwnedObjectsRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_ListOwnedObjectsResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_ListOwnedObjectsResponse,
  },
  getCoinInfo: {
    path: '/sui.rpc.v2beta2.LiveDataService/GetCoinInfo',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoRequest,
    responseType: sui_rpc_v2beta2_live_data_service_pb.GetCoinInfoResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetCoinInfoRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetCoinInfoRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetCoinInfoResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetCoinInfoResponse,
  },
  getBalance: {
    path: '/sui.rpc.v2beta2.LiveDataService/GetBalance',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_live_data_service_pb.GetBalanceRequest,
    responseType: sui_rpc_v2beta2_live_data_service_pb.GetBalanceResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetBalanceRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetBalanceRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetBalanceResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetBalanceResponse,
  },
  listBalances: {
    path: '/sui.rpc.v2beta2.LiveDataService/ListBalances',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_live_data_service_pb.ListBalancesRequest,
    responseType: sui_rpc_v2beta2_live_data_service_pb.ListBalancesResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_ListBalancesRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_ListBalancesRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_ListBalancesResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_ListBalancesResponse,
  },
  simulateTransaction: {
    path: '/sui.rpc.v2beta2.LiveDataService/SimulateTransaction',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionRequest,
    responseType: sui_rpc_v2beta2_live_data_service_pb.SimulateTransactionResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_SimulateTransactionRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_SimulateTransactionRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_SimulateTransactionResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_SimulateTransactionResponse,
  },
};

exports.LiveDataServiceClient = grpc.makeGenericClientConstructor(LiveDataServiceService, 'LiveDataService');
