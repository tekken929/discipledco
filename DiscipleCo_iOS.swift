// ============================================================
// The Disciple Co. — Complete SwiftUI iOS App
// ============================================================
//
// XCODE SETUP:
// 1. Open Xcode → File → New → Project → App
//    Product Name: DiscipleCo
//    Interface: SwiftUI
//    Language: Swift
//
// 2. Add Swift Package Dependencies (File → Add Package Dependencies):
//    • Supabase: https://github.com/supabase/supabase-swift
//      (version 2.x, add "Supabase" product)
//
// 3. In your Info.plist, add:
//    NSAppTransportSecurity → NSAllowsArbitraryLoads → YES
//
// 4. Replace ContentView.swift contents with this file, OR:
//    Delete ContentView.swift and add this file to the project.
//
// 5. In your @main App file (DiscipleCoApp.swift), set:
//    WindowGroup { AppRootView() }
//
// 6. Add your Supabase credentials below.
// ============================================================

import SwiftUI
import AVFoundation
import Combine

// ============================================================
// MARK: - Configuration
// ============================================================

struct Config {
    static let supabaseURL = "YOUR_SUPABASE_URL"
    static let supabaseAnonKey = "YOUR_SUPABASE_ANON_KEY"
    static let fetchVersesEndpoint = "\(supabaseURL)/functions/v1/fetch-verses"
}

// ============================================================
// MARK: - Models
// ============================================================

struct BibleBook: Identifiable {
    let id: String
    let name: String
    let order: Int
    let chapters: Int
    let type: String
    let overview: [String]
    let written: String
    let timePeriod: String
    let author: String
    let testament: String
    let authorDescription: String
    let imageUrl: String
    let structure: [BookSection]
}

struct BookSection: Identifiable {
    let id = UUID()
    let number: Int
    let title: String
    let chapterRange: String
    let summary: String
    let keyVerse: String
    let verseReference: String
}

struct Topic: Identifiable {
    let id: String
    let title: String
    let description: String
    let shortDescription: String
    let icon: String
    let order: Int
    let references: [ScriptureRef]
}

struct ScriptureRef: Identifiable {
    let id = UUID()
    let book: String
    let chapter: Int
    let verse: String
    let text: String
    let summary: String
}

struct BibleStory: Identifiable {
    let id: String
    let title: String
    let icon: String
    let order: Int
    let summary: String
    let shortSummary: String
    let references: [SimpleRef]
}

struct SimpleRef: Identifiable {
    let id = UUID()
    let book: String
    let chapter: Int
    let verse: String
    let text: String
}

struct TimelineEvent: Identifiable {
    let id: String
    let year: String
    let title: String
    let category: TimelineCategory
    let description: String
    let details: [String]
    let bibleRefs: [String]
}

enum TimelineCategory: String, CaseIterable {
    case creation = "creation"
    case jewish = "jewish"
    case catholic = "catholic"
    case protestant = "protestant"
    case modern = "modern"

    var label: String {
        switch self {
        case .creation: return "Creation & Early History"
        case .jewish: return "Jewish Faith"
        case .catholic: return "Early Church"
        case .protestant: return "Reformation"
        case .modern: return "Modern Era"
        }
    }

    var color: Color {
        switch self {
        case .creation: return .amber
        case .jewish: return Color(red: 0.23, green: 0.51, blue: 0.96)
        case .catholic: return Color(red: 0.86, green: 0.20, blue: 0.27)
        case .protestant: return Color(red: 0.13, green: 0.77, blue: 0.37)
        case .modern: return Color(red: 0.08, green: 0.72, blue: 0.64)
        }
    }
}

struct CourseModule: Identifiable {
    let id: String
    let number: Int
    let title: String
    let subtitle: String
    let description: String
    let lessons: [Lesson]
}

struct Lesson: Identifiable {
    let id: String
    let title: String
    let preview: String
    let expanded: String
    let reflectivePrompt: String
    let keyTakeaway: String
}

struct MusicTrack: Identifiable, Codable {
    let id: UUID
    let title: String
    let artist: String?
    let fileUrl: String?
    let duration: Int?
    let playCount: Int?
    let category: String?
    let uploadedAt: String?

    enum CodingKeys: String, CodingKey {
        case id, title, artist
        case fileUrl = "file_url"
        case duration
        case playCount = "play_count"
        case category
        case uploadedAt = "uploaded_at"
    }
}

struct BibleVerse: Identifiable, Codable {
    let id = UUID()
    let verse: Int
    let text: String
}

// ============================================================
// MARK: - Color Extensions
// ============================================================

extension Color {
    static let amber = Color(red: 0.96, green: 0.62, blue: 0.04)
    static let appBackground = Color(UIColor.systemGroupedBackground)
    static let cardBackground = Color(UIColor.secondarySystemGroupedBackground)
    static let appPrimary = Color(red: 0.15, green: 0.39, blue: 0.92)
}

// ============================================================
// MARK: - Data Store
// ============================================================

class AppData {
    static let shared = AppData()

    let bibleBooks: [BibleBook] = [
        BibleBook(id: "genesis", name: "Genesis", order: 1, chapters: 50,
            type: "Pentateuch / Law / History",
            overview: [
                "Genesis is the book of beginnings. It tells the story of creation, the fall of humanity, and God's plan to restore relationship with His people. From Adam to Abraham to Joseph, Genesis establishes the foundation for everything that follows in Scripture.",
                "The book divides into two major parts: the primeval history (chapters 1–11) covering creation, the fall, and early humanity, and the patriarchal narratives (chapters 12–50) following God's promises to Abraham, Isaac, Jacob, and Joseph.",
                "Genesis answers fundamental questions about origins, sin, suffering, and hope. It introduces key themes that echo throughout the Bible: covenant, promise, faith, blessing, and redemption."
            ],
            written: "c. 1445–1405 BC", timePeriod: "Beginning to c. 1805 BC",
            author: "Moses", testament: "Old Testament",
            authorDescription: "Prophet and lawgiver who led Israel out of Egypt. Received the Law on Mount Sinai and wrote the first five books of the Bible.",
            imageUrl: "https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg?auto=compress&cs=tinysrgb&w=800",
            structure: [
                BookSection(number: 1, title: "Creation and Fall", chapterRange: "1–3",
                    summary: "God creates the heavens, earth, and humanity. Adam and Eve disobey God in the Garden, bringing sin and death into the world.",
                    keyVerse: "So God created mankind in his own image, in the image of God he created them; male and female he created them.",
                    verseReference: "Genesis 1:27"),
                BookSection(number: 2, title: "Early Humanity and the Flood", chapterRange: "4–11",
                    summary: "Sin spreads through Cain, the flood judgment, and the Tower of Babel. God judges but preserves Noah and his family.",
                    keyVerse: "The LORD saw how great the wickedness of the human race had become on the earth.",
                    verseReference: "Genesis 6:5"),
                BookSection(number: 3, title: "The Covenant: Abraham", chapterRange: "12–25",
                    summary: "God calls Abraham and promises land, descendants, and blessing for all nations. Abraham's faith is tested, including the near-sacrifice of Isaac.",
                    keyVerse: "I will make you into a great nation, and I will bless you.",
                    verseReference: "Genesis 12:2"),
                BookSection(number: 4, title: "The Covenant: Isaac and Jacob", chapterRange: "26–36",
                    summary: "The covenant continues through Isaac then Jacob (renamed Israel). Jacob fathers twelve sons who become the twelve tribes of Israel.",
                    keyVerse: "Your name will no longer be Jacob, but Israel.",
                    verseReference: "Genesis 32:28"),
                BookSection(number: 5, title: "Joseph in Egypt", chapterRange: "37–50",
                    summary: "Joseph is sold into slavery but rises to power in Egypt. During famine, Joseph saves his family and reconciles with his brothers.",
                    keyVerse: "You intended to harm me, but God intended it for good.",
                    verseReference: "Genesis 50:20")
            ]),
        BibleBook(id: "exodus", name: "Exodus", order: 2, chapters: 40,
            type: "Pentateuch / Law / History",
            overview: [
                "Exodus is the story of Israel's deliverance from slavery in Egypt. Through Moses, God demonstrates His power over Pharaoh with ten plagues, then leads Israel through the Red Sea on dry ground.",
                "At Mount Sinai, God establishes His covenant with Israel, giving the Ten Commandments and detailed instructions for the Tabernacle. The book reveals God as both deliverer and lawgiver.",
                "Exodus establishes the Passover — a foundational act of redemption pointing forward to Jesus as the ultimate Passover Lamb."
            ],
            written: "c. 1445–1405 BC", timePeriod: "c. 1805–1445 BC",
            author: "Moses", testament: "Old Testament",
            authorDescription: "Prophet and lawgiver who led Israel out of Egypt.",
            imageUrl: "https://images.pexels.com/photos/1001682/pexels-photo-1001682.jpeg?auto=compress&cs=tinysrgb&w=800",
            structure: [
                BookSection(number: 1, title: "Israel in Egypt", chapterRange: "1–12",
                    summary: "Israel suffers under slavery. God calls Moses at the burning bush and sends ten plagues. The Passover instituted — death passes over those covered by the blood.",
                    keyVerse: "I am who I am.",
                    verseReference: "Exodus 3:14"),
                BookSection(number: 2, title: "The Exodus and Wilderness", chapterRange: "13–18",
                    summary: "Israel leaves Egypt and crosses the Red Sea. God provides manna, water from a rock, and leads with a pillar of cloud and fire.",
                    keyVerse: "The LORD is my strength and my defense; he has become my salvation.",
                    verseReference: "Exodus 15:2"),
                BookSection(number: 3, title: "The Law at Sinai", chapterRange: "19–24",
                    summary: "God appears on Mount Sinai in fire and thunder. He gives the Ten Commandments and the Book of the Covenant to Moses.",
                    keyVerse: "You shall have no other gods before me.",
                    verseReference: "Exodus 20:3"),
                BookSection(number: 4, title: "The Tabernacle Instructions", chapterRange: "25–40",
                    summary: "God gives detailed blueprints for the Tabernacle — a dwelling place in Israel's midst. Israel builds it exactly as commanded. God's glory fills it.",
                    keyVerse: "Then the cloud covered the tent of meeting, and the glory of the LORD filled the tabernacle.",
                    verseReference: "Exodus 40:34")
            ]),
        BibleBook(id: "matthew", name: "Matthew", order: 40, chapters: 28,
            type: "Gospel",
            overview: [
                "Matthew presents Jesus as the long-awaited Messiah and King of the Jews. Written primarily for a Jewish audience, it constantly connects Jesus to Old Testament prophecy to show He is the fulfillment of God's promises.",
                "The Gospel opens with Jesus' genealogy tracing back to Abraham and David. Matthew organizes Jesus' teaching into five major discourses, the most famous being the Sermon on the Mount.",
                "Matthew closes with the Great Commission — Jesus commanding His followers to make disciples of all nations. The Gospel bridges the Old and New Testaments powerfully."
            ],
            written: "c. AD 50–70", timePeriod: "c. 5 BC – AD 30",
            author: "Matthew (Levi)", testament: "New Testament",
            authorDescription: "Tax collector called by Jesus to be one of the Twelve Apostles. Eyewitness to Jesus' ministry.",
            imageUrl: "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800",
            structure: [
                BookSection(number: 1, title: "The King Arrives", chapterRange: "1–4",
                    summary: "Jesus' birth, baptism, and temptation in the wilderness. John the Baptist prepares the way. Jesus begins His Galilean ministry.",
                    keyVerse: "She will give birth to a son, and you are to give him the name Jesus, because he will save his people from their sins.",
                    verseReference: "Matthew 1:21"),
                BookSection(number: 2, title: "The Sermon on the Mount", chapterRange: "5–7",
                    summary: "Jesus' greatest teaching on kingdom ethics: the Beatitudes, salt and light, the Lord's Prayer, loving enemies, and building on rock.",
                    keyVerse: "Blessed are the pure in heart, for they will see God.",
                    verseReference: "Matthew 5:8"),
                BookSection(number: 3, title: "Ministry and Miracles", chapterRange: "8–18",
                    summary: "Jesus heals the sick, calms the storm, feeds thousands, and walks on water. He declares Peter's confession: 'You are the Messiah, the Son of the living God.'",
                    keyVerse: "You are the Messiah, the Son of the living God.",
                    verseReference: "Matthew 16:16"),
                BookSection(number: 4, title: "Jerusalem and the Passion", chapterRange: "19–28",
                    summary: "Jesus enters Jerusalem triumphantly, cleanses the Temple, and teaches about the end times. He is betrayed, crucified, buried, and rises on the third day.",
                    keyVerse: "Therefore go and make disciples of all nations.",
                    verseReference: "Matthew 28:19")
            ]),
        BibleBook(id: "john", name: "John", order: 43, chapters: 21,
            type: "Gospel",
            overview: [
                "John's Gospel is unique among the four Gospels. Written last and from a deeply theological perspective, John presents Jesus as the eternal Word of God who became flesh.",
                "John selects seven miraculous signs to demonstrate Jesus' divine identity and organizes his Gospel around the theme of belief. The 'I AM' statements of Jesus are central: 'I am the bread of life,' 'I am the light of the world,' 'I am the resurrection and the life.'",
                "John's purpose is explicit: 'These are written that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name.'"
            ],
            written: "c. AD 85–95", timePeriod: "c. 5 BC – AD 30",
            author: "John the Apostle", testament: "New Testament",
            authorDescription: "One of the Twelve Apostles, 'the beloved disciple.' Son of Zebedee, brother of James. Eyewitness to Jesus' ministry.",
            imageUrl: "https://images.pexels.com/photos/1261731/pexels-photo-1261731.jpeg?auto=compress&cs=tinysrgb&w=800",
            structure: [
                BookSection(number: 1, title: "The Word Became Flesh", chapterRange: "1–4",
                    summary: "The prologue establishes Jesus as the eternal Word. Jesus meets Nicodemus (John 3:16) and the Samaritan woman, revealing Himself as the source of living water.",
                    keyVerse: "For God so loved the world that he gave his one and only Son.",
                    verseReference: "John 3:16"),
                BookSection(number: 2, title: "Signs and Opposition", chapterRange: "5–12",
                    summary: "Jesus performs the seven signs: healing, feeding 5000, walking on water, healing a blind man, raising Lazarus. Jewish leaders plot to kill Him.",
                    keyVerse: "I am the resurrection and the life. The one who believes in me will live, even though they die.",
                    verseReference: "John 11:25"),
                BookSection(number: 3, title: "The Upper Room Discourse", chapterRange: "13–17",
                    summary: "Jesus washes feet, promises the Holy Spirit, and prays for all believers in His high priestly prayer. 'I am the way, the truth, and the life.'",
                    keyVerse: "I am the way and the truth and the life. No one comes to the Father except through me.",
                    verseReference: "John 14:6"),
                BookSection(number: 4, title: "Crucifixion and Resurrection", chapterRange: "18–21",
                    summary: "Jesus is arrested, tried, crucified, and buried. On the third day He rises, appearing to Mary Magdalene and the disciples. Thomas confesses: 'My Lord and my God!'",
                    keyVerse: "Thomas said to him, 'My Lord and my God!'",
                    verseReference: "John 20:28")
            ]),
        BibleBook(id: "psalms", name: "Psalms", order: 19, chapters: 150,
            type: "Poetry / Wisdom",
            overview: [
                "Psalms is the worship book of the Bible — 150 poems and songs spanning the full range of human emotion and experience. Written primarily by David, it also includes psalms by Asaph, the Sons of Korah, Solomon, and others.",
                "Psalms covers lament, praise, thanksgiving, wisdom, and prophecy. Many psalms look forward to the Messiah with remarkable precision, including Psalm 22 (the cry of the cross) and Psalm 110 (Christ as eternal priest-king).",
                "Jesus quoted Psalms more than any other Old Testament book. It remains the most read book of the Bible and is foundational to Christian worship and prayer."
            ],
            written: "c. 1400–400 BC", timePeriod: "Moses through post-exile",
            author: "David and others", testament: "Old Testament",
            authorDescription: "Multiple authors including David (73 psalms), Asaph, Sons of Korah, Solomon, Moses, and anonymous contributors.",
            imageUrl: "https://images.pexels.com/photos/208559/pexels-photo-208559.jpeg?auto=compress&cs=tinysrgb&w=800",
            structure: [
                BookSection(number: 1, title: "Book I — Psalms 1–41", chapterRange: "1–41",
                    summary: "Largely Davidic psalms. Covers lament (Ps 22), trust (Ps 23), and praise. Psalm 1 sets the tone: the blessed man delights in God's law.",
                    keyVerse: "The Lord is my shepherd, I lack nothing.",
                    verseReference: "Psalm 23:1"),
                BookSection(number: 2, title: "Books II–III — Psalms 42–89", chapterRange: "42–89",
                    summary: "National psalms and the Songs of Ascent. Covers the Exodus (Ps 78), God's sovereignty, and the Davidic covenant (Ps 89).",
                    keyVerse: "As the deer pants for streams of water, so my soul pants for you, my God.",
                    verseReference: "Psalm 42:1"),
                BookSection(number: 3, title: "Books IV–V — Psalms 90–150", chapterRange: "90–150",
                    summary: "Culminates in pure praise. Moses' psalm (90) opens. Psalms 119 (the longest chapter in the Bible) celebrates God's Word. Psalms 146–150 are a crescendo of hallelujah.",
                    keyVerse: "Let everything that has breath praise the Lord.",
                    verseReference: "Psalm 150:6")
            ]),
        BibleBook(id: "romans", name: "Romans", order: 45, chapters: 16,
            type: "Epistle / Letter",
            overview: [
                "Romans is Paul's most systematic presentation of the gospel. Written to the church in Rome, it lays out the full scope of salvation: humanity's sin, God's righteousness, justification by faith, sanctification, and the future of Israel.",
                "The letter opens by establishing that all people — Jews and Gentiles alike — are under sin and in need of God's righteousness. That righteousness is received by faith in Jesus Christ alone, apart from works of the law.",
                "Romans 8 is considered by many the greatest chapter in the Bible: no condemnation, life in the Spirit, adoption as children of God, and the unbreakable love of Christ."
            ],
            written: "c. AD 56–57", timePeriod: "First century AD",
            author: "Paul (Apostle)", testament: "New Testament",
            authorDescription: "Formerly Saul of Tarsus, a persecutor of Christians who encountered the risen Jesus on the road to Damascus. Became the apostle to the Gentiles.",
            imageUrl: "https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg?auto=compress&cs=tinysrgb&w=800",
            structure: [
                BookSection(number: 1, title: "Universal Guilt", chapterRange: "1–3",
                    summary: "All humanity stands guilty before God. Jews and Gentiles alike have sinned and fall short. No one can be justified by works of the law.",
                    keyVerse: "For all have sinned and fall short of the glory of God.",
                    verseReference: "Romans 3:23"),
                BookSection(number: 2, title: "Justification by Faith", chapterRange: "4–5",
                    summary: "Abraham was justified by faith, not works — before circumcision. Through one man (Adam) sin entered; through one man (Jesus) righteousness comes to all who believe.",
                    keyVerse: "Therefore, since we have been justified through faith, we have peace with God through our Lord Jesus Christ.",
                    verseReference: "Romans 5:1"),
                BookSection(number: 3, title: "Life in the Spirit", chapterRange: "6–8",
                    summary: "Death to sin, alive to God. The war between flesh and spirit. Romans 8 — no condemnation, adoption, groaning of creation, and nothing can separate us from God's love.",
                    keyVerse: "There is therefore now no condemnation for those who are in Christ Jesus.",
                    verseReference: "Romans 8:1"),
                BookSection(number: 4, title: "Israel and the Nations", chapterRange: "9–11",
                    summary: "God's sovereign purposes in election. Israel's hardening is not final. Salvation has come to the Gentiles to make Israel jealous. All Israel will be saved.",
                    keyVerse: "For God's gifts and his call are irrevocable.",
                    verseReference: "Romans 11:29"),
                BookSection(number: 5, title: "Living the Gospel", chapterRange: "12–16",
                    summary: "Living sacrifices, renewing the mind, loving enemies, obeying authorities, the strong bearing with the weak. Grace-motivated holy living.",
                    keyVerse: "Do not conform to the pattern of this world, but be transformed by the renewing of your mind.",
                    verseReference: "Romans 12:2")
            ]),
    ]

    let topics: [Topic] = [
        Topic(id: "sin", title: "Sin & Repentance", description: "Understanding sin, forgiveness, and repentance.", shortDescription: "What sin is and how we are restored.", icon: "🔥", order: 1, references: [
            ScriptureRef(book: "Romans", chapter: 3, verse: "23", text: "For all have sinned and fall short of the glory of God.", summary: "Sin is universal — every person falls short of God's standard."),
            ScriptureRef(book: "1 John", chapter: 1, verse: "9", text: "If we confess our sins, he is faithful and just and will forgive us our sins and purify us from all unrighteousness.", summary: "Confession brings forgiveness and cleansing."),
            ScriptureRef(book: "Romans", chapter: 6, verse: "23", text: "For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.", summary: "Sin earns death; God gives life freely through Jesus.")
        ]),
        Topic(id: "prayer", title: "Prayer", description: "How to pray and communicate with God effectively.", shortDescription: "Drawing near to God through prayer.", icon: "🙏", order: 2, references: [
            ScriptureRef(book: "Matthew", chapter: 6, verse: "9-13", text: "Our Father in heaven, hallowed be your name, your kingdom come, your will be done, on earth as it is in heaven.", summary: "The Lord's Prayer — the model Jesus gave His disciples."),
            ScriptureRef(book: "Philippians", chapter: 4, verse: "6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.", summary: "Replace anxiety with prayer and receive God's peace."),
            ScriptureRef(book: "1 Thessalonians", chapter: 5, verse: "17", text: "Pray continually.", summary: "Prayer is to be a constant posture of the believer's life.")
        ]),
        Topic(id: "faith", title: "Faith & Trust", description: "Building faith and trusting in God's plan.", shortDescription: "Walking by faith, not by sight.", icon: "⚓", order: 3, references: [
            ScriptureRef(book: "Hebrews", chapter: 11, verse: "1", text: "Now faith is confidence in what we hope for and assurance about what we do not see.", summary: "Faith is the substance of things hoped for — conviction about the unseen."),
            ScriptureRef(book: "Proverbs", chapter: 3, verse: "5-6", text: "Trust in the LORD with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.", summary: "Total trust in God, not in our own reasoning, leads to directed paths."),
            ScriptureRef(book: "Romans", chapter: 10, verse: "17", text: "Faith comes from hearing the message, and the message is heard through the word about Christ.", summary: "Faith is generated by hearing and receiving God's Word.")
        ]),
        Topic(id: "forgiveness", title: "Forgiveness", description: "The importance of forgiving others as God forgives us.", shortDescription: "Released from debt, and releasing others.", icon: "🕊️", order: 4, references: [
            ScriptureRef(book: "Ephesians", chapter: 4, verse: "32", text: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you.", summary: "Forgiveness is grounded in how God has forgiven us in Christ."),
            ScriptureRef(book: "Matthew", chapter: 6, verse: "14-15", text: "For if you forgive other people when they sin against you, your heavenly Father will also forgive you. But if you do not forgive others their sins, your Father will not forgive your sins.", summary: "Receiving God's forgiveness is linked to extending forgiveness to others."),
            ScriptureRef(book: "Luke", chapter: 17, verse: "3-4", text: "If your brother or sister sins against you, rebuke them; and if they repent, forgive them. Even if they sin against you seven times in a day and seven times come back to you saying 'I repent,' you must forgive them.", summary: "Forgiveness is to be repeated and given freely, reflecting God's mercy.")
        ]),
        Topic(id: "love", title: "Love & Compassion", description: "Biblical teachings on love for God and others.", shortDescription: "The greatest commandment fulfilled.", icon: "❤️", order: 5, references: [
            ScriptureRef(book: "1 Corinthians", chapter: 13, verse: "4-7", text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud.", summary: "The defining characteristics of genuine biblical love."),
            ScriptureRef(book: "John", chapter: 3, verse: "16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.", summary: "God's love is sacrificial — He gave His Son for the world's salvation."),
            ScriptureRef(book: "Matthew", chapter: 22, verse: "37-39", text: "Love the Lord your God with all your heart and with all your soul and with all your mind. This is the first and greatest commandment. And the second is like it: Love your neighbor as yourself.", summary: "The greatest commandments: total love for God and love for others.")
        ]),
        Topic(id: "fear", title: "Fear & Anxiety", description: "Finding peace and overcoming fear through faith.", shortDescription: "God's answer to anxiety and fear.", icon: "🛡️", order: 6, references: [
            ScriptureRef(book: "Isaiah", chapter: 41, verse: "10", text: "Do not fear, for I am with you; do not be dismayed, for I am your God. I will strengthen you and help you; I will uphold you with my righteous right hand.", summary: "God's direct word against fear: His presence and strength are sufficient."),
            ScriptureRef(book: "Philippians", chapter: 4, verse: "6-7", text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts.", summary: "Prayerful gratitude replaces anxiety with supernatural peace."),
            ScriptureRef(book: "Psalm", chapter: 23, verse: "4", text: "Even though I walk through the darkest valley, I will fear no evil, for you are with me.", summary: "God's presence transforms even the darkest moments — fear yields to faith.")
        ]),
        Topic(id: "holy-spirit", title: "The Holy Spirit", description: "Understanding the Holy Spirit and His work in believers.", shortDescription: "The Spirit of God living inside you.", icon: "🔥", order: 7, references: [
            ScriptureRef(book: "John", chapter: 14, verse: "16-17", text: "And I will ask the Father, and he will give you another advocate to help you and be with you forever — the Spirit of truth.", summary: "Jesus promised the Holy Spirit as an indwelling Helper and guide."),
            ScriptureRef(book: "Galatians", chapter: 5, verse: "22-23", text: "But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.", summary: "The Spirit's presence produces recognizable fruit in a believer's character."),
            ScriptureRef(book: "Romans", chapter: 8, verse: "26", text: "The Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us.", summary: "The Holy Spirit intercedes in prayer on our behalf.")
        ]),
        Topic(id: "grace", title: "Grace & Mercy", description: "Understanding undeserved favor and compassion.", shortDescription: "Saved by grace, not by works.", icon: "✨", order: 8, references: [
            ScriptureRef(book: "Ephesians", chapter: 2, verse: "8-9", text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.", summary: "Salvation is entirely a gift of grace, received through faith, not earned."),
            ScriptureRef(book: "Romans", chapter: 5, verse: "8", text: "But God demonstrates his own love for us in this: While we were still sinners, Christ died for us.", summary: "God's grace is preemptive — He saved us before we could earn or deserve it."),
            ScriptureRef(book: "Hebrews", chapter: 4, verse: "16", text: "Let us then approach God's throne of grace with confidence, so that we may receive mercy and find grace to help us in our time of need.", summary: "Grace gives us access to God's throne — we come boldly, not fearfully.")
        ]),
        Topic(id: "wisdom", title: "Wisdom & Discernment", description: "Seeking godly wisdom and making righteous decisions.", shortDescription: "Asking God for the wisdom He freely gives.", icon: "📖", order: 9, references: [
            ScriptureRef(book: "James", chapter: 1, verse: "5", text: "If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.", summary: "Wisdom is available to anyone who asks God in faith."),
            ScriptureRef(book: "Proverbs", chapter: 9, verse: "10", text: "The fear of the LORD is the beginning of wisdom, and knowledge of the Holy One is understanding.", summary: "True wisdom begins with a reverent, humble relationship with God."),
            ScriptureRef(book: "Colossians", chapter: 2, verse: "2-3", text: "In whom are hidden all the treasures of wisdom and knowledge.", summary: "All genuine wisdom and knowledge are found in Christ.")
        ]),
        Topic(id: "spiritual-warfare", title: "Demons & Spiritual Warfare", description: "Understanding spiritual warfare and our authority in Christ.", shortDescription: "The armor of God and our spiritual battle.", icon: "⚔️", order: 10, references: [
            ScriptureRef(book: "Ephesians", chapter: 6, verse: "12", text: "For our struggle is not against flesh and blood, but against the rulers, against the authorities, against the powers of this dark world.", summary: "Our real enemy is spiritual, not human — the battle is in the unseen realm."),
            ScriptureRef(book: "Ephesians", chapter: 6, verse: "13-17", text: "Therefore put on the full armor of God, so that when the day of evil comes, you may be able to stand your ground.", summary: "God provides spiritual armor: truth, righteousness, gospel, faith, salvation, and the Word."),
            ScriptureRef(book: "James", chapter: 4, verse: "7", text: "Submit yourselves, then, to God. Resist the devil, and he will flee from you.", summary: "Submission to God and active resistance sends the enemy fleeing.")
        ]),
    ]

    let stories: [BibleStory] = [
        BibleStory(id: "creation", title: "Creation", icon: "🌍", order: 1,
            summary: "In creation, the Bible presents a beginning that is both intentional and ordered. God speaks, and what is formed reflects purpose rather than chance. Light, land, life, and humanity all come into being through His word, establishing not only the world itself, but the structure within it. Humanity is placed within that order with meaning and responsibility, not as an afterthought, but as part of what was designed from the start.",
            shortSummary: "God speaks the world into existence with intentional design. Light, land, and life emerge through His word, establishing order and purpose from the very beginning.",
            references: [
                SimpleRef(book: "Genesis", chapter: 1, verse: "1", text: "In the beginning God created the heavens and the earth."),
                SimpleRef(book: "Genesis", chapter: 1, verse: "27", text: "So God created mankind in his own image, in the image of God he created them; male and female he created them."),
                SimpleRef(book: "Genesis", chapter: 2, verse: "2-3", text: "By the seventh day God had finished the work he had been doing; so on the seventh day he rested from all his work.")
            ]),
        BibleStory(id: "noah", title: "Noah and the Ark", icon: "🌊", order: 2,
            summary: "In the days of Noah, humanity had drifted far from what was right. What had been created with intention became shaped by continual corruption, and the result was judgment through the flood. Yet even in that, there is justice and mercy. Noah walked faithfully with God, and through him, life is preserved. The ark becomes a place of refuge and a sign of obedience — built in trust before the outcome could be seen.",
            shortSummary: "Noah walks faithfully with God in a corrupt world. Through the ark, God brings judgment on wickedness while preserving life through one righteous man.",
            references: [
                SimpleRef(book: "Genesis", chapter: 6, verse: "13-14", text: "So God said to Noah, 'I am going to put an end to all people, for the earth is filled with violence because of them. So make yourself an ark of cypress wood.'"),
                SimpleRef(book: "Genesis", chapter: 7, verse: "17", text: "For forty days the flood kept coming on the earth, and as the waters increased they lifted the ark high above the earth."),
                SimpleRef(book: "Genesis", chapter: 9, verse: "13", text: "I have set my rainbow in the clouds, and it will be the sign of the covenant between me and the earth.")
            ]),
        BibleStory(id: "david-goliath", title: "David and Goliath", icon: "🗿", order: 3,
            summary: "Goliath was a Philistine warrior who stood over nine feet tall and challenged Israel for forty days. The entire Israelite army was terrified. David, a young shepherd boy, arrived to bring food to his brothers and heard the challenge. Where others saw an impossible giant, David saw an uncircumcised Philistine defying the living God. He took five smooth stones and a sling, and he ran toward Goliath. With one stone, the giant fell.",
            shortSummary: "A young shepherd faces a nine-foot warrior with nothing but a sling, five stones, and unshakeable faith in God's power.",
            references: [
                SimpleRef(book: "1 Samuel", chapter: 17, verse: "45-47", text: "David said to the Philistine, 'You come against me with sword and spear and javelin, but I come against you in the name of the LORD Almighty, the God of the armies of Israel, whom you have defied.'"),
                SimpleRef(book: "1 Samuel", chapter: 17, verse: "50", text: "So David triumphed over the Philistine with a sling and a stone; without a sword in his hand he struck down the Philistine and killed him.")
            ]),
        BibleStory(id: "prodigal-son", title: "The Prodigal Son", icon: "🏠", order: 4,
            summary: "A younger son demands his inheritance early, leaves for a distant country, and wastes everything on reckless living. Reduced to feeding pigs and starving, he comes to his senses and decides to return home and beg to be made a servant. But while he was still a long way off, his father saw him, ran to him, and threw a celebration. The older son is bitter. The father's response reveals the heart of God toward those who return.",
            shortSummary: "A wayward son returns home in shame, but his father runs to meet him with open arms — a picture of God's extravagant grace.",
            references: [
                SimpleRef(book: "Luke", chapter: 15, verse: "18-19", text: "I will set out and go back to my father and say to him: Father, I have sinned against heaven and against you."),
                SimpleRef(book: "Luke", chapter: 15, verse: "20", text: "But while he was still a long way off, his father saw him and was filled with compassion for him; he ran to his son, threw his arms around him and kissed him."),
                SimpleRef(book: "Luke", chapter: 15, verse: "32", text: "But we had to celebrate and be glad, because this brother of yours was dead and is alive again; he was lost and is found.")
            ]),
        BibleStory(id: "resurrection", title: "The Resurrection", icon: "✝️", order: 5,
            summary: "On the third day after His crucifixion, Jesus rose from the dead. Early in the morning, Mary Magdalene and other women came to the tomb and found the stone rolled away and the tomb empty. Angels announced He had risen. Jesus appeared to Mary, then to the disciples, then to over five hundred people at once. The resurrection is the foundation of the Christian faith — everything rises or falls on whether it happened.",
            shortSummary: "Jesus rises from the dead on the third day, defeating sin and death. Over 500 witnesses see the risen Christ — the cornerstone of the Christian faith.",
            references: [
                SimpleRef(book: "Luke", chapter: 24, verse: "6-7", text: "He is not here; he has risen! Remember how he told you, while he was still with you in Galilee: 'The Son of Man must be delivered over to the hands of sinners, be crucified and on the third day be raised again.'"),
                SimpleRef(book: "1 Corinthians", chapter: 15, verse: "3-4", text: "For what I received I passed on to you as of first importance: that Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day."),
                SimpleRef(book: "1 Corinthians", chapter: 15, verse: "20", text: "But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep.")
            ]),
        BibleStory(id: "good-samaritan", title: "The Good Samaritan", icon: "🤝", order: 6,
            summary: "A man was traveling from Jerusalem to Jericho when robbers attacked him, stripped him, and left him half dead. A priest passed by. A Levite passed by. Then a Samaritan — from a group Jews despised — stopped, bandaged his wounds, put him on his own donkey, and paid for his care. Jesus told this story in response to the question: 'Who is my neighbor?' The answer: the one who showed mercy.",
            shortSummary: "When two religious men pass by a beaten man, a despised Samaritan stops to help — redefining who counts as a neighbor.",
            references: [
                SimpleRef(book: "Luke", chapter: 10, verse: "33-34", text: "But a Samaritan, as he traveled, came where the man was; and when he saw him, he took pity on him. He went to him and bandaged his wounds."),
                SimpleRef(book: "Luke", chapter: 10, verse: "36-37", text: "Which of these three do you think was a neighbor to the man who fell into the hands of robbers? The expert in the law replied, 'The one who had mercy on him.' Jesus told him, 'Go and do likewise.'")
            ]),
    ]

    let timelineEvents: [TimelineEvent] = [
        TimelineEvent(id: "e1", year: "Beginning", title: "Creation", category: .creation,
            description: "God creates the heavens, earth, and humanity in six days. He rests on the seventh, establishing the Sabbath.",
            details: ["God speaks the universe into existence out of nothing", "Humanity created in God's image — male and female", "The Sabbath established as holy rest", "Creation declared 'very good' before the fall"],
            bibleRefs: ["Genesis 1–2"]),
        TimelineEvent(id: "e2", year: "c. 4000 BC", title: "The Fall", category: .creation,
            description: "Adam and Eve disobey God in the Garden of Eden. Sin enters the world, separating humanity from God.",
            details: ["The serpent deceives Eve; Adam follows", "Shame, hiding, blame — sin's immediate consequences", "God pronounces judgment but promises a redeemer", "Death — spiritual and physical — enters creation"],
            bibleRefs: ["Genesis 3"]),
        TimelineEvent(id: "e3", year: "c. 2500 BC", title: "The Great Flood", category: .creation,
            description: "God judges the world's corruption through a global flood but preserves Noah, his family, and animals in the ark.",
            details: ["Humanity's wickedness reaches a breaking point", "Noah found righteous — chosen to preserve life", "Forty days of rain; waters cover the earth", "Rainbow covenant: God will never flood the earth again"],
            bibleRefs: ["Genesis 6–9"]),
        TimelineEvent(id: "e4", year: "c. 2000 BC", title: "Abraham Called", category: .jewish,
            description: "God calls Abram from Ur and establishes a covenant: land, descendants, and blessing for all nations.",
            details: ["Abram leaves everything at God's call", "Covenant sealed with sacrifice and circumcision", "Isaac born miraculously to aged parents", "Near-sacrifice of Isaac — faith tested and confirmed"],
            bibleRefs: ["Genesis 12", "Genesis 15", "Genesis 22"]),
        TimelineEvent(id: "e5", year: "c. 1280 BC", title: "The Exodus", category: .jewish,
            description: "Moses leads Israel out of 400 years of slavery in Egypt through ten plagues and the parting of the Red Sea.",
            details: ["God speaks to Moses from the burning bush", "Ten plagues demonstrating God's power over Egypt's gods", "Passover — death passes over those covered by blood", "Red Sea parts; Israel walks through on dry ground"],
            bibleRefs: ["Exodus 1–15"]),
        TimelineEvent(id: "e6", year: "c. 1010 BC", title: "David Becomes King", category: .jewish,
            description: "David is anointed King of Israel and establishes Jerusalem as the capital. God promises an eternal throne through David's line.",
            details: ["Shepherd boy chosen over his older brothers", "Defeats Goliath in the name of the LORD", "Unites Israel and conquers Jerusalem", "Davidic covenant: a king from David's line forever"],
            bibleRefs: ["1 Samuel 16", "2 Samuel 5–7"]),
        TimelineEvent(id: "e7", year: "c. 5 BC", title: "Birth of Jesus", category: .catholic,
            description: "Jesus is born in Bethlehem to the Virgin Mary, fulfilling hundreds of Old Testament prophecies.",
            details: ["Born of a virgin — the Incarnation of God", "Angels announce to shepherds; Magi follow a star", "Herod's massacre of the innocents", "The eternal Word became flesh and dwelt among us"],
            bibleRefs: ["Matthew 1–2", "Luke 2", "John 1:14"]),
        TimelineEvent(id: "e8", year: "c. AD 30", title: "Crucifixion & Resurrection", category: .catholic,
            description: "Jesus is crucified under Pontius Pilate and rises from the dead three days later, defeating sin and death.",
            details: ["Betrayed by Judas for thirty pieces of silver", "Tried by Pilate, flogged, and crucified", "Darkness, earthquake — the Temple veil torn in two", "Risen on the third day; seen by 500+ witnesses"],
            bibleRefs: ["Matthew 27–28", "1 Corinthians 15"]),
        TimelineEvent(id: "e9", year: "AD 33", title: "Pentecost", category: .catholic,
            description: "The Holy Spirit descends on the disciples in Jerusalem. The Church is born — 3,000 converted in one day.",
            details: ["Sound of rushing wind; tongues of fire", "Disciples speak in foreign languages", "Peter preaches; 3,000 respond and are baptized", "The Church begins its global mission"],
            bibleRefs: ["Acts 2"]),
        TimelineEvent(id: "e10", year: "AD 1054", title: "The Great Schism", category: .catholic,
            description: "Christianity splits between Roman Catholic (West) and Eastern Orthodox (East) over papal authority and theological disputes.",
            details: ["Pope and Patriarch of Constantinople excommunicate each other", "Filioque controversy: does the Spirit proceed from the Father and Son?", "Cultural and political differences had grown for centuries", "Two major branches of Christianity emerge"],
            bibleRefs: []),
        TimelineEvent(id: "e11", year: "AD 1517", title: "The Protestant Reformation", category: .protestant,
            description: "Martin Luther posts his 95 Theses, sparking the Reformation. The five Solas emerge: Scripture Alone, Faith Alone, Grace Alone, Christ Alone, Glory to God Alone.",
            details: ["Luther challenges the sale of indulgences", "Sola Scriptura: the Bible as the only supreme authority", "Sola Fide: justification by faith alone, not works", "Protestant churches multiply across Europe"],
            bibleRefs: ["Romans 1:17", "Ephesians 2:8-9"]),
        TimelineEvent(id: "e12", year: "AD 1611", title: "King James Bible", category: .protestant,
            description: "The King James Version of the Bible is published — the most influential English Bible translation in history.",
            details: ["Commissioned by King James I of England", "47 scholars working from Hebrew and Greek manuscripts", "Became the standard English Bible for 300+ years", "Its language shaped the English language itself"],
            bibleRefs: []),
        TimelineEvent(id: "e13", year: "AD 1906", title: "Azusa Street Revival", category: .modern,
            description: "The Azusa Street Revival in Los Angeles launches the global Pentecostal movement, emphasizing the gifts of the Holy Spirit.",
            details: ["Led by William Seymour — son of freed slaves", "Multiracial congregation — radical for its time", "Speaking in tongues, healings, and conversions", "Sparked Pentecostalism — now 500 million adherents worldwide"],
            bibleRefs: ["Acts 2"]),
    ]

    let courseModules: [CourseModule] = [
        CourseModule(id: "module-1", number: 1, title: "What the Bible Is",
            subtitle: "Understanding what you're actually holding",
            description: "Before reading the Bible, you need to understand what kind of book it actually is. This module covers its origin, structure, and why it can be trusted.",
            lessons: [
                Lesson(id: "1-1", title: "What You're Actually Holding",
                    preview: "The Bible isn't just a religious book. It's a collection of 66 documents written over 1,500 years by 40+ authors — and it tells one unified story.",
                    expanded: "When you pick up a Bible, you're holding something unlike anything else in human history. It was written across 1,500 years, on three continents, in three languages, by kings, shepherds, fishermen, and scholars — and yet it tells one unified story from beginning to end. That's not an accident. It's a claim in itself.",
                    reflectivePrompt: "Have you ever thought of the Bible as a library of books rather than one book? How does that change how you'd approach reading it?",
                    keyTakeaway: "The Bible is a unified collection of 66 documents that tells one coherent story about God and humanity."),
                Lesson(id: "1-2", title: "Old vs New Testament",
                    preview: "The Old Testament is the foundation. The New Testament is the fulfillment. You need both to understand either.",
                    expanded: "The Old Testament (39 books) covers creation, the fall, Israel's history, the law, the prophets, and the poetry of God's people. It sets up a problem — humanity separated from God — and makes promises about how it will be fixed. The New Testament (27 books) is the answer: Jesus fulfills what the Old Testament promised. Without the Old Testament, the New Testament makes no sense. Without the New Testament, the Old Testament remains unresolved.",
                    reflectivePrompt: "Did you grow up reading mostly one Testament over the other? What have you missed by not reading both?",
                    keyTakeaway: "Old and New Testaments are two acts of one story — both necessary to understand the full picture."),
                Lesson(id: "1-3", title: "Why It Can Be Trusted",
                    preview: "The manuscript evidence for the Bible dwarfs any other ancient document. Understanding this matters before you decide what you believe about it.",
                    expanded: "Many people assume the Bible is unreliable — copied too many times, changed over centuries, written too long after the events. The evidence says otherwise. We have over 5,800 Greek manuscripts of the New Testament alone — more than any other ancient text by a massive margin. The Dead Sea Scrolls confirmed the Old Testament's accuracy across 1,000 years of copying. The P52 fragment of John's Gospel dates to within decades of the original writing.",
                    reflectivePrompt: "Have you ever looked into the historical and manuscript evidence for the Bible? What assumptions have you been carrying?",
                    keyTakeaway: "The Bible has stronger manuscript evidence than any other ancient document — the text is reliable."),
            ]),
        CourseModule(id: "module-2", number: 2, title: "How to Read the Bible",
            subtitle: "A practical method for real understanding",
            description: "Most people either read randomly or give up. This module gives you a simple, repeatable method to actually understand what you're reading.",
            lessons: [
                Lesson(id: "2-1", title: "Why Most People Get Stuck",
                    preview: "Opening the Bible at random and hoping something clicks rarely works. Here's why — and what to do instead.",
                    expanded: "The most common approach to the Bible is to open it randomly, read whatever you land on, and hope it makes sense. This almost never works. The Bible has context — historical, cultural, literary. Leviticus makes very little sense without Exodus. Revelation is confusing without Daniel. Paul's letters address specific situations in specific churches. Reading without context is like reading someone else's mail without knowing who wrote it or why.",
                    reflectivePrompt: "Have you ever opened the Bible randomly and felt confused or disconnected? What was that like?",
                    keyTakeaway: "Random reading without context leads to confusion — start with books that give you the clearest foundation."),
                Lesson(id: "2-2", title: "Context Is Everything",
                    preview: "Every passage has three contexts: literary, historical, and biblical. Miss these and you'll misread the text.",
                    expanded: "Literary context: What type of writing is this? Poetry communicates differently than history. Prophecy reads differently than a letter. Historical context: When was this written? To whom? What was happening? A letter written to persecuted Christians in Rome reads differently when you understand Nero's reign. Biblical context: How does this passage fit the whole story of Scripture? A single verse taken out of context can be made to say almost anything.",
                    reflectivePrompt: "Can you think of a verse you've heard used in a way that might be missing its context?",
                    keyTakeaway: "Context — literary, historical, and biblical — determines meaning. Never read a verse in isolation."),
                Lesson(id: "2-3", title: "A Simple 3-Step Method",
                    preview: "Observe, Interpret, Apply. Three steps that take you from reading words to understanding truth.",
                    expanded: "Step 1 — Observe: What does it say? Read carefully. Who is speaking? Who is the audience? What are the key words? What is happening? Step 2 — Interpret: What does it mean? What did it mean to the original audience? What type of literature is it? How does it connect to the rest of Scripture? Step 3 — Apply: What does it mean for me today? Not every text applies the same way, but every text says something about God, humanity, or how we should live.",
                    reflectivePrompt: "Try applying these three steps to John 3:16. What do you observe? What does it mean? How does it apply?",
                    keyTakeaway: "Observe what the text says, interpret what it means, then apply it to your life."),
            ]),
        CourseModule(id: "module-3", number: 3, title: "Where to Start Reading",
            subtitle: "The best starting points for real comprehension",
            description: "Starting in the wrong place leads to confusion and abandonment. This module shows you where to begin and why.",
            lessons: [
                Lesson(id: "3-1", title: "Start with Jesus",
                    preview: "The Gospel of John is written specifically to answer the question: Who is Jesus? Start there.",
                    expanded: "John opens: 'In the beginning was the Word, and the Word was with God, and the Word was God.' He wrote his Gospel so 'that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name.' It's the clearest, most direct answer to the most important question.",
                    reflectivePrompt: "If you were to explain who Jesus is to someone who had never heard of him, where would you start?",
                    keyTakeaway: "Start with the Gospel of John — it answers the central question of the Bible: Who is Jesus?"),
                Lesson(id: "3-2", title: "Then Romans",
                    preview: "Romans is the most complete explanation of the gospel in the entire Bible. Read it after John.",
                    expanded: "After understanding who Jesus is, Romans explains why He had to come. Paul lays out the entire gospel: all humanity is under sin, God's righteousness is revealed in Jesus, justification comes by faith alone, and nothing can separate us from the love of God. Chapters 1–8 are foundational to understanding Christianity itself.",
                    reflectivePrompt: "What questions do you still have about salvation, sin, or grace? Romans may answer them.",
                    keyTakeaway: "Romans is the Bible's most systematic explanation of why Jesus came and how salvation works."),
            ]),
        CourseModule(id: "module-4", number: 4, title: "Who God Is",
            subtitle: "Understanding the nature and character of God",
            description: "Everything in Christianity depends on who God actually is. This module covers God's nature, the Trinity, and His character.",
            lessons: [
                Lesson(id: "4-1", title: "The Trinity",
                    preview: "God is one being in three persons: Father, Son, and Holy Spirit. This is not three gods — it is one God who exists in eternal relationship.",
                    expanded: "The Trinity is the most unique claim of Christianity. God is not a solitary being — He has always existed in relationship within Himself. Father, Son, and Spirit are distinct persons with the same divine essence. This is why 'God is love' (1 John 4:8) — love requires relationship, and God has always been relational within Himself, before creation existed.",
                    reflectivePrompt: "How does understanding God as relational (Trinity) change how you think about prayer or worship?",
                    keyTakeaway: "God is one being in three persons — eternally relational, eternally loving within Himself."),
                Lesson(id: "4-2", title: "God's Character",
                    preview: "Holy, loving, just, merciful, sovereign, good. These are not competing attributes — they work together perfectly.",
                    expanded: "God's holiness means He is entirely separate from sin — pure and morally perfect. His love means He moves toward His creation in grace and care. His justice means He does not ignore wrongdoing — sin has consequences. His mercy means He provides a way for those consequences to be absorbed. His sovereignty means He governs all things according to His purposes. These attributes are not in tension — they are perfectly unified in His nature.",
                    reflectivePrompt: "Which attribute of God is hardest for you to hold onto personally? Why?",
                    keyTakeaway: "God's attributes — holiness, love, justice, mercy — are perfectly unified, not competing."),
            ]),
        CourseModule(id: "module-5", number: 5, title: "Who Jesus Is",
            subtitle: "The central question of Christianity",
            description: "Jesus is either who He claimed to be, or He is the greatest fraud in history. This module examines the evidence and the claims.",
            lessons: [
                Lesson(id: "5-1", title: "The Historical Jesus",
                    preview: "Jesus is one of the most documented figures in ancient history. His existence is confirmed by Roman and Jewish historians outside the Bible.",
                    expanded: "Tacitus, writing around AD 116, mentions 'Christus' who was executed under Pontius Pilate. Josephus, a first-century Jewish historian, refers to Jesus twice. Pliny the Younger documents early Christians worshipping Christ 'as to a god.' These are not friendly sources — yet they confirm the basic historical facts: Jesus lived, was executed, and was worshipped as risen within decades of His death.",
                    reflectivePrompt: "Does it matter to you that Jesus was a real historical figure? Why or why not?",
                    keyTakeaway: "Jesus' existence is confirmed by hostile non-Christian sources — His historicity is not in question."),
                Lesson(id: "5-2", title: "Fully God, Fully Man",
                    preview: "Jesus claimed to be God — not a good teacher or prophet, but God in flesh. This is either the truth or the greatest lie in history.",
                    expanded: "Jesus said 'I and the Father are one' (John 10:30). He accepted worship. He forgave sins — something only God can do. He claimed to be 'I AM' — the name God revealed to Moses from the burning bush. C.S. Lewis made the point famously: Jesus cannot be 'just a good moral teacher.' A man who makes the claims Jesus made is either a liar, a lunatic, or Lord. The evidence points to Lord.",
                    reflectivePrompt: "If Jesus is who He claimed to be, what does that require of you?",
                    keyTakeaway: "Jesus claimed divine identity — not a mere teacher or prophet. His claims demand a verdict."),
            ]),
        CourseModule(id: "module-6", number: 6, title: "Salvation",
            subtitle: "The problem of sin and the gift of grace",
            description: "What does it actually mean to be saved? This module breaks down the gospel with clarity and honesty.",
            lessons: [
                Lesson(id: "6-1", title: "The Problem of Sin",
                    preview: "Sin isn't just doing bad things. It's the condition of a humanity separated from God — and it's the reason everything is broken.",
                    expanded: "The biblical definition of sin (Greek: hamartia) means 'missing the mark.' It's not just doing wrong things — it's the state of being turned away from God, following our own way. Romans 3:23 says all have sinned. This isn't condemnation — it's diagnosis. You can't receive the cure if you don't understand the condition. Sin produces death (Romans 6:23) — not just physical death, but separation from God who is the source of life.",
                    reflectivePrompt: "How do you personally understand sin — is it a list of rules, a condition, or something else?",
                    keyTakeaway: "Sin is the universal condition of humanity — separation from God — not merely rule-breaking."),
                Lesson(id: "6-2", title: "Grace vs Earning",
                    preview: "Every religion in the world except Christianity teaches that you must earn your way to God. Christianity teaches that God came to you.",
                    expanded: "Ephesians 2:8-9 is the clearest statement: 'For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.' Grace means undeserved favor. You did not earn it. You cannot maintain it by performance. You receive it by faith — trusting that what Jesus did on the cross is sufficient. This is the scandalous core of the gospel.",
                    reflectivePrompt: "Do you find yourself trying to earn God's approval? What would it mean to truly rest in grace?",
                    keyTakeaway: "Salvation is a gift received by faith, not wages earned by works — this is what sets Christianity apart."),
            ]),
        CourseModule(id: "module-7", number: 7, title: "How to Live It Out",
            subtitle: "Discipleship in the real world",
            description: "The Christian life isn't just about what you believe — it's about how you live. This module is practical, honest, and direct.",
            lessons: [
                Lesson(id: "7-1", title: "Daily Discipline",
                    preview: "Faith without consistent practice does not grow. This isn't about performance — it's about forming habits that keep you connected to God.",
                    expanded: "Reading Scripture, prayer, community, and worship are not spiritual merit badges — they are the ordinary means by which God shapes us. A person who never reads the Bible but claims to be growing in faith is like an athlete who never trains but claims to be getting stronger. The disciplines are not the goal — God is the goal. The disciplines are the path.",
                    reflectivePrompt: "What would a consistent daily habit of Scripture and prayer look like in your actual life right now?",
                    keyTakeaway: "Spiritual disciplines are not performance — they are the ordinary means of grace God uses to grow us."),
                Lesson(id: "7-2", title: "Fighting Temptation",
                    preview: "Jesus was tempted in every way. The same weapons He used — Scripture, community, and dependence on the Spirit — are available to you.",
                    expanded: "1 Corinthians 10:13 says no temptation is unique to you, and God always provides a way out. James 1:14-15 explains the process: desire leads to sin which leads to death. Identifying the desire before it acts is the key. Jesus responded to every temptation in the wilderness with Scripture. Not feelings. Not willpower. Scripture. Memorizing key passages is a practical, underused weapon.",
                    reflectivePrompt: "What is the pattern of temptation in your life? Where does it typically begin?",
                    keyTakeaway: "Temptation follows predictable patterns — identify the desire early, and respond with Scripture."),
            ]),
        CourseModule(id: "module-8", number: 8, title: "Going Deeper",
            subtitle: "Core doctrines for mature faith",
            description: "This final module covers the theological foundations that will anchor your faith through doubt, difficulty, and growth.",
            lessons: [
                Lesson(id: "8-1", title: "Grace & Mercy",
                    preview: "Grace gives you what you don't deserve. Mercy withholds what you do deserve. You need both — and both are found in Jesus.",
                    expanded: "Grace and mercy are distinct but inseparable. Grace is God giving you righteousness, adoption, and eternal life — things you have not earned and cannot deserve. Mercy is God not giving you the judgment your sin has earned. Both are acts of God's will, not responses to your worthiness. The cross is where both meet: Jesus bears the judgment (mercy to us), and His righteousness is credited to us (grace).",
                    reflectivePrompt: "In your daily life, do you more often need reminding of grace or of mercy? Why?",
                    keyTakeaway: "Grace gives what we don't deserve; mercy withholds what we do deserve — both meet at the cross."),
                Lesson(id: "8-2", title: "Your Identity in Christ",
                    preview: "You are not defined by your failures, your past, your family, or your culture. In Christ, you have a new identity.",
                    expanded: "2 Corinthians 5:17 — 'If anyone is in Christ, the new creation has come: The old has gone, the new is here!' This is not self-help language. It is a declaration of legal and spiritual reality. God does not see you through your past — He sees you through Christ's righteousness. You are forgiven, adopted, sealed, loved, and being sanctified. Living from that identity rather than toward it changes everything.",
                    reflectivePrompt: "What false identities — based on performance, failure, or others' opinions — do you tend to live from?",
                    keyTakeaway: "Your identity in Christ is settled, not earned — forgiven, adopted, and sealed by the Spirit."),
            ]),
    ]

    let bibleStudies: [BibleStudySeries] = [
        BibleStudySeries(id: 1, level: "beginner", title: "Who Is God?", subtitle: "Understanding the Character of the Creator",
            description: "Before you can follow God, you need to know who He is. This series explores what the Bible reveals about God's nature — His love, holiness, power, and personal care for you.",
            tag: "Foundations",
            lessons: [
                BibleStudyLesson(title: "God Is Personal, Not Just a Force",
                    preview: "Many people grow up thinking of God as a distant power or cosmic energy. But the Bible presents something radically different.",
                    content: "The very first verse of the Bible tells us: 'In the beginning, God created the heavens and the earth.' This is not the language of an impersonal force. This is the language of a Creator who acts, who speaks, and who cares about what He makes.\n\nThroughout Scripture, God is presented as someone who speaks, listens, feels grief, rejoices, and responds. In Genesis 3, after Adam and Eve sin, God walks through the garden asking, 'Where are you?' — not because He didn't know, but because He was seeking them. That's personal.\n\nJesus revealed the intimacy of this relationship when He taught His followers to pray 'Our Father.' Not 'O Great Power' or 'Distant Creator.' Father. That word changes everything about how we relate to God.",
                    keyVerse: "Jeremiah 29:11 — 'For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.'",
                    reflectivePrompt: "Have you ever thought of God as distant or impersonal? What would change in your daily life if you really believed He was close and personal?",
                    keyTakeaway: "God is not a vague cosmic force. He is a personal Being who created you, knows you, and wants a relationship with you."),
                BibleStudyLesson(title: "God Is Holy — and That Changes Everything",
                    preview: "Holiness is one of the most important things to understand about God, yet it is one of the most misunderstood.",
                    content: "When the prophet Isaiah saw a vision of God in heaven, the angels were not shouting 'Love, love, love is the Lord.' They were crying 'Holy, holy, holy is the Lord Almighty' (Isaiah 6:3). Holiness is the attribute of God that all of heaven responds to with awe.\n\nHoliness means God is completely set apart — pure, perfect, without any corruption. There is no darkness in Him at all (1 John 1:5). He cannot lie. He cannot do evil. He is the standard of what is right and good.\n\nThis matters for us because it explains why sin is such a serious problem. It's not just that God makes arbitrary rules. It's that anything impure cannot exist in the presence of perfect purity.",
                    keyVerse: "Isaiah 6:3 — 'Holy, holy, holy is the Lord Almighty; the whole earth is full of his glory.'",
                    reflectivePrompt: "Does understanding God's holiness make Him feel more distant or more worthy of trust? How does it change how you think about right and wrong?",
                    keyTakeaway: "God's holiness means He is perfectly pure and righteous. This is not a barrier to relationship — it's what makes His love so remarkable."),
                BibleStudyLesson(title: "God Is Love — Not Soft, But Sacrificial",
                    preview: "The most quoted description of God is that 'God is love.' But what that actually means is far deeper than most people realize.",
                    content: "1 John 4:8 says plainly: 'Whoever does not love does not know God, because God is love.' Not just loving — love itself. It's not something He does on occasion. It is who He is at the core.\n\nBut here's where many people misunderstand. God's love is not sentimental or soft. It is not simply being okay with everything. The Bible's definition of love shows up most clearly in action: 'For God so loved the world that He gave His one and only Son' (John 3:16). Love, by biblical definition, gives. It sacrifices. It costs something.",
                    keyVerse: "Romans 8:38–39 — 'Neither death nor life... will be able to separate us from the love of God that is in Christ Jesus our Lord.'",
                    reflectivePrompt: "Have you ever experienced or witnessed a love that cost something? How does that change your understanding of what God's love means?",
                    keyTakeaway: "God's love is not passive or sentimental — it is active, sacrificial, and unbreakable. It is the most trustworthy thing in the universe."),
                BibleStudyLesson(title: "God Is Sovereign — He Is in Control",
                    preview: "In a world that feels chaotic and unpredictable, one of the most grounding truths in Scripture is that God is sovereign.",
                    content: "Sovereignty means God is in ultimate authority over all things. He is not surprised by events. He is not outmaneuvered by evil. He is not waiting to see how things play out. Psalm 103:19 says: 'The Lord has established His throne in heaven, and His kingdom rules over all.'\n\nJoseph in Genesis is one of the clearest examples. He was sold into slavery by his own brothers, falsely imprisoned, and forgotten for years. Yet at the end of his story he says: 'You intended to harm me, but God intended it for good' (Genesis 50:20).",
                    keyVerse: "Romans 8:28 — 'We know that in all things God works for the good of those who love him, who have been called according to his purpose.'",
                    reflectivePrompt: "Is there a difficult situation in your life right now where it's hard to trust that God is in control? What would it mean to really believe Romans 8:28 about that situation?",
                    keyTakeaway: "God's sovereignty means He is in ultimate authority and nothing is outside His ability to redeem. This is not a reason to be passive — it is a reason to trust."),
            ]),
        BibleStudySeries(id: 2, level: "beginner", title: "What Is Sin?", subtitle: "Understanding the Problem God Came to Solve",
            description: "You cannot fully appreciate salvation without first understanding what you are being saved from. This series unpacks what sin actually is, where it came from, and why it matters so much.",
            tag: "Foundations",
            lessons: [
                BibleStudyLesson(title: "Sin Is More Than Just Bad Behavior",
                    preview: "Most people think of sin as doing wrong things. But the Bible describes something much deeper — a condition, not just a list of actions.",
                    content: "The most common Greek word for sin in the New Testament is 'hamartia,' which literally means 'missing the mark.' The idea is not just that you did something wrong, but that you aimed at the wrong target altogether.\n\nSin began in Genesis 3. God created Adam and Eve in a perfect relationship with Him, with one boundary. They chose to cross that boundary — not because they were forced to, but because they were tempted and chose themselves over God. That choice introduced a spiritual brokenness that has affected every human being since.",
                    keyVerse: "Romans 3:23 — 'For all have sinned and fall short of the glory of God.'",
                    reflectivePrompt: "Do you tend to see sin as a list of bad actions, or as something deeper? How does that change what you think the solution needs to be?",
                    keyTakeaway: "Sin is not just bad behavior — it is a condition of the human heart that separates us from God. This is why grace, not self-improvement, is the answer."),
                BibleStudyLesson(title: "The Consequences of Sin",
                    preview: "Sin is not just a spiritual technicality. It has real, measurable consequences — in relationships, in our inner life, and in eternity.",
                    content: "Romans 6:23 is one of the most direct verses in the Bible: 'For the wages of sin is death.' Wages are what you earn. This is what sin earns: spiritual death — separation from God.\n\nThe prophet Isaiah put it this way: 'Your iniquities have separated you from your God; your sins have hidden his face from you, so that he will not hear' (Isaiah 59:2). The greatest consequence of sin is not punishment — it is distance from God, the very source of life and peace.",
                    keyVerse: "Romans 6:23 — 'For the wages of sin is death, but the gift of God is eternal life in Christ Jesus our Lord.'",
                    reflectivePrompt: "Can you identify any area of your life where unaddressed sin has caused damage? What do you think restoration would look like?",
                    keyTakeaway: "Sin's greatest consequence is separation from God. But God does not leave us there — He provides a way back through Jesus."),
                BibleStudyLesson(title: "Why We Cannot Fix It Ourselves",
                    preview: "Almost every religion or philosophy in the world offers a solution to the human problem. Most put the work on you.",
                    content: "Religion generally works like this: do good, avoid bad, and eventually the scale tips in your favor. The problem is that the Bible presents a different diagnosis — and therefore a different solution.\n\nPaul describes his own struggle in Romans 7: 'I do not do the good I want to do, but the evil I do not want to do — this I keep on doing.' This is the honest cry of someone who knows what is right but finds themselves unable to consistently live it out under their own power.\n\nThe solution cannot come from us. It has to come from outside of us — from a God who can change the nature, not just the behavior. That's what new birth is.",
                    keyVerse: "Ezekiel 36:26 — 'I will give you a new heart and put a new spirit in you.'",
                    reflectivePrompt: "Have you ever tried to change a behavior on your own willpower alone, only to fall back into it? What does that experience tell you about the need for something deeper?",
                    keyTakeaway: "Willpower and religion cannot fix the human sin problem. Only a new nature, given by God through Jesus, can address the root."),
            ]),
        BibleStudySeries(id: 3, level: "beginner", title: "Who Is Jesus?", subtitle: "The Central Question of All of History",
            description: "Jesus of Nazareth is the most influential figure in all of human history. But who does He claim to be — and is that claim supported by evidence?",
            tag: "Jesus",
            lessons: [
                BibleStudyLesson(title: "Jesus Was a Real Historical Person",
                    preview: "Some people assume Jesus is a mythological figure. The evidence from history — including non-Christian sources — says otherwise.",
                    content: "The existence of Jesus is supported not only by the New Testament but by multiple non-Christian historians from the first and second centuries.\n\nTacitus, the Roman historian, writes in his Annals (AD 116) about 'Christus, from whom the name had its origin, [who] suffered the extreme penalty during the reign of Tiberius at the hands of one of our procurators, Pontius Pilatus.' No serious historian today denies that Jesus existed.",
                    keyVerse: "John 1:14 — 'The Word became flesh and made his dwelling among us.'",
                    reflectivePrompt: "Have you ever encountered the idea that Jesus was just a myth? How does the historical evidence change or reinforce your view of Him?",
                    keyTakeaway: "Jesus is not a mythological figure. His existence is confirmed by multiple historical sources, both Christian and non-Christian."),
                BibleStudyLesson(title: "Jesus Claimed to Be God",
                    preview: "Jesus did not just claim to be a good teacher or a prophet. He made claims that forced people to either accept Him or reject Him.",
                    content: "C.S. Lewis famously observed that Jesus left us no comfortable middle option. He said things that a merely good man would never say. 'I and the Father are one' (John 10:30). 'Before Abraham was born, I am' (John 8:58). 'I am the way and the truth and the life. No one comes to the Father except through me' (John 14:6).\n\nLewis's conclusion: Jesus is either a liar, a lunatic, or Lord. The option that many people prefer — that He was simply a great moral teacher — is the one option He did not leave open.",
                    keyVerse: "John 14:6 — 'Jesus answered, I am the way and the truth and the life. No one comes to the Father except through me.'",
                    reflectivePrompt: "Which of the three options — liar, lunatic, or Lord — do you find most difficult to dismiss?",
                    keyTakeaway: "Jesus made claims that rule out the 'nice teacher' option. He either is who He claimed to be, or He was deluded or dishonest. The evidence points to Lord."),
                BibleStudyLesson(title: "Why Jesus Had to Die",
                    preview: "The death of Jesus was not a tragedy that derailed His mission. It was the mission.",
                    content: "At the heart of the gospel is a problem of justice. God is holy and just — He cannot simply overlook sin. Sin has consequences. A judge who lets every guilty person walk free is not a good judge.\n\nBut God is also love. He does not want any person to be eternally separated from Him. The answer is the cross. Jesus, who was fully God and fully human, willingly took on the death we deserve. 2 Corinthians 5:21: 'God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.'",
                    keyVerse: "2 Corinthians 5:21 — 'God made him who had no sin to be sin for us, so that in him we might become the righteousness of God.'",
                    reflectivePrompt: "Before reading this, how did you think about why Jesus died? Has your understanding shifted?",
                    keyTakeaway: "Jesus died not as a tragic accident but as the intentional fulfillment of God's plan to satisfy justice and extend mercy at the same time."),
                BibleStudyLesson(title: "The Resurrection — Did It Really Happen?",
                    preview: "The resurrection is the cornerstone claim of Christianity. If it happened, everything changes.",
                    content: "Paul writes in 1 Corinthians 15:17: 'If Christ has not been raised, your faith is futile; you are still in your sins.' The evidence for the resurrection: the tomb was empty (no one produced a body), multiple independent sources record appearances of the risen Jesus, and the transformation of the disciples is historically remarkable — cowards who ran away became martyrs who died for this testimony.",
                    keyVerse: "1 Corinthians 15:3–4 — 'Christ died for our sins according to the Scriptures, he was buried, he was raised on the third day.'",
                    reflectivePrompt: "What do you find most compelling or most challenging about the historical case for the resurrection?",
                    keyTakeaway: "The resurrection is a historical claim backed by the empty tomb, multiple eyewitness accounts, and the transformation of the early disciples."),
            ]),
        BibleStudySeries(id: 4, level: "beginner", title: "What Is Salvation?", subtitle: "How to Be Made Right with God",
            description: "Salvation is the central gift of the Christian faith. This series clarifies what salvation is, how it works, and what it produces.",
            tag: "The Gospel",
            lessons: [
                BibleStudyLesson(title: "Grace: Saved by Gift, Not by Effort",
                    preview: "Almost every religion teaches that you earn your way to God. Christianity teaches the opposite.",
                    content: "Ephesians 2:8–9: 'For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast.'\n\nGrace means receiving something you did not earn and do not deserve. You cannot earn grace — the moment you earn something, it stops being grace and becomes a transaction. Salvation is not a reward for the good enough. It is a rescue for the lost.",
                    keyVerse: "Ephesians 2:8–9 — 'For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God.'",
                    reflectivePrompt: "Do you ever find yourself thinking you need to get your life together before you can come to God? Where does that impulse come from?",
                    keyTakeaway: "Salvation is entirely a gift from God, received through faith. You cannot earn it, improve your way to it, or maintain it through effort."),
                BibleStudyLesson(title: "Faith: What It Means to Believe",
                    preview: "The word 'believe' is used over 100 times in the New Testament. But what does biblical faith actually mean?",
                    content: "James 2:19 makes a startling point: 'Even the demons believe that — and shudder.' Believing facts about God is not the same as saving faith.\n\nBiblical faith has three elements: notitia (knowledge), assensus (agreement), and fiducia (trust — personally committing yourself to what you believe). The third element is what makes faith saving. A good illustration is a bridge: you can know it exists, believe it holds weight, but faith is when you step onto it.",
                    keyVerse: "John 3:16 — 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.'",
                    reflectivePrompt: "Is there a difference between what you know about Jesus and what you actually trust Him with in your daily life?",
                    keyTakeaway: "Saving faith is not just knowing facts about Jesus — it is personally trusting Him with your life."),
                BibleStudyLesson(title: "Repentance: Turning Around",
                    preview: "The first word of Jesus's public ministry was 'Repent.' Understanding repentance is essential.",
                    content: "The Greek word for repentance is 'metanoia' — literally 'a change of mind' that leads to a change of direction. Repentance is not just feeling bad about what you have done. It is a decision. It is turning around.\n\n2 Corinthians 7:10 distinguishes between two kinds of sorrow: 'Godly sorrow brings repentance that leads to salvation... but worldly sorrow brings death.' Worldly sorrow is regret about consequences. Godly sorrow is grief over who you have been — and it produces change.",
                    keyVerse: "Acts 3:19 — 'Repent, then, and turn to God, so that your sins may be wiped out.'",
                    reflectivePrompt: "Is there an area of your life where you know what God thinks, but you're still defending your own way?",
                    keyTakeaway: "Repentance is not just remorse — it is a genuine change of direction, agreeing with God about your sin and choosing to turn toward Him."),
                BibleStudyLesson(title: "Assurance: Knowing You Are Saved",
                    preview: "Many Christians live with chronic uncertainty about their salvation. The Bible speaks directly to this.",
                    content: "1 John 5:13 was written for a specific purpose: 'I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life.' The word 'know' is deliberate. John is not writing so you can sort of hope or vaguely wonder.\n\nAssurance of salvation is not arrogance. It is trust in a promise. Jesus said, 'I give them eternal life, and they shall never perish; no one will snatch them out of my hand' (John 10:28).",
                    keyVerse: "1 John 5:13 — 'I write these things to you who believe in the name of the Son of God so that you may know that you have eternal life.'",
                    reflectivePrompt: "Do you have assurance of your salvation, or does it feel uncertain? What would it mean to rest your assurance in God's promise?",
                    keyTakeaway: "Assurance of salvation is trusting God's promise. Your security rests in Jesus's grip on you, not your grip on Him."),
            ]),
        BibleStudySeries(id: 5, level: "beginner", title: "Prayer — How to Talk to God", subtitle: "Building a Real, Honest Conversation with God",
            description: "Prayer is one of the most important practices in the Christian life — and one of the most neglected. This series takes prayer beyond ritual.",
            tag: "Spiritual Practices",
            lessons: [
                BibleStudyLesson(title: "What Prayer Actually Is",
                    preview: "Many people think of prayer as a religious ritual or a last resort in a crisis. The Bible describes something far more dynamic.",
                    content: "Prayer is simply talking to God. It is not a formula, a performance, or a technique. Jesus told His followers not to 'heap up empty phrases' or pray to be seen by others (Matthew 6:5–7).\n\nThe God of the Bible is not impressed by eloquence. He is looking for honesty. The Psalms are full of raw, unpolished prayers — 'How long, Lord? Will you forget me forever?' (Psalm 13:1). You do not need special language or a special building.",
                    keyVerse: "Philippians 4:6 — 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.'",
                    reflectivePrompt: "When you think about praying, what obstacles or hesitations come up most often?",
                    keyTakeaway: "Prayer is honest conversation with God — not performance, not formula, not last resort. It is the primary way relationship with God is built."),
                BibleStudyLesson(title: "How Jesus Prayed — The Lord's Prayer Unpacked",
                    preview: "When the disciples asked Jesus to teach them how to pray, He gave them a model far richer than most people realize.",
                    content: "In Matthew 6:9–13, Jesus gives what is commonly called the Lord's Prayer. It is not meant to be a prayer you recite — it is a structure you follow.\n\n'Our Father' — You are approaching a Father, not a judge.\n'Hallowed be your name' — Before requests, there is worship.\n'Your kingdom come, your will be done' — Surrendering your agenda to God's purposes.\n'Give us today our daily bread' — Daily practical needs to God.\n'Forgive us our debts' — Keeping the account short.\n'Lead us not into temptation' — Acknowledging your own vulnerability.",
                    keyVerse: "Matthew 6:9–10 — 'Our Father in heaven, hallowed be your name. Your kingdom come, your will be done, on earth as it is in heaven.'",
                    reflectivePrompt: "Which part of the Lord's Prayer structure do you find yourself skipping most often?",
                    keyTakeaway: "The Lord's Prayer is a model for prayer, not a script. It teaches: approach God as Father, worship before requesting, surrender your agenda, pray for daily needs."),
                BibleStudyLesson(title: "When God Says No",
                    preview: "What do you do when you pray and God doesn't answer the way you wanted?",
                    content: "Paul describes in 2 Corinthians 12 a 'thorn in the flesh' he repeatedly asked God to remove. God's answer was: 'My grace is sufficient for you, for my power is made perfect in weakness.' Three times Paul asked. Three times the answer was no — but the no came with a reason and a promise.\n\nWhen God says no, there are several things He might be doing: protecting you from something you cannot see, preparing you for something that requires this season, or accomplishing a larger purpose through your willingness to trust Him anyway.",
                    keyVerse: "2 Corinthians 12:9 — 'My grace is sufficient for you, for my power is made perfect in weakness.'",
                    reflectivePrompt: "Is there a prayer you have prayed that God seems to have said no to? Looking back, can you see any possible reason?",
                    keyTakeaway: "God's no is not rejection or absence. It is evidence of a wisdom greater than ours, working toward purposes we cannot always see."),
                BibleStudyLesson(title: "Building a Consistent Prayer Life",
                    preview: "Knowing about prayer and actually praying are two different things. This lesson is practical.",
                    content: "The most honest thing that can be said about prayer is that it requires intention. It does not happen by accident.\n\nPractical patterns: Fixed times of prayer — Daniel prayed three times a day regardless of circumstances (Daniel 6:10). A regular place — Jesus often went to a specific garden to pray. Journaling your prayers — Writing prayers slows down your thinking and allows you to look back at answers. Praying Scripture back to God — Taking a Psalm and praying through it line by line. Start small and be consistent — Five minutes every day builds a stronger habit than sporadic two-hour sessions.",
                    keyVerse: "1 Thessalonians 5:17 — 'Pray continually.'",
                    reflectivePrompt: "What is the most realistic way for you to build a consistent prayer habit given your actual schedule?",
                    keyTakeaway: "Consistent prayer requires intention and structure. Fixed times, a regular place, and starting small build a prayer life that is sustainable and transformative."),
            ]),
        BibleStudySeries(id: 6, level: "beginner", title: "Reading the Bible", subtitle: "How to Actually Understand What You're Reading",
            description: "Many Christians own a Bible and rarely open it. This series gives you practical tools to read Scripture in a way that is genuinely life-changing.",
            tag: "Spiritual Practices",
            lessons: [
                BibleStudyLesson(title: "Why Reading the Bible Is Non-Negotiable",
                    preview: "The Bible is not just a religious book to be read once. It is the primary way God speaks to His people.",
                    content: "2 Timothy 3:16–17 states: 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.' Every part is useful. Not just the famous parts.\n\nJesus, when tempted in the wilderness, responded to every temptation with Scripture: 'It is written...' This was not coincidence. He was modeling that the Word of God is the weapon against temptation and the anchor in confusion.",
                    keyVerse: "2 Timothy 3:16–17 — 'All Scripture is God-breathed and is useful for teaching, rebuking, correcting and training in righteousness.'",
                    reflectivePrompt: "How often do you currently read the Bible? What gets in the way?",
                    keyTakeaway: "Regular Bible reading is not optional for a healthy Christian life. It is how God speaks, how you are protected, and how you stay oriented toward truth."),
                BibleStudyLesson(title: "The Observe-Interpret-Apply Method",
                    preview: "Most people read the Bible too quickly. There is a better way.",
                    content: "OBSERVE — What does the text actually say? Read slowly. Notice who is speaking and to whom. Notice what words are repeated. Ask: Who? What? When? Where? How?\n\nINTERPRET — What does the text mean? Context is everything. What was the historical situation? What did this mean to the original audience? Every passage has one primary meaning — the author's intended meaning.\n\nAPPLY — What does this mean for how I live? Application should be concrete — not 'I should trust God more' but 'This week when I feel anxious about X, I am going to say out loud that God is in control.'",
                    keyVerse: "James 1:22 — 'Do not merely listen to the word, and so deceive yourselves. Do what it says.'",
                    reflectivePrompt: "Think of a Bible passage you have read before. If you applied the Observe step — just looking carefully — what do you notice that you may have glossed over before?",
                    keyTakeaway: "The Observe-Interpret-Apply method slows you down and deepens your understanding. The goal is not more verses read but more truth received and lived."),
                BibleStudyLesson(title: "Where to Start and How to Keep Going",
                    preview: "The Bible is long and complex. Knowing where to start and how to build momentum changes everything.",
                    content: "One of the most common mistakes people make is trying to read the Bible straight through from Genesis 1. Leviticus stops most people cold.\n\nThe best starting point for someone new to the Bible is the Gospel of John. It was written specifically so that readers would believe in Jesus (John 20:31). After John, move to Romans, then the other Gospels and Acts.\n\nFor building a reading habit: one chapter a day is far better than reading ten chapters in a burst and then stopping for a month. Consider reading with a journal nearby — write down one observation, one question, and one application.",
                    keyVerse: "John 20:31 — 'These are written that you may believe that Jesus is the Messiah, the Son of God, and that by believing you may have life in his name.'",
                    reflectivePrompt: "What has your experience of reading the Bible been so far? What approach feels most helpful or most feasible for you right now?",
                    keyTakeaway: "Start with the Gospel of John. Prioritize consistency over quantity. Give yourself permission to not understand everything at once — keep moving."),
            ]),
        BibleStudySeries(id: 7, level: "beginner", title: "The Holy Spirit", subtitle: "Who He Is and Why He Changes Everything",
            description: "The Holy Spirit is one of the most misunderstood persons of the Trinity. This series clears up the confusion.",
            tag: "Theology",
            lessons: [
                BibleStudyLesson(title: "Who Is the Holy Spirit?",
                    preview: "The Holy Spirit is often described as a force or a feeling. The Bible describes a person.",
                    content: "The Holy Spirit is not an impersonal force like electricity or spiritual energy. He is the third person of the Trinity — fully God, fully personal, fully active.\n\nJesus spoke of the Spirit as 'He' — not 'it.' 'But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things' (John 14:26). The Spirit can be grieved (Ephesians 4:30), lied to (Acts 5:3–4), and resisted (Acts 7:51) — all things that are only possible with a personal being.",
                    keyVerse: "John 14:16–17 — 'And I will ask the Father, and he will give you another advocate to help you and be with you forever — the Spirit of truth.'",
                    reflectivePrompt: "Have you thought of the Holy Spirit as a person or more as a vague spiritual force? How does understanding Him as a person change how you might relate to Him?",
                    keyTakeaway: "The Holy Spirit is a person — the third member of the Trinity — who lives permanently inside every believer."),
                BibleStudyLesson(title: "What the Holy Spirit Does in You",
                    preview: "The Spirit is not just present in the Christian life — He is the engine of genuine spiritual transformation.",
                    content: "Galatians 5:22–23 describes what the Holy Spirit produces in the life of a believer: 'love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.' These are called the fruit of the Spirit — singular fruit. It is one interconnected character that develops as you walk with the Spirit.\n\nThe fruit is not produced by trying harder to be loving or patient — it is the natural result of connection with the Spirit, like fruit that grows naturally from a healthy tree.",
                    keyVerse: "Galatians 5:22–23 — 'The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control.'",
                    reflectivePrompt: "Looking at the fruit of the Spirit list, which one feels most developed in you right now? Which one feels most lacking?",
                    keyTakeaway: "The Holy Spirit's work in you is transformation from the inside out — producing character, equipping with gifts, convicting of sin, and interceding when you are too weak to pray."),
                BibleStudyLesson(title: "Walking in Step with the Spirit",
                    preview: "Paul uses the phrase 'walk by the Spirit' — not run, not sprint, not perform. Walk. What does that look like practically?",
                    content: "Galatians 5:16 says: 'Walk by the Spirit, and you will not gratify the desires of the flesh.' Paul does not say struggle against the flesh harder. He says walk by the Spirit. The focus is on cooperation, not combat.\n\nPractically: Start your day with a simple prayer: 'Holy Spirit, lead me today. I am available.' When you sense a prompting — to encourage someone, to pray — act on it. When you grieve the Spirit through sin, confess quickly and return to fellowship. Read Scripture with the expectation that the Spirit will illuminate it.",
                    keyVerse: "Galatians 5:16 — 'Walk by the Spirit, and you will not gratify the desires of the flesh.'",
                    reflectivePrompt: "When you sense a prompting to do something — encourage someone, pray — what is your typical response?",
                    keyTakeaway: "Walking in step with the Spirit is daily attentiveness and responsiveness — not a mystical experience but a practical posture of surrender and openness."),
            ]),
        BibleStudySeries(id: 8, level: "beginner", title: "Christian Community — Why You Need the Church", subtitle: "You Were Not Designed to Follow Jesus Alone",
            description: "Many people today want Jesus without the church. But the New Testament knows nothing of solo Christianity.",
            tag: "Life Together",
            lessons: [
                BibleStudyLesson(title: "You Cannot Do This Alone",
                    preview: "Modern culture celebrates radical independence. Christianity runs on something different.",
                    content: "Hebrews 10:24–25 is one of the most direct commands about community: 'Let us consider how we may spur one another on toward love and good deeds, not giving up meeting together... but encouraging one another.'\n\nEcclesiastes 4:9–10 makes the practical case: 'Two are better than one. If either of them falls down, one can help the other up. But pity anyone who falls and has no one to help them up.' Solo Christianity sounds noble, but evidence consistently shows community is essential to long-term faith.",
                    keyVerse: "Hebrews 10:24–25 — 'Let us consider how we may spur one another on toward love and good deeds, not giving up meeting together.'",
                    reflectivePrompt: "Do you currently have people in your life who know you well enough to encourage you and hold you accountable in your faith?",
                    keyTakeaway: "Solo Christianity is not what the New Testament describes. Genuine community — where people actually know and help each other — is essential to following Jesus over the long haul."),
                BibleStudyLesson(title: "What the Church Actually Is",
                    preview: "Many people think the church is a building or an institution. The Bible describes something entirely different.",
                    content: "The Greek word for church is 'ekklesia' — literally 'the called-out ones.' It refers to a community of people, not a building. When Paul writes to 'the church in Corinth,' there was no church building.\n\nThe New Testament uses several images: a family (brothers and sisters in Christ), a body (each person is a part with a function — 'no part can say to another I don't need you,' 1 Corinthians 12:21), and a temple (each believer is a living stone being built into something larger).",
                    keyVerse: "1 Corinthians 12:27 — 'Now you are the body of Christ, and each one of you is a part of it.'",
                    reflectivePrompt: "How do you typically think about the church — as a place you go to, or a community you belong to?",
                    keyTakeaway: "The church is not a building or a service — it is a community you are meant to belong to, contribute to, and be shaped by."),
                BibleStudyLesson(title: "Finding and Choosing a Church",
                    preview: "For someone new to the Christian faith, choosing a church can feel overwhelming. Here are the things that actually matter.",
                    content: "The criteria most people use — music style, how polished the service is — are mostly the wrong criteria.\n\nWhat actually matters: SOUND TEACHING — Is the Bible taught clearly and honestly? Is the gospel preached? GENUINE COMMUNITY — Are there real relationships, or is everyone a stranger? Can you connect to smaller groups? WORSHIP THAT HONORS GOD — Is the focus on God or on the experience? ACCOUNTABILITY AND GROWTH — Is there expectation of discipleship?\n\nThere is no perfect church — it is made of imperfect people. But a church with sound teaching, genuine community, and a culture of growth is worth committing to.",
                    keyVerse: "Acts 2:42 — 'They devoted themselves to the apostles' teaching and to fellowship, to the breaking of bread and to prayer.'",
                    reflectivePrompt: "What have your previous experiences with church been like? What has been missing?",
                    keyTakeaway: "Choose a church based on sound teaching, genuine community, and a culture of growth — not on style, comfort, or entertainment value."),
            ]),
        BibleStudySeries(id: 9, level: "beginner", title: "Dealing with Doubt", subtitle: "What to Do When Faith Feels Hard",
            description: "Doubt is not the opposite of faith — it is part of the journey. This series is for Christians who have questions and moments when God feels distant.",
            tag: "Real Life",
            lessons: [
                BibleStudyLesson(title: "Doubt Is Not the Enemy of Faith",
                    preview: "Many Christians are afraid to admit doubt. The Bible says something different.",
                    content: "The Psalms are the most honest book in the Bible. Psalm 13 opens with: 'How long, Lord? Will you forget me forever?' This is raw, honest doubt spoken directly to God.\n\nElijah, after calling down fire from heaven, runs away in fear and asks God to let him die. John the Baptist, who baptized Jesus, sends messengers from prison asking: 'Are you the one who is to come, or should we expect someone else?' These are not weak believers — these are heroes of the faith who went through deep darkness.\n\nFaith is not the absence of doubt. It is the choice to trust in spite of uncertainty.",
                    keyVerse: "Mark 9:24 — 'I do believe; help me overcome my unbelief!'",
                    reflectivePrompt: "What is the biggest doubt or question you are currently carrying about your faith?",
                    keyTakeaway: "Doubt does not disqualify you. It is part of authentic faith. The Bible's greatest figures wrestled with doubt and God met them in it."),
                BibleStudyLesson(title: "What to Do When God Feels Absent",
                    preview: "Every Christian goes through seasons when prayer feels like talking to a ceiling.",
                    content: "The mystics called it 'the dark night of the soul.' Even Mother Teresa's private journals showed she experienced nearly 50 years of feeling God's absence while ministering to the dying poor.\n\nWhat helps: Keep showing up. Keep reading Scripture even when it feels dry. Keep praying even when prayer feels hollow. Faith exercised without feeling is not weaker faith — it is stronger faith. The feeling often returns. But even if it does not, the truth remains the same whether you feel it or not.",
                    keyVerse: "Psalm 27:14 — 'Wait for the Lord; be strong and take heart and wait for the Lord.'",
                    reflectivePrompt: "Have you ever gone through a season where God felt absent? What did you do during that time?",
                    keyTakeaway: "God's felt absence is not His actual absence. Seasons of silence are part of almost every believer's journey. Keep showing up."),
                BibleStudyLesson(title: "Hard Questions Have Real Answers",
                    preview: "Christianity does not ask you to stop thinking. The best Christian thinkers have engaged the hard questions head-on.",
                    content: "Some of the hardest questions: Why does God allow suffering? How can a good God send people to hell? Hasn't science disproved religion?\n\nOn suffering: C.S. Lewis concluded that the existence of evil actually points to the existence of a moral standard — and therefore a Moral Lawgiver. On science and faith: The founders of modern science — Newton, Kepler, Pasteur — were devout Christians who saw science as reading the mind of God through creation.\n\nYou do not need to have all the answers to move forward in faith. But knowing the questions have been wrestled with by great minds and found answerable should give you confidence.",
                    keyVerse: "1 Peter 3:15 — 'Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.'",
                    reflectivePrompt: "What is the one question about Christianity that you find hardest to answer? Have you ever seriously researched it?",
                    keyTakeaway: "Christianity does not require intellectual surrender. Hard questions have real answers. Engage them seriously — the faith is stronger for honest investigation."),
            ]),
        BibleStudySeries(id: 10, level: "beginner", title: "Living It Out — Everyday Discipleship", subtitle: "What Following Jesus Actually Looks Like Day to Day",
            description: "Christianity is not just a belief system — it is a way of life. This series grounds faith in the practical, daily reality of what it looks like to actually live as a disciple.",
            tag: "Daily Life",
            lessons: [
                BibleStudyLesson(title: "Discipleship Is a Daily Decision",
                    preview: "Becoming a Christian is a moment. Being a Christian is a daily choice to follow.",
                    content: "Luke 9:23: 'Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me.' Three verbs. Deny yourself. Take up your cross. Follow. And the key word: daily.\n\nThis is why the Christian life is described in terms of movement: running a race, walking in the Spirit, pressing on toward a goal. There is no arrival point in this life. Growth is the goal. Yesterday's failures do not disqualify you from today's faithfulness.",
                    keyVerse: "Luke 9:23 — 'Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me.'",
                    reflectivePrompt: "What is one area of your life where following Jesus daily costs you something?",
                    keyTakeaway: "Discipleship is a daily decision, not a one-time event. Every day is an opportunity to choose His way — and every new morning is a fresh start."),
                BibleStudyLesson(title: "Renewing Your Mind",
                    preview: "The most important battlefield in the Christian life is not behavior — it is thinking.",
                    content: "Romans 12:2: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind. Then you will be able to test and approve what God's will is.'\n\nThe 'pattern of this world' — the default assumptions and values that culture constantly presses you toward — is not neutral. It is formative. Renewing your mind is active, not passive. It means filling your thinking with Scripture and choosing consciously rather than defaulting.",
                    keyVerse: "Romans 12:2 — 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.'",
                    reflectivePrompt: "What are the biggest sources of information, entertainment, and influence in your daily life? Are they more likely to renew your mind toward God?",
                    keyTakeaway: "Transformation begins in the mind. Renewing your mind is active, intentional, and daily — choosing what fills your thinking."),
                BibleStudyLesson(title: "Serving Others — Finding Your Place",
                    preview: "Christianity is not a spectator sport. Every believer is called to serve.",
                    content: "Ephesians 2:10: 'For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.' Saved by grace — for works.\n\nEvery believer has been given spiritual gifts for building up the body of Christ (1 Corinthians 12:7). These are not optional extras for the particularly devout. Discovering yours and using them is part of what it means to be fully alive in Christ.",
                    keyVerse: "Ephesians 2:10 — 'For we are God's handiwork, created in Christ Jesus to do good works, which God prepared in advance for us to do.'",
                    reflectivePrompt: "What do you think your gifts or strengths might be? Is there a need in your church or community that matches what you are good at?",
                    keyTakeaway: "You are saved for something — good works that God prepared for you specifically. Finding your unique place of service is central to the full Christian life."),
                BibleStudyLesson(title: "Sharing Your Faith — Naturally and Without Fear",
                    preview: "Many Christians feel paralyzed at the idea of sharing their faith.",
                    content: "1 Peter 3:15: 'Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have. But do this with gentleness and respect.'\n\nThe most effective evangelism is story-telling. The man born blind who was healed by Jesus said simply: 'Whether he is a sinner or not, I don't know. One thing I do know. I was blind but now I see!' He did not have a systematic theology. He had a story. Your story is something no one can argue with.",
                    keyVerse: "1 Peter 3:15 — 'Always be prepared to give an answer to everyone who asks you to give the reason for the hope that you have.'",
                    reflectivePrompt: "Is there someone in your life right now who doesn't know Jesus? What would it look like to pray for them consistently?",
                    keyTakeaway: "Sharing your faith starts with living differently and telling your story. You don't need all the answers — you need genuine hope and the willingness to talk about it."),
            ]),
        BibleStudySeries(id: 11, level: "intermediate", title: "When God Does Not Answer Prayer", subtitle: "What Scripture Says About Silence, Waiting, and Hindered Prayer",
            description: "Some of the most honest moments in the Christian life happen when prayer feels like silence. This study doesn't offer easy answers — it opens Scripture and looks directly at what God says.",
            tag: "Prayer",
            lessons: [
                BibleStudyLesson(title: "The Foundation: God Hears — But on His Terms",
                    preview: "Before examining why God sometimes doesn't answer, we need to establish what Scripture actually promises about prayer.",
                    content: "Scripture makes bold promises about prayer. Jesus said, 'If you will ask anything in my name, I will do it' (John 14:14). John wrote, 'If we ask anything according to his will, he listens to us' (1 John 5:14). But those two verses carry critical qualifiers: 'in my name' and 'according to his will.'\n\nPraying 'in Jesus's name' is not a formula you add at the end. It means praying in alignment with His character and purposes. 'According to His will' assumes that your prayer is submitted to a will greater than your own.",
                    keyVerse: "1 John 5:14 — 'If we ask anything according to his will, he listens to us.'",
                    reflectivePrompt: "When you pray, do you typically pray toward what you want, or toward what God might want?",
                    keyTakeaway: "God's promises about prayer all carry qualifiers — 'in my name' and 'according to his will.' Prayer is a conversation submitted to a will greater than your own."),
                BibleStudyLesson(title: "Hindered Prayer: When Wrong Motives Block the Line",
                    preview: "James is direct: some prayers go unanswered not because God is absent, but because the motive behind them is wrong.",
                    content: "James 4:3: 'You ask, and don't receive, because you ask with wrong motives, so that you may spend it for your pleasures.' You can sincerely want something that is entirely self-serving.\n\nThe solution is not to stop praying until your motives are perfect. No one's motives are ever fully pure. The solution is to bring your motives into the prayer itself: 'Lord, I'm not sure my heart is right in this. Show me what I'm missing. Align my wants with yours.'",
                    keyVerse: "James 4:3 — 'You ask, and don't receive, because you ask with wrong motives.'",
                    reflectivePrompt: "Think of a prayer you've been praying persistently. What is the motive beneath it?",
                    keyTakeaway: "Wrong motives are explicitly identified in Scripture as a reason prayers go unanswered. Honest examination of motive is part of prayer itself."),
                BibleStudyLesson(title: "When Sin Creates Distance",
                    preview: "Scripture is direct: unconfessed, cherished sin creates separation between you and God.",
                    content: "Psalm 66:18: 'If I cherished sin in my heart, the Lord wouldn't have listened.' The key word is 'cherished' — not just 'committed.' Everyone sins. The problem is sin that is held onto, protected, and rationalized rather than confessed.\n\nThe practical discipline here is keeping 'short accounts' with God — not letting sin accumulate and create distance, but addressing it honestly and quickly when it appears. 1 John 1:9: 'If we confess our sins, he is faithful and righteous to forgive us.'",
                    keyVerse: "Psalm 66:18 — 'If I cherished sin in my heart, the Lord wouldn't have listened.'",
                    reflectivePrompt: "Is there anything in your life right now that you know is wrong, but you have been protecting rather than confessing?",
                    keyTakeaway: "Cherished, unconfessed sin creates spiritual distance that affects prayer. Confess, turn, and restore the relationship through the forgiveness Jesus already made available."),
                BibleStudyLesson(title: "How We Are Not Supposed to Pray",
                    preview: "Jesus was specific about the wrong ways to pray — and His warnings reveal a great deal about what prayer is actually for.",
                    content: "Jesus addresses prayer in the Sermon on the Mount by correcting wrong postures: prayer as performance designed to impress others (Matthew 6:5), vain repetition ('don't use vain repetitions as the Gentiles do,' Matthew 6:7), the posture of doubt (James 1:6–7), and refusing to forgive others while expecting God to hear your prayers (Mark 11:25).\n\nEach wrong posture points toward the same problem: prayer that is fundamentally about self rather than honest communion with God.",
                    keyVerse: "Matthew 6:5 — 'When you pray, you shall not be as the hypocrites, for they love to stand and pray... that they may be seen by men.'",
                    reflectivePrompt: "Of the four wrong postures — performing, using empty words, doubting, refusing to forgive — which one do you find yourself most tempted toward?",
                    keyTakeaway: "Jesus identified four wrong approaches to prayer: performance, empty repetition, unbelief, and unforgiveness. Each keeps self at the center rather than God."),
                BibleStudyLesson(title: "What True Prayer Looks Like — and Learning to Wait",
                    preview: "After examining what blocks prayer, this lesson turns to what prayer looks like when it is aligned.",
                    content: "James 5:16: 'The prayer of a righteous person is powerful and effective.' Not eloquent. Not lengthy. Righteous. The condition for effective prayer is not technique — it is character and alignment.\n\nWhen you have examined your motives, confessed your sin, checked your posture — and prayer still feels like silence — you wait. Psalm 27:14: 'Wait for Yahweh. Be strong, and let your heart take courage. Yes, wait for Yahweh.' The deepest truth: silence is not absence. Waiting is not rejection.",
                    keyVerse: "James 5:16 — 'The prayer of a righteous person is powerful and effective.'",
                    reflectivePrompt: "Is there a prayer you have been waiting on for a long time? What would it look like to continue bringing it to God honestly while genuinely surrendering the outcome?",
                    keyTakeaway: "True prayer is righteous and honest, not performative. When God is silent, the biblical response is active waiting — trusting that His silence or delay is never without purpose."),
            ]),
        BibleStudySeries(id: 12, level: "intermediate", title: "Spiritual Warfare — The Invisible Battle", subtitle: "What the Bible Says About the Enemy, Temptation, and Standing Firm",
            description: "Scripture does not teach that the Christian life is a peaceful walk with no opposition. It teaches that there is an active enemy and a real battle — and that God has fully equipped you for it.",
            tag: "Spiritual Life",
            lessons: [
                BibleStudyLesson(title: "Is There Really a Devil?",
                    preview: "Modern culture dismisses the idea of a personal devil. But Jesus treated him as a real, active opponent.",
                    content: "Jesus spoke directly to Satan in the wilderness temptation (Matthew 4). Paul warned that 'our wrestling is not against flesh and blood, but against the principalities, against the powers, against the world's rulers of the darkness of this age' (Ephesians 6:12).\n\nHowever, Scripture is equally clear about his limits. He is not omnipresent, not omniscient, and not omnipotent. He is a created being who has already been decisively defeated at the cross. Colossians 2:15: Jesus 'stripped the rulers and authorities of their power, and put them on public display, triumphing over them.'",
                    keyVerse: "1 Peter 5:8–9 — 'Your adversary, the devil, walks around like a roaring lion, seeking whom he may devour. Withstand him steadfast in your faith.'",
                    reflectivePrompt: "Have you ever considered that temptation, accusation, and discouragement might have a spiritual source as well as a human one?",
                    keyTakeaway: "The devil is real, active, and has real influence — but he is a defeated enemy. The battle is real, but the outcome is not in doubt."),
            ]),
        BibleStudySeries(id: 13, level: "advanced", title: "The Doctrine of Scripture", subtitle: "What the Bible Claims About Itself",
            description: "Is the Bible really the Word of God? This advanced study examines the doctrine of Scripture — inspiration, inerrancy, canonization, and transmission — with rigor and honesty.",
            tag: "Scripture",
            lessons: []),
        BibleStudySeries(id: 14, level: "advanced", title: "The Trinity", subtitle: "One God in Three Persons",
            description: "The Trinity is the most important and the most misunderstood doctrine in Christianity. This study examines what Scripture actually says, where the doctrine came from, and why it matters.",
            tag: "Doctrine",
            lessons: []),
        BibleStudySeries(id: 15, level: "advanced", title: "The Problem of Evil", subtitle: "Theodicy and the Christian Answer",
            description: "If God is all-powerful and all-good, why does evil exist? This is the hardest philosophical challenge to Christian faith. This study engages it seriously.",
            tag: "Apologetics",
            lessons: []),
    ]
}

// ============================================================
// MARK: - Network Service
// ============================================================

class NetworkService: ObservableObject {
    static let shared = NetworkService()

    func fetchVerses(book: String, chapter: Int) async -> [BibleVerse] {
        guard let url = URL(string: Config.fetchVersesEndpoint) else { return [] }
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.setValue("Bearer \(Config.supabaseAnonKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = try? JSONSerialization.data(withJSONObject: ["book": book, "chapter": chapter])

        do {
            let (data, _) = try await URLSession.shared.data(for: request)
            if let json = try JSONSerialization.jsonObject(with: data) as? [String: Any],
               let versesArray = json["verses"] as? [[String: Any]] {
                return versesArray.compactMap { dict in
                    guard let verse = dict["verse"] as? Int,
                          let text = dict["text"] as? String else { return nil }
                    return BibleVerse(verse: verse, text: text)
                }
            }
        } catch {}
        return []
    }

    func fetchMusicTracks() async -> [MusicTrack] {
        guard let url = URL(string: "\(Config.supabaseURL)/rest/v1/music_tracks?order=uploaded_at.desc") else { return [] }
        var request = URLRequest(url: url)
        request.setValue("Bearer \(Config.supabaseAnonKey)", forHTTPHeaderField: "Authorization")
        request.setValue(Config.supabaseAnonKey, forHTTPHeaderField: "apikey")
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")

        do {
            let (data, _) = try await URLSession.shared.data(for: request)
            return (try? JSONDecoder().decode([MusicTrack].self, from: data)) ?? []
        } catch {
            return []
        }
    }
}

// ============================================================
// MARK: - Audio Player
// ============================================================

class AudioPlayerManager: NSObject, ObservableObject {
    static let shared = AudioPlayerManager()

    @Published var currentTrack: MusicTrack?
    @Published var isPlaying = false
    @Published var position: Double = 0
    @Published var duration: Double = 0
    @Published var volume: Float = 1.0

    private var player: AVPlayer?
    private var timeObserver: Any?
    private var playlist: [MusicTrack] = []
    private var currentIndex: Int = 0

    override init() {
        super.init()
        configureAudioSession()
    }

    private func configureAudioSession() {
        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default)
            try AVAudioSession.sharedInstance().setActive(true)
        } catch {}
    }

    func play(track: MusicTrack, in list: [MusicTrack]) {
        playlist = list
        currentIndex = list.firstIndex(where: { $0.id == track.id }) ?? 0
        loadAndPlay(track: track)
    }

    private func loadAndPlay(track: MusicTrack) {
        guard let urlString = track.fileUrl, let url = URL(string: urlString) else { return }
        player?.pause()
        timeObserver.map { player?.removeTimeObserver($0) }

        currentTrack = track
        player = AVPlayer(url: url)
        player?.volume = volume
        player?.play()
        isPlaying = true

        timeObserver = player?.addPeriodicTimeObserver(forInterval: CMTime(seconds: 0.5, preferredTimescale: 600), queue: .main) { [weak self] time in
            self?.position = time.seconds
            self?.duration = self?.player?.currentItem?.duration.seconds ?? 0
        }
    }

    func togglePlay() {
        if isPlaying { player?.pause() } else { player?.play() }
        isPlaying.toggle()
    }

    func seek(to seconds: Double) {
        player?.seek(to: CMTime(seconds: seconds, preferredTimescale: 600))
    }

    func skipNext() {
        guard !playlist.isEmpty else { return }
        currentIndex = (currentIndex + 1) % playlist.count
        loadAndPlay(track: playlist[currentIndex])
    }

    func skipPrev() {
        guard !playlist.isEmpty else { return }
        currentIndex = currentIndex > 0 ? currentIndex - 1 : playlist.count - 1
        loadAndPlay(track: playlist[currentIndex])
    }

    func setVolume(_ vol: Float) {
        volume = vol
        player?.volume = vol
    }
}

// ============================================================
// MARK: - App Root View
// ============================================================

struct AppRootView: View {
    @StateObject private var audio = AudioPlayerManager.shared
    @AppStorage("onboardingCompleted") private var onboardingCompleted = false
    @AppStorage("darkMode") private var darkMode = false

    var body: some View {
        Group {
            if !onboardingCompleted {
                OnboardingView(onComplete: { onboardingCompleted = true })
            } else {
                MainTabView()
                    .environmentObject(audio)
            }
        }
        .preferredColorScheme(darkMode ? .dark : .light)
    }
}

// ============================================================
// MARK: - Onboarding
// ============================================================

struct OnboardingView: View {
    let onComplete: () -> Void
    @State private var step = 0
    @State private var answers = [Int: Int]()

    let questions: [(String, [String])] = [
        ("Are you new to Christianity or the Bible?", [
            "New to it", "Know a little", "Fairly familiar", "I'm a believer"
        ]),
        ("What brings you here today?", [
            "Learning the Bible", "Exploring faith", "Deepening my walk", "Music & culture"
        ]),
        ("Which describes you?", [
            "No church background", "Grew up in church", "Actively attending", "Looking for a church"
        ])
    ]

    var body: some View {
        ZStack {
            LinearGradient(colors: [Color(red: 0.06, green: 0.09, blue: 0.18), Color(red: 0.08, green: 0.14, blue: 0.28)],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
                .ignoresSafeArea()

            VStack(spacing: 0) {
                Spacer()

                VStack(spacing: 24) {
                    Text("✝")
                        .font(.system(size: 52))
                        .foregroundColor(.white.opacity(0.9))

                    Text("The Disciple Co.")
                        .font(.system(size: 28, weight: .bold))
                        .foregroundColor(.white)

                    Text("Not religion for the sake of religion.\nJust a path toward truth.")
                        .font(.system(size: 15))
                        .foregroundColor(.white.opacity(0.7))
                        .multilineTextAlignment(.center)
                }

                Spacer()

                if step < questions.count {
                    VStack(spacing: 20) {
                        Text(questions[step].0)
                            .font(.system(size: 20, weight: .semibold))
                            .foregroundColor(.white)
                            .multilineTextAlignment(.center)
                            .padding(.horizontal)

                        VStack(spacing: 12) {
                            ForEach(Array(questions[step].1.enumerated()), id: \.offset) { index, option in
                                Button {
                                    answers[step] = index
                                    withAnimation { step += 1 }
                                } label: {
                                    Text(option)
                                        .font(.system(size: 16, weight: .medium))
                                        .foregroundColor(.white)
                                        .frame(maxWidth: .infinity)
                                        .padding(.vertical, 14)
                                        .background(Color.white.opacity(0.15))
                                        .cornerRadius(12)
                                }
                            }
                        }
                        .padding(.horizontal)
                    }
                    .transition(.asymmetric(insertion: .move(edge: .trailing), removal: .move(edge: .leading)))
                } else {
                    VStack(spacing: 16) {
                        Text("You're all set.")
                            .font(.system(size: 22, weight: .bold))
                            .foregroundColor(.white)

                        Text("Start exploring at your own pace.")
                            .font(.system(size: 15))
                            .foregroundColor(.white.opacity(0.7))

                        Button("Enter the App") {
                            onComplete()
                        }
                        .font(.system(size: 17, weight: .semibold))
                        .foregroundColor(Color(red: 0.1, green: 0.2, blue: 0.5))
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 16)
                        .background(Color.white)
                        .cornerRadius(14)
                        .padding(.horizontal)
                    }
                }

                HStack(spacing: 8) {
                    ForEach(0..<questions.count, id: \.self) { i in
                        Circle()
                            .fill(i <= step ? Color.white : Color.white.opacity(0.3))
                            .frame(width: 7, height: 7)
                    }
                }
                .padding(.top, 32)

                Spacer()
            }
        }
    }
}

// ============================================================
// MARK: - Main Tab View
// ============================================================

struct MainTabView: View {
    @EnvironmentObject var audio: AudioPlayerManager

    var body: some View {
        ZStack(alignment: .bottom) {
            TabView {
                HomeScreen()
                    .tabItem { Label("Home", systemImage: "house.fill") }

                BibleScreen()
                    .tabItem { Label("Bible", systemImage: "book.fill") }

                MusicScreen()
                    .tabItem { Label("Music", systemImage: "music.note") }

                MoreScreen()
                    .tabItem { Label("More", systemImage: "square.grid.2x2.fill") }
            }

            if audio.currentTrack != nil {
                MiniPlayerView()
                    .padding(.bottom, 49)
            }
        }
    }
}

// ============================================================
// MARK: - Home Screen
// ============================================================

struct HomeScreen: View {
    private let featuredItems: [(String, String, String, Color)] = [
        ("What is Religion", "The Great Schism & Reformation", "religions", Color(red: 0.83, green: 0.18, blue: 0.18)),
        ("Which Bible Version?", "Find the right translation for you", "bible-versions", Color(red: 0.85, green: 0.55, blue: 0.05)),
        ("Lookup Any Verse", "Search all 66 books by chapter", "bible-lookup", Color(red: 0.08, green: 0.60, blue: 0.55)),
        ("Everyday Topics", "Scripture on life's biggest questions", "topics", Color(red: 0.13, green: 0.55, blue: 0.13)),
        ("Popular Stories", "The Bible's greatest narratives", "stories", Color(red: 0.20, green: 0.40, blue: 0.85)),
        ("Historical Timeline", "From Creation to the modern church", "timeline", Color(red: 0.55, green: 0.25, blue: 0.80)),
    ]

    var body: some View {
        NavigationStack {
            ScrollView(showsIndicators: true) {
                VStack(spacing: 0) {
                    HeroSection()
                    FeaturedGrid(items: featuredItems)
                    CoreBeliefsSection()
                    TimelinePreviewSection()
                }
            }
            .navigationTitle("The Disciple Co.")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .principal) {
                    Text("✝ The Disciple Co.")
                        .font(.system(size: 17, weight: .bold))
                }
            }
        }
    }
}

struct HeroSection: View {
    var body: some View {
        ZStack {
            LinearGradient(colors: [Color(red: 0.06, green: 0.09, blue: 0.20), Color(red: 0.10, green: 0.18, blue: 0.35)],
                           startPoint: .topLeading, endPoint: .bottomTrailing)

            VStack(spacing: 16) {
                Text("✝")
                    .font(.system(size: 56))
                    .foregroundColor(.white.opacity(0.9))

                Text("The Disciple Co.")
                    .font(.system(size: 30, weight: .bold))
                    .foregroundColor(.white)

                Text("Not religion for the sake of religion.\nNot arguments for the sake of winning.\nJust a path toward truth.")
                    .font(.system(size: 15))
                    .foregroundColor(.white.opacity(0.75))
                    .multilineTextAlignment(.center)
                    .padding(.horizontal, 32)
            }
            .padding(.vertical, 56)
        }
    }
}

struct FeaturedGrid: View {
    let items: [(String, String, String, Color)]

    let columns = [GridItem(.flexible()), GridItem(.flexible())]

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Explore")
                .font(.system(size: 22, weight: .bold))
                .padding(.horizontal)
                .padding(.top, 24)

            LazyVGrid(columns: columns, spacing: 12) {
                ForEach(items, id: \.0) { item in
                    NavigationLink(destination: destinationView(for: item.2)) {
                        VStack(alignment: .leading, spacing: 6) {
                            Text(item.0)
                                .font(.system(size: 15, weight: .semibold))
                                .foregroundColor(.white)
                                .lineLimit(2)
                                .frame(maxWidth: .infinity, alignment: .leading)

                            Text(item.1)
                                .font(.system(size: 12))
                                .foregroundColor(.white.opacity(0.75))
                                .lineLimit(2)
                        }
                        .padding(14)
                        .frame(maxWidth: .infinity, minHeight: 90)
                        .background(item.3)
                        .cornerRadius(14)
                    }
                }
            }
            .padding(.horizontal)
        }
    }

    @ViewBuilder
    func destinationView(for route: String) -> some View {
        switch route {
        case "religions": ReligionsScreen()
        case "bible-versions": BibleVersionsScreen()
        case "bible-lookup": BibleLookupScreen()
        case "topics": TopicsScreen()
        case "stories": StoriesScreen()
        case "timeline": TimelineScreen()
        default: Text(route).navigationTitle(route)
        }
    }
}

struct CoreBeliefsSection: View {
    let beliefs: [(String, String)] = [
        ("Sola Scriptura", "Scripture alone is the supreme authority over tradition and church doctrine."),
        ("The Trinity", "God eternally exists as Father, Son, and Holy Spirit — three persons, one being."),
        ("Jesus is the Way", "Salvation is found in no one else. There is no other name given under heaven."),
        ("Revealed Truth", "God has spoken clearly through His Word. Truth is not relative — it is revealed."),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text("Core Beliefs")
                .font(.system(size: 22, weight: .bold))
                .padding(.horizontal)
                .padding(.top, 32)

            ForEach(beliefs, id: \.0) { belief in
                HStack(alignment: .top, spacing: 14) {
                    Circle()
                        .fill(Color.appPrimary)
                        .frame(width: 8, height: 8)
                        .padding(.top, 6)

                    VStack(alignment: .leading, spacing: 4) {
                        Text(belief.0)
                            .font(.system(size: 16, weight: .semibold))

                        Text(belief.1)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                }
                .padding(.horizontal)
            }
        }
        .padding(.bottom, 24)
    }
}

struct TimelinePreviewSection: View {
    let preview = AppData.shared.timelineEvents.suffix(3)

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Recent History")
                    .font(.system(size: 22, weight: .bold))
                Spacer()
                NavigationLink("See All") {
                    TimelineScreen()
                }
                .font(.system(size: 14))
            }
            .padding(.horizontal)
            .padding(.top, 16)

            ForEach(Array(preview)) { event in
                HStack(alignment: .top, spacing: 12) {
                    Text(event.year)
                        .font(.system(size: 11, weight: .semibold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 4)
                        .background(event.category.color)
                        .cornerRadius(6)
                        .frame(minWidth: 70)

                    VStack(alignment: .leading, spacing: 2) {
                        Text(event.title)
                            .font(.system(size: 14, weight: .semibold))
                            .lineLimit(1)

                        Text(event.description)
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                            .lineLimit(2)
                    }
                }
                .padding(.horizontal)
            }
        }
        .padding(.bottom, 32)
    }
}

// ============================================================
// MARK: - Bible Screen
// ============================================================

struct BibleScreen: View {
    @State private var filter = "All"
    let filters = ["All", "Old Testament", "New Testament", "Law", "Poetry", "Gospels", "Letters"]

    var filtered: [BibleBook] {
        let all = AppData.shared.bibleBooks
        if filter == "All" { return all }
        if filter == "Old Testament" { return all.filter { $0.testament == "Old Testament" } }
        if filter == "New Testament" { return all.filter { $0.testament == "New Testament" } }
        return all.filter { $0.type.lowercased().contains(filter.lowercased()) }
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                ScrollView(.horizontal, showsIndicators: true) {
                    HStack(spacing: 8) {
                        ForEach(filters, id: \.self) { f in
                            Button(f) { filter = f }
                                .font(.system(size: 13, weight: .medium))
                                .padding(.horizontal, 14)
                                .padding(.vertical, 7)
                                .background(filter == f ? Color.appPrimary : Color(UIColor.secondarySystemBackground))
                                .foregroundColor(filter == f ? .white : .primary)
                                .cornerRadius(20)
                        }
                    }
                    .padding(.horizontal)
                    .padding(.vertical, 10)
                }

                List(filtered) { book in
                    NavigationLink(destination: BookDetailScreen(book: book)) {
                        BookRow(book: book)
                    }
                    .listRowInsets(EdgeInsets(top: 6, leading: 16, bottom: 6, trailing: 16))
                }
                .listStyle(.plain)
            }
            .navigationTitle("Tour the Bible")
        }
    }
}

struct BookRow: View {
    let book: BibleBook

    var body: some View {
        HStack(spacing: 12) {
            AsyncImage(url: URL(string: book.imageUrl)) { image in
                image.resizable().scaledToFill()
            } placeholder: {
                Color(UIColor.systemGray5)
            }
            .frame(width: 52, height: 52)
            .cornerRadius(8)

            VStack(alignment: .leading, spacing: 3) {
                HStack {
                    Text(book.name)
                        .font(.system(size: 16, weight: .semibold))
                    Spacer()
                    Text(book.testament == "Old Testament" ? "OT" : "NT")
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 6)
                        .padding(.vertical, 2)
                        .background(book.testament == "Old Testament" ? Color.amber : Color.appPrimary)
                        .cornerRadius(4)
                }

                Text(book.type)
                    .font(.system(size: 12))
                    .foregroundColor(.secondary)

                Text("\(book.chapters) chapters • \(book.author)")
                    .font(.system(size: 12))
                    .foregroundColor(.secondary)
            }
        }
    }
}

struct BookDetailScreen: View {
    let book: BibleBook
    @State private var expandedSection: Int? = nil

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 0) {
                AsyncImage(url: URL(string: book.imageUrl)) { image in
                    image.resizable().scaledToFill()
                } placeholder: {
                    LinearGradient(colors: [Color(red: 0.1, green: 0.2, blue: 0.4), Color(red: 0.15, green: 0.3, blue: 0.55)],
                                   startPoint: .topLeading, endPoint: .bottomTrailing)
                }
                .frame(height: 220)
                .clipped()

                VStack(alignment: .leading, spacing: 20) {
                    HStack {
                        VStack(alignment: .leading, spacing: 4) {
                            Text(book.name)
                                .font(.system(size: 28, weight: .bold))
                            Text(book.type)
                                .font(.system(size: 14))
                                .foregroundColor(.secondary)
                        }
                        Spacer()
                        Text(book.testament == "Old Testament" ? "OT" : "NT")
                            .font(.system(size: 13, weight: .bold))
                            .foregroundColor(.white)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 5)
                            .background(book.testament == "Old Testament" ? Color.amber : Color.appPrimary)
                            .cornerRadius(8)
                    }

                    HStack(spacing: 20) {
                        InfoChip(label: "Author", value: book.author)
                        InfoChip(label: "Written", value: book.written)
                        InfoChip(label: "Chapters", value: "\(book.chapters)")
                    }

                    Divider()

                    VStack(alignment: .leading, spacing: 12) {
                        Text("Overview")
                            .font(.system(size: 18, weight: .semibold))

                        ForEach(book.overview, id: \.self) { paragraph in
                            Text(paragraph)
                                .font(.system(size: 15))
                                .foregroundColor(.secondary)
                                .lineSpacing(4)
                        }
                    }

                    Divider()

                    VStack(alignment: .leading, spacing: 0) {
                        Text("Book Structure")
                            .font(.system(size: 18, weight: .semibold))
                            .padding(.bottom, 12)

                        ForEach(book.structure) { section in
                            BookSectionRow(section: section,
                                           isExpanded: expandedSection == section.number,
                                           onTap: {
                                withAnimation {
                                    expandedSection = expandedSection == section.number ? nil : section.number
                                }
                            })
                        }
                    }

                    Divider()

                    VStack(alignment: .leading, spacing: 8) {
                        Text("Author")
                            .font(.system(size: 18, weight: .semibold))

                        Text(book.authorDescription)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                    }
                }
                .padding(20)
            }
        }
        .navigationTitle(book.name)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct InfoChip: View {
    let label: String
    let value: String

    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(label)
                .font(.system(size: 10, weight: .medium))
                .foregroundColor(.secondary)
                .textCase(.uppercase)
            Text(value)
                .font(.system(size: 13, weight: .semibold))
        }
    }
}

struct BookSectionRow: View {
    let section: BookSection
    let isExpanded: Bool
    let onTap: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Button(action: onTap) {
                HStack {
                    Text(section.title)
                        .font(.system(size: 15, weight: .medium))
                    Spacer()
                    Text("Ch \(section.chapterRange)")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
                .padding(.vertical, 14)
            }
            .foregroundColor(.primary)

            if isExpanded {
                VStack(alignment: .leading, spacing: 10) {
                    Text(section.summary)
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Key Verse")
                            .font(.system(size: 11, weight: .semibold))
                            .textCase(.uppercase)
                            .foregroundColor(.secondary)

                        Text("\"\(section.keyVerse)\"")
                            .font(.system(size: 14, weight: .medium))
                            .italic()
                            .padding(12)
                            .background(Color.appPrimary.opacity(0.08))
                            .cornerRadius(8)

                        Text("— \(section.verseReference)")
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                    }
                }
                .padding(.bottom, 14)
            }

            Divider()
        }
    }
}

// ============================================================
// MARK: - Music Screen
// ============================================================

struct MusicScreen: View {
    @EnvironmentObject var audio: AudioPlayerManager
    @StateObject private var vm = MusicViewModel()
    @State private var selectedCategory = "All"
    @State private var showPlayer = false

    let categories = ["All", "Heavy Metal", "House", "Calm", "Worship"]

    var filtered: [MusicTrack] {
        selectedCategory == "All" ? vm.tracks : vm.tracks.filter { $0.category == selectedCategory }
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                ScrollView(.horizontal, showsIndicators: true) {
                    HStack(spacing: 8) {
                        ForEach(categories, id: \.self) { cat in
                            Button(cat) { selectedCategory = cat }
                                .font(.system(size: 13, weight: .medium))
                                .padding(.horizontal, 14)
                                .padding(.vertical, 7)
                                .background(selectedCategory == cat ? Color.appPrimary : Color(UIColor.secondarySystemBackground))
                                .foregroundColor(selectedCategory == cat ? .white : .primary)
                                .cornerRadius(20)
                        }
                    }
                    .padding(.horizontal)
                    .padding(.vertical, 10)
                }

                if vm.isLoading {
                    Spacer()
                    ProgressView()
                    Spacer()
                } else if filtered.isEmpty {
                    Spacer()
                    VStack(spacing: 8) {
                        Image(systemName: "music.note.list")
                            .font(.system(size: 40))
                            .foregroundColor(.secondary)
                        Text("No tracks yet")
                            .foregroundColor(.secondary)
                    }
                    Spacer()
                } else {
                    List(filtered) { track in
                        Button {
                            audio.play(track: track, in: filtered)
                            showPlayer = true
                        } label: {
                            TrackRow(track: track, isActive: audio.currentTrack?.id == track.id, isPlaying: audio.isPlaying)
                        }
                        .foregroundColor(.primary)
                    }
                    .listStyle(.plain)
                }
            }
            .navigationTitle("Music Jukebox")
            .sheet(isPresented: $showPlayer) {
                FullPlayerView()
                    .environmentObject(audio)
            }
            .task { await vm.loadTracks() }
        }
    }
}

class MusicViewModel: ObservableObject {
    @Published var tracks: [MusicTrack] = []
    @Published var isLoading = false

    func loadTracks() async {
        await MainActor.run { isLoading = true }
        let result = await NetworkService.shared.fetchMusicTracks()
        await MainActor.run {
            tracks = result
            isLoading = false
        }
    }
}

struct TrackRow: View {
    let track: MusicTrack
    let isActive: Bool
    let isPlaying: Bool

    var body: some View {
        HStack(spacing: 14) {
            ZStack {
                RoundedRectangle(cornerRadius: 8)
                    .fill(isActive ? Color.appPrimary : Color(UIColor.systemGray5))
                    .frame(width: 44, height: 44)
                Image(systemName: isActive && isPlaying ? "pause.fill" : "play.fill")
                    .font(.system(size: 14))
                    .foregroundColor(isActive ? .white : .secondary)
            }

            VStack(alignment: .leading, spacing: 3) {
                Text(track.title)
                    .font(.system(size: 15, weight: isActive ? .semibold : .regular))
                    .foregroundColor(isActive ? .appPrimary : .primary)
                    .lineLimit(1)

                if let artist = track.artist {
                    Text(artist)
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
            }

            Spacer()

            if let cat = track.category {
                Text(cat)
                    .font(.system(size: 10, weight: .medium))
                    .foregroundColor(.secondary)
                    .padding(.horizontal, 6)
                    .padding(.vertical, 3)
                    .background(Color(UIColor.systemGray6))
                    .cornerRadius(4)
            }
        }
        .padding(.vertical, 2)
    }
}

struct FullPlayerView: View {
    @EnvironmentObject var audio: AudioPlayerManager
    @Environment(\.dismiss) var dismiss

    var body: some View {
        VStack(spacing: 32) {
            HStack {
                Spacer()
                Button { dismiss() } label: {
                    Image(systemName: "chevron.down")
                        .font(.system(size: 18, weight: .semibold))
                        .foregroundColor(.secondary)
                }
            }
            .padding(.horizontal)
            .padding(.top, 8)

            ZStack {
                RoundedRectangle(cornerRadius: 24)
                    .fill(LinearGradient(colors: [Color.appPrimary, Color(red: 0.05, green: 0.15, blue: 0.45)],
                                         startPoint: .topLeading, endPoint: .bottomTrailing))
                    .frame(width: 240, height: 240)
                Image(systemName: "music.note")
                    .font(.system(size: 80))
                    .foregroundColor(.white.opacity(0.4))
            }

            VStack(spacing: 6) {
                Text(audio.currentTrack?.title ?? "No Track")
                    .font(.system(size: 22, weight: .bold))

                Text(audio.currentTrack?.artist ?? "")
                    .font(.system(size: 15))
                    .foregroundColor(.secondary)
            }

            VStack(spacing: 8) {
                Slider(value: Binding(
                    get: { audio.duration > 0 ? audio.position / audio.duration : 0 },
                    set: { audio.seek(to: $0 * audio.duration) }
                ))
                .accentColor(.appPrimary)
                .padding(.horizontal)

                HStack {
                    Text(formatTime(audio.position))
                    Spacer()
                    Text(formatTime(audio.duration))
                }
                .font(.system(size: 12))
                .foregroundColor(.secondary)
                .padding(.horizontal)
            }

            HStack(spacing: 48) {
                Button { audio.skipPrev() } label: {
                    Image(systemName: "backward.fill")
                        .font(.system(size: 26))
                        .foregroundColor(.primary)
                }

                Button { audio.togglePlay() } label: {
                    ZStack {
                        Circle()
                            .fill(Color.appPrimary)
                            .frame(width: 64, height: 64)
                        Image(systemName: audio.isPlaying ? "pause.fill" : "play.fill")
                            .font(.system(size: 26))
                            .foregroundColor(.white)
                    }
                }

                Button { audio.skipNext() } label: {
                    Image(systemName: "forward.fill")
                        .font(.system(size: 26))
                        .foregroundColor(.primary)
                }
            }

            HStack(spacing: 10) {
                Image(systemName: "speaker.fill")
                    .font(.system(size: 14))
                    .foregroundColor(.secondary)
                Slider(value: Binding(
                    get: { Double(audio.volume) },
                    set: { audio.setVolume(Float($0)) }
                ), in: 0...1)
                .accentColor(.appPrimary)
                Image(systemName: "speaker.wave.3.fill")
                    .font(.system(size: 14))
                    .foregroundColor(.secondary)
            }
            .padding(.horizontal, 32)

            Spacer()
        }
    }

    func formatTime(_ seconds: Double) -> String {
        guard seconds.isFinite && !seconds.isNaN else { return "0:00" }
        let s = Int(seconds)
        return "\(s / 60):\(String(format: "%02d", s % 60))"
    }
}

struct MiniPlayerView: View {
    @EnvironmentObject var audio: AudioPlayerManager
    @State private var showFull = false

    var body: some View {
        Button { showFull = true } label: {
            HStack(spacing: 12) {
                ZStack {
                    RoundedRectangle(cornerRadius: 6)
                        .fill(Color.appPrimary)
                        .frame(width: 36, height: 36)
                    Image(systemName: "music.note")
                        .font(.system(size: 14))
                        .foregroundColor(.white)
                }

                VStack(alignment: .leading, spacing: 1) {
                    Text(audio.currentTrack?.title ?? "")
                        .font(.system(size: 13, weight: .semibold))
                        .lineLimit(1)
                    Text(audio.currentTrack?.artist ?? "Now Playing")
                        .font(.system(size: 11))
                        .foregroundColor(.secondary)
                        .lineLimit(1)
                }

                Spacer()

                Button { audio.togglePlay() } label: {
                    Image(systemName: audio.isPlaying ? "pause.fill" : "play.fill")
                        .font(.system(size: 20))
                        .foregroundColor(.appPrimary)
                }

                Button { audio.skipNext() } label: {
                    Image(systemName: "forward.fill")
                        .font(.system(size: 18))
                        .foregroundColor(.secondary)
                }
            }
            .padding(.horizontal, 16)
            .padding(.vertical, 10)
            .background(.regularMaterial)
            .cornerRadius(14)
            .padding(.horizontal, 12)
            .shadow(color: .black.opacity(0.1), radius: 8, y: 4)
        }
        .buttonStyle(.plain)
        .sheet(isPresented: $showFull) {
            FullPlayerView().environmentObject(audio)
        }
    }
}

// ============================================================
// MARK: - More Screen
// ============================================================

struct MoreScreen: View {
    struct MoreItem: Identifiable {
        let id = UUID()
        let title: String
        let subtitle: String
        let icon: String
        let color: Color
        let destination: AnyView
    }

    @ViewBuilder
    var sections: some View {
        Group {
            sectionHeader("BIBLE")
            moreRow("Foundation Course", subtitle: "8 modules from basics to doctrine", icon: "graduationcap.fill", color: .appPrimary) { CoursesScreen() }
            moreRow("Bible Studies", subtitle: "In-depth studies by experience level", icon: "book.fill", color: Color(red: 0.70, green: 0.45, blue: 0.10)) { BibleStudiesScreen() }
            moreRow("Lookup Any Verse", subtitle: "Search by book and chapter", icon: "magnifyingglass", color: Color(red: 0.08, green: 0.6, blue: 0.55)) { BibleLookupScreen() }
            moreRow("Bible Versions", subtitle: "Which translation is right for you", icon: "books.vertical.fill", color: Color(red: 0.85, green: 0.55, blue: 0.05)) { BibleVersionsScreen() }
            moreRow("Bible Authors", subtitle: "Evidence and authorship", icon: "person.text.rectangle.fill", color: Color(red: 0.4, green: 0.6, blue: 0.3)) { BibleAuthorsScreen() }
            moreRow("Guidance", subtitle: "Search scripture for spiritual guidance", icon: "heart.text.square.fill", color: Color(red: 0.20, green: 0.55, blue: 0.90)) { GuidanceScreen() }

            sectionHeader("RELIGION & COMMUNITY")
            moreRow("What is Religion", subtitle: "Schism, Reformation, denominations", icon: "building.columns.fill", color: Color(red: 0.83, green: 0.18, blue: 0.18)) { ReligionsScreen() }
            moreRow("Everyday Topics", subtitle: "Scripture on life's questions", icon: "list.bullet.rectangle.fill", color: Color(red: 0.13, green: 0.55, blue: 0.13)) { TopicsScreen() }
            moreRow("Popular Stories", subtitle: "The Bible's greatest narratives", icon: "text.book.closed.fill", color: Color(red: 0.20, green: 0.40, blue: 0.85)) { StoriesScreen() }
            moreRow("Church Mentors", subtitle: "Connect with experienced believers", icon: "person.2.fill", color: Color(red: 0.35, green: 0.55, blue: 0.80)) { ChurchMentorsScreen() }

            sectionHeader("MEDIA")
            moreRow("Wisdom", subtitle: "Sermons from trusted preachers", icon: "mic.fill", color: Color(red: 0.50, green: 0.25, blue: 0.10)) { PreachingScreen() }
            moreRow("Podcasts", subtitle: "Top Christian podcasts and more", icon: "radio.fill", color: Color(red: 0.20, green: 0.60, blue: 0.50)) { PodcastsScreen() }
            moreRow("Hallowed", subtitle: "Sacred sound — the band", icon: "waveform", color: Color(red: 0.10, green: 0.10, blue: 0.15)) { HallowedScreen() }

            sectionHeader("INFORMATION")
            moreRow("Historical Timeline", subtitle: "From Creation to the modern church", icon: "clock.fill", color: Color(red: 0.08, green: 0.60, blue: 0.55)) { TimelineScreen() }
            moreRow("Easter", subtitle: "Lent, Holy Week, and the Resurrection", icon: "cross.fill", color: Color(red: 0.83, green: 0.18, blue: 0.18)) { EasterScreen() }
            moreRow("The Resurrection", subtitle: "Evidence and manuscript proof", icon: "doc.text.fill", color: Color(red: 0.20, green: 0.20, blue: 0.55)) { ResurrectionScreen() }
            moreRow("Holiday Origins", subtitle: "Meaning behind Christian holidays", icon: "calendar", color: Color.amber) { HolidaysScreen() }
            moreRow("FAQs", subtitle: "Common questions about faith", icon: "questionmark.circle.fill", color: Color(red: 0.30, green: 0.55, blue: 0.80)) { FAQsScreen() }
        }
    }

    var body: some View {
        NavigationStack {
            List {
                sections
            }
            .listStyle(.insetGrouped)
            .navigationTitle("More")
        }
    }

    @ViewBuilder
    func sectionHeader(_ title: String) -> some View {
        Section(header: Text(title).font(.system(size: 12, weight: .semibold))) {
            EmptyView()
        }
    }

    @ViewBuilder
    func moreRow<Dest: View>(_ title: String, subtitle: String, icon: String, color: Color, @ViewBuilder dest: () -> Dest) -> some View {
        NavigationLink(destination: dest()) {
            HStack(spacing: 14) {
                ZStack {
                    RoundedRectangle(cornerRadius: 8)
                        .fill(color)
                        .frame(width: 34, height: 34)
                    Image(systemName: icon)
                        .font(.system(size: 15))
                        .foregroundColor(.white)
                }

                VStack(alignment: .leading, spacing: 2) {
                    Text(title)
                        .font(.system(size: 15, weight: .medium))
                    Text(subtitle)
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
            }
            .padding(.vertical, 2)
        }
    }
}

// ============================================================
// MARK: - Topics Screen
// ============================================================

struct TopicsScreen: View {
    let data = AppData.shared.topics.sorted { $0.order < $1.order }

    var body: some View {
        List(data) { topic in
            NavigationLink(destination: TopicDetailScreen(topic: topic)) {
                HStack(spacing: 14) {
                    Text(topic.icon)
                        .font(.system(size: 28))
                        .frame(width: 44, height: 44)
                        .background(Color(UIColor.systemGray6))
                        .cornerRadius(10)

                    VStack(alignment: .leading, spacing: 3) {
                        Text(topic.title)
                            .font(.system(size: 15, weight: .semibold))
                        Text(topic.shortDescription)
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                            .lineLimit(2)
                    }
                }
                .padding(.vertical, 4)
            }
        }
        .listStyle(.plain)
        .navigationTitle("Everyday Topics")
    }
}

struct TopicDetailScreen: View {
    let topic: Topic

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 20) {
                HStack {
                    Text(topic.icon).font(.system(size: 44))
                    VStack(alignment: .leading, spacing: 4) {
                        Text(topic.title).font(.system(size: 24, weight: .bold))
                        Text(topic.shortDescription).font(.system(size: 14)).foregroundColor(.secondary)
                    }
                }

                Text(topic.description)
                    .font(.system(size: 15))
                    .lineSpacing(4)

                Divider()

                Text("Scripture References")
                    .font(.system(size: 18, weight: .semibold))

                ForEach(topic.references) { ref in
                    VStack(alignment: .leading, spacing: 8) {
                        Text("\(ref.book) \(ref.chapter):\(ref.verse)")
                            .font(.system(size: 12, weight: .semibold))
                            .textCase(.uppercase)
                            .foregroundColor(.appPrimary)

                        Text("\"\(ref.text)\"")
                            .font(.system(size: 14))
                            .italic()
                            .padding(12)
                            .background(Color.appPrimary.opacity(0.07))
                            .cornerRadius(8)

                        Text(ref.summary)
                            .font(.system(size: 13))
                            .foregroundColor(.secondary)
                    }
                    .padding(.bottom, 8)
                }
            }
            .padding(20)
        }
        .navigationTitle(topic.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}

// ============================================================
// MARK: - Stories Screen
// ============================================================

struct StoriesScreen: View {
    let data = AppData.shared.stories.sorted { $0.order < $1.order }

    var body: some View {
        List(data) { story in
            NavigationLink(destination: StoryDetailScreen(story: story)) {
                HStack(spacing: 14) {
                    Text(story.icon)
                        .font(.system(size: 28))
                        .frame(width: 44, height: 44)
                        .background(Color(UIColor.systemGray6))
                        .cornerRadius(10)

                    VStack(alignment: .leading, spacing: 3) {
                        Text(story.title).font(.system(size: 15, weight: .semibold))
                        Text(story.shortSummary).font(.system(size: 12)).foregroundColor(.secondary).lineLimit(2)
                    }
                }
                .padding(.vertical, 4)
            }
        }
        .listStyle(.plain)
        .navigationTitle("Popular Stories")
    }
}

struct StoryDetailScreen: View {
    let story: BibleStory

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 20) {
                HStack {
                    Text(story.icon).font(.system(size: 44))
                    Text(story.title).font(.system(size: 24, weight: .bold))
                }

                Text(story.summary)
                    .font(.system(size: 15))
                    .lineSpacing(5)

                Divider()

                Text("Scripture")
                    .font(.system(size: 18, weight: .semibold))

                ForEach(story.references) { ref in
                    VStack(alignment: .leading, spacing: 6) {
                        Text("\(ref.book) \(ref.chapter):\(ref.verse)")
                            .font(.system(size: 11, weight: .semibold))
                            .textCase(.uppercase)
                            .foregroundColor(.appPrimary)

                        Text("\"\(ref.text)\"")
                            .font(.system(size: 14))
                            .italic()
                            .padding(12)
                            .background(Color.appPrimary.opacity(0.07))
                            .cornerRadius(8)
                    }
                }
            }
            .padding(20)
        }
        .navigationTitle(story.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}

// ============================================================
// MARK: - Timeline Screen
// ============================================================

struct TimelineScreen: View {
    @State private var filter: TimelineCategory? = nil
    let events = AppData.shared.timelineEvents

    var filtered: [TimelineEvent] {
        guard let f = filter else { return events }
        return events.filter { $0.category == f }
    }

    var body: some View {
        NavigationStack {
            VStack(spacing: 0) {
                ScrollView(.horizontal, showsIndicators: true) {
                    HStack(spacing: 8) {
                        Button("All") { filter = nil }
                            .filterPill(active: filter == nil, color: .appPrimary)

                        ForEach(TimelineCategory.allCases, id: \.self) { cat in
                            Button(cat.label) { filter = cat }
                                .filterPill(active: filter == cat, color: cat.color)
                        }
                    }
                    .padding(.horizontal)
                    .padding(.vertical, 10)
                }

                List(filtered) { event in
                    TimelineRow(event: event)
                        .listRowInsets(EdgeInsets(top: 8, leading: 16, bottom: 8, trailing: 16))
                }
                .listStyle(.plain)
            }
            .navigationTitle("Historical Timeline")
        }
    }
}

struct TimelineRow: View {
    let event: TimelineEvent
    @State private var expanded = false

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Button {
                withAnimation { expanded.toggle() }
            } label: {
                HStack(alignment: .top, spacing: 12) {
                    Text(event.year)
                        .font(.system(size: 10, weight: .bold))
                        .foregroundColor(.white)
                        .padding(.horizontal, 8)
                        .padding(.vertical, 5)
                        .background(event.category.color)
                        .cornerRadius(6)
                        .frame(minWidth: 68)

                    VStack(alignment: .leading, spacing: 3) {
                        Text(event.title)
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(.primary)
                        Text(event.description)
                            .font(.system(size: 13))
                            .foregroundColor(.secondary)
                            .lineLimit(expanded ? nil : 2)
                    }

                    Spacer()
                    Image(systemName: expanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                }
            }

            if expanded {
                VStack(alignment: .leading, spacing: 6) {
                    ForEach(event.details, id: \.self) { detail in
                        HStack(alignment: .top, spacing: 8) {
                            Circle()
                                .fill(event.category.color)
                                .frame(width: 5, height: 5)
                                .padding(.top, 7)
                            Text(detail)
                                .font(.system(size: 13))
                                .foregroundColor(.secondary)
                        }
                    }

                    if !event.bibleRefs.isEmpty {
                        HStack(spacing: 6) {
                            ForEach(event.bibleRefs, id: \.self) { ref in
                                Text(ref)
                                    .font(.system(size: 11, weight: .medium))
                                    .foregroundColor(.appPrimary)
                                    .padding(.horizontal, 8)
                                    .padding(.vertical, 4)
                                    .background(Color.appPrimary.opacity(0.1))
                                    .cornerRadius(6)
                            }
                        }
                    }
                }
                .padding(.top, 10)
                .padding(.leading, 80)
            }
        }
    }
}

extension Button {
    func filterPill(active: Bool, color: Color) -> some View {
        self
            .font(.system(size: 12, weight: .medium))
            .padding(.horizontal, 12)
            .padding(.vertical, 6)
            .background(active ? color : Color(UIColor.secondarySystemBackground))
            .foregroundColor(active ? .white : .primary)
            .cornerRadius(16)
    }
}

// ============================================================
// MARK: - Courses Screen
// ============================================================

struct CoursesScreen: View {
    let modules = AppData.shared.courseModules

    var body: some View {
        List(modules) { module in
            NavigationLink(destination: CourseModuleScreen(module: module)) {
                HStack(spacing: 14) {
                    ZStack {
                        Circle()
                            .fill(Color.appPrimary)
                            .frame(width: 40, height: 40)
                        Text("\(module.number)")
                            .font(.system(size: 16, weight: .bold))
                            .foregroundColor(.white)
                    }

                    VStack(alignment: .leading, spacing: 3) {
                        Text(module.title).font(.system(size: 15, weight: .semibold))
                        Text(module.subtitle).font(.system(size: 12)).foregroundColor(.secondary)
                        Text("\(module.lessons.count) lessons").font(.system(size: 11)).foregroundColor(.secondary)
                    }
                }
                .padding(.vertical, 4)
            }
        }
        .listStyle(.plain)
        .navigationTitle("Foundation Course")
    }
}

struct CourseModuleScreen: View {
    let module: CourseModule
    @State private var expandedLesson: String? = nil

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 0) {
                VStack(alignment: .leading, spacing: 10) {
                    HStack {
                        Text("Module \(module.number)")
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(.appPrimary)
                        Spacer()
                        Text("\(module.lessons.count) lessons")
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                    }
                    Text(module.title).font(.system(size: 26, weight: .bold))
                    Text(module.subtitle).font(.system(size: 16)).foregroundColor(.secondary)
                    Text(module.description).font(.system(size: 14)).foregroundColor(.secondary).lineSpacing(3)
                }
                .padding(20)

                Divider()

                ForEach(module.lessons) { lesson in
                    LessonRow(lesson: lesson,
                               isExpanded: expandedLesson == lesson.id,
                               onTap: {
                        withAnimation { expandedLesson = expandedLesson == lesson.id ? nil : lesson.id }
                    })
                    Divider().padding(.leading, 20)
                }
            }
        }
        .navigationTitle(module.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct LessonRow: View {
    let lesson: Lesson
    let isExpanded: Bool
    let onTap: () -> Void

    var body: some View {
        Button(action: onTap) {
            VStack(alignment: .leading, spacing: 10) {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(lesson.title)
                            .font(.system(size: 16, weight: .semibold))
                            .foregroundColor(.primary)
                        if !isExpanded {
                            Text(lesson.preview)
                                .font(.system(size: 13))
                                .foregroundColor(.secondary)
                                .lineLimit(2)
                        }
                    }
                    Spacer()
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 13))
                        .foregroundColor(.secondary)
                }

                if isExpanded {
                    Text(lesson.expanded)
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                        .lineSpacing(4)

                    VStack(alignment: .leading, spacing: 6) {
                        Text("Reflect")
                            .font(.system(size: 11, weight: .bold))
                            .textCase(.uppercase)
                            .foregroundColor(.secondary)
                        Text(lesson.reflectivePrompt)
                            .font(.system(size: 13, weight: .medium))
                            .italic()
                            .foregroundColor(.primary)
                    }
                    .padding(12)
                    .background(Color.appPrimary.opacity(0.07))
                    .cornerRadius(8)

                    VStack(alignment: .leading, spacing: 4) {
                        Text("Key Takeaway")
                            .font(.system(size: 11, weight: .bold))
                            .textCase(.uppercase)
                            .foregroundColor(.secondary)
                        Text(lesson.keyTakeaway)
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(.primary)
                    }
                }
            }
            .padding(20)
        }
    }
}

// ============================================================
// MARK: - Bible Lookup Screen
// ============================================================

struct BibleLookupScreen: View {
    let bookNames = ["Genesis","Exodus","Leviticus","Numbers","Deuteronomy","Joshua","Judges","Ruth",
                     "1 Samuel","2 Samuel","1 Kings","2 Kings","1 Chronicles","2 Chronicles","Ezra",
                     "Nehemiah","Esther","Job","Psalms","Proverbs","Ecclesiastes","Song of Solomon",
                     "Isaiah","Jeremiah","Lamentations","Ezekiel","Daniel","Hosea","Joel","Amos",
                     "Obadiah","Jonah","Micah","Nahum","Habakkuk","Zephaniah","Haggai","Zechariah",
                     "Malachi","Matthew","Mark","Luke","John","Acts","Romans","1 Corinthians",
                     "2 Corinthians","Galatians","Ephesians","Philippians","Colossians","1 Thessalonians",
                     "2 Thessalonians","1 Timothy","2 Timothy","Titus","Philemon","Hebrews","James",
                     "1 Peter","2 Peter","1 John","2 John","3 John","Jude","Revelation"]

    @State private var selectedBook = "John"
    @State private var selectedChapter = 3
    @State private var verses: [BibleVerse] = []
    @State private var isLoading = false
    @State private var maxChapter = 21

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 20) {
                VStack(spacing: 12) {
                    HStack(spacing: 12) {
                        VStack(alignment: .leading) {
                            Text("Book").font(.system(size: 11, weight: .semibold)).foregroundColor(.secondary)
                            Picker("Book", selection: $selectedBook) {
                                ForEach(bookNames, id: \.self) { Text($0) }
                            }
                            .pickerStyle(.menu)
                            .frame(maxWidth: .infinity, alignment: .leading)
                            .padding(10)
                            .background(Color(UIColor.secondarySystemBackground))
                            .cornerRadius(10)
                        }

                        VStack(alignment: .leading) {
                            Text("Chapter").font(.system(size: 11, weight: .semibold)).foregroundColor(.secondary)
                            Picker("Chapter", selection: $selectedChapter) {
                                ForEach(1...max(1, maxChapter), id: \.self) { Text("\($0)") }
                            }
                            .pickerStyle(.menu)
                            .frame(width: 100)
                            .padding(10)
                            .background(Color(UIColor.secondarySystemBackground))
                            .cornerRadius(10)
                        }
                    }

                    Button {
                        Task { await fetchVerses() }
                    } label: {
                        HStack {
                            if isLoading { ProgressView().tint(.white) }
                            Text(isLoading ? "Loading..." : "Read Chapter")
                        }
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .padding(.vertical, 13)
                        .background(Color.appPrimary)
                        .cornerRadius(12)
                    }
                    .disabled(isLoading)
                }
                .padding()
                .background(Color(UIColor.secondarySystemBackground))
                .cornerRadius(16)
                .padding(.horizontal)

                if !verses.isEmpty {
                    VStack(alignment: .leading, spacing: 14) {
                        Text("\(selectedBook) \(selectedChapter)")
                            .font(.system(size: 20, weight: .bold))
                            .padding(.horizontal)

                        ForEach(verses) { verse in
                            HStack(alignment: .top, spacing: 10) {
                                Text("\(verse.verse)")
                                    .font(.system(size: 11, weight: .bold))
                                    .foregroundColor(.appPrimary)
                                    .frame(width: 22, alignment: .trailing)
                                    .padding(.top, 2)

                                Text(verse.text)
                                    .font(.system(size: 15))
                                    .lineSpacing(4)
                            }
                            .padding(.horizontal)
                        }
                    }
                    .padding(.bottom, 30)
                }
            }
            .padding(.top, 16)
        }
        .navigationTitle("Lookup Any Verse")
    }

    func fetchVerses() async {
        await MainActor.run { isLoading = true; verses = [] }
        let result = await NetworkService.shared.fetchVerses(book: selectedBook, chapter: selectedChapter)
        await MainActor.run { verses = result; isLoading = false }
    }
}

// ============================================================
// MARK: - Bible Versions Screen
// ============================================================

struct BibleVersionsScreen: View {
    let versions: [(String, String, String, String)] = [
        ("ESV", "English Standard Version", "Word-for-Word", "Precise, literal translation. Best for serious study. Closest to the original languages while remaining readable."),
        ("NASB", "New American Standard Bible", "Word-for-Word", "Extremely literal. Scholars' choice for depth. Less smooth to read but maximally accurate to original text."),
        ("KJV", "King James Version", "Word-for-Word", "The historic English Bible. Beautiful language, but archaic words can hinder understanding for modern readers."),
        ("NIV", "New International Version", "Thought-for-Thought", "Most widely read English Bible. Balances accuracy and readability. Great starting point for most readers."),
        ("NLT", "New Living Translation", "Thought-for-Thought", "Very readable. Communicates meaning clearly in modern English. Excellent for devotional reading."),
        ("CSB", "Christian Standard Bible", "Balanced", "Strong balance of accuracy and readability. Often considered the best of both worlds."),
        ("MSG", "The Message", "Paraphrase", "Eugene Peterson's contemporary paraphrase. Powerful for fresh perspective but not recommended as a primary study Bible."),
    ]

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Which Bible Version Should I Use?")
                        .font(.system(size: 22, weight: .bold))

                    Text("Different translations use different philosophies. Understanding them helps you choose wisely.")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                }
                .padding(.horizontal)
                .padding(.top, 16)

                VStack(spacing: 4) {
                    Text("Our Recommendation")
                        .font(.system(size: 13, weight: .semibold))
                        .foregroundColor(.appPrimary)
                    Text("Start with the NIV or ESV. They give you accuracy and readability without sacrificing meaning.")
                        .font(.system(size: 14))
                        .multilineTextAlignment(.center)
                        .foregroundColor(.secondary)
                }
                .padding(16)
                .background(Color.appPrimary.opacity(0.07))
                .cornerRadius(12)
                .padding(.horizontal)

                ForEach(versions, id: \.0) { v in
                    VStack(alignment: .leading, spacing: 8) {
                        HStack {
                            Text(v.0)
                                .font(.system(size: 20, weight: .bold))
                            Spacer()
                            Text(v.2)
                                .font(.system(size: 11, weight: .medium))
                                .foregroundColor(.white)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 4)
                                .background(typeColor(v.2))
                                .cornerRadius(6)
                        }

                        Text(v.1)
                            .font(.system(size: 13, weight: .semibold))
                            .foregroundColor(.secondary)

                        Text(v.3)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                            .lineSpacing(3)
                    }
                    .padding(16)
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(12)
                    .padding(.horizontal)
                }
            }
            .padding(.bottom, 30)
        }
        .navigationTitle("Bible Versions")
    }

    func typeColor(_ type: String) -> Color {
        switch type {
        case "Word-for-Word": return Color.appPrimary
        case "Thought-for-Thought": return Color(red: 0.08, green: 0.6, blue: 0.55)
        case "Balanced": return Color(red: 0.13, green: 0.55, blue: 0.13)
        default: return .secondary
        }
    }
}

// ============================================================
// MARK: - Religions Screen
// ============================================================

struct ReligionsScreen: View {
    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 24) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("What is Religion?")
                        .font(.system(size: 26, weight: .bold))
                    Text("Christianity did not emerge from one unified institution. It grew, divided, and reformed across two thousand years of history.")
                        .font(.system(size: 15))
                        .foregroundColor(.secondary)
                        .lineSpacing(4)
                }

                splitSection(year: "AD 1054", title: "The Great Schism", color: Color(red: 0.83, green: 0.18, blue: 0.18),
                    description: "The church split between the Roman Catholic Church (West) and the Eastern Orthodox Church (East). The main disputes were papal authority and the Filioque clause. The Pope and the Patriarch of Constantinople excommunicated each other — a division that stands to this day.",
                    branches: ["Roman Catholic Church", "Eastern Orthodox Church"])

                splitSection(year: "AD 1517", title: "The Protestant Reformation", color: Color(red: 0.13, green: 0.55, blue: 0.13),
                    description: "Martin Luther nailed his 95 Theses to the church door in Wittenberg, challenging the sale of indulgences and the authority of the Pope. The five Solas emerged: Scripture Alone, Faith Alone, Grace Alone, Christ Alone, Glory to God Alone.",
                    branches: ["Lutheran", "Reformed / Calvinist", "Anglican", "Baptist", "Methodist", "Pentecostal", "Non-Denominational"])

                VStack(alignment: .leading, spacing: 8) {
                    Text("The Disciple Co. Position")
                        .font(.system(size: 18, weight: .bold))
                    Text("We hold to the five Solas and Sola Scriptura as the supreme principle. The Bible — not church tradition or institutional authority — is the final word on doctrine and practice.")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                        .lineSpacing(4)
                }
                .padding(16)
                .background(Color.appPrimary.opacity(0.07))
                .cornerRadius(12)
            }
            .padding(20)
        }
        .navigationTitle("What is Religion")
    }

    @ViewBuilder
    func splitSection(year: String, title: String, color: Color, description: String, branches: [String]) -> some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text(year).font(.system(size: 11, weight: .bold)).foregroundColor(.white)
                    .padding(.horizontal, 8).padding(.vertical, 4).background(color).cornerRadius(6)
                Text(title).font(.system(size: 18, weight: .bold))
            }

            Text(description).font(.system(size: 14)).foregroundColor(.secondary).lineSpacing(3)

            VStack(alignment: .leading, spacing: 6) {
                Text("Resulting Branches").font(.system(size: 12, weight: .semibold)).foregroundColor(.secondary)
                ForEach(branches, id: \.self) { branch in
                    HStack(spacing: 8) {
                        Circle().fill(color).frame(width: 6, height: 6)
                        Text(branch).font(.system(size: 14))
                    }
                }
            }
        }
        .padding(16)
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
    }
}

// ============================================================
// MARK: - Resurrection Screen
// ============================================================

struct ResurrectionScreen: View {
    let evidences: [(String, String)] = [
        ("Manuscript Evidence", "The P52 papyrus fragment of John's Gospel dates to approximately AD 100–150 — within 50–100 years of the original. We have over 5,800 Greek New Testament manuscripts, far more than any other ancient document."),
        ("The Empty Tomb", "No early opponent of Christianity produced a body to disprove the resurrection — something that would have been devastating to the movement if possible. The tomb was empty. The question is why."),
        ("Eyewitness Accounts", "Paul writes in 1 Corinthians 15 (c. AD 55) that Jesus appeared to over 500 people at once, 'most of whom are still alive.' This is an open invitation to verify the claim with living witnesses."),
        ("The Disciples' Transformation", "The disciples went from hiding in fear behind locked doors to publicly proclaiming the resurrection within weeks — knowing it could mean death. People die for what they believe is true. They don't die for what they know is a lie."),
        ("Jewish and Roman Hostility", "Both Jewish leaders and Roman authorities had strong motives to disprove the resurrection. Neither produced a body. Tacitus and Josephus confirm Jesus existed and was executed. The resurrection claim was made in the same city where it happened, to people who could have disproved it."),
    ]

    var body: some View {
        ZStack {
            LinearGradient(colors: [Color(red: 0.04, green: 0.06, blue: 0.15), Color(red: 0.06, green: 0.09, blue: 0.22)],
                           startPoint: .top, endPoint: .bottom)
                .ignoresSafeArea()

            ScrollView(showsIndicators: true) {
                VStack(alignment: .leading, spacing: 24) {
                    VStack(spacing: 12) {
                        Text("✝")
                            .font(.system(size: 48))
                            .foregroundColor(.white.opacity(0.8))
                        Text("The Resurrection")
                            .font(.system(size: 28, weight: .bold))
                            .foregroundColor(.white)
                        Text("He is not here. He has risen.")
                            .font(.system(size: 16))
                            .foregroundColor(.white.opacity(0.6))
                            .italic()
                    }
                    .frame(maxWidth: .infinity)
                    .padding(.top, 20)

                    Text("If the resurrection is not true, Christianity is worthless. If it is true, everything changes. Here is the evidence.")
                        .font(.system(size: 15))
                        .foregroundColor(.white.opacity(0.75))
                        .lineSpacing(4)
                        .padding(.horizontal)

                    ForEach(evidences, id: \.0) { evidence in
                        VStack(alignment: .leading, spacing: 10) {
                            Text(evidence.0)
                                .font(.system(size: 16, weight: .bold))
                                .foregroundColor(.white)
                            Text(evidence.1)
                                .font(.system(size: 14))
                                .foregroundColor(.white.opacity(0.75))
                                .lineSpacing(4)
                        }
                        .padding(16)
                        .background(Color.white.opacity(0.08))
                        .cornerRadius(12)
                        .padding(.horizontal)
                    }

                    VStack(spacing: 8) {
                        Text("1 Corinthians 15:3-4")
                            .font(.system(size: 12, weight: .semibold))
                            .foregroundColor(.white.opacity(0.5))
                        Text("\"Christ died for our sins according to the Scriptures, that he was buried, that he was raised on the third day according to the Scriptures.\"")
                            .font(.system(size: 15))
                            .foregroundColor(.white.opacity(0.85))
                            .italic()
                            .multilineTextAlignment(.center)
                    }
                    .padding(20)
                    .background(Color.white.opacity(0.05))
                    .cornerRadius(12)
                    .padding(.horizontal)
                    .padding(.bottom, 30)
                }
            }
        }
        .navigationTitle("The Resurrection")
        .navigationBarTitleDisplayMode(.inline)
        .toolbarColorScheme(.dark, for: .navigationBar)
    }
}

// ============================================================
// MARK: - Easter Screen
// ============================================================

struct EasterScreen: View {
    let sections: [(String, String, String, String)] = [
        ("Ash Wednesday", "The Start of Lent", "Ash Wednesday marks the beginning of Lent — 40 days of fasting, prayer, and repentance before Easter. The ashes placed on the forehead represent mortality and repentance, drawn from Joel 2:12–13: 'Return to me with all your heart, with fasting and weeping and mourning.'", "Joel 2:12"),
        ("Lent", "40 Days of Preparation", "Lent is 40 days of intentional fasting and prayer that mirrors Jesus' 40 days in the wilderness. It is a season of self-examination and preparation for the celebration of the resurrection. The number 40 appears throughout Scripture: 40 years in the wilderness, 40 days of flood, 40 days for Moses on Sinai.", "Matthew 4:1-2"),
        ("Palm Sunday", "The Triumphal Entry", "Palm Sunday celebrates Jesus' entry into Jerusalem on a donkey, fulfilling Zechariah 9:9: 'See, your king comes to you, righteous and victorious, lowly and riding on a donkey.' The crowd waved palm branches and shouted 'Hosanna!' — within a week, many would shout 'Crucify him!'", "John 12:13"),
        ("Maundy Thursday", "The Last Supper", "On this night, Jesus shared the Passover meal with His disciples, instituting what Christians call Communion or the Eucharist. He washed His disciples' feet and gave them the new commandment (maundy): 'Love one another as I have loved you.' He was betrayed and arrested that same night.", "John 13:34"),
        ("Good Friday", "The Crucifixion", "Good Friday commemorates Jesus' crucifixion at Golgotha. He was flogged, mocked with a crown of thorns, forced to carry His cross, and crucified between two criminals. He died at 3pm, crying 'It is finished' — the debt of sin was paid. The Temple veil tore from top to bottom, signifying open access to God.", "John 19:30"),
        ("Easter Sunday", "He Is Risen", "Early on the first day of the week, Mary Magdalene came to the tomb and found it empty. Two angels said: 'He is not here; he has risen!' Over the next 40 days, Jesus appeared to His disciples and over 500 people. The resurrection is the cornerstone of the Christian faith — everything rises or falls on this event.", "Luke 24:6"),
    ]

    @State private var expandedSection: String? = nil

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 16) {
                VStack(spacing: 8) {
                    Text("✝")
                        .font(.system(size: 44))
                    Text("The Easter Season")
                        .font(.system(size: 26, weight: .bold))
                    Text("From Ash Wednesday to Resurrection Sunday")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 20)

                ForEach(sections, id: \.0) { section in
                    Button {
                        withAnimation { expandedSection = expandedSection == section.0 ? nil : section.0 }
                    } label: {
                        VStack(alignment: .leading, spacing: 0) {
                            HStack {
                                VStack(alignment: .leading, spacing: 3) {
                                    Text(section.0).font(.system(size: 16, weight: .bold)).foregroundColor(.primary)
                                    Text(section.1).font(.system(size: 13)).foregroundColor(.secondary)
                                }
                                Spacer()
                                Image(systemName: expandedSection == section.0 ? "chevron.up" : "chevron.down")
                                    .font(.system(size: 13)).foregroundColor(.secondary)
                            }
                            .padding(16)

                            if expandedSection == section.0 {
                                VStack(alignment: .leading, spacing: 10) {
                                    Divider()
                                    Text(section.2)
                                        .font(.system(size: 14)).foregroundColor(.secondary).lineSpacing(4)
                                    Text(section.3)
                                        .font(.system(size: 12, weight: .semibold)).foregroundColor(.appPrimary)
                                }
                                .padding(.horizontal, 16).padding(.bottom, 16)
                            }
                        }
                        .background(Color(UIColor.secondarySystemBackground))
                        .cornerRadius(12)
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal)
                }
            }
            .padding(.bottom, 30)
        }
        .navigationTitle("Easter")
    }
}

// ============================================================
// MARK: - Holidays Screen
// ============================================================

struct HolidaysScreen: View {
    let holidays: [(String, String, String, String)] = [
        ("Christmas", "December 25", "Celebrates the birth of Jesus Christ — God becoming flesh. Despite commercialization, the core is the Incarnation: 'The Word became flesh and made his dwelling among us' (John 1:14).", "Matthew 1–2, Luke 2"),
        ("Easter", "March–April", "The resurrection of Jesus Christ from the dead. The most important date in the Christian calendar — everything depends on this event being historically real.", "Matthew 28, 1 Corinthians 15"),
        ("Epiphany", "January 6", "Celebrates the visit of the Magi to the child Jesus. Marks the revelation of Christ to the Gentiles — the light of the world shining to all nations.", "Matthew 2:1-12"),
        ("Pentecost", "50 Days After Easter", "The descent of the Holy Spirit on the disciples in Jerusalem. The Church was born — 3,000 converted in one day through Peter's preaching.", "Acts 2"),
        ("Advent", "4 Weeks Before Christmas", "A season of waiting and preparation for Christmas. Reflects both the historical waiting for the Messiah and the present waiting for Christ's return.", "Isaiah 9:6, Luke 1"),
        ("Good Friday", "Friday Before Easter", "The day Jesus was crucified. A day of solemnity and reflection on the cost of sin and the depth of God's love. 'It is finished' — the debt was paid.", "John 19:30"),
    ]

    var body: some View {
        List(holidays, id: \.0) { holiday in
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(holiday.0).font(.system(size: 16, weight: .bold))
                    Spacer()
                    Text(holiday.1).font(.system(size: 11)).foregroundColor(.secondary)
                }
                Text(holiday.2).font(.system(size: 13)).foregroundColor(.secondary).lineSpacing(3)
                Text(holiday.3).font(.system(size: 11, weight: .medium)).foregroundColor(.appPrimary)
            }
            .padding(.vertical, 6)
        }
        .listStyle(.plain)
        .navigationTitle("Holiday Origins")
    }
}

// ============================================================
// MARK: - Bible Authors Screen
// ============================================================

struct BibleAuthorsScreen: View {
    let oldTestament: [(String, String, String)] = [
        ("Moses", "c. 1445–1405 BC", "Wrote the Pentateuch (Genesis–Deuteronomy). Leader of the Exodus, received the Law at Sinai. Author of more Scripture than any other single person."),
        ("David", "c. 1000 BC", "Israel's greatest king. Wrote approximately 73 of the 150 Psalms. A warrior, a worshipper, and a man after God's own heart despite his failures."),
        ("Solomon", "c. 950 BC", "Wrote Proverbs, Ecclesiastes, and Song of Solomon. The wisest man who ever lived — and whose wisdom ultimately couldn't save him from his own heart."),
        ("Isaiah", "c. 740–680 BC", "The 'evangelical prophet.' His book contains some of the most precise Messianic prophecies in the Old Testament, including Isaiah 53 — written 700 years before the crucifixion."),
        ("Jeremiah", "c. 627–586 BC", "The 'weeping prophet.' Wrote Jeremiah and Lamentations during Jerusalem's darkest hour. He foretold the 70-year Babylonian captivity."),
        ("Daniel", "c. 605–536 BC", "Statesman and prophet who served in Babylon. His book contains some of the most detailed end-times prophecy in Scripture, including the '70 weeks' of Daniel 9."),
    ]

    let newTestament: [(String, String, String)] = [
        ("Matthew (Levi)", "c. AD 50–70", "Tax collector called by Jesus. Eyewitness to Jesus' ministry. Wrote his Gospel primarily for a Jewish audience, connecting Jesus to Old Testament prophecy."),
        ("Mark (John Mark)", "c. AD 55–65", "Companion of Peter. His Gospel is the shortest and fastest-paced, likely reflecting Peter's eyewitness account of Jesus' ministry."),
        ("Luke", "c. AD 60–80", "Physician and historian. Wrote both Luke and Acts. His Gospel is the most detailed account of Jesus' birth and includes unique parables like the Prodigal Son."),
        ("John", "c. AD 85–95", "The 'beloved disciple.' Eyewitness to Jesus' ministry, crucifixion, and resurrection. Wrote the Gospel of John, three letters, and Revelation."),
        ("Paul (Saul of Tarsus)", "c. AD 48–67", "Persecutor of Christians who encountered the risen Jesus on the road to Damascus. Wrote 13 letters. More New Testament books than anyone else."),
        ("Peter", "c. AD 60–68", "Chief of the Apostles. Eyewitness to the Transfiguration and the resurrection. Wrote 1 and 2 Peter near the end of his life under Nero's persecution."),
    ]

    var body: some View {
        List {
            Section(header: Text("Old Testament Authors")) {
                ForEach(oldTestament, id: \.0) { author in
                    authorRow(name: author.0, date: author.1, description: author.2)
                }
            }

            Section(header: Text("New Testament Authors")) {
                ForEach(newTestament, id: \.0) { author in
                    authorRow(name: author.0, date: author.1, description: author.2)
                }
            }
        }
        .listStyle(.insetGrouped)
        .navigationTitle("Bible Authors")
    }

    @ViewBuilder
    func authorRow(name: String, date: String, description: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(name).font(.system(size: 15, weight: .bold))
                Spacer()
                Text(date).font(.system(size: 11)).foregroundColor(.secondary)
            }
            Text(description).font(.system(size: 13)).foregroundColor(.secondary).lineSpacing(3)
        }
        .padding(.vertical, 4)
    }
}

// ============================================================
// MARK: - Preaching Screen
// ============================================================

struct PreachingSermon: Identifiable {
    let id: String
    let preacher: String
    let title: String
    let videoId: String
    let description: String
    let instagram: String?
    let facebook: String?
    let tiktok: String?
    let youtube: String
}

struct PreachingScreen: View {
    let sermons: [PreachingSermon] = [
        PreachingSermon(
            id: "wes-huff",
            preacher: "Wes Huff",
            title: "How to Talk About Jesus Without Sounding Like an Idiot",
            videoId: "P4d23yKp5QU",
            description: "Wesley Huff shares practical strategies for Christians to talk about their faith with others, combining real world experience and Biblical teachings on engaging in meaningful conversations about faith in Jesus.",
            instagram: "https://www.instagram.com/wesley_huff/",
            facebook: "https://www.facebook.com/WesLivingstoneHuff",
            tiktok: "https://www.tiktok.com/@wesley__huff",
            youtube: "https://www.youtube.com/watch?v=P4d23yKp5QU"
        ),
        PreachingSermon(
            id: "anthony-mitchell",
            preacher: "Philip Anthony Mitchell",
            title: "You Are Anointed for This",
            videoId: "WElQZ2EoJmY",
            description: "A powerful sermon from 2819 Church in Atlanta on recognizing and walking in the anointing God has placed on your life for His purposes.",
            instagram: "https://www.instagram.com/philipamitchell/",
            facebook: "https://www.facebook.com/philipanthonymitchell",
            tiktok: "https://www.tiktok.com/@philipanthonymitchell",
            youtube: "https://www.youtube.com/watch?v=WElQZ2EoJmY"
        ),
        PreachingSermon(
            id: "td-jakes",
            preacher: "T.D. Jakes",
            title: "Change your Mind",
            videoId: "5MM7KrmPL_g",
            description: "Bishop T.D. Jakes delivers a transformative message about freedom, healing, and restoration from Luke 13:10-17. A powerful word for anyone seeking spiritual breakthrough and liberation.",
            instagram: "https://www.instagram.com/bishopjakes/",
            facebook: "https://www.facebook.com/BishopTdJakes",
            tiktok: "https://www.tiktok.com/@bishopjakes",
            youtube: "https://www.youtube.com/watch?v=5MM7KrmPL_g"
        ),
    ]

    @State private var selectedId: String = "wes-huff"

    var activeSermon: PreachingSermon {
        sermons.first(where: { $0.id == selectedId }) ?? sermons[0]
    }

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(spacing: 0) {
                ScrollView(.horizontal, showsIndicators: true) {
                    HStack(spacing: 0) {
                        ForEach(sermons) { sermon in
                            Button(action: { selectedId = sermon.id }) {
                                Text(sermon.preacher)
                                    .font(.system(size: 14, weight: .semibold))
                                    .foregroundColor(selectedId == sermon.id ? .white : .primary)
                                    .padding(.horizontal, 16)
                                    .padding(.vertical, 12)
                                    .background(selectedId == sermon.id ? Color.appPrimary : Color(UIColor.secondarySystemBackground))
                            }
                        }
                    }
                }
                .background(Color(UIColor.secondarySystemBackground))

                VStack(alignment: .leading, spacing: 20) {
                    VStack(alignment: .leading, spacing: 8) {
                        Text(activeSermon.title)
                            .font(.system(size: 22, weight: .bold))
                        Text(activeSermon.description)
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                            .lineSpacing(4)
                    }

                    if let url = URL(string: activeSermon.youtube) {
                        Link(destination: url) {
                            ZStack {
                                AsyncImage(url: URL(string: "https://img.youtube.com/vi/\(activeSermon.videoId)/hqdefault.jpg")) { image in
                                    image.resizable().aspectRatio(contentMode: .fill)
                                } placeholder: {
                                    Rectangle()
                                        .fill(Color(UIColor.systemGray5))
                                        .overlay(
                                            ProgressView()
                                        )
                                }
                                .frame(height: 200)
                                .clipped()
                                .cornerRadius(12)

                                Circle()
                                    .fill(Color.red)
                                    .frame(width: 56, height: 56)
                                    .overlay(
                                        Image(systemName: "play.fill")
                                            .font(.system(size: 20))
                                            .foregroundColor(.white)
                                            .offset(x: 2)
                                    )
                            }
                        }
                    }

                    VStack(alignment: .leading, spacing: 10) {
                        Text("Follow on Social")
                            .font(.system(size: 14, weight: .semibold))
                            .foregroundColor(.secondary)

                        HStack(spacing: 10) {
                            if let insta = activeSermon.instagram, let url = URL(string: insta) {
                                Link(destination: url) {
                                    Label("Instagram", systemImage: "camera.fill")
                                        .font(.system(size: 13, weight: .semibold))
                                        .foregroundColor(.white)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 8)
                                        .background(LinearGradient(colors: [Color(red: 0.56, green: 0.17, blue: 0.75), Color(red: 0.98, green: 0.27, blue: 0.55)], startPoint: .leading, endPoint: .trailing))
                                        .cornerRadius(8)
                                }
                            }
                            if let fb = activeSermon.facebook, let url = URL(string: fb) {
                                Link(destination: url) {
                                    Label("Facebook", systemImage: "person.2.fill")
                                        .font(.system(size: 13, weight: .semibold))
                                        .foregroundColor(.white)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 8)
                                        .background(Color(red: 0.23, green: 0.35, blue: 0.60))
                                        .cornerRadius(8)
                                }
                            }
                            if let tiktok = activeSermon.tiktok, let url = URL(string: tiktok) {
                                Link(destination: url) {
                                    Label("TikTok", systemImage: "music.note")
                                        .font(.system(size: 13, weight: .semibold))
                                        .foregroundColor(.white)
                                        .padding(.horizontal, 12)
                                        .padding(.vertical, 8)
                                        .background(Color.black)
                                        .cornerRadius(8)
                                }
                            }
                        }
                    }

                    if let url = URL(string: activeSermon.youtube) {
                        Link(destination: url) {
                            HStack {
                                Image(systemName: "arrow.up.right.square.fill")
                                Text("Watch on YouTube")
                                    .font(.system(size: 15, weight: .semibold))
                            }
                            .foregroundColor(.white)
                            .frame(maxWidth: .infinity)
                            .padding(.vertical, 14)
                            .background(Color.red)
                            .cornerRadius(12)
                        }
                    }
                }
                .padding()
            }
        }
        .navigationTitle("Wisdom")
    }
}

// ============================================================
// MARK: - FAQs Screen
// ============================================================

struct FAQsScreen: View {
    let faqs: [(String, String)] = [
        ("Is the Bible actually reliable?", "Yes — the manuscript evidence is overwhelming. We have 5,800+ Greek New Testament manuscripts, far more than any other ancient document. The Dead Sea Scrolls confirmed Old Testament accuracy across 1,000 years of copying. Textual scholars estimate the New Testament text is 99.5% accurately preserved."),
        ("How do I know God exists?", "The cosmological argument: everything that exists has a cause. The universe began to exist. Therefore it has a cause — something outside space, time, and matter. The moral argument: objective moral values exist. They require a moral lawgiver. The fine-tuning of the universe: the constants of physics are calibrated to allow life with a precision that defies chance."),
        ("What happens when we die?", "The Bible teaches that those who trust in Jesus pass immediately into His presence at death (2 Corinthians 5:8, Philippians 1:23). On the last day, all will be physically resurrected — believers to eternal life with God, unbelievers to eternal separation from Him. Jesus spoke more about hell than anyone else in Scripture."),
        ("Do I have to go to church?", "Hebrews 10:25 says not to 'give up meeting together.' The Christian life was never meant to be lived alone. Church is not optional — it is the body of Christ. That said, it is not about attendance as performance. It is about being shaped by community, accountability, and shared worship."),
        ("How do I know if I'm saved?", "1 John was written specifically to answer this question. Signs of genuine faith: you believe Jesus is the Son of God (1 John 5:1), you obey His commands (1 John 2:3), you love other believers (1 John 3:14), you no longer practice sin as a lifestyle (1 John 3:9). Assurance comes from the Spirit's witness with your spirit (Romans 8:16)."),
        ("What about other religions?", "Jesus said 'I am the way, the truth, and the life. No one comes to the Father except through me' (John 14:6). This is an exclusive claim. Every major religion presents a different understanding of God, humanity, sin, and salvation. They cannot all be right. Christianity's uniqueness is the resurrection — a historical, verifiable event. No other religion makes that claim."),
        ("Why does God allow suffering?", "This is the hardest question. The Bible doesn't offer a simple answer but gives several truths: suffering is a consequence of a world broken by sin; God uses suffering to produce character (Romans 5:3-4); God Himself entered suffering in Jesus; God can redeem any suffering for good (Romans 8:28); and eternal glory will make present suffering seem light (Romans 8:18)."),
    ]

    @State private var expanded: String? = nil

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(spacing: 1) {
                ForEach(faqs, id: \.0) { faq in
                    Button {
                        withAnimation { expanded = expanded == faq.0 ? nil : faq.0 }
                    } label: {
                        VStack(alignment: .leading, spacing: 0) {
                            HStack {
                                Text(faq.0)
                                    .font(.system(size: 15, weight: .semibold))
                                    .foregroundColor(.primary)
                                    .multilineTextAlignment(.leading)
                                Spacer(minLength: 8)
                                Image(systemName: expanded == faq.0 ? "chevron.up" : "chevron.down")
                                    .font(.system(size: 12))
                                    .foregroundColor(.secondary)
                            }
                            .padding(16)

                            if expanded == faq.0 {
                                Text(faq.1)
                                    .font(.system(size: 14))
                                    .foregroundColor(.secondary)
                                    .lineSpacing(4)
                                    .padding(.horizontal, 16)
                                    .padding(.bottom, 16)
                            }
                        }
                        .background(Color(UIColor.secondarySystemBackground))
                    }
                    .buttonStyle(.plain)
                }
            }
            .cornerRadius(12)
            .padding()
        }
        .navigationTitle("FAQs")
    }
}

// ============================================================
// MARK: - Bible Studies Screen
// ============================================================

struct BibleStudyLesson: Identifiable {
    let id = UUID()
    let title: String
    let preview: String
    let content: String
    let keyVerse: String?
    let reflectivePrompt: String?
    let keyTakeaway: String?
}

struct BibleStudySeries: Identifiable {
    let id: Int
    let level: String
    let title: String
    let subtitle: String
    let description: String
    let tag: String
    let lessons: [BibleStudyLesson]
}

struct BibleStudiesScreen: View {
    @State private var selectedLevel = "beginner"
    let levels = [("beginner", "Beginner"), ("intermediate", "Intermediate"), ("advanced", "Advanced")]

    let studies: [BibleStudySeries] = AppData.shared.bibleStudies

    var filtered: [BibleStudySeries] {
        studies.filter { $0.level == selectedLevel }
    }

    var levelDescription: String {
        switch selectedLevel {
        case "beginner": return "New to the faith or exploring Christianity for the first time."
        case "intermediate": return "Growing in your faith and ready to go deeper into Scripture and doctrine."
        case "advanced": return "Hard questions and deep theology for those ready to wrestle seriously."
        default: return ""
        }
    }

    var body: some View {
        VStack(spacing: 0) {
            Picker("Level", selection: $selectedLevel) {
                ForEach(levels, id: \.0) { level in
                    Text(level.1).tag(level.0)
                }
            }
            .pickerStyle(.segmented)
            .padding()

            Text(levelDescription)
                .font(.system(size: 13))
                .foregroundColor(.secondary)
                .italic()
                .padding(.horizontal)
                .padding(.bottom, 8)

            List(filtered) { study in
                NavigationLink(destination: BibleStudyDetailScreen(study: study)) {
                    VStack(alignment: .leading, spacing: 6) {
                        HStack {
                            Text(study.tag)
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(.appPrimary)
                                .padding(.horizontal, 8)
                                .padding(.vertical, 3)
                                .background(Color.appPrimary.opacity(0.12))
                                .cornerRadius(6)
                            Spacer()
                            Text("\(study.lessons.isEmpty ? "Coming Soon" : "\(study.lessons.count) lessons")")
                                .font(.system(size: 11))
                                .foregroundColor(.secondary)
                        }
                        Text(study.title)
                            .font(.system(size: 16, weight: .bold))
                        Text(study.subtitle)
                            .font(.system(size: 12))
                            .foregroundColor(.secondary)
                        Text(study.description)
                            .font(.system(size: 13))
                            .foregroundColor(.secondary)
                            .lineLimit(2)
                            .lineSpacing(2)
                    }
                    .padding(.vertical, 6)
                }
            }
            .listStyle(.plain)
        }
        .navigationTitle("Bible Studies")
    }
}

struct BibleStudyDetailScreen: View {
    let study: BibleStudySeries
    @State private var expandedLesson: UUID? = nil

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 20) {
                VStack(alignment: .leading, spacing: 10) {
                    HStack {
                        Text(study.tag)
                            .font(.system(size: 11, weight: .bold))
                            .foregroundColor(.appPrimary)
                            .padding(.horizontal, 10)
                            .padding(.vertical, 4)
                            .background(Color.appPrimary.opacity(0.12))
                            .cornerRadius(8)
                        Spacer()
                    }
                    Text(study.title)
                        .font(.system(size: 26, weight: .bold))
                    Text(study.subtitle)
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                    Text(study.description)
                        .font(.system(size: 15))
                        .foregroundColor(.secondary)
                        .lineSpacing(4)
                }
                .padding()
                .background(Color(UIColor.secondarySystemBackground))
                .cornerRadius(14)

                if study.lessons.isEmpty {
                    VStack(spacing: 12) {
                        Image(systemName: "lock.fill")
                            .font(.system(size: 32))
                            .foregroundColor(.secondary)
                        Text("Content Coming Soon")
                            .font(.system(size: 18, weight: .bold))
                        Text("This study is being written. Check back soon.")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                            .multilineTextAlignment(.center)
                    }
                    .frame(maxWidth: .infinity)
                    .padding(40)
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(14)
                } else {
                    VStack(spacing: 8) {
                        ForEach(study.lessons) { lesson in
                            BibleStudyLessonRow(lesson: lesson, isExpanded: expandedLesson == lesson.id) {
                                withAnimation {
                                    expandedLesson = expandedLesson == lesson.id ? nil : lesson.id
                                }
                            }
                        }
                    }
                }
            }
            .padding()
            .padding(.bottom, 30)
        }
        .navigationTitle(study.title)
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct BibleStudyLessonRow: View {
    let lesson: BibleStudyLesson
    let isExpanded: Bool
    let onTap: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            Button(action: onTap) {
                HStack(alignment: .top) {
                    VStack(alignment: .leading, spacing: 4) {
                        Text(lesson.title)
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(.primary)
                            .multilineTextAlignment(.leading)
                        if !isExpanded {
                            Text(lesson.preview)
                                .font(.system(size: 12))
                                .foregroundColor(.secondary)
                                .lineLimit(1)
                        }
                    }
                    Spacer(minLength: 8)
                    Image(systemName: isExpanded ? "chevron.up" : "chevron.down")
                        .font(.system(size: 12))
                        .foregroundColor(.secondary)
                        .padding(.top, 2)
                }
                .padding(16)
            }
            .buttonStyle(.plain)

            if isExpanded {
                VStack(alignment: .leading, spacing: 14) {
                    Divider()

                    Text(lesson.preview)
                        .font(.system(size: 13))
                        .foregroundColor(.secondary)
                        .italic()
                        .lineSpacing(3)

                    ForEach(lesson.content.components(separatedBy: "\n\n"), id: \.self) { paragraph in
                        Text(paragraph)
                            .font(.system(size: 14))
                            .foregroundColor(.primary)
                            .lineSpacing(4)
                    }

                    if let keyVerse = lesson.keyVerse {
                        HStack(alignment: .top, spacing: 10) {
                            Rectangle()
                                .fill(Color.amber)
                                .frame(width: 3)
                                .cornerRadius(2)
                            Text(keyVerse)
                                .font(.system(size: 13, weight: .semibold))
                                .foregroundColor(Color(red: 0.6, green: 0.35, blue: 0.0))
                                .lineSpacing(3)
                        }
                        .padding(12)
                        .background(Color.amber.opacity(0.08))
                        .cornerRadius(10)
                    }

                    if let prompt = lesson.reflectivePrompt {
                        VStack(alignment: .leading, spacing: 6) {
                            Text("REFLECT")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(.appPrimary)
                            Text(prompt)
                                .font(.system(size: 13))
                                .foregroundColor(.appPrimary)
                                .lineSpacing(3)
                        }
                        .padding(12)
                        .background(Color.appPrimary.opacity(0.07))
                        .cornerRadius(10)
                    }

                    if let takeaway = lesson.keyTakeaway {
                        VStack(alignment: .leading, spacing: 6) {
                            Text("KEY TAKEAWAY")
                                .font(.system(size: 10, weight: .bold))
                                .foregroundColor(.secondary)
                            Text(takeaway)
                                .font(.system(size: 13, weight: .medium))
                                .foregroundColor(.primary)
                                .lineSpacing(3)
                        }
                        .padding(12)
                        .background(Color(UIColor.systemGray6))
                        .cornerRadius(10)
                    }
                }
                .padding(.horizontal, 16)
                .padding(.bottom, 16)
            }
        }
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(12)
    }
}

// ============================================================
// MARK: - Podcasts Screen
// ============================================================

struct PodcastsScreen: View {
    let topPodcasts: [(String, String, String)] = [
        ("The Bible Project", "Exploring the Bible through animated videos and in-depth discussions", "https://bibleproject.com/podcast/"),
        ("Ask Pastor John", "John Piper answers biblical and pastoral questions", "https://www.desiringgod.org/ask-pastor-john"),
        ("The Gospel Coalition", "Conversations on theology, culture, and the Christian life", "https://www.thegospelcoalition.org/podcasts/"),
    ]

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(alignment: .leading, spacing: 24) {
                VStack(alignment: .leading, spacing: 12) {
                    Text("Top Recommended Podcasts")
                        .font(.system(size: 18, weight: .bold))
                        .padding(.horizontal)

                    ForEach(Array(topPodcasts.enumerated()), id: \.offset) { index, podcast in
                        if let url = URL(string: podcast.2) {
                            Link(destination: url) {
                                HStack(spacing: 14) {
                                    ZStack {
                                        Circle()
                                            .fill(Color.appPrimary)
                                            .frame(width: 36, height: 36)
                                        Text("\(index + 1)")
                                            .font(.system(size: 16, weight: .bold))
                                            .foregroundColor(.white)
                                    }

                                    VStack(alignment: .leading, spacing: 4) {
                                        Text(podcast.0)
                                            .font(.system(size: 15, weight: .semibold))
                                            .foregroundColor(.primary)
                                        Text(podcast.1)
                                            .font(.system(size: 12))
                                            .foregroundColor(.secondary)
                                            .lineLimit(2)
                                    }

                                    Spacer()
                                    Image(systemName: "arrow.up.right")
                                        .font(.system(size: 12))
                                        .foregroundColor(.secondary)
                                }
                                .padding()
                                .background(Color(UIColor.secondarySystemBackground))
                                .cornerRadius(12)
                                .padding(.horizontal)
                            }
                        }
                    }
                }

                VStack(spacing: 16) {
                    Image(systemName: "cross.fill")
                        .font(.system(size: 40))
                        .foregroundColor(Color(red: 0.2, green: 0.4, blue: 0.8))

                    Text("The Discipled Co. Podcast")
                        .font(.system(size: 22, weight: .bold))

                    Text("Coming Soon")
                        .font(.system(size: 16, weight: .semibold))
                        .foregroundColor(.secondary)

                    Text("We're working on bringing you meaningful conversations about faith, discipleship, and living out the Gospel in everyday life. Stay tuned for updates!")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .lineSpacing(4)
                }
                .frame(maxWidth: .infinity)
                .padding(32)
                .background(Color(UIColor.secondarySystemBackground))
                .cornerRadius(14)
                .padding(.horizontal)

                VStack(alignment: .leading, spacing: 12) {
                    Text("YouTube Content")
                        .font(.system(size: 18, weight: .bold))
                        .padding(.horizontal)

                    HStack(spacing: 14) {
                        Image(systemName: "play.rectangle.fill")
                            .font(.system(size: 28))
                            .foregroundColor(.secondary)
                        Text("Our YouTube channel is currently in development. Check back soon for video content, teachings, and more!")
                            .font(.system(size: 14))
                            .foregroundColor(.secondary)
                            .lineSpacing(3)
                    }
                    .padding()
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(12)
                    .padding(.horizontal)
                }
            }
            .padding(.vertical)
        }
        .navigationTitle("Podcasts")
    }
}

// ============================================================
// MARK: - Guidance Screen
// ============================================================

struct GuidanceEntry: Identifiable, Codable {
    let id: String
    let question: String
    let answer: String
    let category: String?
    let scripture_references: [GuidanceScripture]?

    enum CodingKeys: String, CodingKey {
        case id, question, answer, category, scripture_references
    }
}

struct GuidanceScripture: Codable, Identifiable {
    let id = UUID()
    let book: String?
    let chapter: Int?
    let verse: Int?
    let version: String?
    let text: String?

    enum CodingKeys: String, CodingKey {
        case book, chapter, verse, version, text
    }
}

struct GuidanceScreen: View {
    @State private var searchText = ""
    @State private var results: [GuidanceEntry] = []
    @State private var isLoading = false
    @State private var hasSearched = false
    @State private var errorMessage: String? = nil

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(spacing: 24) {
                VStack(spacing: 16) {
                    Image(systemName: "book.fill")
                        .font(.system(size: 48))
                        .foregroundColor(.appPrimary)
                        .padding()
                        .background(Color.appPrimary.opacity(0.1))
                        .clipShape(Circle())

                    Text("Biblical Guidance")
                        .font(.system(size: 28, weight: .bold))

                    Text("What do you need guidance on?")
                        .font(.system(size: 16))
                        .foregroundColor(.secondary)
                }
                .padding(.top, 8)

                HStack(spacing: 12) {
                    HStack {
                        Image(systemName: "magnifyingglass")
                            .foregroundColor(.secondary)
                        TextField("Ask anything... (e.g., How do I find peace?)", text: $searchText)
                            .font(.system(size: 15))
                            .onSubmit { performSearch() }
                    }
                    .padding(12)
                    .background(Color(UIColor.secondarySystemBackground))
                    .cornerRadius(12)

                    Button(action: performSearch) {
                        Text(isLoading ? "..." : "Search")
                            .font(.system(size: 15, weight: .semibold))
                            .foregroundColor(.white)
                            .padding(.horizontal, 16)
                            .padding(.vertical, 12)
                            .background(Color.appPrimary)
                            .cornerRadius(12)
                    }
                    .disabled(isLoading || searchText.trimmingCharacters(in: .whitespaces).isEmpty)
                }
                .padding(.horizontal)

                if isLoading {
                    ProgressView("Searching the Scriptures...")
                        .padding(40)
                } else if hasSearched {
                    if results.isEmpty {
                        VStack(spacing: 12) {
                            Image(systemName: "book.closed")
                                .font(.system(size: 32))
                                .foregroundColor(.secondary)
                            Text("No guidance found for \"\(searchText)\"")
                                .font(.system(size: 16))
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                            Text("Try different keywords or check back later.")
                                .font(.system(size: 13))
                                .foregroundColor(.secondary)
                                .multilineTextAlignment(.center)
                        }
                        .padding(32)
                        .background(Color(UIColor.secondarySystemBackground))
                        .cornerRadius(14)
                        .padding(.horizontal)
                    } else {
                        VStack(spacing: 16) {
                            ForEach(results) { result in
                                GuidanceResultCard(result: result)
                            }
                        }
                        .padding(.horizontal)
                    }
                }

                Spacer(minLength: 40)
            }
        }
        .navigationTitle("Guidance")
    }

    func performSearch() {
        let query = searchText.trimmingCharacters(in: .whitespaces)
        guard !query.isEmpty else { return }
        isLoading = true
        hasSearched = true

        let supabaseURL = Config.supabaseURL
        let anonKey = Config.supabaseAnonKey
        let terms = query.lowercased().split(separator: " ").filter { $0.count > 2 }.map(String.init)

        guard !terms.isEmpty else {
            isLoading = false
            results = []
            return
        }

        let filterParts = terms.map { "keywords.cs.{\($0)}" }.joined(separator: ",")
        let encodedFilter = filterParts.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        let urlString = "\(supabaseURL)/rest/v1/guidance_qa?or=\(encodedFilter)&select=*"

        guard let url = URL(string: urlString) else { isLoading = false; return }

        var request = URLRequest(url: url)
        request.setValue(anonKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(anonKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        URLSession.shared.dataTask(with: request) { data, _, _ in
            DispatchQueue.main.async {
                isLoading = false
                guard let data = data else { return }
                results = (try? JSONDecoder().decode([GuidanceEntry].self, from: data)) ?? []
            }
        }.resume()
    }
}

struct GuidanceResultCard: View {
    let result: GuidanceEntry

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(alignment: .top, spacing: 10) {
                Image(systemName: "heart.fill")
                    .foregroundColor(.appPrimary)
                    .font(.system(size: 16))
                Text(result.question)
                    .font(.system(size: 18, weight: .bold))
            }

            if let category = result.category {
                Text(category)
                    .font(.system(size: 11, weight: .bold))
                    .foregroundColor(.appPrimary)
                    .padding(.horizontal, 10)
                    .padding(.vertical, 4)
                    .background(Color.appPrimary.opacity(0.1))
                    .cornerRadius(8)
            }

            Text(result.answer)
                .font(.system(size: 14))
                .foregroundColor(.secondary)
                .lineSpacing(4)

            if let refs = result.scripture_references, !refs.isEmpty {
                VStack(alignment: .leading, spacing: 8) {
                    Text("Scripture References")
                        .font(.system(size: 14, weight: .semibold))

                    ForEach(refs) { ref in
                        VStack(alignment: .leading, spacing: 4) {
                            if let book = ref.book, let ch = ref.chapter, let v = ref.verse {
                                Text("\(book) \(ch):\(v) \(ref.version.map { "(\($0))" } ?? "")")
                                    .font(.system(size: 11, weight: .bold))
                                    .foregroundColor(.appPrimary)
                            }
                            if let text = ref.text {
                                Text("\"\(text)\"")
                                    .font(.system(size: 13))
                                    .italic()
                                    .foregroundColor(.secondary)
                                    .lineSpacing(3)
                            }
                        }
                        .padding(12)
                        .background(Color.appPrimary.opacity(0.06))
                        .cornerRadius(10)
                    }
                }
            }
        }
        .padding(16)
        .background(Color(UIColor.secondarySystemBackground))
        .cornerRadius(14)
    }
}

// ============================================================
// MARK: - Church Mentors Screen
// ============================================================

struct ChurchMentorsScreen: View {
    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(spacing: 24) {
                Image(systemName: "person.2.fill")
                    .font(.system(size: 56))
                    .foregroundColor(.appPrimary)
                    .padding()
                    .background(Color.appPrimary.opacity(0.1))
                    .clipShape(Circle())

                Text("Church Mentors")
                    .font(.system(size: 28, weight: .bold))

                Text("Connect with experienced believers who can guide you in your spiritual journey.")
                    .font(.system(size: 16))
                    .foregroundColor(.secondary)
                    .multilineTextAlignment(.center)
                    .lineSpacing(4)

                VStack(spacing: 16) {
                    Image(systemName: "clock.fill")
                        .font(.system(size: 32))
                        .foregroundColor(.secondary)
                    Text("Content Coming Soon")
                        .font(.system(size: 18, weight: .bold))
                    Text("We're building a network of trusted mentors. Check back soon.")
                        .font(.system(size: 14))
                        .foregroundColor(.secondary)
                        .multilineTextAlignment(.center)
                        .lineSpacing(4)
                }
                .frame(maxWidth: .infinity)
                .padding(40)
                .background(Color(UIColor.secondarySystemBackground))
                .cornerRadius(14)
            }
            .padding(24)
        }
        .navigationTitle("Church Mentors")
    }
}

// ============================================================
// MARK: - Hallowed Band Screen
// ============================================================

struct HallowedScreen: View {
    @EnvironmentObject var audio: AudioPlayerManager
    @State private var hallowedTracks: [MusicTrack] = []
    @State private var isLoading = false

    let releases: [(String, String)] = [
        ("Ashes to Light", "2024"),
        ("The Narrow Path", "2023"),
        ("Covenant", "2022"),
    ]

    let socialLinks: [(String, String, String)] = [
        ("Spotify", "music.note", "https://spotify.com"),
        ("Apple Music", "music.note.list", "https://music.apple.com"),
        ("Bandcamp", "waveform", "https://bandcamp.com"),
        ("Instagram", "camera", "https://instagram.com"),
        ("YouTube", "play.rectangle.fill", "https://youtube.com"),
    ]

    var body: some View {
        ScrollView(showsIndicators: true) {
            VStack(spacing: 0) {
                ZStack {
                    LinearGradient(
                        colors: [Color.black, Color(white: 0.06)],
                        startPoint: .top,
                        endPoint: .bottom
                    )

                    VStack(spacing: 20) {
                        ZStack {
                            Circle()
                                .stroke(Color.white.opacity(0.15), lineWidth: 1)
                                .frame(width: 120, height: 120)
                            Circle()
                                .stroke(Color.white.opacity(0.08), lineWidth: 1)
                                .frame(width: 100, height: 100)
                            VStack(spacing: 4) {
                                Rectangle()
                                    .fill(Color.white.opacity(0.6))
                                    .frame(width: 2, height: 40)
                                Rectangle()
                                    .fill(Color.white.opacity(0.6))
                                    .frame(width: 40, height: 2)
                            }
                        }

                        Text("HALLOWED")
                            .font(.system(size: 32, weight: .black, design: .default))
                            .tracking(8)
                            .foregroundColor(.white)

                        Text("Sacred Sound")
                            .font(.system(size: 14, weight: .light))
                            .tracking(4)
                            .foregroundColor(.white.opacity(0.6))

                        if !hallowedTracks.isEmpty {
                            VStack(spacing: 8) {
                                ForEach(hallowedTracks.prefix(3)) { track in
                                    Button(action: { audio.play(track: track) }) {
                                        HStack {
                                            Image(systemName: audio.currentTrack?.id == track.id && audio.isPlaying ? "pause.fill" : "play.fill")
                                                .font(.system(size: 12))
                                                .foregroundColor(.black)
                                                .frame(width: 28, height: 28)
                                                .background(Color.white)
                                                .clipShape(Circle())
                                            Text(track.title)
                                                .font(.system(size: 13, weight: .medium))
                                                .foregroundColor(.white)
                                            Spacer()
                                            Text(track.artist ?? "Hallowed")
                                                .font(.system(size: 11))
                                                .foregroundColor(.white.opacity(0.5))
                                        }
                                        .padding(.horizontal, 16)
                                        .padding(.vertical, 10)
                                        .background(Color.white.opacity(0.06))
                                        .cornerRadius(10)
                                    }
                                }
                            }
                            .padding(.horizontal, 20)
                        }
                    }
                    .padding(40)
                }

                VStack(alignment: .leading, spacing: 32) {
                    VStack(alignment: .leading, spacing: 14) {
                        hallowedSectionTitle("About")

                        Text("Hallowed emerged from the depths of spiritual questioning and exploration. We craft heavy, atmospheric soundscapes that wrestle with faith, doubt, and the eternal search for meaning in a chaotic world.")
                            .font(.system(size: 14))
                            .foregroundColor(Color(white: 0.7))
                            .lineSpacing(5)

                        Text("Our music blends crushing riffs with ethereal melodies, creating a worship experience that acknowledges both the light and the darkness. Every note is a prayer, every lyric a meditation on the divine mystery.")
                            .font(.system(size: 14))
                            .foregroundColor(Color(white: 0.7))
                            .lineSpacing(5)
                    }

                    VStack(alignment: .leading, spacing: 14) {
                        hallowedSectionTitle("Releases")

                        ForEach(releases, id: \.0) { release in
                            HStack {
                                ZStack {
                                    RoundedRectangle(cornerRadius: 8)
                                        .fill(Color(white: 0.1))
                                        .frame(width: 56, height: 56)
                                    Image(systemName: "music.note")
                                        .font(.system(size: 22))
                                        .foregroundColor(Color(white: 0.4))
                                }
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(release.0)
                                        .font(.system(size: 15, weight: .semibold))
                                        .foregroundColor(.white)
                                    Text(release.1)
                                        .font(.system(size: 12))
                                        .foregroundColor(Color(white: 0.5))
                                }
                                Spacer()
                            }
                        }
                    }

                    VStack(alignment: .leading, spacing: 14) {
                        hallowedSectionTitle("Connect")

                        VStack(spacing: 8) {
                            ForEach(socialLinks, id: \.0) { link in
                                if let url = URL(string: link.2) {
                                    Link(destination: url) {
                                        HStack {
                                            Image(systemName: link.1)
                                                .font(.system(size: 14))
                                                .foregroundColor(.white)
                                                .frame(width: 20)
                                            Text(link.0)
                                                .font(.system(size: 14, weight: .medium))
                                                .foregroundColor(.white)
                                            Spacer()
                                            Image(systemName: "arrow.up.right")
                                                .font(.system(size: 11))
                                                .foregroundColor(Color(white: 0.5))
                                        }
                                        .padding(.vertical, 12)
                                        .padding(.horizontal, 16)
                                        .background(Color(white: 0.08))
                                        .cornerRadius(10)
                                    }
                                }
                            }
                        }
                    }

                    Text("\"Make a joyful noise unto the Lord, all the earth: make a loud noise, and rejoice, and sing praise.\"")
                        .font(.system(size: 14))
                        .italic()
                        .foregroundColor(Color(white: 0.5))
                        .multilineTextAlignment(.center)
                        .frame(maxWidth: .infinity)

                    Text("Psalm 98:4")
                        .font(.system(size: 12, weight: .medium))
                        .foregroundColor(Color(white: 0.35))
                        .frame(maxWidth: .infinity)
                }
                .padding(24)
                .background(Color(red: 0.04, green: 0.04, blue: 0.06))
            }
        }
        .background(Color.black)
        .navigationTitle("Hallowed")
        .navigationBarTitleDisplayMode(.inline)
        .onAppear { loadHallowedTracks() }
    }

    @ViewBuilder
    func hallowedSectionTitle(_ title: String) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            Text(title.uppercased())
                .font(.system(size: 11, weight: .bold))
                .tracking(3)
                .foregroundColor(Color(white: 0.4))
            Rectangle()
                .fill(Color(white: 0.15))
                .frame(height: 1)
        }
    }

    func loadHallowedTracks() {
        let urlString = "\(Config.supabaseURL)/rest/v1/hallowed_tracks?select=*&order=created_at.desc&limit=5"
        guard let url = URL(string: urlString) else { return }
        var request = URLRequest(url: url)
        request.setValue(Config.supabaseAnonKey, forHTTPHeaderField: "apikey")
        request.setValue("Bearer \(Config.supabaseAnonKey)", forHTTPHeaderField: "Authorization")
        request.setValue("application/json", forHTTPHeaderField: "Accept")

        URLSession.shared.dataTask(with: request) { data, _, _ in
            DispatchQueue.main.async {
                guard let data = data else { return }
                hallowedTracks = (try? JSONDecoder().decode([MusicTrack].self, from: data)) ?? []
            }
        }.resume()
    }
}

// ============================================================
// END OF FILE
// ============================================================
// Replace "YOUR_SUPABASE_URL" and "YOUR_SUPABASE_ANON_KEY"
// with the values from your .env file:
//   VITE_SUPABASE_URL → Config.supabaseURL
//   VITE_SUPABASE_ANON_KEY → Config.supabaseAnonKey
// ============================================================
