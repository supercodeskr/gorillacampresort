import { Flame, Drumstick, Beef, Fish, Leaf, CupSoda, UtensilsCrossed, Soup, Wheat, Cookie, Utensils } from 'lucide-react';

export const menuData = [
  {
    id: 'nepali-dhido-set',
    title: 'Nepali Dhido Set',
    titleJp: 'ネパール・ディドセット',
    titleNp: 'नेपाली ढिडो सेट',
    icon: UtensilsCrossed,
    items: [
      {
        id: 'mutton-dhido-set',
        name: 'Mutton Dhido Set',
        nameJp: 'マトン・ディドセット',
        nameNp: 'मटन ढिडो सेट',
        price: 1800,
        desc: 'Traditional Nepali Dhido served with rich Mutton Curry, Dal, fresh Pickles, Spinach, and Yogurt.',
        descJp: '伝統的なネパールのディド。濃厚なマトンカレー、ダル、新鮮なピクルス、ほうれん草、ヨーグルトを添えて。',
        descNp: 'परम्परागत नेपाली ढिडो, स्वादिष्ट मटन करी, दाल, ताजा अचार, साग र दहीको साथ।',
        image: '/images/menu/mutton-dhido-set.jpg'
      },
      {
        id: 'chicken-dhido-set',
        name: 'Chicken Dhido Set',
        nameJp: 'チキン・ディドセット',
        nameNp: 'चिकेन ढिडो सेट',
        price: 1700,
        desc: 'Traditional Nepali Dhido served with flavorful Chicken Curry, Dal, Pickles, Spinach, and Yogurt.',
        descJp: '風味豊かなチキンカレー、ダル、ピクルス、ほうれん草、ヨーグルトを添えた伝統的なネパールのディド。',
        descNp: 'स्वादिष्ट चिकेन करी, दाल, अचार, साग र दहीको साथ परम्परागत नेपाली ढिडो।',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'veg-dhido-set',
        name: 'Veg Dhido Set',
        nameJp: 'ベジ・ディドセット',
        nameNp: 'भेज ढिडो सेट',
        price: 1500,
        desc: 'Healthy Veg Curry served with traditional Dhido, Dal, Pickles, Spinach, and Yogurt.',
        descJp: 'ヘルシーな野菜カレー。伝統的なディド、ダル、ピクルス、ほうれん草、ヨーグルトとともに。',
        descNp: 'स्वस्थ भेज करी, परम्परागत ढिडो, दाल, अचार, साग र दहीको साथ।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'nepali-thakali-khana',
    title: 'Nepali Thakali Khana Set',
    titleJp: 'タカリカナセット',
    titleNp: 'नेपाली थकाली खाना सेट',
    icon: Soup,
    items: [
      {
        id: 'mutton-thakali',
        name: 'Mutton Thakali Khana Set',
        nameJp: 'マトン・タカリカナセット',
        nameNp: 'मटन थकाली खाना सेट',
        price: 1700,
        desc: 'Premium Thakali thali with tender mutton curry, black lentils, ghee, and seasonal side dishes.',
        descJp: '柔らかいマトンカレー、黒レンズ豆、ギー、季節の副菜を添えたプレミアムなタカリターリー。',
        descNp: 'नरम मटन करी, कालो दाल, घिउ र मौसमी तरकारीहरू सहितको प्रिमियम थकाली थाली।',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-thakali',
        name: 'Chicken Thakali Khana Set',
        nameJp: 'チキン・タカリカナセット',
        nameNp: 'चिकेन थकाली खाना सेट',
        price: 1300,
        desc: 'Authentic Thakali thali featuring homestyle chicken curry, black lentils, and fresh vegetable sides.',
        descJp: '家庭的なチキンカレー、黒レンズ豆、新鮮な野菜の副菜を特徴とする本格的なタカリターリー。',
        descNp: 'घरेलु चिकेन करी, कालो दाल र ताजा तरकारीहरू सहितको प्रामाणिक थकाली थाली।',
        image: '/images/menu/chicken-thakali.jpg'
      },
      {
        id: 'veg-thakali',
        name: 'Veg Thakali Khana Set',
        nameJp: 'ベジ・タカリカナセット',
        nameNp: 'भेज थकाली खाना सेट',
        price: 1200,
        desc: 'A fully vegetarian Thakali feast with seasonal vegetable curry, black lentils, and organic greens.',
        descJp: '季節の野菜カレー、黒レンズ豆、オーガニック野菜を添えた完全なベジタリアンタカリのごちそう。',
        descNp: 'मौसमी भेज करी, कालो दाल र अर्गानिक सागपात सहितको शाकाहारी थकाली खाना।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pork-thakali',
        name: 'Pork Thakali Khana Set',
        nameJp: 'ポーク・タカリカナセット',
        nameNp: 'पोर्क थकाली खाना सेट',
        price: 1500,
        desc: 'Rich and savory pork curry served in a traditional Thakali set with lentils and rice.',
        descJp: '伝統的なタカリセットで提供される、濃厚で風味豊かなポークカレー。レンズ豆とご飯とともに。',
        descNp: 'परम्परागत थकाली सेटमा दाल र भातको साथ स्वादिष्ट पोर्क करी।',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'sukuti-thakali',
        name: 'Sukuti Thakali Khana Set',
        nameJp: 'スクティ・タカリカナセット',
        nameNp: 'सुकुटी थकाली खाना सेट',
        price: 1600,
        desc: 'Spicy dried meat (Sukuti) served as part of a hearty and authentic Thakali Khana set.',
        descJp: 'スパイシーな干し肉（スクティ）を、ボリューム満点の本格的なタカリカナセットの一部として提供します。',
        descNp: 'पिरो सुकुटी (सुकाएको मासु) सहितको प्रामाणिक र स्वादिष्ट थकाली खाना सेट।',
        image: 'https://images.unsplash.com/photo-1627308595229-78308dd0b4e1?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'sekuwa-choila',
    title: 'Sekuwa & Choila',
    titleJp: 'セクワ＆チョイラ',
    titleNp: 'सेकुवा र चोइला',
    icon: Flame,
    items: [
      {
        id: 'mutton-sekuwa',
        name: 'Mutton Sekuwa',
        nameJp: 'マトンセクワ',
        nameNp: 'मटन सेकुवा',
        price: 950,
        desc: 'Grilled chunks of marinated mutton.',
        descJp: 'マリネしたマトンの炭火焼き。',
        descNp: 'मसलामा मोलेर पोलेको मटन।',
        image: '/images/menu/mutton-sekuwa.jpg'
      },
      {
        id: 'chicken-sekuwa',
        name: 'Chicken Sekuwa',
        nameJp: 'チキンセクワ',
        nameNp: 'चिकेन सेकुवा',
        price: 800,
        desc: 'Juicy charcoal-grilled chicken skewers.',
        descJp: 'ジューシーなチキンの炭火焼き。',
        descNp: 'कोइलामा पोलेको रसिलो चिकेन।',
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pork-sekuwa',
        name: 'Pork Sekuwa',
        nameJp: 'ポルクセクワ',
        nameNp: 'पोर्क सेकुवा',
        price: 900,
        desc: 'Smoky and savory grilled pork chunks.',
        descJp: 'スモーキーで風味豊かなポークの炭火焼き。',
        descNp: 'स्मोकी र स्वादिष्ट पोर्क सेकुवा।',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'duck-choila',
        name: 'Duck Choila',
        nameJp: 'ダックチョイラ',
        nameNp: 'डक चोइला',
        price: 900,
        desc: 'Spicy roasted duck tossed with mustard oil and spices.',
        descJp: 'マスタードオイルとスパイスで和えたスパイシーなローストダック。',
        descNp: 'तोरीको तेल र मसलामा मोलेको पिरो डक चोइला।',
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mutton-choila',
        name: 'Mutton Choila',
        nameJp: 'マトンチョイラ',
        nameNp: 'मटन चोइला',
        price: 950,
        desc: 'Roasted mutton mixed with traditional Newari spices.',
        descJp: '伝統的なネワール族のスパイスとミックスしたローストマトン。',
        descNp: 'परम्परागत नेवारी मसलामा मोलेको मटन चोइला।',
        image: 'https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-choila',
        name: 'Chicken Choila',
        nameJp: 'チキンチョイラ',
        nameNp: 'चिकेन चोइला',
        price: 800,
        desc: 'Spicy roasted chicken salad.',
        descJp: 'スパイシーなローストチキンサラダ。',
        descNp: 'पिरो चिकेन चोइला।',
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pork-choila',
        name: 'Pork Choila',
        nameJp: 'ポルクチョイラ',
        nameNp: 'पोर्क चोइला',
        price: 850,
        desc: 'Roasted pork with a spicy kick.',
        descJp: 'ピリッと辛いローストポーク。',
        descNp: 'पिरो पोर्क चोइला।',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'veg-choila',
        name: 'Veg Choila',
        nameJp: '野菜チョイラ',
        nameNp: 'भेज चोइला',
        price: 700,
        desc: 'Spicy vegetarian choice with soybean and potatoes.',
        descJp: '大豆とジャガイモを使ったスパイシーなベジタリアンチョイラ。',
        descNp: 'भटमास र आलुको पिरो शाकाहारी चोइला।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'snacks',
    title: 'Snacks',
    titleJp: 'スナック',
    titleNp: 'स्न्याक्स',
    icon: Cookie,
    items: [
      {
        id: 'steam-momo',
        name: 'Steam MoMo',
        nameJp: 'スチームモモ',
        nameNp: 'स्टिम ममो',
        price: 600,
        desc: 'Traditional Nepali steamed dumplings.',
        descJp: '伝統的なネパールの蒸し餃子。',
        descNp: 'परम्परागत नेपाली स्टिम ममो।',
        image: '/images/menu/steam-momo.jpg'
      },
      {
        id: 'soup-momo',
        name: 'Soup MoMo',
        nameJp: 'スープモモ',
        nameNp: 'सुप ममो',
        price: 700,
        desc: 'Dumplings served in a hot, flavorful broth.',
        descJp: '熱くて風味豊かなスープに入った餃子。',
        descNp: 'तातो र स्वादिष्ट झोलमा ममो।',
        image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'fried-momo',
        name: 'Fried MoMo',
        nameJp: '揚げモモ',
        nameNp: 'फ्राई ममो',
        price: 800,
        desc: 'Crispy deep-fried dumplings.',
        descJp: 'サクサクの揚げ餃子。',
        descNp: 'कुरकुरे फ्राई ममो।',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pani-puri',
        name: 'Pani Puri',
        nameJp: 'パニプリ',
        nameNp: 'पानी पुरी',
        price: 600,
        desc: 'Crispy hollow dough balls filled with spicy water.',
        descJp: 'スパイシーな水で満たされたサクサクの丸い生地。',
        descNp: 'पिरो पानीले भरिएको कुरकुरे पुरी।',
        image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chatpat',
        name: 'Chatpat',
        nameJp: 'チャットパット',
        nameNp: 'चटपटे',
        price: 600,
        desc: 'Spicy and tangy puffed rice salad.',
        descJp: 'スパイシーで酸味のあるポン菓子のサラダ。',
        descNp: 'पिरो र अमिलो चटपटे।',
        image: 'https://images.unsplash.com/photo-1627308595229-78308dd0b4e1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'vatamas-sadeko',
        name: 'Vatamas Sadeko',
        nameJp: 'バタマスサデコ',
        nameNp: 'भटमास साधेको',
        price: 650,
        desc: 'Spicy roasted soybean salad.',
        descJp: 'スパイシーなロースト大豆のサラダ。',
        descNp: 'पिरो भटमास साधेको।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'peanut-sadeko',
        name: 'Peanut Sadeko',
        nameJp: 'ピーナッツサデコ',
        nameNp: 'बदाम साधेको',
        price: 700,
        desc: 'Spicy peanut salad with onions and chilies.',
        descJp: '玉ねぎと唐辛子を使ったスパイシーなピーナッツサラダ。',
        descNp: 'प्याज र खुर्सानीसँग बदाम साधेको।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'masala-papad',
        name: 'Masala Papad',
        nameJp: 'マサラパパド',
        nameNp: 'मसला पापड',
        price: 600,
        desc: 'Crispy lentil cracker topped with spicy onion and tomato.',
        descJp: 'スパイシーな玉ねぎとトマトをトッピングしたサクサクの豆クラッカー。',
        descNp: 'प्याज र गोलभेडा सहितको कुरकुरे मसला पापड।',
        image: 'https://images.unsplash.com/photo-1627308595229-78308dd0b4e1?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'curry',
    title: 'Curry',
    titleJp: 'カレー',
    titleNp: 'करी',
    icon: UtensilsCrossed,
    items: [
      {
        id: 'chicken-curry',
        name: 'Chicken Curry',
        nameJp: 'チキンカレー',
        nameNp: 'चिकेन करी',
        price: 800,
        desc: 'Rich homestyle chicken curry.',
        descJp: '濃厚な家庭風チキンカレー。',
        descNp: 'स्वादिष्ट घरेलु चिकेन करी।',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mutton-curry',
        name: 'Mutton Curry',
        nameJp: 'マトンカレー',
        nameNp: 'मटन करी',
        price: 1000,
        desc: 'Slow-cooked savory mutton curry.',
        descJp: 'じっくり煮込んだ風味豊かなマトンカレー。',
        descNp: 'राम्रोसँग पकाएको स्वादिष्ट मटन करी।',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'dal-fry',
        name: 'Dal Fry',
        nameJp: 'ダルフライ',
        nameNp: 'दाल फ्राइ',
        price: 600,
        desc: 'Yellow lentils tempered with ghee and spices.',
        descJp: 'ギーとスパイスで風味付けした黄色いレンズ豆。',
        descNp: 'घिउ र मसलामा झानेको दाल फ्राइ।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mutton-horenso',
        name: 'Mutton Horenso',
        nameJp: 'マトンほうれん草',
        nameNp: 'मटन पालक',
        price: 950,
        desc: 'Mutton cooked with fresh spinach puree.',
        descJp: '新鮮なほうれん草のピューレと一緒に煮込んだマトン。',
        descNp: 'पालक सागसँग पकाएको मटन करी।',
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'pork-curry',
        name: 'Pork Curry',
        nameJp: 'ポークカレー',
        nameNp: 'पोर्क करी',
        price: 900,
        desc: 'Spicy and tender pork curry.',
        descJp: 'スパイシーで柔らかいポークカレー。',
        descNp: 'पिरो र नरम पोर्क करी।',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-horenso',
        name: 'Chicken Horenso',
        nameJp: 'チキンほうれん草',
        nameNp: 'चिकेन पालक',
        price: 800,
        desc: 'Chicken cooked with fresh spinach.',
        descJp: '新鮮なほうれん草と一緒に煮込んだチキン。',
        descNp: 'पालक सागसँग पकाएको चिकेन।',
        image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mix-veg-curry',
        name: 'Mix Vegetable',
        nameJp: 'ミックス野菜カレー',
        nameNp: 'मिक्स भेज करी',
        price: 800,
        desc: 'Seasonal mixed vegetables in a rich curry sauce.',
        descJp: '濃厚なカレーソースに入った季節のミックス野菜。',
        descNp: 'मौसमी तरकारीहरूको मिक्स भेज करी।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'nan-piza',
    title: 'Nan & Piza',
    titleJp: 'ナン＆ピザ',
    titleNp: 'नान र पिज्जा',
    icon: Wheat,
    items: [
      {
        id: 'butter-nan',
        name: 'Butter Nan',
        nameJp: 'バターナン',
        nameNp: 'बटर नान',
        price: 300,
        desc: 'Soft flatbread brushed with butter.',
        descJp: 'バターを塗った柔らかいフラットブレッド。',
        descNp: 'बटर लगाएको नरम नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'cheese-nan',
        name: 'Cheese Nan',
        nameJp: 'チーズナン',
        nameNp: 'चिज नान',
        price: 500,
        desc: 'Flatbread stuffed with melting cheese.',
        descJp: 'とろけるチーズを詰めたフラットブレッド。',
        descNp: 'चिजले भरिएको स्वादिष्ट नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'garlic-nan',
        name: 'Garlic Nan',
        nameJp: 'ガーリックナン',
        nameNp: 'गार्लिक नान',
        price: 400,
        desc: 'Garlic infused flatbread.',
        descJp: 'ガーリック風味のフラットブレッド。',
        descNp: 'लसुनको स्वाद भएको नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mutton-keema-nan',
        name: 'Mutton Keema Nan',
        nameJp: 'マトンキーマナン',
        nameNp: 'मटन किमा नान',
        price: 600,
        desc: 'Stuffed with spiced minced mutton.',
        descJp: 'スパイスの効いたマトンのひき肉を詰めました。',
        descNp: 'मटनको किमाले भरिएको नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-keema-nan',
        name: 'Chicken Keema Nan',
        nameJp: 'チキンキーマナン',
        nameNp: 'चिकेन किमा नान',
        price: 500,
        desc: 'Stuffed with spiced minced chicken.',
        descJp: 'スパイスの効いたチキンのひき肉を詰めました。',
        descNp: 'चिकेनको किमाले भरिएको नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mushroom-keema-nan',
        name: 'Masroom Keema Nan',
        nameJp: 'マッシュルームキーマナン',
        nameNp: 'च्याउ किमा नान',
        price: 450,
        desc: 'Stuffed with spiced mushrooms.',
        descJp: 'スパイスの効いたマッシュルームを詰めました。',
        descNp: 'च्याउले भरिएको नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'banana-keema-nan',
        name: 'Banana Keema Nan',
        nameJp: 'バナナキーマナン',
        nameNp: 'केरा किमा नान',
        price: 500,
        desc: 'Sweet naan stuffed with banana.',
        descJp: 'バナナを詰めた甘いナン。',
        descNp: 'केराले भरिएको गुलियो नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'choco-nan',
        name: 'Choco Naan',
        nameJp: 'チョコナン',
        nameNp: 'चोको नान',
        price: 500,
        desc: 'Sweet naan stuffed with chocolate.',
        descJp: 'チョコレートを詰めた甘いナン。',
        descNp: 'चकलेटले भरिएको गुलियो नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'piza-nan',
        name: 'Piza Nan',
        nameJp: 'ピザナン',
        nameNp: 'पिज्जा नान',
        price: 550,
        desc: 'Naan bread with pizza toppings.',
        descJp: 'ピザのトッピングをしたナンブレッド。',
        descNp: 'पिज्जा टपिङ्स सहितको नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mix-veg-nan',
        name: 'Mix Veg Nan',
        nameJp: 'ミックスベジナン',
        nameNp: 'मिक्स भेज नान',
        price: 500,
        desc: 'Stuffed with mixed vegetables.',
        descJp: 'ミックス野菜を詰めました。',
        descNp: 'मिक्स तरकारीले भरिएको नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'khajur-nan',
        name: 'Khajur Nan',
        nameJp: 'カジュールナン',
        nameNp: 'खजुर नान',
        price: 550,
        desc: 'Sweet naan stuffed with dates.',
        descJp: 'デーツを詰めた甘いナン。',
        descNp: 'खजुरले भरिएको गुलियो नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'fruit-nan',
        name: 'Fruit Nan',
        nameJp: 'フルーツナン',
        nameNp: 'फ्रुट नान',
        price: 600,
        desc: 'Sweet naan stuffed with mixed fruits.',
        descJp: 'ミックスフルーツを詰めた甘いナン。',
        descNp: 'फलफूलले भरिएको गुलियो नान।',
        image: 'https://images.unsplash.com/photo-1565557618462-817abdf43fdb?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'tandoori-biryani',
    title: 'Tandoori & Biryani & Pokoda',
    titleJp: 'タンドリー・ビリヤニ・パコダ',
    titleNp: 'तन्दुरी, बिरयानी र पकोडा',
    icon: Drumstick,
    items: [
      {
        id: 'tandoori-chicken-full',
        name: 'Tandoori Chicken Full',
        nameJp: 'タンドリーチキンフル',
        nameNp: 'तन्दुरी चिकेन फुल',
        price: 2000,
        desc: 'Whole chicken marinated and roasted in tandoor.',
        descJp: 'タンドールでマリネしてローストした丸ごとチキン。',
        descNp: 'तन्दुरमा रोस्ट गरिएको सिंगो चिकेन।',
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'tandoori-chicken-half',
        name: 'Tandoori Chicken 2 Legs',
        nameJp: 'タンドリーチキン 2p',
        nameNp: 'तन्दुरी चिकेन २ पिस',
        price: 1050,
        desc: 'Two pieces of juicy tandoori chicken legs.',
        descJp: 'ジューシーなタンドリーチキンレッグ2本。',
        descNp: 'तन्दुरी चिकेन लेग २ पिस।',
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-tikka',
        name: 'Chicken Tikka',
        nameJp: 'チキンティッカ',
        nameNp: 'चिकेन टिक्का',
        price: 900,
        desc: 'Boneless chicken marinated and roasted.',
        descJp: 'マリネしてローストした骨なしチキン。',
        descNp: 'तन्दुरमा रोस्ट गरिएको बोनलेस चिकेन।',
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-paneer-tikka',
        name: 'Chicken Paneer Tikka',
        nameJp: 'チキンパニールティッカ',
        nameNp: 'चिकेन पनीर टिक्का',
        price: 1100,
        desc: 'Chicken and cottage cheese roasted in tandoor.',
        descJp: 'タンドールでローストしたチキンとカッテージチーズ。',
        descNp: 'तन्दुरमा रोस्ट गरिएको चिकेन र पनीर।',
        image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'ebi-mayonnaise',
        name: 'Ebi Mayonnaise',
        nameJp: 'エビマヨネーズ',
        nameNp: 'प्रान मेयोनेज',
        price: 1100,
        desc: 'Shrimp mixed with creamy mayonnaise.',
        descJp: 'クリーミーなマヨネーズと和えたエビ。',
        descNp: 'मेयोनेजसँग क्रिमी झिंगा माछा।',
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mutton-biryani',
        name: 'Mutton Biryani',
        nameJp: 'マトンビリヤニ',
        nameNp: 'मटन बिरयानी',
        price: 1700,
        desc: 'Aromatic basmati rice cooked with tender mutton.',
        descJp: '柔らかいマトンと一緒に炊き上げた香り高いバスマティライス。',
        descNp: 'मटन र बासमती चामलको सुगन्धित बिरयानी।',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-biryani',
        name: 'Chicken Biryani',
        nameJp: 'チキンビリヤニ',
        nameNp: 'चिकेन बिरयानी',
        price: 1500,
        desc: 'Aromatic basmati rice cooked with chicken.',
        descJp: 'チキンと一緒に炊き上げた香り高いバスマティライス。',
        descNp: 'चिकेन र बासमती चामलको सुगन्धित बिरयानी।',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mix-biryani',
        name: 'Mix Biryani',
        nameJp: 'ミックスビリヤニ',
        nameNp: 'मिक्स बिरयानी',
        price: 1800,
        desc: 'Aromatic basmati rice cooked with mixed meats and veg.',
        descJp: 'ミックスミートと野菜と一緒に炊き上げた香り高いバスマティライス。',
        descNp: 'मिक्स मासु र तरकारीको सुगन्धित बिरयानी।',
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mutton-pokoda',
        name: 'Mutton Pokoda',
        nameJp: 'マトンパコダ',
        nameNp: 'मटन पकोडा',
        price: 1100,
        desc: 'Deep-fried mutton fritters.',
        descJp: 'マトンのフリッター（揚げ物）。',
        descNp: 'मटनको फ्राई पकोडा।',
        image: 'https://images.unsplash.com/photo-1627308595229-78308dd0b4e1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chicken-pokoda',
        name: 'Chicken Pokoda',
        nameJp: 'チキンパコダ',
        nameNp: 'चिकेन पकोडा',
        price: 1000,
        desc: 'Deep-fried chicken fritters.',
        descJp: 'チキンのフリッター（揚げ物）。',
        descNp: 'चिकेनको फ्राई पकोडा।',
        image: 'https://images.unsplash.com/photo-1627308595229-78308dd0b4e1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'veg-pokoda',
        name: 'Veg Pokoda',
        nameJp: '野菜パコダ',
        nameNp: 'भेज पकोडा',
        price: 900,
        desc: 'Deep-fried vegetable fritters.',
        descJp: '野菜のフリッター（揚げ物）。',
        descNp: 'तरकारीको फ्राई पकोडा।',
        image: 'https://images.unsplash.com/photo-1627308595229-78308dd0b4e1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mushroom-pokoda',
        name: 'Mushroom Pokoda',
        nameJp: 'キノコパコダ',
        nameNp: 'च्याउ पकोडा',
        price: 950,
        desc: 'Deep-fried mushroom fritters.',
        descJp: 'マッシュルームのフリッター（揚げ物）。',
        descNp: 'च्याउको फ्राई पकोडा।',
        image: 'https://images.unsplash.com/photo-1627308595229-78308dd0b4e1?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'lassi',
    title: 'Lassi',
    titleJp: 'ラッシー',
    titleNp: 'लस्सी',
    icon: CupSoda,
    items: [
      {
        id: 'lassi-plain',
        name: 'Lassi',
        nameJp: 'ラッシー',
        nameNp: 'लस्सी',
        price: 300,
        desc: 'Sweet yogurt drink.',
        descJp: '甘いヨーグルトドリンク。',
        descNp: 'गुलियो दहीको पेय।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'kaju-lassi',
        name: 'Kaju Lassi',
        nameJp: 'カジュラッシー',
        nameNp: 'काजु लस्सी',
        price: 500,
        desc: 'Yogurt drink blended with cashews.',
        descJp: 'カシューナッツをブレンドしたヨーグルトドリンク。',
        descNp: 'काजु मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'khajur-lassi',
        name: 'Khajur Lassi',
        nameJp: 'カジュールラッシー',
        nameNp: 'खजुर लस्सी',
        price: 600,
        desc: 'Yogurt drink blended with dates.',
        descJp: 'デーツをブレンドしたヨーグルトドリンク。',
        descNp: 'खजुर मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'mango-lassi',
        name: 'Mango Lassi',
        nameJp: 'マンゴーラッシー',
        nameNp: 'म्यांगो लस्सी',
        price: 350,
        desc: 'Yogurt drink blended with mango.',
        descJp: 'マンゴーをブレンドしたヨーグルトドリンク。',
        descNp: 'आँप मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'orange-lassi',
        name: 'Orange Lassi',
        nameJp: 'オレンジラッシー',
        nameNp: 'अरेन्ज लस्सी',
        price: 350,
        desc: 'Yogurt drink blended with orange.',
        descJp: 'オレンジをブレンドしたヨーグルトドリンク。',
        descNp: 'सुन्तला मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'strawberry-lassi',
        name: 'Strawberry Lassi',
        nameJp: 'ストロベリーラッシー',
        nameNp: 'स्ट्रबेरी लस्सी',
        price: 600,
        desc: 'Yogurt drink blended with strawberry.',
        descJp: 'ストロベリーをブレンドしたヨーグルトドリンク。',
        descNp: 'स्ट्रबेरी मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'chocolate-lassi',
        name: 'Chocolate Lassi',
        nameJp: 'チョコレートラッシー',
        nameNp: 'चकलेट लस्सी',
        price: 450,
        desc: 'Yogurt drink blended with chocolate.',
        descJp: 'チョコレートをブレンドしたヨーグルトドリンク。',
        descNp: 'चकलेट मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'banana-lassi',
        name: 'Banana Lassi',
        nameJp: 'バナナラッシー',
        nameNp: 'बनाना लस्सी',
        price: 450,
        desc: 'Yogurt drink blended with banana.',
        descJp: 'バナナをブレンドしたヨーグルトドリンク。',
        descNp: 'केरा मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'kivi-lassi',
        name: 'Kivi Lassi',
        nameJp: 'キウイラッシー',
        nameNp: 'किवी लस्सी',
        price: 550,
        desc: 'Yogurt drink blended with kiwi.',
        descJp: 'キウイをブレンドしたヨーグルトドリンク。',
        descNp: 'किवी मिसाएको लस्सी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'bbq-party',
    title: 'BBQ Party Course Menu',
    titleJp: 'バーベキューパーティーコースメニュー',
    titleNp: 'BBQ पार्टी कोर्स',
    icon: Flame,
    items: [
      {
        id: 'combo-set',
        name: 'Combo Set',
        nameJp: 'コンボセット',
        nameNp: 'कम्बो सेट',
        price: 8999,
        desc: 'Chicken Wings, Pork Meat, Edamame, French Fry, Mix Veg, Chatpat, Panipuri, Juice, Sausage, Chowmin, Pork Spine, Lamb Spine, Mix Fruit, Corn.',
        descJp: '手羽先、豚肉、枝豆、フライドポテト、ミックスベジ、チャットパット、パニプリ、ジュース、ソーセージ、チョウミン、ポークスピナー、ランプスピナー、ミックスフルーツ、トウモロコシが含まれた豪華コンボ。',
        descNp: 'चिकेन विंग्स, पोर्क मिट, एडामामे, फ्रेन्च फ्राइज, मिक्स भेज, चटपटे, पानीपुरी, जुस, ससेज, चाउमिन, पोर्क स्पाइन, भेडाको स्पाइन, मिक्स फ्रुट र मकै समावेश कम्बो सेट।',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'a-course',
        name: 'A Course (Day Course 120 min)',
        nameJp: 'Aコース (デイタイム 120分)',
        nameNp: 'A कोर्स (दिउँसो १२० मिनेट)',
        price: 4999,
        desc: 'All-You-Can-Drink! Includes Beef, Chicken, Pork, Edamame, French Fries, Mix Veg, Chatpat, Panipuri, Sausage, Seafood. Extensions: +1Hr(¥1000), +2Hr(¥1500), +3Hr(¥2500)',
        descJp: '飲み放題！牛肉、鶏肉、豚肉、枝豆、ポテト、ミックスベジ、チャットパット、パニプリ、ソーセージ、シーフード込み。延長: +1時間(¥1000), +2時間(¥1500), +3時間(¥2500)',
        descNp: 'सबै पिउन सक्नुहुन्छ! गाईको मासु, कुखुरा, सुँगुरको मासु, एडामामे, फ्रेन्च फ्राइज, मिक्स भेज, चटपटे, पानीपुरी, ससेज, समुद्री खाना। थप समय: +1 घण्टा(¥1000), +2 घण्टा(¥1500), +3 घण्टा(¥2500)',
        image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'night-course',
        name: 'Night Course (180 min)',
        nameJp: 'ナイトコース (180分)',
        nameNp: 'नाइट कोर्स (१८० मिनेट)',
        price: 7999,
        desc: 'All-You-Can-Drink! Includes Beef, Chicken, Pork, Edamame, French Fries, Mix Veg, Chatpat, Panipuri, Sausage, Seafood. Extensions: +1Hr(¥1500), +2Hr(¥2500), +3Hr(¥3000)',
        descJp: '飲み放題！牛肉、鶏肉、豚肉、枝豆、ポテト、ミックスベジ、チャットパット、パニプリ、ソーセージ、シーフード込み。延長: +1時間(¥1500), +2時間(¥2500), +3時間(¥3000)',
        descNp: 'सबै पिउन सक्नुहुन्छ! गाईको मासु, कुखुरा, सुँगुरको मासु, एडामामे, फ्रेन्च फ्राइज, मिक्स भेज, चटपटे, पानीपुरी, ससेज, समुद्री खाना। थप समय: +1 घण्टा(¥1500), +2 घण्टा(¥2500), +3 घण्टा(¥3000)',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'drinks',
    title: 'Drinks',
    titleJp: 'ドリンク',
    titleNp: 'ड्रिंक्स',
    icon: CupSoda,
    items: [
      {
        id: 'draft-beer',
        name: 'Draft Beer',
        nameJp: '生ビール',
        nameNp: 'ड्राफ्ट बियर',
        price: 500,
        desc: 'Ice-cold draft beer.',
        descJp: 'キンキンに冷えた生ビール。',
        descNp: 'चिसो ड्राफ्ट बियर।',
        image: 'https://images.unsplash.com/photo-1538481199005-9715c6d68ea7?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'corona',
        name: 'Corona Beer',
        nameJp: 'コロナビール',
        nameNp: 'कोरोना बियर',
        price: 550,
        desc: 'Refreshing Corona beer.',
        descJp: '爽やかなコロナビール。',
        descNp: 'कोरोना बियर।',
        image: 'https://images.unsplash.com/photo-1571613316887-6f8d5cbf7ef7?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'nepal-ice',
        name: 'Nepal Ice',
        nameJp: 'ネパールアイス',
        nameNp: 'नेपाल आइस',
        price: 600,
        desc: 'Popular Nepalese beer.',
        descJp: 'ネパールで人気のビール。',
        descNp: 'नेपालको लोकप्रिय बियर।',
        image: 'https://images.unsplash.com/photo-1538481199005-9715c6d68ea7?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'bottle-beer',
        name: 'Bottle Beer',
        nameJp: '瓶ビール',
        nameNp: 'बोटल बियर',
        price: 600,
        desc: 'Classic bottled beer.',
        descJp: '定番の瓶ビール。',
        descNp: 'क्लासिक बोटल बियर।',
        image: 'https://images.unsplash.com/photo-1538481199005-9715c6d68ea7?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'red-white-wine',
        name: 'Red/White Wine',
        nameJp: '赤/白ワイン',
        nameNp: 'रेड/ह्वाइट वाइन',
        price: 400,
        desc: 'Glass ¥400 / Bottle ¥3000.',
        descJp: 'グラス ¥400 / ボトル ¥3000',
        descNp: 'गिलास ¥400 / बोटल ¥3000',
        image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'cocktail',
        name: 'Cocktail',
        nameJp: 'カクテル',
        nameNp: 'कक्टेल',
        price: 450,
        desc: 'Cassis Orange, Cassis Soda, Cassis Oolong.',
        descJp: 'カシスオレンジ、カシスソーダ、カシスウーロン。',
        descNp: 'क्यासिस सुन्तला, क्यासिस सोडा, क्यासिस उलोङ।',
        image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'highball',
        name: 'Highball',
        nameJp: 'ハイボール',
        nameNp: 'हाइबल',
        price: 3800,
        desc: 'Suntory, Cola, Ginger, Oolong. Bottle: ¥3800-¥5500',
        descJp: 'サントリー、コーラ、ジンジャー、ウーロン。ボトル：¥3800〜¥5500',
        descNp: 'सन्टोरी, कोला, अदुवा, उलोङ। बोटल: ¥3800-¥5500',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'rum',
        name: 'Rum',
        nameJp: 'ラム',
        nameNp: 'रम',
        price: 500,
        desc: 'Khukuri Rum, Rum Soda.',
        descJp: 'ククリラム、ラムソーダ。',
        descNp: 'खुकुरी रम, रम सोडा।',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'nihon-shu',
        name: 'Nihon Shu / Shochu',
        nameJp: '日本酒 / 焼酎',
        nameNp: 'जापानी रक्सी / शोचु',
        price: 500,
        desc: 'Shochu, Iichiko.',
        descJp: '焼酎、いいちこ。',
        descNp: 'शोचु, इइचिको।',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'whisky',
        name: 'Whisky',
        nameJp: 'ウイスキー',
        nameNp: 'व्हिस्की',
        price: 500,
        desc: 'Suntory, Red Label, Jameson, Dewar\'s.',
        descJp: 'サントリー、レッドラベル、ジェムソン、デュワーズ。',
        descNp: 'सन्टोरी, रेड लेबल, जेमसन, डेवार्स।',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800'
      },
      {
        id: 'soft-drinks',
        name: 'Soft Drink',
        nameJp: 'ソフトドリンク',
        nameNp: 'सफ्ट ड्रिंक',
        price: 300,
        desc: 'Ocha, Fanta, Cola, Oolong, Chai, Apple, Orange, Mix Veg.',
        descJp: 'お茶、ファンタ、コーラ、ウーロン茶、チャイ、アップル、オレンジ、ミックスベジ。',
        descNp: 'चिया, फ्यान्टा, कोला, उलोङ, चिया, स्याउ, सुन्तला, मिक्स तरकारी।',
        image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&q=80&w=800'
      },
    ]
  },
  {
    id: 'accommodations',
    title: 'Accommodations',
    titleJp: '宿泊施設',
    titleNp: 'आवास',
    icon: Leaf,
    items: [
      {
        id: 'cottage-stay',
        name: '1 Night Cottage Stay',
        nameJp: 'コテージ1泊',
        nameNp: '१ रातको कटेज बसाइ',
        price: 3000,
        desc: 'Stay 1 night at our beautiful resort cottage as an add-on to your party.',
        descJp: 'パーティーの追加オプションとして、美しいリゾートコテージに1泊滞在。',
        descNp: 'तपाईंको पार्टीमा थप विकल्पको रूपमा हाम्रो सुन्दर रिसोर्ट कटेजमा १ रात बस्नुहोस्।',
        image: 'https://images.unsplash.com/photo-1587061949409-02df41d5e562?auto=format&fit=crop&q=80&w=800'
      }
    ]
  },
];
