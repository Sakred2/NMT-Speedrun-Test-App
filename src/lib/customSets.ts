import type { Question, SubjectId } from '../types';

export interface CustomSet {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: number;
  questions: Question[];
}

const KEY = 'nmt-custom-sets';

export const PRESET_PROJECT_LIBRARY: CustomSet[] = [
  {
    id: 'preset-eco-school-garden',
    title: 'Шкільний сад без сміття',
    description: 'Екологічний проєкт про чисте середовище, сортування відходів і турботу про природу.',
    author: 'Шкільна бібліотека',
    createdAt: Date.now() - 1000,
    questions: [
      {
        id: 'preset-eco-1',
        subject: 'ecology',
        topic: 'conservation',
        kind: 'choice',
        prompt: 'Що найефективніше зменшує обсяг сміття в школі?',
        options: ['Сортування відходів і повторне використання', 'Кидання паперу в один контейнер', 'Спалювання всього в шкільному дворі', 'Відкривання вікон під час уроку'],
        correctIndex: 0,
        explanation: 'Сортування й повторне використання скорочують обсяг відходів і зменшують забруднення довкілля.',
      },
      {
        id: 'preset-eco-2',
        subject: 'ecology',
        topic: 'pollution',
        kind: 'choice',
        prompt: 'Який із прикладів є забрудненням довкілля?',
        options: ['Викидання пластику в річку', 'Поливання квітів', 'Пересадка рослин', 'Збір листя в компост'],
        correctIndex: 0,
        explanation: 'Пластик і інші відходи в річці шкодять водним організмам і здоров’ю людей.',
      },
      {
        id: 'preset-eco-3',
        subject: 'ecology',
        topic: 'ecosystems',
        kind: 'trueFalse',
        prompt: 'Сад і город є прикладом живої екосистеми.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'У саду взаємодіють рослини, ґрунт, вода, комахи й людина — це жива екосистема.',
      },
    ],
  },
  {
    id: 'preset-math-city-planning',
    title: 'Математика в плануванні міста',
    description: 'Проєкт про розрахунки, ділянки, периметр, площу та використання чисел у житті.',
    author: 'Педагог з математики',
    createdAt: Date.now() - 2000,
    questions: [
      {
        id: 'preset-math-1',
        subject: 'math',
        topic: 'geometry',
        kind: 'calculation',
        prompt: 'Площа прямокутної ділянки 8 м × 5 м дорівнює:',
        options: ['13 м²', '40 м²', '26 м²', '45 м²'],
        correctIndex: 1,
        explanation: 'Площа прямокутника дорівнює добутку довжини на ширину: 8 × 5 = 40 м².',
      },
      {
        id: 'preset-math-2',
        subject: 'math',
        topic: 'fractions',
        kind: 'choice',
        prompt: 'Яка частина години становить 15 хвилин?',
        options: ['1/2', '1/3', '1/4', '1/5'],
        correctIndex: 2,
        explanation: '15 хвилин — це чверть години, тому 1/4.',
      },
      {
        id: 'preset-math-3',
        subject: 'math',
        topic: 'equations',
        kind: 'fillBlank',
        prompt: 'Розв’яжи рівняння: 3x = 12. x = ___.',
        options: ['2', '3', '4', '5'],
        correctIndex: 2,
        explanation: 'Поділимо обидві частини на 3: x = 12 / 3 = 4.',
      },
    ],
  },
  {
    id: 'preset-bio-health',
    title: 'Здорове харчування для школяра',
    description: 'Біологічний проєкт про користь їжі, вітамінів і правильного раціону.',
    author: 'Кружок біології',
    createdAt: Date.now() - 3000,
    questions: [
      {
        id: 'preset-bio-1',
        subject: 'biology',
        topic: 'human',
        kind: 'choice',
        prompt: 'Для чого потрібні вітаміни в організмі?',
        options: ['Для нормальної роботи органів і систем', 'Для зниження температури тіла', 'Для збільшення ваги', 'Для заміни води'],
        correctIndex: 0,
        explanation: 'Вітаміни потрібні для нормального обміну речовин і функціонування організму.',
      },
      {
        id: 'preset-bio-2',
        subject: 'biology',
        topic: 'ecology',
        kind: 'choice',
        prompt: 'Який продукт найкраще допомагає відновити сили після фізичного навантаження?',
        options: ['Фрукти й вода', 'Чиста глина', 'Пісок', 'Сіль без їжі'],
        correctIndex: 0,
        explanation: 'Фрукти й вода зволожують і дають організму необхідні речовини.',
      },
      {
        id: 'preset-bio-3',
        subject: 'biology',
        topic: 'cell',
        kind: 'trueFalse',
        prompt: 'Клітина — це найменша структурна одиниця живого.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'Клітина є основною одиницею будови та життєдіяльності живих організмів.',
      },
    ],
  },
  {
    id: 'preset-geo-ukraine',
    title: 'Моя Україна: рідний край',
    description: 'Географічний проєкт про природні особливості, регіони та клімат України.',
    author: 'Географічний гурток',
    createdAt: Date.now() - 4000,
    questions: [
      {
        id: 'preset-geo-1',
        subject: 'geography',
        topic: 'ukraine',
        kind: 'choice',
        prompt: 'Яка річка є найдовшою в Україні?',
        options: ['Дніпро', 'Десна', 'Південний Буг', 'Тиса'],
        correctIndex: 0,
        explanation: 'Дніпро — найбільша річка України за довжиною та водністю.',
      },
      {
        id: 'preset-geo-2',
        subject: 'geography',
        topic: 'climate',
        kind: 'choice',
        prompt: 'Що впливає на клімат регіону?',
        options: ['Широта, висота, моря та вітри', 'Лише колір неба', 'Тільки кількість будинків', 'Тільки час доби'],
        correctIndex: 0,
        explanation: 'Клімат формують географічне положення, висота, віддаленість від моря та атмосферні потоки.',
      },
      {
        id: 'preset-geo-3',
        subject: 'geography',
        topic: 'world',
        kind: 'matching',
        prompt: 'Який материк позначає найбільше простір?',
        options: ['Євразія', 'Африка', 'Північна Америка', 'Австралія'],
        correctIndex: 0,
        explanation: 'Євразія — найбільший материк на Землі.',
      },
    ],
  },
  {
    id: 'preset-history-heritage',
    title: 'Спадщина моєї родини',
    description: 'Історичний проєкт про сімейні традиції, історію родоводу та культурну пам’ять.',
    author: 'Історичний клуб',
    createdAt: Date.now() - 5000,
    questions: [
      {
        id: 'preset-history-1',
        subject: 'history',
        topic: 'kyivan',
        kind: 'choice',
        prompt: 'Що було центром Київської Русі?',
        options: ['Київ', 'Львів', 'Харків', 'Одеса'],
        correctIndex: 0,
        explanation: 'Київ став головним центром держави Русі у давньоруський період.',
      },
      {
        id: 'preset-history-2',
        subject: 'history',
        topic: 'independence',
        kind: 'choice',
        prompt: 'Коли Україна здобула незалежність?',
        options: ['1991', '1918', '2004', '1989'],
        correctIndex: 0,
        explanation: 'Україна відновила незалежність у 1991 році.',
      },
      {
        id: 'preset-history-3',
        subject: 'history',
        topic: '20century',
        kind: 'trueFalse',
        prompt: 'Події Другої світової війни вплинули на сучасну історію Європи.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'Результати війни вплинули на політичну карту світу та міжнародну історію.',
      },
    ],
  },
  {
    id: 'preset-tech-smart-class',
    title: 'Розумний кабінет',
    description: 'Проєкт про цифрові освітні технології, автоматизацію та безпечне використання гаджетів.',
    author: 'Технічний гурток',
    createdAt: Date.now() - 6000,
    questions: [
      {
        id: 'preset-tech-1',
        subject: 'robotics',
        topic: 'automation',
        kind: 'choice',
        prompt: 'Що означає автоматизація?',
        options: ['Заміна повторюваних дій машиною або програмою', 'Перекриття електрики', 'Просто горщик для інструментів', 'Покращення шрифту'],
        correctIndex: 0,
        explanation: 'Автоматизація дозволяє виконувати повторювані дії без безпосереднього втручання людини.',
      },
      {
        id: 'preset-tech-2',
        subject: 'programming',
        topic: 'algorithms',
        kind: 'choice',
        prompt: 'Що таке алгоритм?',
        options: ['Послідовність кроків для досягнення результату', 'Назва комп’ютера', 'Футболка в школі', 'Мовний звукомір'],
        correctIndex: 0,
        explanation: 'Алгоритм — це чітка послідовність дій, за якою виконується задача.',
      },
      {
        id: 'preset-tech-3',
        subject: 'engineering',
        topic: 'systems',
        kind: 'choice',
        prompt: 'Навіщо важливо перевіряти інженерні рішення?',
        options: ['Щоб знайти ризики та покращити систему', 'Бо це не потрібно', 'Бо всякий план має бути ідеальним з першого разу', 'Бо інженерія не потребує тестування'],
        correctIndex: 0,
        explanation: 'Тестування показує, чи безпечна і ефективна система до запуску в реальну експлуатацію.',
      },
    ],
  },
  {
    id: 'preset-language-creative',
    title: 'Книжковий клуб і мій стиль',
    description: 'Літературно-мовний проєкт про героїв, стилі, теми й розвиток мови.',
    author: 'Українська мова',
    createdAt: Date.now() - 7000,
    questions: [
      {
        id: 'preset-lang-1',
        subject: 'ukrainian',
        topic: 'stylistics',
        kind: 'choice',
        prompt: 'Що допомагає зробити текст більш образним?',
        options: ['Порівняння і епітети', 'Тільки цифри', 'Рецепт страви', 'Одна велика фраза без розділення'],
        correctIndex: 0,
        explanation: 'Епітети, порівняння й образні вислови роблять мову більш живою й виразною.',
      },
      {
        id: 'preset-lang-2',
        subject: 'english',
        topic: 'vocab',
        kind: 'choice',
        prompt: 'What is the meaning of “creative”?',
        options: ['Talented in creating new ideas', 'Very fast', 'Made of stone', 'Only for reading books'],
        correctIndex: 0,
        explanation: 'Creative means able to invent or produce new ideas and imaginative work.',
      },
      {
        id: 'preset-lang-3',
        subject: 'polish',
        topic: 'vocab',
        kind: 'choice',
        prompt: 'Jak po polsku powiedzieć “книга”?',
        options: ['książka', 'dom', 'rzeka', 'szkoła'],
        correctIndex: 0,
        explanation: 'Książka — це “книга” польською мовою.',
      },
    ],
  },
  {
    id: 'preset-physics-motion',
    title: 'Фізика у повсякденні',
    description: 'Проєкт про рух, силу, енергію та фізичні явища навколо нас.',
    author: 'Фізичний кабінет',
    createdAt: Date.now() - 8000,
    questions: [
      {
        id: 'preset-physics-1',
        subject: 'physics',
        topic: 'motion',
        kind: 'choice',
        prompt: 'Що відбувається з тілом, якщо на нього не діють сили?',
        options: ['Зберігає стан спокою або рівномірного руху', 'Обов’язково зупиняється', 'Моментально летить у космос', 'Починає гаріти'],
        correctIndex: 0,
        explanation: 'За першим законом Ньютона тіло зберігає свій стан, якщо результуюча сила дорівнює нулю.',
      },
      {
        id: 'preset-physics-2',
        subject: 'physics',
        topic: 'energy',
        kind: 'choice',
        prompt: 'Яка енергія є в рухомому тілі?',
        options: ['Кінетична', 'Технічна', 'Етнічна', 'Німа'],
        correctIndex: 0,
        explanation: 'Кінетична енергія виникає внаслідок руху тіла.',
      },
      {
        id: 'preset-physics-3',
        subject: 'physics',
        topic: 'waves',
        kind: 'choice',
        prompt: 'Що поширюється у вигляді звукової хвилі?',
        options: ['Звук', 'Папір', 'Стіна', 'Кисень у склянці'],
        correctIndex: 0,
        explanation: 'Звук є механічною хвилею, яка поширюється в середовищі.',
      },
    ],
  },
  {
    id: 'preset-art-poster',
    title: 'Плакат про мій клас',
    description: 'Художньо-графічний проєкт з композиції, кольору та символів.',
    author: 'Мистецький факультет',
    createdAt: Date.now() - 9000,
    questions: [
      {
        id: 'preset-art-1',
        subject: 'art',
        topic: 'composition',
        kind: 'choice',
        prompt: 'Що допомагає зробити плакат єдиним і цікавим для перегляду?',
        options: ['Композиція та контраст', 'Лише текст без зображення', 'Тільки один колір без форм', 'Відсутність відступів'],
        correctIndex: 0,
        explanation: 'Композиція, пропорції й контраст діють як “скелет” візуального твору.',
      },
      {
        id: 'preset-art-2',
        subject: 'art',
        topic: 'color',
        kind: 'choice',
        prompt: 'Який колір зазвичай асоціюється з теплом і енергією?',
        options: ['Червоний', 'Синій', 'Сірий', 'Чорний'],
        correctIndex: 0,
        explanation: 'Червоний символізує тепло, енергію та активність.',
      },
      {
        id: 'preset-art-3',
        subject: 'art',
        topic: 'symbols',
        kind: 'trueFalse',
        prompt: 'Символи можуть передавати ідеї без словесного пояснення.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'Символи часто несуть культурний або емоційний зміст без тексту.',
      },
    ],
  },
  {
    id: 'preset-society-citizen',
    title: 'Я — громадянин свого міста',
    description: 'Соціологічний і правовий проєкт про участь, права та відповідальність.',
    author: 'Громадянська освіта',
    createdAt: Date.now() - 10000,
    questions: [
      {
        id: 'preset-soc-1',
        subject: 'sociology',
        topic: 'society',
        kind: 'choice',
        prompt: 'Що означає бути активним громадянином?',
        options: ['Брати участь у житті суспільства та поважати права інших', 'Не виходити з дому', 'Брати іншу людину за приклад', 'Лише голосувати раз на рік'],
        correctIndex: 0,
        explanation: 'Громадянська активність передбачає як участь, так і відповідальність перед суспільством.',
      },
      {
        id: 'preset-soc-2',
        subject: 'philosophy',
        topic: 'ethics',
        kind: 'choice',
        prompt: 'Що таке мораль?',
        options: ['Система норм поведінки в суспільстві', 'Тільки правила уроку', 'Тільки наказ батьків', 'Лише мода'],
        correctIndex: 0,
        explanation: 'Мораль — це система цінностей і норм, які регулюють поведінку людей.',
      },
      {
        id: 'preset-soc-3',
        subject: 'logic',
        topic: 'logic',
        kind: 'choice',
        prompt: 'Яке висловлення є правильним аргументом?',
        options: ['Якщо всі учні вивчають, то клас працює краще', 'Всі учні — це вчителі', 'Лише вчитель думає', 'Число завжди рівне слову'],
        correctIndex: 0,
        explanation: 'Це висновок, що базується на логічному зв’язку між умовами та результатом.',
      },
    ],
  },
  {
    id: 'preset-finance-plan',
    title: 'Фінансовий план мого бюджету',
    description: 'Проєкт про заощадження, бюджет, потреби та фінансову грамотність.',
    author: 'Фінансова грамотність',
    createdAt: Date.now() - 11000,
    questions: [
      {
        id: 'preset-fin-1',
        subject: 'financial-literacy',
        topic: 'money',
        kind: 'choice',
        prompt: 'Що таке бюджет?',
        options: ['План витрат і доходів', 'Назва грошей', 'Назва магазину', 'Вид рахунку в школі'],
        correctIndex: 0,
        explanation: 'Бюджет показує, скільки грошей є і куди їх планують витратити.',
      },
      {
        id: 'preset-fin-2',
        subject: 'economics',
        topic: 'markets',
        kind: 'choice',
        prompt: 'Що відбувається, коли товарів багато, а покупців мало?',
        options: ['Ціна може знижуватися', 'Ціна завжди росте', 'Товар зникає назавжди', 'Ринок припиняє існування'],
        correctIndex: 0,
        explanation: 'На ринку ціна залежить від співвідношення попиту й пропозиції.',
      },
      {
        id: 'preset-fin-3',
        subject: 'economics',
        topic: 'supply-demand',
        kind: 'trueFalse',
        prompt: 'Збереження грошей — один з способів розумного фінансового планування.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'Заощадження допомагає створити резерв і планувати майбутні витрати.',
      },
    ],
  },
  {
    id: 'preset-media-creator',
    title: 'Медіа-студія класу',
    description: 'Проєкт про новини, джерела інформації, медіаграмотність і цифрову безпеку.',
    author: 'Медіа-лабораторія',
    createdAt: Date.now() - 12000,
    questions: [
      {
        id: 'preset-media-1',
        subject: 'media-literacy',
        topic: 'sources',
        kind: 'choice',
        prompt: 'Що означає перевірка джерела?',
        options: ['Оцінка правдивості, автора і цілей', 'Просто читання заголовка', 'Лише підписання коментаря', 'Копіювання тексту з інтернету'],
        correctIndex: 0,
        explanation: 'Перевірка джерела допомагає зрозуміти, чи інформація надійна й об’єктивна.',
      },
      {
        id: 'preset-media-2',
        subject: 'media-literacy',
        topic: 'digital-safety',
        kind: 'choice',
        prompt: 'Чому не варто розкривати особисті дані без потреби?',
        options: ['Бо це знижує ризик шахрайства та втрати приватності', 'Бо це не має значення', 'Бо це тільки для дорослих', 'Бо все таємне є хибним'],
        correctIndex: 0,
        explanation: 'Особисті дані можуть використовуватися у фішингу або вкрадені з метою шахрайства.',
      },
      {
        id: 'preset-media-3',
        subject: 'media-literacy',
        topic: 'bias',
        kind: 'trueFalse',
        prompt: 'Медіа можуть подавати новини з певною позицією або упередженням.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'Новини можуть бути суб’єктивно поданими залежно від автора, каналів і контексту.',
      },
    ],
  },
  {
    id: 'preset-cook-school-menu',
    title: 'Шкільне меню зі смаком',
    description: 'Кулінарний проєкт про користь їжі, безпеку та збалансоване харчування.',
    author: 'Кулінарна майстерня',
    createdAt: Date.now() - 13000,
    questions: [
      {
        id: 'preset-cook-1',
        subject: 'culinary',
        topic: 'nutrition',
        kind: 'choice',
        prompt: 'Чому важливо вживати різноманітну їжу?',
        options: ['Бо вона забезпечує організм потрібними речовинами', 'Бо одна їжа вміщує все', 'Бо різноманітність не потрібна', 'Бо кожен продукт однаковий'],
        correctIndex: 0,
        explanation: 'Різні продукти дають різні вітаміни, мінерали й поживні речовини.',
      },
      {
        id: 'preset-cook-2',
        subject: 'culinary',
        topic: 'hygiene',
        kind: 'choice',
        prompt: 'Що є основною причиною харчового отруєння?',
        options: ['Неправильне зберігання або обробка продуктів', 'Дуже довбане залізо', 'Надто довгі обідні перерви', 'Маленька тарілка'],
        correctIndex: 0,
        explanation: 'Бактерії й інфекції часто потрапляють у їжу через неправильну гігієну.',
      },
      {
        id: 'preset-cook-3',
        subject: 'culinary',
        topic: 'techniques',
        kind: 'choice',
        prompt: 'Що таке тушкування?',
        options: ['Приготування продуктів на повільному вогні в невеликій кількості рідини', 'Замороження страви', 'Швидке смаження на сильному вогні', 'Повне висушування продуктів'],
        correctIndex: 0,
        explanation: 'Тушкування дозволяє продуктам добре проваритися й зберегти смак.',
      },
    ],
  },
  {
    id: 'preset-arch-scouting',
    title: 'Археологічна експедиція у місті',
    description: 'Проєкт про історичні артефакти, розкопки й дослідження минулого.',
    author: 'Археологічний гурток',
    createdAt: Date.now() - 14000,
    questions: [
      {
        id: 'preset-arch-1',
        subject: 'archaeology',
        topic: 'artifacts',
        kind: 'choice',
        prompt: 'Що називають артефактом?',
        options: ['Предмет, створений або вжитий людиною в минулому', 'Лише древні монети', 'Тільки глиняний посуд', 'Будь-яка природа без людей'],
        correctIndex: 0,
        explanation: 'Артефакт — це предмет, який свідчить про життя людей у минулому.',
      },
      {
        id: 'preset-arch-2',
        subject: 'archaeology',
        topic: 'excavation',
        kind: 'choice',
        prompt: 'Чому під час розкопок важливо працювати обережно?',
        options: ['Щоб не пошкодити цінні знахідки', 'Бо це не має значення', 'Бо робота має бути швидкою', 'Бо одразу треба складати усе в одну купку'],
        correctIndex: 0,
        explanation: 'Обережність гарантує збереження об’єктів і точність дослідження.',
      },
      {
        id: 'preset-arch-3',
        subject: 'archaeology',
        topic: 'dating',
        kind: 'trueFalse',
        prompt: 'Археологи використовують різні методи датування для визначення віку знахідок.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'Датування допомагає встановити вік предметів і історичних шарів.',
      },
    ],
  },
  {
    id: 'preset-criminal-science',
    title: 'Школа детектива',
    description: 'Проєкт про криміналістику, сліди, доказові матеріали та логіку висновків.',
    author: 'Юридичний клуб',
    createdAt: Date.now() - 15000,
    questions: [
      {
        id: 'preset-crime-1',
        subject: 'criminalistics',
        topic: 'traces',
        kind: 'choice',
        prompt: 'Що може бути важливим слідом на місці події?',
        options: ['Відбитки пальців, волокна, сліди взуття', 'Лише кількість людей', 'Лише час на годиннику', 'Лише номер в журналі'],
        correctIndex: 0,
        explanation: 'Сліди і відбитки дають уявлення про подію та особу, пов’язану з нею.',
      },
      {
        id: 'preset-crime-2',
        subject: 'criminalistics',
        topic: 'evidence',
        kind: 'choice',
        prompt: 'Що називають доказом?',
        options: ['Факт або об’єкт, що підтверджує або спростовує версію', 'Кількість свідків без інформації', 'Будь-який предмет на столі', 'Тільки ознака погоди'],
        correctIndex: 0,
        explanation: 'Докази використовуються для перевірки висновків і побудови обґрунтованої версії.',
      },
      {
        id: 'preset-crime-3',
        subject: 'logic',
        topic: 'logic',
        kind: 'choice',
        prompt: 'Який висновок є логічнішим?',
        options: ['Якщо є слід, то можлива причина події', 'Якщо є єдине слово, то це факт', 'Якщо є пепел, то не було нікого', 'Якщо є стаття, то це доказ без перевірки'],
        correctIndex: 0,
        explanation: 'Логіка виводить можливий сценарій із наявних доказів, а не з випадкових припущень.',
      },
    ],
  },
  {
    id: 'preset-ocean-protect',
    title: 'Океан: ми відповідаємо',
    description: 'Проєкт про океанічні екосистеми, хвилі, течії та охорону морів.',
    author: 'Морський центр',
    createdAt: Date.now() - 16000,
    questions: [
      {
        id: 'preset-ocean-1',
        subject: 'oceanology',
        topic: 'marine-life',
        kind: 'choice',
        prompt: 'Чому океан важливий для життя на Землі?',
        options: ['Бо він регулює клімат і підтримує життя', 'Бо він не впливає на планету', 'Бо він тільки займає місце', 'Бо він не має біорізноманіття'],
        correctIndex: 0,
        explanation: 'Океан регулює клімат, забезпечує влагу та є домом для багатьох організмів.',
      },
      {
        id: 'preset-ocean-2',
        subject: 'meteorology',
        topic: 'weather',
        kind: 'choice',
        prompt: 'Що впливає на погоду над океаном?',
        options: ['Температура води, вітер і атмосфера', 'Лише вікно в класі', 'Лише кількість людей', 'Лише форма берега'],
        correctIndex: 0,
        explanation: 'Погода формується під впливом температури, вітру, вологості та атмосфери.',
      },
      {
        id: 'preset-ocean-3',
        subject: 'ecology',
        topic: 'biodiversity',
        kind: 'trueFalse',
        prompt: 'Різноманіття морського життя важливе для екосистеми океану.',
        options: ['Правда', 'Неправда'],
        correctIndex: 0,
        explanation: 'Різноманіття видів підтримує стабільність морських екосистем.',
      },
    ],
  },
  {
    id: 'preset-meteor-clouds',
    title: 'Погода в нашому місті',
    description: 'Метеорологічний проєкт про атмосферу, хмари, опади й прогнозування.',
    author: 'Хімія атмосфери',
    createdAt: Date.now() - 17000,
    questions: [
      {
        id: 'preset-meteo-1',
        subject: 'meteorology',
        topic: 'clouds',
        kind: 'choice',
        prompt: 'Які хмари найчастіше приносять дощ?',
        options: ['Купчасто-дощові', 'Останні скелі', 'Гірські піски', 'Радіоблоки'],
        correctIndex: 0,
        explanation: 'Купчасто-дощові хмари часто супроводжуються короткими, але сильними опадами.',
      },
      {
        id: 'preset-meteo-2',
        subject: 'meteorology',
        topic: 'forecasting',
        kind: 'choice',
        prompt: 'Що допомагає вченим прогнозувати погоду?',
        options: ['Метеостанції, супутники та дані про атмосферу', 'Лише одна думка вчителя', 'Тільки погляд у вікно', 'Лише спостереження за птахами'],
        correctIndex: 0,
        explanation: 'Оцінка метеорологічних даних дозволяє формувати точні прогнози.',
      },
      {
        id: 'preset-meteo-3',
        subject: 'geography',
        topic: 'climate',
        kind: 'choice',
        prompt: 'Що впливає на кількість опадів у регіоні?',
        options: ['Рельєф, вітри та відстань від моря', 'Розмір навчального року', 'Кількість вчителів', 'Глибина шкільної парти'],
        correctIndex: 0,
        explanation: 'Рельєф і циркуляція повітря впливають на атмосферні опади.',
      },
    ],
  },
  {
    id: 'preset-design-architecture',
    title: 'Дизайн і простір навколо нас',
    description: 'Проєкт про креслення, інженерну думку, виміри та зручність будівель.',
    author: 'Архітектурний кружок',
    createdAt: Date.now() - 18000,
    questions: [
      {
        id: 'preset-design-1',
        subject: 'drafting',
        topic: 'measurements',
        kind: 'choice',
        prompt: 'Чому важливо дотримуватися масштабів у кресленні?',
        options: ['Бо від цього залежить правильний розмір об’єкта', 'Бо це лише декоративна деталь', 'Бо всі креслення мають бути однаковими', 'Бо масштабу немає потреби'],
        correctIndex: 0,
        explanation: 'Масштаб дозволяє точно передати реальні розміри на папері.',
      },
      {
        id: 'preset-design-2',
        subject: 'engineering',
        topic: 'materials',
        kind: 'choice',
        prompt: 'Що треба враховувати при виборі матеріалів для споруди?',
        options: ['Міцність, вартість і умови експлуатації', 'Лише колір', 'Лише строкатість', 'Лише запах'],
        correctIndex: 0,
        explanation: 'Матеріали мають відповідати навантаженням, клімату та бюджету.',
      },
      {
        id: 'preset-design-3',
        subject: 'math',
        topic: 'geometry',
        kind: 'choice',
        prompt: 'Яку форму найчастіше має фундамент будівлі?',
        options: ['Прямокутну', 'Лише круглу', 'Лише трикутну', 'Лише хвилясту'],
        correctIndex: 0,
        explanation: 'Прямокутна форма проста, стабільна й зручно використовувана для будівництва.',
      },
    ],
  },
];

function safeParse(raw: string | null): CustomSet[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidSet);
  } catch {
    return [];
  }
}

function isValidSet(s: unknown): s is CustomSet {
  if (!s || typeof s !== 'object') return false;
  const o = s as Record<string, unknown>;
  if (typeof o.id !== 'string' || typeof o.title !== 'string') return false;
  if (!Array.isArray(o.questions) || o.questions.length === 0) return false;
  return o.questions.every(isValidQuestion);
}

function isValidQuestion(q: unknown): q is Question {
  if (!q || typeof q !== 'object') return false;
  const o = q as Record<string, unknown>;
  return (
    typeof o.id === 'string' &&
    typeof o.subject === 'string' &&
    typeof o.topic === 'string' &&
    typeof o.prompt === 'string' &&
    Array.isArray(o.options) &&
    o.options.length >= 2 &&
    o.options.every((x) => typeof x === 'string') &&
    typeof o.correctIndex === 'number' &&
    Number.isInteger(o.correctIndex) &&
    (o.correctIndex as number) >= 0 &&
    (o.correctIndex as number) < (o.options as string[]).length &&
    typeof o.explanation === 'string'
  );
}

export function loadCustomSets(): CustomSet[] {
  try {
    const stored = safeParse(localStorage.getItem(KEY));
    const merged = [...PRESET_PROJECT_LIBRARY, ...stored];
    const unique = new Map<string, CustomSet>();
    for (const set of merged) {
      const key = set.title.trim().toLowerCase();
      if (!unique.has(key)) unique.set(key, set);
    }
    return Array.from(unique.values());
  } catch {
    return PRESET_PROJECT_LIBRARY;
  }
}

export function saveCustomSets(sets: CustomSet[]): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(sets));
  } catch {
    // ignore
  }
}

export function createSet(partial: Omit<CustomSet, 'id' | 'createdAt'>): CustomSet {
  return {
    ...partial,
    id: `cs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: Date.now(),
  };
}

export function upsertSet(set: CustomSet): CustomSet[] {
  const sets = loadCustomSets();
  const idx = sets.findIndex((s) => s.id === set.id);
  if (idx >= 0) sets[idx] = set;
  else sets.unshift(set);
  saveCustomSets(sets);
  return sets;
}

export function deleteSet(id: string): CustomSet[] {
  const sets = loadCustomSets().filter((s) => s.id !== id);
  saveCustomSets(sets);
  return sets;
}

export function encodeSet(set: CustomSet): string {
  const json = JSON.stringify(set);
  // base64url
  const b64 = btoa(unescape(encodeURIComponent(json)));
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function decodeSet(str: string): CustomSet | null {
  try {
    const b64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const padded = b64 + '==='.slice((b64.length + 3) % 4);
    const json = decodeURIComponent(escape(atob(padded)));
    const parsed = JSON.parse(json);
    if (!isValidSet(parsed)) return null;
    // give a fresh id on import to avoid collisions
    return { ...parsed, id: `cs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` };
  } catch {
    return null;
  }
}

export function exportSetFile(set: CustomSet): void {
  const blob = new Blob([JSON.stringify(set, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${set.title.replace(/[^a-z0-9а-яіїєґ]+/gi, '_') || 'set'}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function importSetFile(file: File): Promise<CustomSet | null> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!isValidSet(parsed)) return resolve(null);
        resolve({ ...parsed, id: `cs-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` });
      } catch {
        resolve(null);
      }
    };
    reader.onerror = () => resolve(null);
    reader.readAsText(file);
  });
}
