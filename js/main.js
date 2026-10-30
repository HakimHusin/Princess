const $=s=>document.querySelector(s);
const targetMonth=9;
function countdown(){const now=new Date(),target=new Date(now.getFullYear(),targetMonth,31,0,0,0),d=target-now;if(d<=0){['days','hours','minutes','seconds'].forEach(x=>$('#'+x).textContent='00');
    $('#countNote').textContent="It's your day, princess. Happy birthday! ♡";
    return}let n=Math.floor(d/1000);
    $('#days').textContent=String(Math.floor(n/86400)).padStart(2,'0');
    $('#hours').textContent=String(Math.floor(n%86400/3600)).padStart(2,'0');
    $('#minutes').textContent=String(Math.floor(n%3600/60)).padStart(2,'0');
    $('#seconds').textContent=String(n%60).padStart(2,'0');
    $('#countNote').textContent='Counting down to 31 October ♡'}countdown();
    setInterval(countdown,1000);
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');
    observer.unobserve(e.target)}}),{threshold:.12});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const c=$('#stars'),ctx=c.getContext('2d');
let stars=[];function resize(){let d=Math.min(devicePixelRatio||1,2);
    c.width=innerWidth*d;
    c.height=innerHeight*d;
    c.style.width=innerWidth+'px';
    c.style.height=innerHeight+'px';
    ctx.setTransform(d,0,0,d,0,0);
    stars=Array.from({length:Math.min(120,innerWidth/9)},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.2,a:Math.random()*.7+.1}))}function draw(){ctx.clearRect(0,0,innerWidth,innerHeight);
        stars.forEach(s=>{s.a+=(Math.random()-.5)*.025;s.a=Math.max(.1,Math.min(.8,s.a));
            ctx.fillStyle=`rgba(255,205,231,${s.a})`;
            ctx.beginPath();
            ctx.arc(s.x,s.y,s.r,0,7);
            ctx.fill()});
            requestAnimationFrame(draw)}addEventListener('resize',resize);
            resize();
            draw();

const music=$('#music');
$('#musicBtn').onclick=async()=>{if(music.paused){try{await music.play();
    $('#musicBtn').textContent='♫ Music on'}catch(e){alert('Add your song at assets/music/your-song.mp3 first.')}}else{music.pause();
        $('#musicBtn').textContent='♫ Music off'}};
const photoFiles=['memory-1.jpeg','memory-2.jpeg','memory-3.jpeg','memory-4.jpeg'];
document.querySelectorAll('.photo').forEach((b,i)=>{let img=new Image();
    img.src='assets/images/'+photoFiles[i];
    img.onload=()=>{b.innerHTML='';
        img.alt='Memory '+(i+1);
        b.append(img)};
        b.onclick=()=>{let m=$('#modal');
            $('#modalImg').src='assets/images/'+photoFiles[i];
            $('#modalCaption').textContent=['A moment I would keep ♡','Just you being you ✦','Your kind of magic ☾','Another little forever ✧'][i];
            m.hidden=false}});
$('#close').onclick=()=>$('#modal').hidden=true;
$('#modal').onclick=e=>{if(e.target.id==='modal')$('#modal').hidden=true};
document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#modal').hidden=true});
$('#envelope').onclick=()=>{$('#letterCard').hidden=false;
    $('#envelope').textContent='♡ Opened with love';
    $('#letterCard').scrollIntoView({behavior:'smooth',block:'center'});
    burst(12)};
const wishes=['For your heart: I hope you always feel safe enough to rest, brave enough to try again, and loved for exactly who you are. You deserve gentle days, Mai Sarah. ♡','For your dreams: I hope you keep growing into the person you want to become. May every brave step lead you somewhere beautiful. I believe in you.','A little secret: Out of all the places this world could have taken me, I am grateful our paths crossed. You make small moments mean a lot. Happy birthday, my princess. ♡'];
document.querySelectorAll('[data-gift]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-gift]').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    $('#wish').textContent=wishes[+b.dataset.gift];
    burst(7)});

const photos = [
  'assets/images/couple-1.jpeg',
  'assets/images/couple-2.jpeg',
  'assets/images/couple-3.jpeg',
  'assets/images/couple-4.jpeg',
  'assets/images/couple-5.jpeg',
  'assets/images/couple-6.jpeg'
];

let first = null;
let lock = false;
let pairs = 0;
let attempts = 0;

function setup() {
  const deck = [...photos, ...photos]
    .map((src, id) => ({ src, id }))
    .sort(() => Math.random() - 0.5);

  const board = $('#game');
  board.innerHTML = '';
  first = null;
  lock = false;
  pairs = 0;
  attempts = 0;

  $('#gameStatus').textContent = '0 / 6 memories found';

  deck.forEach(card => {
    const b = document.createElement('button');
    b.className = 'tile photo-tile';
    b.type = 'button';
    b.setAttribute('aria-label', 'Reveal a memory');

    const img = document.createElement('img');
    img.src = card.src;
    img.alt = 'A memory of us';
    img.draggable = false;

    // Keep the photo hidden until the card is flipped.
    img.style.display = 'none';
    b.appendChild(img);

    const cover = document.createElement('span');
    cover.className = 'tile-cover';
    cover.textContent = '♡';
    b.appendChild(cover);

    b.dataset.symbol = card.src;

    b.onclick = () => {
      if (
        lock ||
        b.classList.contains('matched') ||
        b.classList.contains('revealed')
      ) return;

      b.classList.add('revealed');
      img.style.display = 'block';
      cover.style.display = 'none';

      if (!first) {
        first = b;
        return;
      }

      const a = first;
      first = null;
      attempts++;

      if (a.dataset.symbol === b.dataset.symbol) {
        a.classList.add('matched');
        b.classList.add('matched');
        pairs++;

        $('#gameStatus').textContent =
          `${pairs} / 6 memories found`;

        if (pairs === 6) {
          $('#gameStatus').textContent =
            `All our memories found, princess! ♡ ` +
            `(${attempts} attempts)`;

          burst(30);
        }
      } else {
        lock = true;

        setTimeout(() => {
          [a, b].forEach(x => {
            x.classList.remove('revealed');
            x.querySelector('img').style.display = 'none';
            x.querySelector('.tile-cover').style.display = '';
          });

          lock = false;
        }, 1000);
      }
    };

    board.appendChild(b);
  });
}

setup();
$('#restart').onclick = setup;

function burst(n = 20) {
  const box = $('#confetti');
  const chars = ['♡', '✦', '✧', '♥', '✷'];
  const colors = ['#ff86bd', '#d2a3ff', '#f4d6a1', '#fff1f8', '#67e8f9'];
  const duration = 7000;
  const end = Date.now() + duration;

  function drop() {
    const count = Math.max(2, Math.min(10, Math.ceil(n / 6)));

    for (let i = 0; i < count; i++) {
      const s = document.createElement('span');
      s.className = 'particle';
      s.textContent = chars[Math.floor(Math.random() * chars.length)];
      s.style.left = Math.random() * 100 + '%';
      s.style.color = colors[Math.floor(Math.random() * colors.length)];
      s.style.fontSize = (14 + Math.random() * 18) + 'px';
      s.style.animationDuration = (3.5 + Math.random() * 2.5) + 's';
      s.style.animationDelay = '0s';
      box.appendChild(s);

      setTimeout(() => s.remove(), 6500);
    }

    if (Date.now() < end) {
      setTimeout(drop, 130);
    }
  }

  drop();
}

$('#magic').onclick = () => {
  $('#final').hidden = false;
  $('#magic').textContent = 'A little magic, just for you ♡';
  burst(50);
};
 