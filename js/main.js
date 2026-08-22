const menu = document.querySelector('.menu');
const nav = document.querySelector('.nav-links');
if(menu && nav){
  menu.addEventListener('click',()=>{
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }));
}

const observer = new IntersectionObserver(entries=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add('visible'); });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// Project gallery lightbox: click/tap any project image for a full-screen view.
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const projectPhotos = document.querySelectorAll('.project-photo');

function openLightbox(photo){
  if(!lightbox || !lightboxImage) return;
  const img = photo.querySelector('img');
  if(!img) return;
  lightboxImage.src = img.currentSrc || img.src;
  lightboxImage.alt = img.alt || 'Roofing project';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
  document.body.classList.add('lightbox-active');
}
function closeLightbox(){
  if(!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  document.body.classList.remove('lightbox-active');
  if(lightboxImage) lightboxImage.src='';
}
projectPhotos.forEach(photo=>{
  photo.addEventListener('click',()=>openLightbox(photo));
  photo.addEventListener('keydown',e=>{
    if(e.key==='Enter' || e.key===' '){e.preventDefault();openLightbox(photo);}
  });
});
if(lightboxClose) lightboxClose.addEventListener('click',closeLightbox);
if(lightbox) lightbox.addEventListener('click',e=>{if(e.target===lightbox) closeLightbox();});
document.addEventListener('keydown',e=>{if(e.key==='Escape') closeLightbox();});

// Quote form: preselect the service passed from Services (e.g. contact.html?service=01).
const form=document.querySelector('#quote-form');
const serviceSelect=document.querySelector('[data-service-select]');
if(serviceSelect){
  const params=new URLSearchParams(window.location.search);
  const requested=params.get('service');
  const map={
    '01':'New Roofing','02':'Re-Roofing','03':'Roof Repairs','04':'Leak Repairs',
    '05':'Tiling & Slating','06':'Roof Consulting','07':'Gutters & Fascias','08':'Soffits',
    '09':'Skylights','10':'Garages','11':'Silver Coating','12':'Emergency Repairs',
    '13':'Flat Roofs','14':'Chimney Work'
  };
  if(requested && map[requested]) serviceSelect.value=map[requested];
}

if(form){
  form.addEventListener('submit',e=>{
    e.preventDefault();
    const note=document.querySelector('#form-note');
    note.textContent='Thanks — your enquiry is ready to send. Connect this form to your preferred email/form service before launch.';
    note.style.display='block';
    // Keep the selected service visible after submission for now.
    form.querySelectorAll('input, textarea').forEach(el=>{if(el.name!=='service') el.value='';});
  });
}
