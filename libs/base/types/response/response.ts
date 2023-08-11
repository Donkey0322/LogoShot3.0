export default interface Repsonse<data> {
  data: data | undefined | null;
  error: undefined | string | null;
}
