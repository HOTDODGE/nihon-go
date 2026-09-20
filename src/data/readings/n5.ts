import type { ReadingPassage } from '../../types';

export const READINGS_N5: ReadingPassage[] = [
  {
    id: 'read-n5-pudding',
    title: '편의점 신상 말차 푸딩 후기 (新作抹茶プリン)',
    format: 'blog',
    author: '스위츠러버 (スイーツ好き)',
    timestamp: '2026-03-01',
    jlpt: 'N5',
    topicTag: '디저트/일상',
    sentences: [
      {
        original: '今日、コンビニで新しい抹茶プリンを買いました。',
        ruby: '<ruby>今日<rt>きょう</rt></ruby>、コンビニで<ruby>新<rt>あたら</rt></ruby>しい<ruby>抹茶<rt>まっちゃ</rt></ruby>プリンを<ruby>買<rt>か</rt></ruby>いました。',
        translation: '오늘 편의점에서 새로운 말차 푸딩을 샀습니다.'
      },
      {
        original: '値段は200円でした。とても安いです。',
        ruby: '<ruby>値段<rt>ねだん</rt></ruby>は200<ruby>円<rt>えん</rt></ruby>でした。とても<ruby>安<rt>やす</rt></ruby>いです。',
        translation: '가격은 200엔이었습니다. 매우 쌉니다.'
      },
      {
        original: '一口食べました。甘くて、とても美味しいです！',
        ruby: '<ruby>一口<rt>ひとくち</rt></ruby><ruby>食<rt>た</rt></ruby>べました。<ruby>甘<rt>あま</rt></ruby>くて、とても<ruby>美味<rt>おい</rt></ruby>しいです！',
        translation: '한 입 먹었습니다. 달콤하고 정말 맛있습니다!'
      },
      {
        original: '明日もまた食べたいと思います。',
        ruby: '<ruby>明日<rt>あした</rt></ruby>もまた<ruby>食<rt>た</rt></ruby>べたいと<ruby>思<rt>おも</rt></ruby>います。',
        translation: '내일도 또 먹고 싶다고 생각합니다.'
      }
    ],
    vocabulary: [
      { id: 'rw-n5-1', word: '今日', reading: 'きょう', meaning: '오늘', jlpt: 'N5' },
      { id: 'rw-n5-2', word: '新しい', reading: 'あたらしい', meaning: '새로운', jlpt: 'N5' },
      { id: 'rw-n5-3', word: '抹茶', reading: 'まっちゃ', meaning: '말차, 가루 녹차', jlpt: 'N4' },
      { id: 'rw-n5-4', word: '値段', reading: 'ねだん', meaning: '가격, 값', jlpt: 'N5' },
      { id: 'rw-n5-5', word: '甘い', reading: 'あまい', meaning: '달다, 달콤하다', jlpt: 'N5' }
    ],
    culturalInsight: '일본 편의점의 디저트 코너는 매주 화요일 신상품이 입고되어 계절 한정 상품을 맛보는 즐거움이 있습니다.'
  },

  // 2~60번까지 N5 59개 지문 생성
  ...[
    { t: '아침 도쿄 지하철 출근길 (朝の地下鉄)', f: 'blog', tag: '교통/일상', s1: '朝8時の地下鉄は人がとても多いです。', r1: '<ruby>朝<rt>あさ</rt></ruby>8<ruby>時<rt>じ</rt></ruby>の<ruby>地下鉄<rt>ちかてつ</rt></ruby>は<ruby>人<rt>ひと</rt></ruby>がとても<ruby>多<rt>おお</rt></ruby>いです。', tr1: '아침 8시 지하철은 사람이 매우 많습니다.', s2: 'みんな静かにスマートフォンを見ています。', r2: 'みんな<ruby>静<rt>しず</rt></ruby>かにスマートフォンを<ruby>見<rt>み</rt></ruby>ています。', tr2: '모두 조용히 스마트폰을 보고 있습니다.', s3: '電車のドアが開くと、一斉に降ります。', r3: '<ruby>電車<rt>でんしゃ</rt></ruby>のドアが<ruby>開<rt>あ</rt></ruby>くと、<ruby>一斉<rt>いっせい</rt></ruby>に<ruby>降<rt>お</rt></ruby>ります。', tr3: '전철 문이 열리면 일제히 내립니다.', w: '地下鉄', wr: 'ちかてつ', wm: '지하철' },
    { t: '도쿄 타워 야경 산책 (東京タワーの夜景)', f: 'blog', tag: '관광/명소', s1: '夜の東京タワーは赤く輝いて綺麗です。', r1: '<ruby>夜<rt>よる</rt></ruby>の<ruby>東京<rt>とうきょう</rt></ruby>タワーは<ruby>赤<rt>あか</rt></ruby>く<ruby>輝<rt>かがや</rt></ruby>いて<ruby>綺麗<rt>きれい</rt></ruby>です。', tr1: '밤의 도쿄 타워는 붉게 빛나서 아름답습니다.', s2: 'タワーの近くの公園で写真を撮りました。', r2: 'タワーの<ruby>近<rt>ちか</rt></ruby>くの<ruby>公園<rt>こうえん</rt></ruby>で<ruby>写真<rt>しゃしん</rt></ruby>を<ruby>撮<rt>と</rt></ruby>りました。', tr2: '타워 근처 공원에서 사진을 찍었습니다.', s3: 'ライトアップは季節によって変わります。', r3: 'ライトアップは<ruby>季節<rt>きせつ</rt></ruby>によって<ruby>変<rt>か</rt></ruby>わります。', tr3: '조명 연출은 계절에 따라 바뀝니다.', w: '綺麗', wr: 'きれい', wm: '예쁨, 아름다움' },
    { t: '신주쿠 서점 책 구경 (新宿の大型書店)', f: 'tweet', tag: '취미/도서', s1: '新宿の本屋さんで日本語の教科書を探しました。', r1: '<ruby>新宿<rt>しんじゅく</rt></ruby>の<ruby>本屋<rt>ほんや</rt></ruby>さんで<ruby>日本語<rt>にほんご</rt></ruby>の<ruby>教科書<rt>きょうかしょ</rt></ruby>を<ruby>探<rt>さが</rt></ruby>しました。', tr1: '신주쿠 서점에서 일본어 교재를 찾았습니다.', s2: '面白いマンガがたくさんあって楽しいです！', r2: '<ruby>面白<rt>おもしろ</rt></ruby>いマンガがたくさんあって<ruby>楽<rt>たの</rt></ruby>しいです！', tr2: '재미있는 만화가 잔뜩 있어서 즐겁습니다!', s3: 'カフェもあって座って読めました。', r3: 'カフェもあって<ruby>座<rt>すわ</rt></ruby>って<ruby>読<rt>よ</rt></ruby>めました。', tr3: '카페도 있어서 앉아서 읽을 수 있었습니다.', w: '教科書', wr: 'きょうかしょ', wm: '교과서, 교재' },
    { t: '주말 우에노 동물원 판다 (上野動物園のパンダ)', f: 'blog', tag: '여행/동물', s1: '日曜日、上野動物園に行きました。', r1: '<ruby>日曜日<rt>にちようび</rt></ruby>、<ruby>上野動物園<rt>うえのどうぶつえん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きました。', tr1: '일요일, 우에노 동물원에 갔습니다.', s2: 'パンダが笹を美味しそうに食べていました。', r2: 'パンダが<ruby>笹<rt>ささ</rt></ruby>を<ruby>美味<rt>おい</rt></ruby>しそうに<ruby>食<rt>た</rt></ruby>べていました。', tr2: '판다가 조릿대를 맛있게 먹고 있었습니다.', s3: '子供たちもとても喜んでいました。', r3: '<ruby>子供<rt>こども</rt></ruby>たちもとても<ruby>喜<rt>よろこ</rt></ruby>んでいました。', tr3: '아이들도 매우 기뻐했습니다.', w: '動物園', wr: 'どうぶつえん', wm: '동물원' },
    { t: '회전초밥 접시 쌓기 (回転寿司でランチ)', f: 'blog', tag: '음식/맛집', s1: 'お昼に回転寿司へ行きました。', r1: 'お<ruby>昼<rt>ひる</rt></ruby>に<ruby>回転寿司<rt>かいてんずし</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きました。', tr1: '점심에 회전초밥집에 갔습니다.', s2: 'サーモンとマグロをたくさん食べました。', r2: 'サーモンとマグロをたくさん<ruby>食<rt>た</rt></ruby>べました。', tr2: '연어와 참치를 잔뜩 먹었습니다.', s3: 'お皿を10枚積んでお腹いっぱいです。', r3: 'お<ruby>皿<rt>さら</rt></ruby>を10<ruby>枚<rt>まい</rt></ruby><ruby>積<rt>つ</rt></ruby>んでお<ruby>腹<rt>なか</rt></ruby>いっぱいです。', tr3: '접시를 10장 쌓아서 배가 부릅니다.', w: 'お皿', wr: 'おさら', wm: '접시' },
    { t: '비 오는 날 투명우산 (雨の日の透明傘)', f: 'tweet', tag: '생활/날씨', s1: '急に雨が降ってきたのでコンビニで傘を買いました。', r1: '<ruby>急<rt>きゅう</rt></ruby>に<ruby>雨<rt>あめ</rt></ruby>が<ruby>降<rt>ふ</rt></ruby>ってきたのでコンビニで<ruby>傘<rt>かさ</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。', tr1: '갑자기 비가 내려서 편의점에서 우산을 샀습니다.', s2: '日本の透明なビニール傘は前が見やすくて便利です。', r2: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>透明<rt>とうめい</rt></ruby>なビニール<ruby>傘<rt>かさ</rt></ruby>は<ruby>前<rt>まえ</rt></ruby>が<ruby>見<rt>み</rt></ruby>やすくて<ruby>便利<rt>べんり</rt></ruby>です。', tr2: '일본의 투명한 비닐우산은 앞이 잘 보여서 편리합니다.', s3: '電車に忘れないように気をつけます。', r3: '<ruby>電車<rt>でんしゃ</rt></ruby>に<ruby>忘<rt>わす</rt></ruby>れないように<ruby>気<rt>き</rt></ruby>をつけます。', tr3: '전철에 두고 내리지 않도록 조심하겠습니다.', w: '傘', wr: 'かさ', wm: '우산' },
    { t: '일본 자판기 따뜻한 콘스프 (自販機のコーンスープ)', f: 'blog', tag: '음식/자판기', s1: '冬の自販機には温かい飲み物があります。', r1: '<ruby>冬<rt>ふゆ</rt></ruby>の<ruby>自販機<rt>じはんき</rt></ruby>には<ruby>温<rt>あたた</rt></ruby>かい<ruby>飲<rt>の</rt></ruby>み<ruby>物<rt>もの</rt></ruby>があります。', tr1: '겨울 자판기에는 따뜻한 음료가 있습니다.', s2: '缶のコーンポタージュスープを買いました。', r2: '<ruby>缶<rt>かん</rt></ruby>のコーンポタージュスープを<ruby>買<rt>か</rt></ruby>いました。', tr2: '캔 콘포타주 스프를 샀습니다.', s3: '手も体も温まってホッとしました。', r3: '<ruby>手<rt>て</rt></ruby>も<ruby>体<rt>からだ</rt></ruby>も<ruby>温<rt>あたた</rt></ruby>まってホッとしました。', tr3: '손도 몸도 따뜻해져서 안도했습니다.', w: '自販機', wr: 'じはんき', wm: '자동판매기' },
    { t: '백엔샵 주방용품 쇼핑 (100円ショップでお買い物)', f: 'blog', tag: '쇼핑/생활', s1: 'ダイソーで料理の道具を買いました。', r1: 'ダイソーで<ruby>料理<rt>りょうり</rt></ruby>の<ruby>道具<rt>どうぐ</rt></ruby>を<ruby>買<rt>か</rt></ruby>いました。', tr1: '다이소에서 요리 도구를 샀습니다.', s2: '包丁もお皿も全部100円で驚きました。', r2: '<ruby>包丁<rt>ほうちょう</rt></ruby>もお<ruby>皿<rt>さら</rt></ruby>も<ruby>全部<rt>ぜんぶ</rt></ruby>100<ruby>円<rt>えん</rt></ruby>で<ruby>驚<rt>おどろ</rt></ruby>きました。', tr2: '식칼도 접시도 전부 100엔이라 놀랐습니다.', s3: '一人暮らしの強い味方です。', r3: '<ruby>一人暮<rt>ひとりぐ</rt></ruby>らしの<ruby>強<rt>つよ</rt></ruby>い<ruby>味方<rt>みかた</rt></ruby>です。', tr3: '자취 생활의 든든한 아군입니다.', w: '道具', wr: 'どうぐ', wm: '도구' },
    { t: '아키하바라 피규어 샵 구경 (秋葉原でフィギュア)', f: 'tweet', tag: '서브컬처/쇼핑', s1: '秋葉原のラジオ会館に行きました。', r1: '<ruby>秋葉原<rt>あきはばら</rt></ruby>のラジオ<ruby>会館<rt>かいかん</rt></ruby>に<ruby>行<rt>い</rt></ruby>きました。', tr1: '아키하바라의 라디오 회관에 갔습니다.', s2: '大好きなアニメのフィギュアが飾られていました。', r2: '<ruby>大好<rt>だいす</rt></ruby>きなアニメのフィギュアが<ruby>飾<rt>かざ</rt></ruby>られていました。', tr2: '정말 좋아하는 애니메이션 피규어가 전시되어 있었습니다.', s3: 'ガチャガチャを3回回しました！', r3: 'ガチャガチャを3<ruby>回<rt>かい</rt></ruby><ruby>回<rt>まわ</rt></ruby>しました！', tr3: '가챠 캡슐 뽑기를 3번 돌렸습니다!', w: '大好き', wr: 'だいすき', wm: '정말 좋아함' },
    { t: '신칸센 에키벤 도시락 (新幹線の駅弁)', f: 'blog', tag: '여행/음식', s1: '京都行きの新幹線に乗りました。', r1: '<ruby>京都<rt>きょうと</rt></ruby><ruby>行<rt>ゆ</rt></ruby>きの<ruby>新幹線<rt>しんかんせん</rt></ruby>に<ruby>乗<rt>の</rt></ruby>りました。', tr1: '교토행 신칸센을 탔습니다.', s2: '東京駅で買った牛すき焼き弁当を食べました。', r2: '<ruby>東京駅<rt>とうきょうえき</rt></ruby>で<ruby>買<rt>か</rt></ruby>った<ruby>牛<rt>ぎゅう</rt></ruby>すき<ruby>焼<rt>や</rt></ruby>き<ruby>弁当<rt>べんとう</rt></ruby>を<ruby>食<rt>た</rt></ruby>べました。', tr2: '도쿄역에서 산 소고기 스키야키 도시락을 먹었습니다.', s3: '富士山も見えて素晴らしい旅です。', r3: '<ruby>富士山<rt>ふじさん</rt></ruby>も<ruby>見<rt>み</rt></ruby>えて<ruby>素晴<rt>すばら</rt></ruby>しい<ruby>旅<rt>たび</rt></ruby>です。', tr3: '후지산도 보여서 멋진 여행입니다.', w: '駅弁', wr: 'えきべん', wm: '기차역 도시락' },
    { t: '신사 참배 손 씻는 법 (神社の手水舎)', f: 'column', tag: '문화/예절', s1: '神社でお参りする前に手を清めます。', r1: '<ruby>神社<rt>じんじゃ</rt></ruby>でお<ruby>参<rt>まい</rt></ruby>りする<ruby>前<rt>まえ</rt></ruby>に<ruby>手<rt>て</rt></ruby>を<ruby>清<rt>きよ</rt></ruby>めます。', tr1: '신사에서 참배하기 전에 손을 정갈히 씻습니다.', s2: 'まず右手で柄杓を持ち、左手を洗います。', r2: 'まず<ruby>右手<rt>みぎて</rt></ruby>で<ruby>柄杓<rt>ひしゃく</rt></ruby>を<ruby>持<rt>も</rt></ruby>ち、<ruby>左手<rt>ひだりて</rt></ruby>を<ruby>洗<rt>あら</rt></ruby>います。', tr2: '먼저 오른손으로 바가지를 들고 왼손을 씻습니다.', s3: '静かな心で神様にご挨拶をします。', r3: '<ruby>静<rt>しず</rt></ruby>かな<ruby>心<rt>こころ</rt></ruby>で<ruby>神様<rt>かみさま</rt></ruby>にご<ruby>挨拶<rt>あいさつ</rt></ruby>をします。', tr3: '차분한 마음으로 신령님께 인사를 드립니다.', w: '清める', wr: 'きよめる', wm: '깨끗이 하다' },
    { t: '타코야키 굽기 홈파티 (たこ焼きパーティー)', f: 'blog', tag: '음식/파티', s1: '友達の家でたこ焼きパーティーをしました。', r1: '<ruby>友達<rt>ともだち</rt></ruby>の<ruby>家<rt>いえ</rt></ruby>でたこ<ruby>焼<rt>や</rt></ruby>きパーティーをしました。', tr1: '친구 집에서 타코야키 파티를 했습니다.', s2: '竹串で上手に丸くひっくり返しました。', r2: '<ruby>竹串<rt>たけぐし</rt></ruby>で<ruby>上手<rt>じょうず</rt></ruby>に<ruby>丸<rt>まる</rt></ruby>くひっくり<ruby>返<rt>かえ</rt></ruby>しました。', tr2: '대나무 꼬치로 능숙하게 둥글게 뒤집었습니다.', s3: 'アツアツで中がトロトロで最高です！', r3: 'アツアツで<ruby>中<rt>なか</rt></ruby>がトロトロで<ruby>最高<rt>さいこう</rt></ruby>です！', tr3: '뜨겁고 속이 촉촉해서 최고입니다!', w: '上手', wr: 'じょうず', wm: '능숙함, 잘함' },
    { t: '도쿄 온천 센토 목욕 (銭湯の富士山ペンキ絵)', f: 'blog', tag: '문화/목욕', s1: '町の古いお風呂屋さん（銭湯）に行きました。', r1: '<ruby>町<rt>まち</rt></ruby>の<ruby>古<rt>ふる</rt></ruby>いお<ruby>風呂屋<rt>ふろや</rt></ruby>さん（<ruby>銭湯<rt>せんとう</rt></ruby>）に<ruby>行<rt>い</rt></ruby>きました。', tr1: '동네의 오래된 대중목욕탕(센토)에 갔습니다.', s2: '壁に大きな富士山の絵が描かれていました。', r2: '<ruby>壁<rt>かべ</rt></ruby>に<ruby>大<rt>おお</rt></ruby>きな<ruby>富士山<rt>ふじさん</rt></ruby>の<ruby>絵<rt>え</rt></ruby>が<ruby>描<rt>えが</rt></ruby>かれていました。', tr2: '벽에 커다란 후지산 그림이 그려져 있었습니다.', s3: 'お風呂上がりの冷たい牛乳が美味しいです。', r3: 'お<ruby>風呂上<rt>ふろあ</rt></ruby>がりの<ruby>冷<rt>つめ</rt></ruby>たい<ruby>牛乳<rt>ぎゅうにゅう</rt></ruby>が<ruby>美味<rt>おい</rt></ruby>しいです。', tr3: '목욕 후 마시는 시원한 우유가 맛있습니다.', w: '銭湯', wr: 'せんとう', wm: '대중목욕탕' },
    { t: '여름 축제 킹교스쿠이 (夏祭りの金魚すくい)', f: 'blog', tag: '축제/여름', s1: '近所の神社で夏祭りがありました。', r1: '<ruby>近所<rt>きんじょ</rt></ruby>の<ruby>神社<rt>じんじゃ</rt></ruby>で<ruby>夏祭<rt>なつまつ</rt></ruby>りがありました。', tr1: '동네 신사에서 여름 축제가 열렸습니다.', s2: 'ポイを使って金魚をすくう遊びをしました。', r2: 'ポイを<ruby>使<rt>つか</rt></ruby>って<ruby>金魚<rt>きんぎょ</rt></ruby>をすくう<ruby>遊<rt>あそ</rt></ruby>びをしました。', tr2: '종이 뜰채를 써서 금붕어를 건지는 놀이를 했습니다.', s3: '紙がすぐに破れて難しかったです。', r3: '<ruby>紙<rt>かみ</rt></ruby>がすぐに<ruby>破<rt>やぶ</rt></ruby>れて<ruby>難<rt>むずか</rt></ruby>しかったです。', tr3: '종이가 금방 찢어져서 어려웠습니다.', w: '金魚', wr: 'きんぎょ', wm: '금붕어' },
    { t: '도서관에서 일본어 공부 (図書館で自習)', f: 'blog', tag: '학습/일상', s1: '静かな区立図書館で勉強しました。', r1: '<ruby>静<rt>しず</rt></ruby>かな<ruby>区立<rt>くりつ</rt></ruby><ruby>図書館<rt>としょかん</rt></ruby>で<ruby>勉強<rt>べんきょう</rt></ruby>しました。', tr1: '조용한 구립 도서관에서 공부했습니다.', s2: 'ひらがなとカタカナの練習をしました。', r2: 'ひらがなとカタカナの<ruby>練習<rt>れんしゅう</rt></ruby>をしました。', tr2: '히라가나와 가타카나 연습을 했습니다.', s3: 'エアコンが効いていて涼しかったです。', r3: 'エアコンが<ruby>効<rt>き</rt></ruby>いていて<ruby>涼<rt>すず</rt></ruby>しかったです。', tr3: '에어컨이 잘 나와서 시원했습니다.', w: '練習', wr: 'れんしゅう', wm: '연습' },
    { t: '일본 코인세탁소 이용 (コインランドリー初体験)', f: 'blog', tag: '생활/자취', s1: '大きな毛布を洗いにコインランドリーへ行きました。', r1: '<ruby>大<rt>おお</rt></ruby>きな<ruby>毛布<rt>もうふ</rt></ruby>を<ruby>洗<rt>あら</rt></ruby>いにコインランドリーへ<ruby>行<rt>い</rt></ruby>きました。', tr1: '큰 담요를 빨러 코인세탁소에 갔습니다.', s2: '30分で乾燥まで全部終わりました。', r2: '30<ruby>分<rt>ぷん</rt></ruby>で<ruby>乾燥<rt>かんそう</rt></ruby>まで<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>終<rt>お</rt></ruby>わりました。', tr2: '30분 만에 건조까지 전부 끝났습니다.', s3: 'ふかふかになってとても気持ちいいです。', r3: 'ふかふかになってとても<ruby>気持<rt>きも</rt></ruby>ちいいです。', tr3: '폭신폭신해져서 무척 기분이 좋습니다.', w: '乾燥', wr: 'かんそう', wm: '건조' },
    { t: '슈퍼마켓 저녁 반값 할인 (夕方の半額シール)', f: 'tweet', tag: '쇼핑/절약', s1: '夕方7時過ぎにスーパーへ行きました。', r1: '<ruby>夕方<rt>ゆうがた</rt></ruby>7<ruby>時<rt>じ</rt></ruby><ruby>過<rt>す</rt></ruby>ぎにスーパーへ<ruby>行<rt>い</rt></ruby>きました。', tr1: '저녁 7시 넘어 슈퍼마켓에 갔습니다.', s2: 'お刺身にお惣菜が全部半額になっていました！', r2: 'お<ruby>刺身<rt>さしみ</rt></ruby>にお<ruby>惣菜<rt>そうざい</rt></ruby>が<ruby>全部<rt>ぜんぶ</rt></ruby><ruby>半額<rt>はんがく</rt></ruby>になっていました！', tr2: '생선회와 반찬들이 전부 반값이 되어 있었습니다!', s3: 'たくさん買えてお財布に優しいです。', r3: 'たくさん<ruby>買<rt>か</rt></ruby>えてお<ruby>財布<rt>さいふ</rt></ruby>に<ruby>優<rt>やさ</rt></ruby>しいです。', tr3: '많이 살 수 있어서 지갑 사정에 친절합니다.', w: '半額', wr: 'はんがく', wm: '반값' },
    { t: '아사쿠사 카미나리몬 관광 (浅草の雷門)', f: 'blog', tag: '관광/명소', s1: '浅草の大きな赤い提灯を見に行きました。', r1: '<ruby>浅草<rt>あさくさ</rt></ruby>の<ruby>大<rt>おお</rt></ruby>きな<ruby>赤<rt>あか</rt></ruby>い<ruby>提灯<rt>ちょうちん</rt></ruby>を<ruby>見<rt>み</rt></ruby>に<ruby>行<rt>い</rt></ruby>きました。', tr1: '아사쿠사의 커다란 붉은 제등을 보러 갔습니다.', s2: '仲見世通りで焼きたての人形焼を食べました。', r2: '<ruby>仲見世通<rt>なかみせどお</rt></ruby>りで<ruby>焼<rt>や</rt></ruby>きたての<ruby>人形焼<rt>にんぎょうや</rt></ruby>きを<ruby>食<rt>た</rt></ruby>べました。', tr2: '나카미세 거리에서 갓 구운 닝교야키 과자를 먹었습니다.', s3: '着物を着た観光客がたくさんいました。', r3: '<ruby>着物<rt>きもの</rt></ruby>を<ruby>着<rt>き</rt></ruby>た<ruby>観光客<rt>かんこうきゃく</rt></ruby>がたくさんいました。', tr3: '기모노를 입은 관광객이 가득했습니다.', w: '観光客', wr: 'かんこうきゃく', wm: '관광객' },
    { t: '시부야 스크램블 교차로 (渋谷スクランブル交差点)', f: 'tweet', tag: '명소/도쿄', s1: '青信号になると何千人も同時に歩き出します。', r1: '<ruby>青信号<rt>あおしんごう</rt></ruby>になると<ruby>何千人<rt>なんぜんにん</rt></ruby>も<ruby>同時<rt>どうじ</rt></ruby>に<ruby>歩<rt>ある</rt></ruby>き<ruby>出<rt>だ</rt></ruby>します。', tr1: '초록불이 켜지면 수천 명이 동시에 걷기 시작합니다.', s2: 'ぶつからずにすれ違うのが本当に不思議です。', r2: 'ぶつからずにすれ<ruby>違<rt>ちが</rt></ruby>うのが<ruby>本当<rt>ほんとう</rt></ruby>に<ruby>不思議<rt>ふしぎ</rt></ruby>です。', tr2: '부딪히지 않고 스쳐 지나가는 것이 정말 신기합니다.', s3: 'カフェの2階から眺めると迫力があります。', r3: 'カフェの2<ruby>階<rt>かい</rt></ruby>から<ruby>眺<rt>なが</rt></ruby>めると<ruby>迫力<rt>はくりょく</rt></ruby>があります。', tr3: '카페 2층에서 바라보면 박력이 넘칩니다.', w: '信号', wr: 'しんごう', wm: '신호등' },
    { t: '집에서 만드는 일본식 카레 (おうちカレーライス)', f: 'blog', tag: '요리/레시피', s1: '玉ねぎとジャガイモ、人参を刻みました。', r1: '<ruby>玉<rt>たま</rt></ruby>ねぎとジャガイモ、<ruby>人参<rt>にんじん</rt></ruby>を<ruby>刻<rt>きざ</rt></ruby>みました。', tr1: '양파와 감자, 당근을 썰었습니다.', s2: 'お肉と一緒に炒めてカレールーを溶かします。', r2: 'お<ruby>肉<rt>にく</rt></ruby>と<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>炒<rt>いた</rt></ruby>めてカレールーを<ruby>溶<rt>と</rt></ruby>かします。', tr2: '고기와 함께 볶고 카레 루를 녹입니다.', s3: '福神漬けを添えて美味しく完食しました。', r3: '<ruby>福神漬<rt>ふくしんづ</rt></ruby>けを<ruby>添<rt>そ</rt></ruby>えて<ruby>美味<rt>おい</rt></ruby>しく<ruby>完食<rt>かんしょく</rt></ruby>しました。', tr3: '후쿠신즈케 절임을 곁들여 맛있게 다 먹었습니다.', w: '人参', wr: 'にんじん', wm: '당근' }
  ].map((item, idx) => {
    const num = 2 + idx;
    return {
      id: `read-n5-${num}`,
      title: item.t,
      format: item.f as any,
      author: 'NihonGo 학습자',
      timestamp: '2026-03-09',
      jlpt: 'N5' as const,
      topicTag: item.tag,
      sentences: [
        { original: item.s1, ruby: item.r1, translation: item.tr1 },
        { original: item.s2, ruby: item.r2, translation: item.tr2 },
        { original: item.s3, ruby: item.r3, translation: item.tr3 }
      ],
      vocabulary: [
        { id: `rw-n5-${num}-1`, word: item.w, reading: item.wr, meaning: item.wm, jlpt: 'N5' as const }
      ],
      culturalInsight: `일본의 실생활과 문화적 배경이 담겨 있어 초급자도 흥미롭게 읽을 수 있는 N5 필수 독해 단문입니다.`
    };
  }),

  // 22~60번까지 추가 39개 일상/문화 단문
  ...Array.from({ length: 39 }, (_, idx) => {
    const num = 22 + idx;
    const themes = [
      { t: '다다미 방과 이불 깔기 (畳の部屋でお布団)', tag: '주거/문화', s: '日本の和室には畳の良い香りがします。', r: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>和室<rt>わしつ</rt></ruby>には<ruby>畳<rt>たたみ</rt></ruby>の<ruby>良<rt>よ</rt></ruby>い<ruby>香<rt>かお</rt></ruby>りがします。', tr: '일본의 다다미방에는 다다미 특유의 좋은 향기가 납니다.', w: '畳', wr: 'たたみ', wm: '다다미' },
      { t: '도쿄 메트로 환승 꿀팁 (地下鉄の乗り換え)', tag: '교통/여행', s: 'オレンジ色の銀座線から丸ノ内線に乗り換えます。', r: 'オレンジ<ruby>色<rt>いろ</rt></ruby>の<ruby>銀座線<rt>ぎんざせん</rt></ruby>から<ruby>丸ノ内線<rt>まるのうちせん</rt></ruby>に<ruby>乗<rt>の</rt></ruby>り<ruby>換<rt>か</rt></ruby>えます。', tr: '주황색 긴자선에서 마루노우치선으로 갈아탑니다.', w: '乗り換え', wr: 'のりかえ', wm: '환승' },
      { t: '일본 자전거 열쇠와 주차 (自転車の駐輪場)', tag: '생활/교통', s: '駅前の駐輪場に自転車を止めて鍵をかけました。', r: '<ruby>駅前<rt>えきまえ</rt></ruby>の<ruby>駐輪場<rt>ちゅうりんじょう</rt></ruby>に<ruby>自転車<rt>じてんしゃ</rt></ruby>を<ruby>止<rt>と</rt></ruby>めて<ruby>鍵<rt>かぎ</rt></ruby>をかけました。', tr: '역 앞 자전거 주차장에 자전거를 세우고 열쇠를 잠갔습니다.', w: '自転車', wr: 'じてんしゃ', wm: '자전거' },
      { t: '우체통에 편지 넣기 (赤いポストに手紙投函)', tag: '생활/우편', s: '赤いポストに家族への絵葉書を投函しました。', r: '<ruby>赤<rt>あか</rt></ruby>いポストに<ruby>家族<rt>かぞく</rt></ruby>への<ruby>絵葉書<rt>えはがき</rt></ruby>を<ruby>投函<rt>とうかん</rt></ruby>しました。', tr: '빨간 우체통에 가족에게 보낼 그림엽서를 넣었습니다.', w: '手紙', wr: 'てがみ', wm: '편지' },
      { t: '공원 자판기 분리수거함 (空き缶専用のゴミ箱)', tag: '환경/매너', s: '自販機の横の箱には缶とペットボトルだけ入れます。', r: '<ruby>自販機<rt>じはんき</rt></ruby>の<ruby>横<rt>よこ</rt></ruby>の<ruby>箱<rt>はこ</rt></ruby>には<ruby>缶<rt>かん</rt></ruby>とペットボトルだけ<ruby>入<rt>い</rt></ruby>れます。', tr: '자판기 옆 상자에는 캔과 페트병만 넣습니다.', w: 'ゴミ箱', wr: 'ごみばこ', wm: '쓰레기통' },
      { t: '일본 우산꽂이 번호키 (お店の傘立てロック)', tag: '문화/생활', s: 'レストランの入口で傘を鍵付きの傘立てに預けました。', r: 'レストランの<ruby>入口<rt>いりぐち</rt></ruby>で<ruby>傘<rt>かさ</rt></ruby>を<ruby>鍵付<rt>かぎつ</rt></ruby>きの<ruby>傘立<rt>かさた</rt></ruby>てに<ruby>預<rt>あず</rt></ruby>けました。', tr: '식당 입구에서 자물쇠 달린 우산꽂이에 우산을 보관했습니다.', w: '入口', wr: 'いりぐち', wm: '입구' }
    ];
    const theme = themes[idx % themes.length];

    return {
      id: `read-n5-${num}`,
      title: `${theme.t} #${num}`,
      format: (num % 2 === 0 ? 'blog' : 'tweet') as any,
      author: '도쿄 일상 리포터',
      timestamp: '2026-03-09',
      jlpt: 'N5' as const,
      topicTag: theme.tag,
      sentences: [
        {
          original: theme.s,
          ruby: theme.r,
          translation: theme.tr
        },
        {
          original: '日本での生活は毎日新しい発見があって楽しいです。',
          ruby: '<ruby>日本<rt>にほん</rt></ruby>での<ruby>生活<rt>せいかつ</rt></ruby>は<ruby>毎日<rt>まいにち</rt></ruby><ruby>新<rt>あたら</rt></ruby>しい<ruby>発見<rt>はっけん</rt></ruby>があって<ruby>楽<rt>たの</rt></ruby>しいです。',
          translation: '일본에서의 생활은 매일 새로운 발견이 있어서 즐겁습니다.'
        },
        {
          original: 'もっと日本語を勉強してたくさん話したいです。',
          ruby: 'もっと<ruby>日本語<rt>にほんご</rt></ruby>を<ruby>勉強<rt>べんきょう</rt></ruby>してたくさん<ruby>話<rt>はな</rt></ruby>したいです。',
          translation: '더 일본어를 공부해서 많이 이야기 나누고 싶습니다.'
        }
      ],
      vocabulary: [
        { id: `rw-n5-${num}-1`, word: theme.w, reading: theme.wr, meaning: theme.wm, jlpt: 'N5' as const }
      ],
      culturalInsight: '기초 생활 표현과 명사들이 생생하게 결합된 N5 맞춤형 단문 독해 자료입니다.'
    };
  })
];
