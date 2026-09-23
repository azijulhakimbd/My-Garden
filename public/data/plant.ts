export type PlantCategory =
  | "ফলজ"
  | "সাইট্রাস"
  | "ঔষধি"
  | "মসলা"
  | "আম"
  | "ফুল";

export type PlantStatus =
  | "ফল হয়েছে"
  | "ফল হয়নি"
  | "ফুল হয়েছে"
  | "গাছ ছোট"
  | "গাছ মরে গেছে"
  | "ফুল এসেছে"
  | "ফল হয়েছে ও ফুল হয়েছে"
  | "গাছ ছোট ও ফল হয়নি"
  | "গাছ ছোট ও ফুল হয়েছে";

export type TimelineEventType =
  | "planted"
  | "growth"
  | "flowering"
  | "fruiting"
  | "purchase"
  | "note";

export interface PlantTimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: TimelineEventType;
}

export interface Plant {
  id: number;
  name: string;
  quantity: number;
  category: PlantCategory;

  /**
   * ব্যবহারকারীর দেওয়া রোপণের তারিখ/সাল
   */
  plantedDate: string;

  /**
   * ব্যবহারকারীর দেওয়া দাম
   */
  price?: number;

  /**
   * ফল/ফুল/বর্তমান অবস্থা
   */
  result?: string;

  /**
   * নার্সারি বা উৎস
   */
  nursery?: string;

  /**
   * অতিরিক্ত তথ্য
   */
  note?: string;

  /**
   * জাত/ভ্যারাইটি
   */
  variety?: string;

  /**
   * UI-এর জন্য icon
   */
  icon: string;

  /**
   * ছবি থাকলে এখানে path দিন।
   * যেমন: /images/plants/lichu.jpg
   */
  image?: string;

  /**
   * Timeline
   */
  timeline: PlantTimelineEvent[];
}

/* ---------------------------------------------------------
   Helper
--------------------------------------------------------- */

function createTimeline(
  id: number,
  plantedDate: string,
  name: string,
  result?: string,
): PlantTimelineEvent[] {
  const events: PlantTimelineEvent[] = [
    {
      id: 1,
      date: plantedDate,
      title: "রোপণ / সংগ্রহ",
      description: `${name} গাছটি ${plantedDate}-এ রোপণ বা সংগ্রহ করা হয়েছে।`,
      type: "planted",
    },
  ];

  if (result) {
    const normalized = result.toLowerCase();

    if (result.includes("ফুল")) {
      events.push({
        id: events.length + 1,
        date: "বর্তমান",
        title: "ফুলের তথ্য",
        description: `${name}: ${result}`,
        type: "flowering",
      });
    }

    if (result.includes("ফল")) {
      events.push({
        id: events.length + 1,
        date: "বর্তমান",
        title: "ফলের তথ্য",
        description: `${name}: ${result}`,
        type: "fruiting",
      });
    }

    if (
      normalized.includes("ছোট") ||
      normalized.includes("মরে গেছে")
    ) {
      events.push({
        id: events.length + 1,
        date: "বর্তমান",
        title: "বর্তমান অবস্থা",
        description: `${name}: ${result}`,
        type: "note",
      });
    }
  }

  return events;
}

/* ---------------------------------------------------------
   Plant Data
--------------------------------------------------------- */

export const plants: Plant[] = [
  {
    id: 1,
    name: "লিচু",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০০৮",
    result: "ফল হয়েছে",
    icon: "🍒",
    image: "/images/plants/lichu.jpg",
    timeline: createTimeline(1, "২০০৮", "লিচু", "ফল হয়েছে"),
  },

  {
    id: 2,
    name: "নারিকেল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০০৮",
    result: "চারা লাগানো, ফল হয়েছে",
    icon: "🥥",
    image: "/images/plants/coconut.jpg",
    timeline: createTimeline(
      2,
      "২০০৮",
      "নারিকেল",
      "চারা লাগানো, ফল হয়েছে",
    ),
  },

  {
    id: 3,
    name: "আম",
    quantity: 8,
    category: "আম",
    plantedDate: "২০০৮",
    result: "ফল হয়েছে",
    icon: "🥭",
    image: "/images/plants/mango.jpg",
    timeline: createTimeline(3, "২০০৮", "আম", "ফল হয়েছে"),
  },

  {
    id: 4,
    name: "কাঁঠাল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০০৮",
    result: "চারা লাগানো, ফল হয়েছে",
    icon: "🍈",
    image: "/images/plants/jackfruit.jpg",
    timeline: createTimeline(
      4,
      "২০০৮",
      "কাঁঠাল",
      "চারা লাগানো, ফল হয়েছে",
    ),
  },

  {
    id: 5,
    name: "চালতা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০১০",
    result: "ফল হয়েছে",
    icon: "🌳",
    image: "/images/plants/chalta.jpg",
    timeline: createTimeline(5, "২০১০", "চালতা", "ফল হয়েছে"),
  },

  {
    id: 6,
    name: "তাল গাছ",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০১৩",
    result: "ফল হয়নি, গাছ ছোট",
    icon: "🌴",
    image: "/images/plants/tal.jpg",
    timeline: createTimeline(
      6,
      "২০১৩",
      "তাল গাছ",
      "ফল হয়নি, গাছ ছোট",
    ),
  },

  {
    id: 7,
    name: "খেজুর",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০১৫",
    result: "বীজ থেকে হয়েছে, ফল হয়েছে",
    icon: "🌴",
    image: "/images/plants/date.jpg",
    timeline: createTimeline(
      7,
      "২০১৫",
      "খেজুর",
      "বীজ থেকে হয়েছে, ফল হয়েছে",
    ),
  },

  {
    id: 8,
    name: "কলা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০১৬",
    result: "চারা লাগানো, ফল হয়েছে",
    icon: "🍌",
    image: "/images/plants/banana.jpg",
    timeline: createTimeline(
      8,
      "২০১৬",
      "কলা",
      "চারা লাগানো, ফল হয়েছে",
    ),
  },

  {
    id: 9,
    name: "আমড়া",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০২১",
    price: 50,
    result: "ফল হয়েছে",
    icon: "🌳",
    image: "/images/plants/amra.jpg",
    timeline: createTimeline(9, "২০২১", "আমড়া", "ফল হয়েছে"),
  },

  {
    id: 10,
    name: "বেল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০২২",
    result: "বীজ থেকে হয়েছে, ফল হয়নি",
    icon: "🍈",
    image: "/images/plants/bel.jpg",
    timeline: createTimeline(
      10,
      "২০২২",
      "বেল",
      "বীজ থেকে হয়েছে, ফল হয়নি",
    ),
  },

  {
    id: 11,
    name: "কাঠ বাদাম",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২২ আগস্ট ২০২২",
    price: 125,
    result: "ফুল এসেছে কিন্তু ফল হয় নি",
    nursery: "শাহিন নার্সারি",
    icon: "🌳",
    image: "/images/plants/kat-badam.jpg",
    timeline: createTimeline(
      11,
      "২২ আগস্ট ২০২২",
      "কাঠ বাদাম",
      "ফুল এসেছে কিন্তু ফল হয় নি",
    ),
  },

  {
    id: 12,
    name: "অরবরই",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "সেপ্টেম্বর ২০২২",
    price: 50,
    result: "ফল হয়নি",
    icon: "🌿",
    image: "/images/plants/arboroi.jpg",
    timeline: createTimeline(
      12,
      "সেপ্টেম্বর ২০২২",
      "অরবরই",
      "ফল হয়নি",
    ),
  },

  {
    id: 13,
    name: "কাগছি লেবু",
    quantity: 1,
    category: "সাইট্রাস",
    plantedDate: "২০২৩",
    price: 20,
    result: "ফল হয়েছে",
    icon: "🍋",
    image: "/images/plants/lemon.jpg",
    timeline: createTimeline(
      13,
      "২০২৩",
      "কাগছি লেবু",
      "ফল হয়েছে",
    ),
  },

  {
    id: 14,
    name: "বল সুন্দরী",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০২৪",
    price: 60,
    result: "ফল হয়েছে",
    icon: "🌳",
    image: "/images/plants/bol-sundori.jpg",
    timeline: createTimeline(
      14,
      "২০২৪",
      "বল সুন্দরী",
      "ফল হয়েছে",
    ),
  },

  {
    id: 15,
    name: "পেঁপে",
    quantity: 2,
    category: "ফলজ",
    plantedDate: "২০২৫",
    price: 30,
    result: "ফল হয়েছে",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🥭",
    image: "/images/plants/papaya.jpg",
    timeline: createTimeline(
      15,
      "২০২৫",
      "পেঁপে",
      "ফল হয়েছে",
    ),
  },

  {
    id: 16,
    name: "নিম",
    quantity: 1,
    category: "ঔষধি",
    plantedDate: "২০২৫",
    price: 40,
    result: "গাছ ছোট",
    nursery: "স্মৃতি নার্সারি, বনকালী",
    icon: "🌿",
    image: "/images/plants/neem.jpg",
    timeline: createTimeline(
      16,
      "২০২৫",
      "নিম",
      "গাছ ছোট",
    ),
  },

  {
    id: 17,
    name: "বিনা ১ লেবু",
    quantity: 2,
    category: "সাইট্রাস",
    plantedDate: "২০২৫",
    price: 0,
    result: "ফল হয়নি, গাছ ছোট",
    nursery: "বিনা, নালিতাবাড়ী উপকেন্দ্র",
    note: "বিনা ১ লেবুর চারা বিনামূল্যে সংগ্রহ করা হয়েছে।",
    icon: "🍋",
    image: "/images/plants/bina-lemon.jpg",
    timeline: createTimeline(
      17,
      "২০২৫",
      "বিনা ১ লেবু",
      "ফল হয়নি, গাছ ছোট",
    ),
  },

  {
    id: 18,
    name: "আতাফল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০২৫",
    price: 50,
    result: "গাছ মরে গেছে",
    icon: "🌳",
    image: "/images/plants/ata.jpg",
    timeline: createTimeline(
      18,
      "২০২৫",
      "আতাফল",
      "গাছ মরে গেছে",
    ),
  },

  {
    id: 19,
    name: "লটকন",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "বৃক্ষ মেলা ২০২৫, শেরপুর",
    price: 60,
    result: "গাছ ছোট, গাছ মরে গেছে",
    icon: "🌳",
    image: "/images/plants/lotkon.jpg",
    timeline: createTimeline(
      19,
      "বৃক্ষ মেলা ২০২৫, শেরপুর",
      "লটকন",
      "গাছ ছোট, গাছ মরে গেছে",
    ),
  },

  {
    id: 20,
    name: "করমচা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "বৃক্ষ মেলা ২০২৫, শেরপুর",
    price: 50,
    result: "গাছ ছোট, ফল হয়নি",
    icon: "🌿",
    image: "/images/plants/koromcha.jpg",
    timeline: createTimeline(
      20,
      "বৃক্ষ মেলা ২০২৫, শেরপুর",
      "করমচা",
      "গাছ ছোট, ফল হয়নি",
    ),
  },

  {
    id: 21,
    name: "তেজপাতা",
    quantity: 1,
    category: "মসলা",
    plantedDate: "বৃক্ষ মেলা ২০২৫, শেরপুর",
    price: 40,
    result: "গাছ ছোট",
    icon: "🌿",
    image: "/images/plants/tej-pata.jpg",
    timeline: createTimeline(
      21,
      "বৃক্ষ মেলা ২০২৫, শেরপুর",
      "তেজপাতা",
      "গাছ ছোট",
    ),
  },

  {
    id: 22,
    name: "আনার",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "সেপ্টেম্বর ২০২৫",
    price: 230,
    result: "ফল হয়েছে",
    icon: "🍎",
    image: "/images/plants/pomegranate.jpg",
    timeline: createTimeline(
      22,
      "সেপ্টেম্বর ২০২৫",
      "আনার",
      "ফল হয়েছে",
    ),
  },

  {
    id: 23,
    name: "অ্যাপল বরই",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "সেপ্টেম্বর ২০২৫",
    price: 230,
    result: "গাছ ছোট, ফল হয়নি",
    note: "মূল তালিকায় দাম 'ঐ' হিসেবে দেওয়া ছিল।",
    icon: "🍏",
    image: "/images/plants/apple-boroi.jpg",
    timeline: createTimeline(
      23,
      "সেপ্টেম্বর ২০২৫",
      "অ্যাপল বরই",
      "গাছ ছোট, ফল হয়নি",
    ),
  },

  {
    id: 24,
    name: "পেয়ারা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "সেপ্টেম্বর ২০২৫",
    price: 230,
    result: "ফল হয়েছে",
    note: "মূল তালিকায় দাম 'ঐ' হিসেবে দেওয়া ছিল।",
    icon: "🍐",
    image: "/images/plants/guava.jpg",
    timeline: createTimeline(
      24,
      "সেপ্টেম্বর ২০২৫",
      "পেয়ারা",
      "ফল হয়েছে",
    ),
  },

  {
    id: 25,
    name: "খয়েরি পেয়ারা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "সেপ্টেম্বর ২০২৫",
    price: 230,
    result: "ফল হয়েছে",
    note: "মূল তালিকায় দাম 'ঐ' হিসেবে দেওয়া ছিল।",
    icon: "🍐",
    image: "/images/plants/brown-guava.jpg",
    timeline: createTimeline(
      25,
      "সেপ্টেম্বর ২০২৫",
      "খয়েরি পেয়ারা",
      "ফল হয়েছে",
    ),
  },

  {
    id: 26,
    name: "হিম সাগর আম",
    quantity: 1,
    category: "আম",
    plantedDate: "অক্টোবর ২০২৫",
    price: 100,
    result: "ফল হয়নি",
    nursery: "চান মিয়া, গোজাকুড়া",
    variety: "হিম সাগর",
    icon: "🥭",
    image: "/images/plants/himsagar.jpg",
    timeline: createTimeline(
      26,
      "অক্টোবর ২০২৫",
      "হিম সাগর আম",
      "ফল হয়নি",
    ),
  },

  {
    id: 27,
    name: "বারি ১ মাল্টা",
    quantity: 1,
    category: "সাইট্রাস",
    plantedDate: "২০২৬",
    price: 110,
    result: "ফল হয়নি",
    icon: "🍊",
    image: "https://i.postimg.cc/P5S0y7z2/IMG-20260913-134741-350-jpg.jpg",
    timeline: createTimeline(
      27,
      "২০২৬",
      "বারি ১ মাল্টা",
      "ফল হয়নি",
    ),
  },

  {
    id: 28,
    name: "থাই সফেদা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০২৬",
    price: 150,
    result: "ফল হয়েছে",
    nursery: "মুক্তা নার্সারি, বনগাঁও নয়াপাড়া",
    icon: "🌳",
    image: "/images/plants/thai-safeda.jpg",
    timeline: createTimeline(
      28,
      "২০২৬",
      "থাই সফেদা",
      "ফল হয়েছে",
    ),
  },

  {
    id: 29,
    name: "আঙ্গুর",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২০২৬",
    price: 100,
    result: "গাছ মরে গেছে",
    nursery: "স্মৃতি নার্সারি, বনকালী",
    icon: "🍇",
    image: "/images/plants/grape.jpg",
    timeline: createTimeline(
      29,
      "২০২৬",
      "আঙ্গুর",
      "গাছ মরে গেছে",
    ),
  },

  {
    id: 30,
    name: "কাটিমন আম",
    quantity: 1,
    category: "আম",
    plantedDate: "জুন ২০২৬",
    price: 100,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    variety: "কাটিমন",
    icon: "🥭",
    image: "/images/plants/katimon.jpg",
    timeline: createTimeline(
      30,
      "জুন ২০২৬",
      "কাটিমন আম",
      "গাছ ছোট",
    ),
  },

  {
    id: 31,
    name: "কদ বেল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "জুন ২০২৬",
    price: 100,
    result: "গাছ ছোট",
    nursery: "স্মৃতি নার্সারি, বনকালী",
    icon: "🍈",
    image: "/images/plants/kod-bel.jpg",
    timeline: createTimeline(
      31,
      "জুন ২০২৬",
      "কদ বেল",
      "গাছ ছোট",
    ),
  },

  {
    id: 32,
    name: "গোলাপজাম",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "জুন ২০২৬",
    price: 100,
    result: "গাছ ছোট",
    nursery: "স্মৃতি নার্সারি, বনকালী",
    icon: "🌳",
    image: "/images/plants/golap-jam.jpg",
    timeline: createTimeline(
      32,
      "জুন ২০২৬",
      "গোলাপজাম",
      "গাছ ছোট",
    ),
  },

  {
    id: 33,
    name: "চাইনা পেয়ারা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "১৭ জুলাই ২০২৬",
    price: 50,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🍐",
    image: "/images/plants/china-guava.jpg",
    timeline: createTimeline(
      33,
      "১৭ জুলাই ২০২৬",
      "চাইনা পেয়ারা",
      "গাছ ছোট",
    ),
  },

  {
    id: 34,
    name: "শরিফা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২৮ জুলাই ২০২৬",
    price: 120,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🌳",
    image: "/images/plants/sharifa.jpg",
    timeline: createTimeline(
      34,
      "২৮ জুলাই ২০২৬",
      "শরিফা",
      "গাছ ছোট",
    ),
  },

  {
    id: 35,
    name: "ভিয়েতনামি মাল্টা বারোমাসি",
    quantity: 1,
    category: "সাইট্রাস",
    plantedDate: "১০ আগস্ট ২০২৬",
    price: 170,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🍊",
    image: "https://i.postimg.cc/XYjTwWFm/IMG-20260913-134744-942-jpg.jpg",
    timeline: createTimeline(
      35,
      "১০ আগস্ট ২০২৬",
      "ভিয়েতনামি মাল্টা বারোমাসি",
      "গাছ ছোট",
    ),
  },

  {
    id: 36,
    name: "টগর",
    quantity: 1,
    category: "ফুল",
    plantedDate: "১০ আগস্ট ২০২৬",
    price: 30,
    result: "গাছ ছোট, ফুল হয়েছে",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🌼",
    image: "https://i.postimg.cc/kgTLsHv7/IMG-20260913-134708-324-jpg.jpg",
    timeline: createTimeline(
      36,
      "১০ আগস্ট ২০২৬",
      "টগর",
      "গাছ ছোট, ফুল হয়েছে",
    ),
  },

  {
    id: 37,
    name: "গুটি কলম লটকন",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২২ আগস্ট ২০২৬",
    price: 100,
    result: "গাছ ছোট",
    icon: "🌳",
    image: "/images/plants/guti-lotkon.jpg",
    timeline: createTimeline(
      37,
      "২২ আগস্ট ২০২৬",
      "গুটি কলম লটকন",
      "গাছ ছোট",
    ),
  },

  {
    id: 38,
    name: "লংগন",
    quantity: 2,
    category: "ফলজ",
    plantedDate: "২২ আগস্ট ২০২৬",
    price: 60,
    result: "গাছ ছোট, ফুল",
    note: "মূল তালিকায় 'ফুল' উল্লেখ করা হয়েছে।",
    icon: "🌳",
    image: "/images/plants/longan.jpg",
    timeline: createTimeline(
      38,
      "২২ আগস্ট ২০২৬",
      "লংগন",
      "গাছ ছোট, ফুল",
    ),
  },

  {
    id: 39,
    name: "চায়না মিষ্টি কমলা",
    quantity: 1,
    category: "সাইট্রাস",
    plantedDate: "২৪ আগস্ট ২০২৬",
    price: 200,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🍊",
    image: "https://i.postimg.cc/sgTbmL9H/IMG-20260913-134756-516-jpg.jpg",
    timeline: createTimeline(
      39,
      "২৪ আগস্ট ২০২৬",
      "চায়না মিষ্টি কমলা",
      "গাছ ছোট",
    ),
  },

  {
    id: 40,
    name: "মিষ্টি তেঁতুল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "৩০ আগস্ট ২০২৬",
    price: 80,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🌳",
    image: "/images/plants/sweet-tamarind.jpg",
    timeline: createTimeline(
      40,
      "৩০ আগস্ট ২০২৬",
      "মিষ্টি তেঁতুল",
      "গাছ ছোট",
    ),
  },

  {
    id: 41,
    name: "টগর",
    quantity: 1,
    category: "ফুল",
    plantedDate: "৩০ আগস্ট ২০২৬",
    price: 30,
    result: "ফুল হয়েছে",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🌼",
    image: "",
    timeline: createTimeline(
      41,
      "৩০ আগস্ট ২০২৬",
      "টগর",
      "ফুল হয়েছে",
    ),
  },

  {
    id: 42,
    name: "আতা ফল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "৩১ আগস্ট ২০২৬",
    price: 50,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🌳",
    image: "/images/plants/ata.jpg",
    timeline: createTimeline(
      42,
      "৩১ আগস্ট ২০২৬",
      "আতা ফল",
      "গাছ ছোট",
    ),
  },

  {
    id: 43,
    name: "বাইকুনুর আঙ্গুর",
    quantity: 2,
    category: "ফলজ",
    plantedDate: "৬ সেপ্টেম্বর ২০২৬",
    price: 170,
    result: "গাছ ছোট",
    nursery: "মুক্তা নার্সারি, বনগাঁও নয়াপাড়া",
    variety: "বাইকুনুর",
    icon: "🍇",
    image: "/images/plants/baikonur-grape.jpg",
    timeline: createTimeline(
      43,
      "৬ সেপ্টেম্বর ২০২৬",
      "বাইকুনুর আঙ্গুর",
      "গাছ ছোট",
    ),
  },

  {
    id: 44,
    name: "লাল জামরুল",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "৭ সেপ্টেম্বর ২০২৬",
    price: 150,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🍎",
    image: "/images/plants/red-jamrul.jpg",
    timeline: createTimeline(
      44,
      "৭ সেপ্টেম্বর ২০২৬",
      "লাল জামরুল",
      "গাছ ছোট",
    ),
  },

  {
    id: 45,
    name: "কামরাঙ্গা",
    quantity: 1,
    category: "ফলজ",
    plantedDate: "২১ সেপ্টেম্বর ২০২৬",
    price: 150,
    result: "ফল হয়েছে, ফুল হয়েছে",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "⭐",
    image: "/images/plants/carambola.jpg",
    timeline: createTimeline(
      45,
      "২১ সেপ্টেম্বর ২০২৬",
      "কামরাঙ্গা",
      "ফল হয়েছে, ফুল হয়েছে",
    ),
  },

  {
    id: 46,
    name: "বাগান বিলাস",
    quantity: 1,
    category: "ফুল",
    plantedDate: "২১ সেপ্টেম্বর ২০২৬",
    price: 40,
    result: "গাছ ছোট",
    nursery: "চান মিয়া, গোজাকুড়া",
    icon: "🌸",
    image: "/images/plants/bougainvillea.jpg",
    timeline: createTimeline(
      46,
      "২১ সেপ্টেম্বর ২০২৬",
      "বাগান বিলাস",
      "গাছ ছোট",
    ),
  },
];

/* ---------------------------------------------------------
   Garden Statistics
--------------------------------------------------------- */

export const totalPlantVarieties = plants.length;

export const totalPlants = plants.reduce(
  (total, plant) => total + plant.quantity,
  0,
);

export const totalCost = plants.reduce(
  (total, plant) =>
    total + (plant.price ?? 0) * plant.quantity,
  0,
);

export const categories = Array.from(
  new Set(plants.map((plant) => plant.category)),
);

export const totalCategories = categories.length;

export const fruitingPlants = plants.filter((plant) =>
  plant.result?.includes("ফল হয়েছে"),
);

export const floweringPlants = plants.filter((plant) =>
  plant.result?.includes("ফুল"),
);

export const smallPlants = plants.filter((plant) =>
  plant.result?.includes("গাছ ছোট"),
);

export const deadPlants = plants.filter((plant) =>
  plant.result?.includes("মরে গেছে"),
);