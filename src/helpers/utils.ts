export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + "...";
};

type Language = 'en' | 'fr';

export const timeSince = (dateString: string, lang: Language = 'en'): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: { en: 'year', fr: 'an' }, seconds: 31536000 },
    { label: { en: 'month', fr: 'mois' }, seconds: 2592000 },
    { label: { en: 'day', fr: 'jour' }, seconds: 86400 },
    { label: { en: 'hour', fr: 'heure' }, seconds: 3600 },
    { label: { en: 'minute', fr: 'minute' }, seconds: 60 },
    { label: { en: 'second', fr: 'seconde' }, seconds: 1 }
  ];

  for (let i = 0; i < intervals.length; i++) {
    const interval = intervals[i];
    const count = Math.floor(diffInSeconds / interval.seconds);

    if (count >= 1) {
      const label = interval.label[lang];
      return `${count} ${label}${count !== 1 ? (lang === 'en' ? 's' : 's') : ''} ${lang === 'en' ? 'ago' : 'passé'}`;
    }
  }

  return lang === 'en' ? 'just now' : 'à l\'instant';
};