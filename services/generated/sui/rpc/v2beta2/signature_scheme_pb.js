// source: sui/rpc/v2beta2/signature_scheme.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global = (function() {
  if (this) { return this; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  if (typeof self !== 'undefined') { return self; }
  return Function('return this')();
}.call(null));

goog.exportSymbol('proto.sui.rpc.v2beta2.SignatureScheme', null, global);
/**
 * @enum {number}
 */
proto.sui.rpc.v2beta2.SignatureScheme = {
  ED25519: 0,
  SECP256K1: 1,
  SECP256R1: 2,
  MULTISIG: 3,
  BLS12381: 4,
  ZKLOGIN: 5,
  PASSKEY: 6
};

goog.object.extend(exports, proto.sui.rpc.v2beta2);
