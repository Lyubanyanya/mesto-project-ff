(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,r,o){var c=p.querySelector(".card").cloneNode(!0),u=c.querySelector(".card__image");u.src=e,u.alt="фото "+t,c.querySelector(".card__title").textContent=t,c.querySelector(".card__delete-button").addEventListener("click",(function(){return n(c)}));var d=c.querySelector(".card__like-button");return d.addEventListener("click",(function(){return r(d)})),u.addEventListener("click",(function(){return o(e,t)})),c}function n(e){e.closest(".card").remove()}function r(e){e.classList.toggle("card__like-button_is-active")}function o(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",u)}function c(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",u)}function u(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&c(t)}}function d(e){e.target===e.currentTarget&&c(e.target)}e.d({},{O:()=>p});var p=document.querySelector("#card-template").content,i=document.querySelector(".places__list"),a=document.querySelector(".popup_type_edit"),l=document.querySelector(".profile__title"),s=document.querySelector(".profile__description"),m=document.forms.namedItem("edit-profile"),_=document.querySelector(".profile__edit-button"),y=document.querySelector("#editProfileForm"),v=document.querySelector(".popup__input_type_name"),f=document.querySelector(".popup__input_type_description"),k=document.querySelector(".profile__add-button"),q=document.querySelector(".popup_type_new-card"),S=document.forms["new-place"],g=document.querySelectorAll(".popup"),E=document.querySelector(".popup__input_type_card-name"),L=document.querySelector(".popup__input_type_url"),b=document.querySelector(".popup__image"),h=document.querySelector(".popup__caption"),x=document.querySelector(".popup_type_image");function j(e,t){o(x),b.src=e,b.alt="фото "+t,h.textContent=t}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var o=e.link,c=e.name;i.append(t(o,c,n,r,j))})),_.addEventListener("click",(function(){o(a),m.elements.name.value=l.textContent,m.elements.description.value=s.textContent})),k.addEventListener("click",(function(){o(q)})),y.addEventListener("submit",(function(e){e.preventDefault();var t=v.value,n=f.value;l.textContent=t,s.textContent=n,c(a)})),a.addEventListener("click",d),S.addEventListener("submit",(function(e){e.preventDefault();var o=L.value,u=E.value;i.prepend(t(o,u,n,r,j)),S.reset(),c(q)})),q.addEventListener("click",d),x.addEventListener("click",d),g.forEach((function(e){var t=e.querySelector(".popup__close");t&&t.addEventListener("click",(function(){return c(e)}))}))})();