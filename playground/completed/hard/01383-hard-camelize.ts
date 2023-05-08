/*
  1383 - Camelize
  -------
  by Denis (@denchiklut) #hard #union #recursion

  ### Question

  Implement Camelize which converts object from snake_case to to camelCase

  ```ts
  Camelize<{
    some_prop: string,
    prop: { another_prop: string },
    array: [{ snake_case: string }]
  }>

  // expected to be
  // {
  //   someProp: string,
  //   prop: { anotherProp: string },
  //   array: [{ snakeCase: string }]
  // }
  ```

  > View on GitHub: https://tsch.js.org/1383
*/

/* _____________ Your Code Here _____________ */

// type IsAlphabet<T extends string> = Lowercase<T> extends Uppercase<T>
//   ? false
//   : true

// type CamelCase<S extends string> = S extends `${infer X}_${infer Y}${infer Z}`
//   // If Y is a symbol (not alphabetic) then keep keep that in and don't change it
//   ? IsAlphabet<Y> extends false
//     ? `${Lowercase<X>}_${CamelCase<`${Y}${Z}`>}`
//     // Else capitalize and append it
//     : `${Lowercase<X>}${Uppercase<Y>}${CamelCase<Z>}`
//   : Lowercase<S>

// type Camelize<T> = T extends unknown[]
//   ? { [K in keyof T]: T[K] extends object ? Camelize<T[K]> : T[K] }
//   : { [K in keyof T as CamelCase<K & string>]: T[K] extends object ? Camelize<T[K]> : T[K] }

type SnakeToCamel<S> = S extends `${infer L}_${infer U}${infer R}`
  ? `${L}${Uppercase<U>}${SnakeToCamel<R>}`
  : S

type CamelizeArray<T> = T extends [infer F, ...infer R]
  ? [Camelize<F>, ...CamelizeArray<R>]
  : []

type Camelize<T> = {
  [K in keyof T as SnakeToCamel<K>]: T[K] extends unknown[]
    ? CamelizeArray<T[K]>
    : T[K] extends object
      ? Camelize<T[K]>
      : T[K];
}

/* _____________ Test Cases _____________ */
import type { Equal, ExpandRecursively, Expect } from '@type-challenges/utils'
import type { CamelCase } from './00114-hard-camelcase'

type cases = [
  Expect<Equal<
    Camelize<{
      some_prop: string
      prop: { another_prop: string }
      array: [
        { snake_case: string },
        { another_element: { yet_another_prop: string } },
        { yet_another_element: string },
      ]
    }>,
    {
      someProp: string
      prop: { anotherProp: string }
      array: [
        { snakeCase: string },
        { anotherElement: { yetAnotherProp: string } },
        { yetAnotherElement: string },
      ]
    }
  >>,
]

/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/1383/answer
  > View solutions: https://tsch.js.org/1383/solutions
  > More Challenges: https://tsch.js.org
*/
