import type { Question } from '../types';

export const MOCK_QUESTIONS: Question[] = [
  // ───────────── English ─────────────
  {
    id: 'en-1', subject: 'english', topic: 'tenses',
    prompt: "Choose the correct form: «She ___ to school every day.»",
    options: ['go', 'goes', 'going', 'gone'],
    correctIndex: 1,
    explanation: 'У Present Simple для he/she/it дієслово отримує закінчення -s/-es. «She goes» — правильна форма. «Go» підійде для I/you/we/they.',
  },
  {
    id: 'en-2', subject: 'english', topic: 'tenses',
    prompt: "Pick the past simple form: «Yesterday we ___ a movie.»",
    options: ['watch', 'watches', 'watched', 'watching'],
    correctIndex: 2,
    explanation: 'Past Simple правильних дієслів утворюється додаванням -ed. «Watch» → «watched». Ознака минулого — слово «yesterday».',
  },
  {
    id: 'en-3', subject: 'english', topic: 'vocab',
    prompt: "What does «enormous» mean?",
    options: ['дуже малий', 'дуже великий', 'середній', 'порожній'],
    correctIndex: 1,
    explanation: '«Enormous» означає «величезний, дуже великий». Синоніми: huge, giant, massive. Антонім — tiny.',
  },
  {
    id: 'en-4', subject: 'english', topic: 'prepositions',
    prompt: "Choose the right preposition: «I am good ___ math.»",
    options: ['in', 'on', 'at', 'of'],
    correctIndex: 2,
    explanation: 'Стійкий вираз «good at something» означає «добре розбиратися в чомусь». Тож правильна відповідь — «at».',
  },
  {
    id: 'en-5', subject: 'english', topic: 'grammar',
    prompt: "Which sentence is grammatically correct?",
    options: [
      'I have seen him yesterday.',
      'I saw him yesterday.',
      'I have saw him yesterday.',
      'I seen him yesterday.',
    ],
    correctIndex: 1,
    explanation: 'Зі словом «yesterday» використовуємо Past Simple («saw»), а не Present Perfect. «I saw him yesterday» — єдина правильна форма.',
  },
  {
    id: 'en-6', subject: 'english', topic: 'vocab',
    prompt: "Choose the synonym for «happy».",
    options: ['sad', 'angry', 'joyful', 'tired'],
    correctIndex: 2,
    explanation: '«Joyful» — синонім «happy» (радісний, щасливий). «Sad» — сумний, «angry» — злий, «tired» — втомлений.',
  },
  {
    id: 'en-7', subject: 'english', topic: 'tenses',
    prompt: "Complete: «By 2025, she ___ three books.»",
    options: ['will write', 'has written', 'will have written', 'wrote'],
    correctIndex: 2,
    explanation: 'Future Perfect (will have + V3) показує дію, що завершиться до певного моменту в майбутньому. Правильно: «will have written».',
  },
  {
    id: 'en-8', subject: 'english', topic: 'grammar',
    prompt: "Pick the correct article: «___ sun is bright today.»",
    options: ['A', 'An', 'The', '— (без артикля)'],
    correctIndex: 2,
    explanation: 'Сонце — унікальний об’єкт, тому перед ним стоїть означений артикль «the»: «the sun».',
  },

  // ───────────── German ─────────────
  {
    id: 'de-1', subject: 'german', topic: 'artikel',
    prompt: 'Який артикль для слова «Tisch» (стіл)?',
    options: ['der', 'die', 'das', 'den'],
    correctIndex: 0,
    explanation: '«Tisch» — чоловічого роду (der Tisch). Запам’ятай: der Tisch, die Lampe, das Buch — класичний приклад трьох родів.',
  },
  {
    id: 'de-2', subject: 'german', topic: 'artikel',
    prompt: 'Який артикль у множині для «Bücher» (книги)?',
    options: ['der', 'die', 'das', 'des'],
    correctIndex: 1,
    explanation: 'У множині всі роди мають однаковий артикль «die»: die Bücher, die Tische, die Lampen.',
  },
  {
    id: 'de-3', subject: 'german', topic: 'verbs',
    prompt: 'Виберіть правильну форму: «Ich ___ Müde.» (бути втомленим)',
    options: ['bin', 'habe', 'bin', 'ist'],
    correctIndex: 0,
    explanation: 'Дієслово sein («бути») для «ich» має форму «bin». Тож: «Ich bin müde» — я втомлений.',
  },
  {
    id: 'de-4', subject: 'german', topic: 'cases',
    prompt: 'У якому відмінку стоїть виділене слово: «Ich gebe dem Mann ein Buch»?',
    options: ['Nominativ', 'Akkusativ', 'Dativ', 'Genitiv'],
    correctIndex: 2,
    explanation: 'Після дієслова «geben» (давати) отримувач стоїть у Dativ: «dem Mann» (кому?). Книга — в Akkusativ: «ein Buch» (що?).',
  },
  {
    id: 'de-5', subject: 'german', topic: 'vocab',
    prompt: 'Що означає «der Apfel»?',
    options: ['груша', 'яблуко', 'апельсин', 'банан'],
    correctIndex: 1,
    explanation: '«Der Apfel» — яблуко. Груша — die Birne, апельсин — die Orange, банан — die Banane.',
  },
  {
    id: 'de-6', subject: 'german', topic: 'verbs',
    prompt: 'Виберіть модальний дієслово у правильній формі: «Wir ___ Deutsch.» (ми хочемо вивчати німецьку)',
    options: ['wollen', 'will', 'wollt', 'möchte'],
    correctIndex: 0,
    explanation: 'Для «wir» (ми) форма wollen — «wollen». «Will» — для er/sie/es, «wollt» — для ihr. Правильно: «Wir wollen Deutsch lernen».',
  },
  {
    id: 'de-7', subject: 'german', topic: 'cases',
    prompt: 'Виберіть правильний артикль Akkusativ: «Ich kaufe ___ Auto.» (das Auto)',
    options: ['der', 'die', 'das', 'den'],
    correctIndex: 2,
    explanation: 'Середній рід у Akkusativ не змінюється: das Auto → das Auto. Тож: «Ich kaufe das Auto».',
  },
  {
    id: 'de-8', subject: 'german', topic: 'vocab',
    prompt: 'Як перекладається «Schule»?',
    options: ['магазин', 'школа', 'робота', 'дім'],
    correctIndex: 1,
    explanation: '«Die Schule» — школа. Магазин — der Laden, робота — die Arbeit, дім — das Haus.',
  },

  // ───────────── Polish ─────────────
  {
    id: 'pl-1', subject: 'polish', topic: 'cases',
    prompt: 'У якому відмінку стоїть слово «książkę» у реченні «Czytam książkę»?',
    options: ['Mianownik', 'Dopełniacz', 'Biernik', 'Narzędnik'],
    correctIndex: 2,
    explanation: 'Перехідне дієслово «czytać» вимагає Biernik (знахідний відмінок) — «czytam książkę» (що?). Для «książka» → «książkę».',
  },
  {
    id: 'pl-2', subject: 'polish', topic: 'verbs',
    prompt: 'Виберіть правильну форму: «Ja ___ w Warszawie.» (я живу у Варшаві)',
    options: ['mieszkam', 'mieszkasz', 'mieszkają', 'mieszka'],
    correctIndex: 0,
    explanation: 'Для «ja» (я) форма дієслова mieszkać — «mieszkam». «Mieszkasz» — для ty, «mieszka» — для on/ona.',
  },
  {
    id: 'pl-3', subject: 'polish', topic: 'vocab',
    prompt: 'Що означає «dom»?',
    options: ['квартира', 'дім', 'офіс', 'магазин'],
    correctIndex: 1,
    explanation: '«Dom» — дім, будинок. Квартира — mieszkanie, офіс — biuro, магазин — sklep.',
  },
  {
    id: 'pl-4', subject: 'polish', topic: 'pronouns',
    prompt: 'Який займенник означає «вона»?',
    options: ['on', 'ona', 'ono', 'oni'],
    correctIndex: 1,
    explanation: '«Ona» — вона. «On» — він, «ono» — воно, «oni» — вони (чол./зміш.).',
  },
  {
    id: 'pl-5', subject: 'polish', topic: 'verbs',
    prompt: 'Минулий час від «być» для «ja»: «Ja ___ w domu.»',
    options: ['jestem', 'byłem', 'będę', 'być'],
    correctIndex: 1,
    explanation: 'Минулий час (czas przeszły) дієслова «być» для чоловічого роду — «byłem». Теперішній — «jestem», майбутній — «będę».',
  },
  {
    id: 'pl-6', subject: 'polish', topic: 'cases',
    prompt: 'Виберіть правильну форму після прийменника «w» (у) для «szkoła»: «Uczę się w ___».',
    options: ['szkoła', 'szkołę', 'szkole', 'szkoły'],
    correctIndex: 2,
    explanation: 'Прийменник «w» зі значенням місцезнаходження вимагає Miejscownik (місцевий відмінок): «w szkole» (у школі).',
  },
  {
    id: 'pl-7', subject: 'polish', topic: 'vocab',
    prompt: 'Як перекладається «dzień dobry»?',
    options: ['На добраніч', 'Добрий день', 'До побачення', 'Вибач'],
    correctIndex: 1,
    explanation: '«Dzień dobry» — добрий день, привітання вдень. На добраніч — dobranoc, до побачення — do widzenia.',
  },
  {
    id: 'pl-8', subject: 'polish', topic: 'pronouns',
    prompt: 'Який присвійний займенник для «мій брат»?',
    options: ['mój', 'moja', 'moje', 'twoje'],
    correctIndex: 0,
    explanation: '«Brat» — чоловічого роду, тож присвійний займенник «mój» (мій). «Moja» — для жіночого, «moje» — для середнього.',
  },

  // ───────────── History of Ukraine ─────────────
  {
    id: 'hist-1', subject: 'history', topic: 'kyivan',
    prompt: 'Хто був першим відомим правителем Київської Русі з династії Рюриковичів?',
    options: ['Олег', 'Ігор', 'Святослав', 'Рюрик'],
    correctIndex: 0,
    explanation: 'Князь Олег об’єднав Новгород і Київ у 882 році і став першим правителем єдиної Київської Русі з Рюриковичів. Рюрик був його попередником у Новгороді.',
  },
  {
    id: 'hist-2', subject: 'history', topic: 'kyivan',
    prompt: 'У якому році відбулося хрещення Київської Русі за князя Володимира?',
    options: ['862', '988', '1054', '1240'],
    correctIndex: 1,
    explanation: '988 року князь Володимир Великий прийняв християнство та хрестив Київську Русь. Це пов’язало державу з візантійською культурою.',
  },
  {
    id: 'hist-3', subject: 'history', topic: 'kyivan',
    prompt: '«Повість временних років» — це...',
    options: [
      'договір з Візантією',
      'перший літописний звід Київської Русі',
      'військовий статут',
      'церковний устав',
    ],
    correctIndex: 1,
    explanation: '«Повість временних років» — найдавніший літописний звід, укладений близько 1113 року ченцем Нестором. У ньому розповідається історія Русі від біблійних часів.',
  },
  {
    id: 'hist-4', subject: 'history', topic: 'kyivan',
    prompt: 'Що сталося 1240 року в історії України?',
    options: [
      'Хрещення Русі',
      'Битва на Калці',
      'Захоплення Києва монголами',
      'Люблінська унія',
    ],
    correctIndex: 2,
    explanation: '1240 року війська хана Батия захопили та зруйнували Київ. Це поклало кінець Київській Русі та початок монгольського панування.',
  },
  {
    id: 'hist-5', subject: 'history', topic: 'cossacks',
    prompt: 'Хто заснував Запорізьку Січ?',
    options: ['Богдан Хмельницький', 'Дмитро Вишневецький', 'Петро Сагайдачний', 'Іван Мазепа'],
    correctIndex: 1,
    explanation: 'Дмитро Вишневецький 1550-х років побудував фортецю на о. Мала Хортиця — прообраз Запорізької Січі. Вона стала центром козацтва.',
  },
  {
    id: 'hist-6', subject: 'history', topic: 'cossacks',
    prompt: 'У якому році почалася Національно-визвольна війна під проводом Б. Хмельницького?',
    options: ['1648', '1654', '1709', '1596'],
    correctIndex: 0,
    explanation: '1648 року почалася Національно-визвольна війна українського народу проти Речі Посполитої під проводом Богдана Хмельницького.',
  },
  {
    id: 'hist-7', subject: 'history', topic: 'cossacks',
    prompt: 'Що передбачала Переяславська рада 1654 року?',
    options: [
      'Утворення Гетьманщини',
      'Військовий союз із Польщею',
      'Перехід під протекцію Московського царства',
      'Ліквідацію Січі',
    ],
    correctIndex: 2,
    explanation: '1654 року на Переяславській раді козацтво присягнуло на вірність московському цареві. Це призвело до тривалого контролю Росії над Гетьманщиною.',
  },
  {
    id: 'hist-8', subject: 'history', topic: '20century',
    prompt: 'Яка держава проголосила незалежність 22 січня 1918 року?',
    options: [
      'УНР (Українська Народна Республіка)',
      'ЗУНР',
      'Радянська Україна',
      'Київська Русь',
    ],
    correctIndex: 0,
    explanation: '22 січня 1918 року IV Універсалом Центральної Ради УНР проголосила повну незалежність України. Того ж дня ЗУНР і УНР об’єдналися (Акт Злуки).',
  },
  {
    id: 'hist-9', subject: 'history', topic: '20century',
    prompt: 'Що таке Голодомор 1932–1933 років?',
    options: [
      'Епідемія',
      'Штучний масовий голод, організований радянською владою',
      'Війна',
      'Економічна криза',
    ],
    correctIndex: 1,
    explanation: 'Голодомор — штучно створений сталінським режимом масовий голод, який забрав життя мільйонів українців. 2006 року його визнали геноцидом українського народу.',
  },
  {
    id: 'hist-10', subject: 'history', topic: 'independence',
    prompt: 'У якому році Україна проголосила незалежність від СРСР?',
    options: ['1989', '1990', '1991', '1992'],
    correctIndex: 2,
    explanation: '24 серпня 1991 року Верховна Рада УРСР прийняла Акт проголошення незалежності. 1 грудня того ж року його підтвердили всеукраїнським референдумом.',
  },
  {
    id: 'hist-11', subject: 'history', topic: 'independence',
    prompt: 'Хто був першим Президентом незалежної України?',
    options: ['Леонід Кравчук', 'Леонід Кучма', 'Віктор Ющенко', 'Леонід Брежнєв'],
    correctIndex: 0,
    explanation: 'Леонід Кравчук став першим Президентом незалежної України, обраним 1 грудня 1991 року на всеукраїнських виборах.',
  },
  {
    id: 'hist-12', subject: 'history', topic: 'cossacks',
    prompt: 'Що сталося 1709 року під Полтавою?',
    options: [
      'Заснування Січі',
      'Поразка шведів і Мазепи у битві з Росією',
      'Люблінська унія',
      'Переяславська рада',
    ],
    correctIndex: 1,
    explanation: '1709 року в Полтавській битві війська Карла XII та гетьмана Мазепи зазнали поразки від російської армії Петра I. Шведи втратили вплив у регіоні.',
  },

  // ───────────── Mathematics ─────────────
  {
    id: 'math-1', subject: 'math', topic: 'algebra',
    prompt: 'Чому дорівнює 7² − 3²?',
    options: ['40', '46', '16', '20'],
    correctIndex: 0,
    explanation: '49 − 9 = 40. Можна швидше: різниця квадратів a²−b² = (a−b)(a+b) = (7−3)(7+3) = 4×10 = 40.',
  },
  {
    id: 'math-2', subject: 'math', topic: 'equations',
    prompt: 'Знайди корінь рівняння: 2x + 6 = 14',
    options: ['x = 4', 'x = 3', 'x = 8', 'x = 2'],
    correctIndex: 0,
    explanation: '2x = 14 − 6 = 8, тож x = 4. Підставимо назад: 2·4 + 6 = 14 ✓.',
  },
  {
    id: 'math-3', subject: 'math', topic: 'fractions',
    prompt: 'Скільки буде 25% від 80?',
    options: ['15', '20', '25', '30'],
    correctIndex: 1,
    explanation: '25% = 1/4. 80 ÷ 4 = 20. Також: 0,25 × 80 = 20.',
  },
  {
    id: 'math-4', subject: 'math', topic: 'fractions',
    prompt: 'Обчисли: 1/2 + 1/3',
    options: ['2/5', '5/6', '1/6', '2/3'],
    correctIndex: 1,
    explanation: 'Зведемо до спільного знаменника 6: 3/6 + 2/6 = 5/6. Спільний знаменник 2 і 3 — це 6.',
  },
  {
    id: 'math-5', subject: 'math', topic: 'geometry',
    prompt: 'Чому дорівнює площа прямокутника зі сторонами 6 см і 8 см?',
    options: ['48 см²', '28 см²', '14 см²', '24 см²'],
    correctIndex: 0,
    explanation: 'Площа прямокутника S = a × b = 6 × 8 = 48 см². Не плутай із периметром (2·(6+8)=28 см).',
  },
  {
    id: 'math-6', subject: 'math', topic: 'geometry',
    prompt: 'Сума кутів трикутника дорівнює...',
    options: ['90°', '180°', '270°', '360°'],
    correctIndex: 1,
    explanation: 'Сума внутрішніх кутів будь-якого трикутника — 180°. Три кути, що разом дають розгорнутий.',
  },
  {
    id: 'math-7', subject: 'math', topic: 'algebra',
    prompt: 'Розкрий дужки: (x + 2)(x − 3)',
    options: [
      'x² − x − 6',
      'x² − 6',
      'x² + x − 6',
      'x² + 5x − 6',
    ],
    correctIndex: 0,
    explanation: '(x+2)(x−3) = x² −3x + 2x −6 = x² − x − 6. Кожен множник першої дужки множимо на кожен другої.',
  },
  {
    id: 'math-8', subject: 'math', topic: 'equations',
    prompt: 'Які корені рівняння x² − 5x + 6 = 0?',
    options: ['x = 2; x = 3', 'x = 1; x = 6', 'x = −2; x = −3', 'x = 5; x = 1'],
    correctIndex: 0,
    explanation: 'За теоремою Вієта: добуток 6 і сума 5 дають корені x=2 і x=3. Перевірка: 2·3=6, 2+3=5 ✓.',
  },
  {
    id: 'math-9', subject: 'math', topic: 'geometry',
    prompt: 'Площа круга з радіусом 2 см (π ≈ 3,14) дорівнює...',
    options: ['6,28 см²', '12,56 см²', '4 см²', '8 см²'],
    correctIndex: 1,
    explanation: 'S = πr² = 3,14 × 2² = 3,14 × 4 = 12,56 см². Радіус у квадрат, помножити на π.',
  },
  {
    id: 'math-10', subject: 'math', topic: 'fractions',
    prompt: 'Зведи 3/4 до сотих у відсотках.',
    options: ['60%', '75%', '50%', '80%'],
    correctIndex: 1,
    explanation: '3/4 = 0,75 = 75%. Достатньо знати: 1/4 = 25%, тож 3/4 = 75%.',
  },
  {
    id: 'math-11', subject: 'math', topic: 'algebra',
    prompt: 'Чому дорівнює (-3)²?',
    options: ['-6', '6', '-9', '9'],
    correctIndex: 3,
    explanation: '(-3)² = (-3)·(-3) = 9. Квадрат будь-якого числа (навіть від’ємного) невід’ємний. Не плутай із -3² = -(3²) = -9.',
  },
  {
    id: 'math-12', subject: 'math', topic: 'equations',
    prompt: 'Розв’яжи систему: x + y = 10, x − y = 4',
    options: ['x=7, y=3', 'x=5, y=5', 'x=6, y=4', 'x=8, y=2'],
    correctIndex: 0,
    explanation: 'Додамо рівняння: 2x=14 → x=7. Тоді y=10−7=3. Перевірка: 7−3=4 ✓. Метод додавання — найшвидший тут.',
  },

  // ─── True / False ─────────────────────────────────────────────
  {
    id: 'uk-1', subject: 'ukrainian', topic: 'orthography',
    prompt: 'Укажіть правильне написання:',
    options: ['пів-року', 'півроку', 'пів року', 'пів-рока'],
    correctIndex: 1,
    explanation: 'Слово «півроку» пишемо разом: півроку (half a year), бо це іменник із прийменниковим значенням «половина».',
  },
  {
    id: 'uk-2', subject: 'ukrainian', topic: 'morphology',
    prompt: 'Визначте частину мови слова «швидко» у реченні «Він швидко біжить».',
    options: ['прикметник', 'прислівник', 'іменник', 'дієслово'],
    correctIndex: 1,
    explanation: '«Швидко» відповідає на питання «як?» і означає ознаку дії, тож це прислівник.',
  },
  {
    id: 'uk-3', subject: 'ukrainian', topic: 'syntax',
    prompt: 'Яке з речень є складнопідрядним?',
    options: [
      'Сонце сходить, і починається день.',
      'Я знаю, що ти прийдеш.',
      'Вітер стихав, дощ припинився.',
      'Ліс зелений і тихий.',
    ],
    correctIndex: 1,
    explanation: 'У реченні «Я знаю, що ти прийдеш» є головна і підрядна частина, з’єднані сполучником «що», тож це складнопідрядне.',
  },
  {
    id: 'bio-1', subject: 'biology', topic: 'cell',
    prompt: 'Яка органела відповідає за синтез білка?',
    options: ['Мітохондрія', 'Рибосома', 'Лізосома', 'Вакуоля'],
    correctIndex: 1,
    explanation: 'Рибосоми — місце синтезу білка. Мітохондрії дають енергію, лізосоми розщеплюють речовини.',
  },
  {
    id: 'bio-2', subject: 'biology', topic: 'human',
    prompt: 'Який орган виробляє інсулін?',
    options: ['Печінка', 'Нирки', 'Підшлункова залоза', 'Селезінка'],
    correctIndex: 2,
    explanation: 'Інсулін виробляють β-клітини підшлункової залози. Він регулює рівень цукру в крові.',
  },
  {
    id: 'bio-3', subject: 'biology', topic: 'genetics',
    prompt: 'Скільки хромосом у соматичній клітині людини?',
    options: ['23', '46', '48', '92'],
    correctIndex: 1,
    explanation: 'У соматичній клітині людини 46 хромосом (23 пари). У статевих клітинах їх уполовину менше: 23.',
  },
  {
    id: 'chem-1', subject: 'chemistry', topic: 'periodic',
    prompt: 'Який хімічний символ має Натрій?',
    options: ['N', 'Na', 'Ni', 'No'],
    correctIndex: 1,
    explanation: 'Натрій позначається Na (від лат. natrium). N — азот, Ni — нікель, No — нобелій.',
  },
  {
    id: 'chem-2', subject: 'chemistry', topic: 'reactions',
    prompt: 'Продуктом горіння водню в кисні є:',
    options: ['O₂', 'H₂O', 'CO₂', 'NH₃'],
    correctIndex: 1,
    explanation: '2H₂ + O₂ → 2H₂O. Водень у кисні утворює воду.',
  },
  {
    id: 'chem-3', subject: 'chemistry', topic: 'solutions',
    prompt: 'Який pH нейтрального водного розчину при 25 °C?',
    options: ['0', '7', '14', '1'],
    correctIndex: 1,
    explanation: 'pH = 7 означає нейтральне середовище. Менше 7 — кисле, більше 7 — лужне.',
  },
  {
    id: 'chem-4', subject: 'chemistry', topic: 'organic',
    prompt: 'Найпростіший вуглеводень — це:',
    options: ['Етан', 'Метан', 'Пропан', 'Бутан'],
    correctIndex: 1,
    explanation: 'Метан CH₄ — найпростіший алкан з одного атома карбону та чотирьох атомів гідрогену.',
  },
  {
    id: 'geo-1', subject: 'geography', topic: 'ukraine',
    prompt: 'Яка річка є найдовшою в Україні?',
    options: ['Дністер', 'Дніпро', 'Південний Буг', 'Десна'],
    correctIndex: 1,
    explanation: 'Дніпро — найбільша річка України. Значна частина його русла проходить територією нашої держави.',
  },
  {
    id: 'geo-2', subject: 'geography', topic: 'world',
    prompt: 'Яка країна світу є найбільшою за площею?',
    options: ['Канада', 'Китай', 'США', 'Росія'],
    correctIndex: 3,
    explanation: 'Росія — найбільша країна за площею (понад 17 млн км²). Канада друга, Китай і США далі.',
  },
  {
    id: 'geo-3', subject: 'geography', topic: 'climate',
    prompt: 'Який тип клімату переважає в Україні?',
    options: ['Тропічний', 'Помірний континентальний', 'Полярний', 'Екваторіальний'],
    correctIndex: 1,
    explanation: 'В Україні переважає помірний континентальний клімат з теплим літом і помірно холодною зимою.',
  },

  // ─── True / False ─────────────────────────────────────────────
  {
    id: 'en-tf-1', subject: 'english', topic: 'grammar', kind: 'trueFalse',
    prompt: 'Твердження: «She don\'t like coffee» — граматично правильне речення.',
    options: ['Так', 'Ні'],
    correctIndex: 1,
    explanation: 'Неправильно. Для she/he/it у Present Simple — «doesn\'t», а не «don\'t». Правильно: «She doesn\'t like coffee».',
  },
  {
    id: 'en-tf-2', subject: 'english', topic: 'tenses', kind: 'trueFalse',
    prompt: 'Твердження: «I have been waiting for two hours» — речення у Present Perfect Continuous.',
    options: ['Так', 'Ні'],
    correctIndex: 0,
    explanation: 'Так! Have + been + V-ing — це Present Perfect Continuous. Підкреслює тривалу незавершену дію.',
  },
  {
    id: 'de-tf-1', subject: 'german', topic: 'artikel', kind: 'trueFalse',
    prompt: 'Твердження: «das Mädchen» (дівчинка) — середнього роду.',
    options: ['Так', 'Ні'],
    correctIndex: 0,
    explanation: 'Так! «Das Mädchen» — середнього роду через суфікс «-chen», що завжди дає середній рід.',
  },
  {
    id: 'hist-tf-1', subject: 'history', topic: 'independence', kind: 'trueFalse',
    prompt: 'Твердження: Україна проголосила незалежність 24 серпня 1990 року.',
    options: ['Так', 'Ні'],
    correctIndex: 1,
    explanation: 'Ні. Акт незалежності прийнято 24 серпня 1991 року. У 1990 прийнята лише Декларація про суверенітет.',
  },
  {
    id: 'hist-tf-2', subject: 'history', topic: 'kyivan', kind: 'trueFalse',
    prompt: 'Твердження: Ярослав Мудрий видав перший зведений закон Київської Русі «Руська Правда».',
    options: ['Так', 'Ні'],
    correctIndex: 0,
    explanation: 'Так. «Руська Правда» — перший писаний кодекс законів Русі, укладений за Ярослава Мудрого (XI ст.).',
  },
  {
    id: 'math-tf-1', subject: 'math', topic: 'geometry', kind: 'trueFalse',
    prompt: 'Твердження: гіпотенуза — це завжди найдовша сторона прямокутного трикутника.',
    options: ['Так', 'Ні'],
    correctIndex: 0,
    explanation: 'Так! Гіпотенуза лежить навпроти прямого кута і за теоремою Піфагора завжди найдовша: c² = a² + b².',
  },
  {
    id: 'math-tf-2', subject: 'math', topic: 'algebra', kind: 'trueFalse',
    prompt: 'Твердження: квадратне рівняння може мати три корені.',
    options: ['Так', 'Ні'],
    correctIndex: 1,
    explanation: 'Ні. Квадратне рівняння (ступінь 2) має максимум 2 корені.',
  },
  {
    id: 'pl-tf-1', subject: 'polish', topic: 'verbs', kind: 'trueFalse',
    prompt: 'Твердження: дієслово «być» у польській відповідає українському «бути».',
    options: ['Так', 'Ні'],
    correctIndex: 0,
    explanation: 'Так. «Być» — польське «бути». Форми: jestem, jesteś, jest, jesteśmy, jesteście, są.',
  },

  // ─── Fill in the blank ────────────────────────────────────────
  {
    id: 'en-fill-1', subject: 'english', topic: 'tenses', kind: 'fillBlank',
    prompt: 'Вибери правильне слово: «If I ___ rich, I would travel the world.»',
    options: ['am', 'were', 'will be', 'have been'],
    correctIndex: 1,
    explanation: 'Умовний спосіб II типу (нереальна умова): «If + were» (Past Subjunctive). Правильно: «If I were rich…»',
  },
  {
    id: 'en-fill-2', subject: 'english', topic: 'prepositions', kind: 'fillBlank',
    prompt: 'Заповни пропуск: «The meeting is scheduled ___ 3 PM on Monday.»',
    options: ['in', 'on', 'at', 'by'],
    correctIndex: 2,
    explanation: 'З конкретним часом («о 3 годині») — «at»: at 3 PM. «On» — для днів, «in» — для місяців/років.',
  },
  {
    id: 'de-fill-1', subject: 'german', topic: 'cases', kind: 'fillBlank',
    prompt: 'Заповни пропуск: «Ich fahre mit ___ Bus.» (der Bus)',
    options: ['der', 'dem', 'den', 'des'],
    correctIndex: 1,
    explanation: 'Прийменник «mit» вимагає Dativ. Для чоловічого роду в Dativ: der → dem.',
  },
  {
    id: 'de-fill-2', subject: 'german', topic: 'verbs', kind: 'fillBlank',
    prompt: 'Виберіть правильне слово: «Er ___ gestern ins Kino gegangen.»',
    options: ['hat', 'ist', 'war', 'wird'],
    correctIndex: 1,
    explanation: 'Дієслова руху у Perfekt утворюються з «sein» (ist). «Gehen» — дієслово руху: Er ist gegangen.',
  },
  {
    id: 'hist-fill-1', subject: 'history', topic: 'cossacks', kind: 'fillBlank',
    prompt: 'Богдан Хмельницький підписав Зборівський мирний договір з ___ у 1649 році.',
    options: ['Росією', 'Туреччиною', 'Польщею', 'Швецією'],
    correctIndex: 2,
    explanation: 'Зборівський договір 1649 — угода між Гетьманщиною і Польщею (Річчю Посполитою).',
  },
  {
    id: 'math-fill-1', subject: 'math', topic: 'algebra', kind: 'fillBlank',
    prompt: 'Дискримінант квадратного рівняння: D = ___.',
    options: ['b² − 4ac', 'b² + 4ac', '4ac − b²', '−b / 2a'],
    correctIndex: 0,
    explanation: 'D = b² − 4ac. D > 0 — два корені, D = 0 — один, D < 0 — немає дійсних коренів.',
  },
  {
    id: 'math-fill-2', subject: 'math', topic: 'geometry', kind: 'fillBlank',
    prompt: 'Периметр квадрата зі стороною 5 = ___.',
    options: ['20', '25', '10', '15'],
    correctIndex: 0,
    explanation: 'P = 4·a = 4·5 = 20. Площа S = a² = 25 — не плутай!',
  },
  {
    id: 'pl-fill-1', subject: 'polish', topic: 'cases', kind: 'fillBlank',
    prompt: 'Заповни: «Idę do ___ » (szkoła — до школи).',
    options: ['szkoły', 'szkoła', 'szkołę', 'szkole'],
    correctIndex: 0,
    explanation: 'Після «do» (до) стоїть Dopełniacz: szkoła → szkoły.',
  },
];

/**
 * Pick N random questions, optionally filtered by subject and topic.
 * Guarantees at least N questions (cycling if pool is smaller).
 */
export function pickMockQuestions(
  subject: string,
  topicId: string | undefined,
  count: number,
): Question[] {
  const pool = MOCK_QUESTIONS.filter(
    (q) => q.subject === subject && (!topicId || q.topic === topicId),
  );
  const source = pool.length > 0 ? pool : MOCK_QUESTIONS.filter((q) => q.subject === subject);
  const base = source.length > 0 ? source : MOCK_QUESTIONS;

  const shuffled = [...base].sort(() => Math.random() - 0.5);
  const result: Question[] = [];
  let i = 0;
  while (result.length < count) {
    const q = shuffled[i % shuffled.length];
    if (!result.some((r) => r.id === q.id)) result.push(q);
    i++;
    if (i > count * 4) break; // safety valve
  }
  return result.slice(0, count);
}
