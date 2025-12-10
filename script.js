//default grid size
const DEFAULT_SIZE = 16;
const MAX_SIZE = 100;
const TOTAL_PX = 960; //must match --grid-size-px in css (sized box), keep in sync

const container = document.getElementById('gridContainer');
const resizeBtn = document.getElementById('resizeBtn');

function createGrid(size = DEFAULT_SIZE) {
    //Sanitize size
    size = Number(size) || DEFAULT_SIZE;
    if (size < 1) size = 1;
    if (size > MAX_SIZE) size = MAX_SIZE;

    //Clear existing squares
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    //compute single square sizein pixels (use math.floor to avoid sub-pixel rounding causing extra row)
    const squarePx = Math.floor(TOTAL_PX / size);

    //for performance, use documentfragment
    const frag = document.createDocumentFragment();
    const total = size * size;
    for (let i = 0; i < total; i++) {
        const sq = document.createElement('div');
        sq.classList.add('grid-square');

        //set exact size using flex-basis and height so flexbox wraps to grid-like layout
        // using px values prevents borders/margin from changing grid layout unexpectedly

        sq.style.flex = `0 0 ${squarePx}px`;
        sq.style.height = `${squarePx}px`;

        //mouseenter so it changes when the mouse passes into the square
        sq.addEventListener('mouseenter', () => {
            sq.style.backgroundColor = '#111'
        });

        frag.appendChild(sq);
    }
    
    container.appendChild(frag);
}   

//hookup button to prompt for new size 
resizeBtn.addEventListener('click', () => {
    let input = prompt(`Enter new grid size (squares per side). 1-${MAX_SIZE}:`, "");
    if (input === null) {
        return; //user cancelled
    }

    input = input.trim();
    if (input === "") {
        alert('please enter a number');
        return;
    }

    const n = parseInt(input, 10);
    if (Number.isNaN(n) || n < 1 || n > MAX_SIZE) {
        alert(`Invalid number. Enter a number between 1 and ${MAX_SIZE}.`);
        return;
    }

    createGrid(n);
});

//create initial grid on page load
createGrid(DEFAULT_SIZE);