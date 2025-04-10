import {
  BreadcrumbMaker,
  type BreadcrumbType,
} from "@/components/breadcrumb-maker";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { currentUser } from "@/server/auth";
import { notFound } from "next/navigation";
import { columns } from "./columns";
import type { Insight } from "@/types/sentiments";
import { ReactionChart } from "./sentiments-overview";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageSquare,
  ThumbsDown,
  ThumbsUp,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

// Breadcrumb items for navigation
const breadcrumbItems: BreadcrumbType[] = [
  { title: "Dashboard", href: "/dashboard", disabled: false, type: "link" },
  { title: "Sentiment", disabled: false, type: "text" },
];

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

export default async function SentimentsPage() {
  // Get current user
  const user = await currentUser();

  if (!user) return notFound();
  const totalPosts = data.length;
  const totalReactions = data.reduce(
    (sum, item) => sum + Number.parseInt(item.total_reactions || "0"),
    0,
  );
  const totalPositiveReactions = data.reduce(
    (sum, item) => sum + item.positive_reaction_count,
    0,
  );
  const totalNegativeReactions = data.reduce(
    (sum, item) => sum + item.negative_reaction_count,
    0,
  );

  // Calculate sentiment distribution
  const positiveTextCount = data.filter(
    (item) => item.text_sentiment === "POSITIVE",
  ).length;
  const neutralTextCount = data.filter(
    (item) => item.text_sentiment === "NEUTRAL",
  ).length;
  const negativeTextCount = data.filter(
    (item) => item.text_sentiment === "NEGATIVE",
  ).length;

  // Calculate average sentiment score
  const avgSentimentScore =
    data.reduce((sum, item) => sum + item.text_sentiment_score, 0) / totalPosts;

  return (
    <div className="flex-1 space-y-4 p-5">
      <BreadcrumbMaker items={breadcrumbItems} />

      <div className="flex justify-between">
        <div className="space-y-4">
          <Heading
            title="Sentiment Overview"
            description="Explore the sentiment analysis."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="overflow-hidden border-none bg-gradient-to-br from-emerald-50 to-white shadow-md dark:from-emerald-950/20 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <ThumbsUp className="h-5 w-5 text-emerald-500" />
              Positive Reactions
            </CardTitle>
            <CardDescription>Total positive engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                {totalPositiveReactions}
              </div>
              <div className="flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="mr-1 h-4 w-4" />
                {Math.round((totalPositiveReactions / totalReactions) * 100)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-rose-50 to-white shadow-md dark:from-rose-950/20 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <ThumbsDown className="h-5 w-5 text-rose-500" />
              Negative Reactions
            </CardTitle>
            <CardDescription>Total negative engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-rose-600 dark:text-rose-400">
                {totalNegativeReactions}
              </div>
              <div className="flex items-center text-sm font-medium text-rose-600 dark:text-rose-400">
                <TrendingDown className="mr-1 h-4 w-4" />
                {Math.round((totalNegativeReactions / totalReactions) * 100)}%
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-none bg-gradient-to-br from-sky-50 to-white shadow-md dark:from-sky-950/20 dark:to-background">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg font-medium">
              <MessageSquare className="h-5 w-5 text-sky-500" />
              Content Sentiment
            </CardTitle>
            <CardDescription>Average sentiment score</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div className="text-3xl font-bold text-sky-600 dark:text-sky-400">
                {avgSentimentScore.toFixed(2)}
              </div>
              <div className="flex items-center text-sm font-medium text-sky-600 dark:text-sky-400">
                {avgSentimentScore >= 0 ? (
                  <TrendingUp className="mr-1 h-4 w-4" />
                ) : (
                  <TrendingDown className="mr-1 h-4 w-4" />
                )}
                {avgSentimentScore >= 0.5
                  ? "Very Positive"
                  : avgSentimentScore > 0
                    ? "Slightly Positive"
                    : avgSentimentScore === 0
                      ? "Neutral"
                      : avgSentimentScore > -0.5
                        ? "Slightly Negative"
                        : "Very Negative"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <ReactionChart />
      <DataTable columns={columns} data={data} filterColumn="post_text" />
    </div>
  );
}
