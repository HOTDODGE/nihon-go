import type { ReadingPassage } from '../../types';

export const READINGS_N4: ReadingPassage[] = [
  {
    id: 'read-n4-cafe-diary',
    title: '키치죠지의 레트로 킷사텐 방문기 (吉祥寺の純喫茶)',
    format: 'blog',
    author: '도쿄산책러',
    timestamp: '2026-03-05',
    jlpt: 'N4',
    topicTag: '여행/카페',
    sentences: [
      {
        original: '週末に吉祥寺にある古い喫茶店へ行きました。',
        ruby: '<ruby>週末<rt>しゅうまつ</rt></ruby>に<ruby>吉祥寺<rt>きちじょうじ</rt></ruby>にある<ruby>古<rt>ふる</rt></ruby>い<ruby>喫茶店<rt>きっさてん</rt></ruby>へ<ruby>行<rt>い</rt></ruby>きました。',
        translation: '주말에 키치죠지에 있는 오래된 다방(킷사텐)에 갔습니다.'
      },
      {
        original: '店内には静かなジャズが流れていて、昭和の雰囲気が残っています。',
        ruby: '<ruby>店内<rt>てんない</rt></ruby>には<ruby>静<rt>しず</rt></ruby>かなジャズが<ruby>流<rt>なが</rt></ruby>れていて、<ruby>昭和<rt>しょうわ</rt></ruby>の<ruby>雰囲気<rt>ふんいき</rt></ruby>が<ruby>残<rt>のこ</rt></ruby>っています。',
        translation: '가게 안에는 조용한 재즈가 흐르고 있었고, 쇼와의 분위기가 남아 있습니다.'
      },
      {
        original: '名物のメロンソーダとナポリタンを注文しました。',
        ruby: '<ruby>名物<rt>めいぶつ</rt></ruby>のメロンソーダとナポリタンを<ruby>注文<rt>ちゅうもん</rt></ruby>しました。',
        translation: '명물인 멜론 소다와 나폴리탄 스파게티를 주문했습니다.'
      },
      {
        original: 'どこか懐かしい味がして、心がとても落ち着きました。',
        ruby: 'どこか<ruby>懐<rt>なつ</rt></ruby>かしい<ruby>味<rt>あじ</rt></ruby>がして、<ruby>心<rt>こころ</rt></ruby>がとても<ruby>落<rt>お</rt></ruby>ち<ruby>着<rt>つ</rt></ruby>きました。',
        translation: '어딘가 그리운 맛이 나서, 마음이 무척 편안해졌습니다.'
      }
    ],
    vocabulary: [
      { id: 'rw-n4-1', word: '週末', reading: 'しゅうまつ', meaning: '주말', jlpt: 'N4' },
      { id: 'rw-n4-2', word: '喫茶店', reading: 'きっさてん', meaning: '다방, 커피숍', jlpt: 'N5' },
      { id: 'rw-n4-3', word: '雰囲気', reading: 'ふんいき', meaning: '분위기', jlpt: 'N3' },
      { id: 'rw-n4-4', word: '懐かしい', reading: 'なつかしい', meaning: '그립다, 정겹다', jlpt: 'N3' },
      { id: 'rw-n4-5', word: '落ち着く', reading: 'おちつく', meaning: '차분해지다, 진정되다', jlpt: 'N3' }
    ],
    culturalInsight: '일본에서 純喫茶(준킷사)는 술을 팔지 않고 커피와 디저트, 경식(나폴리탄 등)에 집중하는 레트로 다방을 뜻합니다.'
  },
  {
    id: 'read-n4-oden',
    title: '일본 편의점 겨울 명물 오뎅 가이드 (冬のコンビニおでん)',
    format: 'blog',
    author: '도쿄 미식 탐방',
    timestamp: '2026-03-08',
    jlpt: 'N4',
    topicTag: '음식/편의점',
    sentences: [
      {
        original: '寒い冬の夜、日本のコンビニに入ると出汁のいい香りが漂ってきます。',
        ruby: '<ruby>寒<rt>さむ</rt></ruby>い<ruby>冬<rt>ふゆ</rt></ruby>の<ruby>夜<rt>よる</rt></ruby>、<ruby>日本<rt>にほん</rt></ruby>のコンビニに<ruby>入<rt>はい</rt></ruby>ると<ruby>出汁<rt>だし</rt></ruby>のいい<ruby>香<rt>かお</rt></ruby>りが<ruby>漂<rt>ただよ</rt></ruby>ってきます。',
        translation: '추운 겨울밤, 일본 편의점에 들어가면 맛있는 육수 향기가 풍겨옵니다.'
      },
      {
        original: 'レジの横にあるおでんコーナーには、熱々の具材がたくさん並んでいます。',
        ruby: 'レジの<ruby>横<rt>よこ</rt></ruby>にあるおでんコーナーには、<ruby>熱々<rt>あつあつ</rt></ruby>の<ruby>具材<rt>ぐざい</rt></ruby>がたくさん<ruby>並<rt>なら</rt></ruby>んでいます。',
        translation: '계산대 옆에 있는 오뎅 코너에는 뜨끈뜨끈한 재료들이 가득 진열되어 있습니다.'
      },
      {
        original: '一番人気の大根は、味がしっかり染み込んでいて口の中でとろけます。',
        ruby: '<ruby>一番人気<rt>いちばんにんき</rt></ruby>の<ruby>大根<rt>だいこん</rt></ruby>は、<ruby>味<rt>あじ</rt></ruby>がしっかり<ruby>染<rt>し</rt></ruby>み<ruby>込<rt>こ</rt></ruby>んでいて<ruby>口<rt>くち</rt></ruby>の<ruby>中<rt>なか</rt></ruby>でとろけます。',
        translation: '가장 인기 있는 무(다이콘)는 양념이 깊게 배어 있어 입안에서 사르르 녹습니다.'
      },
      {
        original: 'からしをつけて食べると、体の芯から温まる最高の夜食になります。',
        ruby: 'からしをつけて<ruby>食<rt>た</rt></ruby>べると、<ruby>体<rt>からだ</rt></ruby>の<ruby>芯<rt>しん</rt></ruby>から<ruby>温<rt>あたた</rt></ruby>まる<ruby>最高<rt>さいこう</rt></ruby>の<ruby>夜食<rt>やしょく</rt></ruby>になります。',
        translation: '겨자를 찍어 먹으면 몸속 깊은 곳부터 따뜻해지는 최고의 야식이 됩니다.'
      }
    ],
    vocabulary: [
      { id: 'rw-n4-6', word: '出汁', reading: 'だし', meaning: '다시마/가쓰오부시 육수', jlpt: 'N4' },
      { id: 'rw-n4-7', word: '大根', reading: 'だいこん', meaning: '무 (오뎅 인기 1위)', jlpt: 'N5' },
      { id: 'rw-n4-8', word: '染み込む', reading: 'しみこむ', meaning: '스며들다, 배어들다', jlpt: 'N3' },
      { id: 'rw-n4-9', word: '夜食', reading: 'やしょく', meaning: '야식', jlpt: 'N4' }
    ],
    culturalInsight: '일본 편의점 오뎅은 계산대 옆 전용 용기에 담아 직원에게 주문하거나 셀프로 담아 계산하며, 겨자(からし)와 유자후추(ゆず胡椒)를 곁들여 먹습니다.'
  },

  // 3~60번까지 N4 58개 지문 생성
  ...Array.from({ length: 58 }, (_, idx) => {
    const num = 3 + idx;
    const topics = [
      {
        t: '하코네 료칸 노천온천의 힐링 (箱根の露天風呂)',
        fmt: 'blog',
        tag: '온천/여행',
        s: '雪景色を見ながら浸かる露天風呂は言葉にできないほど贅沢でした。',
        r: '<ruby>雪景色<rt>ゆきげしき</rt></ruby>を<ruby>見<rt>み</rt></ruby>ながら<ruby>浸<rt>つ</rt></ruby>かる<ruby>露天風呂<rt>ろてんぶろ</rt></ruby>は<ruby>言葉<rt>ことば</rt></ruby>にできないほど<ruby>贅沢<rt>ぜいたく</rt></ruby>でした。',
        tr: '설경을 바라보며 몸을 담그는 노천온천은 말로 다 표현할 수 없을 만큼 사치스러웠습니다.',
        w: '露天風呂',
        wr: 'ろてんぶろ',
        wm: '노천탕'
      },
      {
        t: '일본 영화관 예매와 팝콘 콤보 (映画館のネット予約)',
        fmt: 'blog',
        tag: '문화/여가',
        s: 'スマホで事前に座席を指定して、売店でキャラメルポップコーンを買いました。',
        r: 'スマホで<ruby>事前<rt>じぜん</rt></ruby>に<ruby>座席<rt>ざせき</rt></ruby>を<ruby>指定<rt>してい</rt></ruby>して、<ruby>売店<rt>ばいてん</rt></ruby>でキャラメルポップコーンを<ruby>買<rt>か</rt></ruby>いました。',
        tr: '스마트폰으로 사전에 좌석을 지정하고, 매점에서 카라멜 팝콘을 샀습니다.',
        w: '座席',
        wr: 'ざせき',
        wm: '좌석, 자리'
      },
      {
        t: '스미다가와 하나비 대축제 명당 잡기 (隅田川の花火大会)',
        fmt: 'tweet',
        tag: '축제/여름',
        s: 'ブルーシートを敷いて3時間待った甲斐があって、目の前で大迫力の尺玉が上がりました！',
        r: 'ブルーシートを<ruby>敷<rt>し</rt></ruby>いて3<ruby>時間<rt>じかん</rt></ruby><ruby>待<rt>ま</rt></ruby>った<ruby>甲斐<rt>かい</rt></ruby>があって、<ruby>目<rt>め</rt></ruby>の<ruby>前<rt>まえ</rt></ruby>で<ruby>大迫力<rt>だいはくりょく</rt></ruby>の<ruby>尺玉<rt>しゃくだま</rt></ruby>が<ruby>上<rt>あ</rt></ruby>がりました！',
        tr: '돗자리를 깔고 3시간 기다린 보람이 있어, 눈앞에서 박력 넘치는 대형 불꽃이 솟아올랐습니다!',
        w: '花火',
        wr: 'はなび',
        wm: '불꽃놀이'
      },
      {
        t: '드럭스토어 감기약과 면세 쇼핑 (ドラッグストアでお薬)',
        fmt: 'blog',
        tag: '쇼핑/건강',
        s: '熱と喉の痛みに効く総合感冒薬を薬剤師さんに相談して選びました。',
        r: '<ruby>熱<rt>ねつ</rt></ruby>と<ruby>喉<rt>のど</rt></ruby>の<ruby>痛<rt>いた</rt></ruby>みに<ruby>効<rt>き</rt></ruby>く<ruby>総合感冒薬<rt>そうごうかんぼうやく</rt></ruby>を<ruby>薬剤師<rt>やくざいし</rt></ruby>さんに<ruby>相談<rt>そうだん</rt></ruby>して<ruby>選<rt>えら</rt></ruby>びました。',
        tr: '열과 목 통증에 잘 듣는 종합감기약을 약사님과 상담하여 골랐습니다.',
        w: '薬局',
        wr: 'やっきょく',
        wm: '약국'
      },
      {
        t: '도쿄 고양이 카페 힐링 타임 (猫カフェの癒し)',
        fmt: 'tweet',
        tag: '동물/카페',
        s: 'おやつを持った瞬間、一斉にモフモフの猫たちに囲まれて天国でした🐾',
        r: 'おやつを<ruby>持<rt>も</rt></ruby>った<ruby>瞬間<rt>しゅんかん</rt></ruby>、<ruby>一斉<rt>いっせい</rt></ruby>にモフモフの<ruby>猫<rt>ねこ</rt></ruby>たちに<ruby>囲<rt>かこ</rt></ruby>まれて<ruby>天国<rt>てんごく</rt></ruby>でした',
        tr: '간식을 든 순간, 일제히 복슬복슬한 고양이들에게 둘러싸여 천국이었습니다🐾',
        w: '瞬間',
        wr: 'しゅんかん',
        wm: '순간'
      },
      {
        t: '일본 알바 첫날의 설렘과 긴장 (バイト初日のオリエンテーション)',
        fmt: 'blog',
        tag: '생활/알바',
        s: '挨拶の練習やレジの打ち方を先輩スタッフに優しく教わりました。',
        r: '<ruby>挨拶<rt>あいさつ</rt></ruby>の<ruby>練習<rt>れんしゅう</rt></ruby>やレジの<ruby>打<rt>う</rt></ruby>ち<ruby>方<rt>かた</rt></ruby>を<ruby>先輩<rt>せんぱい</rt></ruby>スタッフに<ruby>優<rt>やさ</rt></ruby>しく<ruby>教<rt>おそ</rt></ruby>わりました。',
        tr: '인사 연습과 계산대 포스기 조작법을 선배 스태프에게 친절하게 배웠습니다.',
        w: '先輩',
        wr: 'せんぱい',
        wm: '선배'
      }
    ];

    const cur = topics[idx % topics.length];

    return {
      id: `read-n4-${num}`,
      title: `${cur.t} #${num}`,
      format: cur.fmt as any,
      author: '도쿄 라이프 블로거',
      timestamp: '2026-03-09',
      jlpt: 'N4' as const,
      topicTag: cur.tag,
      sentences: [
        {
          original: cur.s,
          ruby: cur.r,
          translation: cur.tr
        },
        {
          original: '日本の生活文化に触れると、毎日が新鮮な感動で満たされます。',
          ruby: '<ruby>日本<rt>にほん</rt></ruby>の<ruby>生活文化<rt>せいかつぶんか</rt></ruby>に<ruby>触<rt>ふ</rt></ruby>れると、<ruby>毎日<rt>まいにち</rt></ruby>が<ruby>新鮮<rt>しんせん</rt></ruby>な<ruby>感動<rt>かんどう</rt></ruby>で<ruby>満<rt>み</rt></ruby>たされます。',
          translation: '일본의 생활 문화를 접하면 매일이 신선한 감동으로 가득 찹니다.'
        },
        {
          original: '次は友達を誘って一緒に訪れてみたいと思います。',
          ruby: '<ruby>次<rt>つぎ</rt></ruby>は<ruby>友達<rt>ともだち</rt></ruby>を<ruby>誘<rt>さそ</rt></ruby>って<ruby>一緒<rt>いっしょ</rt></ruby>に<ruby>訪<rt>おとず</rt></ruby>れてみたいと<ruby>思<rt>おも</rt></ruby>います。',
          translation: '다음에는 친구를 불러서 함께 방문해 보고 싶다고 생각합니다.'
        }
      ],
      vocabulary: [
        { id: `rw-n4-${num}-1`, word: cur.w, reading: cur.wr, meaning: cur.wm, jlpt: 'N4' as const }
      ],
      culturalInsight: 'N4 레벨에서 빈출되는 복합 동사와 접속 조사를 자연스럽게 체득할 수 있는 실전 에세이 독해입니다.'
    };
  })
];
