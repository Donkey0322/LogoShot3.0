export type NestedKeys<T> = T extends Record<string | number, Object | string>
  ? {
      [K in keyof T]:
        | Extract<K, string | number>
        | `${Extract<K, string | number>}.${NestedKeys<T[K]>}`;
    }[keyof T]
  : never;

export type AllKeys<T> = T extends Record<string | number, any>
  ? {
      [K in keyof T]: Extract<K, string | number> | AllKeys<T[K]>;
    }[keyof T]
  : never;
