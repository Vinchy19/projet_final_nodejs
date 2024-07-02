const cicon = document.getElementById('cicon')
cicon.addEventListener('click', () => toggleMenu())

function toggleMenu() {
    var Links = document.getElementById('links');
    var cicon = document.querySelector('.icon i');

    if (Links.classList.contains('linkshow'))
        {
        Links.classList.remove('linkshow');
        cicon.classList.remove('fa-times');
        cicon.classList.add('fa-bars');
    } 
    else
    {
        Links.classList.add('linkshow');
        cicon.classList.remove('fa-bars');
        cicon.classList.add('fa-times');
    }
}



// script.js
const commentList = document.getElementById('comment-list');
const contactform = document.querySelector('.formulaire')
const subcomment = document.getElementById('commentsub')
let nameid = document.getElementById('lname')
let professionid = document.getElementById('profession')



contactform.addEventListener('submit', (e) =>{
    e.preventDefault()
    const formdata ={
        name: nameid.value,
        profession : professionid.value,
        message : document.getElementById('message').value
    }
    fetch('/api/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        contactform.reset()
        
        fetch('/api/comments')
        .then(response => response.json())
        .then(comments => {
            let commentairebox = document.getElementById('comment-list')
            commentairebox.innerHTML = '';
            comments.forEach(comment => {
                const commentaire = document.createElement('div');
                commentaire.classList.add('temoignages-card')
                commentaire.innerHTML = `<p><i class="fa-solid fa-quote-left"></i> ${comment.message}<i class="fa-solid fa-quote-right"></i></p>
                    <div class="profile">
                        <img class="image-profile" src="./images/profile.png" alt="${comment.name}profile">
                        <div>
                            <span class="nom">${comment.name}</span><br>
                            <span class="titre">${comment.profession}</span>
                        </div>`;
                commentairebox.appendChild(commentaire);
            });
        })
        .catch(error => {
            console.error('Error fetching comments:', error);
        });
    })
    
    .catch((error) => {
        console.error('Error:', error);
    });

})

document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/comments')
    .then(response => response.json())
    .then(comments => {
        let commentairebox = document.getElementById('comment-list')
        commentairebox.innerHTML = '';
        comments.forEach(comment => {
            const commentaire = document.createElement('div');
                commentaire.classList.add('temoignages-card')
                commentaire.innerHTML = `<p><i class="fa-solid fa-quote-left"></i> ${comment.message}<i class="fa-solid fa-quote-right"></i></p>
                    <div class="profile">
                        <img class="image-profile" src="./images/profile.png" alt="profile">
                        <div>
                            <span class="nom">${comment.name}</span><br>
                            <span class="titre">${comment.profession}</span>
                        </div>`;
                commentairebox.appendChild(commentaire);
        });
    })
    .catch(error => {
        console.error('Error fetching comments:', error);
    });
});

