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
  {
    book: 1,
    chapter: 2,
    title: 'Antiquities of the Jews — Book 1, Chapter 2 (vv. 27-51)',
    verses: [
      {
        verse: 27,
        original: 'In the beginning God created the heaven and the earth. But when the earth did not come into sight, but was covered with thick darkness, and a wind moved upon its surface, God commanded that there should be light:',
        translation: 'In the beginning God created the heavens and the earth. Now the earth was formless and covered in thick darkness, and a wind moved over its surface, when God commanded that there should be light.',
      },
      {
        verse: 28,
        original: 'and when that was made, he considered the whole mass, and separated the light and the darkness; and the name he gave to one was Night, and the other he called Day: and he named the beginning of light, and the time of rest, The Evening and The Morning,',
        translation: 'When the light was made, He surveyed the whole mass and separated the light from the darkness. He called one Night and the other Day, and He named the beginning of light and the time of rest the Evening and the Morning.',
      },
      {
        verse: 29,
        original: 'and this was indeed the first day. But Moses said it was one day; the cause of which I am able to give even now; but because I have promised to give such reasons for all things in a treatise by itself, I shall put off its exposition till that time.',
        translation: 'This was indeed the first day. But Moses said it was one day, the reason for which I am able to give even now. However, because I have promised to give such reasons for all things in a separate treatise, I shall defer its explanation until that time.',
      },
      {
        verse: 30,
        original: 'After this, on the second day, he placed the heaven over the whole world, and separated it from the other parts, and he determined it should stand by itself. He also placed a crystalline [firmament] round it, and put it together in a manner agreeable to the earth, and fitted it for giving moisture and rain, and for affording the advantage of dews.',
        translation: 'After this, on the second day, He placed the heaven over the whole world and separated it from the other parts, determining that it should stand by itself. He also placed a crystalline firmament around it, fitting it to the earth in a manner suited for providing moisture and rain and for the benefit of dews.',
      },
      {
        verse: 31,
        original: 'On the third day he appointed the dry land to appear, with the sea itself round about it; and on the very same day he made the plants and the seeds to spring out of the earth. On the fourth day he adorned the heaven with the sun, the moon, and the other stars, and appointed them their motions and courses, that the vicissitudes of the seasons might be clearly signified.',
        translation: 'On the third day He commanded the dry land to appear, with the sea surrounding it, and on that very same day He made the plants and seeds spring up from the earth. On the fourth day He adorned the heavens with the sun, the moon, and the other stars, and appointed their motions and courses so that the changing of the seasons might be clearly marked.',
      },
      {
        verse: 32,
        original: 'And on the fifth day he produced the living creatures, both those that swim, and those that fly; the former in the sea, the latter in the air: he also sorted them as to society and mixture, for procreation, and that their kinds might increase and multiply. On the sixth day he created the four-footed beasts, and made them male and female: on the same day he also formed man.',
        translation: 'On the fifth day He brought forth living creatures, both those that swim and those that fly, the former in the sea and the latter in the air. He also arranged them by kind and pairing for procreation, so that their species might increase and multiply. On the sixth day He created the four-footed beasts and made them male and female, and on that same day He also formed man.',
      },
      {
        verse: 33,
        original: 'Accordingly Moses says, That in just six days the world, and all that is therein, was made. And that the seventh day was a rest, and a release from the labor of such operations; whence it is that we Celebrate a rest from our labors on that day, and call it the Sabbath, which word denotes rest in the Hebrew tongue.',
        translation: 'Accordingly Moses says that in just six days the world and all that is in it was made. The seventh day was a rest, a release from the labor of such works. That is why we observe a rest from our labors on that day and call it the Sabbath, a word that means rest in the Hebrew tongue.',
      },
      {
        verse: 34,
        original: 'Moreover, Moses, after the seventh day was over begins to talk philosophically; and concerning the formation of man, says thus: That God took dust from the ground, and formed man, and inserted in him a spirit and a soul. This man was called Adam, which in the Hebrew tongue signifies one that is red, because he was formed out of red earth, compounded together; for of that kind is virgin and true earth.',
        translation: 'After the seventh day, Moses begins to speak philosophically. Concerning the formation of man, he says this: God took dust from the ground and formed man, and placed within him a spirit and a soul. This man was called Adam, which in the Hebrew tongue means one who is red, because he was formed from red earth mixed together, for that is the nature of virgin and pure earth.',
      },
      {
        verse: 35,
        original: 'God also presented the living creatures, when he had made them, according to their kinds, both male and female, to Adam, who gave them those names by which they are still called. But when he saw that Adam had no female companion, no society, for there was no such created, and that he wondered at the other animals which were male and female, he laid him asleep, and took away one of his ribs, and out of it formed the woman;',
        translation: 'God also presented the living creatures to Adam, each according to its kind, both male and female, and Adam gave them the names by which they are still called. But when He saw that Adam had no female companion, for none had been created, and that he marveled at the other animals which were male and female, God caused him to fall asleep, took one of his ribs, and from it formed the woman.',
      },
      {
        verse: 36,
        original: 'whereupon Adam knew her when she was brought to him, and acknowledged that she was made out of himself. Now a woman is called in the Hebrew tongue Issa; but the name of this woman was Eve, which signifies the mother of all living.',
        translation: 'When she was brought to him, Adam recognized her and acknowledged that she was made from himself. A woman is called Issa in the Hebrew tongue, but the name of this woman was Eve, which means the mother of all living.',
      },
      {
        verse: 37,
        original: 'Moses says further, that God planted a paradise in the east, flourishing with all sorts of trees; and that among them was the tree of life, and another of knowledge, whereby was to be known what was good and evil;',
        translation: 'Moses further says that God planted a paradise in the east, flourishing with every kind of tree, and that among them were the tree of life and the tree of knowledge, by which one could discern good and evil.',
      },
      {
        verse: 38,
        original: 'and that when he brought Adam and his wife into this garden, he commanded them to take care of the plants. Now the garden was watered by one river, which ran round about the whole earth, and was parted into four parts. And Phison, which denotes a multitude, running into India, makes its exit into the sea, and is by the Greeks called Ganges.',
        translation: 'When He brought Adam and his wife into this garden, He commanded them to care for the plants. The garden was watered by a single river that encircled the whole earth and was divided into four parts. The Phison, which means a multitude, flows into India and empties into the sea; it is called the Ganges by the Greeks.',
      },
      {
        verse: 39,
        original: 'Euphrates also, as well as Tigris, goes down into the Red Sea. Now the name Euphrates, or Phrath, denotes either a dispersion, or a flower: by Tigris, or Diglath, is signified what is swift, with narrowness; and Geon runs through Egypt, and denotes what arises from the east, which the Greeks call Nile.',
        translation: 'The Euphrates and the Tigris both flow into the Red Sea. The name Euphrates, or Phrath, means either a dispersion or a flower; by Tigris, or Diglath, is signified what is swift and narrow; and the Geon runs through Egypt and means what rises from the east, which the Greeks call the Nile.',
      },
      {
        verse: 40,
        original: 'God therefore commanded that Adam and his wife should eat of all the rest of the plants, but to abstain from the tree of knowledge; and foretold to them, that if they touched it, it would prove their destruction.',
        translation: 'God therefore commanded Adam and his wife to eat of all the other plants, but to abstain from the tree of knowledge, and He warned them that if they touched it, it would prove their destruction.',
      },
      {
        verse: 41,
        original: 'But while all the living creatures had one language, at that time the serpent, which then lived together with Adam and his wife, shewed an envious disposition, at his supposal of their living happily, and in obedience to the commands of God;',
        translation: 'While all the living creatures shared one language, the serpent, which then lived alongside Adam and his wife, displayed an envious disposition, resentful of their happy life and obedience to God\u2019s commands.',
      },
      {
        verse: 42,
        original: 'and imagining, that when they disobeyed them, they would fall into calamities, he persuaded the woman, out of a malicious intention, to taste of the tree of knowledge, telling them, that in that tree was the knowledge of good and evil; which knowledge, when they should obtain, they would lead a happy life; nay, a life not inferior to that of a god:',
        translation: 'Imagining that if they disobeyed, they would fall into calamity, he persuaded the woman with malicious intent to taste of the tree of knowledge, telling her that within that tree lay the knowledge of good and evil, and that once they obtained it, they would live a happy life, indeed a life no less than that of a god.',
      },
      {
        verse: 43,
        original: 'by which means he overcame the woman, and persuaded her to despise the command of God. Now when she had tasted of that tree, and was pleased with its fruit, she persuaded Adam to make use of it also.',
        translation: 'By these means he overcame the woman and persuaded her to disregard God\u2019s command. When she had tasted of the tree and was pleased with its fruit, she persuaded Adam to eat of it as well.',
      },
      {
        verse: 44,
        original: 'Upon this they perceived that they were become naked to one another; and being ashamed thus to appear abroad, they invented somewhat to cover them; for the tree sharpened their understanding; and they covered themselves with fig-leaves; and tying these before them, out of modesty, they thought they were happier than they were before, as they had discovered what they were in want of.',
        translation: 'At this they realized they were naked before one another, and being ashamed to be seen, they devised something to cover themselves. The tree had sharpened their understanding, and they covered themselves with fig leaves, tying them in front out of modesty, and they thought themselves happier than before, having discovered what they had been lacking.',
      },
      {
        verse: 45,
        original: 'But when God came into the garden, Adam, who was wont before to come and converse with him, being conscious of his wicked behavior, went out of the way. This behavior surprised God; and he asked what was the cause of this his procedure; and why he, that before delighted in that conversation, did now fly from it, and avoid it.',
        translation: 'But when God came into the garden, Adam, who had been accustomed to come and converse with Him, being conscious of his wrongdoing, hid himself. This behavior surprised God, and He asked what had caused this, and why he who had once delighted in that conversation now fled from it and avoided it.',
      },
      {
        verse: 46,
        original: 'When he made no reply, as conscious to himself that he had transgressed the command of God, God said, \u201cI had before determined about you both, how you might lead a happy life, without any affliction, and care, and vexation of soul; and that all things which might contribute to your enjoyment and pleasure should grow up by my providence, of their own accord, without your own labor and painstaking; which state of labor and painstaking would soon bring on old age, and death would not be at any remote distance:',
        translation: 'When Adam made no reply, being aware that he had transgressed God\u2019s command, God said, \u201cI had previously determined for you both how you might lead a happy life, free from any affliction, care, or distress of soul, and that all things contributing to your enjoyment and pleasure would spring up by My providence of their own accord, without your own labor and toil. But that state of labor and toil would soon bring on old age, and death would not be far off.',
      },
      {
        verse: 47,
        original: 'but now thou hast abused this my good-will, and hast disobeyed my commands; for thy silence is not the sign of thy virtue, but of thy evil conscience.\u201d',
        translation: 'But now you have abused this goodwill of Mine and disobeyed My commands, for your silence is not a sign of virtue but of an evil conscience.\u201d',
      },
      {
        verse: 48,
        original: 'However, Adam excused his sin, and entreated God not to be angry at him, and laid the blame of what was done upon his wife; and said that he was deceived by her, and thence became an offender; while she again accused the serpent.',
        translation: 'Adam, however, excused his sin and begged God not to be angry with him, laying the blame on his wife, saying he had been deceived by her and so became an offender, while she in turn accused the serpent.',
      },
      {
        verse: 49,
        original: 'But God allotted him punishment, because he weakly submitted to the counsel of his wife; and said the ground should not henceforth yield its fruits of its own accord, but that when it should be harassed by their labor, it should bring forth some of its fruits, and refuse to bring forth others. He also made Eve liable to the inconveniency of breeding, and the sharp pains of bringing forth children; and this because she persuaded Adam with the same arguments wherewith the serpent had persuaded her, and had thereby brought him into a calamitous condition.',
        translation: 'But God assigned him punishment because he weakly submitted to his wife\u2019s counsel, declaring that the ground would no longer yield its fruits of its own accord, but only when worked by their labor, and that it would produce some fruits and withhold others. He also made Eve subject to the burden of pregnancy and the sharp pains of childbirth, because she had persuaded Adam with the same arguments the serpent had used on her, thereby bringing him into a calamitous state.',
      },
      {
        verse: 50,
        original: 'He also deprived the serpent of speech, out of indignation at his malicious disposition towards Adam. Besides this, he inserted poison under his tongue, and made him an enemy to men; and suggested to them, that they should direct their strokes against his head, that being the place wherein lay his mischievous designs towards men, and it being easiest to take vengeance on him, that way. And when he had deprived him of the use of his feet, he made him to go rolling all along, and dragging himself upon the ground.',
        translation: 'Out of indignation at the serpent\u2019s malicious disposition toward Adam, God also deprived him of speech. He further placed poison under his tongue and made him an enemy of mankind, and He suggested that people should strike at his head, for that was where his harmful designs against them lay, and it was the easiest way to take vengeance. And when He had taken away the use of his feet, God made him slither and drag himself along the ground.',
      },
      {
        verse: 51,
        original: 'And when God had appointed these penalties for them, he removed Adam and Eve out of the garden into another place.',
        translation: 'And when God had appointed these penalties, He removed Adam and Eve from the garden to another place.',
      },
    ],
  },
  {
    book: 1,
    chapter: 3,
    title: 'Antiquities of the Jews — Book 1, Chapter 3 (vv. 52-71)',
    verses: [
      {
        verse: 52,
        original: 'Adam and Eve had two sons: the elder of them was named Cain; which name, when it is interpreted, signifies a possession: the younger was Abel, which signifies sorrow. They had also daughters.',
        translation: 'Adam and Eve had two sons: the elder was named Cain, a name which, when interpreted, means a possession; the younger was Abel, which means sorrow. They also had daughters.',
      },
      {
        verse: 53,
        original: 'Now the two brethren were pleased with different courses of life: for Abel, the younger, was a lover of righteousness; and believing that God was present at all his actions, he excelled in virtue; and his employment was that of a shepherd. But Cain was not only very wicked in other respects, but was wholly intent upon getting; and he first contrived to plough the ground. He slew his brother on the occasion following:\u2014',
        translation: 'The two brothers pursued different ways of life: Abel, the younger, was a lover of righteousness who believed that God was present in all his actions, and he excelled in virtue; his occupation was that of a shepherd. But Cain was not only very wicked in other respects, but was entirely focused on acquisition, and he was the first to devise the plowing of the ground. He slew his brother on the following occasion:',
      },
      {
        verse: 54,
        original: 'They had resolved to sacrifice to God. Now Cain brought the fruits of the earth, and of his husbandry; but Abel brought milk, and the first-fruits of his flocks: but God was more delighted with the latter oblation, when he was honored with what grew naturally of its own accord, than he was with what was the invention of a covetous man, and gotten by forcing the ground;',
        translation: 'They had agreed to offer sacrifices to God. Cain brought the fruits of the earth and of his farming, while Abel brought milk and the firstborn of his flocks. God was more pleased with the latter offering, being honored by what grew naturally of its own accord, than with what was the invention of a greedy man, obtained by forcing the ground.',
      },
      {
        verse: 55,
        original: 'whence it was that Cain was very angry that Abel was preferred by God before him; and he slew his brother, and hid his dead body, thinking to escape discovery. But God, knowing what had been done, came to Cain, and asked him what was become of his brother, because he had not seen him of many days; whereas he used to observe them conversing together at other times.',
        translation: 'It was for this reason that Cain grew very angry that God preferred Abel over him, and he killed his brother and hid the body, thinking to escape detection. But God, knowing what had been done, came to Cain and asked what had become of his brother, for He had not seen him for many days, though He used to observe the two conversing together at other times.',
      },
      {
        verse: 56,
        original: 'But Cain was in doubt with himself, and knew not what answer to give to God. At first he said that he was himself at a loss about his brother\u2019s disappearing; but when he was provoked by God, who pressed him vehemently, as resolving to know what the matter was, he replied, he was not his brother\u2019s guardian or keeper, nor was he an observer of what he did.',
        translation: 'Cain was at a loss and did not know what answer to give God. At first he said he himself was puzzled by his brother\u2019s disappearance, but when God pressed him insistently, determined to know the truth, Cain replied that he was not his brother\u2019s guardian or keeper, nor was he one to observe what he did.',
      },
      {
        verse: 57,
        original: 'But, in return, God convicted Cain, as having been the murderer of his brother; and said, \u201cI wonder at thee, that thou knowest not what is become of a man whom thou thyself hast destroyed.\u201d',
        translation: 'In response, God convicted Cain of being his brother\u2019s murderer and said, \u201cI am astonished that you do not know what has become of a man whom you yourself have destroyed.\u201d',
      },
      {
        verse: 58,
        original: 'God therefore did not inflict the punishment [of death] upon him, on account of his offering sacrifice, and thereby making supplication to him not to be extreme in his wrath to him; but he made him accursed, and threatened his posterity in the seventh generation. He also cast him, together with his wife, out of that land.',
        translation: 'God therefore did not inflict the punishment of death upon him, because he offered a sacrifice and thereby made supplication not to be treated with extreme wrath. But God placed a curse on him and threatened his descendants in the seventh generation. He also drove him, together with his wife, out of that land.',
      },
      {
        verse: 59,
        original: 'And when he was afraid that in wandering about he should fall among Wild beasts, and by that means perish, God bid him not to entertain such a melancholy suspicion, and to go over all the earth without fear of what mischief he might suffer from wild beasts; and setting a mark upon him, that he might be known, he commanded him to depart.',
        translation: 'When Cain feared that in his wandering he might fall among wild beasts and perish, God told him not to entertain such a gloomy suspicion, and to travel over all the earth without fear of what harm he might suffer from wild beasts. And God set a mark upon him so that he would be recognized, and commanded him to depart.',
      },
      {
        verse: 60,
        original: 'And when Cain had traveled over many countries, he, with his wife, built a city, named Nod, which is a place so called, and there he settled his abode; where also he had children. However, he did not accept of his punishment in order to amendment, but to increase his wickedness; for he only aimed to procure every thing that was for his own bodily pleasure, though it obliged him to be injurious to his neighbors.',
        translation: 'After Cain had traveled through many countries, he and his wife built a city named Nod, so called for that place, and there he settled. He also had children there. However, he did not accept his punishment as a means to reform, but rather to increase his wickedness, for he sought only to obtain everything that served his own bodily pleasure, even if it meant harming his neighbors.',
      },
      {
        verse: 61,
        original: 'He augmented his household substance with much wealth, by rapine and violence; he excited his acquaintance to procure pleasures and spoils by robbery, and became a great leader of men into wicked courses. He also introduced a change in that way of simplicity wherein men lived before; and was the author of measures and weights. And whereas they lived innocently and generously while they knew nothing of such arts, he changed the world into cunning craftiness.',
        translation: 'He increased his household with great wealth through plunder and violence. He incited his acquaintances to seek pleasures and spoils through robbery, and became a great leader of men into wicked ways. He also introduced a change from the simplicity in which people had previously lived, and was the inventor of measures and weights. Whereas they had lived innocently and generously while they knew nothing of such arts, he transformed the world into cunning craftiness.',
      },
      {
        verse: 62,
        original: 'He first of all set boundaries about lands: he built a city, and fortified it with walls, and he compelled his family to come together to it; and called that city Enoch, after the name of his eldest son Enoch.',
        translation: 'He was the first to set boundaries around lands. He built a city and fortified it with walls, and he compelled his family to gather there. He called that city Enoch, after the name of his eldest son Enoch.',
      },
      {
        verse: 63,
        original: 'Now Jared was the son of Enoch; whose son was Malaliel; whose son was Mathusela; whose son was Lamech; who had seventy-seven children by two wives, Silla and Ada.',
        translation: 'Now Jared was the son of Enoch; whose son was Mahalalel; whose son was Methuselah; whose son was Lamech, who had seventy-seven children by two wives, Silla and Ada.',
      },
      {
        verse: 64,
        original: 'Of those children by Ada, one was Jabal: he erected tents, and loved the life of a shepherd. But Jubal, who was born of the same mother with him, exercised himself in music; and invented the psaltery and the harp. But Tubal, one of his children by the other wife, exceeded all men in strength, and was very expert and famous in martial performances. He procured what tended to the pleasures of the body by that method; and first of all invented the art of making brass.',
        translation: 'Of the children by Ada, one was Jabal: he set up tents and loved the life of a shepherd. But Jubal, born of the same mother, devoted himself to music and invented the psaltery and the harp. Tubal, one of the children by the other wife, surpassed all men in strength and was highly skilled and renowned in martial feats. He obtained what served bodily pleasure by that means, and was the first to invent the art of working bronze.',
      },
      {
        verse: 65,
        original: 'Lamech was also the father of a daughter, whose name was Naamah. And because he was so skillful in matters of divine revelation, that he knew he was to be punished for Cain\u2019s murder of his brother, he made that known to his wives.',
        translation: 'Lamech was also the father of a daughter named Naamah. And because he was so skilled in matters of divine revelation that he knew he would be punished for Cain\u2019s murder of his brother, he made this known to his wives.',
      },
      {
        verse: 66,
        original: 'Nay, even while Adam was alive, it came to pass that the posterity of Cain became exceeding wicked, every one successively dying, one after another, more wicked than the former. They were intolerable in war, and vehement in robberies; and if any one were slow to murder people, yet was he bold in his profligate behavior, in acting unjustly, and doing injuries for gain.',
        translation: 'Indeed, even while Adam was still alive, the descendants of Cain became exceedingly wicked, each one in succession dying more wicked than the last. They were unbearable in war and violent in robbery, and if any was slow to commit murder, he was still bold in his profligate conduct, acting unjustly and doing harm for profit.',
      },
      {
        verse: 67,
        original: 'Now Adam, who was the first man, and made out of the earth, (for our discourse must now be about him,) after Abel was slain, and Cain fled away, on account of his murder, was solicitous for posterity, and had a vehement desire of children, he being two hundred and thirty years old; after which time he lived other seven hundred, and then died.',
        translation: 'Now Adam, who was the first man, formed from the earth (for our account must now turn to him), after Abel was killed and Cain had fled because of his murder, was anxious for posterity and had a fierce desire for children. He was two hundred and thirty years old, after which he lived another seven hundred years, and then died.',
      },
      {
        verse: 68,
        original: 'He had indeed many other children, but Seth in particular. As for the rest, it would be tedious to name them; I will therefore only endeavor to give an account of those that proceeded from Seth. Now this Seth, when he was brought up, and came to those years in which he could discern what was good, became a virtuous man; and as he was himself of an excellent character, so did he leave children behind him who imitated his virtues.',
        translation: 'He had many other children, but Seth in particular. As for the rest, it would be tedious to name them, so I will endeavor only to give an account of those who descended from Seth. When Seth was raised and reached the age at which he could discern what was good, he became a virtuous man, and as he was himself of excellent character, so he left behind children who imitated his virtues.',
      },
      {
        verse: 69,
        original: 'All these proved to be of good dispositions. They also inhabited the same country without dissensions, and in a happy condition, without any misfortunes falling upon them, till they died. They also were the inventors of that peculiar sort of wisdom which is concerned with the heavenly bodies, and their order.',
        translation: 'All of them proved to be of good character. They inhabited the same land without discord, and in a happy condition, with no misfortunes befalling them until they died. They were also the inventors of that particular kind of wisdom concerned with the heavenly bodies and their order.',
      },
      {
        verse: 70,
        original: 'And that their inventions might not be lost before they were sufficiently known, upon Adam\u2019s prediction that the world was to be destroyed at one time by the force of fire, and at another time by the violence and quantity of water, they made two pillars, the one of brick, the other of stone: they inscribed their discoveries on them both,',
        translation: 'So that their discoveries might not be lost before they were widely known, and because Adam had predicted that the world would be destroyed at one time by the force of fire and at another time by the violence and quantity of water, they made two pillars, one of brick and the other of stone, and inscribed their discoveries on both.',
      },
      {
        verse: 71,
        original: 'that in case the pillar of brick should be destroyed by the flood, the pillar of stone might remain, and exhibit those discoveries to mankind; and also inform them that there was another pillar of brick erected by them. Now this remains in the land of Siriad to this day.',
        translation: 'This was so that if the pillar of brick was destroyed by the flood, the pillar of stone might remain and exhibit those discoveries to mankind, and also inform them that another pillar of brick had been erected by them. Now this pillar remains in the land of Siriad to this day.',
      },
    ],
  },
];
