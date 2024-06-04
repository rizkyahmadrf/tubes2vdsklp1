//Inisiasi Variabel
let theta;                  // sudut awal
let s = 0;
let pTali    = 70;         // panjang tali
let thetaVel = 0;           // kecepatan sudut awal
let thetaAcc = 0;           // percepatan sudut awal
let ballSize = 15;          // Ukuran bola
let gravity  = 0;           // gravitasi
let damping  = 0;           // redaman awal

//Gambar
let sudut;
let itera;
let mtk;
let BG;
let venus;
let bumi;
let merkurius;
let mars;
let jupiter;
let saturnus;
let uranus;
let neptunus;
let bulan;
let ts;

function preload(){
  sudut = loadImage("sudut.png")
  itera = loadImage("ITERA.png")
  mtk = loadImage("mtk.png")
  BG = loadImage("back.jpg")
  venus = loadImage("venus.png")
  bumi = loadImage("bumi.png")
  merkurius = loadImage("merkurius.png")
  mars = loadImage("mars.png")
  jupiter = loadImage("jupiter.png")
  saturnus = loadImage("saturnus.png")
  uranus = loadImage("uranus.png")
  neptunus = loadImage("neptunus.png")
  bulan = loadImage("bulan.png")
  ts = loadImage("ts.jpg")
}

function resetNilai() {
  pTali    = 0; 
  gravity  = 0;
  ballSize = 0;
  theta    = 0;
  damping  = 0;
  s = 0;
}

//Tambah dan Kurangi Panjang Tali
function Ttali(){
  pTali += 10
}

function Ktali(){
  pTali -= 10
  
  if (pTali < 10) {
    pTali = 10;
 }
}

//Tambah dan Kurangi Besar Pendulum
function Tbola(){
  ballSize += 5
}

function Kbola(){
  ballSize -= 5
  
  if (ballSize < 0) {
    ballSize = 0;
 }
}

//Tambah dan Kurangi Gravitasi
function Tgravitasi(){
  gravity += 0.1
}

function Kgravitasi(){
  gravity -= 0.1
  
  if (gravity < 0) {
    gravity = 0;
 } 
}

//Tambah dan Kurangi Redaman
function Tdamping(){
  damping += 0.01
}

function Kdamping(){
  damping -= 0.01
  
  if (damping < 0) {
    damping = 0;
 }
}


function setup() {
  createCanvas( 1350,840);

  //menambahkan besar sudut awal
  s = createInput(0)
  s.position(22, 320)
  s.changed(sudut)
  sudut();
  
  //tombol Reset
  let tombolReset = createButton("Reset Angka");
  tombolReset.position(22, 620);
  tombolReset.mousePressed(resetNilai)
  
  //tomboh tambah panjang
  let tTali = createButton("+")
  tTali.position (62,380)
  tTali.mousePressed(Ttali)
  
  //Tombol Kurangi Panjang
  let kTali = createButton("-")
  kTali.position (22,380)
  kTali.mousePressed(Ktali)
  
  //tomboh tambah besar bola
  let tBola = createButton("+")
  tBola.position (62,440)
  tBola.mousePressed(Tbola)
  
  //Tombol Kurangi Besar Bola
  let kBola = createButton("-")
  kBola.position (22,440)
  kBola.mousePressed(Kbola)
  
  //Tombol tambah Gravitasi
  let tGravitasi = createButton("+")
  tGravitasi.position (62,500)
  tGravitasi.mousePressed(Tgravitasi)
  
  //Tombol Kurangi Gravitasi
  let kGravitasi = createButton("-")
  kGravitasi.position (22,500)
  kGravitasi.mousePressed(Kgravitasi)
  
  //Tombol tambah Redaman
  let tDamping = createButton("+")
  tDamping.position (62,560)
  tDamping.mousePressed(Tdamping)
  
  //Tombol Kurangi Redaman
  let kDamping = createButton("-")
  kDamping.position (22,560)
  kDamping.mousePressed(Kdamping)

  //Tombol Planet
  
  let tombolMerkurius = createButton("Merkurius");
  tombolMerkurius.position(300, 330);
  tombolMerkurius.mousePressed(() => updateGravity(3.7))

  let tombolVenus = createButton("Venus");
  tombolVenus.position(300, 380);
  tombolVenus.mousePressed(() => updateGravity(8.87))

  let tombolBumi = createButton("Bumi");
  tombolBumi.position(300, 430);
  tombolBumi.mousePressed(() => updateGravity(9.8))

  let tombolMars = createButton("Mars");
  tombolMars.position(300, 480);
  tombolMars.mousePressed(() => updateGravity(3.72))

  let tombolJupiter = createButton("Jupiter");
  tombolJupiter.position(300, 530);
  tombolJupiter.mousePressed(() => updateGravity(24.79))

  let tombolSaturnus = createButton("Saturnus");
  tombolSaturnus.position(300, 580);
  tombolSaturnus.mousePressed(() => updateGravity(10.44))

  let tombolUranus = createButton("Uranus");
  tombolUranus.position(300,630);
  tombolUranus.mousePressed(() => updateGravity(8.88))

  let tombolNeptunus = createButton("Neptunus");
  tombolNeptunus.position(300, 680);
  tombolNeptunus.mousePressed(() => updateGravity(11.15))

  let tombolBulan = createButton("Bulan");
  tombolBulan.position(300, 730);
  tombolBulan.mousePressed(() => updateGravity(1.62))

  let tombolList = [tombolMerkurius, tombolBumi, tombolVenus, 
  tombolMars, tombolJupiter, tombolSaturnus, tombolUranus, tombolNeptunus, tombolBulan];

  setButtonProperties(tombolList, '#4682b4', 'Comic Sans MS', '11px');

  function setButtonProperties(buttons, textColor, fontFamily, fontSize){
    buttons.forEach(button => {
      button.style('color', textColor)
      button.style('font-family', fontFamily)
      button.style('font-size', fontSize)
    })
  }

function sudut(){
  theta = radians(s.value())
 } 
}

function updateGravity(newGravity){
  gravity = newGravity;
}



function draw() {
  background(BG)
  
  fill("#00aeaeae")
  rect(1000,300,300,500)
  fyi()
  //Header
  fill("white")
  textSize(22)
  textFont('Comic Sans MS');
  text("SIMULASI GERAK PENDULUM",500,32)
  text("DENGAN VARIASI GRAVITASI PLANET DAN BULAN DI TATA SURYA",300,62)
  textSize(13)
  text("Mata Kuliah Visualisasi Dalam Sains"                ,560,80)
  
  image(mtk,1070,15,50,50)
  image(itera,230,15,50,50)
  image(sudut,550,198,300,400)

  image(merkurius,250,320,40,40)
  image(venus,250,370,38,38)
  image(bumi,250,420,35,35)
  image(mars,250,470,36,36)
  image(jupiter,240,515,53,53)
  image(saturnus,235,570,60,50)
  image(uranus,235,620,68,38)
  image(neptunus,248,670,38,38)
  image(bulan,250,720,36,36)

  //Content
  fill("white")
  textSize(20)
  textFont('Comic Sans MS')
 
  text("MARI KITA SIMULASI!!!",580,290)
  textSize(14)
  text("Pendulum atau biasa dikenal sebagai bandul merupakan contoh sistem fisik yang menggambarkan gerakan periodik. Dinamika pergerakan pendulum dipengaruhi oleh gaya gravitasi (g) yang bekerja",30,150)
  text("pada massa pendulum (m), serta panjang (l) dan sudut awalnya (θ). Selain faktor-faktor tersebut, masih ada satu faktor lainnya yang mempengaruhi pergerakan pendulum, yaitu faktor redaman (Q).", 30,170)
  

  text("Persamaan Pendulum Sederhana :",330,200)
  text("ω(t) = ω(t-∆t) + ((-g)/L(sin⁡(θ(t-∆t)))) * ∆t",330,220)
  text("θ(t)  = θ(t-∆t) + ω(t) * ∆t",330,240)
  
  text("Persamaan Pendulum Dengan Faktor Redaman :",670,200)
  text("ω(t) = ω(t-∆t) + ((-g)/L(sin⁡(θ(t-∆t)) - (Q.ω(t-∆t)))) * ∆t",670,220)
  text("θ(t)  = θ(t-∆t) + ω(t) * ∆t",670,240)
  
  textSize(17)
  textFont('Comic Sans MS')
  text("For Your Information",1070,330)

 
  //Fotter
  fill("white")
  textSize(11)
  textFont('Comic Sans MS')
  text("Dinda Salsabila (122160001) | Rizky Ahmad Rifai (122160002) | Indah Lusiana (122160007) | Anisa Fitri (122160011) | Rida Fitriani (122160013) | Ratu Ajeng Fadila Husen (122160029)",200,830)
  
  //Navigation Control
  fill("white")
  textSize(13)
  text("Masukkan Sudut Awal :"     ,22,310)
  text("Pilih planet/satelit :",250,310)
  
  //Menampilkan nilai variabel
  fill("white")
  text("Panjang Tali : "+pTali           ,22,370)
  text("Besar Bola : "+ballSize          ,22,430)
  text("Gaya Gravitasi : "+gravity.toFixed(2)       ,22,490)
  text("Besar Redaman : "+damping.toFixed(2)        ,22,550)
  // text("Kecepatan Sudut :"               ,22,430)
  // text(""+thetaVel                       ,22,450)

  fill("white")
  rect(650,330,100,40)

 
  
  //Koding Simulasi
  translate(700, 370); // Pusatkan canvas di tengah
  
  // Menghitung percepatan sudut
  thetaAcc = (-gravity / pTali) * sin(theta) -(damping * thetaVel);
  
  // Menghitung kecepatan sudut
  thetaVel += thetaAcc;
  
  // Menghitung sudut
  theta += thetaVel;
  
  // Hitung koordinat ujung tali
  let x = pTali * sin(theta);
  let y = pTali * cos(theta);
  
  // Gambar tali
  stroke(255);
  strokeWeight(3);
  line(0, 0, x, y);
  
  // Gambar bola
  noStroke();
  fill("#5d7a78");
  ellipse(x, y, ballSize, ballSize);
  
  
}

function Dbiasa(){
  fill("white")
  textFont('Comic Sans MS');
  textSize(14)
  text("Tata surya adalah sistem planet yang",1010,360)
  text("terdiri dari matahari dan objek-objek",1010,380)
  text("yang mengorbitnya, termasuk delapan ",1010,400)
  text("planet: Merkurius, Venus, Bumi, Mars,",1010,420)
  text("Jupiter, Saturnus, Uranus, dan Neptunus.",1010,440)
  text("Selain planet, terdapat juga bulan,",1010,460)
  text("asteroid, komet, dan planet kerdil ",1010,480)
  text("seperti Pluto. Gravitasi matahari menjaga",1010,500)
  text("semua objek tetap berada dalam orbitnya",1010,520)
  text("Tata surya terbentuk sekitar 4.6 milyar",1010,540)
  text("tahun lalu dari awan gas dan debu yang",1010,560)
  text("runtuh yang dikenal dengan Teori BigBang.",1010,580)
  text("Teori Bingbang menyatakan bahwa alam",1010,620)
  text("semesta bermula dari ledakan besar 13.8",1010,640)
  text("milyar tahun lalu. Dari titik sangat padat",1010,660)
  text("dan panas, alam semesta mengembang dan",1010,680)
  text("mendingin, membentuk materi dan struktur",1010,700)
  text("kosmos seperti galaksi, bintang, dan planet",1010,720)
}
function Dmerkurius(){
  image(merkurius,1140,350,140,150)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("MERKURIUS"                 ,1010,425)
  textSize(14)
  text("Merkurius memiliki banyak kawah seperti",1010,530)
  text("bulan, dan mengalami perubahan suhu yang",1010,550)
  text("sangat ekstrim. Saat malam hari suhunya",1010,570)
  text("-173°C hingga 427°C di siang hari,",1010,590)
  text("karena atmosfernya yang sangat tipis.",1010,610)
  text(": 3.7 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 4.880 km",1160,680) 
  text("Diameter",1010,680)
  text(": 3.285 x 10^23 kg",1160,700)
  text("Massa",1010,700)
  text(": 57.9 juta km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 59 hari",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 88 hari",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 0 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
}
function Dvenus(){
  image(venus,1130,350,150,150)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("VENUS"                 ,1030,425)
  textSize(14)
  text("Venus memiliki atmosfer tebal yang",1010,530)
  text("didominasi gas CO2 dan awan tebal belerang,",1010,550)
  text("menciptakan efek rumah kaca yang kuat",1010,570)
  text("dan tekanan yang sangat tinggi, setara",1010,590)
  text("dengan tekanan di dasar samudera bumi",1010,610)
  text(": 8.87 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 12.104 km",1160,680) 
  text("Diameter",1010,680)
  text(": 4.867 x 10^24 kg",1160,700)
  text("Massa",1010,700)
  text(": 108.2 juta km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 243 hari",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 225 hari",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 0 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
}
function Dbumi(){
  image(bumi,1130,350,150,150)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("BUMI"                 ,1030,425)
  textSize(14)
  text("Bumi memiliki lapisan ozon di stratosfer",1010,530)
  text("yang melindungi kehidupan dari sinar",1010,550)
  text("ultraviolet yang berbahaya. Planet ini",1010,570)
  text("juga memiliki satelit alami, Bulan, yang",1010,590)
  text("mempengaruhi pasang surut air laut.",1010,610)
  text(": 9.8 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 12.742 km",1160,680) 
  text("Diameter",1010,680)
  text(": 5,972 x 10^24 kg",1160,700)
  text("Massa",1010,700)
  text(": 149 juta km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 23 jam 56 menit",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 365,25 hari",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 1 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
  
}
function Dmars(){
  image(mars,1130,350,150,150)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("MARS"                 ,1030,425)
  textSize(14)
  text("Bukti terbaru menunjukkn bahwa Mars ",1010,530)
  text("memiliki danau besar yang terbuat dari air",1010,550)
  text("cair di bawah lapisan es kutub, indikasi",1010,570)
  text("potensi keberadaan kehidupan di masa lalu",1010,590)
  text("atau bahkan saat ini di planet tersebut.",1010,610)
  text(": 3.72 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 6.779 km",1160,680) 
  text("Diameter",1010,680)
  text(": 6.417 x 10^23 kg",1160,700)
  text("Massa",1010,700)
  text(": 227.9 juta km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 24 jam 36 menit",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 687 hari",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 2 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
}
function Djupiter(){
  image(jupiter,1100,320,200,200)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("JUPITER"                 ,1020,425)
  textSize(14)
  text("Planet Jupiter memiliki Badai Besar Merah,",1010,530)
  text("badai raksasa yang berlangsung selama",1010,550)
  text("berabad-abad, dengan diameter pusaran",1010,570)
  text("lebih besar dari bumi dan kecepatan angin",1010,590)
  text("yang mencapai 400 km/jam.",1010,610)
  text(": 24.79 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 139.822 km",1160,680) 
  text("Diameter",1010,680)
  text(": 1.898 x 10^27 kg",1160,700)
  text("Massa",1010,700)
  text(": 778.5 juta km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 9 jam 54 menit",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 11.86 tahun",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 75 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
}
function Dsaturnus(){
  image(saturnus,1130,350,160,150)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("SATURNUS"                 ,1010,425)
  textSize(14)
  text("Merkurius memiliki banyak kawah seperti",1010,530)
  text("bulan, dan mengalami perubahan suhu yang",1010,550)
  text("sangat ekstrim. Saat malam hari suhunya",1010,570)
  text("-173°C hingga 427°C di siang hari,",1010,590)
  text("karena atmosfernya yang sangat tipis.",1010,610)
  text(": 10.44 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 120.536 km",1160,680) 
  text("Diameter",1010,680)
  text(": 5.68 x 10^26 kg",1160,700)
  text("Massa",1010,700)
  text(": 1.4 milyar km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 10 jam 42 menit",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 29.5 tahun",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 82 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
}
function Duranus(){
  image(uranus,1110,350,170,120)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("URANUS"                 ,1010,425)
  textSize(14)
  text("Merkurius memiliki banyak kawah seperti",1010,530)
  text("bulan, dan mengalami perubahan suhu yang",1010,550)
  text("sangat ekstrim. Saat malam hari suhunya",1010,570)
  text("-173°C hingga 427°C di siang hari,",1010,590)
  text("karena atmosfernya yang sangat tipis.",1010,610)
  text(": 8.88 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 50.724 km",1160,680) 
  text("Diameter",1010,680)
  text(": 5.18 x 10^25 kg",1160,700)
  text("Massa",1010,700)
  text(": 2.9 milyar km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 17 jam 14 menit",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 84 tahun",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 27 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
}
function Dneptunus(){
  image(neptunus,1130,350,150,150)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("NEPTUNUS"                 ,1010,425)
  textSize(14)
  text("Merkurius memiliki banyak kawah seperti",1010,530)
  text("bulan, dan mengalami perubahan suhu yang",1010,550)
  text("sangat ekstrim. Saat malam hari suhunya",1010,570)
  text("-173°C hingga 427°C di siang hari,",1010,590)
  text("karena atmosfernya yang sangat tipis.",1010,610)
  text(": 11.15 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 49.244 km",1160,680) 
  text("Diameter",1010,680)
  text(": 1.024 x 10^26 kg",1160,700)
  text("Massa",1010,700)
  text(": 4.5 milyar km",1160,720)
  text("Jarak ke Matahari",1010,720)
  text(": 16 jam 6 menit",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 165 tahun",1160,760)
  text("Waktu Revolusi",1010,760)
  text(": 14 satelit",1160,780)
  text("Jumlah Satelit Alami",1010,780)
}
function Dbulan(){
  image(bulan,1130,350,150,150)
  fill("white")
  textSize(20)
  textFont('Comic Sans MS');
  text("BULAN"                 ,1020,425)
  textSize(14)
  text("Merkurius memiliki banyak kawah seperti",1010,530)
  text("bulan, dan mengalami perubahan suhu yang",1010,550)
  text("sangat ekstrim. Saat malam hari suhunya",1010,570)
  text("-173°C hingga 427°C di siang hari,",1010,590)
  text("karena atmosfernya yang sangat tipis.",1010,610)
  text(": 1.62 m/s^2",1160,660) 
  text("Percepatan Gravitasi",1010,660)
  text(": 3.475 km",1160,680) 
  text("Diameter",1010,680)
  text(": 7.342 x 10^22 kg",1160,700)
  text("Massa",1010,700)
  text(": 384.400 km",1160,720)
  text("Jarak ke Bumi",1010,720)
  text(": 27.3 hari",1160,740)
  text("Waktu Rotasi ",1010,740)
  text(": 27.3 hari",1160,760)
  text("Waktu Revolusi",1010,760)

}
function fyi(){
  if(gravity==3.70){
    Dmerkurius()
  }
  else if(gravity==8.87){
    Dvenus()
  }
  else if(gravity==9.80){
    Dbumi()
  }
  else if(gravity==3.72){
    Dmars()
  }
  else if(gravity==24.79){
    Djupiter()
  }
  else if(gravity==10.44){
    Dsaturnus()
  }
  else if(gravity==8.88){
    Duranus()
  }
  else if(gravity==11.15){
    Dneptunus()
  }
  else if(gravity==1.62){
    Dbulan()
  }
  else{
    Dbiasa()
  }
}