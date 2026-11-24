/* =========================================================
   MIO Software — Proje listesi
   ---------------------------------------------------------
   Yeni bir oyun/uygulama eklemek için bu diziye bir nesne ekle.
   Ana sayfadaki kartlar, filtre sayıları ve hero istatistikleri
   otomatik güncellenir.

   Alanlar:
     title     : Proje adı
     type      : "game" (oyun) | "app" (uygulama)
     tagline   : Kısa açıklama (1–2 cümle)
     platforms : ["iOS", "Android", "PC", "Web", ...] — henüz yoksa "iOS (yakında)" yazılabilir
     year      : Yıl (metin)
     status    : "live" (Yayında) | "soon" (Yakında) | "beta" (Beta) | "closed" (Kapalı Test)
     links     : { appstore, playstore, group (test grubuna katılma linki — önce bu), testing (kapalı test katılım linki), steam, web }  — boş bırakılanlar gösterilmez
     image     : (opsiyonel) "assets/img/proje.webp" — verilirse desen yerine görsel kullanılır
     screens   : (opsiyonel) Ekran görüntüleri [{ src, alt }]. Verilirse kapakta ilk 3'ü
                 yelpaze gibi dizilir ve karta tıklanınca galeri açılır.
     orientation: (opsiyonel) "landscape" → yatay ekran görüntüleri (oyunlar); varsayılan dikey telefon
     privacy   : (opsiyonel) Gizlilik politikası sayfası, ör. "carwash-tycoon/gizlilik.html"
     featured  : (opsiyonel) true → kart masaüstünde 2 sütun genişliğinde, öne çıkan proje
     cover     : Görsel yoksa kapak tasarımı (screens varsa sadece bg/accent kullanılır)
                 { art: "pixel"|"dots"|"stripes"|"rings", shape: "square"|"circle",
                   bg: "#hex", fg: "#hex", accent: "#hex", glyph: "Kısa harf" }

   Görselleri assets/img/projects/<proje-adi>/ klasörüne koy (WebP önerilir).
   ========================================================= */

window.MIO_PROJECTS = [
  {
    title: "ParkEt",
    type: "app",
    featured: true,
    tagline: "Boşalan park yeri, bekleyen sürücüye. Park yerinden çıkmadan önce bildir, yakındaki bir sürücü yerini ayırtsın; sen de puan kazan. Android ve iOS'ta ücretsiz.",
    platforms: ["Android", "iOS"],
    year: "2026",
    status: "live",
    links: {
      appstore: "https://apps.apple.com/tr/app/parket-bo%C5%9Falan-park-yeri/id6833449530?l=tr",
      playstore: "https://play.google.com/store/apps/details?id=com.codermert.parket",
      web: "https://auth.parketapp.org/"
    },
    screens: [
      { src: "assets/img/projects/parket/01-giris.webp", alt: "ParkEt giriş ekranı: Google ile giriş, kullanıcı girişi ve misafir seçenekleri" },
      { src: "assets/img/projects/parket/02-harita.webp", alt: "ParkEt harita ekranı: yakındaki park yerleri ve Çıkış Bildir butonu" },
      { src: "assets/img/projects/parket/03-cikis-bildir.webp", alt: "Park yerinden çıkıyorum ekranı: süre seçimi, ayırtmaya aç ve puan bilgisi" },
      { src: "assets/img/projects/parket/04-profil.webp", alt: "ParkEt profil ekranı: puan, verilen ve alınan yerler, rozetler" },
      { src: "assets/img/projects/parket/05-ayarlar.webp", alt: "ParkEt ayarlar ekranı: profil, araç, şifre, dil ve hesap silme" }
    ],
    cover: { bg: "#0C1F14", accent: "#2ECC71" }
  },
  {
    title: "CarWash Tycoon",
    type: "game",
    featured: true,
    tagline: "Boş bir arsayla başla, kendi oto yıkama imparatorluğunu kur. Otoyoldan geçen araçları çek; köpükle, süpür, parlat ve kasaya para yağsın. Peronlarını büyüt, marketini yönet, fiyatlarını kendin belirle. İnternetsiz oynanır, hesap gerekmez.",
    platforms: ["Android", "iOS"],
    year: "2026",
    status: "closed",
    links: {
      group: "https://groups.google.com/g/parket-test/members",
      testing: "https://play.google.com/apps/testing/com.miosoftware.carwash"
      // Mağazada yayınlanınca:
      // playstore: "https://play.google.com/store/apps/details?id=com.miosoftware.carwash"
    },
    privacy: "carwash-tycoon/gizlilik.html",
    orientation: "landscape",
    screens: [
      { src: "assets/img/projects/carwash-tycoon/gorsel1.webp", alt: "CarWash Tycoon oynanış: yıkama peronları, oto market ve rehber karakterin 'Kapasiteni büyüt' ipucu" },
      { src: "assets/img/projects/carwash-tycoon/gorsel2.webp", alt: "CarWash Tycoon ayarlar ekranı: ses, müzik, grafik kalitesi ve kare hızı seçenekleri" },
      { src: "assets/img/projects/carwash-tycoon/gorsel3.webp", alt: "CarWash Tycoon oynanış: peronlarda yıkanan araçlar ve toplanmayı bekleyen kazançlar" },
      { src: "assets/img/projects/carwash-tycoon/gorsel4.webp", alt: "CarWash Tycoon fiyat belirleme ekranı: yıkama, süpürge ve market ürünleri için fiyat ve müşteri tepkisi" }
    ],
    cover: { art: "rings", shape: "circle", bg: "#0E2A47", fg: "#7CC4FF", accent: "#FFC83D", glyph: "CW" }
  }

  // ---- Yeni oyun eklemek için şablon ----
  // Aşağıdaki satırların başındaki "// " kısmını sil ve bilgileri doldur.
  // ,{
  //   title: "Oyun Adı",
  //   type: "game",
  //   tagline: "Oyunu 1-2 cümleyle anlat.",
  //   platforms: ["Android"],
  //   year: "2026",
  //   status: "soon",
  //   links: { playstore: "" },
  //   screens: [
  //     { src: "assets/img/projects/oyun-adi/01.webp", alt: "Oyunun ana ekranı" }
  //   ],
  //   cover: { bg: "#0D0D0F", accent: "#FFC83D" }
  // }
];
