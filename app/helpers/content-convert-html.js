import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string'

export function contentConvertHtml(params/*, hash*/) {
  return htmlSafe(params[0]);
}

export default helper(contentConvertHtml);
