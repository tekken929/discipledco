import { TimelineEvent, TimelineSection } from '../types/timeline';

/**
 * EDITING INSTRUCTIONS:
 *
 * To add a new timeline event:
 * 1. Copy an existing event object from the timelineEvents array below
 * 2. Change the 'id' to a unique identifier (e.g., 'event-25')
 * 3. Update the 'year' to the appropriate date (use 'c. 4000 BC' format for approximate dates)
 * 4. Set the 'category' to one of: 'creation', 'jewish', 'catholic', 'protestant', or 'modern'
 * 5. Write a brief 'title' (1-5 words)
 * 6. Add a short 'description' (1-2 sentences)
 * 7. Add detailed bullet points in the 'details' array
 * 8. Optionally add 'relatedLinks' for external resources
 *
 * Categories explained:
 * - creation: From creation to Abraham
 * - jewish: Jewish faith development (Abraham to Jesus)
 * - catholic: Early church and Catholic Church formation (Jesus to Great Schism)
 * - protestant: Protestant Reformation onwards
 * - modern: 20th century to present
 *
 * Example of adding a new event:
 *
 * {
 *   id: 'event-new',
 *   year: '1054 AD',
 *   title: 'The Great Schism',
 *   category: 'catholic',
 *   description: 'The split between Eastern Orthodox and Roman Catholic churches.',
 *   details: [
 *     'Disagreement over papal authority',
 *     'Different liturgical practices',
 *     'Theological disputes about the Holy Spirit'
 *   ],
 *   relatedLinks: [
 *     { title: 'Learn More', url: 'https://example.com' }
 *   ]
 * },
 */

export const timelineSections: TimelineSection[] = [
  {
    id: 'creation',
    title: 'Creation & Early History',
    description: 'From the creation of the world through the establishment of God\'s covenant',
    category: 'creation'
  },
  {
    id: 'jewish',
    title: 'Jewish Faith',
    description: 'Development of Judaism from Abraham through the prophets',
    category: 'jewish'
  },
  {
    id: 'catholic',
    title: 'Early Church & Catholicism',
    description: 'From Jesus\' ministry through the formation of the Catholic Church',
    category: 'catholic'
  },
  {
    id: 'protestant',
    title: 'Protestant Reformation',
    description: 'The split from Catholicism and the birth of Protestant denominations',
    category: 'protestant'
  },
  {
    id: 'modern',
    title: 'Modern Era',
    description: 'Contemporary developments and current beliefs',
    category: 'modern'
  }
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    year: 'Beginning',
    title: 'Creation',
    category: 'creation',
    description: 'God creates the heavens, the earth, and humanity in His image.',
    details: [
      'God creates the world in six days and rests on the seventh (Genesis 1-2)',
      'Adam and Eve are placed in the Garden of Eden',
      'Humanity is given dominion over creation',
      'Sin enters the world through disobedience (Genesis 3)'
    ]
  },
  {
    id: 'event-2',
    year: 'c. 4000 BC',
    title: 'The Fall',
    category: 'creation',
    description: 'Sin enters the world, separating humanity from God.',
    details: [
      'Adam and Eve disobey God and eat from the forbidden tree',
      'Death and suffering enter creation',
      'Humanity is expelled from Eden',
      'God promises a future redeemer (Genesis 3:15)'
    ]
  },
  {
    id: 'event-3',
    year: 'c. 2500 BC',
    title: 'The Great Flood',
    category: 'creation',
    description: 'God judges the world but preserves Noah and his family.',
    details: [
      'Wickedness increases across the earth',
      'Noah builds an ark as commanded by God',
      'God floods the earth but saves Noah\'s family and the animals',
      'God establishes a covenant with Noah (rainbow sign)'
    ]
  },
  {
    id: 'event-4',
    year: 'c. 2000 BC',
    title: 'Abraham Called',
    category: 'jewish',
    description: 'God calls Abraham and establishes a covenant with him, founding the Jewish people.',
    details: [
      'God calls Abram (later Abraham) to leave his homeland',
      'God promises Abraham descendants as numerous as the stars',
      'The covenant is sealed through circumcision',
      'Abraham becomes the father of faith for Jews, Christians, and Muslims'
    ]
  },
  {
    id: 'event-5',
    year: 'c. 1280 BC',
    title: 'The Exodus',
    category: 'jewish',
    description: 'Moses leads the Israelites out of slavery in Egypt.',
    details: [
      'God delivers Israel from Egyptian bondage through ten plagues',
      'The Passover is instituted',
      'God parts the Red Sea for Israel to cross',
      'The Law (Torah) is given at Mount Sinai',
      'The foundation of Jewish religious practice is established'
    ]
  },
  {
    id: 'event-6',
    year: 'c. 1000 BC',
    title: 'Kingdom of Israel',
    category: 'jewish',
    description: 'Israel becomes a unified kingdom under Kings Saul, David, and Solomon.',
    details: [
      'Saul becomes the first king of Israel',
      'David defeats Goliath and later becomes king',
      'Jerusalem is established as the capital',
      'Solomon builds the First Temple',
      'The kingdom splits into Israel (north) and Judah (south) after Solomon\'s death'
    ]
  },
  {
    id: 'event-7',
    year: '586 BC',
    title: 'Babylonian Exile',
    category: 'jewish',
    description: 'Jerusalem falls and the Jewish people are exiled to Babylon.',
    details: [
      'Nebuchadnezzar destroys Jerusalem and the Temple',
      'The Jewish people are taken into captivity',
      'Prophecies of return and restoration are given',
      'Jewish identity strengthens in exile through Torah study'
    ]
  },
  {
    id: 'event-8',
    year: '538 BC',
    title: 'Return from Exile',
    category: 'jewish',
    description: 'The Jewish people return to Jerusalem and rebuild the Temple.',
    details: [
      'Cyrus of Persia allows Jews to return home',
      'The Second Temple is built under Zerubbabel',
      'Ezra and Nehemiah lead spiritual renewal',
      'The walls of Jerusalem are rebuilt'
    ]
  },
  {
    id: 'event-9',
    year: 'c. 4 BC',
    title: 'Birth of Jesus',
    category: 'catholic',
    description: 'Jesus Christ is born in Bethlehem, marking the beginning of Christianity.',
    details: [
      'Jesus is born to Mary in Bethlehem during Roman occupation',
      'Angels announce His birth to shepherds',
      'Wise men come from the east to worship Him',
      'This marks the beginning of the Christian era'
    ]
  },
  {
    id: 'event-10',
    year: 'c. 30 AD',
    title: 'Jesus\' Ministry',
    category: 'catholic',
    description: 'Jesus teaches, performs miracles, and proclaims the Kingdom of God.',
    details: [
      'Jesus is baptized by John the Baptist',
      'He calls twelve disciples to follow Him',
      'Teaches through parables and sermons',
      'Performs miracles: healing the sick, raising the dead',
      'Proclaims forgiveness of sins and eternal life through faith'
    ]
  },
  {
    id: 'event-11',
    year: '33 AD',
    title: 'Crucifixion & Resurrection',
    category: 'catholic',
    description: 'Jesus is crucified and rises from the dead, completing the work of salvation.',
    details: [
      'Jesus is betrayed by Judas and arrested',
      'He is crucified under Pontius Pilate on Good Friday',
      'Dies as a sacrifice for humanity\'s sins',
      'Rises from the dead on the third day (Easter Sunday)',
      'Appears to His disciples over 40 days',
      'Ascends to heaven, promising to return'
    ]
  },
  {
    id: 'event-12',
    year: '33 AD',
    title: 'Pentecost',
    category: 'catholic',
    description: 'The Holy Spirit descends on the disciples, birthing the Church.',
    details: [
      'The Holy Spirit comes upon the disciples in Jerusalem',
      'Peter preaches and 3,000 people are baptized',
      'The early Church begins to grow rapidly',
      'Believers share possessions and meet daily for worship'
    ]
  },
  {
    id: 'event-13',
    year: '45-60 AD',
    title: 'Paul\'s Missionary Journeys',
    category: 'catholic',
    description: 'The Apostle Paul spreads Christianity throughout the Roman Empire.',
    details: [
      'Paul is converted on the road to Damascus',
      'He travels throughout Asia Minor and Greece',
      'Churches are established in major cities',
      'Paul writes letters (epistles) that become part of the New Testament',
      'The Gospel spreads to Gentiles (non-Jews)'
    ]
  },
  {
    id: 'event-14',
    year: '70 AD',
    title: 'Destruction of Second Temple',
    category: 'jewish',
    description: 'Romans destroy the Temple in Jerusalem, transforming Judaism forever.',
    details: [
      'The Jewish revolt against Rome is crushed',
      'The Second Temple is destroyed by Titus',
      'Judaism shifts from Temple sacrifice to Torah study and prayer',
      'Rabbinic Judaism develops',
      'The Jewish diaspora expands throughout the Roman world'
    ]
  },
  {
    id: 'event-15',
    year: '313 AD',
    title: 'Edict of Milan',
    category: 'catholic',
    description: 'Christianity becomes legal in the Roman Empire under Constantine.',
    details: [
      'Emperor Constantine legalizes Christianity',
      'Persecution of Christians ends',
      'Churches can be built openly',
      'Christianity begins to spread more rapidly',
      'The faith transitions from persecuted minority to imperial religion'
    ]
  },
  {
    id: 'event-16',
    year: '325 AD',
    title: 'Council of Nicaea',
    category: 'catholic',
    description: 'First ecumenical council establishes orthodox Christian doctrine.',
    details: [
      'Bishops gather to address the Arian controversy',
      'The Nicene Creed is formulated',
      'The divinity of Christ is affirmed',
      'Easter date is standardized',
      'Foundation for Catholic Church structure is laid'
    ]
  },
  {
    id: 'event-17',
    year: '1054 AD',
    title: 'The Great Schism',
    category: 'catholic',
    description: 'Christianity splits into Eastern Orthodox and Roman Catholic churches.',
    details: [
      'Disagreements over papal authority reach a breaking point',
      'Theological dispute over the Filioque clause (Holy Spirit proceeding)',
      'Cultural and linguistic differences between East and West',
      'The Pope and Patriarch excommunicate each other',
      'Eastern Orthodox Church and Roman Catholic Church formally separate',
      'Different liturgical practices and traditions develop'
    ]
  },
  {
    id: 'event-18',
    year: '1517 AD',
    title: 'Protestant Reformation Begins',
    category: 'protestant',
    description: 'Martin Luther posts his 95 Theses, challenging Catholic practices.',
    details: [
      'Martin Luther nails 95 Theses to church door in Wittenberg',
      'Challenges the sale of indulgences',
      'Emphasizes salvation by faith alone (sola fide)',
      'Scripture alone as authority (sola scriptura)',
      'Priesthood of all believers is proclaimed',
      'The Bible is translated into common languages'
    ]
  },
  {
    id: 'event-19',
    year: '1534 AD',
    title: 'Church of England Formed',
    category: 'protestant',
    description: 'King Henry VIII separates from Rome, creating the Anglican Church.',
    details: [
      'Henry VIII breaks with the Pope over divorce',
      'Act of Supremacy declares the king head of the Church in England',
      'Monasteries are dissolved',
      'Anglican tradition develops as a middle way between Catholic and Protestant',
      'Book of Common Prayer is created'
    ]
  },
  {
    id: 'event-20',
    year: '1536-1564 AD',
    title: 'Reformation Spreads',
    category: 'protestant',
    description: 'John Calvin and others develop Reformed theology across Europe.',
    details: [
      'John Calvin writes Institutes of the Christian Religion',
      'Reformed theology emphasizes God\'s sovereignty',
      'Predestination becomes a key doctrine',
      'Presbyterian church government develops',
      'Reformation spreads to Switzerland, Scotland, Netherlands'
    ]
  },
  {
    id: 'event-21',
    year: '1545-1563 AD',
    title: 'Council of Trent',
    category: 'catholic',
    description: 'Catholic Church responds to Reformation with Counter-Reformation.',
    details: [
      'Catholic doctrine is clarified and reaffirmed',
      'Seven sacraments are upheld',
      'Tradition and Scripture both affirmed as authorities',
      'Clerical education is reformed',
      'The Catholic Church defines its identity against Protestantism'
    ]
  },
  {
    id: 'event-22',
    year: '1738 AD',
    title: 'Methodist Movement',
    category: 'protestant',
    description: 'John Wesley begins the Methodist revival within Anglicanism.',
    details: [
      'John Wesley experiences conversion at Aldersgate',
      'Emphasis on personal holiness and social justice',
      'Open-air preaching to common people',
      'Methodist societies are organized',
      'Eventually becomes separate denomination'
    ]
  },
  {
    id: 'event-23',
    year: '1948 AD',
    title: 'State of Israel Established',
    category: 'jewish',
    description: 'The modern nation of Israel is founded after the Holocaust.',
    details: [
      'The United Nations partitions Palestine',
      'Israel declares independence on May 14, 1948',
      'Jews from around the world immigrate to Israel',
      'Jerusalem becomes significant again for Jewish worship',
      'Ongoing tensions with Palestinian Arabs and neighbors'
    ]
  },
  {
    id: 'event-24',
    year: '1962-1965 AD',
    title: 'Second Vatican Council',
    category: 'catholic',
    description: 'Catholic Church modernizes and seeks dialogue with other faiths.',
    details: [
      'Mass begins to be celebrated in local languages instead of only Latin',
      'Greater emphasis on Scripture reading',
      'Dialogue with other Christian denominations begins',
      'Church engages more with modern world',
      'Laity given greater role in Church life'
    ]
  },
  {
    id: 'event-25',
    year: 'Present Day',
    title: 'Modern Judaism',
    category: 'modern',
    description: 'Contemporary Jewish faith includes diverse movements and practices.',
    details: [
      'Orthodox Judaism maintains traditional practices and Torah observance',
      'Conservative Judaism balances tradition with modern adaptation',
      'Reform Judaism emphasizes ethical monotheism and personal autonomy',
      'Reconstructionist and other movements continue to develop',
      'Jews await the Messiah who has not yet come',
      'Strong emphasis on justice, education, and community',
      'The Talmud and Torah remain central to Jewish life'
    ]
  },
  {
    id: 'event-26',
    title: 'Present Day',
    year: 'Present Day',
    category: 'modern',
    description: 'Catholic and Protestant churches continue to evolve and engage the world.',
    details: [
      'Catholic Church: 1.3+ billion members worldwide, led by the Pope in Rome',
      'Maintains seven sacraments, veneration of Mary and saints, and papal authority',
      'Protestant churches: thousands of denominations with diverse practices',
      'Common Protestant beliefs: salvation by faith, Bible as sole authority',
      'Ecumenical movement seeks unity among Christians',
      'Both face challenges of secularization and cultural change',
      'Growing churches in Global South while declining in West'
    ]
  }
];

/**
 * KEY DIFFERENCES TODAY:
 *
 * JUDAISM:
 * - Awaits the Messiah who has not yet come
 * - Does not accept Jesus as the Messiah or Son of God
 * - Follows the Torah (first 5 books of the Bible)
 * - Observes Sabbath (Friday evening to Saturday evening)
 * - No belief in the Trinity
 * - Salvation through following God's commandments (mitzvot)
 *
 * CATHOLICISM:
 * - Believes Jesus is the Messiah and Son of God
 * - Pope is the supreme authority on earth
 * - Seven sacraments (Baptism, Eucharist, Confirmation, Reconciliation, Anointing of the Sick, Marriage, Holy Orders)
 * - Veneration of Mary and the saints
 * - Purgatory exists as intermediate state
 * - Tradition and Scripture are both authoritative
 *
 * PROTESTANTISM:
 * - Believes Jesus is the Messiah and Son of God
 * - No pope; each denomination governs independently
 * - Two sacraments typically (Baptism and Communion)
 * - No veneration of Mary or saints
 * - No purgatory
 * - Scripture alone (Sola Scriptura) as authority
 * - Salvation by faith alone (Sola Fide)
 */
