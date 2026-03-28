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
    summary: 'God saves Noah and his family from the great flood',
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
    summary: 'God tests Abraham\'s faith by asking him to sacrifice his son',
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
    summary: 'Moses leads the Israelites out of slavery in Egypt',
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
    summary: 'Young David defeats the giant Goliath with faith in God',
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
    summary: 'God protects Daniel from hungry lions',
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
    summary: 'Jonah learns obedience after being swallowed by a great fish',
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
    summary: 'Jesus is born in Bethlehem to fulfill prophecy',
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
    summary: 'A father\'s unconditional love for his wayward son',
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
    summary: 'Jesus rises from the dead, conquering sin and death',
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
  }
];
