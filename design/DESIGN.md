# MIO Software — Tasarım Sistemi

> Kaynak: UI/UX Pro Max (ui-ux-pro-max v2.11) aramaları + marka brifi.
> Stil: **Swiss Modernism 2.0** (ızgara, net hiyerarşi, tek vurgu rengi) + oyun/mobil dokunuşları.
> "Yapay zekâ sitesi" klişelerinden kaçınılır: mor-mavi gradyan yok, parlayan glow yok, cam efekti yığını yok.

## 1. Konsept
**"Atölye vitrini."** Gümüş-beyaz bir zemin üzerinde siyah tipografi; sarı yalnızca vurgu ve
etkileşim rengi. Oyun/mobil kimliği, süs için değil *çalışan* küçük sahnelerle verilir:
hero'da kendi kendine oynayan mini bir oyun telefonu ve arkasında bir uygulama ekranı.

## 2. Renk Paleti
| Rol | Token | Hex | Kullanım |
|---|---|---|---|
| Zemin | `--bg` | `#E2E2DF` | Açık gümüş sayfa zemini |
| Zemin 2 | `--bg-2` | `#D4D4D0` | Hover, ikincil yüzey |
| Yüzey | `--surface` | `#FFFFFF` | Kartlar, form |
| Açık gümüş | `--silver` | `#C8C9CC` | Çizgiler, dekor, koyu bölümde metin |
| Koyu gümüş | `--silver-d` | `#9A9CA1` | Koyu zeminde ikincil metin |
| Siyah | `--ink` | `#0D0D0F` | Metin, koyu bölümler, birincil buton |
| Gri metin | `--muted` | `#55575D` | Açıklama metni (AA ✓ zemin üzerinde) |
| Çizgi | `--line` | `#C5C5C1` | Kenarlıklar |
| Sarı | `--yellow` | `#FFC83D` | Vurgu, CTA dolgusu (üstünde **daima siyah metin**) |
| Koyu sarı | `--yellow-d` | `#E8A900` | Küçük göstergeler |

Kural: Sarı asla açık zeminde metin rengi olarak kullanılmaz (kontrast yetersiz).

## 3. Tipografi
- Başlık: **Archivo** 700–900, sıkı harf aralığı (-0.03em)
- Gövde: **Space Grotesk** 400–600, 16px taban, 1.6 satır yüksekliği
- Etiket/teknik: **JetBrains Mono** 500, büyük harf, 0.06em aralık

## 4. Düzen
- Maks. genişlik 1240px, kenar boşluğu `clamp(16px, 4vw, 40px)`
- 8px taban birim; bölüm aralığı `clamp(80px, 12vw, 140px)` (ferah yoğunluk)
- Kırılımlar: 375 / 760 / 1024 / 1440

## 5. Sayfalar
**Ana Sayfa:** Hero (başlık + oynayan telefon) → kayan şerit → Projeler (filtre: Tümü/Oyun/Uygulama)
→ Nasıl çalışıyorum (koyu) → Sarı CTA → Footer
**Hakkımda:** Sayfa başlığı → Hikâye → Değerler → Araçlar → Yol haritası (kaydırınca dolan çizgi) → CTA
**İletişim:** Bilgiler + form (satır içi doğrulama, başarı durumu)

## 6. Hareket (bol ama hafif)
| Hareket | Teknik | Süre |
|---|---|---|
| Sayfa geçişi | Siyah perde (transform: scaleY) | 400–600ms |
| Başlık açılışı | Satır maskesi + sarı vurgulayıcı çizgi | 900ms |
| Kaydırma ile belirme | IntersectionObserver + opacity/translate, 80ms kademe | 700ms |
| Mini oyun / uygulama ekranı | Saf CSS keyframes | döngü |
| Kayan şerit | CSS translateX | 30s döngü |
| Kart eğimi | pointermove + rAF (yalnızca fare) | anlık |
| Sayaçlar | rAF, easeOutCubic | 1.4s |

**Performans kuralları:** Yalnızca `transform` ve `opacity` animasyonu; kütüphane yok (GSAP yok,
sıfır bağımlılık); ekran dışındaki ve arka plandaki sekmedeki animasyonlar duraklatılır;
`prefers-reduced-motion` desteklenir; JS kapalıyken içerik görünür kalır.

## 7. Bileşenler
- **Buton:** hap şekli, min 48px yükseklik; siyah butonda hover'da alttan sarı dolum
- **Proje kartı:** desenli kapak (görsel yoksa CSS deseni), tür rozeti, durum, platformlar, mağaza linkleri
- **Form alanı:** görünür etiket, odakta sarı halka, hata mesajı alanın altında

## 8. Kaçınılacaklar
Emoji ikon, mor/neon gradyan, aşırı glassmorphism, 0ms durum geçişleri, sadece hover'a dayalı bilgi,
placeholder'ı etiket gibi kullanmak, yatay kaydırma.
