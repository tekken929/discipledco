import { Book } from '../types/book';

export const otWisdomProphets: Book[] = [
  {
    id: 'job',
    name: 'Job',
    order: 18,
    chapters: 42,
    type: 'Wisdom / Poetry',
    overview: [
      'Job addresses the profound question of why the righteous suffer. It tells the story of Job, a blameless man who loses everything—wealth, children, and health—in rapid succession. The book explores the tension between God\'s sovereignty, human suffering, and the limits of human understanding.',
      'Job\'s three friends insist suffering must result from sin, but Job maintains his innocence while struggling to understand God\'s purposes. A fourth friend, Elihu, offers a different perspective. Finally, God speaks from the whirlwind, not answering Job\'s questions directly but revealing His majesty and wisdom beyond human comprehension.',
      'Job teaches that suffering is not always punishment for sin and that God\'s ways transcend human logic. True faith trusts God even without explanations. The book doesn\'t solve the problem of suffering but points to God\'s character as the foundation for faith in the midst of pain.'
    ],
    written: 'Unknown (possibly 2000-1800 BC or later)',
    timePeriod: 'Patriarchal era (uncertain)',
    author: 'Unknown',
    testament: 'Old Testament' as const,
    authorDescription: "The author of this book is not definitively known. The book wrestles with profound questions of suffering and God's justice.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Job\'s Calamity',
        chapterRange: '1-3',
        summary: 'Job is introduced as righteous and prosperous. Satan challenges whether Job serves God for blessings alone. God permits Satan to test Job. Job loses wealth, children, and health but refuses to curse God. Three friends come to comfort him. Job finally speaks, cursing the day of his birth.',
        keyVerse: "The LORD gave and the LORD has taken away; may the name of the LORD be praised.",
        verseReference: "Job 1:21"},
      {
        number: 2,
        title: 'Three Friends Speak',
        chapterRange: '4-31',
        summary: 'Eliphaz, Bildad, and Zophar each speak three times (mostly), arguing Job must have sinned secretly since God punishes the wicked and rewards the righteous. Job defends his innocence and appeals to God. The debates grow increasingly heated as Job\'s friends become accusatory and Job grows more frustrated.',
        keyVerse: "Though he slay me, yet will I hope in him; I will surely defend my ways to his face.",
        verseReference: "Job 13:15"},
      {
        number: 3,
        title: 'Elihu\'s Speeches',
        chapterRange: '32-37',
        summary: 'Young Elihu has waited to speak out of respect for age. He criticizes both Job and his friends. He argues God is greater than humans and uses suffering to discipline and teach. God may be trying to keep Job from sin, or to deepen his faith. Elihu prepares for God\'s appearance.',
        keyVerse: "I know that my redeemer lives, and that in the end he will stand on the earth.",
        verseReference: "Job 19:25"},
      {
        number: 4,
        title: 'God Speaks',
        chapterRange: '38-41',
        summary: 'God speaks from the whirlwind, asking Job questions about creation that reveal human limitations. Where was Job when God laid earth\'s foundations? Can he control nature, understand its mysteries, or govern the created order? God\'s questions humble Job, showing the vast difference between divine and human wisdom.',
        keyVerse: "Where were you when I laid the earth's foundation? Tell me, if you understand.",
        verseReference: "Job 38:4"},
      {
        number: 5,
        title: 'Job\'s Restoration',
        chapterRange: '42',
        summary: 'Job responds in humble repentance for questioning God\'s ways. God rebukes Job\'s three friends for not speaking rightly about Him. Job prays for them. God restores Job\'s fortunes, giving him double what he lost. He has more children and lives 140 years, seeing four generations. He dies old and full of days.',
        keyVerse: "My ears had heard of you but now my eyes have seen you. Therefore I despise myself and repent in dust and ashes.",
        verseReference: "Job 42:5-6"}
    ]
  },
  {
    id: 'psalms',
    name: 'Psalms',
    order: 19,
    chapters: 150,
    type: 'Wisdom / Poetry',
    overview: [
      'Psalms is the Bible\'s hymn book and prayer book, containing 150 poems that express the full range of human experience before God: praise, lament, thanksgiving, confession, and trust. Written over centuries by David and others, the Psalms teach believers how to approach God with complete honesty and faith.',
      'The collection includes diverse types: royal psalms celebrating the king, wisdom psalms teaching truth, lament psalms crying out in distress, thanksgiving psalms praising God for deliverance, and messianic psalms pointing to Christ. Many were used in Israel\'s worship and continue to shape Christian worship today.',
      'Psalms reveals that God welcomes honest emotion and invites His people into authentic relationship. The psalmists don\'t pretend everything is fine; they pour out their hearts, including doubts and complaints, yet consistently turn toward trust and praise. The book shows that true worship encompasses all of life before a faithful God.'
    ],
    written: 'c. 1440-430 BC',
    timePeriod: 'Various periods of Israel\'s history',
    author: 'David, Asaph, Sons of Korah, others',
    testament: 'Old Testament' as const,
    authorDescription: "Multiple authors including King David, Asaph the worship leader, the Sons of Korah, and other temple musicians. These psalms span centuries of Israel's worship.",
    bibleVersion: 'NIV',
    imageUrl: 'https://images.pexels.com/photos/1112081/pexels-photo-1112081.jpeg?auto=compress&cs=tinysrgb&w=800',
    structure: [
      {
        number: 1,
        title: 'Book I: Walking with God',
        chapterRange: '1-41',
        summary: 'The Psalter opens with a call to meditate on God\'s law and avoid wicked counsel. This section includes many of David\'s psalms expressing trust in God during persecution, confession of sin, thanksgiving for deliverance, and celebrations of God\'s character. Themes include righteousness, trust, and God\'s faithful care for His people.',
        keyVerse: "Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers.",
        verseReference: "Psalm 1:1"},
      {
        number: 2,
        title: 'Book II: Redemption and Leadership',
        chapterRange: '42-72',
        summary: 'This collection features psalms of the sons of Korah, David, and Asaph. Themes include longing for God, the sanctuary, national crisis, and God\'s rule over creation and history. Several royal psalms appear, pointing toward the ideal king and ultimately the Messiah. The book ends with prayers for Solomon.',
        keyVerse: "The LORD is my shepherd, I lack nothing.",
        verseReference: "Psalm 23:1"},
      {
        number: 3,
        title: 'Book III: Worship in Crisis',
        chapterRange: '73-89',
        summary: 'Asaph\'s psalms dominate this section, written during national crisis. Questions arise about God\'s justice as the wicked prosper. God\'s faithfulness to the Davidic covenant is affirmed despite apparent failure. The book wrestles with suffering and seeming divine absence while affirming God remains worthy of trust and praise.',
        keyVerse: "Create in me a pure heart, O God, and renew a steadfast spirit within me.",
        verseReference: "Psalm 51:10"},
      {
        number: 4,
        title: 'Book IV: God\'s Eternal Reign',
        chapterRange: '90-106',
        summary: 'Opening with Moses\' psalm, this section emphasizes God\'s eternal nature and sovereign reign. Multiple "The LORD reigns" psalms celebrate God as king. Themes include the brevity of human life, God\'s faithful covenant love, and calls to worship. Despite human failure, God remains on the throne, working His purposes.',
        keyVerse: "Praise the LORD, my soul; all my inmost being, praise his holy name.",
        verseReference: "Psalm 103:1"},
      {
        number: 5,
        title: 'Book V: Praise and God\'s Word',
        chapterRange: '107-150',
        summary: 'The final book features extensive thanksgiving, Psalm 119\'s meditation on God\'s word, songs of ascent for temple pilgrimage, and concluding hallelujah psalms. The Psalter moves from individual lament to corporate praise. It ends with resounding calls for everything that has breath to praise the Lord.',
        keyVerse: "Your word is a lamp for my feet, a light on my path.",
        verseReference: "Psalm 119:105"}
    ]
  },
  {
    id: 'proverbs',
    name: 'Proverbs',
    order: 20,
    chapters: 31,
    type: 'Wisdom',
    overview: [
      'Proverbs is a collection of wise sayings teaching practical godliness for daily life. It emphasizes that "the fear of the LORD is the beginning of wisdom," establishing the foundation that true knowledge starts with proper reverence for God and submission to His ways.',
      'The book opens with extended discourses on wisdom\'s value and warnings against folly, personifying wisdom as a woman calling people to life. The central section contains hundreds of short proverbs covering diverse topics: speech, work, relationships, money, justice, parenting, and character. The book concludes with wisdom for leaders and a portrait of the excellent wife.',
      'Proverbs teaches that choices have consequences. While not promising that righteousness always brings prosperity, it shows general principles: diligence leads to provision, honesty builds reputation, self-control brings peace. Wisdom literature helps believers navigate life skillfully in reverent obedience to God.'
    ],
    written: 'c. 970-700 BC',
    timePeriod: 'Primarily Solomon\'s reign',
    author: 'Solomon (primarily), Agur, Lemuel',
    testament: 'Old Testament' as const,
    authorDescription: "Primarily King Solomon known for his wisdom, with contributions from Agur and King Lemuel. These proverbs teach practical wisdom for daily living.",
    bibleVersion: 'NIV',
    imageUrl: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800',
    structure: [
      {
        number: 1,
        title: 'Purpose and Call to Wisdom',
        chapterRange: '1-9',
        summary: 'The book\'s purpose is stated: to know wisdom and instruction. "The fear of the LORD is the beginning of knowledge." Solomon addresses "my son," warning against bad company and praising wisdom. Wisdom is personified as a woman calling in the streets. Extended discourses contrast wisdom and folly, urging the pursuit of understanding.',
        keyVerse: "The fear of the LORD is the beginning of knowledge, but fools despise wisdom and instruction.",
        verseReference: "Proverbs 1:7"},
      {
        number: 2,
        title: 'Solomon\'s Proverbs',
        chapterRange: '10-22:16',
        summary: 'This section contains Solomon\'s individual proverbs in short two-line format. Topics include righteousness vs. wickedness, wisdom vs. folly, diligence vs. laziness, honest speech, justice, wealth and poverty, relationships, family, self-control, and character. These pithy sayings offer practical guidance for godly living in every area of life.',
        keyVerse: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
        verseReference: "Proverbs 3:5-6"},
      {
        number: 3,
        title: 'Sayings of the Wise',
        chapterRange: '22:17-24:34',
        summary: 'This collection features longer sayings on various topics: avoiding drunkards and gluttons, not exploiting the poor, respecting authority, speaking truth, working diligently, and pursuing wisdom. The section emphasizes learning from experience and applying knowledge skillfully. It includes warnings against envy and calls to proper conduct.',
        keyVerse: "A wife of noble character who can find? She is worth far more than rubies.",
        verseReference: "Proverbs 31:10"},
      {
        number: 4,
        title: 'More of Solomon\'s Proverbs',
        chapterRange: '25-29',
        summary: 'Hezekiah\'s men compiled this additional collection of Solomon\'s proverbs. Topics continue from earlier sections: appropriate speech, relationships with neighbors and rulers, the dangers of pride, dealing with fools, laziness, family dynamics, and justice. These proverbs use vivid metaphors and comparisons to teach wisdom principles.',
        keyVerse: "It is the glory of God to conceal a matter; to search out a matter is the glory of kings.",
        verseReference: "Proverbs 25:2"},
      {
        number: 5,
        title: 'Words of Agur and Lemuel',
        chapterRange: '30-31',
        summary: 'Agur confesses his limitations and poses numerical sayings. Lemuel records his mother\'s instruction for a king: avoid excess and defend the vulnerable. The book concludes with the famous acrostic poem describing the excellent wife: capable, industrious, wise, generous, and God-fearing. "She is worth far more than rubies."',
        keyVerse: "Charm is deceptive, and beauty is fleeting; but a woman who fears the LORD is to be praised.",
        verseReference: "Proverbs 31:30"},
    ]
  },
  {
    id: 'ecclesiastes',
    name: 'Ecclesiastes',
    order: 21,
    chapters: 12,
    type: 'Wisdom',
    overview: [
      'Ecclesiastes explores life\'s meaning through the eyes of "the Teacher" (traditionally understood as Solomon) who has experienced everything the world offers. His repeated refrain "Meaningless! Meaningless! Everything is meaningless" expresses the futility of life lived purely "under the sun" without eternal perspective.',
      'The Teacher systematically examines potential sources of meaning—wisdom, pleasure, work, wealth, power—and finds them all ultimately empty because death comes to everyone. Human existence without God is vanity, a "chasing after the wind." Yet the book is not purely pessimistic; it points toward finding meaning in relationship with God.',
      'Ecclesiastes provides a realistic assessment of life in a fallen world while ultimately calling readers to fear God and keep His commands. It teaches that earthly pursuits cannot satisfy the human soul, which is made for eternity. Only God can fill the void He has placed in human hearts.'
    ],
    written: 'c. 935 BC',
    timePeriod: 'Solomon\'s later years',
    author: 'Solomon (the Teacher)',
    testament: 'Old Testament' as const,
    authorDescription: "King Solomon reflecting on life's meaning in his later years. He explores the vanity of earthly pursuits and ultimate satisfaction in God.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Everything is Meaningless',
        chapterRange: '1-2',
        summary: 'The Teacher declares everything meaningless. Generations come and go, but nothing really changes. He pursued wisdom, pleasure, projects, and possessions with unmatched resources but found no lasting satisfaction. Even wisdom disappoints because the wise and foolish both die. Life "under the sun" offers no ultimate meaning.',
        keyVerse: "'Meaningless! Meaningless!' says the Teacher. 'Utterly meaningless! Everything is meaningless.'",
        verseReference: "Ecclesiastes 1:2"},
      {
        number: 2,
        title: 'A Time for Everything',
        chapterRange: '3-6',
        summary: 'There is a time for everything, showing God\'s sovereign ordering of life. Yet humans cannot comprehend God\'s work fully. The Teacher observes oppression, envy, and the burdens of work. He notes the value of companionship and the folly of seeking wealth. Riches can be lost, and death renders accumulation meaningless.',
        keyVerse: "There is a time for everything, and a season for every activity under the heavens.",
        verseReference: "Ecclesiastes 3:1"},
      {
        number: 3,
        title: 'Wisdom and Folly',
        chapterRange: '7-10',
        summary: 'The Teacher offers practical wisdom: accept adversity, avoid extremes, respect authority. Wisdom is valuable but limited—no one is perfectly righteous. Death is the great equalizer; the same fate awaits everyone regardless of wisdom or righteousness. Still, wisdom is better than folly, even if both die.',
        keyVerse: "Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the duty of all mankind.",
        verseReference: "Ecclesiastes 12:13"},
      {
        number: 4,
        title: 'Life\'s Uncertainties',
        chapterRange: '11-12:8',
        summary: 'The Teacher counsels action despite uncertainty: invest broadly, work diligently. Youth should rejoice but remember they will face judgment. Remember your Creator before old age comes. Using extended metaphors, he describes aging and death. His conclusion: "Meaningless! Everything is meaningless!" The cycle of life continues without ultimate earthly purpose.',
        keyVerse: "Remember your Creator in the days of your youth, before the days of trouble come and the years approach when you will say, 'I find no pleasure in them.'",
        verseReference: "Ecclesiastes 12:1"
      },
      {
        number: 5,
        title: 'The Conclusion',
        chapterRange: '12:9-14',
        summary: 'The epilogue summarizes the Teacher\'s work and wisdom. After exploring every avenue, the final verdict is clear: "Fear God and keep his commandments, for this is the duty of all mankind. For God will bring every deed into judgment, including every hidden thing." Meaning is found in relationship with God.',
        keyVerse: "Now all has been heard; here is the conclusion of the matter: Fear God and keep his commandments, for this is the duty of all mankind.",
        verseReference: "Ecclesiastes 12:13"},
    ]
  },
  {
    id: 'songofsolomon',
    name: 'Song of Solomon',
    order: 22,
    chapters: 8,
    type: 'Wisdom / Poetry',
    overview: [
      'Song of Solomon is a poetic celebration of romantic and sexual love between a husband and wife. Written as a series of lyrical exchanges, it affirms the goodness and beauty of marital intimacy as God designed it, standing as a contrast to the distortions of love found in the surrounding culture.',
      'The book features dialogue between the lovers, celebrating each other\'s physical beauty, expressing longing, and delighting in their union. The passionate poetry demonstrates that sexual love within marriage is a divine gift to be enjoyed, not merely tolerated. It honors the body and physical desire as good parts of God\'s creation.',
      'Many interpreters also see Song of Solomon as an allegory of God\'s love for Israel or Christ\'s love for the church. Whether read primarily as celebration of marital love or as spiritual allegory, it reveals that love, devotion, longing, and delight characterize God\'s design for intimate relationship.'
    ],
    written: 'c. 970-930 BC',
    timePeriod: 'Solomon\'s reign',
    author: 'Solomon',
    testament: 'Old Testament' as const,
    authorDescription: "Third king of Israel, son of David, known for his wisdom. Built the first temple and wrote extensively on wisdom and worship.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Courtship and Attraction',
        chapterRange: '1-3',
        summary: 'The lovers express mutual admiration and desire. She describes herself humbly but he praises her beauty extravagantly. They long for each other and celebrate their love. The bride searches for her beloved and finds him. The "daughters of Jerusalem" are warned not to awaken love before its proper time.',
        keyVerse: "I charge you, daughters of Jerusalem, by the gazelles and by the does of the field: Do not arouse or awaken love until it so desires.",
        verseReference: "Song of Solomon 2:7"
      },
      {
        number: 2,
        title: 'The Wedding and Consummation',
        chapterRange: '4-5',
        summary: 'The groom praises his bride\'s beauty with elaborate metaphors. He speaks of entering his "garden," a euphemism for consummation. She invites him to his garden. After their union, she dreams of losing him but finds him again. The friends praise the lovers. This section celebrates marital intimacy as beautiful and good.',
        keyVerse: "You are a garden locked up, my sister, my bride; you are a spring enclosed, a sealed fountain.",
        verseReference: "Song of Solomon 4:12"},
      {
        number: 3,
        title: 'Mutual Delight',
        chapterRange: '6-8',
        summary: 'The lovers continue expressing admiration and desire. He praises her beauty as unique among women. She responds with affection. The relationship is described as exclusive, permanent, and passionate: "Many waters cannot quench love." The book closes affirming love\'s power and value, requesting faithfulness and devoted attention.',
        keyVerse: "Place me like a seal over your heart, like a seal on your arm; for love is as strong as death, its jealousy unyielding as the grave.",
        verseReference: "Song of Solomon 8:6"},
    ]
  },
  {
    id: 'isaiah',
    name: 'Isaiah',
    order: 23,
    chapters: 66,
    type: 'Major Prophets',
    overview: [
      'Isaiah prophesies during a tumultuous period when Assyria threatens and eventually conquers the northern kingdom. He calls Judah to repentance while announcing both impending judgment and future hope. His messages of comfort and promise look beyond exile to restoration and ultimately to the Messiah.',
      'The book contains some of Scripture\'s most beautiful messianic prophecies, describing the suffering servant who will bear the sins of many (chapter 53), the virgin birth (7:14), and the prince of peace (9:6). Isaiah envisions a new heavens and new earth where God dwells with His people in perfect peace.',
      'Isaiah emphasizes God\'s holiness, sovereignty, and faithfulness. Despite human rebellion, God will preserve a remnant and accomplish His purposes. The book moves from judgment to comfort, showing that God disciplines His people in love and will ultimately redeem them through the suffering servant—Jesus Christ.'
    ],
    written: 'c. 740-680 BC',
    timePeriod: 'c. 740-681 BC',
    author: 'Isaiah',
    testament: 'Old Testament' as const,
    authorDescription: "Major prophet who ministered in Judah during the 8th century BC. Proclaimed God's holiness, judgment, and the coming Messianic Servant.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Judgment on Judah',
        chapterRange: '1-12',
        summary: 'Isaiah receives his call, seeing God\'s holiness. He pronounces judgment on Judah\'s rebellion and false worship. Yet hope emerges: a virgin will bear Immanuel, a child will be born who is Mighty God and Prince of Peace, a shoot from Jesse\'s stump will bring righteousness. Judgment gives way to songs of salvation.',
        keyVerse: "Come now, let us settle the matter,' says the LORD. 'Though your sins are like scarlet, they shall be as white as snow.'",
        verseReference: "Isaiah 1:18"},
      {
        number: 2,
        title: 'Oracles Against Nations',
        chapterRange: '13-23',
        summary: 'Isaiah prophesies judgment against surrounding nations: Babylon, Assyria, Philistia, Moab, Damascus, Cush, Egypt, Edom, Arabia, and Tyre. These oracles demonstrate God\'s sovereignty over all nations, not just Israel. The proud will be humbled, and those who oppress God\'s people will face His justice.',
        keyVerse: "For to us a child is born, to us a son is given, and the government will be on his shoulders.",
        verseReference: "Isaiah 9:6"},
      {
        number: 3,
        title: 'Global Judgment and Salvation',
        chapterRange: '24-35',
        summary: 'Isaiah envisions cosmic judgment and renewal. God will devastate the earth but save a remnant. Songs of praise interrupt prophecies of doom. Woe to those who trust Egypt instead of God. Yet restoration is promised: the desert will blossom, the blind will see, the lame will leap. God will come with vengeance and salvation.',
        keyVerse: "But he was pierced for our transgressions, he was crushed for our iniquities; the punishment that brought us peace was on him, and by his wounds we are healed.",
        verseReference: "Isaiah 53:5"},
      {
        number: 4,
        title: 'Historical Interlude',
        chapterRange: '36-39',
        summary: 'Assyria besieges Jerusalem, but God miraculously delivers the city in response to Hezekiah\'s prayer. Hezekiah becomes ill but God heals him and extends his life. However, when Hezekiah shows Babylon\'s envoys his treasures, Isaiah prophesies that Babylon will eventually conquer Judah. This sets up the book\'s second half.',
        keyVerse: "So do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you.",
        verseReference: "Isaiah 41:10"},
      {
        number: 5,
        title: 'Comfort and the Servant',
        chapterRange: '40-55',
        summary: '"Comfort my people," God declares. Israel\'s exile will end. Four servant songs describe one who will bring justice, suffer for others\' sins, and be exalted. Chapter 53 vividly portrays the suffering servant bearing humanity\'s iniquities. God will restore Israel and draw all nations to Himself through the servant\'s work.',
        keyVerse: "See, I am doing a new thing! Now it springs up; do you not perceive it?",
        verseReference: "Isaiah 43:19"},
      {
        number: 6,
        title: 'Future Glory',
        chapterRange: '56-66',
        summary: 'Isaiah envisions ultimate restoration: foreigners and outcasts welcomed, the Redeemer coming to Zion, the Spirit anointing one to bring good news to the poor. God will create new heavens and a new earth where righteousness dwells. All nations will worship God. The book ends with both eternal joy for the faithful and judgment for rebels.',
        keyVerse: "See, I will create new heavens and a new earth. The former things will not be remembered, nor will they come to mind.",
        verseReference: "Isaiah 65:17"
      }
    ]
  },
  {
    id: 'jeremiah',
    name: 'Jeremiah',
    order: 24,
    chapters: 52,
    type: 'Major Prophets',
    overview: [
      'Jeremiah prophesies during Judah\'s final decades, witnessing the nation\'s stubborn rebellion and eventual destruction by Babylon. Called as a young man, he serves faithfully for over 40 years, delivering unpopular messages of judgment while weeping for his people. He is opposed, imprisoned, and rejected, yet remains faithful to his calling.',
      'The book alternates between poetry and prose, judgment oracles and personal laments. Jeremiah announces that Babylon is God\'s instrument of judgment, urging surrender rather than resistance. This "traitorous" message brings persecution. Yet Jeremiah also prophesies restoration: a new covenant written on hearts, not stone tablets.',
      'Jeremiah reveals the heart of a prophet who suffers with God over His people\'s sin while faithfully delivering hard truths. His life foreshadows Christ: rejected by his own, suffering for speaking God\'s word, announcing a new covenant. Despite present judgment, the book ends with hope for restoration after seventy years.'
    ],
    written: 'c. 627-580 BC',
    timePeriod: 'c. 627-586 BC',
    author: 'Jeremiah (with Baruch as scribe)',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet called to announce Judah's judgment and exile. Known as the weeping prophet, aided by his scribe Baruch.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Call and Early Messages',
        chapterRange: '1-10',
        summary: 'God calls young Jeremiah as prophet to the nations. He sees visions of an almond branch and boiling pot, symbolizing judgment from the north. Jeremiah accuses Judah of forsaking God, committing spiritual adultery through idolatry. Despite God\'s past faithfulness, the people have broken covenant. Judgment is coming through a northern enemy.',
        keyVerse: "'For I know the plans I have for you,' declares the LORD, 'plans to prosper you and not to harm you, plans to give you hope and a future.'",
        verseReference: "Jeremiah 29:11"},
      {
        number: 2,
        title: 'The Broken Covenant',
        chapterRange: '11-20',
        summary: 'Jeremiah announces Judah has broken God\'s covenant. The people plot against him, and he complains to God. He performs symbolic acts: burying a linen belt, breaking pottery. False prophets contradict his message. Jeremiah suffers persecution and laments his calling, expressing raw honesty about his pain while remaining faithful to God\'s commission.',
        keyVerse: "The days are coming,' declares the LORD, 'when I will make a new covenant with the people of Israel and with the people of Judah.'",
        verseReference: "Jeremiah 31:31"},
      {
        number: 3,
        title: 'Judgment on Leaders and False Prophets',
        chapterRange: '21-29',
        summary: 'Jeremiah confronts kings and prophets who lead people astray. Zedekiah seeks his counsel but won\'t obey. Jeremiah predicts 70 years of exile and warns against false prophets promising quick return. He writes to the exiles in Babylon: settle in, seek the city\'s welfare, and wait for God\'s timing. True restoration will come later.',
        keyVerse: "Call to me and I will answer you and tell you great and unsearchable things you do not know.",
        verseReference: "Jeremiah 33:3"},
      {
        number: 4,
        title: 'The Book of Consolation',
        chapterRange: '30-33',
        summary: 'Despite judgment, restoration is promised. God will make a new covenant, writing His law on hearts rather than stone. He will forgive sin and restore the relationship. The promise extends to both Israel and Judah. David\'s line will continue. This is the theological center of Jeremiah: hope beyond judgment through God\'s faithful covenant love.',
        keyVerse: "So they took Jeremiah and put him into the cistern of Malkijah, the king's son, which was in the courtyard of the guard.",
        verseReference: "Jeremiah 38:6"},
      {
        number: 5,
        title: 'Jerusalem\'s Fall Approaches',
        chapterRange: '34-45',
        summary: 'Jeremiah warns Zedekiah repeatedly. The king imprisons him. Jeremiah buys a field as a sign of future restoration. When Babylon besieges Jerusalem, Zedekiah seeks advice but disobeys. The city falls; the temple is destroyed. Jeremiah is released by the Babylonians. Some Jews flee to Egypt, taking Jeremiah with them against his will.',
        keyVerse: "This is what the LORD says: As I have brought all this great calamity on this people, so I will give them all the prosperity I have promised them.",
        verseReference: "Jeremiah 32:42"},
      {
        number: 6,
        title: 'Oracles and Historical Appendix',
        chapterRange: '46-52',
        summary: 'Jeremiah prophesies judgment against surrounding nations: Egypt, Philistia, Moab, Ammon, Edom, Damascus, Kedar, Elam, and especially Babylon itself. Though God uses Babylon as His instrument, they too will face judgment. Chapter 52 provides historical details of Jerusalem\'s fall, paralleling 2 Kings, confirming Jeremiah\'s prophecies came true.',
        keyVerse: "Babylon will suddenly fall and be broken. Wail over her! Get balm for her pain; perhaps she can be healed.",
        verseReference: "Jeremiah 51:8"},
    ]
  },
  {
    id: 'lamentations',
    name: 'Lamentations',
    order: 25,
    chapters: 5,
    type: 'Major Prophets / Poetry',
    overview: [
      'Lamentations is Jeremiah\'s collection of funeral poems mourning Jerusalem\'s destruction by Babylon. Written in the immediate aftermath of the city\'s fall, these five laments express profound grief over the devastation, the temple\'s ruin, and the people\'s suffering while acknowledging their sin brought this judgment.',
      'The book doesn\'t minimize pain or offer easy answers. It honestly faces horror: starvation, violence, exile, and the apparent triumph of enemies. The poet cries out to God from the depths, yet even in the darkest moment, a glimmer of hope appears: "His compassions never fail. They are new every morning; great is your faithfulness."',
      'Lamentations teaches that grief is appropriate and God welcomes honest lament. Suffering can be acknowledged without losing faith. The book validates mourning while affirming God\'s justice and ultimate faithfulness. It shows that even when circumstances seem to contradict it, God remains worthy of trust and hope.'
    ],
    written: 'c. 586 BC',
    timePeriod: '586 BC (after Jerusalem\'s fall)',
    author: 'Jeremiah',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet called to announce Judah's judgment and exile. Known as the weeping prophet, he witnessed Jerusalem's destruction.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Jerusalem Personified in Grief',
        chapterRange: '1',
        summary: 'Jerusalem is portrayed as a widow, weeping bitterly with no comforter. The once-great city sits desolate. Her enemies gloat over her destruction. She acknowledges her rebellion brought this judgment. The chapter alternates between third-person description and Jerusalem\'s own voice crying out for someone to notice her suffering.',
        keyVerse: "How deserted lies the city, once so full of people! How like a widow is she, who once was great among the nations!",
        verseReference: "Lamentations 1:1"},
      {
        number: 2,
        title: 'God\'s Anger Poured Out',
        chapterRange: '2',
        summary: 'God has destroyed Judah without pity, fulfilling warnings given through prophets. The temple is defiled, walls broken down, leaders taken captive. Starvation is so severe that women eat their own children. False prophets failed to warn the people. Jeremiah calls Jerusalem to cry out to God day and night for mercy.',
        keyVerse: "Because of the LORD's great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.",
        verseReference: "Lamentations 3:22-23"},
      {
        number: 3,
        title: 'Individual Suffering and Hope',
        chapterRange: '3',
        summary: 'The poet describes personal affliction under God\'s hand. In the darkest moment, hope breaks through: "Because of the LORD\'s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness." He counsels waiting quietly for God\'s salvation, bearing suffering patiently, and returning to God with confession.',
        keyVerse: "Let us examine our ways and test them, and let us return to the LORD.",
        verseReference: "Lamentations 3:40"},
      {
        number: 4,
        title: 'Then and Now',
        chapterRange: '4',
        summary: 'The poet contrasts Jerusalem\'s past glory with present degradation. Precious children now rummage through garbage. Those who ate delicacies starve in streets. Prophets and priests are guilty. Allies have failed. Yet the punishment will end; Zion\'s sin is paid for. Meanwhile, Edom will face judgment for their cruelty during Jerusalem\'s fall.',
        keyVerse: "How the gold has lost its luster, the fine gold become dull! The sacred gems are scattered at every street corner.",
        verseReference: "Lamentations 4:1"},
      {
        number: 5,
        title: 'Corporate Prayer for Restoration',
        chapterRange: '5',
        summary: 'The book concludes with a communal prayer recounting their humiliation and suffering under foreign rule. "Joy is gone from our hearts; our dancing has turned to mourning." They confess ancestral and personal sin. The prayer ends with appeal: "Restore us to yourself, LORD... renew our days as of old" unless God has utterly rejected them.',
        keyVerse: "Restore us to yourself, LORD, that we may return; renew our days as of old.",
        verseReference: "Lamentations 5:21"
      }
    ]
  },
  {
    id: 'ezekiel',
    name: 'Ezekiel',
    order: 26,
    chapters: 48,
    type: 'Major Prophets',
    overview: [
      'Ezekiel prophesies to the Jewish exiles in Babylon before and after Jerusalem\'s fall. A priest as well as prophet, he receives dramatic visions and performs bizarre symbolic actions to communicate God\'s messages. His prophecies explain why judgment came, announce that God\'s glory has left the temple, and promise eventual restoration.',
      'The book is known for vivid imagery: wheels within wheels, a valley of dry bones coming to life, and elaborate temple visions. Ezekiel emphasizes individual responsibility before God and the need for internal transformation—new hearts and spirits. God will restore Israel not primarily for their sake but to vindicate His holy name among the nations.',
      'Ezekiel demonstrates God\'s transcendent glory and holiness. His departure from the temple because of Israel\'s sin is devastating, yet the promise that He will return and dwell with a purified people brings hope. The detailed vision of a new temple and restored land points toward ultimate restoration in God\'s kingdom.'
    ],
    written: 'c. 593-571 BC',
    timePeriod: 'c. 593-571 BC',
    author: 'Ezekiel',
    testament: 'Old Testament' as const,
    authorDescription: "Priest and prophet exiled to Babylon. Received vivid visions of God's glory and prophesied restoration for Israel.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Ezekiel\'s Call and Commission',
        chapterRange: '1-3',
        summary: 'Ezekiel sees an overwhelming vision of God\'s glory: living creatures, wheels within wheels, and a throne above them. God commissions him as a watchman to the rebellious house of Israel. He eats a scroll containing God\'s words. Though the people are stubborn and hard-hearted, Ezekiel must speak God\'s warnings faithfully.',
        keyVerse: "Above the vault over their heads was what looked like a throne of lapis lazuli, and high above on the throne was a figure like that of a man.",
        verseReference: "Ezekiel 1:26"},
      {
        number: 2,
        title: 'Judgment Proclaimed',
        chapterRange: '4-24',
        summary: 'Ezekiel performs dramatic symbolic acts: lying on his side for days, shaving his head, cooking food over dung. He confronts Israel\'s idolatry and announces coming destruction. In a shattering vision, God\'s glory progressively leaves the temple. Ezekiel prophesies against false prophets and leaders. On the day Babylon begins besieging Jerusalem, Ezekiel\'s wife dies—another sign.',
        keyVerse: "The word of the LORD came to me: 'Son of man, I have made you a watchman for the people of Israel.'",
        verseReference: "Ezekiel 3:17"},
      {
        number: 3,
        title: 'Oracles Against Nations',
        chapterRange: '25-32',
        summary: 'God pronounces judgment on nations surrounding Israel: Ammon, Moab, Edom, Philistia, Tyre, Sidon, and especially Egypt. Extended oracles mourn Tyre\'s fall from commercial glory. Pharaoh is compared to a defeated sea monster. These judgments demonstrate God\'s sovereignty over all nations and His justice toward those who harmed His people.',
        keyVerse: "I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh.",
        verseReference: "Ezekiel 36:26"},
      {
        number: 4,
        title: 'Individual Responsibility',
        chapterRange: '33-39',
        summary: 'Ezekiel is again called to be a watchman. Individual responsibility is emphasized: each person bears their own sin. News arrives that Jerusalem has fallen. Ezekiel condemns corrupt shepherds and promises God will shepherd His people Himself through His servant David. The valley of dry bones vision promises resurrection and restoration for Israel.',
        keyVerse: "He asked me, 'Son of man, can these bones live?' I said, 'Sovereign LORD, you alone know.'",
        verseReference: "Ezekiel 37:3"},
      {
        number: 5,
        title: 'Vision of Restoration',
        chapterRange: '40-48',
        summary: 'In elaborate detail, Ezekiel sees a vision of a new temple, perfectly ordered worship, and the land redistributed among the tribes. A river flows from the temple, bringing life wherever it goes. Most significantly, God\'s glory returns to the temple. The city is renamed: "The LORD is There." God will dwell with His people forever.',
        keyVerse: "And the name of the city from that time on will be: THE LORD IS THERE.",
        verseReference: "Ezekiel 48:35"}
    ]
  },
  {
    id: 'daniel',
    name: 'Daniel',
    order: 27,
    chapters: 12,
    type: 'Major Prophets',
    overview: [
      'Daniel chronicles the experiences of a faithful Jewish exile serving in Babylon and Persia, and records his prophetic visions about future kingdoms. The book shows how to maintain faithfulness to God in a hostile foreign culture while demonstrating that God is sovereign over all earthly kingdoms.',
      'The first half contains famous stories: Daniel and friends refuse the king\'s food, Shadrach, Meshach, and Abednego in the fiery furnace, Daniel interpreting Nebuchadnezzar\'s dreams, the writing on the wall, and Daniel in the lions\' den. These narratives demonstrate God\'s power to deliver those who trust Him above human authority.',
      'The second half records apocalyptic visions of beasts, horns, and future kingdoms, climaxing in the Ancient of Days giving dominion to "one like a son of man." These visions assure the faithful that despite present persecution, God controls history and will ultimately establish His eternal kingdom through the Messiah.'
    ],
    written: 'c. 530 BC',
    timePeriod: 'c. 605-530 BC',
    author: 'Daniel',
    testament: 'Old Testament' as const,
    authorDescription: "Jewish exile who served in Babylonian and Persian courts. Remained faithful to God and received apocalyptic visions of world history.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Daniel in Babylon',
        chapterRange: '1-2',
        summary: 'Daniel and friends are taken to Babylon and trained for royal service. They refuse the king\'s food to remain ceremonially clean. God gives them wisdom surpassing all others. Nebuchadnezzar dreams of a statue representing successive kingdoms, which Daniel interprets. God will establish an eternal kingdom that crushes all others. The king honors Daniel.',
        keyVerse: "But Daniel resolved not to defile himself with the royal food and wine, and he asked the chief official for permission not to defile himself this way.",
        verseReference: "Daniel 1:8"},
      {
        number: 2,
        title: 'Faithfulness Tested',
        chapterRange: '3-6',
        summary: 'Shadrach, Meshach, and Abednego refuse to worship a golden image and survive the fiery furnace. Nebuchadnezzar learns humility after living like an animal. Belshazzar sees writing on the wall announcing Babylon\'s fall. Daniel serves under Persian rule. When he refuses to stop praying to God, he is thrown to lions but miraculously preserved.',
        keyVerse: "Praise be to the name of God for ever and ever; wisdom and power are his.",
        verseReference: "Daniel 2:20"},
      {
        number: 3,
        title: 'Visions of Future Kingdoms',
        chapterRange: '7-8',
        summary: 'Daniel sees four beasts representing successive kingdoms. The Ancient of Days appears in heavenly court and gives dominion to "one like a son of man." Another vision depicts a ram and goat representing Medo-Persia and Greece. A little horn arises, persecuting God\'s people. These visions reveal God\'s sovereignty over earthly powers.',
        keyVerse: "If we are thrown into the blazing furnace, the God we serve is able to deliver us from it, and he will deliver us from Your Majesty's hand.",
        verseReference: "Daniel 3:17"},
      {
        number: 4,
        title: 'Prayer and Further Revelation',
        chapterRange: '9-12',
        summary: 'Daniel prays, confessing Israel\'s sin and pleading for mercy. Gabriel reveals seventy "sevens" decreed for Israel, culminating in the anointed one being cut off. Daniel receives final visions of wars between future kingdoms. Michael will arise. The dead will be raised. The wise will shine like stars. Daniel is told to seal the book until the end.',
        keyVerse: "His dominion is an eternal dominion; his kingdom endures from generation to generation.",
        verseReference: "Daniel 4:34"}
    ]
  },
  {
    id: 'hosea',
    name: 'Hosea',
    order: 28,
    chapters: 14,
    type: 'Minor Prophets',
    overview: [
      'Hosea prophesies to the northern kingdom of Israel during its final decades before falling to Assyria. God commands Hosea to marry an unfaithful woman named Gomer as a living illustration of Israel\'s spiritual adultery against God. Despite Gomer\'s repeated unfaithfulness, Hosea is called to redeem and restore her—mirroring God\'s persistent love for Israel.',
      'The book alternates between describing Hosea\'s painful marriage and depicting Israel\'s covenant unfaithfulness through idolatry and political alliances. Israel has prostituted herself with false gods and foreign nations, yet God continues pursuing her with faithful love. Though judgment is coming, God promises ultimate restoration because His covenant love is stronger than Israel\'s rebellion.',
      'Hosea reveals God\'s heart: holy and just, yet overflowing with compassion and steadfast love. He cannot simply let go of His people despite their betrayal. The book teaches that God\'s love is not conditional on Israel\'s faithfulness but flows from His character. This unfailing covenant love ultimately finds its fullest expression in Christ.'
    ],
    written: 'c. 755-715 BC',
    timePeriod: 'c. 755-715 BC',
    author: 'Hosea',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet whose marriage to an unfaithful wife illustrated God's faithful love for wayward Israel. Called the nation to return to God.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Hosea\'s Marriage',
        chapterRange: '1-3',
        summary: 'God commands Hosea to marry Gomer, a promiscuous woman. Their children receive symbolic names: Jezreel (God scatters), Lo-Ruhamah (not loved), and Lo-Ammi (not my people), indicating God\'s judgment on Israel. Despite Israel\'s unfaithfulness, God promises restoration. Hosea redeems Gomer from slavery, just as God will redeem Israel despite her spiritual adultery.',
        keyVerse: "When Israel was a child, I loved him, and out of Egypt I called my son.",
        verseReference: "Hosea 11:1"},
      {
        number: 2,
        title: 'The Charges Against Israel',
        chapterRange: '4-7',
        summary: 'God brings charges against Israel: no faithfulness, no love, no acknowledgment of God. Priests and people are corrupt. Israel chases after idols and foreign alliances like an adulterous wife. Their devotion is like morning mist—it vanishes quickly. God desires steadfast love and knowledge of Him, not mere sacrifices. Ephraim is half-baked, unreliable, and doomed.',
        keyVerse: "I will heal their waywardness and love them freely, for my anger has turned away from them.",
        verseReference: "Hosea 14:4"},
      {
        number: 3,
        title: 'Judgment and Love',
        chapterRange: '8-11',
        summary: 'Israel has broken the covenant and will reap judgment—exile to Assyria. They plant wind and reap whirlwind. Yet God\'s heart breaks over Israel: "How can I give you up, Ephraim? My heart recoils within me." God\'s compassion grows warm. Though judgment must come, His love ultimately prevails. He cannot abandon His people permanently.',
        keyVerse: "They sow the wind and reap the whirlwind. The stalk has no head; it will produce no flour.",
        verseReference: "Hosea 8:7"},
      {
        number: 4,
        title: 'Return and Restoration',
        chapterRange: '12-14',
        summary: 'God appeals through Jacob\'s example and past deliverances. Israel must return to God with confession, forsaking idols and foreign alliances. The book ends with God\'s beautiful promise of healing and restoration: "I will heal their waywardness and love them freely." The final verse asks: who is wise? Let them understand God\'s ways are right; the righteous walk in them.',
        keyVerse: "Who is wise? Let them realize these things. Who is discerning? Let them understand. The ways of the LORD are right; the righteous walk in them, but the rebellious stumble in them.",
        verseReference: "Hosea 14:9"},
    ]
  },
  {
    id: 'joel',
    name: 'Joel',
    order: 29,
    chapters: 3,
    type: 'Minor Prophets',
    overview: [
      'Joel prophesies about a devastating locust plague that has stripped the land bare, using it as both a present crisis and a picture of the coming "day of the LORD"—a time of judgment. He calls the nation to repentance through fasting and corporate mourning, promising that if they return to God, He will restore what the locusts have destroyed.',
      'The book\'s central message is urgent: the day of the LORD is near, a day of darkness and judgment. Yet God is gracious and compassionate, slow to anger and abounding in love. If the people genuinely repent, God will respond with blessing and restoration, pouring out His Spirit on all people.',
      'Joel\'s prophecy about the outpouring of the Spirit is quoted by Peter at Pentecost, marking its partial fulfillment. The book teaches that true repentance involves torn hearts, not just torn garments. God responds to genuine repentance with mercy, restoration, and the gift of His Spirit—ultimately pointing to the new covenant.'
    ],
    written: 'c. 835-800 BC (possibly later)',
    timePeriod: 'Uncertain date',
    author: 'Joel',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet who warned of coming judgment (the Day of the Lord) and promised future restoration. Prophesied the outpouring of God's Spirit.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'The Locust Plague',
        chapterRange: '1:1-20',
        summary: 'A catastrophic locust plague devastates Judah, destroying all vegetation. Joel calls priests, elders, and all inhabitants to lament. Offerings cease because there is no grain or drink. The prophet calls for corporate mourning and fasting before God. This unprecedented disaster is both literal judgment and preview of the coming day of the LORD.',
        keyVerse: "Rend your heart and not your garments. Return to the LORD your God, for he is gracious and compassionate, slow to anger and abounding in love.",
        verseReference: "Joel 2:13"},
      {
        number: 2,
        title: 'Call to Repentance',
        chapterRange: '2:1-17',
        summary: 'Joel sounds the alarm about the day of the LORD—darkness and gloom approaching like a massive army. Yet even now, God says, return with all your heart, with fasting and weeping. Tear your hearts, not your garments. God is gracious and compassionate. Gather the people for corporate repentance. Perhaps He will relent and leave blessing instead of curse.',
        keyVerse: "And afterward, I will pour out my Spirit on all people. Your sons and daughters will prophesy, your old men will dream dreams, your young men will see visions.",
        verseReference: "Joel 2:28"},
      {
        number: 3,
        title: 'Promise of Restoration',
        chapterRange: '2:18-32',
        summary: 'God responds to His people\'s repentance with mercy. He will drive away the northern army and restore the years the locusts have eaten. He promises abundant harvests and His presence among them. Then comes the stunning promise: God will pour out His Spirit on all people, not just leaders. Sons, daughters, young, old, servants—all will prophesy.',
        keyVerse: "I will repay you for the years the locusts have eaten—the great locust and the young locust, the other locusts and the locust swarm—my great army that I sent among you.",
        verseReference: "Joel 2:25"},
      {
        number: 4,
        title: 'Judgment on the Nations',
        chapterRange: '3:1-21',
        summary: 'God will judge the nations that scattered His people and divided His land. He calls them to the Valley of Jehoshaphat for judgment. While nations face God\'s wrath, Judah and Jerusalem will be secure. A fountain will flow from the LORD\'s house. God will dwell in Zion forever, vindicating His people and punishing their oppressors.',
        keyVerse: "Then you will know that I, the LORD your God, dwell in Zion, my holy hill. Jerusalem will be holy; never again will foreigners invade her.",
        verseReference: "Joel 3:17"},
    ]
  },
  {
    id: 'amos',
    name: 'Amos',
    order: 30,
    chapters: 9,
    type: 'Minor Prophets',
    overview: [
      'Amos, a shepherd from Judah, prophesies against the northern kingdom of Israel during a time of prosperity and apparent peace. Beneath the surface wealth, however, lies moral corruption: the rich oppress the poor, courts are corrupt, and worship is hypocritical. Amos announces that God\'s judgment is coming because social injustice violates the covenant.',
      'The book begins with oracles against surrounding nations, building to a climactic condemnation of Israel itself. Amos emphasizes that religious ritual without justice is worthless to God. His famous call rings out: "Let justice roll on like a river, righteousness like a never-failing stream." Privilege brings greater responsibility before God.',
      'Amos teaches that God cares deeply about how His people treat the vulnerable. True religion involves both right worship and right action toward others. God will judge nations that oppress, starting with His own people. Yet the book ends with hope: God will restore David\'s fallen tent and bring ultimate blessing.'
    ],
    written: 'c. 760-750 BC',
    timePeriod: 'c. 760-750 BC',
    author: 'Amos',
    testament: 'Old Testament' as const,
    authorDescription: "Shepherd and farmer called by God to prophesy against Israel's social injustice. Demanded righteousness and justice, not empty ritual.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Oracles Against Nations',
        chapterRange: '1:1-2:5',
        summary: 'Amos pronounces judgment on Israel\'s neighbors—Damascus, Gaza, Tyre, Edom, Ammon, and Moab—for their atrocities and treaty violations. Then he turns to Judah for rejecting God\'s law. The pattern builds suspense as Israel likely cheered judgments on their enemies, unprepared for what comes next.',
        keyVerse: "But let justice roll on like a river, righteousness like a never-failing stream!",
        verseReference: "Amos 5:24"},
      {
        number: 2,
        title: 'Judgment on Israel',
        chapterRange: '2:6-16',
        summary: 'The hammer falls on Israel. They sell the righteous for silver and needy for a pair of sandals. They trample the poor, deny justice, and commit sexual immorality. Father and son sleep with the same girl, profaning God\'s name. Despite God\'s past faithfulness—deliverance from Egypt, the land, prophets—they have corrupted everything. Escape will be impossible.',
        keyVerse: "Seek good, not evil, that you may live. Then the LORD God Almighty will be with you, just as you say he is.",
        verseReference: "Amos 5:14"},
      {
        number: 3,
        title: 'Three Sermons',
        chapterRange: '3-6',
        summary: 'Amos delivers three messages beginning "Hear this word." Privilege brings greater accountability. Israel\'s oppression of the poor will be judged. Their empty religious festivals disgust God. Let justice roll like a river instead. Woe to those at ease in Zion, living in luxury while ignoring the nation\'s ruin. Exile is coming to those who lounge on ivory beds.',
        keyVerse: "'The days are coming,' declares the Sovereign LORD, 'when I will send a famine through the land—not a famine of food or a thirst for water, but a famine of hearing the words of the LORD.'",
        verseReference: "Amos 8:11"},
      {
        number: 4,
        title: 'Five Visions',
        chapterRange: '7:1-9:10',
        summary: 'Amos sees five visions: locusts, fire, a plumb line, ripe fruit, and the Lord at the altar. The first two judgments are averted by Amos\' intercession, but the third is final—God will spare them no longer. Amaziah the priest tells Amos to leave. Amos responds that he\'s just a shepherd, but God called him. The sinful kingdom will be destroyed.',
        keyVerse: "Then the LORD said, 'Look, I am setting a plumb line among my people Israel; I will spare them no longer.'",
        verseReference: "Amos 7:8"},
      {
        number: 5,
        title: 'Future Restoration',
        chapterRange: '9:11-15',
        summary: 'After overwhelming judgment, the book ends with hope. God will restore David\'s fallen tent and rebuild its ruins. Israel will return from exile and rebuild cities, plant vineyards, and never be uprooted again. This promise extends beyond Israel\'s return from exile to ultimate restoration through the Messiah, as quoted in Acts 15.',
        keyVerse: "In that day I will restore David's fallen shelter—I will repair its broken walls and restore its ruins—and will rebuild it as it used to be.",
        verseReference: "Amos 9:11"},
    ]
  },
  {
    id: 'obadiah',
    name: 'Obadiah',
    order: 31,
    chapters: 1,
    type: 'Minor Prophets',
    overview: [
      'Obadiah is the shortest book in the Old Testament, consisting of a single chapter pronouncing judgment on Edom for their pride and violence against their brother nation Judah. When Jerusalem fell to Babylon, Edom gloated, looted, and cut down fleeing refugees, violating brotherhood ties going back to Esau and Jacob.',
      'The book declares that Edom\'s pride in their mountainous strongholds will not protect them. As they did to others, so it will be done to them. God will bring them down, and nothing will remain of the house of Esau. Meanwhile, Israel will be restored, possessing their inheritance and spreading God\'s kingdom.',
      'Though brief, Obadiah teaches important principles: God judges nations for how they treat His people, pride goes before destruction, and God will vindicate the oppressed. The book ends with the declaration "The kingdom will be the LORD\'s," pointing toward God\'s ultimate reign over all nations.'
    ],
    written: 'c. 586-553 BC',
    timePeriod: 'After Jerusalem\'s fall, 586 BC',
    author: 'Obadiah',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet who proclaimed judgment against Edom for their violence against Judah. His is the shortest book in the Old Testament.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Judgment on Edom\'s Pride',
        chapterRange: '1-9',
        summary: 'God announces judgment on Edom. Their pride deceives them—dwelling in mountain fortresses, they think themselves secure. But God will bring them down. Allies will betray them, their wisdom will fail, and their warriors will be dismayed. Even their hidden treasures will be looted. Nothing will remain of Esau\'s descendants.',
        keyVerse: "The day of the LORD is near for all nations. As you have done, it will be done to you; your deeds will return upon your own head.",
        verseReference: "Obadiah 1:15"},
      {
        number: 2,
        title: 'Edom\'s Sin Against Judah',
        chapterRange: '10-14',
        summary: 'Edom\'s specific crimes are detailed: standing aloof when foreigners attacked Jerusalem, gloating over Judah\'s disaster, looting their wealth, cutting down refugees trying to escape. They should have helped their brother nation instead of joining the attackers. Violence against Jacob will bring shame and destruction to Esau\'s descendants forever.',
        keyVerse: "Because of the violence against your brother Jacob, you will be covered with shame; you will be destroyed forever.",
        verseReference: "Obadiah 1:10"},
      {
        number: 3,
        title: 'The Day of the LORD',
        chapterRange: '15-21',
        summary: 'The day of the LORD is near for all nations. As Edom did, so it will be done to them—their deeds will return on their own heads. While nations drink God\'s judgment, Zion will be delivered and become holy. The house of Jacob will possess their inheritance. Fire will consume Esau. The kingdom will be the LORD\'s.',
        keyVerse: "And the kingdom will be the LORD's.",
        verseReference: "Obadiah 1:21"},
    ]
  },
  {
    id: 'jonah',
    name: 'Jonah',
    order: 32,
    chapters: 4,
    type: 'Minor Prophets',
    overview: [
      'Jonah tells the story of a reluctant prophet who flees from God\'s call to preach to Nineveh, Israel\'s brutal enemy. When God sends a storm, Jonah admits his guilt and is thrown overboard, where a great fish swallows him. After three days, he prays and is vomited onto shore, giving him a second chance.',
      'Jonah finally obeys and preaches in Nineveh. Surprisingly, the entire city repents, from the king to the cattle. God relents from the disaster He planned. But instead of rejoicing, Jonah becomes angry that God showed mercy to Israel\'s enemies. God challenges Jonah\'s narrow view through the object lesson of a plant.',
      'The book reveals God\'s compassion extends beyond Israel to all nations, even wicked Nineveh. It exposes the ugliness of self-righteousness and narrow nationalism. Jonah\'s three days in the fish foreshadow Christ\'s death and resurrection. The book asks: If God can extend mercy to Nineveh, shouldn\'t His people share His heart for the lost?'
    ],
    written: 'c. 785-750 BC',
    timePeriod: 'c. 785-750 BC',
    author: 'Unknown (about Jonah)',
    testament: 'Old Testament' as const,
    authorDescription: "The book tells the story of Jonah the prophet. The author is uncertain, but recounts God's mercy toward Nineveh and His sovereign purposes.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Running from God',
        chapterRange: '1',
        summary: 'God calls Jonah to preach against Nineveh, but Jonah flees toward Tarshish instead. God sends a violent storm. The pagan sailors pray to their gods while Jonah sleeps. They cast lots and discover Jonah is responsible. He tells them to throw him overboard. Reluctantly they do, and the storm stops. They fear the LORD. A great fish swallows Jonah.',
        keyVerse: "But Jonah ran away from the LORD and headed for Tarshish. He went down to Joppa, where he found a ship bound for that port.",
        verseReference: "Jonah 1:3"},
      {
        number: 2,
        title: 'Jonah\'s Prayer',
        chapterRange: '2',
        summary: 'From inside the fish, Jonah prays. He describes his near-death experience and acknowledges God\'s sovereignty. He vows to fulfill what he has promised, recognizing that "salvation comes from the LORD." After three days and nights, the fish vomits Jonah onto dry land. He gets a second chance to obey God\'s call.',
        keyVerse: "When my life was ebbing away, I remembered you, LORD, and my prayer rose to you, to your holy temple.",
        verseReference: "Jonah 2:7"},
      {
        number: 3,
        title: 'Nineveh Repents',
        chapterRange: '3',
        summary: 'God\'s word comes to Jonah a second time. He goes to Nineveh and proclaims, "Forty more days and Nineveh will be overthrown." The Ninevites believe God. They fast and put on sackcloth—from the king to the animals. The king decrees repentance and prayer, hoping God will relent. Seeing their repentance, God has compassion and does not destroy them.',
        keyVerse: "But Nineveh has more than a hundred and twenty thousand people who cannot tell their right hand from their left—and also many animals. Should I not have concern for that great city?",
        verseReference: "Jonah 4:11"},
      {
        number: 4,
        title: 'Jonah\'s Anger',
        chapterRange: '4',
        summary: 'Jonah becomes furious that God spared Nineveh. This is why he fled initially—he knew God was gracious and compassionate. He\'d rather die than see his enemies spared. God provides a plant for shade, then sends a worm to destroy it. Jonah is angry about the plant. God asks: if you care about a plant, shouldn\'t I care about 120,000 people?',
        keyVerse: "He prayed to the LORD, 'Isn't this what I said, LORD, when I was still at home? That is what I tried to forestall by fleeing to Tarshish. I knew that you are a gracious and compassionate God, slow to anger and abounding in love, a God who relents from sending calamity.'",
        verseReference: "Jonah 4:2"},
    ]
  },
  {
    id: 'micah',
    name: 'Micah',
    order: 33,
    chapters: 7,
    type: 'Minor Prophets',
    overview: [
      'Micah prophesies to both Israel and Judah, announcing judgment for injustice, corruption, and false worship. Like Amos, he condemns the powerful for oppressing the poor and vulnerable. Greedy landlords seize fields, corrupt leaders take bribes, and false prophets promise peace for profit. God\'s judgment will come on both kingdoms.',
      'The book alternates between prophecies of judgment and hope. Micah famously predicts that the Messiah will be born in Bethlehem and describes what God truly requires: "To act justly and to love mercy and to walk humbly with your God." True religion involves both ethical behavior and humble devotion.',
      'Micah emphasizes God\'s desire for authentic faith expressed through justice and mercy rather than empty ritual. Though judgment is certain, restoration will follow. A remnant will be saved, the Messiah will come from Bethlehem to shepherd His people, and God will forgive sin and delight in showing mercy.'
    ],
    written: 'c. 735-700 BC',
    timePeriod: 'c. 735-700 BC',
    author: 'Micah',
    testament: 'Old Testament' as const,
    authorDescription: "Contemporary of Isaiah who prophesied judgment and restoration. Foretold the Messiah's birth in Bethlehem and God's requirements for justice.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Judgment on Israel and Judah',
        chapterRange: '1-2',
        summary: 'God comes from His temple to judge the earth, particularly Samaria and Jerusalem. Israel will be destroyed for idolatry. Judah is also condemned—the wealthy oppress the poor, seizing fields and homes. False prophets promise peace. But judgment is coming. Those who plan iniquity will face disaster as they have dealt it to others.',
        keyVerse: "He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.",
        verseReference: "Micah 6:8"},
      {
        number: 2,
        title: 'Corrupt Leaders Condemned',
        chapterRange: '3',
        summary: 'Micah condemns leaders who hate good and love evil, tearing the flesh off God\'s people. They eat their flesh, break their bones, and chop them up. Prophets lead people astray for profit. Therefore, Jerusalem will become rubble and the temple mount a forested hill. Leadership corruption provokes God\'s severe judgment.',
        keyVerse: "But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel.",
        verseReference: "Micah 5:2"},
      {
        number: 3,
        title: 'Future Glory and Messiah',
        chapterRange: '4-5',
        summary: 'Despite present judgment, future glory awaits. The temple mountain will be exalted; nations will stream to it. God will teach His ways. Swords will become plowshares. But first comes exile. From Bethlehem, insignificant among Judah\'s clans, will come a ruler—the Messiah who will shepherd Israel and be their peace. A remnant will be saved.',
        keyVerse: "He will stand and shepherd his flock in the strength of the LORD, in the majesty of the name of the LORD his God. And they will live securely, for then his greatness will reach to the ends of the earth.",
        verseReference: "Micah 5:4"},
      {
        number: 4,
        title: 'God\'s Case and Compassion',
        chapterRange: '6-7',
        summary: 'God brings His case against Israel, reminding them of His past faithfulness. What does God require? "To act justly and to love mercy and to walk humbly with your God." Not sacrifice, but justice and humility. Though society is corrupt and faithful people scarce, Micah will watch in hope. God will forgive sin and cast it into the sea. Who is a God like Him, delighting in mercy?',
        keyVerse: "Who is a God like you, who pardons sin and forgives the transgression of the remnant of his inheritance? You do not stay angry forever but delight to show mercy.",
        verseReference: "Micah 7:18"
      }
    ]
  },
  {
    id: 'nahum',
    name: 'Nahum',
    order: 34,
    chapters: 3,
    type: 'Minor Prophets',
    overview: [
      'Nahum prophesies the complete destruction of Nineveh, the capital of Assyria, which had brutalized nations for centuries. About 150 years after Nineveh repented under Jonah\'s preaching, the city has returned to extreme violence and wickedness. God announces that their time has come—judgment is imminent and final.',
      'The book is a poem of vivid, violent imagery describing Nineveh\'s fall. The prophet describes God as jealous for His people, slow to anger but great in power, who will not leave the guilty unpunished. Though He uses nations as instruments of judgment, He will also judge them for their excessive cruelty and pride.',
      'Nahum teaches that God is patient, but His patience has limits. He is the defender of the oppressed and judge of oppressors. While the book seems harsh, it brought comfort to Judah, who had suffered under Assyrian brutality. God sees, remembers, and will bring justice against evil empires that afflict His people.'
    ],
    written: 'c. 663-612 BC',
    timePeriod: 'Before Nineveh\'s fall, 612 BC',
    author: 'Nahum',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet who announced the destruction of Nineveh about 150 years after Jonah. Proclaimed God's justice against oppressive nations.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'God\'s Character and Nineveh\'s Doom',
        chapterRange: '1',
        summary: 'The LORD is jealous and avenging, slow to anger yet great in power. He will not leave the guilty unpunished. His way is in the whirlwind and storm. Though He is good and a refuge in trouble, He will pursue His enemies into darkness. Nineveh\'s destruction is decreed. Good news comes to Judah: the wicked one will be completely destroyed.',
        keyVerse: "The LORD is good, a refuge in times of trouble. He cares for those who trust in him.",
        verseReference: "Nahum 1:7"},
      {
        number: 2,
        title: 'Nineveh\'s Fall Described',
        chapterRange: '2',
        summary: 'Nahum vividly describes Nineveh\'s siege and fall: shields of soldiers, chariots racing, officers stumbling, defenses breached. The city is plundered and hearts melt with fear. Where is the lions\' den now? The once-proud empire that devoured nations will be devoured. God declares He is against them. Their stronghold has fallen like ripe figs into an open mouth.',
        keyVerse: "Woe to the city of blood, full of lies, full of plunder, never without victims!",
        verseReference: "Nahum 3:1"},
      {
        number: 3,
        title: 'Nineveh\'s Wickedness and Shame',
        chapterRange: '3',
        summary: 'Woe to the city of blood, full of lies and plunder. Nineveh is like a prostitute whose witchcraft enslaved nations. God will expose her shame to all. Just as Nineveh celebrated Thebes\' fall, now all who hear of Nineveh\'s collapse will applaud. Who has not felt their endless cruelty? Their wound is fatal; there is no healing.',
        keyVerse: "Everyone who hears the news about you claps their hands at your fall, for who has not felt your endless cruelty?",
        verseReference: "Nahum 3:19"},
    ]
  },
  {
    id: 'habakkuk',
    name: 'Habakkuk',
    order: 35,
    chapters: 3,
    type: 'Minor Prophets',
    overview: [
      'Habakkuk wrestles with profound questions about God\'s justice. Unlike other prophets who speak God\'s words to the people, Habakkuk questions God directly: Why does violence and injustice go unpunished in Judah? When God answers that He will use the Babylonians to judge Judah, Habakkuk protests that the cure seems worse than the disease. How can a holy God use a nation more wicked than Judah?',
      'God responds that He will ultimately judge Babylon too. The righteous must live by faith, trusting God\'s purposes even when circumstances seem contradictory. Though judgment is coming, God remains in control. Five woes are pronounced against Babylon\'s greed, violence, and idolatry. Meanwhile, "the earth will be filled with the knowledge of the glory of the LORD."',
      'Habakkuk demonstrates that honest questions are acceptable to God. Faith doesn\'t mean having all the answers but trusting God\'s character when nothing makes sense. The book ends with Habakkuk\'s stunning declaration of faith: even if everything fails, "yet I will rejoice in the LORD." This is the essence of living by faith.'
    ],
    written: 'c. 609-605 BC',
    timePeriod: 'c. 609-605 BC',
    author: 'Habakkuk',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet who questioned God about injustice and received answers about faith and judgment. Learned to trust God's sovereignty and timing.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'First Complaint and Answer',
        chapterRange: '1:1-11',
        summary: 'Habakkuk cries out: How long must I call for help while violence and injustice prevail? Why do you tolerate wrong? God answers: I am raising up the Babylonians to bring judgment. They are fierce, impetuous, dreaded, and feared. They sweep across nations like the wind, taking captives. Their own might is their god.',
        keyVerse: "How long, LORD, must I call for help, but you do not listen? Or cry out to you, 'Violence!' but you do not save?",
        verseReference: "Habakkuk 1:2"},
      {
        number: 2,
        title: 'Second Complaint and Answer',
        chapterRange: '1:12-2:20',
        summary: 'Habakkuk protests: You are pure and cannot tolerate wrong, so why use wicked Babylon to punish those more righteous than they? God tells him to write the vision: the righteous will live by faith. Babylon will be judged for greed, violence, and idolatry. Five woes follow: against plundering, unjust gain, violence, drunken shame, and idolatry. The LORD is in His holy temple.',
        keyVerse: "The righteous person will live by his faithfulness.",
        verseReference: "Habakkuk 2:4"},
      {
        number: 3,
        title: 'Habakkuk\'s Prayer of Faith',
        chapterRange: '3',
        summary: 'Habakkuk prays, recounting God\'s mighty acts in history: delivering Israel, shaking mountains, splitting the earth. He trembles at the coming judgment but resolves to wait patiently. His stunning conclusion: though everything fails—no figs, grapes, olives, food, sheep, or cattle—yet I will rejoice in the LORD. God is my strength. He makes me walk on heights. Faith triumphs.',
        keyVerse: "Yet I will rejoice in the LORD, I will be joyful in God my Savior.",
        verseReference: "Habakkuk 3:18"}
    ]
  },
  {
    id: 'zephaniah',
    name: 'Zephaniah',
    order: 36,
    chapters: 3,
    type: 'Minor Prophets',
    overview: [
      'Zephaniah prophesies during Judah\'s darkest spiritual period under King Manasseh and early in Josiah\'s reign, before his reforms. The prophet announces the coming "day of the LORD"—a day of wrath and distress when God will sweep away everything from the earth because of rampant idolatry, syncretism, and complacency.',
      'The book extends judgment beyond Judah to surrounding nations, emphasizing that God\'s day of judgment is universal. Yet after pronouncing doom, Zephaniah shifts to hope: a humble remnant will be saved, purified, and restored. God will quiet them with His love and rejoice over them with singing.',
      'Zephaniah teaches that God will judge both His people and the nations for sin. Complacency and compromise bring disaster. Yet God\'s purposes include purification and restoration. The day of the LORD brings terror for the unrepentant but hope for the humble remnant who trust in God\'s name.'
    ],
    written: 'c. 640-627 BC',
    timePeriod: 'c. 640-627 BC',
    author: 'Zephaniah',
    testament: 'Old Testament' as const,
    authorDescription: "Prophet who warned of the Day of the Lord's judgment but also promised restoration. Called for humble seeking of God.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Judgment on Judah',
        chapterRange: '1',
        summary: 'God will sweep away everything from the earth. He will punish Judah for Baal worship, syncretism, and complacency. Those who say "The LORD will do nothing" will face disaster. The great day of the LORD is near—a day of wrath, distress, and darkness. Neither silver nor gold will save them. The whole earth will be consumed in the fire of God\'s jealous wrath.',
        keyVerse: "The great day of the LORD is near—near and coming quickly. The cry on the day of the LORD is bitter; the Mighty Warrior shouts his battle cry.",
        verseReference: "Zephaniah 1:14"},
      {
        number: 2,
        title: 'Judgment on Nations',
        chapterRange: '2',
        summary: 'Zephaniah calls for repentance before the decree takes effect: seek the LORD, seek righteousness and humility. Perhaps you will be sheltered. Judgment extends to surrounding nations: Philistia will be destroyed, Moab and Ammon will become like Sodom, Cush will be slain, and Assyria will be utterly desolate. Nineveh, the carefree city, will become a wasteland.',
        keyVerse: "Seek the LORD, all you humble of the land, you who do what he commands. Seek righteousness, seek humility; perhaps you will be sheltered on the day of the LORD's anger.",
        verseReference: "Zephaniah 2:3"},
      {
        number: 3,
        title: 'Woe and Restoration',
        chapterRange: '3',
        summary: 'Woe to Jerusalem—oppressive, rebellious, and defiled. Her leaders are predators; her prophets are treacherous. Yet God will purify the nations and restore a remnant. The humble and lowly will take refuge in the LORD\'s name. Israel will be cleansed, restored, and renewed. God will rejoice over them with singing. He will bring them home and make them renowned and praised.',
        keyVerse: "The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.",
        verseReference: "Zephaniah 3:17"}
    ]
  },
  {
    id: 'haggai',
    name: 'Haggai',
    order: 37,
    chapters: 2,
    type: 'Minor Prophets',
    overview: [
      'Haggai prophesies to the returned exiles who have stopped rebuilding the temple due to opposition and discouragement. Sixteen years after laying the foundation, the work remains incomplete while the people focus on their own comfortable houses. Haggai challenges them: "Is it time for you to dwell in paneled houses while this house remains a ruin?"',
      'The prophet connects their economic struggles to misplaced priorities. They have sown much but harvested little because they neglected God\'s house. Haggai calls them to resume building, and the people respond under Zerubbabel\'s leadership. When some despise the modest new temple compared to Solomon\'s, God promises His glory will fill this house.',
      'Haggai teaches that God must be first in our priorities. When we put Him first, He provides for our needs. The book demonstrates that God uses prophetic preaching to motivate His people toward obedience. Despite present difficulties, God is faithful to His promises and will accomplish His purposes through His chosen servant.'
    ],
    written: 'c. 520 BC',
    timePeriod: '520 BC',
    author: 'Haggai',
    testament: 'Old Testament' as const,
    authorDescription: "Post-exilic prophet who urged the returned exiles to rebuild the temple. Encouraged the people to prioritize God's house and kingdom.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Call to Rebuild',
        chapterRange: '1',
        summary: 'God\'s word comes through Haggai: the people say it\'s not time to rebuild the temple, yet they live in paneled houses while God\'s house lies in ruins. This is why they work hard but have little—they have neglected God\'s priorities. "Give careful thought to your ways." Build the temple. The people respond; the leaders and remnant obey God\'s voice and begin work.',
        keyVerse: "Give careful thought to your ways. You have planted much, but harvested little.",
        verseReference: "Haggai 1:5-6"},
      {
        number: 2,
        title: 'Promised Glory',
        chapterRange: '2:1-9',
        summary: 'Some remember Solomon\'s temple and despise this modest structure. But God says, "Be strong and work, for I am with you." In a little while, He will shake the heavens and earth. The desired of all nations will come. This house will be filled with glory greater than the former temple. God will grant peace in this place.',
        keyVerse: "'The glory of this present house will be greater than the glory of the former house,' says the LORD Almighty.",
        verseReference: "Haggai 2:9"},
      {
        number: 3,
        title: 'Blessings Promised',
        chapterRange: '2:10-19',
        summary: 'God teaches through a priestly ruling: defilement is more contagious than holiness. So Israel\'s past disobedience defiled their offerings. But from this day forward, since they have resumed building, God will bless them. Though seed is still in the barn and vines have not yet produced, from this day God will bless. Priorities determine outcomes.',
        keyVerse: "'From this day on I will bless you.'",
        verseReference: "Haggai 2:19"},
      {
        number: 4,
        title: 'Zerubbabel Chosen',
        chapterRange: '2:20-23',
        summary: 'God promises to shake the heavens and earth, overthrowing kingdoms. On that day, He will take Zerubbabel, His servant, and make him like a signet ring, for He has chosen him. This promise points beyond Zerubbabel to the Messiah from David\'s line who will reign forever. God remains faithful to His covenant promises.',
        keyVerse: "'On that day,' declares the LORD Almighty, 'I will take you, my servant Zerubbabel son of Shealtiel,' declares the LORD, 'and I will make you like my signet ring, for I have chosen you,' declares the LORD Almighty.",
        verseReference: "Haggai 2:23"},
    ]
  },
  {
    id: 'zechariah',
    name: 'Zechariah',
    order: 38,
    chapters: 14,
    type: 'Minor Prophets',
    overview: [
      'Zechariah prophesies alongside Haggai, encouraging the returned exiles to complete the temple. Through eight night visions, he communicates God\'s plans for Israel\'s restoration and addresses their fears. The visions assure them that God has not forgotten His promises despite their current humble circumstances.',
      'The book is deeply messianic, containing more prophecies about Christ than any minor prophet. Zechariah foretells the Messiah entering Jerusalem on a donkey, being betrayed for thirty pieces of silver, having His hands pierced, and bringing salvation as a shepherd-king. He will come in two distinct ways: first as a suffering servant, later as triumphant king.',
      'Zechariah emphasizes that God will accomplish His purposes not by human might or power but by His Spirit. The temple will be rebuilt, Jerusalem restored, and ultimately God will dwell with His people. The day of the LORD will bring judgment on nations and salvation for Israel. God\'s kingdom will be established over all the earth.'
    ],
    written: 'c. 520-480 BC',
    timePeriod: '520-480 BC',
    author: 'Zechariah',
    testament: 'Old Testament' as const,
    authorDescription: "Contemporary of Haggai who encouraged temple rebuilding through visions and prophecies. Foretold the coming of the Messiah-King.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Call to Repentance and Night Visions',
        chapterRange: '1-6',
        summary: 'Zechariah calls for repentance, warning not to repeat ancestors\' mistakes. Then he receives eight night visions: horsemen reporting peace, horns and craftsmen representing nations, a man with a measuring line (Jerusalem\'s future expansion), Joshua the high priest cleansed and crowned, a gold lampstand (not by might but by Spirit), a flying scroll, a woman in a basket (wickedness removed), and chariots patrolling the earth.',
        keyVerse: "'Return to me,' declares the LORD Almighty, 'and I will return to you,' says the LORD Almighty.",
        verseReference: "Zechariah 1:3"},
      {
        number: 2,
        title: 'Questions About Fasting',
        chapterRange: '7-8',
        summary: 'People question whether to continue fasting now that the temple is being rebuilt. God responds: those fasts were for yourselves, not Him. What He desires is justice, mercy, and compassion. Don\'t oppress the vulnerable. God will return to Zion and dwell in Jerusalem. The city will be filled with people, and nations will seek the LORD in Jerusalem.',
        keyVerse: "'Not by might nor by power, but by my Spirit,' says the LORD Almighty.",
        verseReference: "Zechariah 4:6"},
      {
        number: 3,
        title: 'Judgment on Nations',
        chapterRange: '9-11',
        summary: 'Oracles announce judgment on surrounding nations. Then comes a beautiful messianic prophecy: "Rejoice greatly, Daughter Zion! Your king comes to you, gentle and riding on a donkey." God will shepherd His flock but the people will reject the good shepherd. Thirty pieces of silver—the price of a slave—will be thrown to the potter in the house of the LORD.',
        keyVerse: "Rejoice greatly, Daughter Zion! Shout, Daughter Jerusalem! See, your king comes to you, righteous and victorious, lowly and riding on a donkey.",
        verseReference: "Zechariah 9:9"},
      {
        number: 4,
        title: 'Israel\'s Future Deliverance',
        chapterRange: '12-14',
        summary: 'God will make Jerusalem an immovable rock; nations that attack it will be injured. He will pour out a spirit of grace and supplication. They will look on the one they have pierced and mourn. A fountain will be opened for sin and impurity. The LORD will come with His holy ones. Living water will flow from Jerusalem. The LORD will be king over all the earth.',
        keyVerse: "And I will pour out on the house of David and the inhabitants of Jerusalem a spirit of grace and supplication. They will look on me, the one they have pierced, and they will mourn for him.",
        verseReference: "Zechariah 12:10"}
    ]
  },
  {
    id: 'malachi',
    name: 'Malachi',
    order: 39,
    chapters: 4,
    type: 'Minor Prophets',
    overview: [
      'Malachi is the final prophetic voice in the Old Testament, speaking about 100 years after the return from exile. The temple has been rebuilt, but spiritual apathy has set in. The people question God\'s love and justice, offer defiled sacrifices, divorce their wives, and rob God by withholding tithes. Priests fail in their duties and lead people astray.',
      'The book takes the form of a dialogue where God states a charge and the people question it. God demonstrates His love, challenges their cynicism, and warns of coming judgment. Yet He also promises that Elijah will come before the great day of the LORD to turn hearts back to God. Those who revere God\'s name will be His treasured possession.',
      'Malachi closes the Old Testament by pointing forward: a messenger will prepare the way, the Lord will suddenly come to His temple, and the sun of righteousness will arise with healing in its wings. After Malachi, four hundred years of prophetic silence will follow until John the Baptist announces that the promises are about to be fulfilled.'
    ],
    written: 'c. 450-430 BC',
    timePeriod: 'c. 450-430 BC',
    author: 'Malachi',
    testament: 'Old Testament' as const,
    authorDescription: "Last prophet of the Old Testament who called for faithfulness in worship and life. Promised the coming of Elijah before the Day of the Lord.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'God\'s Love Questioned',
        chapterRange: '1:1-5',
        summary: 'God declares His love for Israel, but they ask, "How have you loved us?" God answers: I chose Jacob over Esau. Edom is destroyed while Israel is restored. Israel will see this and say, "Great is the LORD beyond the borders of Israel." God\'s love is demonstrated through His electing grace and faithfulness to His covenant.',
        keyVerse: "'A son honors his father, and a slave his master. If I am a father, where is the honor due me? If I am a master, where is the respect due me?' says the LORD Almighty.",
        verseReference: "Malachi 1:6"},
      {
        number: 2,
        title: 'Defiled Sacrifices',
        chapterRange: '1:6-2:9',
        summary: 'Priests despise God\'s name by offering defective sacrifices—blind, lame, and diseased animals. Would they dare give such gifts to their governor? God desires sincere worship. Priests have failed to teach truth and have caused many to stumble. They show partiality in matters of law. Therefore, God will make them despised before all people.',
        keyVerse: "'But for you who revere my name, the sun of righteousness will rise with healing in its rays. And you will go out and frolic like well-fed calves.'",
        verseReference: "Malachi 4:2"},
      {
        number: 3,
        title: 'Faithless Marriages',
        chapterRange: '2:10-16',
        summary: 'Judah has broken faith by marrying foreign women who worship other gods. Men divorce their wives to marry younger women. God declares He hates divorce because it does violence to one\'s partner. They cover the LORD\'s altar with tears and weeping because He no longer accepts their offerings. Guard yourselves in your spirit; do not break faith.',
        keyVerse: "'The man who hates and divorces his wife,' says the LORD, the God of Israel, 'does violence to the one he should protect,' says the LORD Almighty.",
        verseReference: "Malachi 2:16"},
      {
        number: 4,
        title: 'Where is the God of Justice?',
        chapterRange: '2:17-3:5',
        summary: 'The people weary God by saying, "Where is the God of justice?" God responds: The messenger will prepare the way before Me. Then the Lord will suddenly come to His temple—the messenger of the covenant you desire. He will be like refiner\'s fire, purifying the Levites. Then the LORD will judge sorcerers, adulterers, perjurers, and those who oppress workers and the vulnerable.',
        keyVerse: "'See, I will send my messenger, who will prepare the way before me. Then suddenly the Lord you are seeking will come to his temple; the messenger of the covenant, whom you desire, will come,' says the LORD Almighty.",
        verseReference: "Malachi 3:1"},
      {
        number: 5,
        title: 'Robbing God',
        chapterRange: '3:6-12',
        summary: 'God charges: "You rob me in tithes and offerings." Bring the whole tithe to the storehouse so there will be food in God\'s house. Test Him in this, and see if He won\'t throw open heaven\'s floodgates and pour out blessing. He will prevent pests from destroying crops. All nations will call you blessed, for your land will be delightful.',
        keyVerse: "Bring the whole tithe into the storehouse, that there may be food in my house. Test me in this,' says the LORD Almighty, 'and see if I will not throw open the floodgates of heaven and pour out so much blessing that there will not be room enough to store it.'",
        verseReference: "Malachi 3:10"},
      {
        number: 6,
        title: 'The Day of the LORD',
        chapterRange: '3:13-4:6',
        summary: 'Arrogant people say it\'s futile to serve God. But those who fear the LORD speak together, and God listens. They will be His treasured possession. The day is coming that will burn like a furnace—the arrogant and evildoers will be stubble. But for those who revere God\'s name, the sun of righteousness will rise with healing. Elijah will come before the great day, turning hearts to prevent a curse.',
        keyVerse: "'Surely the day is coming; it will burn like a furnace. All the arrogant and every evildoer will be stubble, and the day that is coming will set them on fire,' says the LORD Almighty.",
        verseReference: "Malachi 4:1"},
    ]
  },
];
