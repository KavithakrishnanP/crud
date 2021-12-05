
document.body.innerHTML=`
<div class="user-form">
<input class="add-user-name" placeholder="Enter your name"/>
<input class="add-user-avatar" placeholder="Enter your pic url"/>
<button onclick="addUser()">ADD USER</button>
</div>
<section class="user-list"></section>`;

async function getAllusers(){
  const data = await fetch("https://61aae90ebfb110001773f342.mockapi.io/users", {method:"GET"});
  const users = await data.json();

  const userContainer=document.querySelector(".user-list");
  users.forEach((user)=>{
      userContainer.innerHTML +=`
      <div class="user-container">
        <img class="user-avatar" src="${user.avatar}" alt=${user.name} />
        <div >
        <p class="user-name">${user.name}</p>
        <button onclick="toggleEdit(${user.id})">EDIT</button>
        <button onclick="deleteUser(${user.id})">DELETE</button>
        <div class="edit-${user.id}>
        <input value=${user.name} class="edit-${user.id}-user-name" placeholder="Enter your name"/>
        <input value=${user.avatar} class="edit--${user.id}-user-avatar" placeholder="Enter your name"/>
        <button onclick="saveUser()">SAVE</button>
        </div>
       </div>
       </div>
       `;
  }
  );
  console.log(users);
}
getAllusers();

async function deleteUser(userId){
    console.log("Deleting...", userId);
    const data = await fetch("https://61aae90ebfb110001773f342.mockapi.io/users" +userId, {method:"DELETE"});

getAllusers();
}

async function addUser(){
  console.log("Adding...");
  const name=document.querySelector(".add-user-name").value;
  const avatar=document.querySelector(".add-user-avatar").value;
  console.log(name,avatar);

const data = await fetch(
  "https://61aae90ebfb110001773f342.mockapi.io/users" , 
  { method:"POST",
   headers:{"content-Type":"application/json"},
   body:JSON.stringify({name:name, avatar:avatar}),
});

getAllusers();
}

function toggleEdit(){
  console.log("Editing... user");
  const editUserForm=document.querySelector(`.edit=${user.id}`);
  editUserForm.style.display=
    editUserForm.style.display=="block"?"none":"block";
}

async function saveUser(){
  console.log("Saving... ,userId");
  const userName=document.querySelector(`.edit=${userId-user-name}`).value;
  const userAvatar=document.querySelector(
    `.edit-${userId}-user-avatar`
  ).value;
  console.log(userName,userAvatar);

  const data = await fetch(
    "https://61aae90ebfb110001773f342.mockapi.io/users" +userId, 
    { method:"PUT",
     headers:{"content-Type":"application/json"},
     body:JSON.stringify({name:userName, avatar:avatar}),
}
  );

  getAllusers();
}