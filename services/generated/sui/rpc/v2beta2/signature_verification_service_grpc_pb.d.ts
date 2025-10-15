// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/signature_verification_service.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as sui_rpc_v2beta2_signature_verification_service_pb from "../../../sui/rpc/v2beta2/signature_verification_service_pb";
import * as sui_rpc_v2beta2_bcs_pb from "../../../sui/rpc/v2beta2/bcs_pb";
import * as sui_rpc_v2beta2_signature_pb from "../../../sui/rpc/v2beta2/signature_pb";
import * as sui_rpc_v2beta2_transaction_pb from "../../../sui/rpc/v2beta2/transaction_pb";

interface ISignatureVerificationServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    verifySignature: ISignatureVerificationServiceService_IVerifySignature;
}

interface ISignatureVerificationServiceService_IVerifySignature extends grpc.MethodDefinition<sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse> {
    path: "/sui.rpc.v2beta2.SignatureVerificationService/VerifySignature";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest>;
    requestDeserialize: grpc.deserialize<sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest>;
    responseSerialize: grpc.serialize<sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse>;
    responseDeserialize: grpc.deserialize<sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse>;
}

export const SignatureVerificationServiceService: ISignatureVerificationServiceService;

export interface ISignatureVerificationServiceServer extends grpc.UntypedServiceImplementation {
    verifySignature: grpc.handleUnaryCall<sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse>;
}

export interface ISignatureVerificationServiceClient {
    verifySignature(request: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse) => void): grpc.ClientUnaryCall;
    verifySignature(request: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse) => void): grpc.ClientUnaryCall;
    verifySignature(request: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse) => void): grpc.ClientUnaryCall;
}

export class SignatureVerificationServiceClient extends grpc.Client implements ISignatureVerificationServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public verifySignature(request: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse) => void): grpc.ClientUnaryCall;
    public verifySignature(request: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse) => void): grpc.ClientUnaryCall;
    public verifySignature(request: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: sui_rpc_v2beta2_signature_verification_service_pb.VerifySignatureResponse) => void): grpc.ClientUnaryCall;
}
