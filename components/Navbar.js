import Link from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../lib/context';

export default function Navbar() {
    
    const {user, username} = useContext(UserContext);

    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link href = "https://github.com/akumar23/fireblog">
                        <button>Source</button>
                    </Link>
                </li>
        
                <li>
                    <Link href = "/">
                        <button>Your Feed</button>
                    </Link>
                </li>

                {username && (
                    <>
                        <li>
                            <Link href="/admin">
                                <button>Write</button>
                            </Link>
                        </li>

                        <li>
                            <Link href={`/${username}`}>
                                <img src={user?.photoURL} />
                            </Link>
                        </li>
                    </>
                )}

                {!username && (
                    <li>
                        <Link href="/signup">
                            <button>Log In</button>
                        </Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}
