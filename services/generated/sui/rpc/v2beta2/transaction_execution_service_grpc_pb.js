// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('@grpc/grpc-js');
var sui_rpc_v2beta2_transaction_execution_service_pb = require('../../../sui/rpc/v2beta2/transaction_execution_service_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');
var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js');
var sui_rpc_v2beta2_executed_transaction_pb = require('../../../sui/rpc/v2beta2/executed_transaction_pb.js');
var sui_rpc_v2beta2_signature_pb = require('../../../sui/rpc/v2beta2/signature_pb.js');
var sui_rpc_v2beta2_transaction_pb = require('../../../sui/rpc/v2beta2/transaction_pb.js');

function serialize_sui_rpc_v2beta2_ExecuteTransactionRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ExecuteTransactionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ExecuteTransactionRequest(buffer_arg) {
  return sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ExecuteTransactionResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ExecuteTransactionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ExecuteTransactionResponse(buffer_arg) {
  return sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TransactionExecutionServiceService = exports.TransactionExecutionServiceService = {
  executeTransaction: {
    path: '/sui.rpc.v2beta2.TransactionExecutionService/ExecuteTransaction',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionRequest,
    responseType: sui_rpc_v2beta2_transaction_execution_service_pb.ExecuteTransactionResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_ExecuteTransactionRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_ExecuteTransactionRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_ExecuteTransactionResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_ExecuteTransactionResponse,
  },
  // TODO move simulate transaction here for GA release
// rpc SimulateTransaction(SimulateTransactionRequest) returns (SimulateTransactionResponse);
};

exports.TransactionExecutionServiceClient = grpc.makeGenericClientConstructor(TransactionExecutionServiceService, 'TransactionExecutionService');
