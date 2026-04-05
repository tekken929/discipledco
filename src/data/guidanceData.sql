-- Sample Guidance Q&A Data with Christian Apologetics
-- This file contains INSERT statements to populate the guidance_qa table

-- Question 1: How do I find peace?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'How do I find peace?',
  ARRAY['peace', 'anxiety', 'worry', 'stress', 'calm', 'rest', 'troubled'],
  'True peace comes not from our circumstances, but from our relationship with God through Jesus Christ. The Bible teaches us that Jesus is the Prince of Peace, and He offers a peace that transcends human understanding. This peace is not dependent on external factors but is rooted in the assurance of God''s presence, sovereignty, and love for us.

When we are anxious or troubled, we are called to bring our concerns to God in prayer. The apostle Paul instructs us to present our requests to God with thanksgiving, and in return, God''s peace will guard our hearts and minds. This is not a superficial peace, but a deep, abiding confidence that God is in control and that He works all things together for the good of those who love Him.

Additionally, Jesus Himself promised peace to His disciples before His crucifixion. This peace is a gift that the world cannot give or take away. It comes from knowing Christ personally and trusting in His finished work on the cross for our salvation.',
  '[
    {
      "book": "Philippians",
      "chapter": 4,
      "verse": 6,
      "version": "NIV",
      "text": "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
    },
    {
      "book": "John",
      "chapter": 14,
      "verse": 27,
      "version": "NIV",
      "text": "Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid."
    }
  ]'::jsonb,
  'Life Challenges'
);

-- Question 2: Why does God allow suffering?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'Why does God allow suffering?',
  ARRAY['suffering', 'pain', 'evil', 'bad things', 'tragedy', 'hardship', 'trials'],
  'The question of suffering is one of the most profound and difficult questions in Christian apologetics. The Bible reveals that suffering entered the world through human sin when Adam and Eve disobeyed God in the Garden of Eden. We live in a fallen world where sin, death, disease, and evil are present realities.

However, God has not abandoned us in our suffering. The apostle Paul teaches us that our present sufferings are producing in us an eternal glory that far outweighs them all. Suffering, while painful, can serve purposes in God''s sovereign plan: it can refine our faith, draw us closer to God, develop our character, and give us compassion for others.

Most importantly, God Himself entered into human suffering through Jesus Christ. Jesus was "a man of sorrows, acquainted with grief" (Isaiah 53:3). He experienced rejection, betrayal, physical torture, and death on the cross. God does not watch our suffering from a distance—He experienced it Himself and offers us comfort, strength, and the hope of resurrection and eternal life where there will be no more suffering, pain, or death.',
  '[
    {
      "book": "Romans",
      "chapter": 8,
      "verse": 18,
      "version": "NIV",
      "text": "I consider that our present sufferings are not worth comparing with the glory that will be revealed in us."
    },
    {
      "book": "2 Corinthians",
      "chapter": 4,
      "verse": 17,
      "version": "NIV",
      "text": "For our light and momentary troubles are achieving for us an eternal glory that far outweighs them all."
    }
  ]'::jsonb,
  'Faith'
);

-- Question 3: How can I be saved?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'How can I be saved?',
  ARRAY['saved', 'salvation', 'heaven', 'eternal life', 'forgiveness', 'born again'],
  'Salvation is the free gift of God, received through faith in Jesus Christ alone. The Bible is clear that we cannot earn salvation through our good works, religious rituals, or moral efforts. We are all sinners who fall short of God''s perfect standard, and the consequence of sin is death and separation from God.

However, God in His great love sent His only Son, Jesus Christ, to die on the cross as the payment for our sins. Jesus lived a perfect, sinless life, died in our place, and rose from the dead on the third day, conquering sin and death. When we place our faith in Jesus—believing that He is the Son of God, that He died for our sins, and that He rose again—we are forgiven, reconciled to God, and given eternal life.

Salvation is not earned but received. It is by grace through faith, not by works, so that no one can boast. When we confess with our mouth that Jesus is Lord and believe in our heart that God raised Him from the dead, we are saved. This is the good news of the Gospel: that God offers forgiveness and eternal life freely to all who believe in Jesus Christ.',
  '[
    {
      "book": "John",
      "chapter": 3,
      "verse": 16,
      "version": "NIV",
      "text": "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."
    },
    {
      "book": "Ephesians",
      "chapter": 2,
      "verse": 8,
      "version": "NIV",
      "text": "For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast."
    }
  ]'::jsonb,
  'Salvation'
);

-- Question 4: How do I pray?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'How do I pray?',
  ARRAY['prayer', 'pray', 'talk to god', 'communicate', 'worship'],
  'Prayer is simply talking with God. It is not about using fancy words or formal language, but about coming to God with honesty, humility, and faith. Jesus taught His disciples to pray, giving them a model we call the Lord''s Prayer, which includes worship, submission to God''s will, requests for daily provision, confession of sin, and asking for protection from temptation.

Prayer should include several elements: adoration (praising God for who He is), confession (admitting our sins and asking for forgiveness), thanksgiving (expressing gratitude for God''s blessings), and supplication (bringing our requests to God). We are encouraged to pray continually, bringing every concern, every joy, and every need to God.

The Bible assures us that God hears our prayers. We can approach God''s throne of grace with confidence because of Jesus Christ, who serves as our mediator. We don''t need a priest or intermediary—we have direct access to God through prayer. Jesus encourages us to ask, seek, and knock, promising that God, as our loving Father, will give good gifts to those who ask Him.',
  '[
    {
      "book": "Matthew",
      "chapter": 6,
      "verse": 9,
      "version": "NIV",
      "text": "This, then, is how you should pray: Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven."
    },
    {
      "book": "1 Thessalonians",
      "chapter": 5,
      "verse": 17,
      "version": "NIV",
      "text": "Pray continually."
    }
  ]'::jsonb,
  'Prayer'
);

-- Question 5: Is the Bible reliable?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'Is the Bible reliable?',
  ARRAY['bible', 'reliable', 'trustworthy', 'accurate', 'truth', 'scripture', 'word of god'],
  'The Bible is the most well-preserved and historically verified ancient document in existence. We have thousands of manuscript copies of both the Old and New Testaments, with remarkable consistency across these manuscripts. The Dead Sea Scrolls, discovered in 1947, confirmed that the Old Testament text has been faithfully preserved for over 2,000 years.

The New Testament is supported by more manuscript evidence than any other ancient writing. We have over 5,800 Greek manuscripts, with some fragments dating to within decades of the original writing. When compared to other ancient texts like Homer''s Iliad or Caesar''s Gallic Wars, the Bible has exponentially more manuscript evidence and much earlier copies.

Beyond manuscript evidence, archaeology has repeatedly confirmed the historical accuracy of the Bible. Cities, kings, customs, and events mentioned in Scripture have been verified through archaeological discoveries. The Bible also contains fulfilled prophecy—predictions made centuries in advance that came true with precise detail, particularly regarding Jesus Christ.

Most importantly, Jesus Himself affirmed the authority and reliability of Scripture. He quoted from the Old Testament as God''s Word, and He promised that the Holy Spirit would guide the apostles into all truth, ensuring the accurate recording of the New Testament. The Bible is not merely a human book—it is God-breathed, inspired by the Holy Spirit, and trustworthy in all it affirms.',
  '[
    {
      "book": "2 Timothy",
      "chapter": 3,
      "verse": 16,
      "version": "NIV",
      "text": "All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness."
    },
    {
      "book": "Psalm",
      "chapter": 119,
      "verse": 105,
      "version": "NIV",
      "text": "Your word is a lamp for my feet, a light on my path."
    }
  ]'::jsonb,
  'Faith'
);

-- Question 6: How do I overcome temptation?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'How do I overcome temptation?',
  ARRAY['temptation', 'sin', 'struggle', 'resist', 'overcome', 'fight'],
  'Temptation is a reality for every believer, but God has provided us with everything we need to resist it. First, we must understand that temptation itself is not sin—Jesus Himself was tempted in every way, yet He did not sin. It is when we give in to temptation that sin occurs.

The Bible promises that God will not allow us to be tempted beyond what we can bear. When we are tempted, God always provides a way out. This means that no temptation is too powerful to resist with God''s help. We overcome temptation through several means: prayer, Scripture memorization, accountability with other believers, and fleeing from situations that lead to temptation.

Jesus showed us the power of Scripture when He was tempted by Satan in the wilderness. Each time, He responded with "It is written," quoting God''s Word. When we fill our minds and hearts with Scripture, we have a powerful weapon against temptation. Additionally, we must rely on the Holy Spirit, who lives within every believer and empowers us to resist sin and live in holiness. We are not fighting this battle alone—God is with us and for us.',
  '[
    {
      "book": "1 Corinthians",
      "chapter": 10,
      "verse": 13,
      "version": "NIV",
      "text": "No temptation has overtaken you except what is common to mankind. And God is faithful; he will not let you be tempted beyond what you can bear. But when you are tempted, he will also provide a way out so that you can endure it."
    },
    {
      "book": "James",
      "chapter": 4,
      "verse": 7,
      "version": "NIV",
      "text": "Submit yourselves, then, to God. Resist the devil, and he will flee from you."
    }
  ]'::jsonb,
  'Life Challenges'
);

-- Question 7: What is God's will for my life?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'What is God''s will for my life?',
  ARRAY['god''s will', 'purpose', 'calling', 'plan', 'guidance', 'direction'],
  'Discovering God''s will for your life begins with knowing God''s revealed will in Scripture. God has made many things clear: He wills that all people be saved, that we be holy, that we give thanks in all circumstances, and that we love God and love others. These are foundational principles that apply to every believer.

Beyond these general principles, God guides us individually through prayer, Scripture, circumstances, and the counsel of wise believers. We must seek God with our whole heart, trusting that He will make our paths straight. This doesn''t mean we''ll always know every detail of the future, but as we walk in obedience to what God has already revealed, He faithfully guides our next steps.

It''s important to understand that God''s will is not a tightrope we might fall off if we make one wrong decision. God is a loving Father who delights in guiding His children. As we pursue Him, grow in our relationship with Him through prayer and Scripture, and seek to honor Him in all we do, we can trust that He is working out His purposes in our lives. He promises to complete the good work He has begun in us.',
  '[
    {
      "book": "Proverbs",
      "chapter": 3,
      "verse": 5,
      "version": "NIV",
      "text": "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
    },
    {
      "book": "Romans",
      "chapter": 12,
      "verse": 2,
      "version": "NIV",
      "text": "Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is—his good, pleasing and perfect will."
    }
  ]'::jsonb,
  'Faith'
);

-- Question 8: How can I forgive someone who hurt me?
INSERT INTO guidance_qa (question, keywords, answer, scripture_references, category)
VALUES (
  'How can I forgive someone who hurt me?',
  ARRAY['forgiveness', 'forgive', 'hurt', 'betrayal', 'anger', 'bitterness', 'grudge'],
  'Forgiveness is one of the most challenging yet liberating acts we can perform. The Bible is clear that we are to forgive others as God has forgiven us. This is not based on whether the person deserves forgiveness or has asked for it, but on the reality that we ourselves have been forgiven an enormous debt by God.

Jesus taught that if we do not forgive others, our heavenly Father will not forgive us. This is not about earning salvation, but about demonstrating that we truly understand the grace we''ve received. Unforgiveness binds us in bitterness and keeps us connected to past pain, but forgiveness sets us free.

Forgiveness does not mean excusing the wrong, pretending it didn''t happen, or necessarily reconciling with someone who remains harmful. It means releasing our right to vengeance and entrusting justice to God. We can forgive by choosing to let go of resentment, praying for those who hurt us, and refusing to dwell on the offense. This is often a process, not a one-time event, and we may need to forgive repeatedly as painful memories resurface. Through prayer and reliance on God''s strength, we can extend the same grace to others that God has extended to us.',
  '[
    {
      "book": "Colossians",
      "chapter": 3,
      "verse": 13,
      "version": "NIV",
      "text": "Bear with each other and forgive one another if any of you has a grievance against someone. Forgive as the Lord forgave you."
    },
    {
      "book": "Matthew",
      "chapter": 6,
      "verse": 14,
      "version": "NIV",
      "text": "For if you forgive other people when they sin against you, your heavenly Father will also forgive you."
    }
  ]'::jsonb,
  'Life Challenges'
);
