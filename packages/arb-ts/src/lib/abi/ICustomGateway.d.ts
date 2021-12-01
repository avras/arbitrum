/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  CallOverrides,
} from 'ethers'
import { BytesLike } from '@ethersproject/bytes'
import { Listener, Provider } from '@ethersproject/providers'
import { FunctionFragment, EventFragment, Result } from '@ethersproject/abi'
import type { TypedEventFilter, TypedEvent, TypedListener } from './common'

interface ICustomGatewayInterface extends ethers.utils.Interface {
  functions: {
    'l1ToL2Token(address)': FunctionFragment
  }

  encodeFunctionData(functionFragment: 'l1ToL2Token', values: [string]): string

  decodeFunctionResult(functionFragment: 'l1ToL2Token', data: BytesLike): Result

  events: {
    'TokenSet(address,address)': EventFragment
  }

  getEvent(nameOrSignatureOrTopic: 'TokenSet'): EventFragment
}

export type TokenSetEvent = TypedEvent<
  [string, string] & { l1Address: string; l2Address: string }
>

export class ICustomGateway extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this
  attach(addressOrName: string): this
  deployed(): Promise<this>

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this

  listeners(eventName?: string): Array<Listener>
  off(eventName: string, listener: Listener): this
  on(eventName: string, listener: Listener): this
  once(eventName: string, listener: Listener): this
  removeListener(eventName: string, listener: Listener): this
  removeAllListeners(eventName?: string): this

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>

  interface: ICustomGatewayInterface

  functions: {
    l1ToL2Token(
      _l1Token: string,
      overrides?: CallOverrides
    ): Promise<[string] & { _l2Token: string }>
  }

  l1ToL2Token(_l1Token: string, overrides?: CallOverrides): Promise<string>

  callStatic: {
    l1ToL2Token(_l1Token: string, overrides?: CallOverrides): Promise<string>
  }

  filters: {
    'TokenSet(address,address)'(
      l1Address?: string | null,
      l2Address?: string | null
    ): TypedEventFilter<
      [string, string],
      { l1Address: string; l2Address: string }
    >

    TokenSet(
      l1Address?: string | null,
      l2Address?: string | null
    ): TypedEventFilter<
      [string, string],
      { l1Address: string; l2Address: string }
    >
  }

  estimateGas: {
    l1ToL2Token(_l1Token: string, overrides?: CallOverrides): Promise<BigNumber>
  }

  populateTransaction: {
    l1ToL2Token(
      _l1Token: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>
  }
}
