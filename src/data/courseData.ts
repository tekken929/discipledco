export interface Lesson {
  id: string;
  title: string;
  preview: string;
  expanded: string;
  reflectivePrompt?: string;
  keyTakeaway?: string;
}

export interface CourseModule {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  lessons: Lesson[];
}

export const courseModules: CourseModule[] = [
  {
    id: 'module-1',
    number: 1,
    title: 'What the Bible Is',
    subtitle: 'Understanding what you are actually holding',
    description: 'Before you can read the Bible well, you need to understand what it actually is. Not just a religious book, not a collection of rules — something much more coherent and remarkable than most people realize.',
    lessons: [
      {
        id: 'm1-l1',
        title: 'What You Are Actually Holding',
        preview: 'Most people think of the Bible as a single book. It is not. It is a library — 66 documents written across 1,500 years by over 40 different people, unified by one continuous story.',
        expanded: 'When you pick up the Bible, you are holding something unlike any other document in history. It was written across fifteen centuries, in three languages, on three continents, by shepherds, kings, fishermen, scholars, and prophets. And yet it tells one coherent story from beginning to end. That alone is remarkable. Understanding this changes how you approach it. You do not read a library the same way you read a novel. You enter it. You explore it. You learn which sections serve which purpose. The Bible contains law, history, poetry, prophecy, letters, and apocalyptic vision. Each genre reads differently. When you understand that, confusion starts to lift.',
        reflectivePrompt: 'Have you ever felt confused opening the Bible? What did you assume about it that might have made it harder to approach?',
        keyTakeaway: 'The Bible is a library, not a single book. Understanding its structure is the first step toward understanding its content.'
      },
      {
        id: 'm1-l2',
        title: 'One Story, Not 66 Disconnected Books',
        preview: 'From Genesis to Revelation, the Bible tells one story: creation, fall, redemption, and restoration. Every book is a chapter in that larger narrative.',
        expanded: 'Here is what most people miss: the Bible has a plot. It starts with a perfect creation, introduces the problem of human rebellion, and then follows the long arc of God working to rescue and restore what was broken. The Old Testament sets up the problem and builds anticipation. The New Testament delivers the answer in the person of Jesus Christ. And Revelation shows how it all ends — not in defeat, but in complete restoration. When you read any individual book, you are reading a chapter in that larger story. That context makes everything clearer. A letter from Paul suddenly makes more sense when you understand where it fits in the whole arc.',
        keyTakeaway: 'The Bible is one unified story: creation, fall, redemption, restoration. Every book is part of that plot.'
      },
      {
        id: 'm1-l3',
        title: 'Old vs New Testament',
        preview: 'The two testaments are not competing ideas. The Old Testament sets up what the New Testament fulfills. Understanding the relationship between them unlocks the whole Bible.',
        expanded: 'A lot of people treat the Old and New Testaments as if they contradict each other. They do not. The Old Testament was written over centuries, documenting God\'s relationship with the nation of Israel, His laws, His prophets, and His promises of a coming Messiah. The New Testament is the fulfillment of those promises. Jesus did not replace the Old Testament — He completed it. When He said "I have come not to abolish the law but to fulfill it," He meant the entire Hebrew Scripture was pointing toward Him. Reading the Old Testament with that lens changes everything. The sacrificial system, the Passover, the temple — all of it becomes a picture of what Jesus would ultimately accomplish.',
        reflectivePrompt: 'Have you ever read something in the Old Testament that confused you? How might knowing it points to Jesus change your reading?',
        keyTakeaway: 'The Old Testament sets up the promise. The New Testament delivers the fulfillment. They are one continuous story.'
      },
      {
        id: 'm1-l4',
        title: 'Why It Can Be Trusted',
        preview: 'The Bible is not asking for blind faith. It has been more thoroughly examined, tested, and verified than any other ancient document in history.',
        expanded: 'If you have questions about whether the Bible is reliable, that is a good instinct — and there are real answers. We have over 5,800 Greek manuscripts of the New Testament, far more than any other ancient document. The Dead Sea Scrolls confirmed the accuracy of the Old Testament text going back over 2,000 years. Archaeology has repeatedly confirmed the historical details recorded in Scripture. And the internal consistency of the Bible — written by 40 different people over 15 centuries without contradiction — is statistically extraordinary. This does not mean every question has a simple answer. But it does mean the Bible is the most verified ancient document in existence. Trusting it is not a leap in the dark.',
        keyTakeaway: 'The Bible is supported by more manuscript evidence than any ancient document in history. Faith in it is grounded, not blind.'
      }
    ]
  },
  {
    id: 'module-2',
    number: 2,
    title: 'How to Read the Bible',
    subtitle: 'Without getting lost or overwhelmed',
    description: 'Most people do not struggle because they do not want to read the Bible. They struggle because no one ever showed them how. This is where that changes.',
    lessons: [
      {
        id: 'm2-l1',
        title: 'Why Most People Get Stuck',
        preview: 'Most people start reading the Bible with good intentions but no direction. They open to random pages, get confused, and eventually stop. Not because they cannot understand it, but because they were never shown how to approach it.',
        expanded: 'Most people do not quit reading the Bible because they do not care. They quit because it does not make sense. They start in places like Leviticus or jump around randomly, trying to feel something from it. When that does not happen, it becomes frustrating. So they stop. But the issue is not the Bible. It is the approach. The Bible was not written to be read randomly. It has structure, context, and flow. If you do not understand that, it is going to feel confusing. Once you fix the approach, everything changes.',
        reflectivePrompt: 'Where did you start reading the Bible? What happened?',
        keyTakeaway: 'The problem is almost never a lack of desire. It is a lack of direction. Direction is what this module gives you.'
      },
      {
        id: 'm2-l2',
        title: 'Read for Understanding, Not Speed',
        preview: 'The goal is not to get through the Bible. It is to understand it. Slowing down and actually thinking about what you are reading matters more than how much you read.',
        expanded: 'We tend to treat the Bible like a checklist. Did I read today? How many chapters did I finish? But that is not the point. You can read five chapters and retain nothing, or read five verses and actually understand them. One changes you. The other does not. The goal is not completion. It is clarity. Slow down. Read small sections. Sit with them. Understanding builds over time, not all at once.',
        keyTakeaway: 'Five verses understood beats five chapters skimmed every time.'
      },
      {
        id: 'm2-l3',
        title: 'Context Changes Everything',
        preview: 'Verses do not exist on their own. Every passage has a setting, audience, and purpose. Understanding context is what keeps you from misunderstanding Scripture.',
        expanded: 'One of the biggest mistakes people make is pulling verses out of context. It sounds right. It feels right. But it is not what the text actually meant. Every part of the Bible was written to a specific audience, at a specific time, for a specific reason. If you ignore that, you can make the Bible say anything. Instead, ask: Who is writing this? Who are they writing to? What is happening around this passage? When you start doing that, the Bible becomes much clearer.',
        reflectivePrompt: 'Have you ever seen a verse used in a way that felt off? What might the actual context have been?',
        keyTakeaway: 'Context is not an advanced concept. It is the minimum you need to understand anything you read.'
      },
      {
        id: 'm2-l4',
        title: 'A Simple 3-Step Method',
        preview: 'You do not need a complicated system. Just follow a simple process: observe what it says, understand what it means, and apply it to your life.',
        expanded: 'You do not need to overcomplicate this. Use this simple structure. First: Observe. What is actually being said? Do not interpret yet. Just look closely. Second: Understand. What does this mean in context? This is where you think deeper. Third: Apply. What changes because of this? This is where it becomes real. If you do this consistently, you will understand more than most people who just read without thinking.',
        keyTakeaway: 'Observe. Understand. Apply. That is the whole method. Keep it that simple.'
      },
      {
        id: 'm2-l5',
        title: 'Consistency Over Intensity',
        preview: 'You do not need long sessions. You need consistent ones.',
        expanded: 'A lot of people burn out because they think growth has to start big. It does not. Ten honest minutes every day is better than one intense hour you cannot sustain. Consistency builds understanding, trust, rhythm, and depth over time. Small faithfulness matters.',
        reflectivePrompt: 'What would a realistic daily reading habit look like for your life right now?',
        keyTakeaway: 'Start small. Stay consistent. Let it build. That is how transformation actually happens.'
      }
    ]
  },
  {
    id: 'module-3',
    number: 3,
    title: 'Where to Start Reading',
    subtitle: 'The path that builds momentum instead of confusion',
    description: 'Where you start in the Bible matters more than most people realize. Starting in the wrong place is one of the most common reasons people give up. Here is where to begin.',
    lessons: [
      {
        id: 'm3-l1',
        title: 'Why Starting in the Wrong Place Kills Momentum',
        preview: 'Beginning in Leviticus or Revelation without context is like starting a movie in the middle — you are lost from the first frame. The entry point matters.',
        expanded: 'There is a reason so many people say they tried to read the Bible but could not get through it. They started in the wrong place. Genesis through Deuteronomy is dense law code and genealogies. Revelation is full of symbolic imagery that requires deep context to understand. These books are important, but they are not where you begin. Starting cold in the wrong section is like trying to understand a long conversation by jumping into the middle. It will not make sense. There is a better path — one that builds foundation and builds momentum at the same time.'
      },
      {
        id: 'm3-l2',
        title: 'Start With Jesus',
        preview: 'Everything in the Bible points to Jesus. Starting with the Gospels — specifically John — gives you the center of the entire story first.',
        expanded: 'The Gospel of John was written specifically so that people would believe Jesus is the Son of God. It is personal, clear, and focused. Mark is fast-paced and immediate. Luke is thorough and historically grounded. These four books give you the center of everything. Once you understand who Jesus is and what He did, the rest of the Bible starts to make sense around Him. The Old Testament becomes the setup. The letters become the application. Start here.',
        keyTakeaway: 'Start with John. Then Luke, then Mark, then Matthew. Meet Jesus before anything else.'
      },
      {
        id: 'm3-l3',
        title: 'Understand the Early Church',
        preview: 'After the Gospels, Acts shows you what happened next — how the church began, what the disciples did, and how the message spread across the world.',
        expanded: 'Acts is the bridge between the Gospels and the rest of the New Testament. It answers the question: what happened after the resurrection? You see the church form, the Holy Spirit arrive, Paul\'s conversion, and the spread of the gospel across the Roman world. This context is essential for understanding Paul\'s letters — many of which were written to specific churches you will read about in Acts.'
      },
      {
        id: 'm3-l4',
        title: "Learn How to Live",
        preview: "Paul's letters — Romans, Ephesians, Philippians, Galatians — explain salvation, grace, identity in Christ, and how to actually live as a believer.",
        expanded: 'After Acts, dive into Paul\'s letters. Romans is the clearest explanation of the gospel in the entire Bible — sin, grace, faith, salvation. Ephesians explains who you are in Christ and how to live it out. Galatians addresses the temptation to earn what was meant to be received. Philippians is short, personal, and full of practical encouragement. These letters were written to real people dealing with real problems, and they are directly applicable to your life today.'
      },
      {
        id: 'm3-l5',
        title: 'Go Back to the Beginning',
        preview: 'Once you have a foundation in the New Testament, going back to Genesis, Exodus, Psalms, and Proverbs unlocks depth you could not have seen before.',
        expanded: 'Now the Old Testament becomes meaningful rather than confusing. Genesis explains creation, the fall, and the beginning of God\'s covenant. Exodus shows rescue and redemption — a picture of salvation. Psalms meets you in every emotion and teaches you to pray. Proverbs gives you practical wisdom for daily life. Reading the Old Testament after you understand Jesus makes it rich instead of strange.',
        keyTakeaway: 'The New Testament first, then back to the Old. Foundation before depth.'
      }
    ]
  },
  {
    id: 'module-4',
    number: 4,
    title: 'Who God Is',
    subtitle: 'The nature, character, and identity of God',
    description: 'You cannot follow someone you do not know. Before anything else in your faith can be stable, you need a clear understanding of who God actually is — not what you assumed, and not what you were told as a child.',
    lessons: [
      {
        id: 'm4-l1',
        title: 'The Nature of God',
        preview: 'God is not a concept or an idea. He is a personal being with specific attributes — eternal, all-knowing, all-powerful, ever-present, and holy. Understanding these characteristics changes how you relate to Him.',
        expanded: 'Theology often makes the attributes of God feel distant and academic. They are not. When you understand that God is omniscient — knowing everything, including every thought you have had — that is either terrifying or deeply comforting, depending on where you stand with Him. When you understand that He is omnipresent — everywhere at once — it means you are never alone and never outside of His awareness. These are not abstract ideas. They are the foundation of real relationship.',
        keyTakeaway: 'God is not an impersonal force. He is a personal being with real character. Knowing His attributes grounds everything else.'
      },
      {
        id: 'm4-l2',
        title: 'The Trinity',
        preview: 'One God in three persons — Father, Son, and Holy Spirit. Not three gods. Not one God playing three roles. Something more mysterious and important than either of those.',
        expanded: 'The Trinity is one of the most misunderstood doctrines in Christianity. God is one being who exists as three distinct persons — Father, Son, and Holy Spirit. They are not separate gods. They are not the same person in three costumes. The Bible shows all three as distinct: Jesus prays to the Father, the Spirit descends at the baptism of Jesus, and Paul\'s letters regularly distinguish between them. Why does this matter? Because it means God is inherently relational. Love, communication, and relationship are not just things God does — they are part of what God is.',
        keyTakeaway: 'The Trinity shows us that at the heart of God\'s nature is relationship. We were made for relationship because He is relationship.'
      },
      {
        id: 'm4-l3',
        title: "God's Character",
        preview: 'Holy. Just. Merciful. Faithful. Patient. Slow to anger. Full of steadfast love. The Bible does not just describe what God does — it reveals who He is.',
        expanded: 'One of the most important passages in Scripture is Exodus 34:6-7, where God declares His own character: "The Lord, the Lord, a God merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness, keeping steadfast love for thousands, forgiving iniquity and transgression and sin." This is God describing Himself. Not angry. Not distant. Not arbitrary. He is holy, which means utterly set apart from evil. He is just, which means He takes sin seriously. And He is merciful — not because He ignores sin, but because He dealt with it through Jesus.',
        keyTakeaway: 'God\'s character is consistent throughout Scripture. He does not change. Understanding who He is gives you stability.'
      },
      {
        id: 'm4-l4',
        title: 'Why This Matters',
        preview: 'Your understanding of God shapes everything — how you pray, how you handle suffering, how you make decisions, and what you hope for.',
        expanded: 'What you believe about God is the most important thing about you. If you believe He is distant and uncaring, you will not pray with any real expectation. If you believe He is harsh and ready to punish, you will live in fear instead of freedom. If you believe He is a cosmic vending machine who gives you what you want, you will be constantly disappointed. But when you understand who He actually is — holy and loving, just and merciful, powerful and personal — everything in your faith settles into place.',
        reflectivePrompt: 'What did you believe about God growing up? How has that shaped how you relate to Him now?',
        keyTakeaway: 'Correct theology is not just academic. It is the difference between a faith that holds and one that collapses under pressure.'
      }
    ]
  },
  {
    id: 'module-5',
    number: 5,
    title: 'Who Jesus Is',
    subtitle: 'Fully God, fully man — and why everything depends on it',
    description: 'Jesus is not just a good teacher or a moral example. He is the hinge point of all history. How you answer the question "Who is Jesus?" determines everything else.',
    lessons: [
      {
        id: 'm5-l1',
        title: 'Historical Reality of Jesus',
        preview: 'Jesus of Nazareth is one of the most historically documented figures of the ancient world. His existence is not a matter of religious debate — it is established historical fact.',
        expanded: 'We have more historical evidence for the existence of Jesus than for most figures of ancient history. Roman historian Tacitus, Jewish historian Josephus, and multiple early sources outside the Bible reference Jesus as a real historical person who was executed under Pontius Pilate. The question of whether Jesus existed is settled. The question that remains is who He was — and that is where things become serious. Either He was exactly who He claimed to be, or He was something else entirely. There is no comfortable middle ground.'
      },
      {
        id: 'm5-l2',
        title: 'Fully God and Fully Man',
        preview: 'Jesus was not God pretending to be human, and not a human elevated to divine status. The Christian claim is that He was both — completely — at the same time.',
        expanded: 'The technical term is the hypostatic union — Jesus possessing two complete natures, divine and human, in one person. He got tired (John 4:6). He wept (John 11:35). He was hungry (Matthew 4:2). These are not performances. He was fully human. And yet He calmed storms with a word, forgave sin with authority, and rose from the dead. That is not human. Both are real. Why does this matter? Because only a fully human Jesus could represent humanity in His death. And only a fully divine Jesus could conquer death and offer eternal life. You need both. Remove either nature and the gospel falls apart.',
        keyTakeaway: 'Jesus had to be fully human to die in our place, and fully God to make that death mean anything. Both natures are essential.'
      },
      {
        id: 'm5-l3',
        title: 'What He Taught',
        preview: 'Jesus did not just die and rise again. He taught — and what He taught was radical, clear, and deeply counter to how the world operates.',
        expanded: 'The Sermon on the Mount alone is enough to stop you in your tracks. Blessed are the poor in spirit. Turn the other cheek. Love your enemies. Do not worry about tomorrow. These are not vague inspirations — they are a completely different way of being human. Jesus taught about the kingdom of God as something present and coming, about prayer as direct conversation with a Father, about sin as something that starts in the heart before it reaches the hands. His teaching was not self-help. It was a description of how life actually works under God\'s reign.'
      },
      {
        id: 'm5-l4',
        title: 'Why Everything Hinges on Him',
        preview: "Jesus made claims no other religious figure made. He said 'I am the way, the truth, and the life. No one comes to the Father except through me.' That is either true or it is not.",
        expanded: 'C.S. Lewis put it clearly: Jesus was either a liar, a lunatic, or exactly who He said He was. He claimed to forgive sins — something only God can do. He claimed to be the resurrection and the life. He accepted worship. A merely good teacher does not make those claims. So you are left with a real choice. The evidence for the resurrection is substantial — the empty tomb, hundreds of eyewitnesses, the willingness of His disciples to die for what they claimed to have seen. The Christian claim is not a leap in the dark. It is faith rooted in evidence and history.',
        reflectivePrompt: 'Who did you think Jesus was before you started reading about Him? Has anything shifted?',
        keyTakeaway: 'Jesus is either who He claimed to be, or He is not worth following at all. The middle ground — nice teacher, good example — does not hold up under the claims He actually made.'
      }
    ]
  },
  {
    id: 'module-6',
    number: 6,
    title: 'Salvation',
    subtitle: 'What it means to be saved — and what it does not mean',
    description: 'Salvation is the word at the center of the gospel, and it is misunderstood more than almost any other concept in Christianity. This module clears that up.',
    lessons: [
      {
        id: 'm6-l1',
        title: 'The Problem of Sin',
        preview: 'Before you can understand salvation, you have to honestly face what you are being saved from. Sin is not just bad behavior. It is a fundamental disorder in our relationship with God.',
        expanded: 'Romans 3:23 says "all have sinned and fall short of the glory of God." This is not a condemnation — it is a diagnosis. The problem is not just that we do bad things. It is that we are oriented away from God by nature. Sin entered the world through Adam and Eve\'s choice to prioritize their own judgment over God\'s, and it has shaped human experience ever since. That is why the world is broken. That is why relationships fail, why injustice persists, why we hurt each other and ourselves. Salvation begins by honestly seeing the problem.',
        keyTakeaway: 'Sin is not just rule-breaking. It is a broken relationship with God — and that broken relationship has real consequences.'
      },
      {
        id: 'm6-l2',
        title: 'Grace vs Earning',
        preview: 'The instinct to earn God\'s approval is deeply human. But salvation is not something you achieve — it is something you receive. That distinction changes everything.',
        expanded: 'Ephesians 2:8-9 is direct: "For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast." Every other religion in the world has a system for earning your way to God. Christianity alone says: you cannot get there from here on your own. God came to you. The death of Jesus was not a reward for good people. It was a rescue for broken ones. You do not earn this. You receive it.',
        reflectivePrompt: 'Do you find yourself trying to earn God\'s approval? What would it look like to receive grace instead?',
        keyTakeaway: 'Grace is not a reward for effort. It is a gift to those who know they cannot earn it.'
      },
      {
        id: 'm6-l3',
        title: 'What Faith Actually Is',
        preview: 'Faith is not positive thinking or pretending to believe something you are not sure about. Biblical faith is trust — rooted in evidence — acted upon.',
        expanded: 'The word in Greek, pistis, means trust or confidence. Hebrews 11:1 calls faith "the assurance of things hoped for, the conviction of things not seen." This is not blind optimism. It is trust in a person who has proven trustworthy. When you trust someone with your car keys, you are not hoping the car exists — you know it does. Faith in Jesus works the same way. You look at what He said, what He did, what the evidence shows, and you choose to place your trust in Him. It is not certainty in every detail. It is commitment in the face of sufficient evidence.',
        keyTakeaway: 'Faith is not the absence of doubt. It is trust placed in a trustworthy person, based on real evidence.'
      },
      {
        id: 'm6-l4',
        title: 'What Happens When You Are Saved',
        preview: 'Salvation is not just an escape from hell. It is a new identity, a restored relationship, a new nature, and a new direction for your entire life.',
        expanded: '2 Corinthians 5:17 says: "If anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come." Salvation is not a transaction that happens and then you continue life as normal. Something actually changes. Your relationship with God is restored — you have access to Him as a Father, not as a distant judge. Your identity shifts — you are no longer defined by your past or your failures. The Holy Spirit comes to live in you, which means you have actual help in living differently. And the trajectory of your life changes — away from self and toward God and others.',
        reflectivePrompt: 'If you have been saved, what has actually changed? If you are not sure, what would it look like to receive this?',
        keyTakeaway: 'Salvation is not just about where you go when you die. It is about what you become starting today.'
      }
    ]
  },
  {
    id: 'module-7',
    number: 7,
    title: 'How to Live It Out',
    subtitle: 'Faith that moves from belief into daily life',
    description: 'Knowing the truth and living the truth are two different things. This module is about closing that gap — not through willpower, but through genuine transformation.',
    lessons: [
      {
        id: 'm7-l1',
        title: 'Daily Discipline',
        preview: 'A faith that only shows up on Sundays is not going to hold. The rhythms of daily life — prayer, Scripture, quiet — are not optional add-ons. They are how a faith stays alive.',
        expanded: 'Spiritual formation is not accidental. No one drifts into depth with God. The practices are not ways to earn favor — they are simply how you stay connected to the source of life. Jesus got up early to pray. Paul prayed without ceasing. The Psalms were written by people who were in daily conversation with God. This is not about performing religion. It is about maintaining a living relationship. What you do every day determines who you become over time.',
        keyTakeaway: 'Daily habits are not about discipline for its own sake. They are about staying connected to the one who transforms you.'
      },
      {
        id: 'm7-l2',
        title: 'Fighting Distraction',
        preview: 'We live in the most distracted culture in human history. The spiritual life requires intentional resistance — not because entertainment is evil, but because depth requires attention.',
        expanded: 'The enemy of a rich inner life is not wickedness most of the time. It is busyness and noise. Social media, entertainment, constant stimulation — none of these are inherently sinful, but all of them demand attention. And attention is finite. What you pay attention to shapes you. The person who spends hours scrolling and five minutes in prayer will not grow in the same direction as someone who reverses those numbers. This is not legalism. It is physics. You become what you consistently feed.',
        reflectivePrompt: 'What consumes most of your attention each day? What would need to change for Scripture and prayer to take more of that space?'
      },
      {
        id: 'm7-l3',
        title: 'Temptation and Patterns',
        preview: 'Temptation follows patterns. When you understand yours, you can build your life around them instead of being surprised by the same failures repeatedly.',
        expanded: 'One of the most practical things you can do for your spiritual life is understand your own patterns of temptation. What time of day? What emotional state? What relationships or environments? The Bible does not say temptation is sin — Jesus was tempted and never sinned. But it does say to flee youthful passions, to make no provision for the flesh, to guard your heart. This is not paranoia. It is wisdom. Knowing where you are weak and building structures around those weaknesses is not a lack of faith. It is maturity.',
        keyTakeaway: 'The goal is not to white-knuckle through temptation. It is to understand your patterns and build your life around them wisely.'
      },
      {
        id: 'm7-l4',
        title: 'Growth Over Time',
        preview: 'Spiritual growth is not linear. There will be dry seasons, failures, and stretches where nothing seems to be moving. Understanding this keeps you from quitting.',
        expanded: 'James 1 says trials produce endurance. Romans 5 says suffering produces character. Both of these imply that growth often happens through difficulty, not despite it. There will be seasons where you do not feel God, where prayer seems to go unanswered, where the Bible feels flat. These are not signs that something is wrong. They are often the ground where the deepest roots form. The Christians who last are not the ones who had the most consistent emotional highs. They are the ones who kept showing up in the dry seasons.',
        reflectivePrompt: 'Have you ever gone through a dry season in your faith? Looking back, what were you learning during that time?',
        keyTakeaway: 'Growth is often invisible while it is happening. Trust the process even when you cannot see the progress.'
      }
    ]
  },
  {
    id: 'module-8',
    number: 8,
    title: 'Going Deeper',
    subtitle: 'Exploring the themes that run through all of Scripture',
    description: 'Once you have a foundation, certain themes start appearing everywhere in Scripture. These are not separate topics — they are deeply connected threads woven through the whole story of God.',
    lessons: [
      {
        id: 'm8-l1',
        title: 'Grace & Mercy',
        preview: 'Grace and mercy are the foundation of everything. Mercy is God not giving us what we deserve, and grace is Him giving us what we could never earn.',
        expanded: 'This is where everything started to shift for me. I had heard the words grace and mercy my whole life, but I did not really understand what they meant. I thought mercy was just God being kind, and grace was just a general idea of forgiveness. But when you slow down and really look at it, it is much more serious than that. Mercy is God holding back what we actually deserve. And if we are honest about who we are without Him, that should stop us for a second. Because none of us would stand on our own. Grace is the opposite side of that. It is not just that God holds back judgment. He gives us something we did not earn and could not earn. Not because we got our life together, but because He chose to. That is the part that is hard to accept. We naturally want to earn things. We want to feel like we did enough to deserve it. But grace does not work like that. It is given. And when you actually start to understand that, not just in your head but in how you live, it changes everything.',
        keyTakeaway: 'Grace and mercy are not soft concepts. They are the entire foundation of the gospel.'
      },
      {
        id: 'm8-l2',
        title: 'Faith',
        preview: 'Faith is not certainty about everything. It is trust in someone who is certain — and learning to build your life on that trust over time.',
        expanded: 'Hebrews 11 is called the "faith chapter" — it lists ordinary people who believed God when there was no visible evidence yet of what He promised. Abraham left his home without knowing where he was going. Noah built a boat before it rained. These were not naive people. They were people who had enough evidence of God\'s faithfulness to act on what He said. That is biblical faith. It is not believing without evidence. It is trusting someone who has proven trustworthy — and then acting on that trust. Faith always has a corresponding action.',
        keyTakeaway: 'Faith is trust acted upon, not certainty felt. The feeling often follows the step of obedience.'
      },
      {
        id: 'm8-l3',
        title: 'Sin',
        preview: 'Sin is not just the list of things you should not do. Understanding what sin actually is — and what it does — is what makes the gospel make sense.',
        expanded: 'The root of sin in Scripture is not bad behavior. It is the choice to be our own authority instead of God\'s. That is what happened in Genesis 3 — not just disobedience, but the declaration of self-sovereignty. Every sin since then traces back to that same impulse: I know better than God. I want what I want. This matters because behavior-based morality never fixes the actual problem. You can clean up external behavior and still have a heart that is entirely oriented away from God. The gospel addresses the root, not just the fruit.',
        keyTakeaway: 'Sin is not primarily about behavior — it is about orientation. Who is Lord of your life?'
      },
      {
        id: 'm8-l4',
        title: 'Purpose',
        preview: 'You were not placed on earth to be comfortable. You were created to know God, reflect His character, and participate in what He is doing in the world.',
        expanded: 'The Westminster Catechism begins with a question: "What is the chief end of man?" The answer: to glorify God and enjoy Him forever. That sounds abstract until you understand what glorifying God means — living in such a way that who He is becomes visible through you. Your work, your relationships, your creativity, your suffering, your joy — all of it has potential to be an expression of who God is. You were not built for boredom or endless self-optimization. You were built for participation in something that matters far beyond your own story.',
        keyTakeaway: 'Purpose is not found by searching for yourself. It is found by being placed into something larger than yourself.'
      },
      {
        id: 'm8-l5',
        title: 'Spiritual Warfare',
        preview: 'The Bible is clear that there is a real spiritual battle happening. Understanding this does not mean being fearful — it means being awake.',
        expanded: 'Ephesians 6 says our struggle is not against flesh and blood, but against spiritual forces of evil. This is not mythology. It is the Bible\'s explanation for why the world is the way it is — why darkness seems to have such hold, why truth is resisted, why the same patterns of destruction show up in every culture and every generation. You do not fight this battle by being aggressive or theatrical. You fight it by knowing who you are in Christ, staying in Scripture, staying in prayer, and standing firm rather than retreating. The battle is real. But the outcome is not in question — Jesus already won.',
        keyTakeaway: 'You fight spiritual warfare not by being fearful, but by being grounded in what is true.'
      },
      {
        id: 'm8-l6',
        title: 'Identity in Christ',
        preview: 'One of the most transforming realizations in the Christian life is understanding that your identity is no longer defined by your past, your failures, or what others think of you.',
        expanded: 'In Christ, you are forgiven. You are a child of God. You are a new creation. You are loved with a love that does not fluctuate based on your performance. You have been given the Holy Spirit as a guarantee. You have access to God as a Father. You are seated in heavenly places. These are not aspirational phrases — they are legal realities that became true the moment you placed your trust in Jesus. Most Christians know these things intellectually but live as if none of them are true. The process of sanctification is, in large part, the process of learning to actually believe what God has already declared about you.',
        reflectivePrompt: 'What is your identity most rooted in right now? Performance, approval, the past, or who God says you are?',
        keyTakeaway: 'Your identity in Christ is not something you earn. It is something you learn to believe and live from.'
      }
    ]
  }
];

export const courseOverview = {
  title: 'The Foundation: Understanding the Bible & Living It',
  subtitle: 'A clear path for understanding Scripture, building strong foundations, and learning how to actually live what you believe.',
  totalModules: 8,
  totalLessons: courseModules.reduce((sum, m) => sum + m.lessons.length, 0),
};
