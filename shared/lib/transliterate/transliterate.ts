const ruKeys: Record<string, string> = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'e',
  ж: 'j',
  з: 'z',
  и: 'i',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'h',
  ц: 'c',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ы: 'y',
  э: 'e',
  ю: 'u',
  я: 'ya',
  й: 'i',
  ъ: '',
  ь: '',
  ' ': '_',
};

export function transliterate(word: string) {
  return word
    .split('')
    .map((letter) => {
      const lowLetter = letter.toLowerCase();
      const en = ruKeys[lowLetter] ?? letter;
      return lowLetter === letter ? en.toLowerCase() : en.slice(0, 1).toLowerCase() + en.slice(1).toLowerCase();
    })
    .join('');
}
