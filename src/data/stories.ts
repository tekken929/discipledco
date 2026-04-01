import { Story } from '../types/story';

export const stories: Story[] = [
  {
    id: 'creation',
    title: 'Creation',
    icon: '🌍',
    order: 1,
    summary: `In creation, the Bible presents a beginning that is both intentional and ordered.
God speaks, and what is formed reflects purpose rather than chance. Light, land, life, and humanity all come into being through His word, establishing not only the world itself, but the structure within it.
Humanity is placed within that order with meaning and responsibility, not as an afterthought, but as part of what was designed from the start.
This account sets a foundation—that what exists is not random, and that God's word carries both authority and direction.`,
    shortSummary: 'God speaks the world into existence with intentional design. Light, land, and life emerge through His word, establishing order and purpose from the very beginning.',
    references: [
      {
        book: 'Genesis',
        chapter: 1,
        verse: '1',
        text: 'In the beginning God created the heavens and the earth.'
      },
      {
        book: 'Genesis',
        chapter: 1,
        verse: '27',
        text: 'So God created mankind in his own image, in the image of God he created them; male and female he created them.'
      },
      {
        book: 'Genesis',
        chapter: 2,
        verse: '2-3',
        text: 'By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work. Then God blessed the seventh day and made it holy.'
      }
    ]
  },
  {
    id: 'noah',
    title: 'Noah and the Ark',
    icon: '🚢',
    order: 2,
    summary: 'In the days of Noah, the direction of humanity had shifted far from what was right. What had been created with intention had become shaped by continual corruption, and the result was judgment through the flood. Yet even in that, there is a balance of justice and mercy. Noah is described as one who walked faithfully with God, and through him, life is preserved. The ark becomes both a place of refuge and a sign of obedience—something built in trust before the outcome could be seen. This account reflects not only the seriousness of drift, but the steadiness of God in preserving what He intends.',
    shortSummary: 'Noah walks faithfully with God in a corrupt world. Through the ark, God brings judgment on wickedness while preserving life through one righteous man.',
    references: [
      {
        book: 'Genesis',
        chapter: 6,
        verse: '13-14',
        text: 'So God said to Noah, "I am going to put an end to all people, for the earth is filled with violence because of them. I am surely going to destroy both them and the earth. So make yourself an ark of cypress wood."'
      },
      {
        book: 'Genesis',
        chapter: 7,
        verse: '17',
        text: 'For forty days the flood kept coming on the earth, and as the waters increased they lifted the ark high above the earth.'
      },
      {
        book: 'Genesis',
        chapter: 9,
        verse: '13',
        text: 'I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth.'
      }
    ]
  },
  {
    id: 'abraham',
    title: 'Abraham and Isaac',
    icon: '⛰️',
    order: 3,
    summary: `Abraham had been given a promise—descendants as numerous as the stars—but that promise rested in Isaac, the son of his old age.
When God instructs Abraham to offer Isaac as a sacrifice, the command seems to stand against everything that had been spoken before.
Yet Abraham obeys, moving forward not with explanations, but with trust that extends beyond what he can see or reconcile.
At the critical moment, God provides, and what is revealed is not cruelty, but a test that exposes the depth of Abraham's faith and foreshadows a greater sacrifice to come.`,
    shortSummary: 'God tests Abraham by asking him to sacrifice Isaac. Abraham obeys in faith, and God provides at the critical moment, revealing the depth of true trust.',
    references: [
      {
        book: 'Genesis',
        chapter: 22,
        verse: '2',
        text: 'Then God said, "Take your son, your only son, whom you love—Isaac—and go to the region of Moriah. Sacrifice him there as a burnt offering on a mountain I will show you."'
      },
      {
        book: 'Genesis',
        chapter: 22,
        verse: '12',
        text: '"Do not lay a hand on the boy," he said. "Do not do anything to him. Now I know that you fear God, because you have not withheld from me your son, your only son."'
      },
      {
        book: 'Genesis',
        chapter: 22,
        verse: '17-18',
        text: 'I will surely bless you and make your descendants as numerous as the stars in the sky and as the sand on the seashore. Your descendants will take possession of the cities of their enemies, and through your offspring all nations on earth will be blessed.'
      }
    ]
  },
  {
    id: 'moses',
    title: 'Moses and the Exodus',
    icon: '🌊',
    order: 4,
    summary: `The Israelites had been in bondage for generations, and their cry reached God, who remembered His covenant.
Moses, a man with a complicated past, is called to be the instrument of their deliverance—not because of his eloquence or strength, but because God chooses to work through him.
Through signs, plagues, and the parting of the sea, what becomes clear is that freedom comes not by human power, but by God's intervention.
The exodus is both a rescue and a formation—a people being brought out of slavery and into relationship with the One who delivered them.`,
    shortSummary: 'God calls Moses to lead the Israelites out of Egyptian slavery. Through plagues and the parting of the sea, God delivers His people into freedom.',
    references: [
      {
        book: 'Exodus',
        chapter: 3,
        verse: '10',
        text: 'So now, go. I am sending you to Pharaoh to bring my people the Israelites out of Egypt.'
      },
      {
        book: 'Exodus',
        chapter: 14,
        verse: '21-22',
        text: 'Then Moses stretched out his hand over the sea, and all that night the Lord drove the sea back with a strong east wind and turned it into dry land. The waters were divided, and the Israelites went through the sea on dry ground, with a wall of water on their right and on their left.'
      },
      {
        book: 'Exodus',
        chapter: 20,
        verse: '2-3',
        text: 'I am the Lord your God, who brought you out of Egypt, out of the land of slavery. You shall have no other gods before me.'
      }
    ]
  },
  {
    id: 'david-goliath',
    title: 'David and Goliath',
    icon: '⚔️',
    order: 5,
    summary: `When Israel faced the Philistines, fear gripped the army as Goliath's taunts went unanswered day after day.
David, a shepherd sent to bring food to his brothers, saw the situation differently—not as an impossible challenge, but as an affront to the living God.
What he carried was not the armor of a soldier, but confidence rooted in past faithfulness—lions and bears defeated in the fields while protecting his father's sheep.
With a sling and a stone, David demonstrates that victory belongs not to the heavily armed, but to those who trust in God's name and power.`,
    shortSummary: 'Young shepherd David faces the giant Goliath with faith instead of armor. With a sling and stone, he shows that victory belongs to those who trust God.',
    references: [
      {
        book: '1 Samuel',
        chapter: 17,
        verse: '45',
        text: 'David said to the Philistine, "You come against me with sword and spear and javelin, but I come against you in the name of the Lord Almighty, the God of the armies of Israel, whom you have defied."'
      },
      {
        book: '1 Samuel',
        chapter: 17,
        verse: '49-50',
        text: 'Reaching into his bag and taking out a stone, he slung it and struck the Philistine on the forehead. The stone sank into his forehead, and he fell facedown on the ground. So David triumphed over the Philistine with a sling and a stone.'
      }
    ]
  },
  {
    id: 'daniel',
    title: 'Daniel in the Lions\' Den',
    icon: '🦁',
    order: 6,
    summary: `Daniel served in a foreign empire with integrity that stood out, and that distinction became a target.
When a decree was crafted to trap him, Daniel faced a choice: compromise his practice of prayer or face death.
He chose faithfulness, continuing to pray openly as he had always done, fully aware of the consequences.
What follows is not escape from the den, but preservation within it—God shuts the mouths of lions, and what was meant to destroy Daniel instead displays God's sovereignty and vindication of those who remain faithful.`,
    shortSummary: 'Daniel refuses to compromise his faith despite a deadly decree. God protects him in the lions\' den, vindicating those who remain faithful.',
    references: [
      {
        book: 'Daniel',
        chapter: 6,
        verse: '16',
        text: 'So the king gave the order, and they brought Daniel and threw him into the lions\' den. The king said to Daniel, "May your God, whom you serve continually, rescue you!"'
      },
      {
        book: 'Daniel',
        chapter: 6,
        verse: '22',
        text: 'My God sent his angel, and he shut the mouths of the lions. They have not hurt me, because I was found innocent in his sight.'
      }
    ]
  },
  {
    id: 'jonah',
    title: 'Jonah and the Whale',
    icon: '🐋',
    order: 7,
    summary: `Jonah was called to preach to Nineveh, a city known for its wickedness, but instead of going, he fled in the opposite direction.
His attempt to escape God's calling led him into a storm and eventually into the belly of a great fish, where he had nothing left but prayer.
After three days, Jonah is given a second chance, and this time he obeys—proclaiming God's message to Nineveh.
What unfolds reveals not only Jonah's resistance, but God's compassion for those who repent, even when it challenges the prophet's own sense of justice.`,
    shortSummary: 'Jonah flees from God\'s call but is swallowed by a great fish. Given a second chance, he obeys and witnesses God\'s compassion on Nineveh.',
    references: [
      {
        book: 'Jonah',
        chapter: 1,
        verse: '17',
        text: 'Now the Lord provided a huge fish to swallow Jonah, and Jonah was in the belly of the fish three days and three nights.'
      },
      {
        book: 'Jonah',
        chapter: 2,
        verse: '1',
        text: 'From inside the fish Jonah prayed to the Lord his God.'
      },
      {
        book: 'Jonah',
        chapter: 3,
        verse: '10',
        text: 'When God saw what they did and how they turned from their evil ways, he relented and did not bring on them the destruction he had threatened.'
      }
    ]
  },
  {
    id: 'birth-jesus',
    title: 'The Birth of Jesus',
    icon: '⭐',
    order: 8,
    summary: `Centuries of prophecy converge in Bethlehem, where a young woman gives birth in the humblest of circumstances.
The King of Kings enters the world not in a palace, but in a manger, announced not to rulers, but to shepherds in the fields.
What begins in obscurity carries the weight of heaven's plan—God Himself taking on flesh to dwell among humanity.
This birth is both an arrival and an invitation, the Word made flesh, bringing light into a world that had been waiting in darkness.`,
    shortSummary: 'Jesus is born in Bethlehem in humble circumstances, fulfilling ancient prophecy. The King of Kings enters the world as God made flesh.',
    references: [
      {
        book: 'Luke',
        chapter: 2,
        verse: '7',
        text: 'And she gave birth to her firstborn, a son. She wrapped him in cloths and placed him in a manger, because there was no guest room available for them.'
      },
      {
        book: 'Luke',
        chapter: 2,
        verse: '10-11',
        text: 'But the angel said to them, "Do not be afraid. I bring you good news that will cause great joy for all the people. Today in the town of David a Savior has been born to you; he is the Messiah, the Lord."'
      },
      {
        book: 'Matthew',
        chapter: 2,
        verse: '11',
        text: 'On coming to the house, they saw the child with his mother Mary, and they bowed down and worshiped him. Then they opened their treasures and presented him with gifts of gold, frankincense and myrrh.'
      }
    ]
  },
  {
    id: 'prodigal-son',
    title: 'The Prodigal Son',
    icon: '🏠',
    order: 9,
    summary: `A son demands his inheritance early, leaves home, and squanders everything in reckless living until he finds himself destitute and desperate.
In his lowest moment, he remembers his father's house and decides to return, not as a son, but hoping only to be treated as a servant.
Yet while he is still far off, the father sees him, runs to him, and embraces him with a love that has been waiting and watching.
This parable captures the heart of the gospel—repentance met with extravagant grace, and a Father who celebrates the return of what was lost.`,
    shortSummary: 'A wayward son squanders his inheritance and returns home broken. His father runs to embrace him, demonstrating God\'s extravagant grace and love.',
    references: [
      {
        book: 'Luke',
        chapter: 15,
        verse: '20',
        text: 'So he got up and went to his father. But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him.'
      },
      {
        book: 'Luke',
        chapter: 15,
        verse: '24',
        text: 'For this son of mine was dead and is alive again; he was lost and is found. So they began to celebrate.'
      }
    ]
  },
  {
    id: 'resurrection',
    title: 'The Resurrection',
    icon: '✝️',
    order: 10,
    summary: `After the crucifixion, Jesus' body is laid in a tomb, sealed, and guarded, and His followers are left in despair, believing everything has ended.
But on the third day, women arrive at the tomb to find it empty, and an angel declares what seemed impossible: "He is not here; He has risen."
What follows are appearances to His disciples, physical proof that death has been defeated, and the old covenant fulfilled in the new.
The resurrection is the cornerstone of Christian faith—validating Jesus' claims, securing forgiveness, and offering the certainty of eternal life to all who believe.`,
    shortSummary: 'Jesus rises from the dead on the third day, conquering death. The empty tomb and His appearances validate His claims and secure eternal life for believers.',
    references: [
      {
        book: 'Matthew',
        chapter: 28,
        verse: '5-6',
        text: 'The angel said to the women, "Do not be afraid, for I know that you are looking for Jesus, who was crucified. He is not here; he has risen, just as he said. Come and see the place where he lay."'
      },
      {
        book: 'John',
        chapter: 20,
        verse: '27-28',
        text: 'Then he said to Thomas, "Put your finger here; see my hands. Reach out your hand and put it into my side. Stop doubting and believe." Thomas said to him, "My Lord and my God!"'
      },
      {
        book: '1 Corinthians',
        chapter: 15,
        verse: '3-4',
        text: 'For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures.'
      }
    ]
  },
  {
    id: 'good-samaritan',
    title: 'The Good Samaritan',
    icon: '🤝',
    order: 11,
    summary: `A man is beaten, robbed, and left half-dead on the road to Jericho. Two religious leaders—a priest and a Levite—see him and pass by on the other side, avoiding involvement.
Then a Samaritan, someone typically despised by Jews, stops, bandages the man's wounds, takes him to an inn, and pays for his care.
Jesus tells this parable to answer the question "Who is my neighbor?" and the answer challenges every assumption about religious duty versus genuine compassion.
Real love isn't shown through religious position or cultural identity, but through practical mercy extended to anyone in need, even strangers or enemies.`,
    shortSummary: 'A Samaritan shows mercy to a beaten traveler ignored by religious leaders. Jesus reveals that true neighborly love transcends cultural boundaries.',
    references: [
      {
        book: 'Luke',
        chapter: 10,
        verse: '33-34',
        text: 'But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him. He went to him and bandaged his wounds, pouring on oil and wine. Then he put the man on his own donkey, brought him to an inn and took care of him.'
      },
      {
        book: 'Luke',
        chapter: 10,
        verse: '36-37',
        text: 'Which of these three do you think was a neighbor to the man who fell into the hands of robbers? The expert in the law replied, "The one who had mercy on him." Jesus told him, "Go and do likewise."'
      }
    ]
  },
  {
    id: 'sower',
    title: 'The Parable of the Sower',
    icon: '🌱',
    order: 12,
    summary: `A farmer scatters seed, and it falls on four types of ground: the path, rocky soil, thorns, and good soil. Each represents how people receive God's word.
Some hear it but never understand—the enemy snatches it away immediately. Others receive it with joy but have no root, falling away when trouble comes.
Still others hear, but the worries of life and the deceitfulness of wealth choke it out, making it unfruitful.
But the seed on good soil represents those who hear, understand, and produce a harvest—thirty, sixty, or even a hundred times what was sown.
This parable reveals that spiritual fruitfulness depends not just on hearing God's word, but on the condition of the heart that receives it.`,
    shortSummary: 'A farmer scatters seed on different soils, representing how people receive God\'s word. Only good soil produces lasting fruit.',
    references: [
      {
        book: 'Matthew',
        chapter: 13,
        verse: '8',
        text: 'Still other seed fell on good soil, where it produced a crop—a hundred, sixty or thirty times what was sown.'
      },
      {
        book: 'Matthew',
        chapter: 13,
        verse: '23',
        text: 'But the seed falling on good soil refers to someone who hears the word and understands it. This is the one who produces a crop, yielding a hundred, sixty or thirty times what was sown.'
      }
    ]
  },
  {
    id: 'lost-sheep',
    title: 'The Lost Sheep',
    icon: '🐑',
    order: 13,
    summary: `A shepherd has a hundred sheep, and when one wanders off, he doesn't calculate that ninety-nine percent is acceptable—he leaves the ninety-nine and searches for the one that is lost.
When he finds it, he joyfully carries it home on his shoulders and calls his friends to celebrate.
Jesus uses this image to show God's heart for those who have strayed. Each person matters infinitely, and heaven itself rejoices over one sinner who repents.
This isn't about statistics or efficiency; it's about the intrinsic value of every individual soul and God's relentless pursuit of those who are lost.`,
    shortSummary: 'A shepherd leaves ninety-nine sheep to find one that is lost. God pursues each person with relentless love and rejoices at their return.',
    references: [
      {
        book: 'Luke',
        chapter: 15,
        verse: '4-6',
        text: 'Suppose one of you has a hundred sheep and loses one of them. Doesn\'t he leave the ninety-nine in the open country and go after the lost sheep until he finds it? And when he finds it, he joyfully puts it on his shoulders and goes home. Then he calls his friends and neighbors together and says, "Rejoice with me; I have found my lost sheep."'
      },
      {
        book: 'Luke',
        chapter: 15,
        verse: '7',
        text: 'I tell you that in the same way there will be more rejoicing in heaven over one sinner who repents than over ninety-nine righteous persons who do not need to repent.'
      }
    ]
  },
  {
    id: 'wheat-tares',
    title: 'The Wheat and the Tares',
    icon: '🌾',
    order: 14,
    summary: `A farmer plants good seed in his field, but while everyone sleeps, an enemy sows weeds among the wheat. As they grow together, the servants want to pull up the weeds immediately.
But the master says to wait until harvest, because removing the weeds prematurely might uproot the wheat as well. At harvest time, they will be separated—the wheat gathered into the barn, the weeds bundled and burned.
This parable addresses a reality that troubles many: why does God allow evil to exist alongside good? Why doesn't He intervene immediately?
Jesus explains that judgment will come, but not yet. There is a time appointed for separation, and until then, both grow together. Our job is not to be the judge, but to remain faithful, knowing that God will bring justice at the right time.`,
    shortSummary: 'Good wheat and enemy-sown weeds grow together until harvest. God allows both to coexist now, but separation and judgment will come.',
    references: [
      {
        book: 'Matthew',
        chapter: 13,
        verse: '29-30',
        text: 'No, he answered, because while you are pulling the weeds, you may uproot the wheat with them. Let both grow together until the harvest. At that time I will tell the harvesters: First collect the weeds and tie them in bundles to be burned; then gather the wheat and bring it into my barn.'
      },
      {
        book: 'Matthew',
        chapter: 13,
        verse: '40-43',
        text: 'As the weeds are pulled up and burned in the fire, so it will be at the end of the age. The Son of Man will send out his angels, and they will weed out of his kingdom everything that causes sin and all who do evil... Then the righteous will shine like the sun in the kingdom of their Father.'
      }
    ]
  },
  {
    id: 'unforgiving-servant',
    title: 'The Unforgiving Servant',
    icon: '⚖️',
    order: 15,
    summary: `A servant owes his king an astronomical debt—millions of dollars in today's terms, an amount he could never repay. He begs for mercy, and the king, moved with compassion, cancels the entire debt.
That same servant then finds a fellow servant who owes him a tiny fraction of what he was forgiven—maybe a few months' wages. When the man begs for patience, the first servant refuses and has him thrown into prison.
When the king hears about this, he is furious. "Shouldn't you have had mercy on your fellow servant just as I had on you?" He reinstates the original debt and hands the unforgiving servant over to the jailers.
This parable reveals the inseparable link between receiving forgiveness and extending it. Those who truly grasp the magnitude of what they've been forgiven cannot withhold forgiveness from others. To refuse to forgive is to show you don't understand what you've received.`,
    shortSummary: 'A servant forgiven a massive debt refuses to forgive a small one. His master reinstates his debt, showing forgiveness must be given as it was received.',
    references: [
      {
        book: 'Matthew',
        chapter: 18,
        verse: '32-35',
        text: 'Then the master called the servant in. "You wicked servant," he said, "I canceled all that debt of yours because you begged me to. Shouldn\'t you have had mercy on your fellow servant just as I had on you?" In anger his master handed him over to the jailers to be tortured, until he should pay back all he owed. This is how my heavenly Father will treat each of you unless you forgive your brother or sister from your heart.'
      }
    ]
  }
];
