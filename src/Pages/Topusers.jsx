import userData from "./dummy.json";
import { useEffect,useState } from "react";

import React from "react";
const UserTable = () => {
    let users = userData.users;
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     let getUsers = async () => {
//     fetch('http://20.244.56.144/test/users',{headers: {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjIyMzk4LCJpYXQiOjE3NDI2MjIwOTgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjgxMDZkYTU3LTUxOTgtNDgxZi04YmY2LTg5N2Y5MjJlYzFkMCIsInN1YiI6ImZvZ2UxMDAzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IkJNTCBNdW5qYWwgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiODEwNmRhNTctNTE5OC00ODFmLThiZjYtODk3ZjkyMmVjMWQwIiwiY2xpZW50U2VjcmV0IjoiV0dzVExjY0J6ZGxLdk9ZbyIsIm93bmVyTmFtZSI6IkF5dXNoIiwib3duZXJFbWFpbCI6ImZvZ2UxMDAzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIyMDQ4NiJ9.0lBEuOt_jCgrlPliOhXfnOYgjgUVaMVMPPrluIei3-E",
// }})
//       .then(response => response.json())
//       .then(data => {
//         console.log(data)   
//         let temp = Object.keys(data.users).map((key) => [key, data.users[key]]);
//         console.log(temp)
//         setUsers(temp);
//       });
//     }
//     getUsers();
//   }, []);
    const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    let getUsers = async (id) => {
        if(id===undefined) return;
    await fetch('http://20.244.56.144/test/users/'+id+"/posts",{headers: {"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQyNjI0Mjc5LCJpYXQiOjE3NDI2MjM5NzksImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjgxMDZkYTU3LTUxOTgtNDgxZi04YmY2LTg5N2Y5MjJlYzFkMCIsInN1YiI6ImZvZ2UxMDAzQGdtYWlsLmNvbSJ9LCJjb21wYW55TmFtZSI6IkJNTCBNdW5qYWwgVW5pdmVyc2l0eSIsImNsaWVudElEIjoiODEwNmRhNTctNTE5OC00ODFmLThiZjYtODk3ZjkyMmVjMWQwIiwiY2xpZW50U2VjcmV0IjoiV0dzVExjY0J6ZGxLdk9ZbyIsIm93bmVyTmFtZSI6IkF5dXNoIiwib3duZXJFbWFpbCI6ImZvZ2UxMDAzQGdtYWlsLmNvbSIsInJvbGxObyI6IjIyMDQ4NiJ9.bb5oWZd8yI-2Rip30nFBzJKVDGGy7yqyV1UCgx6J8AI",
}})
      .then(response => response.json())
      .then(data => {
        console.log(data)   
        setUserPosts(userPosts=>[...userPosts,{id:id,posts:data.posts}]);
      });
    }
    let tempUsers = Object.keys(users).map((key) => [key,users[key]]).map(([id, name]) => ({id:id,name:name}));
    tempUsers.forEach((el,i)=>{
        if(el.id!==undefined){
            getUsers(el.id);
        }
    })
    setUserPosts(userPosts.filter((el)=>el.id!==undefined))
    getUsers();

  },[])
  console.log(userPosts);


  let sortedUsers = userPosts.sort((a,b)=>{
    if(a.posts===null){
        return 1;
    }
     if(b.posts===null){
        return -1;
    }     
        if(a.posts!==null && b.posts!==null){
            return b.posts.length-a.posts.length;
        }

    
  })
  console.log(sortedUsers)  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Post Count</th>
          </tr>
        </thead>
        <tbody>
        {sortedUsers.map(({id,posts},i) => (
            i<5 && (
            <tr key={id} className="hover:bg-gray-100">
              <td className="border p-2 text-center">{id}</td>
              <td className="border p-2">{users[id]}</td>
              <td className="border p-2">{posts?.length||0}</td>
            </tr>)
          ))}
          {/* {Object.keys(users).map((key) => [key,users[key]]).map(([id, name]) => (
            <tr key={id} className="hover:bg-gray-100">
              <td className="border p-2 text-center">{id}</td>
              <td className="border p-2">{name}</td>
            </tr>
          ))} */}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
