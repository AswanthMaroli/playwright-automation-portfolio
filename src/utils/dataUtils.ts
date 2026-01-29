/**
 * Deterministic test data builders.
 * In real-world suites this is where factories and fixtures for complex entities would live.
 */
export class DataUtils {
  static randomSuffix(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  static buildCheckoutUser(overrides?: Partial<CheckoutUser>): CheckoutUser {
    const suffix = this.randomSuffix();
    return {
      firstName: `TestFirst-${suffix}`,
      lastName: `TestLast-${suffix}`,
      postalCode: `1000${suffix.slice(0, 2)}`,
      ...overrides,
    };
  }
}

export interface CheckoutUser {
  firstName: string;
  lastName: string;
  postalCode: string;
}

