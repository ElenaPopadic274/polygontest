let koordinate = [];    //koordinate tacaka koje ce sacinjavati poligon
let teme = [];  //tacka odnosno teme za koje cemo da proveramo da li se nalazi u poligonu

//prvo dajemo korisniku da unese broj tacaka naseg poligona, sa ogranicenjem da broj mora biti veci ili jednak sa 3
let brojTacaka = prompt("Unesite broj tacaka poligona:");
if (brojTacaka < 3) {
    alert("Broj tacaka mora biti veci ili jednak sa 3");
    prompt("Unesite novi broj tacaka:");
}
if (brojTacaka != null) {
    document.getElementById("brTacaka").innerHTML = `Broj tacaka je ${brojTacaka}`;
}


//dajemo korisniku da unese koordinate svake tacke i kroz funkciju sacuvajKoordinate ih cuvamo
for (let i = 0; i < brojTacaka; i++) {
    let x = prompt(`Unesite x koordinate tacke ${[i + 1]}`);
    let y = prompt(`Unesite y koordinate tacke ${[i + 1]}`);
    sacuvajKoordinate(Number(x), Number(y));
}
function sacuvajKoordinate(x, y) {
    koordinate.push([x, y]);
}
if (koordinate.length) {
    for (i = 0; i < koordinate.length; i++) {
        document.getElementById("kooTacaka").innerHTML += `Koordinate za tacku ${i + 1} su ${koordinate[i]} </br>`;
    }
}

//funkcija unakrsniProizvod nam sluzi za dalju proveru da li je poligon konveksan, odredjuje nam unakrsni proizvod vektora
function unakrsniProizvod(A) {
    var X1 = (A[1][0] - A[0][0])    //cuvamo koeficijent pravca x vektora A[1]A[0]
    var Y1 = (A[1][1] - A[0][1]);   //cuvamo koeficijent pravca y vektora A[1]A[0]
    var X2 = (A[2][0] - A[0][0]);   //cuvamo koeficijent pravca x vektora A[2]A[0]
    var Y2 = (A[2][1] - A[0][1]);   //cuvamo koeficijent pravca y vektora A[2]A[0]
    return (X1 * Y2 - Y1 * X2);
}
//funkcija proveraKonveksan nam sluzi da proverimo da li je dati poligon konveksan
function proveraKonveksan(koordinate) {
    var N = koordinate.length;
    var prev = 0;
    var curr = 0;
    for (i = 0; i < N; i++) {
        //cyvamo susedne ivice poligona
        var temp = [koordinate[i], koordinate[(i + 1) % N], koordinate[(i + 2) % N]];
        curr = unakrsniProizvod(temp);
        if (curr != 0) {
            //ako pravac unakrsnog proizvoda svih susednih ivica nije isti
            if (curr * prev < 0) {
                return false;
                document.getElementById("proveraKon").innerHTML += `Poligon nije konveksan </br>`;
            }
            else {
                prev = curr;
            }
        }
    }
    return true;
    document.getElementById("proveraKon").innerHTML += `Poligon je konveksan </br>`;
}


//dajemo korisniku da unese koordinate temena koje cemo ispitivati i cuvamo ih pomocu funkcije sacuvajKoordinateTemena
alert(
    "Unesite koordinate temena za koje zelite da proverite da li je u poligonu"
);
let xProvera = prompt(`Unesite x koordinatu:`);
let yProvera = prompt(`Unesite y koordinatu:`);
sacuvajKoordinateTemena(Number(xProvera), Number(yProvera));

function sacuvajKoordinateTemena(xProvera, yProvera) {
    teme.push(xProvera);
    teme.push(yProvera);
}

if (teme != null) {
    document.getElementById("kooTemena").innerHTML += `Koordinate temena koje zelite da proverite su ${teme}`;
}

//proveravamo da li se dato teme nalazi u poligonu
function proveraTemena(tacka, polygon) {
    const duzina = polygon.length;
    if (duzina < 3) {
        return false;
    }
    let pos = 0;
    let neg = 0;

    //posmatramo stranice poligona kao putanje i proveravamo da li se nase teme nalazi na istim stranama svih stranica kroz jednacinu 
    for (let i = 0; i < duzina; i++) {
        if (polygon[i] == tacka) {
            return true;
        }
        
        let x1 = polygon[i][0];
        let y1 = polygon[i][1];

        let i2 = (i + 1) % duzina;

        let x2 = polygon[i2][0];
        let y2 = polygon[i2][1];

        let x = tacka[0];
        let y = tacka[1];

        let d = (x - x1) * (y2 - y1) - (y - y1) * (x2 - x1);

        if (d > 0) pos++;
        if (d < 0) neg++;

        if (pos > 0 && neg > 0) return false;
    }
    return true;
}

//proveravamo da li nam se teme nalazi u poligonu i ispisujemo konacni rezultat
let provera = proveraTemena(teme, koordinate);

if (provera) {
    document.getElementById("unutraNapolju").innerHTML += `Teme je unutar poligona`;
} else {
    document.getElementById("unutraNapolju").innerHTML += `Teme je van poligona`;
}