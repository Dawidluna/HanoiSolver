let key1 = document.getElementById("key1");
let key2 = document.getElementById("key2");
let key3 = document.getElementById("key3");
let key4 = document.getElementById("key4");
let key5 = document.getElementById("key5");
let key6 = document.getElementById("key6");
let disksInput = document.getElementById("disks");
let groupSizeInput = document.getElementById("groupSize");

let disks = disksInput.value;
let groupSize = groupSizeInput.value;
let groupCounter = 0;
let keys = [key1.value, key2.value, key3.value, key4.value, key5.value, key6.value];
let solution = "";
let pegs = [[], [], []];

function solve(n, from, to, aux) {
    if(n == 0) return;
    solve(n - 1, from, aux, to);
    pegs[to].push(pegs[from].pop());
    if(from == 0 && to == 1) solution += keys[0];
    if(from == 0 && to == 2) solution += keys[1];
    if(from == 1 && to == 0) solution += keys[2];
    if(from == 1 && to == 2) solution += keys[3];
    if(from == 2 && to == 0) solution += keys[4];
    if(from == 2 && to == 1) solution += keys[5];
    groupCounter++;
    if(groupCounter == groupSize) {
        solution += " ";
        groupCounter = 0;
    }
    solve(n-1, aux, to, from);
}

function updateSolution() {
    solution = "";
    groupCounter = 0;
    pegs = [[], [], []];
    for(let i=disks; i>0; i--) pegs[0].push(i);
    solve(disks, 0, 2, 1);
    document.getElementById("sol").value = solution;
}

function keyChange() {
    if(key1.value == "") key1.value = "d";
    if(key2.value == "") key2.value = "f";
    if(key3.value == "") key3.value = "s";
    if(key4.value == "") key4.value = "l";
    if(key5.value == "") key5.value = "j";
    if(key6.value == "") key6.value = "k";
    keys[0] = key1.value;
    keys[1] = key2.value;
    keys[2] = key3.value;
    keys[3] = key4.value;
    keys[4] = key5.value;
    keys[5] = key6.value;
    updateSolution();
}

function disksChange() {
    if(!Number.isInteger(Number(disksInput.value))) disksInput.value = 6;
    if(disksInput.value < 3) disksInput.value = 3;
    if(disksInput.value > 20) disksInput.value = 20;
    disks = disksInput.value;
    updateSolution();
}

function groupSizeChange() {
    if(!Number.isInteger(Number(groupSizeInput.value))) groupSizeInput.value = 3;
    if(groupSizeInput.value < 0) groupSizeInput.value = 1;
    groupSize = groupSizeInput.value;
    updateSolution();
}

function swap() {
    [key1.value, key2.value] = [key2.value, key1.value];
    [key3.value, key5.value] = [key5.value, key3.value];
    [key4.value, key6.value] = [key6.value, key4.value];
    keys[0] = key1.value;
    keys[1] = key2.value;
    keys[2] = key3.value;
    keys[3] = key4.value;
    keys[4] = key5.value;
    keys[5] = key6.value;
    updateSolution();
}

function copy() {
    navigator.clipboard.writeText(solution);
}

updateSolution();