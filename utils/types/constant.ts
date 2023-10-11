export type NestedKeys<T> = T extends Record<string | number, object | string>
  ? {
      [K in keyof T]:
        | Extract<K, string | number>
        | `${Extract<K, string | number>}.${NestedKeys<T[K]>}`;
    }[keyof T]
  : never;

export type AllKeys<T> = T extends Record<string | number, unknown>
  ? {
      [K in keyof T]: Extract<K, string | number> | AllKeys<T[K]>;
    }[keyof T]
  : never;

export type SubObject<T> = T extends Record<string | number, unknown>
  ? {
      [K in keyof T]: T[K];
    }[keyof T]
  : never;
