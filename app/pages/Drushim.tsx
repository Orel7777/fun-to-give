'use client';

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"
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
          {/* Card template repeated to make 6 cards as in the image */}
          <Card className="p-0 shadow-sm">
            <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 text-right font-semibold">
              מנהל/ת משאבי אנוש ותפעול
            </div>
            <div className="p-4 text-right space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-end gap-2">
                  <span>משרה מלאה</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>מרכז, ת"א</span>
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full">הגשת מועמדות</Button>
            </div>
          </Card>

          <Card className="p-0 shadow-sm">
            <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 text-right font-semibold">
              רכז/ת פעילות – פרויקטים לקראת ראש השנה
            </div>
            <div className="p-4 text-right space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-end gap-2">
                  <span>משרה מלאה</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>מרכז, ת"א</span>
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full">הגשת מועמדות</Button>
            </div>
          </Card>

          <Card className="p-0 shadow-sm">
            <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 text-right font-semibold">
              מנהל/ת אזור קריות ועמקים
            </div>
            <div className="p-4 text-right space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-end gap-2">
                  <span>משרה מלאה</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>צפון הארץ</span>
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full">הגשת מועמדות</Button>
            </div>
          </Card>

          <Card className="p-0 shadow-sm">
            <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 text-right font-semibold">
              רכז/ת חוויית המתנדב
            </div>
            <div className="p-4 text-right space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-end gap-2">
                  <span>משרה חלקית</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>מרכז, ת"א</span>
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full">הגשת מועמדות</Button>
            </div>
          </Card>

          <Card className="p-0 shadow-sm">
            <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 text-right font-semibold">
              רכז/ת קשרי עמותות (רו"ד)
            </div>
            <div className="p-4 text-right space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-end gap-2">
                  <span>משרה מלאה</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>מרכז, ת"א</span>
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full">הגשת מועמדות</Button>
            </div>
          </Card>

          <Card className="p-0 shadow-sm">
            <div className="bg-blue-600 text-white rounded-t-lg px-4 py-3 text-right font-semibold">
              רכז/ת הדרכה וחוו"י למתנדבים
            </div>
            <div className="p-4 text-right space-y-4">
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-end gap-2">
                  <span>משרה חלקית</span>
                  <Clock className="h-4 w-4 text-gray-500" />
                </div>
                <div className="flex items-center justify-end gap-2">
                  <span>הילולת רשב"י, מירון</span>
                  <MapPin className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <Button variant="outline" className="w-full rounded-full">הגשת מועמדות</Button>
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
