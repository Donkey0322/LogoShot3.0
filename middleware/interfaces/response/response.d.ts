export default interface Repsonse<data, error> {
  data: data | undefined | null;
  error: error | undefined | string | null;
}
