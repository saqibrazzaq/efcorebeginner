export default class Common {
  static readonly DEFAULT_PAGE_SIZE = 10;

  static formatDate(date: Date) {
    return date.toISOString().substring(0, 19);
  }
}