const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav-links');
if(menu && nav){
  menu.addEventListener('click',()=>nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const form=document.querySelector('#quote-form');
if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const note=document.querySelector('#form-note');
    note.textContent='Thanks — your enquiry is ready to send. Connect this form to your preferred email/form service before launch.';
    note.style.display='block';
    form.reset();
  });
}
