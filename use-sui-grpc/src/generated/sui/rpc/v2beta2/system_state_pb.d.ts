// package: sui.rpc.v2beta2
// file: sui/rpc/v2beta2/system_state.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class SystemState extends jspb.Message { 

    hasVersion(): boolean;
    clearVersion(): void;
    getVersion(): number | undefined;
    setVersion(value: number): SystemState;

    hasEpoch(): boolean;
    clearEpoch(): void;
    getEpoch(): number | undefined;
    setEpoch(value: number): SystemState;

    hasProtocolVersion(): boolean;
    clearProtocolVersion(): void;
    getProtocolVersion(): number | undefined;
    setProtocolVersion(value: number): SystemState;

    hasValidators(): boolean;
    clearValidators(): void;
    getValidators(): ValidatorSet | undefined;
    setValidators(value?: ValidatorSet): SystemState;

    hasStorageFund(): boolean;
    clearStorageFund(): void;
    getStorageFund(): StorageFund | undefined;
    setStorageFund(value?: StorageFund): SystemState;

    hasParameters(): boolean;
    clearParameters(): void;
    getParameters(): SystemParameters | undefined;
    setParameters(value?: SystemParameters): SystemState;

    hasReferenceGasPrice(): boolean;
    clearReferenceGasPrice(): void;
    getReferenceGasPrice(): number | undefined;
    setReferenceGasPrice(value: number): SystemState;
    clearValidatorReportRecordsList(): void;
    getValidatorReportRecordsList(): Array<ValidatorReportRecord>;
    setValidatorReportRecordsList(value: Array<ValidatorReportRecord>): SystemState;
    addValidatorReportRecords(value?: ValidatorReportRecord, index?: number): ValidatorReportRecord;

    hasStakeSubsidy(): boolean;
    clearStakeSubsidy(): void;
    getStakeSubsidy(): StakeSubsidy | undefined;
    setStakeSubsidy(value?: StakeSubsidy): SystemState;

    hasSafeMode(): boolean;
    clearSafeMode(): void;
    getSafeMode(): boolean | undefined;
    setSafeMode(value: boolean): SystemState;

    hasSafeModeStorageRewards(): boolean;
    clearSafeModeStorageRewards(): void;
    getSafeModeStorageRewards(): number | undefined;
    setSafeModeStorageRewards(value: number): SystemState;

    hasSafeModeComputationRewards(): boolean;
    clearSafeModeComputationRewards(): void;
    getSafeModeComputationRewards(): number | undefined;
    setSafeModeComputationRewards(value: number): SystemState;

    hasSafeModeStorageRebates(): boolean;
    clearSafeModeStorageRebates(): void;
    getSafeModeStorageRebates(): number | undefined;
    setSafeModeStorageRebates(value: number): SystemState;

    hasSafeModeNonRefundableStorageFee(): boolean;
    clearSafeModeNonRefundableStorageFee(): void;
    getSafeModeNonRefundableStorageFee(): number | undefined;
    setSafeModeNonRefundableStorageFee(value: number): SystemState;

    hasEpochStartTimestampMs(): boolean;
    clearEpochStartTimestampMs(): void;
    getEpochStartTimestampMs(): number | undefined;
    setEpochStartTimestampMs(value: number): SystemState;

    hasExtraFields(): boolean;
    clearExtraFields(): void;
    getExtraFields(): MoveTable | undefined;
    setExtraFields(value?: MoveTable): SystemState;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemState.AsObject;
    static toObject(includeInstance: boolean, msg: SystemState): SystemState.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemState, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemState;
    static deserializeBinaryFromReader(message: SystemState, reader: jspb.BinaryReader): SystemState;
}

export namespace SystemState {
    export type AsObject = {
        version?: number,
        epoch?: number,
        protocolVersion?: number,
        validators?: ValidatorSet.AsObject,
        storageFund?: StorageFund.AsObject,
        parameters?: SystemParameters.AsObject,
        referenceGasPrice?: number,
        validatorReportRecordsList: Array<ValidatorReportRecord.AsObject>,
        stakeSubsidy?: StakeSubsidy.AsObject,
        safeMode?: boolean,
        safeModeStorageRewards?: number,
        safeModeComputationRewards?: number,
        safeModeStorageRebates?: number,
        safeModeNonRefundableStorageFee?: number,
        epochStartTimestampMs?: number,
        extraFields?: MoveTable.AsObject,
    }
}

export class ValidatorReportRecord extends jspb.Message { 

    hasReported(): boolean;
    clearReported(): void;
    getReported(): string | undefined;
    setReported(value: string): ValidatorReportRecord;
    clearReportersList(): void;
    getReportersList(): Array<string>;
    setReportersList(value: Array<string>): ValidatorReportRecord;
    addReporters(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorReportRecord.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorReportRecord): ValidatorReportRecord.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorReportRecord, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorReportRecord;
    static deserializeBinaryFromReader(message: ValidatorReportRecord, reader: jspb.BinaryReader): ValidatorReportRecord;
}

export namespace ValidatorReportRecord {
    export type AsObject = {
        reported?: string,
        reportersList: Array<string>,
    }
}

export class SystemParameters extends jspb.Message { 

    hasEpochDurationMs(): boolean;
    clearEpochDurationMs(): void;
    getEpochDurationMs(): number | undefined;
    setEpochDurationMs(value: number): SystemParameters;

    hasStakeSubsidyStartEpoch(): boolean;
    clearStakeSubsidyStartEpoch(): void;
    getStakeSubsidyStartEpoch(): number | undefined;
    setStakeSubsidyStartEpoch(value: number): SystemParameters;

    hasMinValidatorCount(): boolean;
    clearMinValidatorCount(): void;
    getMinValidatorCount(): number | undefined;
    setMinValidatorCount(value: number): SystemParameters;

    hasMaxValidatorCount(): boolean;
    clearMaxValidatorCount(): void;
    getMaxValidatorCount(): number | undefined;
    setMaxValidatorCount(value: number): SystemParameters;

    hasMinValidatorJoiningStake(): boolean;
    clearMinValidatorJoiningStake(): void;
    getMinValidatorJoiningStake(): number | undefined;
    setMinValidatorJoiningStake(value: number): SystemParameters;

    hasValidatorLowStakeThreshold(): boolean;
    clearValidatorLowStakeThreshold(): void;
    getValidatorLowStakeThreshold(): number | undefined;
    setValidatorLowStakeThreshold(value: number): SystemParameters;

    hasValidatorVeryLowStakeThreshold(): boolean;
    clearValidatorVeryLowStakeThreshold(): void;
    getValidatorVeryLowStakeThreshold(): number | undefined;
    setValidatorVeryLowStakeThreshold(value: number): SystemParameters;

    hasValidatorLowStakeGracePeriod(): boolean;
    clearValidatorLowStakeGracePeriod(): void;
    getValidatorLowStakeGracePeriod(): number | undefined;
    setValidatorLowStakeGracePeriod(value: number): SystemParameters;

    hasExtraFields(): boolean;
    clearExtraFields(): void;
    getExtraFields(): MoveTable | undefined;
    setExtraFields(value?: MoveTable): SystemParameters;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SystemParameters.AsObject;
    static toObject(includeInstance: boolean, msg: SystemParameters): SystemParameters.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SystemParameters, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SystemParameters;
    static deserializeBinaryFromReader(message: SystemParameters, reader: jspb.BinaryReader): SystemParameters;
}

export namespace SystemParameters {
    export type AsObject = {
        epochDurationMs?: number,
        stakeSubsidyStartEpoch?: number,
        minValidatorCount?: number,
        maxValidatorCount?: number,
        minValidatorJoiningStake?: number,
        validatorLowStakeThreshold?: number,
        validatorVeryLowStakeThreshold?: number,
        validatorLowStakeGracePeriod?: number,
        extraFields?: MoveTable.AsObject,
    }
}

export class MoveTable extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): MoveTable;

    hasSize(): boolean;
    clearSize(): void;
    getSize(): number | undefined;
    setSize(value: number): MoveTable;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): MoveTable.AsObject;
    static toObject(includeInstance: boolean, msg: MoveTable): MoveTable.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: MoveTable, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): MoveTable;
    static deserializeBinaryFromReader(message: MoveTable, reader: jspb.BinaryReader): MoveTable;
}

export namespace MoveTable {
    export type AsObject = {
        id?: string,
        size?: number,
    }
}

export class StakeSubsidy extends jspb.Message { 

    hasBalance(): boolean;
    clearBalance(): void;
    getBalance(): number | undefined;
    setBalance(value: number): StakeSubsidy;

    hasDistributionCounter(): boolean;
    clearDistributionCounter(): void;
    getDistributionCounter(): number | undefined;
    setDistributionCounter(value: number): StakeSubsidy;

    hasCurrentDistributionAmount(): boolean;
    clearCurrentDistributionAmount(): void;
    getCurrentDistributionAmount(): number | undefined;
    setCurrentDistributionAmount(value: number): StakeSubsidy;

    hasStakeSubsidyPeriodLength(): boolean;
    clearStakeSubsidyPeriodLength(): void;
    getStakeSubsidyPeriodLength(): number | undefined;
    setStakeSubsidyPeriodLength(value: number): StakeSubsidy;

    hasStakeSubsidyDecreaseRate(): boolean;
    clearStakeSubsidyDecreaseRate(): void;
    getStakeSubsidyDecreaseRate(): number | undefined;
    setStakeSubsidyDecreaseRate(value: number): StakeSubsidy;

    hasExtraFields(): boolean;
    clearExtraFields(): void;
    getExtraFields(): MoveTable | undefined;
    setExtraFields(value?: MoveTable): StakeSubsidy;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StakeSubsidy.AsObject;
    static toObject(includeInstance: boolean, msg: StakeSubsidy): StakeSubsidy.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StakeSubsidy, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StakeSubsidy;
    static deserializeBinaryFromReader(message: StakeSubsidy, reader: jspb.BinaryReader): StakeSubsidy;
}

export namespace StakeSubsidy {
    export type AsObject = {
        balance?: number,
        distributionCounter?: number,
        currentDistributionAmount?: number,
        stakeSubsidyPeriodLength?: number,
        stakeSubsidyDecreaseRate?: number,
        extraFields?: MoveTable.AsObject,
    }
}

export class StorageFund extends jspb.Message { 

    hasTotalObjectStorageRebates(): boolean;
    clearTotalObjectStorageRebates(): void;
    getTotalObjectStorageRebates(): number | undefined;
    setTotalObjectStorageRebates(value: number): StorageFund;

    hasNonRefundableBalance(): boolean;
    clearNonRefundableBalance(): void;
    getNonRefundableBalance(): number | undefined;
    setNonRefundableBalance(value: number): StorageFund;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StorageFund.AsObject;
    static toObject(includeInstance: boolean, msg: StorageFund): StorageFund.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StorageFund, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StorageFund;
    static deserializeBinaryFromReader(message: StorageFund, reader: jspb.BinaryReader): StorageFund;
}

export namespace StorageFund {
    export type AsObject = {
        totalObjectStorageRebates?: number,
        nonRefundableBalance?: number,
    }
}

export class ValidatorSet extends jspb.Message { 

    hasTotalStake(): boolean;
    clearTotalStake(): void;
    getTotalStake(): number | undefined;
    setTotalStake(value: number): ValidatorSet;
    clearActiveValidatorsList(): void;
    getActiveValidatorsList(): Array<Validator>;
    setActiveValidatorsList(value: Array<Validator>): ValidatorSet;
    addActiveValidators(value?: Validator, index?: number): Validator;

    hasPendingActiveValidators(): boolean;
    clearPendingActiveValidators(): void;
    getPendingActiveValidators(): MoveTable | undefined;
    setPendingActiveValidators(value?: MoveTable): ValidatorSet;
    clearPendingRemovalsList(): void;
    getPendingRemovalsList(): Array<number>;
    setPendingRemovalsList(value: Array<number>): ValidatorSet;
    addPendingRemovals(value: number, index?: number): number;

    hasStakingPoolMappings(): boolean;
    clearStakingPoolMappings(): void;
    getStakingPoolMappings(): MoveTable | undefined;
    setStakingPoolMappings(value?: MoveTable): ValidatorSet;

    hasInactiveValidators(): boolean;
    clearInactiveValidators(): void;
    getInactiveValidators(): MoveTable | undefined;
    setInactiveValidators(value?: MoveTable): ValidatorSet;

    hasValidatorCandidates(): boolean;
    clearValidatorCandidates(): void;
    getValidatorCandidates(): MoveTable | undefined;
    setValidatorCandidates(value?: MoveTable): ValidatorSet;

    getAtRiskValidatorsMap(): jspb.Map<string, number>;
    clearAtRiskValidatorsMap(): void;

    hasExtraFields(): boolean;
    clearExtraFields(): void;
    getExtraFields(): MoveTable | undefined;
    setExtraFields(value?: MoveTable): ValidatorSet;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ValidatorSet.AsObject;
    static toObject(includeInstance: boolean, msg: ValidatorSet): ValidatorSet.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ValidatorSet, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ValidatorSet;
    static deserializeBinaryFromReader(message: ValidatorSet, reader: jspb.BinaryReader): ValidatorSet;
}

export namespace ValidatorSet {
    export type AsObject = {
        totalStake?: number,
        activeValidatorsList: Array<Validator.AsObject>,
        pendingActiveValidators?: MoveTable.AsObject,
        pendingRemovalsList: Array<number>,
        stakingPoolMappings?: MoveTable.AsObject,
        inactiveValidators?: MoveTable.AsObject,
        validatorCandidates?: MoveTable.AsObject,

        atRiskValidatorsMap: Array<[string, number]>,
        extraFields?: MoveTable.AsObject,
    }
}

export class Validator extends jspb.Message { 

    hasName(): boolean;
    clearName(): void;
    getName(): string | undefined;
    setName(value: string): Validator;

    hasAddress(): boolean;
    clearAddress(): void;
    getAddress(): string | undefined;
    setAddress(value: string): Validator;

    hasDescription(): boolean;
    clearDescription(): void;
    getDescription(): string | undefined;
    setDescription(value: string): Validator;

    hasImageUrl(): boolean;
    clearImageUrl(): void;
    getImageUrl(): string | undefined;
    setImageUrl(value: string): Validator;

    hasProjectUrl(): boolean;
    clearProjectUrl(): void;
    getProjectUrl(): string | undefined;
    setProjectUrl(value: string): Validator;

    hasProtocolPublicKey(): boolean;
    clearProtocolPublicKey(): void;
    getProtocolPublicKey(): Uint8Array | string;
    getProtocolPublicKey_asU8(): Uint8Array;
    getProtocolPublicKey_asB64(): string;
    setProtocolPublicKey(value: Uint8Array | string): Validator;

    hasProofOfPossession(): boolean;
    clearProofOfPossession(): void;
    getProofOfPossession(): Uint8Array | string;
    getProofOfPossession_asU8(): Uint8Array;
    getProofOfPossession_asB64(): string;
    setProofOfPossession(value: Uint8Array | string): Validator;

    hasNetworkPublicKey(): boolean;
    clearNetworkPublicKey(): void;
    getNetworkPublicKey(): Uint8Array | string;
    getNetworkPublicKey_asU8(): Uint8Array;
    getNetworkPublicKey_asB64(): string;
    setNetworkPublicKey(value: Uint8Array | string): Validator;

    hasWorkerPublicKey(): boolean;
    clearWorkerPublicKey(): void;
    getWorkerPublicKey(): Uint8Array | string;
    getWorkerPublicKey_asU8(): Uint8Array;
    getWorkerPublicKey_asB64(): string;
    setWorkerPublicKey(value: Uint8Array | string): Validator;

    hasNetworkAddress(): boolean;
    clearNetworkAddress(): void;
    getNetworkAddress(): string | undefined;
    setNetworkAddress(value: string): Validator;

    hasP2pAddress(): boolean;
    clearP2pAddress(): void;
    getP2pAddress(): string | undefined;
    setP2pAddress(value: string): Validator;

    hasPrimaryAddress(): boolean;
    clearPrimaryAddress(): void;
    getPrimaryAddress(): string | undefined;
    setPrimaryAddress(value: string): Validator;

    hasWorkerAddress(): boolean;
    clearWorkerAddress(): void;
    getWorkerAddress(): string | undefined;
    setWorkerAddress(value: string): Validator;

    hasNextEpochProtocolPublicKey(): boolean;
    clearNextEpochProtocolPublicKey(): void;
    getNextEpochProtocolPublicKey(): Uint8Array | string;
    getNextEpochProtocolPublicKey_asU8(): Uint8Array;
    getNextEpochProtocolPublicKey_asB64(): string;
    setNextEpochProtocolPublicKey(value: Uint8Array | string): Validator;

    hasNextEpochProofOfPossession(): boolean;
    clearNextEpochProofOfPossession(): void;
    getNextEpochProofOfPossession(): Uint8Array | string;
    getNextEpochProofOfPossession_asU8(): Uint8Array;
    getNextEpochProofOfPossession_asB64(): string;
    setNextEpochProofOfPossession(value: Uint8Array | string): Validator;

    hasNextEpochNetworkPublicKey(): boolean;
    clearNextEpochNetworkPublicKey(): void;
    getNextEpochNetworkPublicKey(): Uint8Array | string;
    getNextEpochNetworkPublicKey_asU8(): Uint8Array;
    getNextEpochNetworkPublicKey_asB64(): string;
    setNextEpochNetworkPublicKey(value: Uint8Array | string): Validator;

    hasNextEpochWorkerPublicKey(): boolean;
    clearNextEpochWorkerPublicKey(): void;
    getNextEpochWorkerPublicKey(): Uint8Array | string;
    getNextEpochWorkerPublicKey_asU8(): Uint8Array;
    getNextEpochWorkerPublicKey_asB64(): string;
    setNextEpochWorkerPublicKey(value: Uint8Array | string): Validator;

    hasNextEpochNetworkAddress(): boolean;
    clearNextEpochNetworkAddress(): void;
    getNextEpochNetworkAddress(): string | undefined;
    setNextEpochNetworkAddress(value: string): Validator;

    hasNextEpochP2pAddress(): boolean;
    clearNextEpochP2pAddress(): void;
    getNextEpochP2pAddress(): string | undefined;
    setNextEpochP2pAddress(value: string): Validator;

    hasNextEpochPrimaryAddress(): boolean;
    clearNextEpochPrimaryAddress(): void;
    getNextEpochPrimaryAddress(): string | undefined;
    setNextEpochPrimaryAddress(value: string): Validator;

    hasNextEpochWorkerAddress(): boolean;
    clearNextEpochWorkerAddress(): void;
    getNextEpochWorkerAddress(): string | undefined;
    setNextEpochWorkerAddress(value: string): Validator;

    hasMetadataExtraFields(): boolean;
    clearMetadataExtraFields(): void;
    getMetadataExtraFields(): MoveTable | undefined;
    setMetadataExtraFields(value?: MoveTable): Validator;

    hasVotingPower(): boolean;
    clearVotingPower(): void;
    getVotingPower(): number | undefined;
    setVotingPower(value: number): Validator;

    hasOperationCapId(): boolean;
    clearOperationCapId(): void;
    getOperationCapId(): string | undefined;
    setOperationCapId(value: string): Validator;

    hasGasPrice(): boolean;
    clearGasPrice(): void;
    getGasPrice(): number | undefined;
    setGasPrice(value: number): Validator;

    hasStakingPool(): boolean;
    clearStakingPool(): void;
    getStakingPool(): StakingPool | undefined;
    setStakingPool(value?: StakingPool): Validator;

    hasCommissionRate(): boolean;
    clearCommissionRate(): void;
    getCommissionRate(): number | undefined;
    setCommissionRate(value: number): Validator;

    hasNextEpochStake(): boolean;
    clearNextEpochStake(): void;
    getNextEpochStake(): number | undefined;
    setNextEpochStake(value: number): Validator;

    hasNextEpochGasPrice(): boolean;
    clearNextEpochGasPrice(): void;
    getNextEpochGasPrice(): number | undefined;
    setNextEpochGasPrice(value: number): Validator;

    hasNextEpochCommissionRate(): boolean;
    clearNextEpochCommissionRate(): void;
    getNextEpochCommissionRate(): number | undefined;
    setNextEpochCommissionRate(value: number): Validator;

    hasExtraFields(): boolean;
    clearExtraFields(): void;
    getExtraFields(): MoveTable | undefined;
    setExtraFields(value?: MoveTable): Validator;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Validator.AsObject;
    static toObject(includeInstance: boolean, msg: Validator): Validator.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Validator, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Validator;
    static deserializeBinaryFromReader(message: Validator, reader: jspb.BinaryReader): Validator;
}

export namespace Validator {
    export type AsObject = {
        name?: string,
        address?: string,
        description?: string,
        imageUrl?: string,
        projectUrl?: string,
        protocolPublicKey: Uint8Array | string,
        proofOfPossession: Uint8Array | string,
        networkPublicKey: Uint8Array | string,
        workerPublicKey: Uint8Array | string,
        networkAddress?: string,
        p2pAddress?: string,
        primaryAddress?: string,
        workerAddress?: string,
        nextEpochProtocolPublicKey: Uint8Array | string,
        nextEpochProofOfPossession: Uint8Array | string,
        nextEpochNetworkPublicKey: Uint8Array | string,
        nextEpochWorkerPublicKey: Uint8Array | string,
        nextEpochNetworkAddress?: string,
        nextEpochP2pAddress?: string,
        nextEpochPrimaryAddress?: string,
        nextEpochWorkerAddress?: string,
        metadataExtraFields?: MoveTable.AsObject,
        votingPower?: number,
        operationCapId?: string,
        gasPrice?: number,
        stakingPool?: StakingPool.AsObject,
        commissionRate?: number,
        nextEpochStake?: number,
        nextEpochGasPrice?: number,
        nextEpochCommissionRate?: number,
        extraFields?: MoveTable.AsObject,
    }
}

export class StakingPool extends jspb.Message { 

    hasId(): boolean;
    clearId(): void;
    getId(): string | undefined;
    setId(value: string): StakingPool;

    hasActivationEpoch(): boolean;
    clearActivationEpoch(): void;
    getActivationEpoch(): number | undefined;
    setActivationEpoch(value: number): StakingPool;

    hasDeactivationEpoch(): boolean;
    clearDeactivationEpoch(): void;
    getDeactivationEpoch(): number | undefined;
    setDeactivationEpoch(value: number): StakingPool;

    hasSuiBalance(): boolean;
    clearSuiBalance(): void;
    getSuiBalance(): number | undefined;
    setSuiBalance(value: number): StakingPool;

    hasRewardsPool(): boolean;
    clearRewardsPool(): void;
    getRewardsPool(): number | undefined;
    setRewardsPool(value: number): StakingPool;

    hasPoolTokenBalance(): boolean;
    clearPoolTokenBalance(): void;
    getPoolTokenBalance(): number | undefined;
    setPoolTokenBalance(value: number): StakingPool;

    hasExchangeRates(): boolean;
    clearExchangeRates(): void;
    getExchangeRates(): MoveTable | undefined;
    setExchangeRates(value?: MoveTable): StakingPool;

    hasPendingStake(): boolean;
    clearPendingStake(): void;
    getPendingStake(): number | undefined;
    setPendingStake(value: number): StakingPool;

    hasPendingTotalSuiWithdraw(): boolean;
    clearPendingTotalSuiWithdraw(): void;
    getPendingTotalSuiWithdraw(): number | undefined;
    setPendingTotalSuiWithdraw(value: number): StakingPool;

    hasPendingPoolTokenWithdraw(): boolean;
    clearPendingPoolTokenWithdraw(): void;
    getPendingPoolTokenWithdraw(): number | undefined;
    setPendingPoolTokenWithdraw(value: number): StakingPool;

    hasExtraFields(): boolean;
    clearExtraFields(): void;
    getExtraFields(): MoveTable | undefined;
    setExtraFields(value?: MoveTable): StakingPool;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StakingPool.AsObject;
    static toObject(includeInstance: boolean, msg: StakingPool): StakingPool.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StakingPool, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StakingPool;
    static deserializeBinaryFromReader(message: StakingPool, reader: jspb.BinaryReader): StakingPool;
}

export namespace StakingPool {
    export type AsObject = {
        id?: string,
        activationEpoch?: number,
        deactivationEpoch?: number,
        suiBalance?: number,
        rewardsPool?: number,
        poolTokenBalance?: number,
        exchangeRates?: MoveTable.AsObject,
        pendingStake?: number,
        pendingTotalSuiWithdraw?: number,
        pendingPoolTokenWithdraw?: number,
        extraFields?: MoveTable.AsObject,
    }
}
