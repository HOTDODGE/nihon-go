import type { ReadingPassage } from '../../types';

export const READINGS_N3: ReadingPassage[] = [
  {
    id: 'read-n3-x-feed',
    title: 'X(구 트위터) 실시간 화제 타임라인 (バズりツイート実況)',
    format: 'tweet',
    author: 'ねこマスター🐾',
    authorHandle: '@neko_master_jp',
    timestamp: '2시간 전',
    jlpt: 'N3',
    topicTag: 'SNS/트위터/밈',
    sentences: [
      {
        original: '今朝の電車、隣の人が猫の動画見てて耐えきれず吹いた草www',
        ruby: '<ruby>今朝<rt>けさ</rt></ruby>の<ruby>電車<rt>でんしゃ</rt></ruby>、<ruby>隣<rt>となり</rt></ruby>の<ruby>人<rt>ひと</rt></ruby>が<ruby>猫<rt>ねこ</rt></ruby>の<ruby>動画<rt>どうが</rt></ruby><ruby>見<rt>み</rt></ruby>てて<ruby>耐<rt>た</rt></ruby>えきれず<ruby>吹<rt>ふ</rt></ruby>いた<ruby>草<rt>くさ</rt></ruby>www',
        translation: '오늘 아침 전철, 옆자리 사람이 고양이 영상 보길래 못 참고 뿜었음 ㅋㅋㅋwww'
      },
      {
        original: 'しかも目が合ったらお互い苦笑いして気まずすぎた件。',
        ruby: 'しかも<ruby>目<rt>め</rt></ruby>が<ruby>合<rt>あ</rt></ruby>ったらお<ruby>互<rt>たが</rt></ruby>い<ruby>苦笑<rt>にがわら</rt></ruby>いして<ruby>気<rt>き</rt></ruby>まずすぎた<ruby>件<rt>けん</rt></ruby>。',
        translation: '게다가 눈 마주치니까 서로 쓴웃음 지어서 너무 민망했던 건(사건).'
      },
      {
        original: '駅員さんの「お足元お気をつけください」のアナウンスが神対応に聞こえたレベルで焦った。',
        ruby: '<ruby>駅員<rt>えきいん</rt></ruby>さんの「お<ruby>足元<rt>あしもと</rt></ruby>お<ruby>気<rt>き</rt></ruby>をつけください」のアナウンスが<ruby>神対応<rt>かみたいおう</rt></ruby>に<ruby>聞<rt>き</rt></ruby>こえたレベルで<ruby>焦<rt>あせ</rt></ruby>った。',
        translation: '역무원의 "발밑 조심하십시오" 안내방송이 갓대응으로 들렸을 정도로 식은땀 났음.'
      },
      {
        original: '今日は一日中、リアタイで癒しを求めて生きるわ…。',
        ruby: '<ruby>今日<rt>きょう</rt></ruby>は<ruby>一日中<rt>いちにちじゅう</rt></ruby>、リアタイで<ruby>癒<rt>いや</rt></ruby>しを<ruby>求<rt>もと</rt></ruby>めて<ruby>生<rt>い</rt></ruby>きるわ…。',
        translation: '오늘은 하루 종일 실시간(리아타이)으로 힐링을 갈구하며 살아야지…'
      }
    ],
    vocabulary: [
      { id: 'rw-n3-1', word: '草 (くさ)', reading: 'くさ', meaning: 'ㅋㅋㅋ (웃음의 w가 풀처럼 보인다 하여 생긴 인터넷 은어)', jlpt: 'N3' },
      { id: 'rw-n3-2', word: '吹く', reading: 'ふく', meaning: '뿜다, 빵 터지다', jlpt: 'N3' },
      { id: 'rw-n3-3', word: '〜の件', reading: 'のけん', meaning: '~한 사건/사안 (일본 넷 게시판식 표현)', jlpt: 'N3' },
      { id: 'rw-n3-4', word: '神対応', reading: 'かみたいおう', meaning: '신급 대응, 갓대응 (극진하고 훌륭한 응대)', jlpt: 'N2' },
      { id: 'rw-n3-5', word: 'リアタイ', reading: 'りあたい', meaning: '리얼타임 (본방사수, 실시간)', jlpt: 'N3' }
    ],
    culturalInsight: '일본 트위터에서는 문장 끝에 ~の件(사건)을 붙이거나, 웃음을 나타내는 w(warai)를 연달아 쓰다가 생긴 草(쿠사)를 매우 흔히 씁니다.'
  },

  // 2~60번까지 N3 59개 지문 생성
  ...Array.from({ length: 59 }, (_, idx) => {
    const num = 2 + idx;
    const themes = [
      {
        t: '라면 지로 야채 마시마시 주문의 벽 (ラーメン二郎のコール)',
        fmt: 'blog',
        tag: '음식/서브컬처',
        s: '呪文のような「ヤサイマシマシアブラカラメ」を噛まずに唱えられた瞬間の達成感は異常でした。',
        r: '<ruby>呪文<rt>じゅもん</rt></ruby>のような「ヤサイマシマシアブラカラメ」を<ruby>噛<rt>か</rt></ruby>まずに<ruby>唱<rt>とな</rt></ruby>えられた<ruby>瞬間<rt>しゅんかん</rt></ruby>の<ruby>達成感<rt>たっせいかん</rt></ruby>は<ruby>異常<rt>いじょう</rt></ruby>でした。',
        tr: '주문(콜) 같은 「야채 많이 기름 많이 짭짤하게」를 혀 꼬이지 않고 외운 순간의 성취감은 남달랐습니다.',
        w: '達成感',
        wr: 'たっせいかん',
        wm: '달성감, 성취감'
      },
      {
        t: '일본 중고 서점 북오프 보물찾기 (ブックオフで掘り出し物)',
        fmt: 'blog',
        tag: '취미/쇼핑',
        s: '100円コーナーの棚の奥から絶版になった伝説の名作コミックを発掘して手が震えました。',
        r: '100<ruby>円<rt>えん</rt></ruby>コーナーの<ruby>棚<rt>たな</rt></ruby>の<ruby>奥<rt>おく</rt></ruby>から<ruby>絶版<rt>ぜっぱん</rt></ruby>になった<ruby>伝説<rt>でんせつ</rt></ruby>の<ruby>名作<rt>めいさく</rt></ruby>コミックを<ruby>発掘<rt>はっくつ</rt></ruby>して<ruby>手<rt>て</rt></ruby>が<ruby>震<rt>ふる</rt></ruby>えました。',
        tr: '100엔 코너 책장 구석에서 절판된 전설의 명작 만화를 발굴하고 손이 떨렸습니다.',
        w: '絶版',
        wr: 'ぜっぱん',
        wm: '절판'
      },
      {
        t: '폭설로 인한 전철 지연 대환장 파티 (大雪で運転見合わせ)',
        fmt: 'tweet',
        tag: 'SNS/교통',
        s: '首都圏の電車が全線ストップして入場規制…ホームが人で埋まってて完全に詰んだ件。',
        r: '<ruby>首都圏<rt>しゅとけん</rt></ruby>の<ruby>電車<rt>でんしゃ</rt></ruby>が<ruby>全線<rt>ぜんせん</rt></ruby>ストップして<ruby>入場規制<rt>にゅうじょうきせい</rt></ruby>…ホームが<ruby>人<rt>ひと</rt></ruby>で<ruby>埋<rt>う</rt></ruby>まってて<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>詰<rt>つ</rt></ruby>んだ<ruby>件<rt>けん</rt></ruby>。',
        tr: '수도권 전철이 전 노선 중단되어 입장 규제… 승강장이 사람으로 꽉 차서 완전 망한(외통수) 건.',
        w: '入場規制',
        wr: 'にゅうじょうきせい',
        wm: '입장 규제'
      },
      {
        t: '첫 자취방 이사 수수료와 레이킹의 충격 (敷金・礼金の洗礼)',
        fmt: 'column',
        tag: '주거/사회',
        s: 'お礼のお金として戻ってこない「礼金」という日本の不動産慣習にカルチャーショックを受けました。',
        r: 'お<ruby>礼<rt>れい</rt></ruby>のお<ruby>金<rt>かね</rt></ruby>として<ruby>戻<rt>もど</rt></ruby>ってこない「<ruby>礼金<rt>れいきん</rt></ruby>」という<ruby>日本<rt>にほん</rt></ruby>の<ruby>不動産<rt>ふどうさん</rt></ruby><ruby>慣習<rt>かんしゅう</rt></ruby>にカルチャーショックを<ruby>受<rt>う</rt></ruby>けました。',
        tr: '감사의 돈으로서 돌려받지 못하는 「레이킨(사례금)」이라는 일본 부동산 관습에 컬처 쇼크를 받았습니다.',
        w: '礼金',
        wr: 'れいきん',
        wm: '사례금 (돌려받지 못하는 월세 보증금의 일부)'
      },
      {
        t: '심야 이자카야의 온기와 노미카이 매너 (とりあえず生と席料)',
        fmt: 'blog',
        tag: '문화/술자리',
        s: '注文していない小鉢が出てくる「お通し」の仕組みを知り、日本の居酒屋文化の奥深さを学びました。',
        r: '<ruby>注文<rt>ちゅうもん</rt></ruby>していない<ruby>小鉢<rt>こばち</rt></ruby>が<ruby>出<rt>で</rt></ruby>てくる「お<ruby>通<rt>とお</rt></ruby>し」の<ruby>仕組<rt>しく</rt></ruby>みを<ruby>知<rt>し</rt></ruby>り、<ruby>日本<rt>にほん</rt></ruby>の<ruby>居酒屋<rt>いざかや</rt></ruby><ruby>文化<rt>ぶんか</rt></ruby>の<ruby>奥深<rt>おくぶか</rt></ruby>さを<ruby>学<rt>まな</rt></ruby>びました。',
        tr: '주문하지 않은 작은 반찬이 나오는 「오토오시(자릿세 안주)」의 구조를 알며, 일본 이자카야 문화의 깊이를 배웠습니다.',
        w: 'お通し',
        wr: 'おとおし',
        wm: '기본 자릿세 안주'
      },
      {
        t: '여름 코믹마켓 첫 참전 전리품 (コミケ初参戦の戦果)',
        fmt: 'tweet',
        tag: '서브컬처/덕질',
        s: '猛暑の東京ビッグサイトで朝6時から待機…推しの新刊セット無事完売前に確保できて感無量！',
        r: '<ruby>猛暑<rt>もうしょ</rt></ruby>の<ruby>東京<rt>とうきょう</rt></ruby>ビッグサイトで<ruby>朝<rt>あさ</rt></ruby>6<ruby>時<rt>じ</rt></ruby>から<ruby>待機<rt>たいき</rt></ruby>…<ruby>推<rt>お</rt></ruby>しの<ruby>新刊<rt>しんかん</rt></ruby>セット<ruby>無事<rt>ぶじ</rt></ruby><ruby>完売前<rt>かんばいまえ</rt></ruby>に<ruby>確保<rt>かくほ</rt></ruby>できて<ruby>感無量<rt>かんむりょう</rt></ruby>！',
        tr: '폭염의 도쿄 빅사이트에서 아침 6시부터 대기… 최애 작가 신간 세트 품절 전에 무사 확보해서 감개무량!',
        w: '感無量',
        wr: 'かんむりょう',
        wm: '감개무량'
      }
    ];

    const cur = themes[idx % themes.length];

    return {
      id: `read-n3-${num}`,
      title: `${cur.t} #${num}`,
      format: cur.fmt as any,
      author: '도쿄 트렌드 리포터',
      timestamp: '2026-03-09',
      jlpt: 'N3' as const,
      topicTag: cur.tag,
      sentences: [
        {
          original: cur.s,
          ruby: cur.r,
          translation: cur.tr
        },
        {
          original: '現地で実際に生活しているからこそ味わえるリアルな空気感があります。',
          ruby: '<ruby>現地<rt>げんち</rt></ruby>で<ruby>実際<rt>じっさい</rt></ruby>に<ruby>生活<rt>せいかつ</rt></ruby>しているからこそ<ruby>味<rt>あじ</rt></ruby>わえるリアルな<ruby>空気感<rt>くうきかん</rt></ruby>があります。',
          translation: '현지에서 실제로 생활하고 있기에 맛볼 수 있는 생생한 현장감이 있습니다.'
        },
        {
          original: '言葉のニュアンスを深く理解することで、コミュニケーションがより豊かになります。',
          ruby: '<ruby>言葉<rt>ことば</rt></ruby>のニュアンスを<ruby>深<rt>ふか</rt></ruby>く<ruby>理解<rt>りかい</rt></ruby>することで、コミュニケーションがより<ruby>豊<rt>ゆた</rt></ruby>かになります。',
          translation: '말의 뉘앙스를 깊이 이해함으로써 소통이 한층 풍요로워집니다.'
        }
      ],
      vocabulary: [
        { id: `rw-n3-${num}-1`, word: cur.w, reading: cur.wr, meaning: cur.wm, jlpt: 'N3' as const }
      ],
      culturalInsight: '현대 일본의 인터넷 문화, 청년층 은어와 사회적 배경이 녹아 있는 N3 중급 실전 독해문입니다.'
    };
  })
];
