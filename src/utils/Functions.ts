/**
 *
 * @param {string} text -the input text to be sliced النص الذي سيتم التعامل معه
 * @param {Number} [max=50] -the maxNum length before trunction الحد الأقصى لطول النص بعد القص. القيمة الافتراضية هي 100 حرف
 * @returns -نص مقصوص إذا كان أطول من الحد الأقصى، أو النص الأصلي بدون تعديل.
 */
export function textslice(text: string, max: number = 100) {
  if (text.length >= max) {
    return `${text.slice(0, max)}...`;
  }
  return text;
}
