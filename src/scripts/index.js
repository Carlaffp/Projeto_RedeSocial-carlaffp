import { posts, suggestUsers, users } from './database.js';


const asideList = document.querySelector('.aside__list');
const sectionPost = document.querySelector(".posts__list");
const modalControler= document.querySelector('.modal__controler')



function creatAsideList(suggestUsers) {
  let suggestUsersList = document.createElement('li');
  suggestUsersList.className = 'list__item';

  let divUsers = document.createElement('div')
  divUsers.className = 'divUser'
  suggestUsersList.appendChild(divUsers)

  let userImage = document.createElement('img');
  userImage.className = 'userImage';
  userImage.src = suggestUsers.img;
  userImage.alt = suggestUsers.user;
  divUsers.appendChild(userImage);

  let userName = document.createElement('p');
  userName.className = 'userName';
  userName.innerText = suggestUsers.user;
  divUsers.appendChild(userName);

  let userStack = document.createElement('p');
  userStack.className = 'userStack';
  userStack.innerText = suggestUsers.stack;
  divUsers.appendChild(userStack);

  

  let button = document.createElement('button');
  button.classList.add('btnFollowing' );
  button.innerText = 'Seguir';
  

  button.addEventListener('click', function () {
      button.classList.toggle('btnNotFollowing')
      if(button.classList.contains('btnNotFollowing')){
        button.textContent = 'Seguindo'
      }else{
        button.textContent = 'Seguir'
      } 
  
  });
  suggestUsersList.appendChild(button);

return suggestUsersList

}

function creatAsideElemnt(list) {
  for (let i = 0; i < list.length; i++) {
    let listElement = list[i];
    let element = creatAsideList(listElement);
    asideList.appendChild(element);
  }
}




function creatPosts(posts) {
  let divPost = document.createElement('div')
  divPost.className = 'divPost'

  let divPostlUser = document.createElement('div')
  divPostlUser.className = 'divUser'


  let postImage = document.createElement('img');
  postImage.className = 'userImage';
  postImage.src = posts.img;
  postImage.alt = posts.user;
  divPostlUser.appendChild(postImage);

  let postName = document.createElement('p');
  postName.className = 'userName';
  postName.innerText = posts.user;
  divPostlUser.appendChild(postName);

  let postStack = document.createElement('p');
  postStack.className = 'userStack';
  postStack.innerText = posts.stack;
  divPostlUser.appendChild(postStack);

  divPost.appendChild(divPostlUser)

  let postTitle = document.createElement('h1');
  postTitle.className = 'postTitle';
  postTitle.innerText = posts.title;
  divPost.appendChild(postTitle);

  let postText = document.createElement('p');
  postText.className = 'postText';
  postText.innerText = posts.text;
  divPost.appendChild(postText);

  let postButton = document.createElement('button')
  postButton.className = 'postButton'
  postButton.dataset.postId = posts.id
  postButton.innerText = "Abrir Post"
  divPost.appendChild(postButton)

  let likeImage = document.createElement('img')
   likeImage.classList = 'likeImage'
  likeImage.src = "./src/assets/img/likegray.svg"
  likeImage.alt = 'coração';
  divPost.appendChild(likeImage)
  

  let postLikes = document.createElement('number');
  postLikes.className = 'postLikes'
  postLikes.innerText = posts.likes
  divPost.appendChild(postLikes)

  let likesValue = +posts.likes
  

  likeImage.addEventListener('click',function(){
    likeImage.classList.toggle('likeImage')
      if(likeImage.classList.contains('likeImage')){
        likeImage.src = "./src/assets/img/likegray.svg"
        
        likesValue = likesValue -1
        postLikes.innerHTML = `${likesValue}`
      }else{
        likeImage.src = "./src/assets/img/like.svg"
        
        likesValue = likesValue +1
        postLikes.innerHTML = `${likesValue}`

      } 
  
  });
  

    return divPost

}

function postsElements(list){
  for(let i =0; i<list.length; i++){
    let elements = list[i]
    let listElement = creatPosts(elements)
    sectionPost.appendChild(listElement)   
}
}



function creatModalPosts(data){
  let divmodal = document.createElement('div')
  divmodal.className = 'modal__container'

  let divModalButton = document.createElement('div')
  divModalButton.className = 'divModalbutton'

  let divModalUser = document.createElement('div')
  divModalUser.className = 'divUser'

  let modalCloseButton = document.createElement('button')
  modalCloseButton.classList = 'closeButton'
  modalCloseButton.innerText = "X"
  divModalButton.appendChild(modalCloseButton)
  

  let modalImage = document.createElement('img');
  modalImage.className = 'userImage';
  modalImage.src = data.img;
  modalImage.alt = data.user;
  divModalUser.appendChild(modalImage);

  let modalName = document.createElement('p');
  modalName.className = 'userName';
  modalName.innerText = data.user;
  divModalUser.appendChild(modalName);

  let modalStack = document.createElement('p');
  modalStack.className = 'userStack';
  modalStack.innerText = data.stack;
  divModalUser.appendChild(modalStack);

  divmodal.append(divModalButton , divModalUser)

  let modalTitle = document.createElement('h1');
  modalTitle.className = 'postTitle';
  modalTitle.innerText = data.title;
  divmodal.appendChild(modalTitle);

  let modalText = document.createElement('p');
  modalText.className = 'postText';
  modalText.innerText = data.text;
  divmodal.appendChild(modalText);

  return divmodal

}

function modalElemnts(list){
  for(let i =0; i<list.length; i++){
    let elements = list[i]
    let modalElement = creatModalPosts(elements)
    modalControler.appendChild(modalElement)
    console.log(modalControler)
  }
}


function renderModal(array){
  
  const buttons = document.querySelectorAll(' .posts__list > .divPost > .postButton')

  for(let i = 0; i<buttons.length; i++){
    const button = buttons[i]
    

    button.addEventListener('click', function(event){
     
      modalControler.innerHTML = ''

      const modalItem = findPost(array, +event.target.dataset.postId)

      const modalPost = creatModalPosts(modalItem)
      
      modalControler.appendChild(modalPost)

      modalControler.showModal()
      closeModal()
      
    })
  } 
}

function findPost(array, id){

  for(let i = 0; i < array.length; i++){
    if(array[i].id === id){ 
      return array[i]
    }
  }
  return undefined
}


function closeModal(){
  const closeButton = document.querySelector(".closeButton")
  const modalContainer = document.querySelector(".modal__controler")

  closeButton.addEventListener('click', function(){
    modalContainer.close()
  })

}


creatAsideElemnt(suggestUsers);
postsElements(posts)
modalElemnts(posts)
renderModal(posts)
