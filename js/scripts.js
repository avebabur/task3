var layers = document.querySelectorAll('[data-speed]');
var nav = document.getElementById('mainNav');

function onScroll() {
  layers.forEach(function (layer) {
    // distance between the middle of the section and the middle of the screen
    var box = layer.parentElement.getBoundingClientRect();
    var offset = box.top + box.height / 2 - window.innerHeight / 2;

    layer.style.translate = '0 ' + offset * layer.dataset.speed + 'px';
  });

  // dark background for the navbar after the first screen
  nav.classList.toggle('scrolled', window.scrollY > 80);
}

window.addEventListener('scroll', onScroll);
onScroll();

// close the phone menu after clicking a link
$('.nav-link').click(function () {
  $('.navbar-collapse').collapse('hide');
});

// draw the opening positions from their FEN (only the piece part)
var glyphs = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };

document.querySelectorAll('.mini-board').forEach(function (board) {
  var squares = [];

  board.dataset.fen.split('/').forEach(function (rank) {
    rank.split('').forEach(function (ch) {
      if (ch >= '1' && ch <= '8') {
        for (var i = 0; i < Number(ch); i++) squares.push('');
      } else {
        squares.push(ch);
      }
    });
  });

  // show the board from Black's side for my Black openings
  if (board.hasAttribute('data-flip')) squares.reverse();

  squares.forEach(function (ch, i) {
    var sq = document.createElement('span');
    var row = Math.floor(i / 8);
    sq.className = (row + i) % 2 === 0 ? 'sq light' : 'sq dark';

    if (ch) {
      sq.textContent = glyphs[ch.toLowerCase()];
      sq.classList.add(ch === ch.toUpperCase() ? 'white' : 'black');
    }
    board.appendChild(sq);
  });
});
