import { expect, it, describe } from 'vitest';
import { formatMoney } from './money.js';

describe('formatMoney', () => {
    it('formats 1999 to $19.99', () => {
        // Test implementation goes here
        expect(formatMoney(1999)).toBe('$19.99');
    });

    it('displays 2 decimals', () => {
        expect(formatMoney(1090)).toBe('$10.90');
        expect(formatMoney(2000)).toBe('$20.00');
    });
});
