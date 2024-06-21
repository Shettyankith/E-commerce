import React, { useEffect, useState } from 'react';
import summaryAPI from '../common/index';
import { toast } from 'react-toastify';
import UpdateRole from '../components/updateRole';

function AllUsers() {
  const [allusers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openEditor,setopenEditor]=useState(false);
  //user to be updated
  const [updateUserDetail,setupdateUserDetail]=useState({
    name:"",
    email:"",
    role:"",
  })

  //api fetching all users data
  const fetchAllUsers = async () => {
    try {
      const response = await fetch(summaryAPI.allUsers.url, {
        method: summaryAPI.allUsers.method,
        //pass the token
        credentials: 'include',
      });
      //convert the data
      const data = await response.json();
      ///Error handling
      if (data.error) {
        toast.error(data.message);
      } else {
        setAllUsers(data.data); 
      }
    } catch (error) {
      toast.error("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  //fetch user details every time browser re-renders
  useEffect(() => {
    fetchAllUsers();
  }, []);

 
  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className='w-full userTable'>
          <thead>
            <tr>
              <th>Sr.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Create At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allusers.map((user, index) => (
              <tr key={user._id} >
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{user.name}</td>
                <td className='text-center'>{user.email}</td>
                <td className='text-center'>{user.role}</td>
                <td className='text-center'>{new Date(user.createdAt).toLocaleString() || 'N/A'}</td>
                <td className='text-center '><button 
                  onClick={()=>{
                  setupdateUserDetail(user),
                  setopenEditor(true)}}
                   className='cursor-pointer bg-red-300 rounded-full px-3 py-2 hover:bg-red-600 hover:text-white'><i className="fa-solid fa-user-pen "></i></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {
         openEditor && <UpdateRole closePopBox={()=>{setopenEditor(!openEditor)}} user={updateUserDetail} fetchAllUsers={fetchAllUsers}/>
      }
    </div>
  );
}

export default AllUsers;
