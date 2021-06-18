import { roundToDecimal, getRandomKey, mergeObjectWithArrayOverWrite } from '../src';

test('round integer to 2 decimal', () => {
    expect(roundToDecimal(5.555)).toBe('5.56');
});

test('round integer to 2 decimal', () => {
    expect(roundToDecimal(5.8646)).toBe('5.87');
});

test('merge three object', () => {
    const a = { a: 1, b: { d: 5, e: 6 }, c: 3, z: ['a', 'b'] };
    const b = { a: 2, b: { e: 7 }, z: ['c'] };
    const c = { c: 8 };

    const result = mergeObjectWithArrayOverWrite(a, b, c);

    expect(result.a).toBe(2);
    expect(result.b.d).toBe(5);
    expect(result.b.e).toBe(7);
    expect(result.z[0]).toBe('c');
    expect(result.c).toBe(8);
    expect(result.c[1]).toBeUndefined();
});

