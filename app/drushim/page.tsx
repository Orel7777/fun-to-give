"use client";

import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import Link from "next/link"

export default function JobPostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-gray-800">כרי לתת - בניית אתר</h1>
            <Button
              variant="outline"
              className="bg-cyan-100 border-cyan-300 text-cyan-700 hover:bg-cyan-200 rounded-full px-6"
            >
              שתף
            </Button>
          </div>
          <div className="text-sm text-gray-500">✓ אתר זה נבנה ברמת נגישות מיטבית</div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              <strong>קפקים</strong> - שמעניינים לתת זו דחרות טכלי המיון.
            </p>
            <p>
              <strong>קפקים</strong> - שמעניינים לעשות הנחה משמעותית למגון ומצירים שונים שיכולים להחזיאים לכלי המיון
              הקיימים.
            </p>
            <p>
              <strong>מתנדבים</strong> - שרוצים לקחת חלק באירית טכלי המיון ובתכלוקה.
            </p>
            <p>
              <strong>צלמות</strong> - שמעניינו לצלם את פעילות העמותה.
            </p>
            <p>
              <strong>בעלי רכבים גדולים</strong> - שמעניינים לעזור בשינוע טכלי המיון.
            </p>
            <p>
              <strong>מנהלת ותכנון מדיה חברתית ופרסום העמותה, מנהלת קמפיינים לתרומות ברשת.</strong>
            </p>
            <p>שכבל מודעת יופיע מה שרשמנו למעלה. (אין צורך בקורות חיים, אבל במקום קורות חיים אפשר להשאיר פנייה.)</p>
          </div>
        </div>

        {/* Job Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 - Teal */}
          <Card className="bg-teal-500 text-white p-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">מה זה אומר? מתנדבים שמעניינים להתנדב</h3>
              <div className="text-sm space-y-2">
                <p>• מתנדבים שמעניינים להתנדב בפעילויות השונות של העמותה</p>
                <p>• מתנדבים שרוצים לעזור בארגון אירועים</p>
                <p>• מתנדבים שמעניינים לעזור בפעילויות חברתיות</p>
                <p>• מתנדבים שרוצים לקחת חלק בפרויקטים מיוחדים</p>
                <p>• מתנדבים שמעניינים לעזור בתחום הטכנולוגיה</p>
              </div>
              <Button variant="secondary" className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6">
                פרטים
              </Button>
            </div>
          </Card>

          {/* Card 2 - Yellow */}
          <Card className="bg-yellow-400 text-black p-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">הגדלת המעורבות של הקהל</h3>
              <div className="text-sm space-y-2">
                <p>• יצירת תוכן מעניין ורלוונטי לקהל היעד</p>
                <p>• פיתוח אסטרטגיות שיווק דיגיטלי</p>
                <p>• ניהול רשתות חברתיות בצורה מקצועית</p>
                <p>• יצירת קמפיינים יעילים לגיוס תרומות</p>
                <p>• מדידה וניתוח של תוצאות הפעילות</p>
              </div>
              <Button variant="secondary" className="bg-teal-500 text-white hover:bg-teal-600 rounded-full px-6">
                פרטים
              </Button>
            </div>
          </Card>

          {/* Card 3 - Teal */}
          <Card className="bg-teal-500 text-white p-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg">בניית אתר האינטרנט החדש</h3>
              <div className="text-sm space-y-2">
                <p>• עיצוב ופיתוח אתר מודרני ונגיש</p>
                <p>• התאמה למכשירים ניידים</p>
                <p>• אופטימיזציה למנועי חיפוש</p>
                <p>• יצירת חוויית משתמש מעולה</p>
                <p>• אינטגרציה עם מערכות קיימות</p>
              </div>
              <Button variant="secondary" className="bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6">
                פרטים
              </Button>
            </div>
          </Card>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Button variant="outline" asChild>
            <Link href="/">חזרה לרשימת המשרות</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
