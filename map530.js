let map;
let markerCluster;


function initMap() {
  // 地図を表示する場所を指定
  const location = { lat: 42.409441, lng: 141.1069605 }; // 例：幌別駅

  // 地図を生成
  map = new google.maps.Map(document.getElementById('map'), {
    center: location,
    zoom: 15,
    maxZoom: 30,
    minZoom: 5,
    streetViewControl: false, // ストリートビューボタン非表示
    mapTypeControl: false,    // 航空写真ボタン非表示

    // 表示範囲の制限
    restriction: {
      latLngBounds: {
        north: 43.0,
        south: 42.0,
        west: 140.8646,
        east: 141.328 
        
      },
      strictBounds: true
    }
  });


  // マーカーの位置情報
  const locations = [
          {lat: 42.494236076469, lng: 141.14388744287, spot: "温泉市場（登別閻魔やきそば）", url: "http://www.onsenichiba.com/"},
          {lat: 42.4916613838119, lng: 141.142098547207, spot: "食事処　松前", url: "https://www.nobogura.co.jp/dining/restaurant/"},
          {lat: 42.4943148371567, lng: 141.143680649998, spot: "喫茶　田園", url: "https://noboribetsu-spa.jp/spot/spot0203/"},
          {lat: 42.4915529300037, lng: 141.14433525912, spot: "郷の味　しらかば", url: "nan"},
          {lat: 42.4937142208662, lng: 141.143137725688, spot: "いせくら", url: "https://www.sanpei.club/page/isekura/index.html"},
          {lat: 42.4555700074842, lng: 141.177458452443, spot: "きっさ点", url: "nan"},
          {lat: 42.4539420610664, lng: 141.178254537727, spot: "やきとりの一平　登別店", url: "https://www.e-ippei.com/group/"},
          {lat: 42.4863725778833, lng: 141.10834812546, spot: "登別カントリー倶楽部レストラン", url: "http://www.noboribetsu-cc.com/clubhouse/restaurant/"},
          {lat: 42.4526813879383, lng: 141.18108263489, spot: "ピアチェーレ・ノーチェ", url: "http://www.sanai-hospital.or.jp/topics/detail.php?id=1162"},
          {lat: 42.4649013168959, lng: 141.178466596623, spot: "わかさいも本舗登別東店レストラン桜", url: "https://www.wakasaimo.com/sakura/"},
          {lat: 42.4649013168959, lng: 141.178474643251, spot: "レストランリーベ", url: "https://www.nixe.co.jp/restaurant-shop/"},
          {lat: 42.4525980360193, lng: 141.179705223505, spot: "食事＆喫茶 eファミリー", url: "nan"},
          {lat: 42.4098728313299, lng: 141.105935135582, spot: "福来軒", url: "nan"},
          {lat: 42.4098079507374, lng: 141.105027766722, spot: "ほろべつ屋台村　箸遊　佳乃", url: "nan"},
          {lat: 42.421999925894, lng: 141.116437287897, spot: "ソーダ食堂", url: "nan"},
          {lat: 42.410723608708, lng: 141.107017411201, spot: "焼肉居酒屋 ぐうちょきぱ", url: "nan"},
          {lat: 42.4113284689576, lng: 141.104806704455, spot: "ぱぴあ", url: "nan"},
          {lat: 42.4101148157229, lng: 141.106214620393, spot: "旬の台所くる美", url: "https://shun-kurumi.com/"},
          {lat: 42.4122093473794, lng: 141.103855564575, spot: "旬の華 和か菜", url: "https://shunnohana-wakana.com/"},
          {lat: 42.4121797231925, lng: 141.106769062128, spot: "つぼ八 幌別店", url: "https://www.tsubohachi.co.jp/shop/other/horobetsu/"},
          {lat: 42.3692010275891, lng: 141.054798666985, spot: "室蘭やきとり一平若草店", url: "https://muroran-yakitori.com/wakakusa.html"},
          {lat: 42.3743270710275, lng: 141.061311157797, spot: "カフェ アンジュリエ", url: "https://cafeangeller.amebaownd.com/"},
          {lat: 42.494236076469, lng: 141.14388744287, spot: "温泉市場（登別ブランド）", url: "http://www.onsenichiba.com/"},
          {lat: 42.4917029918133, lng: 141.14211197724, spot: "祝いの宿　登別グランドホテル", url: "https://www.nobogura.co.jp/"},
          {lat: 42.4921533982493, lng: 141.143095813196, spot: "大黒屋民芸店", url: "https://daikokuya-m.com/"},
          {lat: 42.4928262042903, lng: 141.142972700538, spot: "Pizzeria ASTRA", url: "https://noboribetsu-spa.jp/spot/spot0212/"},
          {lat: 42.4940231, lng: 141.1436458, spot: "藤崎わさび園", url: "https://marufuji-wasabi.jp/"},
          {lat: 42.4590154522764, lng: 141.117797846876, spot: "のぼりべつ酪農館", url: "https://www.rakunoukan.com/"},
          {lat: 42.4423598344062, lng: 141.157210863125, spot: "マルフク武澤水産", url: "nan"},
          {lat: 42.4502155219196, lng: 141.176329698661, spot: "肉のあさひ", url: "nan"},
          {lat: 42.4650120464239, lng: 141.178445118043, spot: "わかさいも本舗登別東店", url: "https://www.wakasaimo.com/shop/noboribetsuhigashi/"},
          {lat: 42.4526851543173, lng: 141.1811978763, spot: "登別観光交流センター「ヌプル」（登別ブランド）", url: "https://nupur.jp/shop"},
          {lat: 42.4112147728944, lng: 141.104402410178, spot: "かめやアーニス店", url: "nan"},
          {lat: 42.4111989301926, lng: 141.104477512024, spot: "のぼりべつブランドショップ", url: "nan"},
          {lat: 42.4104320929562, lng: 141.110136055436, spot: "道南平塚食品", url: "https://nattou.co.jp/hiratsuka/"},
          {lat: 42.3911083327445, lng: 141.077875460398, spot: "わかさいも本舗登別本店", url: "https://www.wakasaimo.com/shop/noboribetsuhonten/"},
          {lat: 42.3569882225151, lng: 141.050166229365, spot: "かめや本店", url: "nan"},
          {lat: 42.3748237100555, lng: 141.066207315879, spot: "冷鮮工房うす田", url: "https://www.reisenkoubou-usuda.com/"},
          {lat: 42.4906161688549, lng: 141.159028132679, spot: "ユーカラの里（のぼりべつクマ牧場内）", url: "https://bearpark.jp/yukar/"},
          {lat: 42.4526851543173, lng: 141.1811978763, spot: "登別観光交流センター「ヌプル」（アイヌ文化）", url: "https://nupur.jp/"},
          {lat: 42.4513315909502, lng: 141.167191399963, spot: "知里幸恵 銀のしずく記念館", url: "https://www.ginnoshizuku.com/"},
          {lat: 42.4205468059822, lng: 141.081934228961, spot: "登別市郷土資料館", url: "https://www.city.noboribetsu.lg.jp/docs/shiryokan/"},
          {lat: 42.4471394654528, lng: 141.157277281413, spot: "知里幸恵の墓・金成マツの碑", url: "nan"},
          {lat: 42.4494174865133, lng: 141.16995340134, spot: "知里真志保の碑", url: "nan"},
          {lat: 42.4715023441873, lng: 141.156145985958, spot: "カムイワッカ", url: "nan"},
          {lat: 42.4494596016715, lng: 141.169728635397, spot: "ヌプルペッ（登別川）", url: "nan"},
          {lat: 42.4449682422638, lng: 141.16140251897, spot: "アフンルパル", url: "nan"},
          {lat: 42.4528239772223, lng: 141.183436279579, spot: "フンペサパ（フンベ山）", url: "nan"},
          {lat: 42.4120519586187, lng: 141.111087745259, spot: "愛隣学校跡", url: "nan"},
          {lat: 42.4252013307922, lng: 141.117694026024, spot: "オカシペッ（岡志別）", url: "nan"},
          {lat: 42.3903700737259, lng: 141.080074799846, spot: "キウシト湿原", url: "nan"},
  ];


  // マーカーを作成
  const markers = locations.map(location => {
    const marker = new google.maps.Marker({
      
      position: { lat: location.lat, lng: location.lng },
      map: map,
      spot: location.spot,
      icon: {
        url: "https://e1.pxfuel.com/desktop-wallpaper/803/203/desktop-wallpaper-doraemon-fujiko-fujio-animation-cartoon-doraemon-robot.jpg", // ← 任意の画像URLをここに入れてください
        scaledSize: (60,60)
    }
});
  

    // マーカークリック時の処理
    marker.addListener('click', function() {
      //それぞれのマーカーが指すスポットのwebページに遷移
      window.open(location.url, '_blank');
    });


    return marker;
  });

  // マーカークラスタラーを初期化
  markerCluster = new MarkerClusterer(map, markers, {
    gridSize: 50,         // クラスタリングのグリッドサイズ
    maxZoom: 20,          // この倍率以上ではクラスタリングしない
    minimumClusterSize: 2, // クラスターを形成する最小マーカー数
    
    //
    imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
  });
}

if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map.setCenter(currentLocation);
          new google.maps.Marker({
            position: currentLocation,
            map: map,
            title: "あなたの現在地",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#00F",
              fillOpacity: 0.8,
              strokeWeight: 2,
              strokeColor: "#FFF"
            }
          });
        },
        () => {
          alert("位置情報の取得に失敗しました！");
        }
      );
    } else {
      alert("このブラウザでは位置情報がサポートされていません！");
}