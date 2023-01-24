import { Head } from '@inertiajs/react';
import route from 'ziggy-js';

export default function({title, body}) {
  return (
    <>
      <Head title={title} />
      <div>
        {body}
      </div>
    </>
  );
} 