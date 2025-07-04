
import { formatDistanceToNow } from 'date-fns';
import { useEffect, useState } from 'react';

export default function TimeAgoClient({ date }: { date: string }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    setTimeAgo(formatDistanceToNow(new Date(date), { addSuffix: true }));
  }, [date]);

  return <span>{timeAgo}</span>;
}
