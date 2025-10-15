// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('@grpc/grpc-js');
var sui_rpc_v2beta2_move_package_service_pb = require('../../../sui/rpc/v2beta2/move_package_service_pb.js');
var sui_rpc_v2beta2_move_package_pb = require('../../../sui/rpc/v2beta2/move_package_pb.js');

function serialize_sui_rpc_v2beta2_GetDatatypeRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetDatatypeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetDatatypeRequest(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetDatatypeResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetDatatypeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetDatatypeResponse(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetFunctionRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetFunctionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetFunctionRequest(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetFunctionResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetFunctionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetFunctionResponse(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetPackageRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetPackageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetPackageRequest(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_GetPackageResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.GetPackageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_GetPackageResponse(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListPackageVersionsRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListPackageVersionsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListPackageVersionsRequest(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_ListPackageVersionsResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.ListPackageVersionsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_ListPackageVersionsResponse(buffer_arg) {
  return sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MovePackageServiceService = exports.MovePackageServiceService = {
  getPackage: {
    path: '/sui.rpc.v2beta2.MovePackageService/GetPackage',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_move_package_service_pb.GetPackageRequest,
    responseType: sui_rpc_v2beta2_move_package_service_pb.GetPackageResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetPackageRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetPackageRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetPackageResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetPackageResponse,
  },
  getDatatype: {
    path: '/sui.rpc.v2beta2.MovePackageService/GetDatatype',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeRequest,
    responseType: sui_rpc_v2beta2_move_package_service_pb.GetDatatypeResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetDatatypeRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetDatatypeRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetDatatypeResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetDatatypeResponse,
  },
  getFunction: {
    path: '/sui.rpc.v2beta2.MovePackageService/GetFunction',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_move_package_service_pb.GetFunctionRequest,
    responseType: sui_rpc_v2beta2_move_package_service_pb.GetFunctionResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_GetFunctionRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_GetFunctionRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_GetFunctionResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_GetFunctionResponse,
  },
  listPackageVersions: {
    path: '/sui.rpc.v2beta2.MovePackageService/ListPackageVersions',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsRequest,
    responseType: sui_rpc_v2beta2_move_package_service_pb.ListPackageVersionsResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_ListPackageVersionsRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_ListPackageVersionsRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_ListPackageVersionsResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_ListPackageVersionsResponse,
  },
};

exports.MovePackageServiceClient = grpc.makeGenericClientConstructor(MovePackageServiceService, 'MovePackageService');
