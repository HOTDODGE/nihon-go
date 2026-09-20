import type { ReadingPassage } from '../../types';

export const READINGS_N1: ReadingPassage[] = [
  {
    id: 'read-n1-column',
    title: '유행어와 사어(死語)가 비추는 시대의 심층 심리 (流行語と死語が映す時代の深層)',
    format: 'column',
    author: '언어사회학자 사토',
    timestamp: '월간 문화비평',
    jlpt: 'N1',
    topicTag: '문화비평/고급독해',
    sentences: [
      {
        original: '言葉は生き物であり、時代の熱狂を鋭敏に反映しつつも、やがて消費され淘汰されていく宿命を帯びている。',
        ruby: '<ruby>言葉<rt>ことば</rt></ruby>は<ruby>生<rt>い</rt></ruby>き<ruby>物<rt>もの</rt></ruby>であり、<ruby>時代<rt>じだい</rt></ruby>の<ruby>熱狂<rt>ねっきょう</rt></ruby>を<ruby>鋭敏<rt>えいびん</rt></ruby>に<ruby>反映<rt>はんえい</rt></ruby>しつつも、やがて<ruby>消費<rt>しょうひ</rt></ruby>され<ruby>淘汰<rt>とうた</rt></ruby>されていく<ruby>宿命<rt>しゅくめい</rt></ruby>を<ruby>帯<rt>お</rt></ruby>びている。',
        translation: '말이란 살아있는 생물이며, 시대의 열광을 예민하게 반영하면서도 머지않아 소비되고 도태되어 가는 숙명을 띠고 있다.'
      },
      {
        original: 'バブル経済期を象徴した「アッシー君」や「ナウい」といった表現は、今や「死語」としてノスタルジーの対象と化している。',
        ruby: 'バブル<ruby>経済期<rt>けいざいき</rt></ruby>を<ruby>象徴<rt>しょうちょう</rt></ruby>した「アッシー<ruby>君<rt>くん</rt></ruby>」や「ナウい」といった<ruby>表現<rt>ひょうげん</rt></ruby>は、<ruby>今<rt>いま</rt></ruby>や「<ruby>死語<rt>しご</rt></ruby>」としてノスタルジーの<ruby>対象<rt>たいしょう</rt></ruby>と<ruby>化<rt>か</rt></ruby>している。',
        translation: '버블 경제기를 상징했던 「앗시군」이나 「나우이」와 같은 표현은, 이제 「사어」로서 노스탤지어의 대상으로 변모하였다.'
      },
      {
        original: 'これらは単なる古臭い遺物ではなく、当時の過剰な消費欲やポップカルチャーの爛熟を克明に物語る歴史的証左でもある。',
        ruby: 'これらは<ruby>単<rt>たん</rt></ruby>なる<ruby>古臭<rt>ふるくさ</rt></ruby>い<ruby>遺物<rt>いぶつ</rt></ruby>ではなく、<ruby>当時<rt>とうじ</rt></ruby>の<ruby>過剰<rt>かじょう</rt></ruby>な<ruby>消費欲<rt>しょうひよく</rt></ruby>やポップカルチャーの<ruby>爛熟<rt>らんじゅく</rt></ruby>を<ruby>克明<rt>こくめい</rt></ruby>に<ruby>物語<rt>ものがた</rt></ruby>る<ruby>歴史的<rt>れきしてき</rt></ruby><ruby>証左<rt>しょうさ</rt></ruby>でもある。',
        translation: '이것들은 단순한 낡아빠진 유물이 아니라, 당시의 과도한 소비욕과 팝 컬처의 난숙함을 적나라하게 증언하는 역사적 증좌이기도 하다.'
      },
      {
        original: '現代のデジタル空間で刹那的に消費されるネットスラングもまた、遠い未来には特異な文化標本として再評価されるのかもしれない。',
        ruby: '<ruby>現代<rt>げんだい</rt></ruby>のデジタル<ruby>空間<rt>くうかん</rt></ruby>で<ruby>刹那的<rt>せつなてき</rt></ruby>に<ruby>消費<rt>しょうひ</rt></ruby>されるネットスラングもまた、<ruby>遠<rt>とお</rt></ruby>い<ruby>未来<rt>みらい</rt></ruby>には<ruby>特異<rt>とくい</rt></ruby>な<ruby>文化標本<rt>ぶんかひょうほん</rt></ruby>として<ruby>再評価<rt>さいひょうか</rt></ruby>されるのかもしれない。',
        translation: '현대의 디지털 공간에서 찰나적으로 소비되는 넷 슬랭 또한, 먼 훗날에는 특이한 문화 표본으로서 재평가될지도 모른다.'
      }
    ],
    vocabulary: [
      { id: 'rw-n1-1', word: '鋭敏', reading: 'えいびん', meaning: '예민함, 날카로움', jlpt: 'N1' },
      { id: 'rw-n1-2', word: '淘汰', reading: 'とうた', meaning: '도태', jlpt: 'N1' },
      { id: 'rw-n1-3', word: '宿命', reading: 'しゅくめい', meaning: '숙명', jlpt: 'N1' },
      { id: 'rw-n1-4', word: '象徴', reading: 'しょうちょう', meaning: '상징', jlpt: 'N2' },
      { id: 'rw-n1-5', word: '爛熟', reading: 'らんじゅく', meaning: '난숙, 무르익음', jlpt: 'N1' },
      { id: 'rw-n1-6', word: '証左', reading: 'しょうさ', meaning: '증좌, 확실한 증거', jlpt: 'N1' }
    ],
    culturalInsight: '사어(死語)는 일본 사회의 급격한 경제적, 기술적 변곡점(버블 경제, 헤이세이 갸루 붐, 스마트폰 보급 등)마다 폭발적으로 발생했습니다.'
  },

  // 2~60번까지 N1 59개 지문 생성
  ...Array.from({ length: 59 }, (_, idx) => {
    const num = 2 + idx;
    const topics = [
      {
        t: '일본 전통 미학 「와비사비(侘寂)」와 결핍의 아름다움 (わび・さびの哲学)',
        fmt: 'column',
        tag: '철학/전통미학',
        s: '完全無欠を退け、風化や不完全さのなかにこそ永劫の美を見出す感性こそが日本文化の根幹をなす。',
        r: '<ruby>完全無欠<rt>かんぜんむけつ</rt></ruby>を<ruby>退<rt>しりぞ</rt></ruby>け、<ruby>風化<rt>ふうか</rt></ruby>や<ruby>不完全<rt>ふかんぜん</rt></ruby>さのなかにこそ<ruby>永劫<rt>えいごう</rt></ruby>の<ruby>美<rt>び</rt></ruby>を<ruby>見出<rt>みいだ</rt></ruby>す<ruby>感性<rt>かんせい</rt></ruby>こそが<ruby>日本文化<rt>にほんぶんか</rt></ruby>の<ruby>根幹<rt>こんかん</rt></ruby>をなす。',
        tr: '완전무결함을 물리치고 풍화와 불완전함 속에서 비로소 영겁의 아름다움을 발견하는 감성이야말로 일본 문화의 근간을 이룬다.',
        w: '完全無欠',
        wr: 'かんぜんむけつ',
        wm: '완전무결'
      },
      {
        t: '디지털 자아와 아바타 문화의 철학적 고찰 (メタバースにおける主体の融解)',
        fmt: 'column',
        tag: '학술/IT철학',
        s: '肉体という物理的制約から解放された仮想空間において、アイデンティティは多重化し流動化する。',
        r: '<ruby>肉体<rt>にくたい</rt></ruby>という<ruby>物理的制約<rt>ぶつりてきせいやく</rt></ruby>から<ruby>解放<rt>かいほう</rt></ruby>された<ruby>仮想空間<rt>かそうくうかん</rt></ruby>において、アイデンティティは<ruby>多重化<rt>たじゅうか</rt></ruby>し<ruby>流動化<rt>りゅうどうか</rt></ruby>する。',
        tr: '육체라는 물리적 제약에서 해방된 가상공간에서 정체성은 다중화되고 유동화된다.',
        w: '多重化',
        wr: 'たじゅうか',
        wm: '다중화'
      },
      {
        t: '현대 자본주의와 과잉 소비 사회의 역설 (消費社会の神話と終焉)',
        fmt: 'column',
        tag: '사회/경제평론',
        s: '欲望の無限増殖を前提とする経済モデルは、資源の有限性と精神的疲弊という二重の壁に直面している。',
        r: '<ruby>欲望<rt>よくぼう</rt></ruby>の<ruby>無限増殖<rt>むげんぞうしょく</rt></ruby>を<ruby>前提<rt>ぜんてい</rt></ruby>とする<ruby>経済<rt>けいざい</rt></ruby>モデルは、<ruby>資源<rt>しげん</rt></ruby>の<ruby>有限性<rt>ゆうげんせい</rt></ruby>と<ruby>精神的疲弊<rt>せいしんてきひへい</rt></ruby>という<ruby>二重<rt>にじゅう</rt></ruby>の<ruby>壁<rt>かべ</rt></ruby>に<ruby>直面<rt>ちょくめん</rt></ruby>している。',
        tr: '욕망의 무한 증식을 전제로 하는 경제 모델은 자원의 유한성과 정신적 피폐라는 이중의 벽에 직면해 있다.',
        w: '精神的疲弊',
        wr: 'せいしんてきひへい',
        wm: '정신적 피폐'
      },
      {
        t: '언어의 순화와 생성형 언어 모델의 충돌 (AIと自然言語の境界線)',
        fmt: 'column',
        tag: '언어학/AI',
        s: '膨大なコーパスから確率的に紡ぎ出されるテキストは、はたして人間の魂の宿る「言葉」たり得るのか。',
        r: '<ruby>膨大<rt>ぼうだい</rt></ruby>なコーパスから<ruby>確率的<rt>かくりつてき</rt></ruby>に<ruby>紡<rt>つむ</rt></ruby>ぎ<ruby>出<rt>だ</rt></ruby>されるテキストは、はたして<ruby>人間<rt>にんげん</rt></ruby>の<ruby>魂<rt>たましい</rt></ruby>の<ruby>宿<rt>やど</rt></ruby>る「<ruby>言葉<rt>ことば</rt></ruby>」たり<ruby>得<rt>う</rt></ruby>るのか。',
        tr: '방대한 말뭉치로부터 확률적으로 자아내어지는 텍스트는 과연 인간의 혼이 깃든 「말」이라 불릴 수 있는 것인가.',
        w: '確率的',
        wr: 'かくりつてき',
        wm: '확률적'
      },
      {
        t: '일본 문학에 나타난 무상관(無常観)의 계보 (方丈記から現代文学へ)',
        fmt: 'column',
        tag: '문학비평/고전문학',
        s: '「行く川の流れは絶えずして」に象徴される無常の響きは、震災やパンデミックを経験した現代にも木霊する。',
        r: '「<ruby>行<rt>ゆ</rt></ruby>く<ruby>川<rt>かわ</rt></ruby>の<ruby>流<rt>なが</rt></ruby>れは<ruby>絶<rt>た</rt></ruby>えずして」に<ruby>象徴<rt>しょうちょう</rt></ruby>される<ruby>無常<rt>むじょう</rt></ruby>の<ruby>響<rt>ひび</rt></ruby>きは、<ruby>震災<rt>しんさい</rt></ruby>やパンデミックを<ruby>経験<rt>けいけん</rt></ruby>した<ruby>現代<rt>げんだい</rt></ruby>にも<ruby>木霊<rt>こだま</rt></ruby>する。',
        tr: '「흘러가는 강의 물줄기는 끊이지 않고」로 상징되는 무상의 울림은 재해와 팬데믹을 경험한 현대에도 메아리친다.',
        w: '無常観',
        wr: 'むじょうかん',
        wm: '무상관 (세상만물이 덧없다는 관점)'
      },
      {
        t: '현대 도시 공간의 균질화와 장소성(Placeness)의 상실 (失われる都市の記憶)',
        fmt: 'column',
        tag: '도시공학/사회비평',
        s: '再開発の美名のもとに画一的な複合商業施設が乱立し、路地裏が育んできた固有の歴史的文脈が不可逆的に消滅する。',
        r: '<ruby>再開発<rt>さいかいはつ</rt></ruby>の<ruby>美名<rt>びめい</rt></ruby>のもとに<ruby>画一的<rt>かくいつてき</rt></ruby>な<ruby>複合商業施設<rt>ふくごうしょうぎょうしせつ</rt></ruby>が<ruby>乱立<rt>らんりつ</rt></ruby>し、<ruby>路地裏<rt>ろじうら</rt></ruby>が<ruby>育<rt>はぐく</rt></ruby>んできた<ruby>固有<rt>こゆう</rt></ruby>の<ruby>歴史的文脈<rt>れきしてきぶんみゃく</rt></ruby>が<ruby>不可逆的<rt>ふかぎゃくてき</rt></ruby>に<ruby>消滅<rt>しょうめつ</rt></ruby>する。',
        tr: '재개발이라는 미명 하에 획일적인 복합 상업시설이 난립하며 골목 안길이 길러낸 고유한 역사적 맥락이 비가역적으로 소멸한다.',
        w: '不可逆的',
        wr: 'ふかぎゃくてき',
        wm: '비가역적 (돌이킬 수 없는)'
      }
    ];

    const cur = topics[idx % topics.length];

    return {
      id: `read-n1-${num}`,
      title: `${cur.t} #${num}`,
      format: cur.fmt as any,
      author: '사상 평론 아카데미',
      timestamp: '2026-03-09',
      jlpt: 'N1' as const,
      topicTag: cur.tag,
      sentences: [
        {
          original: cur.s,
          ruby: cur.r,
          translation: cur.tr
        },
        {
          original: 'この弁証法的な問いかけこそが、硬直化した現代の思考枠組みを解きほぐす契機となり得る。',
          ruby: 'この<ruby>弁証法的<rt>べんしょうほうてき</rt></ruby>な<ruby>問<rt>と</rt></ruby>いかけこそが、<ruby>硬直化<rt>こうちょくか</rt></ruby>した<ruby>現代<rt>げんだい</rt></ruby>の<ruby>思考枠組<rt>しこうわくぐ</rt></ruby>みを<ruby>解<rt>と</rt></ruby>きほぐす<ruby>契機<rt>けいき</rt></ruby>となり<ruby>得<rt>う</rt></ruby>る。',
          translation: '이러한 변증법적인 물음이야말로 경직화된 현대의 사고 틀을 풀어내는 계기가 될 수 있다.'
        },
        {
          original: 'われわれは単なる傍観者としてではなく、この歴史的転換点の当事者として真摯に対峙せねばならない。',
          ruby: 'われわれは<ruby>単<rt>たん</rt></ruby>なる<ruby>傍観者<rt>ぼうかんしゃ</rt></ruby>としてではなく、この<ruby>歴史的転換点<rt>れきしてきてんかんてん</rt></ruby>の<ruby>当事者<rt>とうじしゃ</rt></ruby>として<ruby>真摯<rt>しんし</rt></ruby>に<ruby>対峙<rt>たいじ</rt></ruby>せねばならない。',
          translation: '우리는 단순한 방관자로서가 아니라 이 역사적 전환점의 당사자로서 진지하게 대치해야만 한다.'
        }
      ],
      vocabulary: [
        { id: `rw-n1-${num}-1`, word: cur.w, reading: cur.wr, meaning: cur.wm, jlpt: 'N1' as const }
      ],
      culturalInsight: 'JLPT N1 합격을 좌우하는 최고난도 장문 독해, 추상 사상론, 비평문 문체를 완벽히 마스터할 수 있는 지문입니다.'
    };
  })
];
