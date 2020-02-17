function loaded(){
  document.getElementById('submit_btn').addEventListener('click', display_squares);
}


function display_squares(){
  let square_container = document.getElementById('square_container');
  document.getElementById('input_box').innerHTML = '';
  // a loop to draw all the squares
  for (var i = 0; i < document.getElementById('input_box').value; i++) {
    let square = document.createElement('p');
    square.className = "square";
    square_container.appendChild(square);
  }

}
