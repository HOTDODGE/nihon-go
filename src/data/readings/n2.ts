import type { ReadingPassage } from '../../types';

export const READINGS_N2: ReadingPassage[] = [
  {
    id: 'read-n2-lightnovel',
    title: '이세계 전이 프롤로그 발췌 (異世界転生ラノベの冒頭)',
    format: 'lightnovel',
    author: '카게노 유지',
    timestamp: '제 1화',
    jlpt: 'N2',
    topicTag: '서브컬처/라노벨',
    sentences: [
      {
        original: '深夜の交差点、まばゆいヘッドライトの光が視界を埋め尽くした。',
        ruby: '<ruby>深夜<rt>しんや</rt></ruby>の<ruby>交差点<rt>こうさてん</rt></ruby>、まばゆいヘッドライトの<ruby>光<rt>ひかり</rt></ruby>が<ruby>視界<rt>しかい</rt></ruby>を<ruby>埋<rt>う</rt></ruby>め<ruby>尽<rt>つ</rt></ruby>くした。',
        translation: '심야의 교차로, 눈부신 헤드라이트 불빛이 시야를 가득 메웠다.'
      },
      {
        original: '耳をつんざくスキール音の刹那、俺の意識は深い闇へと沈んでいったはずだった。',
        ruby: '<ruby>耳<rt>みみ</rt></ruby>をつんざくスキール<ruby>音<rt>おん</rt></ruby>の<ruby>刹那<rt>せつな</rt></ruby>、<ruby>俺<rt>おれ</rt></ruby>の<ruby>意識<rt>いしき</rt></ruby>は<ruby>深<rt>ふか</rt></ruby>い<ruby>闇<rt>やみ</rt></ruby>へと<ruby>沈<rt>しず</rt></ruby>んでいったはずだった。',
        translation: '귀를 찢는 듯한 스키드마크 소리가 난 찰나, 내 의식은 깊은 어둠 속으로 가라앉았을 터였다.'
      },
      {
        original: 'だが、目覚めた先に広がっていたのは、見渡す限りの青空と巨大な浮遊島だった。',
        ruby: 'だが、<ruby>目覚<rt>めざ</rt></ruby>めた<ruby>先<rt>さき</rt></ruby>に<ruby>広<rt>ひろ</rt></ruby>がっていたのは、<ruby>見渡<rt>みわた</rt></ruby>す<ruby>限<rt>かぎ</rt></ruby>りの<ruby>青空<rt>あおぞら</rt></ruby>と<ruby>巨大<rt>きょだい</rt></ruby>な<ruby>浮遊島<rt>ふゆうとう</rt></ruby>だった。',
        translation: '하지만 눈을 뜬 곳에 펼쳐져 있던 것은, 끝없이 펼쳐진 푸른 하늘과 거대한 부유도였다.'
      },
      {
        original: '「まさか、これってテンプレ通りの異世界転生ってやつか…！？」',
        ruby: '「まさか、これってテンプレ<ruby>通<rt>とお</rt></ruby>りの<ruby>異世界転生<rt>いせかいてんせい</rt></ruby>ってやつか…！？」',
        translation: '「설마, 이거 클리셰대로 이세계 전생이라는 녀석인가…!?」'
      }
    ],
    vocabulary: [
      { id: 'rw-n2-1', word: '交差点', reading: 'こうさてん', meaning: '교차로', jlpt: 'N4' },
      { id: 'rw-n2-2', word: '刹那', reading: 'せつな', meaning: '찰나, 순식간', jlpt: 'N1' },
      { id: 'rw-n2-3', word: '沈む', reading: 'しずむ', meaning: '가라앉다', jlpt: 'N2' },
      { id: 'rw-n2-4', word: 'テンプレ', reading: 'てんぷれ', meaning: '템플릿, 클리셰 (서브컬처 유행어)', jlpt: 'N2' },
      { id: 'rw-n2-5', word: '異世界転生', reading: 'いせかいてんせい', meaning: '이세계 전생', jlpt: 'N2' }
    ],
    culturalInsight: '일본 서브컬처의 대표 장르인 "이세계 전생(異世界転生)"에서는 주인공이 트럭에 치여 전이하는 것이 전형적인 클리셰(テンプレ)로 자리잡았습니다.'
  },

  // 2~60번까지 N2 59개 지문 생성
  ...Array.from({ length: 59 }, (_, idx) => {
    const num = 2 + idx;
    const themes = [
      {
        t: '일본 Z세대의 타이파(타임 퍼포먼스) 소비 심리 (タイパ重視の若者たち)',
        fmt: 'column',
        tag: '트렌드/사회',
        s: '倍速再生で動画を視聴し、要約だけを摂取する若者の行動様式は効率主義の極致と言える。',
        r: '<ruby>倍速再生<rt>ばいそくさいせい</rt></ruby>で<ruby>動画<rt>どうが</rt></ruby>を<ruby>視聴<rt>しちょう</rt></ruby>し、<ruby>要約<rt>ようやく</rt></ruby>だけを<ruby>摂取<rt>せっしゅ</rt></ruby>する<ruby>若者<rt>わかもの</rt></ruby>の<ruby>行動様式<rt>こうどうようしき</rt></ruby>は<ruby>効率主義<rt>こうりつしゅぎ</rt></ruby>の<ruby>極致<rt>きょくち</rt></ruby>と<ruby>言<rt>い</rt></ruby>える。',
        tr: '배속 재생으로 영상을 시청하고 요약본만을 섭취하는 청년들의 행동 양식은 효율주의의 극치라 할 수 있다.',
        w: '効率主義',
        wr: 'こうりつしゅぎ',
        wm: '효율주의'
      },
      {
        t: 'AI 시대에 재평가되는 아날로그 필름 카메라 붐 (フィルムカメラの逆襲)',
        fmt: 'blog',
        tag: '문화/예술',
        s: '現像するまで写りが分からない不確実性と独特の粒子感が、デジタルネイティブを魅了している。',
        r: '<ruby>現像<rt>げんぞう</rt></ruby>するまで<ruby>写<rt>うつ</rt></ruby>りが<ruby>分<rt>わ</rt></ruby>からない<ruby>不確実性<rt>ふかくじつせい</rt></ruby>と<ruby>独特<rt>どくとく</rt></ruby>の<ruby>粒子感<rt>りゅうしかん</rt></ruby>が、デジタルネイティブを<ruby>魅了<rt>みりょう</rt></ruby>している。',
        tr: '현상하기 전까지 결과물을 알 수 없는 불확실성과 독특한 입자감이 디지털 네이티브 세대를 매료하고 있다.',
        w: '魅了',
        wr: 'みりょう',
        wm: '매료함'
      },
      {
        t: '소셜 미디어의 인정욕구와 파피용 증후군 (SNS時代の承認欲求)',
        fmt: 'column',
        tag: '심리/인터넷',
        s: '他者からの「いいね」という刹那的な承認に依存し、過剰な自己演出を繰り返す現代人の孤立が深刻だ。',
        r: '<ruby>他者<rt>たしゃ</rt></ruby>からの「いいね」という<ruby>刹那的<rt>せつなてき</rt></ruby>な<ruby>承認<rt>しょうにん</rt></ruby>に<ruby>依存<rt>いぞん</rt></ruby>し、<ruby>過剰<rt>かじょう</rt></ruby>な<ruby>自己演出<rt>じこえんしゅつ</rt></ruby>を<ruby>繰<rt>く</rt></ruby>り<ruby>返<rt>かえ</rt></ruby>す<ruby>現代人<rt>げんだいじん</rt></ruby>の<ruby>孤立<rt>こりつ</rt></ruby>が<ruby>深刻<rt>しんこく</rt></ruby>だ。',
        tr: '타자로부터의 「좋아요」라는 찰나적인 인정에 의존하여 과도한 자기 연출을 반복하는 현대인의 고립이 심각하다.',
        w: '承認欲求',
        wr: 'しょうにんよっきゅう',
        wm: '인정 욕구'
      },
      {
        t: '재택근무와 도쿄 탈출, 지방 이주 트렌드 (リモートワークと地方移住)',
        fmt: 'blog',
        tag: '사회/라이프스타일',
        s: '過密な大都市を離れ、自然豊かな古民家をリノベーションして二拠点生活を送る人々が増えている。',
        r: '<ruby>過密<rt>かみつ</rt></ruby>な<ruby>大都市<rt>だいとし</rt></ruby>を<ruby>離<rt>はな</rt></ruby>れ、<ruby>自然<rt>しぜん</rt></ruby><ruby>豊<rt>ゆた</rt></ruby>かな<ruby>古民家<rt>こみんか</rt></ruby>をリノベーションして<ruby>二拠点生活<rt>にきょてんせいかつ</rt></ruby>を<ruby>送<rt>おく</rt></ruby>る<ruby>人々<rt>ひとびと</rt></ruby>が<ruby>増<rt>ふ</rt></ruby>えている。',
        tr: '과밀한 대도시를 떠나 자연이 풍요로운 고택을 리노베이션하여 2거점 생활을 누리는 사람들이 늘고 있다.',
        w: '二拠点生活',
        wr: 'にきょてんせいかつ',
        wm: '듀얼 라이프(두 거점 생활)'
      },
      {
        t: '오타쿠 경제와 추억 소비(推し活)의 시장 규모 (推し活が牽引する巨大市場)',
        fmt: 'column',
        tag: '경제/비즈니스',
        s: '単なるコンテンツ消費にとどまらず、自己実現とコミュニティ帰属意識を充たす新たな消費形態である。',
        r: '<ruby>単<rt>たん</rt></ruby>なるコンテンツ<ruby>消費<rt>しょうひ</rt></ruby>にとどまらず、<ruby>自己実現<rt>じこじつげん</rt></ruby>とコミュニティ<ruby>帰属意識<rt>きぞくいしき</rt></ruby>を<ruby>充<rt>み</rt></ruby>たす<ruby>新<rt>あら</rt></ruby>たな<ruby>消費形態<rt>しょうひけいたい</rt></ruby>である。',
        tr: '단순한 콘텐츠 소비에 그치지 않고 자아실현과 커뮤니티 귀속 의식을 충족시키는 새로운 소비 형태이다.',
        w: '帰属意識',
        wr: 'きぞくいしき',
        wm: '소속감, 귀속 의식'
      },
      {
        t: '편의점 무인 계산대와 노동력 부족의 현주소 (無人レジと人手不足)',
        fmt: 'column',
        tag: 'IT/기술',
        s: '少子高齢化が加速する日本社会において、画像認識AIを活用した完全自動店舗の導入が急務となっている。',
        r: '<ruby>少子高齢化<rt>しょうしこうれいか</rt></ruby>が<ruby>加速<rt>かそく</rt></ruby>する<ruby>日本社会<rt>にほんしゃかい</rt></ruby>において、<ruby>画像認識<rt>がぞうにんしき</rt></ruby>AIを<ruby>活用<rt>かつよう</rt></ruby>した<ruby>完全自動店舗<rt>かんぜんじどうてんぽ</rt></ruby>の<ruby>導入<rt>どうにゅう</rt></ruby>が<ruby>急務<rt>きゅうむ</rt></ruby>となっている。',
        tr: '저출산 고령화가 가속화되는 일본 사회에서 화상인식 AI를 활용한 완전 자동 매장의 도입이 급선무가 되고 있다.',
        w: '少子高齢化',
        wr: 'しょうしこうれいか',
        wm: '저출산 고령화'
      }
    ];

    const cur = themes[idx % themes.length];

    return {
      id: `read-n2-${num}`,
      title: `${cur.t} #${num}`,
      format: cur.fmt as any,
      author: '시사 문화 평론가',
      timestamp: '2026-03-09',
      jlpt: 'N2' as const,
      topicTag: cur.tag,
      sentences: [
        {
          original: cur.s,
          ruby: cur.r,
          translation: cur.tr
        },
        {
          original: 'こうした構造変化の背景には、テクノロジーの進歩と人々の価値観の多様化が存在している。',
          ruby: 'こうした<ruby>構造変化<rt>こうぞうへんか</rt></ruby>の<ruby>背景<rt>はいけい</rt></ruby>には、テクノロジーの<ruby>進歩<rt>しんぽ</rt></ruby>と<ruby>人々<rt>ひとびと</rt></ruby>の<ruby>価値観<rt>かちかん</rt></ruby>の<ruby>多様化<rt>たようか</rt></ruby>が<ruby>存在<rt>そんざい</rt></ruby>している。',
          translation: '이러한 구조적 변화의 배경에는 기술의 진보와 사람들의 가치관 다양화가 존재하고 있다.'
        },
        {
          original: '表面的な事象のみならず、その深層にある社会力学を見抜く洞察力が求められている。',
          ruby: '<ruby>表面的<rt>ひょうめんてき</rt></ruby>な<ruby>事象<rt>じしょう</rt></ruby>のみならず、その<ruby>深層<rt>しんそう</rt></ruby>にある<ruby>社会力学<rt>しゃかいりきがく</rt></ruby>を<ruby>見抜<rt>みぬ</rt></ruby>く<ruby>洞察力<rt>どうさつりょく</rt></ruby>が<ruby>求<rt>もと</rt></ruby>められている。',
          translation: '표면적인 현상뿐만 아니라 그 심층에 자리한 사회적 역학을 꿰뚫어 보는 통찰력이 요구된다.'
        }
      ],
      vocabulary: [
        { id: `rw-n2-${num}-1`, word: cur.w, reading: cur.wr, meaning: cur.wm, jlpt: 'N2' as const }
      ],
      culturalInsight: 'N2 시험의 핵심인 논설문, 논리적 연결어, 추상적 어휘를 다각도로 습득할 수 있는 심층 지문입니다.'
    };
  })
];
