import { UserContext } from '../../lib/context';
import { useContext } from 'react';

export default function UserAdminPage(props) {
    
    const {user, username} = useContext(UserContext);

    return (
        <main>
            User: a
        </main>
    )
}