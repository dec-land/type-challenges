/*
  114 - CamelCase
  -------
  by Anthony Fu (@antfu) #hard #template-literal

  ### Question

  Implement `CamelCase<T>` which converts `snake_case` string to `camelCase`.

  For example

  ```ts
  type camelCase1 = CamelCase<'hello_world_with_types'> // expected to be 'helloWorldWithTypes'
  type camelCase2 = CamelCase<'HELLO_WORLD_WITH_TYPES'> // expected to be same as previous one
  ```

  > View on GitHub: https://tsch.js.org/114
*/

/* _____________ Your Code Here _____________ */

// symbols will be the same when capitalized
type IsAlphabet<T extends string> = Lowercase<T> extends Uppercase<T>
  ? false
  : true

// type CamelCase<
//     S extends string,
//     Result extends string = '',
// > = S extends `${infer Left}${infer Rest}`
//   ? IsAlphabet<Left> extends true
//     ? Result extends `${infer Prefix}_`
//       ? CamelCase<Rest, `${Prefix}${Uppercase<Left>}`>
//       : CamelCase<Rest, `${Result}${Lowercase<Left>}`>
//     : CamelCase<Rest, `${Result}${Left}`>
//   : Result

// Basic one that works for most cases
// type CamelCase<S extends string> = S extends `${infer Start}_${infer End}`
//   ? `${Start}${CamelCase<Capitalize<End>>}`
//   : S

// your answers
export type CamelCase<S extends string> = S extends `${infer X}_${infer Y}${infer Z}`
  // If Y is a symbol (not alphabetic) then keep keep that in and don't change it
  ? IsAlphabet<Y> extends false
    ? `${Lowercase<X>}_${CamelCase<`${Y}${Z}`>}`
    // Else capitalize and append it
    : `${Lowercase<X>}${Uppercase<Y>}${CamelCase<Z>}`
  : Lowercase<S>

/* _____________ Test Cases _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<CamelCase<'foobar'>, 'foobar'>>,
  Expect<Equal<CamelCase<'FOOBAR'>, 'foobar'>>,
  Expect<Equal<CamelCase<'foo_bar'>, 'fooBar'>>,
  Expect<Equal<CamelCase<'foo__bar'>, 'foo_Bar'>>,
  Expect<Equal<CamelCase<'foo_$bar'>, 'foo_$bar'>>,
  Expect<Equal<CamelCase<'foo_bar_'>, 'fooBar_'>>,
  Expect<Equal<CamelCase<'foo_bar__'>, 'fooBar__'>>,
  Expect<Equal<CamelCase<'foo_bar_$'>, 'fooBar_$'>>,
  Expect<Equal<CamelCase<'foo_bar_hello_world'>, 'fooBarHelloWorld'>>,
  Expect<Equal<CamelCase<'HELLO_WORLD_WITH_TYPES'>, 'helloWorldWithTypes'>>,
  Expect<Equal<CamelCase<'-'>, '-'>>,
  Expect<Equal<CamelCase<''>, ''>>,
  Expect<Equal<CamelCase<'😎'>, '😎'>>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/114/answer
  > View solutions: https://tsch.js.org/114/solutions
  > More Challenges: https://tsch.js.org
*/
