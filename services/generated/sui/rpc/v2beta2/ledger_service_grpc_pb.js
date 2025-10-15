// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('@grpc/grpc-js');
var sui_rpc_v2beta2_ledger_service_pb = require('../../../sui/rpc/v2beta2/ledger_service_pb.js');
var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');
var google_rpc_status_pb = require('../../../google/rpc/status_pb.js');
var sui_rpc_v2beta2_checkpoint_pb = require('../../../sui/rpc/v2beta2/checkpoint_pb.js');
var sui_rpc_v2beta2_epoch_pb = require('../../../sui/rpc/v2beta2/epoch_pb.js');
var sui_rpc_v2beta2_executed_transaction_pb = require('../../../sui/rpc/v2beta2/executed_transaction_pb.js');
var sui_rpc_v2beta2_object_pb = require('../../../sui/rpc/v2beta2/object_pb.js');

function serialize_sui_rpc_v2beta2_BatchGetObjectsRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.BatchGetObjectsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_BatchGetObjectsRequest(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_BatchGetObjectsResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.BatchGetObjectsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_BatchGetObjectsResponse(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_BatchGetTransactionsRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.BatchGetTransactionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_BatchGetTransactionsRequest(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_BatchGetTransactionsResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.BatchGetTransactionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_BatchGetTransactionsResponse(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetCheckpointRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetCheckpointRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetCheckpointRequest(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetCheckpointResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetCheckpointResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetCheckpointResponse(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetEpochRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetEpochRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetEpochRequest(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetEpochResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetEpochResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetEpochResponse(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetObjectRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetObjectRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetObjectRequest(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetObjectResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetObjectResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetObjectResponse(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetServiceInfoRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetServiceInfoRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetServiceInfoRequest(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetServiceInfoResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetServiceInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetServiceInfoResponse(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetTransactionRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetTransactionRequest(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetTransactionResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetTransactionResponse(buffer_arg) {
  return sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var LedgerServiceService = exports.LedgerServiceService = {
  // Query the service for general information about its current state.
getServiceInfo: {
    path: '/sui.rpc.v2beta2.LedgerService/GetServiceInfo',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoRequest,
    responseType: sui_rpc_v2beta2_ledger_service_pb.GetServiceInfoResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetServiceInfoRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetServiceInfoRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetServiceInfoResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetServiceInfoResponse,
  },
  getObject: {
    path: '/sui.rpc.v2beta2.LedgerService/GetObject',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_ledger_service_pb.GetObjectRequest,
    responseType: sui_rpc_v2beta2_ledger_service_pb.GetObjectResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetObjectRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetObjectRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetObjectResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetObjectResponse,
  },
  batchGetObjects: {
    path: '/sui.rpc.v2beta2.LedgerService/BatchGetObjects',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsRequest,
    responseType: sui_rpc_v2beta2_ledger_service_pb.BatchGetObjectsResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_BatchGetObjectsRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_BatchGetObjectsRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_BatchGetObjectsResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_BatchGetObjectsResponse,
  },
  getTransaction: {
    path: '/sui.rpc.v2beta2.LedgerService/GetTransaction',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_ledger_service_pb.GetTransactionRequest,
    responseType: sui_rpc_v2beta2_ledger_service_pb.GetTransactionResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetTransactionRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetTransactionRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetTransactionResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetTransactionResponse,
  },
  batchGetTransactions: {
    path: '/sui.rpc.v2beta2.LedgerService/BatchGetTransactions',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsRequest,
    responseType: sui_rpc_v2beta2_ledger_service_pb.BatchGetTransactionsResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_BatchGetTransactionsRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_BatchGetTransactionsRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_BatchGetTransactionsResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_BatchGetTransactionsResponse,
  },
  getCheckpoint: {
    path: '/sui.rpc.v2beta2.LedgerService/GetCheckpoint',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointRequest,
    responseType: sui_rpc_v2beta2_ledger_service_pb.GetCheckpointResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetCheckpointRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetCheckpointRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetCheckpointResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetCheckpointResponse,
  },
  getEpoch: {
    path: '/sui.rpc.v2beta2.LedgerService/GetEpoch',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_ledger_service_pb.GetEpochRequest,
    responseType: sui_rpc_v2beta2_ledger_service_pb.GetEpochResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetEpochRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetEpochRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetEpochResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetEpochResponse,
  },
};

exports.LedgerServiceClient = grpc.makeGenericClientConstructor(LedgerServiceService, 'LedgerService');
