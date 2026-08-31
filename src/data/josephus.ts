export interface JosephusVerse {
  verse: number;
  original: string;
  translation: string;
}

export interface JosephusChapter {
  book: number;
  chapter: number;
  title: string;
  verses: JosephusVerse[];
}

export const josephusData: JosephusChapter[] = [
  {
    book: 1,
    chapter: 1,
    title: 'Antiquities of the Jews — Book 1, Chapter 1',
    verses: [
      {
        verse: 1,
        original: 'Those who undertake to write histories, do not, I perceive, take that trouble on one and the same account, but for many reasons, and those such as are very different one from another.',
        translation: 'Those who set out to write histories do so, I observe, not for a single reason but for many, and these reasons differ greatly from one another.',
      },
      {
        verse: 2,
        original: 'For some of them apply themselves to this part of learning to show their skill in composition, and that they may therein acquire a reputation for speaking finely. Others of them there are who write histories in order to gratify those that happen to be concerned in them, and on that account have spared no pains, but rather gone beyond their own abilities in the performance.',
        translation: 'Some devote themselves to this field of learning to display their literary skill and to earn a reputation for eloquence. Others write histories to please those who happen to be involved in the events, and for this reason spare no effort, even exceeding their own abilities in the process.',
      },
      {
        verse: 3,
        original: 'But others there are, who, of necessity and by force, are driven to write history, because they are concerned in the facts, and so cannot excuse themselves from committing them to writing, for the advantage of posterity; nay, there are not a few who are induced to draw their historical facts out of darkness into light, and to produce them for the benefit of the public, on account of the great importance of the facts themselves with which they have been concerned.',
        translation: 'Still others are compelled to write history out of necessity, because they were personally involved in the events and cannot excuse themselves from recording them for the benefit of future generations. Indeed, not a few are motivated to bring their historical facts out of obscurity into light and to present them for the public good, because of the great importance of the events in which they took part.',
      },
      {
        verse: 4,
        original: 'Now of these several reasons for writing history, I must profess the two last were my own reasons also; for since I was myself interested in that war which we Jews had with the Romans, and knew myself its particular actions, and what conclusion it had, I was forced to give the history of it, because I saw that others perverted the truth of those actions in their writings.',
        translation: 'Of these several reasons for writing history, I must acknowledge that the last two were also my own. Since I was personally involved in the war we Jews fought against the Romans, and knew its specific events and its outcome, I was compelled to write its history because I saw that others had distorted the truth of those events in their writings.',
      },
      {
        verse: 5,
        original: 'Now I have undertaken the present work, as thinking it will appear to all the Greeks worthy of their study; for it will contain all our antiquities, and the constitution of our government, as interpreted out of the Hebrew Scriptures.',
        translation: 'I have undertaken the present work in the belief that it will prove worthy of study for all the Greeks, for it will contain all our ancient history and the structure of our government, as translated from the Hebrew Scriptures.',
      },
      {
        verse: 6,
        original: 'And indeed I did formerly intend, when I wrote of the war, to explain who the Jews originally were,—what fortunes they had been subject to,—and by what legislator they had been instructed in piety, and the exercise of other virtues,—what wars also they had made in remote ages, till they were unwillingly engaged in this last with the Romans:',
        translation: 'Indeed, when I wrote about the war, I originally intended to explain who the Jews were from the beginning, what fortunes they had endured, and under what lawgiver they had been instructed in piety and the practice of other virtues. I also meant to describe the wars they fought in ages past, until they were drawn unwillingly into this final conflict with the Romans.',
      },
      {
        verse: 7,
        original: 'but because this work would take up a great compass, I separated it into a set treatise by itself, with a beginning of its own, and its own conclusion; but in process of time, as usually happens to such as undertake great things, I grew weary and went on slowly, it being a large subject, and a difficult thing to translate our history into a foreign, and to us unaccustomed, language.',
        translation: 'But because this work would be very lengthy, I set it apart as a separate treatise with its own beginning and conclusion. Over time, as often happens to those who undertake great projects, I grew weary and progressed slowly, for it was a vast subject and a difficult thing to translate our history into a foreign language unfamiliar to us.',
      },
      {
        verse: 8,
        original: 'However, some persons there were who desired to know our history, and so exhorted me to go on with it; and, above all the rest, Epaphroditus, a man who is a lover of all kind of learning, but is principally delighted with the knowledge of history, and this on account of his having been himself concerned in great affairs, and many turns of fortune, and having shown a wonderful vigor of an excellent nature, and an immovable virtuous resolution in them all.',
        translation: 'Nevertheless, there were some who desired to know our history and urged me to continue. Above all others, Epaphroditus, a man who loves every kind of learning but takes particular delight in the study of history. This is because he himself had been involved in great affairs and many changes of fortune, and had shown a remarkable vigor of an excellent nature and an unwavering virtuous resolve through them all.',
      },
      {
        verse: 9,
        original: 'I yielded to this man\u2019s persuasions, who always excites such as have abilities in what is useful and acceptable, to join their endeavors with his. I was also ashamed myself to permit any laziness of disposition to have a greater influence upon me than the delight of taking pains in such studies as were very useful: I thereupon stirred up myself, and went on with my work more cheerfully. Besides the foregoing motives, I had others which I greatly reflected on; and these were, that our forefathers were willing to communicate such things to others; and that some of the Greeks took considerable pains to know the affairs of our nation.',
        translation: 'I yielded to this man\u2019s persuasion, for he always encourages those who have abilities in what is useful and worthwhile to join their efforts with his. I was also ashamed to allow any laziness of disposition to have greater influence over me than the satisfaction of applying myself to such useful studies. I therefore stirred myself up and continued my work more cheerfully. Besides the motives already mentioned, I reflected on others as well: our forefathers were willing to share such knowledge with others, and some of the Greeks had taken considerable pains to learn the affairs of our nation.',
      },
      {
        verse: 10,
        original: 'I found, therefore, that the second of the Ptolemies was a king who was extraordinarily diligent in what concerned learning, and the collection of books; that he was also peculiarly ambitious to procure a translation of our law, and of the constitution of our government therein contained, into the Greek tongue.',
        translation: 'I discovered, then, that Ptolemy II was a king extraordinarily diligent in matters of learning and the collection of books. He was also particularly eager to obtain a translation of our law and the constitution of our government contained within it into the Greek language.',
      },
      {
        verse: 11,
        original: 'Now Eleazar, the high priest, one not inferior to any other of that dignity among us, did not envy the forenamed king the participation of that advantage, which otherwise he would for certain have denied him, but that he knew the custom of our nation was, to hinder nothing of what we esteemed ourselves from being communicated to others.',
        translation: 'Now Eleazar the high priest, who was inferior to none of that dignity among us, did not begrudge the aforementioned king the sharing of that benefit, which he would otherwise have certainly denied him. Rather, he knew that the custom of our nation was to withhold nothing of what we value from being shared with others.',
      },
      {
        verse: 12,
        original: 'Accordingly, I thought it became me both to imitate the generosity of our high priest, and to suppose there might even now be many lovers of learning like the king; for he did not obtain all our writings at that time; but those who were sent to Alexandria as interpreters, gave him only the books of the law,',
        translation: 'Accordingly, I thought it fitting both to imitate the generosity of our high priest and to suppose that even now there might be many lovers of learning like that king. For he did not obtain all our writings at that time; those sent to Alexandria as translators gave him only the books of the Law.',
      },
      {
        verse: 13,
        original: 'while there were a vast number of other matters in our sacred books. They, indeed, contain in them the history of five thousand years; in which time happened many strange accidents, many chances of war, and great actions of the commanders, and mutations of the form of our government.',
        translation: 'Yet there were a vast number of other matters in our sacred books. They contain the history of five thousand years, during which occurred many extraordinary events, many turns of war, great deeds by commanders, and changes in the form of our government.',
      },
      {
        verse: 14,
        original: 'Upon the whole, a man that will peruse this history, may principally learn from it, that all events succeed well, even to an incredible degree, and the reward of felicity is proposed by God; but then it is to those that follow his will, and do not venture to break his excellent laws: and that so far as men any way apostatize from the accurate observation of them, what was practicable before becomes impracticable; and whatsoever they set about as a good thing is converted into an incurable calamity.',
        translation: 'In sum, a person who reads this history may learn above all that all events turn out well, even to an extraordinary degree, and that the reward of happiness is offered by God, but only to those who follow His will and do not dare to violate His excellent laws. To the extent that people depart from careful observance of them, what was once possible becomes impossible, and whatever they undertake as a good thing turns into an incurable calamity.',
      },
      {
        verse: 15,
        original: 'And now I exhort all those that peruse these books, to apply their minds to God; and to examine the mind of our legislator, whether he hath not understood his nature in a manner worthy of him; and hath not ever ascribed to him such operations as become his power, and hath not preserved his writings from those indecent fables which others have framed,',
        translation: 'Now I urge all who read these books to direct their minds toward God and to examine the understanding of our lawgiver, whether he has not comprehended God\u2019s nature in a manner worthy of Him, whether he has not always attributed to Him such works as befit His power, and whether he has not preserved his writings from the indecent fables that others have fabricated.',
      },
      {
        verse: 16,
        original: 'although, by the great distance of time when he lived, he might have securely forged such lies; for he lived two thousand years ago; at which vast distance of ages the poets themselves have not been so hardy as to fix even the generations of their gods, much less the actions of their men, or their own laws.',
        translation: 'Even though, given the great distance of time in which he lived, he could have safely fabricated such lies. For he lived two thousand years ago, and at such a vast remove of ages the poets themselves have not been so bold as to establish even the genealogies of their gods, much less the deeds of their heroes or their own laws.',
      },
      {
        verse: 17,
        original: 'As I proceed, therefore, I shall accurately describe what is contained in our records, in the order of time that belongs to them; for I have already promised so to do throughout this undertaking; and this without adding any thing to what is therein contained, or taking away any thing therefrom.',
        translation: 'As I proceed, then, I shall accurately describe what is contained in our records in the chronological order to which they belong, for I have already promised to do so throughout this work, and this without adding anything to what is contained therein or removing anything from it.',
      },
      {
        verse: 18,
        original: 'But because almost all our constitution depends on the wisdom of Moses, our legislator, I cannot avoid saying somewhat concerning him beforehand, though I shall do it briefly; I mean, because otherwise those that read my book may wonder how it comes to pass, that my discourse, which promises an account of laws and historical facts, contains so much of philosophy.',
        translation: 'Because nearly all our constitution depends on the wisdom of Moses, our lawgiver, I cannot avoid saying something about him in advance, though I shall do so briefly. Otherwise, those who read my book may wonder why my account, which promises a record of laws and historical facts, contains so much philosophy.',
      },
      {
        verse: 19,
        original: 'The reader is therefore to know, that Moses deemed it exceeding necessary, that he who would conduct his own life well, and give laws to others, in the first place should consider the divine nature; and, upon the contemplation of God\u2019s operations, should thereby imitate the best of all patterns, so far as it is possible for human nature to do, and to endeavor to follow after it:',
        translation: 'The reader should therefore know that Moses considered it absolutely necessary that anyone who would live his own life well and give laws to others should first contemplate the divine nature. Through the contemplation of God\u2019s works, he should imitate the best of all patterns, as far as is possible for human nature, and strive to follow after it.',
      },
      {
        verse: 20,
        original: 'neither could the legislator himself have a right mind without such a contemplation; nor would any thing he should write tend to the promotion of virtue in his readers; I mean, unless they be taught first of all, that God is the Father and Lord of all things, and sees all things, and that thence he bestows a happy life upon those that follow him; but plunges such as do not walk in the paths of virtue into inevitable miseries.',
        translation: 'Nor could the lawgiver himself possess a sound mind without such contemplation, nor would anything he wrote promote virtue in his readers, unless they were first taught that God is the Father and Lord of all things, that He sees all things, and that He bestows a happy life on those who follow Him but plunges those who do not walk in the paths of virtue into inevitable miseries.',
      },
      {
        verse: 21,
        original: 'Now when Moses was desirous to teach this lesson to his countrymen, he did not begin the establishment of his laws after the same manner that other legislators did; I mean, upon contracts and other rights between one man and another, but by raising their minds upwards to regard God, and his creation of the world; and by persuading them, that we men are the most excellent of the creatures of God upon earth. Now when once he had brought them to submit to religion, he easily persuaded them to submit in all other things:',
        translation: 'When Moses desired to teach this lesson to his fellow countrymen, he did not begin the establishment of his laws in the same manner as other legislators did, that is, with contracts and other rights between one person and another. Instead, he lifted their minds upward to regard God and His creation of the world, and persuaded them that we human beings are the most excellent of God\u2019s creatures on earth. Once he had brought them to submit to religion, he easily persuaded them to submit in all other matters.',
      },
      {
        verse: 22,
        original: 'for as to other legislators, they followed fables, and by their discourses transferred the most reproachful of human vices unto the gods, and so afforded wicked men the most plausible excuses for their crimes;',
        translation: 'As for other legislators, they followed myths and in their discourses attributed the most disgraceful of human vices to the gods, thereby providing wicked people with the most plausible excuses for their crimes.',
      },
      {
        verse: 23,
        original: 'but as for our legislator, when he had once demonstrated that God was possessed of perfect virtue, he supposed that men also ought to strive after the participation of it; and on those who did not so think, and so believe, he inflicted the severest punishments.',
        translation: 'But our lawgiver, once he had demonstrated that God possessed perfect virtue, held that people should also strive to partake of it. And upon those who did not think and believe accordingly, he inflicted the severest punishments.',
      },
      {
        verse: 24,
        original: 'I exhort, therefore, my readers to examine this whole undertaking in that view; for thereby it will appear to them, that there is nothing therein disagreeable either to the majesty of God, or to his love to mankind; for all things have here a reference to the nature of the universe; while our legislator speaks some things wisely, but enigmatically, and others under a decent allegory, but still explains such things as required a direct explication plainly and expressly.',
        translation: 'I therefore urge my readers to examine this entire work from that perspective, for by doing so it will become clear to them that there is nothing in it contrary either to the majesty of God or to His love for mankind. All things here have reference to the nature of the universe. Our lawgiver speaks some things wisely but enigmatically, and others under a fitting allegory, yet still explains plainly and directly those matters that require direct explanation.',
      },
      {
        verse: 25,
        original: 'However, those that have a mind to know the reasons of every thing, may find here a very curious philosophical theory, which I now indeed shall wave the explication of; but if God afford me time for it, I will set about writing it after I have finished the present work.',
        translation: 'However, those who wish to understand the reasons behind everything may find here a very intricate philosophical theory, which I shall set aside for now. But if God grants me the time, I will undertake to write about it after I have finished the present work.',
      },
      {
        verse: 26,
        original: 'I shall now betake myself to the history before me, after I have first mentioned what Moses says of the creation of the world, which I find described in the sacred books after the manner following.',
        translation: 'I shall now turn to the history before me, after first relating what Moses says about the creation of the world, which I find described in the sacred books in the following manner.',
      },
    ],
  },
];
