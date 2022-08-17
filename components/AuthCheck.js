import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function AuthCehck(props) {
    const { username } = useContext(UserContext);

    return username ? props.children : props.fallback || <Link href="/signup"> You must be logged in to view this page </Link>

}