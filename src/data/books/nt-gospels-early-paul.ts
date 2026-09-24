import { Book } from '../types/book';

export const ntGospelsEarlyPaul: Book[] = [
  {
    id: 'matthew',
    name: 'Matthew',
    order: 40,
    chapters: 28,
    type: 'Gospel',
    overview: [
      'Matthew is believed to be the earliest Gospel and Focuses heavily on Jesus\' actions and the final week.',
      'Likely tied to Peter\'s eyewitness testimony. Matthew presents Jesus as the promised Messiah and King of Israel, the fulfillment of Old Testament prophecy. Written primarily for a Jewish audience, the gospel demonstrates Jesus\' credentials through genealogy, miracles, and teaching. It emphasizes that Jesus is the new Moses, delivering a new law from a mountain and establishing a new covenant.',
      'The book is carefully structured around five major teaching sections, echoing the five books of Moses. Jesus\' Sermon on the Mount outlines kingdom ethics that turn worldly values upside down. Throughout, Matthew shows how Jesus fulfills Scripture: born of a virgin in Bethlehem, called out of Egypt, announcing the kingdom, performing messianic signs, and ultimately dying and rising as prophesied.',
      'Matthew concludes with Jesus\' Great Commission to make disciples of all nations. Though Israel\'s leaders rejected their King, His kingdom continues advancing through His followers who obey His teachings. The gospel emphasizes that Jesus has all authority in heaven and earth and promises to be with His people always, until the end of the age.'
    ],
    written: 'c. 55-65 AD',
    timePeriod: 'c. 5 BC - 30 AD',
    author: 'Matthew',
    testament: 'New Testament' as const,
    authorDescription: "Tax collector called by Jesus to be one of the twelve apostles. Wrote primarily to Jewish readers to prove Jesus is the Messiah.",
    imageUrl: '/images/bible-books/matthew.jpg',
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Birth and Early Years',
        chapterRange: '1-4',
        summary: 'Matthew traces Jesus\' genealogy through David and Abraham, establishing His messianic credentials. He is born of a virgin in Bethlehem, visited by magi, and forced to flee to Egypt—fulfilling multiple prophecies. John the Baptist prepares the way. Jesus is baptized and tempted in the wilderness. He begins His Galilean ministry, calling disciples and proclaiming, "Repent, for the kingdom of heaven is near."',
        keyVerse: "She will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins.",
        verseReference: "Matthew 1:21"},
      {
        number: 2,
        title: 'Kingdom Teaching',
        chapterRange: '5-7',
        summary: 'Jesus delivers the Sermon on the Mount, outlining kingdom ethics. The Beatitudes describe citizens of God\'s kingdom. Jesus clarifies the law\'s intent, calling for righteousness exceeding that of Pharisees. He teaches about prayer, fasting, anxiety, judgment, and building life on His words. The crowds are amazed at His authority, unlike their teachers.',
        keyVerse: "Blessed are the poor in spirit, for theirs is the kingdom of heaven.",
        verseReference: "Matthew 5:3"},
      {
        number: 3,
        title: 'Kingdom Power',
        chapterRange: '8-10',
        summary: 'Jesus demonstrates kingdom authority through miracles: healing lepers, paralytics, and the demon-possessed; calming storms; and raising the dead. He calls Matthew and defends eating with sinners. He commissions twelve apostles, sending them to preach, heal, and cast out demons. He warns of coming persecution but promises the Father\'s care and ultimate vindication for faithful witnesses.',
        keyVerse: "This, then, is how you should pray: 'Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven.'",
        verseReference: "Matthew 6:9-10"},
      {
        number: 4,
        title: 'Growing Opposition',
        chapterRange: '11-16',
        summary: 'John the Baptist questions if Jesus is the Messiah; Jesus affirms through His works. Opposition intensifies as Pharisees accuse Him of working by Satan\'s power. Jesus teaches in parables, explaining kingdom mysteries. He feeds 5,000 and walks on water. Peter confesses Jesus is the Christ. Jesus predicts His death and resurrection, rebuking Peter for opposing God\'s plan.',
        keyVerse: "For the Son of Man came to seek and to save the lost.",
        verseReference: "Matthew 18:11"},
      {
        number: 5,
        title: 'Journey to Jerusalem',
        chapterRange: '17-20',
        summary: 'Jesus is transfigured before Peter, James, and John. He teaches about faith, forgiveness, divorce, and children. A rich young ruler walks away sad. Jesus again predicts His death. He enters Jerusalem on a donkey as crowds shout "Hosanna to the Son of David!" He cleanses the temple and teaches with authority, confounding His opponents through parables and wisdom.',
        keyVerse: "'Teacher, which is the greatest commandment in the Law?' Jesus replied: 'Love the Lord your God with all your heart and with all your soul and with all your mind.'",
        verseReference: "Matthew 22:36-37"},
      {
        number: 6,
        title: 'Death and Resurrection',
        chapterRange: '21-28',
        summary: 'Religious leaders plot to kill Jesus. He shares the Last Supper, is betrayed by Judas, and arrested. Peter denies Him. Jesus is tried, mocked, and crucified. He dies, is buried, and rises on the third day. He appears to His disciples and commissions them to make disciples of all nations, promising His presence always. The King has conquered death.',
        keyVerse: "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit.",
        verseReference: "Matthew 28:19"}
    ]
  },
  {
    id: 'mark',
    name: 'Mark',
    order: 41,
    chapters: 16,
    type: 'Gospel',
    overview: [
      'Mark presents Jesus as the suffering Servant of God who came not to be served but to serve and give His life as a ransom for many. The shortest gospel, it moves at a rapid pace, emphasizing action and Jesus\' mighty deeds. Mark repeatedly shows Jesus teaching with authority, healing the sick, casting out demons, and demonstrating power over nature.',
      'A central theme is the nature of discipleship: following Jesus means taking up one\'s cross and losing one\'s life to save it. The disciples consistently misunderstand Jesus\' mission, expecting a conquering king rather than a suffering servant. Peter\'s confession marks a turning point where Jesus clearly predicts His death and resurrection three times.',
      'Mark emphasizes the "messianic secret"—Jesus repeatedly tells people not to reveal His identity, yet demons recognize Him immediately. The gospel climaxes with Jesus\' death, where a Roman centurion declares, "Surely this man was the Son of God!" Mark shows that Jesus\' identity is fully revealed through His sacrificial death, not merely His miracles.'
    ],
    written: 'c. 60-70 AD',
    timePeriod: 'c. 5 BC - 30 AD',
    author: 'John Mark',
    testament: 'New Testament' as const,
    authorDescription: "Companion of Peter and later of Paul. Wrote the earliest Gospel with emphasis on Jesus' actions and servanthood.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Ministry Begins',
        chapterRange: '1-3',
        summary: 'Mark opens with John the Baptist preparing the way. Jesus is baptized and tempted. He begins preaching in Galilee, calling disciples and teaching with authority. He casts out demons, heals many, and cleanses a leper. When questioned about fasting and Sabbath, He asserts His authority. His fame spreads, and crowds follow. Pharisees begin plotting against Him.',
        keyVerse: "'The time has come,' he said. 'The kingdom of God has come near. Repent and believe the good news!'",
        verseReference: "Mark 1:15"},
      {
        number: 2,
        title: 'Parables and Miracles',
        chapterRange: '4-8',
        summary: 'Jesus teaches in parables about the kingdom. He calms a storm, casts out a legion of demons, heals a bleeding woman, and raises Jairus\' daughter. He sends out the twelve and feeds 5,000. He walks on water, debates Pharisees about traditions, heals a deaf man, and feeds 4,000. Peter confesses Jesus is the Christ. Jesus predicts His death.',
        keyVerse: "Whoever wants to be my disciple must deny themselves and take up their cross and follow me.",
        verseReference: "Mark 8:34"},
      {
        number: 3,
        title: 'Journey to Jerusalem',
        chapterRange: '9-10',
        summary: 'Jesus is transfigured on the mountain. He casts out a demon the disciples couldn\'t. He teaches about humility, causes of sin, divorce, and children. A rich man asks about eternal life but walks away sad. Jesus again predicts His death. James and John seek positions of honor; Jesus teaches that greatness comes through serving. He heals blind Bartimaeus.',

        keyVerse: "For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.",
        verseReference: "Mark 10:45"},
        
      {
        number: 4,
        title: 'Passion Week',
        chapterRange: '11-15',
        summary: 'Jesus enters Jerusalem triumphantly. He cleanses the temple, curses a fig tree, and teaches with authority. Religious leaders challenge Him but are confounded. He shares the Last Supper, predicts His betrayal, and prays in Gethsemane. Judas betrays Him; Peter denies Him. Jesus is tried, mocked, crucified, and buried. The curtain of the temple tears in two.',
        keyVerse: "And when the centurion, who stood there in front of Jesus, saw how he died, he said, 'Surely this man was the Son of God!'",
        verseReference: "Mark 15:39"
      },
      {
        number: 5,
        title: 'Resurrection',
        chapterRange: '16',
        summary: 'Women discover the empty tomb. A young man in white tells them Jesus has risen and will meet disciples in Galilee. The women flee in fear and say nothing. In the longer ending, Jesus appears to Mary Magdalene, two disciples, and the eleven. He commissions them to preach the gospel to all creation. He ascends to heaven and the disciples go out preaching everywhere.',
        keyVerse: "Don't be alarmed,' he said. 'You are looking for Jesus the Nazarene, who was crucified. He has risen! He is not here. See the place where they laid him.'",
        verseReference: "Mark 16:6"
      }
    ]
  },
  {
    id: 'luke',
    name: 'Luke',
    order: 42,
    chapters: 24,
    type: 'Gospel',
    overview: [
      'Luke presents Jesus as the perfect Son of Man who came to seek and save the lost. Written by a physician for a Gentile audience, Luke emphasizes Jesus\' compassion for the marginalized: women, children, the poor, and social outcasts. The gospel is carefully researched, organized chronologically, and emphasizes prayer, the Holy Spirit, and joy.',
      'Luke alone records parables like the Good Samaritan, the Prodigal Son, the Rich Man and Lazarus, highlighting God\'s love for the outcast and warning against wealth and self-righteousness. The birth narrative is fuller than other gospels, including Mary\'s Magnificat and the angels\' announcement to shepherds. Women play prominent roles throughout.',
      'The gospel emphasizes Jesus\' journey to Jerusalem, where He will accomplish the exodus predicted by Moses and the prophets. Luke shows Jesus as the universal Savior whose message extends beyond Israel to all nations. The book ends with resurrection appearances and Jesus\' ascension, promising the Holy Spirit and commissioning witnesses to all nations.'
    ],
    written: 'c. 60-62 AD',
    timePeriod: 'c. 5 BC - 30 AD',
    author: 'Luke',
    testament: 'New Testament' as const,
    authorDescription: "Gentile physician and companion of Paul. Carefully researched and wrote an orderly account of Jesus' life and the early church.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Birth Narratives',
        chapterRange: '1-2',
        summary: 'Luke carefully investigates and writes an orderly account. Angels announce the births of John the Baptist and Jesus. Mary visits Elizabeth; both women praise God. John is born; Zechariah prophesies. Jesus is born in Bethlehem, announced by angels to shepherds. Simeon and Anna recognize the infant Messiah. At twelve, Jesus amazes teachers in the temple.',
        keyVerse: "For the Son of Man came to seek and to save the lost.",
        verseReference: "Luke 19:10"},
      {
        number: 2,
        title: 'Preparation and Early Ministry',
        chapterRange: '3-9:50',
        summary: 'John prepares the way. Jesus is baptized, tested in the wilderness, and begins His Galilean ministry. He announces His mission from Isaiah: good news to the poor, freedom for prisoners, sight to the blind. He teaches, heals, calls disciples, and demonstrates authority. Peter confesses Him as the Christ. Jesus is transfigured and predicts His death.',
        keyVerse: "But God said to him, 'You fool! This very night your life will be demanded from you. Then who will get what you have prepared for yourself?'",
        verseReference: "Luke 12:20"},
      {
        number: 3,
        title: 'Journey to Jerusalem',
        chapterRange: '9:51-19:27',
        summary: 'Jesus resolutely sets out for Jerusalem. This long section contains much unique material: sending seventy-two disciples, parables of the Good Samaritan and Prodigal Son, teaching on prayer and the kingdom, warnings about money and self-righteousness, healing on the Sabbath, teaching about the narrow door, and stories emphasizing God\'s love for the lost.',
        keyVerse: "For this son of mine was dead and is alive again; he was lost and is found.' So they began to celebrate.",
        verseReference: "Luke 15:24"},
      {
        number: 4,
        title: 'Ministry in Jerusalem',
        chapterRange: '19:28-21:38',
        summary: 'Jesus enters Jerusalem on a donkey. He weeps over the city, cleanses the temple, and teaches daily. Leaders question His authority. He tells parables condemning them, debates about taxes and resurrection, and warns of scribes. He commends the widow\'s offering and predicts Jerusalem\'s destruction and His return. Despite opposition, people gather daily to hear Him.',
        keyVerse: "He is not here; he has risen! Remember how he told you, while he was still with you in Galilee.",
        verseReference: "Luke 24:6"},
      {
        number: 5,
        title: 'Passion and Resurrection',
        chapterRange: '22-24',
        summary: 'Jesus shares the Last Supper, establishing the new covenant. He prays in Gethsemane, is betrayed, arrested, and denied by Peter. He is tried, mocked, and crucified between two criminals. One thief repents and Jesus promises him paradise. Jesus dies, is buried, and rises. He appears to disciples, explains Scripture, and ascends, blessing them. They worship with great joy.',
        keyVerse: "Jesus answered him, 'Truly I tell you, today you will be with me in paradise.'",
        verseReference: "Luke 23:43"
      }
    ]
  },
  {
    id: 'john',
    name: 'John',
    order: 43,
    chapters: 21,
    type: 'Gospel',
    overview: [
      'John presents Jesus as the divine Son of God who existed with the Father from eternity. The gospel is deliberately theological, selecting seven miraculous signs and extended discourses to demonstrate that Jesus is God incarnate. John emphasizes believing in Jesus for eternal life, using "believe" nearly 100 times.',
      'The book opens with the magnificent prologue: "In the beginning was the Word, and the Word was with God, and the Word was God." John connects Jesus to creation, light, and life. Throughout, Jesus makes stunning "I Am" statements claiming deity: I Am the Bread of Life, Light of the World, Good Shepherd, Resurrection and Life, Way Truth and Life, True Vine.',
      'John\'s gospel is deeply personal, emphasizing the love relationship between Father, Son, and believers. The extended Upper Room discourse reveals Jesus\' heart for His followers and promises the Holy Spirit as Comforter. John concludes that these things are written that readers may believe Jesus is the Christ and have life in His name.'
    ],
    written: 'c. 70-90 AD',
    timePeriod: 'c. 5 BC - 30 AD',
    author: 'John',
    testament: 'New Testament' as const,
    authorDescription: "Fisherman, son of Zebedee, and one of Jesus' closest disciples. Called the beloved disciple, he wrote extensively about love and eternal life.",
    bibleVersion: 'NIV',
    imageUrl: 'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800',
    structure: [
      {
        number: 1,
        title: 'Prologue and Early Signs',
        chapterRange: '1-4',
        summary: 'The Word became flesh and dwelt among us. John the Baptist testifies to Jesus, the Lamb of God. Jesus calls disciples. At Cana, He turns water to wine—the first sign. He cleanses the temple and speaks with Nicodemus about being born again. John decreases as Jesus increases. Jesus speaks with the Samaritan woman at the well and heals an official\'s son.',
        keyVerse: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        verseReference: "John 1:1"},
      {
        number: 2,
        title: 'Controversies and Claims',
        chapterRange: '5-10',
        summary: 'Jesus heals on the Sabbath, claiming equality with God. He feeds 5,000 and claims to be the bread of life. At the Feast of Tabernacles, He proclaims Himself the light of the world and makes "I am" statements. He heals a blind man, causing division. He claims to be the good shepherd who lays down His life for the sheep. Many believe; others call Him demon-possessed.',
        keyVerse: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
        verseReference: "John 3:16"},
      {
        number: 3,
        title: 'The Final Sign',
        chapterRange: '11-12',
        summary: 'Jesus raises Lazarus from the dead, the seventh and greatest sign. This prompts the Sanhedrin to plot His death. Mary anoints Jesus for burial. He enters Jerusalem triumphantly. Greeks seek Him. Jesus speaks of His coming death as a seed that must die to bear fruit. Despite signs, many don\'t believe, fulfilling Isaiah. Yet many leaders believe secretly, loving human praise over God\'s.',
        keyVerse: "Jesus said to her, 'I am the resurrection and the life. The one who believes in me will live, even though they die.'",
        verseReference: "John 11:25"},
      {
        number: 4,
        title: 'Upper Room Discourse',
        chapterRange: '13-17',
        summary: 'Jesus washes disciples\' feet, teaching servant leadership. He predicts His betrayal and gives a new commandment: love one another. He promises to prepare a place and return. He is the way, truth, and life. He promises the Holy Spirit as Comforter. Abide in Me like branches in a vine. The world will hate you. The Spirit will guide you. Jesus prays for His disciples and future believers to be one.',
        keyVerse: "Jesus answered, 'I am the way and the truth and the life. No one comes to the Father except through me.'",
        verseReference: "John 14:6"},
      {
        number: 5,
        title: 'Passion and Resurrection',
        chapterRange: '18-21',
        summary: 'Jesus is betrayed, arrested, and denied by Peter. He is tried before Pilate, who finds no guilt but yields to pressure. Jesus is crucified. "It is finished." He is buried. Mary finds the tomb empty and sees the risen Jesus. He appears to disciples, showing His hands and side. Thomas doubts then believes. By the Sea of Galilee, Jesus restores Peter and commissions him to feed His sheep.',
        keyVerse: "But these are written that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name.",
        verseReference: "John 20:31"}
    ]
  },
  {
    id: 'acts',
    name: 'Acts',
    order: 44,
    chapters: 28,
    type: 'History',
    overview: [
      'Acts chronicles the birth and explosive growth of the church from Jerusalem to Rome. Written by Luke as a sequel to his gospel, it shows how the Holy Spirit empowers Jesus\' followers to be His witnesses "to the ends of the earth." The book documents the transition from a Jewish sect to a diverse movement embracing Gentiles.',
      'The first half focuses on Peter\'s ministry in Jerusalem and Judea, including Pentecost, the early community, persecution, and the first Gentile converts. The second half follows Paul\'s three missionary journeys, establishing churches throughout Asia Minor and Greece. The book emphasizes bold preaching, miraculous signs, and the unstoppable advance of God\'s word despite opposition.',
      'Acts demonstrates that the church age is marked by the Holy Spirit\'s power, transforming ordinary people into bold witnesses. Despite persecution, imprisonment, and cultural barriers, the gospel spreads to both Jews and Gentiles. The book ends with Paul in Rome, preaching the kingdom openly—a fitting conclusion showing the gospel reaching the center of the empire.'
    ],
    written: 'c. 60-80 AD',
    timePeriod: 'c. 30-62 AD',
    author: 'Luke',
    testament: 'New Testament' as const,
    authorDescription: "Gentile physician and companion of Paul. Carefully researched and wrote an orderly account of Jesus' life and the early church.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Birth of the Church',
        chapterRange: '1-7',
        summary: 'Jesus ascends after promising the Holy Spirit. At Pentecost, the Spirit comes with power. Peter preaches; 3,000 are saved. The early believers share everything in common. Peter and John heal a lame man and are arrested. Ananias and Sapphira lie to the Spirit and die. Apostles are imprisoned, beaten, but keep preaching. Stephen is martyred, becoming the first Christian martyr.',
        keyVerse: "But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.",
        verseReference: "Acts 1:8"},
      {
        number: 2,
        title: 'Persecution and Expansion',
        chapterRange: '8-12',
        summary: 'Persecution scatters believers, who preach everywhere. Philip evangelizes Samaria and the Ethiopian eunuch. Saul encounters Jesus on the Damascus road and is converted. Peter receives a vision that Gentiles are acceptable to God. Cornelius and his household believe and receive the Spirit. Barnabas and Saul minister in Antioch. James is killed; Peter is imprisoned but miraculously freed.',
        keyVerse: "Salvation is found in no one else, for there is no other name under heaven given to mankind by which we must be saved.",
        verseReference: "Acts 4:12"},
      {
        number: 3,
        title: 'Paul\'s First and Second Journeys',
        chapterRange: '13-18',
        summary: 'The Spirit sends Barnabas and Saul on the first missionary journey through Cyprus and Asia Minor. Councils in Jerusalem affirm Gentile inclusion without requiring circumcision. Paul and Barnabas part ways. Paul\'s second journey includes Timothy, reaches Europe, sees many converted in Philippi, Thessalonica, Berea, Athens, and Corinth. He returns to Antioch.',
        keyVerse: "Day after day, in the temple courts and from house to house, they never stopped teaching and proclaiming the good news that Jesus is the Messiah.",
        verseReference: "Acts 5:42"},
      {
        number: 4,
        title: 'Third Journey and Return',
        chapterRange: '19-21',
        summary: 'Paul\'s third journey centers in Ephesus, where God performs extraordinary miracles. A riot erupts over Diana\'s shrine. Paul travels through Macedonia and Greece, raising Eutychus from the dead. In Miletus, he warns Ephesian elders of coming hardship. Despite prophetic warnings, he returns to Jerusalem, where he is mobbed in the temple and arrested by Romans.',
        keyVerse: "So the church throughout all Judea and Galilee and Samaria had peace and was being built up. And walking in the fear of the Lord and in the comfort of the Holy Spirit, it multiplied.",
        verseReference: "Acts 9:31"},
      {
        number: 5,
        title: 'Paul\'s Trials',
        chapterRange: '22-26',
        summary: 'Paul testifies before the crowd, the Sanhedrin, Felix, Festus, and King Agrippa. He consistently proclaims Christ\'s death and resurrection. When Festus suggests returning to Jerusalem, Paul appeals to Caesar as a Roman citizen. Agrippa declares, "You almost persuade me to become a Christian." Paul must go to Rome, but not as he expected—as a prisoner.',
        keyVerse: "Then I heard the voice of the Lord saying, 'Whom shall I send? And who will go for us?' And I said, 'Here am I. Send me!'",
        verseReference: "Acts 13:2"},
      {
        number: 6,
        title: 'Journey to Rome',
        chapterRange: '27-28',
        summary: 'Paul sails for Rome, endures shipwreck on Malta, and is miraculously unharmed by a viper. He heals many on the island. Finally reaching Rome, he is placed under house arrest. He meets with Jewish leaders, explaining the kingdom and testifying about Jesus. Some believe, others don\'t. He boldly preaches for two years. The gospel reaches the heart of the empire.',
        keyVerse: "Believe in the Lord Jesus, and you will be saved—you and your household.",
        verseReference: "Acts 16:31"}
    ]
  },
  {
    id: 'romans',
    name: 'Romans',
    order: 45,
    chapters: 16,
    type: 'Epistle',
    overview: [
      'Romans is Paul\'s systematic explanation of the gospel and its implications. Written to a church he had not yet visited, the letter presents the fullest treatment of salvation theology in Scripture. Paul demonstrates that all people—Jews and Gentiles—are guilty before God and can only be justified by faith in Jesus Christ, not by works.',
      'The first section establishes human guilt and God\'s righteousness revealed through faith. The middle section explores sanctification, the role of the law, Israel\'s place in God\'s plan, and practical Christian living. Paul emphasizes that salvation is by grace through faith alone, yet authentic faith produces transformation and obedience.',
      'Romans teaches foundational truths: justification by faith, union with Christ, the Spirit\'s indwelling, predestination and election, Israel\'s future, and practical holiness. The book demonstrates how the gospel addresses both guilt and power of sin, providing both forgiveness and transformation. It remains the most influential theological document in church history.'
    ],
    written: 'c. 57-58 AD',
    timePeriod: '57-58 AD',
    author: 'Paul',
    testament: 'New Testament' as const,
    authorDescription: "Former Pharisee dramatically converted on the road to Damascus. Became the apostle to the Gentiles and wrote much of the New Testament.",
    bibleVersion: 'NIV',
    imageUrl: 'https://images.pexels.com/photos/3184428/pexels-photo-3184428.jpeg?auto=compress&cs=tinysrgb&w=800',
    structure: [
      {
        number: 1,
        title: 'Guilt of Humanity',
        chapterRange: '1-3',
        summary: 'Paul declares he is not ashamed of the gospel, which is God\'s power for salvation. All humanity is guilty: Gentiles suppress truth about God evident in creation, and Jews break the law they claim to uphold. No one is righteous. All have sinned. The law brings knowledge of sin but cannot save. Righteousness comes through faith in Christ, apart from works.',
        keyVerse: "For all have sinned and fall short of the glory of God.",
        verseReference: "Romans 3:23"},
      {
        number: 2,
        title: 'Justification by Faith',
        chapterRange: '4-5',
        summary: 'Abraham was justified by faith, not works, becoming father of all who believe. Justification brings peace with God through Christ. While we were still sinners, Christ died for us. As sin and death came through Adam, grace and life come through Christ. Where sin increased, grace increased all the more. We are declared righteous through faith in Christ\'s work.',
        keyVerse: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.",
        verseReference: "Romans 5:8"},
      {
        number: 3,
        title: 'Life in the Spirit',
        chapterRange: '6-8',
        summary: 'Baptized into Christ, believers died to sin and now live to God. We are freed from sin\'s power and the law\'s condemnation. The Spirit dwells in believers, giving life and power over flesh. Those led by the Spirit are God\'s children. The Spirit helps our weakness and intercedes for us. Nothing can separate us from God\'s love in Christ. We are more than conquerors.',
        keyVerse: "Therefore, there is now no condemnation for those who are in Christ Jesus.",
        verseReference: "Romans 8:1"},
      {
        number: 4,
        title: 'Israel and God\'s Plan',
        chapterRange: '9-11',
        summary: 'Paul grieves over Israel\'s unbelief. God\'s purposes include both election and mercy. Israel stumbled over Christ but their rejection brought salvation to Gentiles. This provokes Israel to jealousy. God has not rejected His people; a remnant believes. Gentiles should not boast. Israel\'s hardening is partial and temporary. All Israel will be saved. God\'s gifts and call are irrevocable. His ways are beyond understanding.',
        keyVerse: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved.",
        verseReference: "Romans 10:9"},
      {
        number: 5,
        title: 'Practical Christian Living',
        chapterRange: '12-15',
        summary: 'In view of God\'s mercy, offer yourselves as living sacrifices. Don\'t conform to the world but be transformed. Use your gifts to serve. Love sincerely. Bless persecutors. Submit to authorities. Love fulfills the law. Accept those weak in faith without passing judgment. Build up one another. Christ accepted you; accept each other. Paul shares his ministry plans and requests prayer.',
        keyVerse: "Therefore, I urge you, brothers and sisters, in view of God's mercy, to offer your bodies as a living sacrifice, holy and pleasing to God—this is your true and proper worship.",
        verseReference: "Romans 12:1"},
      {
        number: 6,
        title: 'Personal Greetings',
        chapterRange: '16',
        summary: 'Paul commends Phoebe and greets numerous believers by name, commending their service and faithfulness. He warns against those who cause divisions contrary to apostolic teaching. He includes greetings from coworkers. The letter concludes with a magnificent doxology praising God who is able to establish believers through the gospel, now revealed and made known to all nations for obedience of faith.',
        keyVerse: "Now to him who is able to establish you in accordance with my gospel, the message I proclaim about Jesus Christ, in keeping with the revelation of the mystery hidden for long ages past.",
        verseReference: "Romans 16:25"
      }
    ]
  },
  {
    id: '1corinthians',
    name: '1 Corinthians',
    order: 46,
    chapters: 16,
    type: 'Epistle',
    overview: [
      'Paul writes to address serious problems in the Corinthian church: divisions, sexual immorality, lawsuits, abuse of Christian freedom, worship disorder, and confusion about spiritual gifts and resurrection. The church is immature, worldly, and tolerating behavior that would shame even pagans.',
      'Throughout, Paul contrasts worldly wisdom with God\'s wisdom revealed through the cross. He addresses practical issues: marriage, food sacrificed to idols, head coverings, the Lord\'s Supper, spiritual gifts, and love. His famous "love chapter" (13) corrects their pride in spectacular gifts by showing that love is supreme. He extensively defends the bodily resurrection of Christ and believers.',
      'First Corinthians teaches that the church must be unified around Christ, not personalities; that sexual purity matters; that freedom must be limited by love; that spiritual gifts serve the common good; and that without love, everything is meaningless. The resurrection is foundational—if Christ is not raised, faith is futile.'
    ],
    written: 'c. 55 AD',
    timePeriod: '55 AD',
    author: 'Paul',
    testament: 'New Testament' as const,
    authorDescription: "Former Pharisee dramatically converted on the road to Damascus. Became the apostle to the Gentiles and wrote much of the New Testament.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'Divisions and Wisdom',
        chapterRange: '1-4',
        summary: 'Paul confronts divisions: some follow Paul, others Apollos, others Peter. This is worldly. Christ is not divided. God\'s wisdom contradicts worldly wisdom—He chose the cross, which seems foolish but is God\'s power. Leaders are merely servants. Don\'t boast in men. Paul warns against pride and appeals to imitate him. He will come with love or with a rod, depending on their response.',
        keyVerse: "For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God.",
        verseReference: "1 Corinthians 1:18"},
      {
        number: 2,
        title: 'Moral Disorders',
        chapterRange: '5-7',
        summary: 'A man is sleeping with his father\'s wife, and the church is proud rather than mourning. Expel the immoral person. Don\'t take believers to secular courts. Sexual immorality is especially serious because bodies are temples of the Holy Spirit. It is good  to stay unmarried. But if you cannot control yourself, you should marry, for it is better to marry than to burn with passion. Don\'t seek divorce, but if an unbeliever leaves, let them go. Remain in your calling.',
        keyVerse: "Do you not know that your bodies are temples of the Holy Spirit, who is in you, whom you have received from God? You are not your own.",
        verseReference: "1 Corinthians 6:19"},
      {
        number: 3,
        title: 'Christian Freedom',
        chapterRange: '8-11',
        summary: 'Knowledge about idol food can cause weaker believers to stumble. Love builds up. Paul forfeits rights for the gospel\'s sake. Israel\'s wilderness failures warn against presumption. All things are lawful but not beneficial. Do everything for God\'s glory. In worship, maintain proper order: head coverings reflect creation order. The Lord\'s Supper is being abused; some are drunk while others go hungry. Examine yourselves.',
        keyVerse: "So whether you eat or drink or whatever you do, do it all for the glory of God.",
        verseReference: "1 Corinthians 10:31"},
      {
        number: 4,
        title: 'Spiritual Gifts and Love',
        chapterRange: '12-14',
        summary: 'The Spirit distributes various gifts for the common good. The body has many parts but is one. Pursue love above all. Without love, spectacular gifts are worthless. Love is patient, kind, not envious or boastful, doesn\'t dishonor others, keeps no record of wrongs. Prophecy is greater than tongues because it builds up the church. Everything should be done decently and in order.',
        keyVerse: "And now these three remain: faith, hope and love. But the greatest of these is love.",
        verseReference: "1 Corinthians 13:13"},
      {
        number: 5,
        title: 'Resurrection',
        chapterRange: '15',
        summary: 'Christ died for sins, was buried, and rose on the third day according to Scripture. He appeared to many witnesses. If Christ isn\'t raised, faith is futile and we are still in our sins. But He is raised, the firstfruits of those who have fallen asleep. Death came through Adam; resurrection through Christ. Our bodies will be raised imperishable, glorious, powerful, and spiritual. Death is swallowed up in victory.',
        keyVerse: "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep.",
        verseReference: "1 Corinthians 15:20"},
      {
        number: 6,
        title: 'Final Instructions',
        chapterRange: '16',
        summary: 'Paul gives instructions about the collection for Jerusalem believers. He outlines his travel plans and commends Timothy. He urges them to submit to Stephanas and others who serve. Various greetings are included. He warns: if anyone doesn\'t love the Lord, let him be accursed. "Maranatha"—Our Lord, come! The letter ends with Paul\'s customary greeting in his own hand and expression of love.',
        keyVerse: "Be on your guard; stand firm in the faith; be courageous; be strong.",
        verseReference: "1 Corinthians 16:13"},
    ]
  },
  {
    id: '2corinthians',
    name: '2 Corinthians',
    order: 47,
    chapters: 13,
    type: 'Epistle',
    overview: [
      'Second Corinthians is Paul\'s most personal and emotional letter, defending his apostolic ministry against false teachers who have infiltrated the church. These opponents attack his credentials, character, and authority. Paul responds by boasting in his weaknesses, which display God\'s power, rather than in worldly credentials.',
      'The letter reveals Paul\'s deep love for the Corinthians despite their waywardness. He explains why he changed travel plans, urges forgiveness for a repentant offender, and describes the glory of new covenant ministry. He defends his integrity in handling financial matters and appeals for generous giving to help Jerusalem believers.',
      'Second Corinthians teaches that Christian ministry involves suffering, weakness, and perseverance. God\'s power is perfected in weakness. True apostles bear the marks of Jesus, not worldly success. The new covenant brings glory that surpasses the old. Believers are being transformed from glory to glory, with treasure in jars of clay so the power belongs to God alone.'
    ],
    written: 'c. 55-56 AD',
    timePeriod: '55-56 AD',
    author: 'Paul',
    testament: 'New Testament' as const,
    authorDescription: "Former Pharisee dramatically converted on the road to Damascus. Became the apostle to the Gentiles and wrote much of the New Testament.",
    bibleVersion: 'NIV',
    structure: [
      {
        number: 1,
        title: 'God of All Comfort',
        chapterRange: '1-2',
        summary: 'Paul opens by praising God who comforts us in troubles so we can comfort others. He defends his changed travel plans—not fickleness but sparing them another painful visit. He urges forgiveness and comfort for a repentant offender so Satan doesn\'t take advantage. Paul was restless until finding Titus with good news from Corinth. He thanks God who always leads us in triumph in Christ.',
        keyVerse: "Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion and the God of all comfort, who comforts us in all our troubles, so that we can comfort those in any trouble with the comfort we ourselves receive from God.",
        verseReference: "2 Corinthians 1:3-4"},
      {
        number: 2,
        title: 'Glory of the New Covenant',
        chapterRange: '3-5',
        summary: 'Believers are living letters written by the Spirit. The new covenant is glorious, surpassing the old covenant which faded. We are being transformed from glory to glory. Though outwardly wasting away, inwardly we are renewed daily. Momentary troubles achieve eternal glory. We walk by faith, not sight. We are ambassadors for Christ, imploring: be reconciled to God. He made Him who knew no sin to be sin so we might become God\'s righteousness.',
        keyVerse: "Therefore, if anyone is in Christ, the new creation has come: The old has gone, the new is here!",
        verseReference: "2 Corinthians 5:17"},
      {
        number: 3,
        title: 'Appeals and Warnings',
        chapterRange: '6-7',
        summary: 'Paul appeals: don\'t receive God\'s grace in vain. His ministry has endured hardships yet demonstrates God\'s power. He opens his heart, asking them to reciprocate. Don\'t be unequally yoked with unbelievers. Paul rejoices at Titus\'s report of their repentance. Godly sorrow produces repentance; worldly sorrow brings death. Their earnestness, longing, and zeal have comforted him. His confidence in them is fully restored.',
        keyVerse: "Godly sorrow brings repentance that leads to salvation and leaves no regret, but worldly sorrow brings death.",
        verseReference: "2 Corinthians 7:10"},
      {
        number: 4,
        title: 'Generosity Encouraged',
        chapterRange: '8-9',
        summary: 'Paul encourages generous giving for Jerusalem believers, citing the Macedonians\' example and Christ who became poor so we might become rich. Give as you purposed, not reluctantly. God loves a cheerful giver and will supply all needs. Generous sowing brings generous reaping. This service supplies saints\' needs and produces thanksgiving to God. Thanks be to God for His indescribable gift!',
        keyVerse: "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
        verseReference: "2 Corinthians 9:7"},
      {
        number: 5,
        title: 'Paul\'s Defense',
        chapterRange: '10-13',
        summary: 'Paul defends his authority against opponents who boast in appearance. He reluctantly engages in "foolish" boasting, listing his credentials, sufferings, and revelations. His thorn in the flesh teaches that God\'s grace is sufficient and power is perfected in weakness. He will boast in weaknesses so Christ\'s power may rest on him. He fears finding them unchanged at his next visit. Examine yourselves. The grace, love, and fellowship of the Trinity be with you.',
        keyVerse: "But he said to me, 'My grace is sufficient for you, for my power is made perfect in weakness.' Therefore I will boast all the more gladly about my weaknesses, so that Christ's power may rest on me.",
        verseReference: "2 Corinthians 12:9"},
    ]
  },
];
