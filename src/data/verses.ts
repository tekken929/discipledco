export interface Verse {
  reference: string;
  text: string;
}

export const christFollowingVerses: Verse[] = [
  {
    reference: "Luke 9:23",
    text: "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
  },
  {
    reference: "Matthew 16:24",
    text: "If anyone would come after me, let him deny himself and take up his cross and follow me."
  },
  {
    reference: "John 14:6",
    text: "I am the way and the truth and the life. No one comes to the Father except through me."
  },
  {
    reference: "Matthew 11:28-30",
    text: "Come to me, all you who are weary and burdened, and I will give you rest. Take my yoke upon you and learn from me, for I am gentle and humble in heart, and you will find rest for your souls."
  },
  {
    reference: "John 15:5",
    text: "I am the vine; you are the branches. If you remain in me and I in you, you will bear much fruit; apart from me you can do nothing."
  },
  {
    reference: "Galatians 2:20",
    text: "I have been crucified with Christ and I no longer live, but Christ lives in me. The life I now live in the body, I live by faith in the Son of God."
  },
  {
    reference: "Romans 12:1-2",
    text: "Offer your bodies as a living sacrifice, holy and pleasing to God. Do not conform to the pattern of this world, but be transformed by the renewing of your mind."
  },
  {
    reference: "Philippians 3:13-14",
    text: "Forgetting what is behind and straining toward what is ahead, I press on toward the goal to win the prize for which God has called me heavenward in Christ Jesus."
  },
  {
    reference: "Matthew 6:33",
    text: "Seek first his kingdom and his righteousness, and all these things will be given to you as well."
  },
  {
    reference: "John 13:34-35",
    text: "A new command I give you: Love one another. As I have loved you, so you must love one another. By this everyone will know that you are my disciples."
  },
  {
    reference: "Colossians 3:23-24",
    text: "Whatever you do, work at it with all your heart, as working for the Lord, not for human masters, since you know that you will receive an inheritance from the Lord as a reward."
  },
  {
    reference: "1 Peter 2:21",
    text: "To this you were called, because Christ suffered for you, leaving you an example, that you should follow in his steps."
  },
  {
    reference: "Matthew 5:16",
    text: "Let your light shine before others, that they may see your good deeds and glorify your Father in heaven."
  },
  {
    reference: "James 1:22",
    text: "Do not merely listen to the word, and so deceive yourselves. Do what it says."
  },
  {
    reference: "Micah 6:8",
    text: "He has shown you, O mortal, what is good. And what does the Lord require of you? To act justly and to love mercy and to walk humbly with your God."
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight."
  },
  {
    reference: "1 Corinthians 10:31",
    text: "Whether you eat or drink or whatever you do, do it all for the glory of God."
  },
  {
    reference: "Ephesians 5:1-2",
    text: "Follow God's example, therefore, as dearly loved children and walk in the way of love, just as Christ loved us and gave himself up for us."
  },
  {
    reference: "Matthew 22:37-39",
    text: "Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself."
  },
  {
    reference: "2 Corinthians 5:17",
    text: "If anyone is in Christ, the new creation has come: The old has gone, the new is here!"
  },
  {
    reference: "Philippians 4:13",
    text: "I can do all this through him who gives me strength."
  },
  {
    reference: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go."
  },
  {
    reference: "1 John 2:6",
    text: "Whoever claims to live in him must live as Jesus did."
  },
  {
    reference: "Mark 12:30-31",
    text: "Love the Lord your God with all your heart and with all your soul and with all your mind and with all your strength. Love your neighbor as yourself."
  },
  {
    reference: "Hebrews 12:1-2",
    text: "Let us run with perseverance the race marked out for us, fixing our eyes on Jesus, the pioneer and perfecter of faith."
  }
];

export function getRandomVerse(): Verse {
  const randomIndex = Math.floor(Math.random() * christFollowingVerses.length);
  return christFollowingVerses[randomIndex];
}
