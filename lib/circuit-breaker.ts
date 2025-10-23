export interface CircuitBreakerOptions {
  failureThreshold: number
  timeout: number
  resetTimeout: number
}

export enum CircuitBreakerState {
  CLOSED = 'CLOSED',
  OPEN = 'OPEN', 
  HALF_OPEN = 'HALF_OPEN'
}

export class CircuitBreaker {
  private state: CircuitBreakerState = CircuitBreakerState.CLOSED
  private failures: number = 0
  private nextAttempt: number = Date.now()
  private readonly failureThreshold: number
  private readonly timeout: number
  private readonly resetTimeout: number

  constructor(options: CircuitBreakerOptions) {
    this.failureThreshold = options.failureThreshold
    this.timeout = options.timeout
    this.resetTimeout = options.resetTimeout
  }

  async call<T>(fn: () => Promise<T>): Promise<T> {
    if (this.state === CircuitBreakerState.OPEN) {
      if (Date.now() < this.nextAttempt) {
        throw new Error('Circuit breaker is OPEN')
      }
      this.state = CircuitBreakerState.HALF_OPEN
    }

    try {
      const result = await Promise.race([
        fn(),
        new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), this.timeout)
        })
      ])

      this.onSuccess()
      return result
    } catch (error) {
      this.onFailure()
      throw error
    }
  }

  private onSuccess(): void {
    this.failures = 0
    this.state = CircuitBreakerState.CLOSED
  }

  private onFailure(): void {
    this.failures++
    
    if (this.failures >= this.failureThreshold) {
      this.state = CircuitBreakerState.OPEN
      this.nextAttempt = Date.now() + this.resetTimeout
    }
  }

  getState(): CircuitBreakerState {
    return this.state
  }

  getFailures(): number {
    return this.failures
  }
}