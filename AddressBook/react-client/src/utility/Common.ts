export default class Common {
  static readonly DEFAULT_PAGE_SIZE = 5;

  static formatDate(date: Date) {
    return date.toISOString().substring(0, 19);
  }
}