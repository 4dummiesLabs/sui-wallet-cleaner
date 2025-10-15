// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
//
'use strict';
var grpc = require('@grpc/grpc-js');
var sui_rpc_v2beta2_signature_verification_service_pb = require('../../../sui/rpc/v2beta2/signature_verification_service_pb.js');
var sui_rpc_v2beta2_bcs_pb = require('../../../sui/rpc/v2beta2/bcs_pb.js');
var sui_rpc_v2beta2_signature_pb = require('../../../sui/rpc/v2beta2/signature_pb.js');
var sui_rpc_v2beta2_transaction_pb = require('../../../sui/rpc/v2beta2/transaction_pb.js');

function serialize_sui_rpc_v2beta2_VerifySignatureRequest(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.VerifySignatureRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_VerifySignatureRequest(buffer_arg) {
  return sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_sui_rpc_v2beta2_VerifySignatureResponse(arg) {
  if (!(arg instanceof sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse)) {
    throw new Error('Expected argument of type sui.rpc.v2beta2.VerifySignatureResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_sui_rpc_v2beta2_VerifySignatureResponse(buffer_arg) {
  return sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SignatureVerificationServiceService = exports.SignatureVerificationServiceService = {
  // Perform signature verification of a UserSignature against the provided message.
verifySignature: {
    path: '/sui.rpc.v2beta2.SignatureVerificationService/VerifySignature',
    requestStream: false,
    responseStream: false,
    requestType: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest,
    responseType: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse,
    requestSerialize: serialize_sui_rpc_v2beta2_VerifySignatureRequest,
    requestDeserialize: deserialize_sui_rpc_v2beta2_VerifySignatureRequest,
    responseSerialize: serialize_sui_rpc_v2beta2_VerifySignatureResponse,
    responseDeserialize: deserialize_sui_rpc_v2beta2_VerifySignatureResponse,
  },
};

exports.SignatureVerificationServiceClient = grpc.makeGenericClientConstructor(SignatureVerificationServiceService, 'SignatureVerificationService');
