import React from 'react';
import { Link } from 'react-router-dom';
import { useDeleteUserMutation, useGetUsersQuery } from '../../features/usersApiSlice';
import ClipLoader from 'react-spinners/ClipLoader';
import './index.css';

const User = ({ userId }) => {
    const [deleteUser, {isSuccess: delSuccess}] = useDeleteUserMutation();
    const { user } = useGetUsersQuery('usersList', {
        selectFromResult: ({ data }) => ({
            user: data?.entities[userId]
        })
    });

    const [isDel, setisDel] = React.useState(false);

    const showDel = () => {
        if (isDel) {
            return setisDel(false);
        }
        setisDel(true);
    }

    React.useEffect(() => {
        if (delSuccess) {
            window.location.reload();
        }
    }, [delSuccess]);

    const handleDelete = async () => {
        try {
            await deleteUser(userId);
        } catch (error) {
            console.log(error);
            alert('Failed to delete account');
        }
    }

    if (user) {
        return (
            <tr>
                <td className='flex-cen'>{user.name}</td>
                <td className='flex-cen'>{user.email}</td>
                <td className='flex-cen'>{user.phoneNum}</td>
                <td className='flex-cen'>{user.roles.map(role => `${role} `)}</td>
                <td className='flex-cen'><img src={user.image} alt="userImg" /></td>
                <td className='flex-cen actions-tab'>
                    <Link to={`/admin/${user._id}`} className='nav-links'>
                        MODIFY
                    </Link>
                    <div className="admin-del-user flex">
                        {!isDel && (
                            <button className='user-del-btn' onClick={showDel}>
                                DELETE
                            </button>
                        )}
                        {isDel && (
                            <div className="del-options flex-col">
                                <p>Are you sure?</p>
                                <div className="del-yes-no flex">
                                    <button onClick={showDel}>No, cancel</button>
                                    <button onClick={handleDelete}>Yes, delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                </td>
            </tr>
        );
    } else {
        return null
    }
}


const Users = () => {
    const { data: users, isLoading, isSuccess, isError, error } = useGetUsersQuery(
        'usersList', {
            pollingInterval: 60000,
            refetchOnFocus: true,
            refetchOnMountOrArgChange: true
        }
    );

    let content;

    if (isLoading) {
        content = <ClipLoader />
    }

    if (isError) {
        content = <p className='errMsg'>{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids } = users;

        content = (
            <main className='users-main main-con flex-col'>
                <Link to={- 1} className='nav-links nav-back'>Back</Link>
                <h3>Admin Panel</h3>
                <div className='main-con users-con flex-col'>
                    <table className='flex-col'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone n◦</th>
                                <th>Role</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ids?.length && ids.map(userId => (
                                <User userId={userId} key={userId} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        );
    }

    return content;
}

export default Users;