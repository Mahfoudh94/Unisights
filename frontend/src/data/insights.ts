import type { Insight } from "@/types/sentiments";

/**
 * Retrieves all models from the database.
 * @returns A promise that resolves to an array of models.
 */
export const getAllInsights = () => {
  const data: Insight[] = [
    {
      post_text: "اخبار شوف سوف",
      timestamp: "2d",
      total_reactions: "1",
      positive_reaction_count: 1,
      negative_reaction_count: 0,
      engagement_sentiment: "Positive",
      text_sentiment: "NEUTRAL",
      text_sentiment_score: 0.0,
    },
    {
      post_text: "اعلان للراغبين في التحويل الى وكالة تشغيل ورقلة",
      timestamp: "3d",
      total_reactions: "0",
      positive_reaction_count: 0,
      negative_reaction_count: 0,
      engagement_sentiment: "NEUTRAL",
      text_sentiment: "NEUTRAL",
      text_sentiment_score: 0.0,
    },
    {
      post_text:
        "#كلية_علوم_الطبيعة_والحياة بمناسبة عيد الفطر المبارك، وفي أجواء يملؤها الفرح والبهجة شهدت صباح اليوم الأحد 06 أفريل 2025 كلية علوم الطبيعة والحياة لقاء معايدة ج… See more",
      timestamp: "3d",
      total_reactions: "1",
      positive_reaction_count: 1,
      negative_reaction_count: 0,
      engagement_sentiment: "Positive",
      text_sentiment: "POSITIVE",
      text_sentiment_score: 0.8,
    },
    {
      post_text:
        "نداء إلى الضمير الحي! في ظل المجازر اليومية التي يتعرض لها شعبنا في غزة، ووفاءً لقيمنا الإنسانية والأخلاقية، ندعو كل الطلبة، الأساتذة، والطاقم الإداري للمشاركة… See more",
      timestamp: "4d",
      total_reactions: "6",
      positive_reaction_count: 6,
      negative_reaction_count: 0,
      engagement_sentiment: "Positive",
      text_sentiment: "NEGATIVE",
      text_sentiment_score: -0.7,
    },
    {
      post_text:
        "نحتاج دعمكم من فضلكم يارب #انقذواغزة #انقذوافلسطين #افتحوامعبررفح… See more",
      timestamp: "1 April at 22:19",
      total_reactions: "1",
      positive_reaction_count: 1,
      negative_reaction_count: 0,
      engagement_sentiment: "Positive",
      text_sentiment: "NEGATIVE",
      text_sentiment_score: -0.6,
    },
    {
      post_text:
        "أقولها بكل حزن أن وزارة التعليم العالي والبحث العلمي، بشكلها الحالي، فقدت البوصلة كليًا. كنموذج هذا السؤال الشفوي الذي اتبعته بتقارير مفصلة ولقاءات متعددة، لكن… See more",
      timestamp: "31 March at 09:17",
      total_reactions: "4",
      positive_reaction_count: 4,
      negative_reaction_count: 0,
      engagement_sentiment: "Positive",
      text_sentiment: "NEGATIVE",
      text_sentiment_score: -0.8,
    },
    {
      post_text:
        "#_اليوم_الأول من برنامج ليالي نسك محاضرة بعنوان رحلتي إلى الجنة من تقديم الشيخ الدكتور #_عبد_الغني_حوبة بحضور مدير الإقامة #_سيف_الإسلام_مناعي في وسط مليء بالنفح… See more #جامعة_الشهيد_حمه_لخضر #القران #ليلةالقدر",
      timestamp: "29 March at 23:39",
      total_reactions: "1",
      positive_reaction_count: 1,
      negative_reaction_count: 0,
      engagement_sentiment: "Positive",
      text_sentiment: "POSITIVE",
      text_sentiment_score: 0.7,
    },
    {
      post_text:
        'الحلقة السادسة من برنامج "الرحلة الرمضانية - الإنتصار في رمضان" مع الدكتور عبد الغني حوبة، #الرحلة_الرمضانية #رمضان_2025 #جامعة_الشهيد_حمه_لخضر',
      timestamp: "29 March at 23:38",
      total_reactions: "2",
      positive_reaction_count: 2,
      negative_reaction_count: 0,
      engagement_sentiment: "Positive",
      text_sentiment: "NEUTRAL",
      text_sentiment_score: 0.0,
    },
  ];

  return data
};