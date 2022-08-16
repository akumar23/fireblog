import Head from 'next/head'
import Image from 'next/image'

import Link from 'next/link';

import toast from 'react-hot-toast';

export default function Admin() {
  return (
    <>
        <head> Your Posts </head>
        <div>
            <button onClick={() => toast.success("submitted")}>
                Submit
            </button>
        </div>
    </>
  );
}
