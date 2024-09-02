/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from 'react';

type ConsumerCallback = (...args: any[]) => any;

type ProducerCallback = (...args: any[]) => any;

type ProducerCallbackWithConsumers<
  C extends ConsumerCallback,
  P extends ProducerCallback,
> = (consumers: C[], ...args: Parameters<P>) => ReturnType<P>;

type ProducerMethods<C extends ConsumerCallback> = {
  subscribe: (consumer: C) => void;
  unsubscribe: (consumer: C) => void;
};

export type Producer<
  C extends ConsumerCallback,
  P extends ProducerCallback,
> = P & ProducerMethods<C>;

export function useProducer<
  C extends ConsumerCallback,
  P extends ProducerCallback,
>(callback: ProducerCallbackWithConsumers<C, P>): Producer<C, P> {
  const consumers = useRef<C[]>([]);

  const producer = ((...args: Parameters<P>) => {
    return callback(consumers.current, ...args) as ReturnType<P>;
  }) as Producer<C, P>;

  producer.subscribe = (consumer: C) => {
    consumers.current.push(consumer);
  };

  producer.unsubscribe = (consumer: C) => {
    consumers.current = consumers.current.filter(item => item !== consumer);
  };

  return producer;
}
