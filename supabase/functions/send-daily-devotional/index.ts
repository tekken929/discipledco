import { createClient } from 'npm:@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
}

const DEVOTIONALS: { title: string; content: string }[] = [
  {
    title: 'How God Saves Sinners',
    content: `HOW GOD SAVES SINNERS
THE DISCIPLE CODE
How a Holy God Redeems Guilty Sinners Through Christ Alone
Romans 3:23 — "For all have sinned, and come short of the glory of God."
Romans 6:23 — "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord."
Isaiah 53:5 — "He was wounded for our transgressions, he was bruised for our iniquities... and with his stripes we are healed."
2 Corinthians 5:21 — "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him."
Ephesians 2:8–9 — "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: not of works, lest any man should boast."
John 3:16 — "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
1 John 5:13 — "These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life."
The Greatest Question Every Person Must Answer
Every person will eventually wrestle with the same question, whether quietly in the depths of the heart or openly before others: How can I be made right with God? Wealth cannot answer it. Morality cannot satisfy it. Religion cannot remove it. The question remains because it is rooted in the very condition of mankind. Scripture never presents salvation as an improvement of an already good person, nor does it describe Christianity as simply adopting better habits. The gospel begins with the sobering reality that humanity stands guilty before a perfectly holy God, and unless He acts in mercy, no one can stand in His presence.
Romans 3:23 — "For all have sinned, and come short of the glory of God."
Romans 3:10 — "There is none righteous, no, not one."
These are not merely descriptions of particularly wicked people. They describe every descendant of Adam. Sin is not simply something we occasionally commit. It is the condition into which we are born. Every sinful thought, every selfish motive, every proud word, and every act of rebellion reveals what already exists within the human heart. Before the gospel can become good news, we must first understand why we need saving at all.
Our Greatest Problem Is Not Circumstances but Sin
The world often teaches that man's greatest problems are found outside of himself. Scripture points somewhere entirely different. The deepest problem is not our upbringing, our failures, our enemies, or our circumstances. It is our separation from God because of sin.
Isaiah 59:2 — "Your iniquities have separated between you and your God, and your sins have hid his face from you."
Sin is not merely breaking a rule. It is rebellion against the holy Creator who made us for His glory.
Because God is perfectly just, He cannot overlook evil or pretend that sin does not matter. His holiness demands justice.
Romans 6:23 — "For the wages of sin is death; but the gift of God is eternal life through Jesus Christ our Lord."
Death entered the world through sin, and apart from God's intervention, eternal judgment is the righteous consequence of every sinner's rebellion. This is why Scripture never presents salvation as something optional or merely beneficial. It is absolutely necessary, because without it every person remains under God's righteous judgment.
The Cross Reveals Both God's Justice and His Mercy
If God were only holy, every sinner would stand condemned without hope. If He were only loving while ignoring justice, He would cease to be righteous. The beauty of the gospel is that the cross satisfies both. At Calvary, God's justice against sin was fully poured out, and His mercy toward sinners was fully displayed.
Isaiah 53:5 — "He was wounded for our transgressions, he was bruised for our iniquities... and with his stripes we are healed."
Christ did not merely sympathize with sinners. He stood in their place.
2 Corinthians 5:21 — "For he hath made him to be sin for us, who knew no sin; that we might be made the righteousness of God in him."
Jesus lived the perfectly righteous life that no sinner could ever live, then willingly bore the judgment sinners deserved.
1 Peter 3:18 — "For Christ also hath once suffered for sins, the just for the unjust, that he might bring us to God."
The resurrection declares that Christ's sacrifice was accepted. Death could not hold Him because He was without sin, and His victory over the grave became the assurance that everyone united to Him by faith will also live.
Romans 4:25 — "Who was delivered for our offences, and was raised again for our justification."
The empty tomb is God's declaration that the work of redemption is complete.
Repentance and Faith Are the Biblical Response
When the gospel is preached, Scripture never calls people merely to become more religious or to improve their lives. It calls them to repent and believe.
Mark 1:15 — "The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel."
These two commands remain inseparable throughout the New Testament.
Repentance is often misunderstood as nothing more than feeling guilty or becoming emotional over sin. While sorrow for sin may accompany repentance, the Bible describes something much deeper. The Greek word metanoeō speaks of a change of mind that results in a changed direction. It is agreeing with God's verdict about our sin, abandoning every false refuge, and turning toward Christ.
Acts 2:38 — "Repent... for the remission of sins."
Acts 3:19 — "Repent ye therefore, and be converted, that your sins may be blotted out."
Acts 20:21 — "Repentance toward God, and faith toward our Lord Jesus Christ."
Genuine repentance does not earn forgiveness. Rather, it is the posture of the heart that abandons self-rule and submits to the Lord who alone can save.
Faith is the companion of repentance. To repent is to turn from sin and self. To believe is to entrust yourself completely to Jesus Christ. Saving faith is not merely believing historical facts about His life, death, and resurrection. Even demons know those facts. Biblical faith rests entirely upon Christ's finished work, acknowledging that there is nothing we can contribute to our salvation.
Ephesians 2:8–9 — "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: not of works, lest any man should boast."
Salvation is received, never achieved.
Grace Leaves No Room for Human Boasting
From beginning to end, salvation belongs to the Lord. Left to ourselves, no one seeks God with a pure heart or possesses the righteousness necessary to enter His kingdom.
John 6:44 — "No man can come to me, except the Father which hath sent me draw him."
The initiative always belongs to God.
This is why the gospel destroys every attempt to earn acceptance before Him. Good works are valuable, obedience matters deeply, and holy living is expected of every believer, but none of these things can remove guilt or satisfy divine justice. If righteousness could be earned, Christ would not have needed to die. Instead, God saves entirely by grace through the finished work of His Son. Every believer stands before Him clothed not in personal achievement but in the righteousness of Christ Himself. Grace humbles the proud because it reminds us that every part of salvation is a gift we could never deserve.
What Happens When God Saves a Sinner?
The moment a person trusts Christ, God does far more than forgive past sins. He makes that person new.
2 Corinthians 5:17 — "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new."
Salvation is not merely receiving a second chance. It is receiving a new heart through the work of the Holy Spirit.
This new life begins to reshape every part of a believer's affections. The Christian does not become sinless overnight, but neither does he remain unchanged. The desires that once ruled him begin to lose their mastery. Love for Christ grows. Love for God's Word deepens. Conviction over sin becomes sharper because the Spirit now dwells within. Holiness is no longer viewed as a burden but as the joyful pursuit of knowing the One who first loved us.
The Evidence of Genuine Salvation
The New Testament repeatedly teaches that good works do not produce salvation, yet genuine salvation always produces fruit. Jesus taught that a tree is known by its fruit. The fruit does not make the tree alive; it reveals the nature of the tree. In the same way, transformed lives reveal the reality of God's transforming grace.
Matthew 7:17–20 — "Even so every good tree bringeth forth good fruit; but a corrupt tree bringeth forth evil fruit. A good tree cannot bring forth evil fruit, neither can a corrupt tree bring forth good fruit. Wherefore by their fruits ye shall know them."
One of the clearest evidences is a growing love for Christ that expresses itself in obedience.
John 14:15 — "If ye love me, keep my commandments."
Obedience does not purchase God's favor, nor is it perfect in this life, but it becomes the natural direction of a heart that has been changed by grace.
1 John 2:3 — "And hereby we do know that we know him, if we keep his commandments."
Another evidence is an ongoing pattern of repentance. Christians continue to battle sin, yet they no longer make peace with it.
1 John 1:8 — "If we say that we have no sin, we deceive ourselves."
1 John 1:9 — "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness."
The believer's life is marked not by sinless perfection but by continual dependence upon God's mercy.
Scripture also points to love for fellow believers as evidence of spiritual life.
1 John 3:14 — "We know that we have passed from death unto life, because we love the brethren."
This love is more than affection. It is the willingness to serve, forgive, encourage, and walk alongside those who belong to Christ because we recognize that we are members of the same family.
Paul further describes the Spirit's work through the fruit He produces.
Galatians 5:22–23 — "Love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance."
These qualities are not manufactured through willpower alone. They grow because the Holy Spirit is actively conforming believers into the image of Christ. Growth is often gradual, sometimes difficult, but over time the direction of the believer's life increasingly reflects the character of the Savior.
Can We Know That We Belong to Christ?
Many sincere believers struggle with assurance, wondering whether their faith is genuine. Scripture does not leave God's children in constant uncertainty. The apostle John explains the purpose of his first letter with remarkable clarity.
1 John 5:13 — "These things have I written unto you that believe on the name of the Son of God; that ye may know that ye have eternal life."
Our confidence does not rest upon flawless obedience or perfect emotions. Feelings rise and fall, and even mature believers experience seasons of doubt. The foundation of assurance is God's unchanging promise to all who trust His Son.
John 5:24 — "He that heareth my word, and believeth on him that sent me, hath everlasting life, and shall not come into condemnation; but is passed from death unto life."
The evidences of salvation strengthen that assurance, but the ultimate ground of our confidence is the faithfulness of Christ, who promised never to cast out those who come to Him.
John 6:37 — "All that the Father giveth me shall come to me; and him that cometh to me I will in no wise cast out."
The Gospel Calls Every Sinner to Christ
The gospel is not an invitation for good people to become slightly better. It is God's gracious call for guilty sinners to be reconciled to Him through His Son. Every person stands equally in need of mercy, and every person who comes to Christ in repentance and faith finds that His grace is sufficient.
John 3:16 — "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
John 3:18 — "He that believeth on him is not condemned: but he that believeth not is condemned already."
This is the heart of the Christian faith. We are not saved because we have become worthy. We are saved because Christ is worthy. We are not accepted because of our righteousness, but because His righteousness has been credited to all who believe. The evidence of salvation is not a flawless life but a transformed one—a life that increasingly loves Christ, hates sin, delights in God's Word, walks in repentance, bears the fruit of the Spirit, and perseveres because the Savior who began the work is faithful to complete it.
Philippians 1:6 — "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ."
In the end, every evidence points beyond itself to the One who accomplished our redemption. Salvation has always been, and will always be, the work of God from beginning to end.`,
  },
  {
    title: 'The Table of Grace',
    content: `THE TABLE OF GRACE
THE DISCIPLE CODE
What Jesus Changed About Clean Foods, Dietary Laws, and the New Covenant
Matthew 5:17 — "Don't misunderstand why I have come. I did not come to abolish the law of Moses or the writings of the prophets. No, I came to fulfill them."
Mark 7:15 — "You are not defiled by what you eat; you are defiled by what you say and do!"
1 Timothy 4:4 — "Since everything God created is good, we should not reject any of it. We may receive it gladly, with thankful hearts."
The Question Is Bigger Than Bacon
Christians have argued about food for centuries. Can Christians eat pork? Did Jesus abolish the Old Testament dietary laws? If God called certain animals unclean in Leviticus, how can the New Testament call food clean? Did God change His mind, or are Christians simply ignoring commandments they no longer want to obey?
Those questions deserve more than a quick answer because they reach into something much larger than what belongs on a dinner plate. They force us to understand the purpose of God's Law, the distinction between the Old and New Covenants, the fulfillment accomplished by Jesus Christ, and what it actually means to live under the New Covenant.
Matthew 5:17 — "Don't misunderstand why I have come. I did not come to abolish the law of Moses or the writings of the prophets. No, I came to fulfill them."
Jesus did not come to correct a mistake in the Law. He came to fulfill it.
God Called Israel to Be Different
The dietary laws begin with the holiness of God, not with nutrition.
Leviticus 11:44 — "After all, I, the LORD, am your God. You must be holy because I am holy. So do not defile yourselves by touching any of these animals that scurry along the ground."
Israel belonged to the LORD, and its covenant life was intentionally different from the nations surrounding it. The distinction between clean and unclean animals was part of a much larger system involving sacrifices, priests, festivals, purification, circumcision, Sabbath observance, and the tabernacle.
These commands continually reminded Israel that the God dwelling among them was holy and that sinful humanity could not approach Him on its own terms.
The Law Was Holy Because God Is Holy
Nothing about the New Covenant requires Christians to criticize the Old Covenant. Romans 7:12 — "But still, the law itself is holy and right and good."
The Law was good because the God who gave it is good. The problem was never that God's commandments were defective. The problem was that sinful human beings could never achieve righteousness before God through their obedience to them.
The ceremonial system also taught through visible signs. Blood taught Israel that sin requires atonement. Priests demonstrated the need for mediation. Purification demonstrated the reality of uncleanness. The tabernacle demonstrated that access to God's presence could occur only according to God's command. Clean and unclean foods belonged within that same covenantal world.
By the Time of Jesus, Food Was Part of Identity
By the first century, dietary practices had become deeply woven into Jewish identity. Circumcision, Sabbath observance, and dietary practices visibly distinguished faithful Jews from their Gentile neighbors.
Mark 7:5 — "So the Pharisees and teachers of religious law asked him, 'Why don't your disciples follow our age-old customs? For they eat without first performing the hand-washing ceremony.'"
Jesus Went Straight After the Heart
Jesus refused to allow human tradition to carry the authority of God's Word.
Mark 7:8 — "For you ignore God's specific laws and substitute your own traditions."
The Pharisees had become intensely concerned with outward contamination, but Jesus moved the discussion from hands, dishes, and food directly into the human heart.
Mark 7:15 — "You are not defiled by what you eat; you are defiled by what you say and do!"
Then Jesus identifies what actually defiles a person.
Mark 7:21–23 — "For from within, out of the heart of man, come evil thoughts, sexual immorality, theft, murder, adultery, coveting, wickedness, deceit, sensuality, envy, slander, pride, foolishness. All these evil things come from within, and they defile a person."
The deepest human problem has never been contaminated food. It is a contaminated heart.
What Does Katharizōn Actually Mean?
At the conclusion of Jesus' explanation, the Greek text contains the phrase katharizōn panta ta brōmata. The word comes from katharizō, carrying the sense of cleansing, making clean, or purifying. Many modern translations communicate the construction as Mark's explanatory conclusion: Jesus declared all foods clean.
This is a translation question, not a different Bible. Ancient Greek manuscripts did not contain modern English quotation marks, parentheses, and commas. Translators must determine how clauses relate grammatically to one another.
But Christianity does not have to rest the entire case upon one Greek participle. The rest of the New Testament makes the direction unmistakable.
The Table of Grace
Colossians 2:17 — "Which are a shadow of things to come; but the body is of Christ."
There is a relationship between the covenants. A shadow is real, and it points beyond itself. The sacrifices were shadows. The priesthood was a shadow. The tabernacle was a shadow. These things taught genuine truths about God, holiness, sin, atonement, and cleansing, but they were never the final destination.
Hebrews 10:1 — "For the law having a shadow of good things to come, and not the very image of the things, can never with those sacrifices which they offered year by year continually make the comers thereunto perfect."
Jesus is the substance toward which those shadows pointed.
ACTS 10 — Peter Had to Learn It Too
Peter had walked with Jesus, witnessed the resurrection, and received the Holy Spirit at Pentecost, yet the categories of clean and unclean food remained deeply embedded within him. Then came the vision.
Acts 10:13 — "And there came a voice to him, Rise, Peter; kill, and eat."
Peter immediately resisted.
Acts 10:14 — "But Peter said, Not so, Lord; for I have never eaten any thing that is common or unclean."
The response came:
Acts 10:15 — "And the voice spake unto him again the second time, What God hath cleansed, that call not thou common."
The command was repeated three times. Acts 10 is about more than Peter's diet. Immediately afterward, Gentile messengers sent by Cornelius arrived. Peter eventually understood the larger significance.
Acts 10:28 — "And he said to them, 'You yourselves know how unlawful it is for a Jew to associate with or to visit anyone of another nation, but God has shown me that I should not call any person common or unclean.'"
Food imagery was being used within a much larger revelation: Peter must no longer regard Gentiles as inherently unclean people from whom God's covenant blessing must be withheld.
ROMANS 14 — Nothing Is Unclean in Itself
Romans 14:14 — "I know and am persuaded in the Lord Jesus that nothing is unclean in itself, but it is unclean for anyone who thinks it unclean."
Romans 14:20 — "Do not, for the sake of food, destroy the work of God. Everything is indeed clean, but it is wrong for anyone to make another stumble by what he eats."
The New Testament does not treat food as possessing inherent spiritual uncleanness. Yet Romans 14 immediately prevents Christian liberty from becoming selfishness. A believer may possess the freedom to eat something while voluntarily choosing not to exercise that freedom around another believer whose conscience would be troubled.
Christian Liberty Is Not Permission to Become Selfish
Romans 14:15 — "For if your brother is grieved by what you eat, you are no longer walking in love. By what you eat, do not destroy the one for whom Christ died."
The mature Christian does not ask only, "Am I allowed to do this?" He also asks whether exercising that freedom is wise, loving, edifying, and honoring to Christ.
1 TIMOTHY 4 — God's Creation Is Still Good
1 Timothy 4:3-4 — "Who forbid marriage and require abstinence from foods that God created to be received with thanksgiving by those who believe and know the truth. For everything created by God is good, and nothing is to be rejected if it is received with thanksgiving."
Christianity does not teach that physical creation is inherently evil. God created the world and called His creation good. Food does not possess the ability to spiritually contaminate a Christian merely because of its material composition.
COLOSSIANS 2 — Don't Let Someone Judge Your Salvation by Your Plate
Colossians 2:16 — "So don't let anyone condemn you for what you eat or drink, or for not celebrating certain holy days or new-moon ceremonies or Sabbaths."
Colossians 2:17 — "For these rules were only shadows of the real thing, Christ himself."
The substance is Christ. The problem begins when personal abstinence becomes a condition of righteousness before God or a standard by which the salvation of another believer is judged.
DID GOD CHANGE HIS MIND? No. Christ Fulfilled What the Law Anticipated.
The Old and New Testaments are not competing religions. They tell one unfolding story of redemption. The Mosaic Covenant was genuinely given by God to Israel. Then Christ came.
Matthew 5:17 — "Don't misunderstand why I have come. I did not come to abolish the law of Moses or the writings of the prophets. No, I came to fulfill them."
Fulfillment is not contradiction. A promise is not contradicted when it is fulfilled. A shadow is not rejected when the substance arrives.
The Law Could Identify Uncleanness. It Could Not Clean the Heart.
The great human problem was never pork. It was sin. A man could carefully avoid every ceremonially unclean animal and still possess a heart filled with pride, lust, greed, deceit, hatred, and unbelief.
Hebrews 9:14 — "Just think how much more the blood of Christ will purify our hearts from deeds that lead to death so that we can worship the living God."
The cleansing humanity ultimately needed could never come from changing the menu. It required blood. The blood of Jesus Christ.
The Cross Changes the Entire Question
At the cross, Jesus did what ceremonial regulations could only anticipate. He bore the guilt of His people, satisfied divine justice, and provided the cleansing sinners actually needed.
1 Peter 2:24 — "He personally carried away our sins in his own body on the cross so we can be dead to sin and live for what is right. You have been healed by his wounds!"
The Christian therefore does not stand before God declared righteous because he successfully maintained Israel's dietary distinctions. He stands righteous because he belongs to Christ. His confidence is not his plate. His confidence is the cross.
What Should a Christian Do Today?
Receive God's provision with thanksgiving. Never use freedom as an excuse for sin or selfishness. Never condemn a brother over food where Christ has granted liberty. Never confuse personal discipline with justification.
And never forget what the dietary laws were ultimately teaching: God is holy, mankind is unclean, and we desperately need cleansing that we cannot provide for ourselves.
THE TABLE OF GRACE
The dietary laws were never meaningless. They belonged to God's covenant with Israel and taught generations of His people about holiness, separation, purity, obedience, and the seriousness of approaching a holy God. But they were never the Savior.
The Law could tell a man that something was unclean. It could not give him a clean heart. The priest could pronounce someone ceremonially clean. He could not justify a sinner before the judgment seat of God. The sacrifice could point toward atonement. It could not finally remove sin.
The Table was waiting for its fulfillment. The fulfillment is Jesus Christ.
Our righteousness does not come from what we refuse to eat. Our righteousness comes from Christ. Our cleansing does not begin in the stomach. It begins with the blood of Christ cleansing sinners who could never cleanse themselves.
Christ is the substance.`,
  },
  {
    title: 'Prayer',
    content: `Prayer
The Disciple Code
Hebrews 4:14–16 (NLT) — "That is why we have a great High Priest who has gone to heaven, Jesus the Son of God. Let us cling to him and never stop trusting him. This High Priest of ours understands our weaknesses, for he faced all of the same temptations we do, yet he did not sin. So let us come boldly to the throne of our gracious God. There we will receive his mercy, and we will find grace to help us when we need it."
Matthew 6:5–8 (NLT) — "And now about prayer. When you pray, don't be like the hypocrites who love to pray publicly on street corners and in the synagogues where everyone can see them. I assure you, that is all the reward they will ever get. But when you pray, go away by yourself, shut the door behind you, and pray to your Father secretly. Then your Father, who knows all secrets, will reward you. When you pray, don't babble on and on as people of other religions do. They think their prayers are answered only by repeating their words again and again. Don't be like them, because your Father knows exactly what you need even before you ask him!"
Luke 11:1–4 (NLT) — "Once when Jesus had been out praying, one of his disciples came to him as he finished and said, 'Lord, teach us to pray, just as John taught his disciples.' He said, 'This is how you should pray: Father, may your name be honored. May your Kingdom come soon. Give us our food day by day. And forgive us our sins—just as we forgive those who have sinned against us. And don't let us yield to temptation.'"
John 14:6 (NLT) — "Jesus told him, 'I am the way, the truth, and the life. No one can come to the Father except through me.'"
Why Did God Give Us Prayer?
Every believer eventually comes to the same question. If God already knows everything, why would He command His children to pray? Jesus answered that question before anyone asked it. He warned His disciples not to imitate those who believed that God could be persuaded through endless repetition. Then He reminded them that "your Father knows exactly what you need even before you ask him." God is never learning something new when we pray. He already knows every burden we carry, every temptation we face, every fear we hide, and every need we have. Prayer, therefore, cannot exist because God lacks information. It exists because God desires relationship with His children.
Hebrews 4:14–16 is a great invitation. Jesus Christ is our great High Priest who has entered heaven on our behalf, and because of His finished work we are invited to come boldly before God's throne of grace. We do not approach Him because we have earned another audience with heaven. We come because Jesus has opened the way through His death and resurrection. Prayer is not the reward for mature Christians. It is the privilege of every believer who has been redeemed by Christ.
Philippians 4:6–7 — "Don't worry about anything; instead, pray about everything. Tell God what you need, and thank him for all he has done. If you do this, you will experience God's peace, which is far more wonderful than the human mind can understand. His peace will guard your hearts and minds as you live in Christ Jesus."
He does not promise that every hardship will disappear immediately. Instead, He promises that God's peace will guard our hearts and minds through Christ Jesus. Often, before God changes our circumstances, He changes the man who is praying.
1 Peter 5:6–7 — "So humble yourselves under the mighty power of God, and in his good time he will honor you. Give all your worries and cares to God, for he cares about what happens to you."
Prayer is one of the clearest expressions of humility found anywhere in Scripture. Every sincere prayer acknowledges that we are not self-sufficient. The strongest man is not the one who never asks for help. The strongest man is the one who continually brings every burden to the feet of Jesus.
How Did Jesus Pray?
If we truly want to understand prayer, there is no greater teacher than Jesus Christ. Throughout the Gospels, the disciples witnessed Him teaching with authority, calming storms, healing the sick, and raising the dead. Yet the only recorded occasion where they specifically asked Him to teach them something was when they observed His prayer life.
Luke 11:1 — "Once when Jesus had been out praying, one of his disciples came to him as he finished and said, 'Lord, teach us to pray, just as John taught his disciples.'"
Mark 1:35 — "The next morning Jesus awoke long before daybreak and went out alone into the wilderness to pray." Before daybreak while everyone else was still asleep, Jesus withdrew to a solitary place to pray.
Luke 6:12–13 — "One day soon afterward Jesus went to a mountain to pray, and he prayed to God all night." Before choosing the twelve apostles, Jesus spent the entire night in prayer.
Luke 22:39–46 — Knowing that the cross was only hours away, Jesus poured out His heart before the Father. He did not hide His anguish. Yet His prayer concluded with complete surrender: "Yet I want your will to be done, not mine." Faithful prayer is not measured by whether we receive everything we ask for. Faithful prayer is measured by whether we trust God enough to submit to His will even when His answer leads us through suffering instead of around it.
What Makes a Biblical Prayer?
When the disciples asked Jesus to teach them how to pray, He did not hand them a script to memorize. Instead, He gave them a pattern.
Matthew 6:9–13 — "Pray like this: Our Father in heaven, may your name be honored. May your Kingdom come soon. May your will be done here on earth, just as it is in heaven. Give us our food for today, and forgive us our sins, just as we have forgiven those who sin against us. And don't let us yield to temptation, but deliver us from the evil one."
Prayer begins with worship because worship puts everything else into its proper perspective. Many of our prayers become anxious because we begin with our problems instead of beginning with God.
Then Jesus teaches us to pray, "May your Kingdom come soon. May your will be done on earth, as it is in heaven." Prayer is not an attempt to convince God to support our plans. It is the daily surrender of our lives to His plans.
Only after establishing God's glory and God's will does Jesus teach us to pray, "Give us today the food we need." This simple request reminds us that God genuinely cares about the ordinary details of life.
Jesus then turns our attention toward confession: "Forgive us our sins, as we have forgiven those who sin against us." Healthy prayer always includes honest repentance. Confession does not earn God's forgiveness, because Christ has already paid for the sins of His people on the cross. Rather, confession restores fellowship with our Father and keeps our hearts tender before Him.
Finally, Jesus teaches us to pray, "Don't let us yield to temptation, but rescue us from the evil one." The Christian life is a spiritual battle, and Jesus never tells His followers to face that battle alone.
Psalm 145:18 — "The Lord is close to all who call on him, yes, to all who call on him in truth."
Why Doesn't God Always Answer the Way We Want?
Nearly every Christian has experienced seasons where prayers seemed to go unanswered. The Bible does not ignore those questions. Instead, it answers them by continually directing our attention back to the character of God rather than to our circumstances.
James 4:2–3 — "You want what you don't have, so you scheme and kill to get it. You are jealous for what others have, and you can't possess it, so you fight and quarrel to take it away from them. And yet the reason you don't have what you want is that you don't ask God for it. And even when you do ask, you don't get it because your whole motive is wrong—you want only what will give you pleasure."
2 Corinthians 12:7–10 — Paul pleaded with the Lord three different times to remove what he described as a thorn in the flesh. The Lord did not remove the trial. Instead, He said, "My grace is all you need. My power works best in weakness." Sometimes God demonstrates His power by changing our circumstances. At other times He demonstrates His power by sustaining us through them. Both are expressions of His grace.
What Hinders Prayer?
Psalm 66:18 — "If I had not confessed the sin in my heart, the Lord would not have listened." David is not teaching that believers lose their salvation every time they sin. Rather, he is describing the reality that cherished, unrepentant sin disrupts our fellowship with God.
Isaiah 59:1–2 — "Listen! The LORD is not too weak to save you, and he is not becoming deaf. He can hear you when you call. But there is a problem—your sins have cut you off from God."
1 Peter 3:7 — Peter addresses husbands directly, instructing them to honor their wives with understanding so that their prayers will not be hindered. Our relationship with God cannot be separated from the way we treat the people He has entrusted to us.
Becoming a Man of Prayer
1 Thessalonians 5:16–18 — "Always be joyful. Keep on praying. No matter what happens, always be thankful, for this is God's will for you who belong to Christ Jesus."
Colossians 4:2 — "Devote yourselves to prayer with an alert mind and a thankful heart."
Psalm 5:1–3 — "Listen to my voice in the morning, Lord. Each morning I bring my requests to you and wait expectantly."
Ephesians 6:18 — "Pray at all times and on every occasion in the power of the Holy Spirit. Stay alert and be persistent in your prayers for all Christians everywhere."
Matthew 26:41 — "Keep alert and pray. Otherwise temptation will overpower you. For though the spirit is willing enough, the body is weak!"
A healthy prayer life is not created by finding more time. It is created by deciding that time with God is worth protecting above almost everything else. Prayer also extends beyond our personal needs. Pray for your wife, your children, your church, your pastors, your friends, your neighbors, and those who have never heard the Gospel.
The goal of the Christian life is not simply to become a man who prays more often. It is to become a man who walks so closely with God that prayer becomes as natural as breathing.
John 15:4–5 — "Remain in me, and I will remain in you." Prayer is one of the primary ways we abide in Christ.
No man will ever pray perfectly. There will be seasons when distractions seem endless, when words come slowly, and when God's answers require patient waiting. Yet the hope of the Christian has never rested in the perfection of his prayers. Our hope rests in the perfection of our Savior. Jesus Christ continues to intercede for His people, and the Holy Spirit continues to help us in our weakness. Even when we struggle, God remains faithful.`,
  },
  {
    title: 'Strongholds vs. Sins',
    content: `Strongholds vs. Sins
The Disciple Code
2 Corinthians 10:4–5 (NLT) — "We use God's mighty weapons, not mere worldly weapons, to knock down the Devil's strongholds. With these weapons we break down every proud argument that keeps people from knowing God. With these weapons we conquer their rebellious ideas, and we teach them to obey Christ."
John 8:31–32 (NLT) — "Jesus said to the people who believed in him, 'You are truly my disciples if you keep obeying my teachings. And you will know the truth, and the truth will set you free.'"
Romans 12:2 (NLT) — "Don't copy the behavior and customs of this world but let God transform you into a new person by changing the way you think."
A Battle Every Man Must Recognize
Every Man Is Fighting Something
There is a battle taking place inside every man, whether he recognizes it or not. Some battles are visible to everyone around him. Others remain hidden behind a smile, a successful career, or years of church attendance. A man may appear disciplined while privately enslaved to lust. He may be respected by others while secretly consumed by bitterness.
The Bible describes sin as something that grows. It deceives. It hardens the heart. Left unchallenged, it becomes a controlling influence that shapes the way a man thinks, desires, speaks, and lives. The Bible describes these entrenched patterns as strongholds.
A stronghold is more than a recurring temptation. It is a fortress built through repeated surrender to lies instead of truth. It becomes a place where sinful thinking feels normal and obedience begins to feel difficult. What began as a single compromise eventually becomes a way of life.
1 John 3:8 — "But the Son of God came to destroy these works of the Devil."
Romans 6:6–14 — "Our old sinful selves were crucified with Christ so that sin might lose its power in our lives. We are no longer slaves to sin."
Every stronghold that has been built through deception can be torn down by the truth of God's Word and the transforming work of the Holy Spirit.
What Does the Bible Mean by a Stronghold?
If you repeatedly fail against the same sin, you may be dealing with a stronghold rather than an isolated temptation.
2 Corinthians 10:4–5 — The word "strongholds" is the Greek word ochýrōma. It refers to a fortress, a place of defense, or a fortified position. Paul immediately explains that these are not physical walls but arguments, proud reasoning, deceptive thoughts, and patterns of thinking that exalt themselves against the knowledge of God.
Long before a man commits adultery, he has believed lies about purity. Before greed controls his life, he has believed lies about satisfaction. Before pride dominates his heart, he has believed lies about himself. Every outward sin is first rooted in inward deception.
Satan has always worked this way. From the first time in the garden, he did not begin by attacking Eve physically. He questioned God's Word. Genesis 3:1 — "Really? Did God really say you must not eat any of the fruit in the garden?" The first battlefield ever recorded was in the mind.
How Strongholds Are Built
The enemy's primary weapon is deception. Strongholds do not appear overnight.
James 1:14–15 — "Temptation comes from the lure of our own evil desires. These evil desires lead to evil actions, and evil actions lead to death."
Desire, Temptation, Sin, Death. One compromise becomes easier to repeat than to resist. Repeated choices become habits. Habits begin shaping desires. Those desires slowly reshape the mind until what once troubled the conscience begins to feel ordinary.
Hebrews 3:12–13 — "Be careful then, dear brothers and sisters. Make sure that your own hearts are not evil and unbelieving, turning you away from the living God. You must warn each other every day, as long as it is called 'today,' so that none of you will be deceived by sin and hardened against God."
Sin is deceitful because it never presents its true destination. Pornography promises satisfaction while producing slavery. Pride promises strength while destroying humility. Bitterness promises justice while poisoning the soul. Greed promises security while leaving the heart empty. Fear promises protection while stealing obedience.
The Lies Behind Every Stronghold
Every fortress stands on a foundation. If every spiritual fortress is built upon a lie, we convince ourselves that: "I'll stop tomorrow." "No one will know." "I deserve this." "This isn't hurting anyone." "This is just who I am." "God could never forgive me." "My past defines me."
John 8:44 — "He is a liar and the father of lies." His strategy has always been deception. He does not create truth. He twists it.
When Jesus was tempted in the wilderness, He answered every temptation with Scripture. Matthew 4:4, 4:7, 4:10 — "It is written." The sword Christ used is the same sword He has placed into the hands of His people—the Word of God. Ephesians 6:17 — "Take the sword of the Spirit, which is the word of God."
Christ Has Already Won the Decisive Victory
Freedom comes through truth, not willpower. A stronghold may feel permanent, but the cross declares otherwise.
Romans 6:6 — "Our old sinful selves were crucified with Christ so that sin might lose its power in our lives. We are no longer slaves to sin."
The believer does not fight for victory. He fights from Christ's victory. Jesus did not merely forgive sin. He broke its dominion.
John 8:36 — "So if the Son sets you free, you will indeed be free."
Pulling Down Strongholds
God has not left His people without weapons. He calls us to confess our sins honestly (1 John 1:9), repent continually (Acts 3:19), renew our minds through His Word (Romans 12:2), walk by the Spirit (Galatians 5:16), pray without ceasing (1 Thessalonians 5:17), encourage one another daily (Hebrews 3:13), and put sin to death rather than negotiate with it (Colossians 3:5).
Scripture never tells us to make peace with sin. It tells us to crucify it. Strongholds fall when lies are replaced with truth, when hidden sin is brought into the light, when pride gives way to humility, and when a man learns that obedience is not the enemy of joy but the pathway to it.
Disciple Challenge
What sin have I begun to tolerate instead of fight? What lie about God or myself have I believed? What has mastered my thoughts more than Christ? What secret habit would I be ashamed for my wife, children, or closest brothers in Christ to know? Am I feeding the flesh while expecting to grow spiritually?
Psalm 139:23–24 — "Search me, O God, and know my heart; test me and know my thoughts. Point out anything in me that offends you, and lead me along the path of everlasting life."
The strongest man is not the one who has never struggled. The strongest man is the one who continually humbles himself before Christ, refuses to make peace with sin, and keeps walking in the light of God's truth.
Philippians 1:6 — "And I am sure that God, who began the good work within you, will continue his work until it is finally finished on the day when Christ Jesus comes back again."
Conclusion
Strongholds are lies believed as truth. The battlefield is the mind before it is the behavior. Truth from God's Word tears down lies. Jesus is the source of real freedom. Biblical discipleship and accountability are God's design for lasting change. You cannot do this alone; you need a band of brothers and sisters in Christ to keep you accountable.`,
  },
  {
    title: 'The Dark Room',
    content: `The Dark Room
The Disciple Code
2 Corinthians 4:3–4 — "If the Good News we preach is hidden behind a veil, it is hidden only from people who are perishing. Satan, who is the god of this world, has blinded the minds of those who don't believe."
John 3:3 — "I tell you the truth, unless you are born again, you cannot see the Kingdom of God."
Ephesians 2:4–5 — "But God is so rich in mercy, and he loved us so much, that even though we were dead because of our sins, he gave us life when he raised Christ from the dead."
Ephesians 2:10 — "For we are God's masterpiece. He has created us anew in Christ Jesus, so that we can do the good things he planned for us long ago."
How God Shapes a Man Before He Uses Him
Every Disciple Begins the Same Way
Every man who belongs to Jesus Christ has one thing in common. Before God changed the direction of his life, He changed the direction of his eyes. The greatest miracle in a believer's life is not that he decided to follow Christ, but that God graciously opened his eyes to see Christ. Until that moment, the Gospel could be heard without being understood, read without being believed, and explained without being treasured.
2 Corinthians 4:3–4 — "If the Good News we preach is hidden behind a veil, it is hidden only from people who are perishing. Satan, who is the god of this world, has blinded the minds of those who don't believe." Spiritual blindness is not merely ignorance. It is the inability to see the glory of Jesus Christ apart from the work of God.
The Greatest Miracle Is Learning to See
John 3:3 — "I tell you the truth, unless you are born again, you cannot see the Kingdom of God." Jesus did not first speak about entering the Kingdom. He spoke about seeing it. Before anyone can follow Christ, God must awaken a heart that is spiritually dead and open eyes that are spiritually blind.
Ephesians 2:4–5 — "But God is so rich in mercy, and he loved us so much, that even though we were dead because of our sins, he gave us life when he raised Christ from the dead." Salvation begins with God. Dead men do not revive themselves, and blind men do not restore their own sight.
The Cross
Ephesians 2:8–9 — "God saved you by his grace when you believed. And you can't take credit for this; it is a gift from God. Salvation is not a reward for the good things we have done."
The cross is no longer simply a historical event. It becomes intensely personal. Christ did not merely die for sinners; He died for me. His righteousness becomes my righteousness. His sacrifice satisfies God's justice on my behalf. Every lesson that follows in the Christian life begins here, because until a man understands what Jesus accomplished on the cross, he will spend the rest of his life trying to earn what God has already freely given through His Son.
Growing Christians See More of God's Holiness
Isaiah 6:3 — "Holy, holy, holy is the Lord of Heaven's Armies. The whole earth is filled with his glory!"
Revelation 4:8 — "Day after day and night after night they keep on saying, 'Holy, holy, holy is the Lord God, the Almighty.'"
Hebrews 1:3 — "The Son radiates God's own glory and expresses the very character of God."
Colossians 1:15–17 — "Christ is the visible image of the invisible God... He existed before anything else, and he holds all creation together."
The longer a disciple walks with Christ, the more he realizes that the One who welcomed children, healed the sick, and forgave sinners is also the Lord before whom angels veil their faces.
Growing Christians Also See More of Their Own Sin
As the light of God's holiness shines more brightly into our lives, it exposes areas of the heart that we never recognized before.
Jeremiah 17:9 — "The human heart is the most deceitful of all things, and desperately wicked."
When Isaiah saw the Lord seated upon His throne, his first response was not confidence but confession. Isaiah 6:5 — "Then I said, 'It's all over! I am doomed, for I am a sinful man.'" The closer he came to God's holiness, the more clearly he saw his own need for mercy. Spiritual maturity is not thinking that you have become a better person than everyone else. It is becoming increasingly aware that apart from Christ you have nothing to boast about.
The Cross Gets Bigger Every Year
Romans 5:8 — "But God showed his great love for us by sending Christ to die for us while we were still sinners."
2 Corinthians 5:21 — "For God made Christ, who never sinned, to be the offering for our sin, so that we could be made right with God through Christ."
Galatians 6:14 — "As for me, may I never boast about anything except the cross of our Lord Jesus Christ."
The mature disciple never graduates from the cross. He spends the rest of his life standing in its shadow, worshipping the Savior who loved him and gave Himself for him.
God Is Preparing You for What He Has Prepared for You
Waiting is one of the hardest classrooms in the Christian life because it requires us to trust what we cannot yet see. We naturally measure progress by visible results, but God measures progress by spiritual maturity. Before He entrusts greater responsibility, He develops greater character.
Isaiah 40:31 — "But those who wait on the LORD will find new strength. They will fly high on wings like eagles. They will run and not grow weary. They will walk and not faint."
The temptation during these seasons is to believe that nothing is happening because nothing is visible. While Joseph sat in an Egyptian prison, God was preparing a ruler. While David fled from Saul, God was preparing a king. While Moses cared for sheep in Midian, God was preparing a deliverer.
Romans 8:28 — "And we know that God causes everything to work together for the good of those who love God and are called according to his purpose for them."
The Danger of Running Ahead of God
One of the greatest dangers for any disciple is confusing God's calling with God's timing. It is possible to know what God has called you to do while still needing to wait for His appointed time.
Ecclesiastes 3:11 — "God has made everything beautiful for its own time. He has planted eternity in the human heart, but even so, people cannot see the whole scope of God's work from beginning to end."
The Dark Room Produces Men Who Last
A photographer understands that an image is developed in darkness before it is ever displayed in the light. If the photograph is exposed too early, the image is ruined. God repeatedly develops His servants in hidden places before placing them in visible ones. The wilderness came before the Promised Land. The shepherd's field came before the throne. The prison came before the palace. The cross came before the resurrection.
Philippians 1:6 — "And I am sure that God, who began the good work within you, will continue his work until it is finally finished on the day when Christ Jesus comes back again."
Conclusion
The Story Is Not Finished Yet
Every disciple eventually finds himself in one of two places. Either God is clearly opening doors, or He seems to be asking you to wait. The Bible teaches that both seasons are equally important. The years spent in obscurity, the prayers that seem unanswered, the opportunities that have not yet arrived, and the promises that have not yet been fulfilled are never outside of God's sovereign care.
James 1:2–4 — "Dear brothers and sisters, whenever trouble comes your way, let it be an opportunity for joy."
Isaiah 40:31 — "But those who wait on the LORD will find new strength."
The disciple who understands these truths no longer measures God's faithfulness by how quickly prayers are answered or doors are opened. He measures God's faithfulness by the cross of Jesus Christ, where God's love, wisdom, holiness, mercy, and promises were displayed forever.
The dark room will not last forever. When God's work of preparation is complete, He will accomplish His purposes in His perfect time. Until then, remain faithful, remain in His Word, remain in prayer, and remember that God is always preparing His people for what He has already prepared for them.`,
  },
];

function parseDevotionalForEmail(content: string): { title: string; subtitle: string; html: string } {
  const lines = content.split('\n').map((l) => l.trim()).filter((l) => l);
  const title = lines[0] || 'Daily Devotional';
  let i = 1;
  if (lines[i] && lines[i].toUpperCase().includes('DISCIPLE CODE')) i++;

  let subtitle = '';
  while (i < lines.length && !isScriptureLine(lines[i]) && !isHeadingLine(lines[i])) {
    if (subtitle) subtitle += ' ';
    subtitle += lines[i];
    i++;
  }

  const htmlParts: string[] = [];
  while (i < lines.length) {
    const line = lines[i];
    if (isScriptureLine(line)) {
      const emDashMatch = line.match(/^(.+?)\s+[\u2014\u2013-]\s+(.*)$/);
      if (emDashMatch) {
        const ref = emDashMatch[1].trim();
        const verse = emDashMatch[2].trim().replace(/^[\u201c"\u201d]+/, '').replace(/[\u201c"\u201d]+$/, '');
        htmlParts.push(`<div style="border-left:3px solid #b45309;padding:12px 16px;margin:16px 0;background:#fefce8;border-radius:0 8px 8px 0;"><strong style="display:block;margin-bottom:4px;color:#1c1917;">${ref}</strong><em style="color:#44403c;">\u201c${verse}\u201d</em></div>`);
      } else {
        htmlParts.push(`<div style="border-left:3px solid #b45309;padding:12px 16px;margin:16px 0;background:#fefce8;border-radius:0 8px 8px 0;"><strong style="color:#1c1917;">${line}</strong></div>`);
      }
      i++;
    } else if (isHeadingLine(line)) {
      htmlParts.push(`<h2 style="font-size:20px;font-weight:700;color:#1c1917;margin:28px 0 10px 0;">${line}</h2>`);
      i++;
    } else {
      htmlParts.push(`<p style="font-size:16px;color:#292524;line-height:1.7;margin:0 0 16px 0;">${line}</p>`);
      i++;
    }
  }

  return { title, subtitle, html: htmlParts.join('\n') };
}

function isScriptureLine(line: string): boolean {
  return /^\d?\s?[A-Z][a-z]+\s+\d+:\d+/.test(line) || /^[A-Z][a-z]+\s+\d+:\d+/.test(line);
}

function isHeadingLine(line: string): boolean {
  if (isScriptureLine(line)) return false;
  if (line.startsWith('\u201c') || line.startsWith('"')) return false;
  const words = line.split(/\s+/);
  if (words.length < 2 || words.length > 15) return false;
  if (line.length > 120) return false;
  const capitalizedWords = words.filter((w) => /^[A-Z]/.test(w));
  return capitalizedWords.length >= Math.ceil(words.length * 0.5) && !line.endsWith('.') && !line.endsWith('!"') && !line.endsWith('."');
}

function buildEmailHtml(title: string, content: string, subscriber: Subscriber): string {
  const { title: parsedTitle, subtitle, html } = parseDevotionalForEmail(content);
  const greeting = subscriber.name ? `Dear ${subscriber.name},` : 'Dear friend,';

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f5f5f4;font-family:Georgia,'Times New Roman',serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 20px;">
    <div style="text-align:center;margin-bottom:24px;">
      <p style="font-size:12px;font-weight:700;color:#b45309;text-transform:uppercase;letter-spacing:0.15em;margin:0 0 4px 0;">The Disciple Code</p>
      <p style="font-size:11px;color:#78716c;margin:0;">Daily Devotional</p>
    </div>
    <div style="background:white;border-radius:16px;padding:40px 32px;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
      <h1 style="font-size:26px;font-weight:800;color:#1c1917;text-align:center;margin:0 0 8px 0;">${parsedTitle}</h1>
      ${subtitle ? `<p style="font-size:14px;color:#78716c;text-align:center;margin:0 0 24px 0;font-style:italic;">${subtitle}</p>` : ''}
      <div style="width:48px;height:2px;background:#b45309;margin:0 auto 24px auto;"></div>
      <p style="font-size:15px;color:#57534e;margin:0 0 20px 0;">${greeting}</p>
      ${html}
      <div style="margin-top:36px;padding-top:24px;border-top:1px solid #e7e5e4;text-align:center;">
        <p style="font-size:13px;color:#78716c;margin:0 0 8px 0;">By Colby Ryan Shenk, Disciple Company</p>
        <p style="font-size:12px;color:#a8a29e;margin:0 0 16px 0;">thediscipleco.org</p>
        <p style="font-size:11px;color:#a8a29e;margin:0;">
          You received this email because you subscribed to daily devotionals.
          <br><a href="https://thediscipleco.org/devotionals" style="color:#b45309;">Manage your subscription</a>
        </p>
      </div>
    </div>
  </div>
</body>
</html>`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const admin = createClient(supabaseUrl, serviceKey);

    // Fetch all active subscribers
    const { data: subscribers, error: subError } = await admin
      .from('devotional_subscribers')
      .select('id, email, name')
      .eq('is_active', true);

    if (subError) throw subError;
    if (!subscribers || subscribers.length === 0) {
      return new Response(JSON.stringify({ message: 'No active subscribers', sent: 0 }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Pick today's devotional using day-of-year (cycles automatically, no state table needed)
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    const devotional = DEVOTIONALS[dayOfYear % DEVOTIONALS.length];

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    let sentCount = 0;
    let failedCount = 0;

    if (RESEND_API_KEY) {
      for (const subscriber of subscribers) {
        const html = buildEmailHtml(devotional.title, devotional.content, subscriber);
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'devotionals@thediscipleco.org',
            to: subscriber.email,
            subject: `${devotional.title} — Daily Devotional`,
            html,
          }),
        });
        if (res.ok) sentCount++;
        else failedCount++;
      }
    } else {
      console.log('No RESEND_API_KEY configured. Would send to:', subscribers.map((s: Subscriber) => s.email).join(', '));
      console.log('Devotional:', devotional.title);
      sentCount = subscribers.length;
    }

    return new Response(JSON.stringify({
      message: 'Daily devotional sent',
      sent: sentCount,
      failed: failedCount,
      devotional: devotional.title,
      subscribers: subscribers.length,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
