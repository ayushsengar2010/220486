import userData from "./dummy.json";
import { useEffect,useState } from "react";

import React from "react";
const UserTable = () => {
    let users = userData.users;
    const universityInfo = {
        companyName: "BML Munjal University",
        clientID: "8106da57-5198-481f-8bf6-897f922ec1d0",
        clientSecret: "WGsTLccBzdlKvOYo",
        ownerName: "Ayush",
        ownerEmail: "foge1003@gmail.com",
        rollNo: "220486"
      };
    const [bearerToken, setBearerToken] = useState("");
    useEffect(() => {
        let getToken = async () => {
        fetch('http://20.244.56.144/test/auth',{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(universityInfo)})
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            setBearerToken(data.access_token);
            return data
        })
    }
    let token = getToken();
},[]);
console.log(bearerToken);

    const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    if(bearerToken==="") return;
    let getUsers = async (id) => {
        if(id===undefined) return;
    await fetch('http://20.244.56.144/test/users/'+id+"/posts",{headers: {"Authorization":`Bearer ${bearerToken}`,
}})
      .then(response => response.json())
      .then(data => {
        console.log(data)   
        setUserPosts(userPosts=>[...userPosts,{id:id,posts:data.posts}]);
      });
    }
    if(users){
        let tempUsers = Object.keys(users).map((key) => [key,users[key]]).map(([id, name]) => ({id:id,name:name}));
        tempUsers.forEach((el,i)=>{
            if(el.id!==undefined){
                getUsers(el.id);
            }
        })
        setUserPosts(userPosts.filter((el)=>el.id!==undefined))
    }

    getUsers();

  },[bearerToken])


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
