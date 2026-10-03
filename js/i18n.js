/* ------------------------------------------------------------------
   Main Marks — English / Arabic for the whole app (build 92).

   Muhanad, 2026-10-03: "the app [must be] bi-language, having Arabic
   exactly how we have it in Qomor and Ayyam", and the WhatsApp post and
   the offer PDF come out in the language the app is in. So this is the
   CCR Development App's js/i18n.js (Ayyam), for Main Marks.

   HOW IT WORKS
   - The key IS the English text: MM.t('Choose a building'). A string with
     values has {placeholders}: MM.t('Building {b}', { b: 'E' }). So the
     English app reads exactly as before, and scripts/check-i18n.js finds
     every key in the code and fails when one has no Arabic.
   - A key with no Arabic falls back to the English and says so ONCE in the
     console: a missing translation shows English, never a blank.
   - Values put into an Arabic sentence (numbers, unit codes, "20%") are
     wrapped in a first-strong isolate, or bidi reorders them: "20%" reads
     "%20" and "13 Sep 2026" loses its order (playbook 01, Phase 5).
   - The sheet's own words (floors, types, statuses), building names and
     plan names go through MM.tx, from the English the sheet holds.
   - Static text in the pages carries data-t (text), data-t-html (markup we
     wrote), data-t-ph (placeholder) or data-t-aria (aria-label).

   WHICH LANGUAGE
   - ?lang=ar or ?lang=en applies to THIS VISIT ONLY and is never stored:
     on Qomor a stored ?lang pinned a phone to one language for good.
   - Only a tap on the switch is remembered (localStorage, per device).
   - Switching reloads the page, so no half-translated screen can exist.

   NOT TRANSLATED, on purpose: Main Marks' drawings, brochure renders and
   logos, the brand names (Main Marks, Moray, Moray Wellness, The Fourth,
   R- Residence, h:rs), building letters and unit codes, brokerage names,
   and technical error detail. Figures stay Western digits in both
   languages, as Main Marks' own sheets and the sales teams' posts do.

   THE ARABIC IS OURS, not Main Marks' (there is no Arabic Moray brochure):
   Main Marks' sales team should review it.
   ------------------------------------------------------------------ */
(function (root) {
  'use strict';
  var MM = root.MM || (root.MM = {});
  var KEY = 'mm.lang';

  var fromUrl = null;
  try { fromUrl = new URLSearchParams(root.location.search).get('lang'); } catch (e) { /* old browser */ }
  var stored = null;
  try { stored = root.localStorage.getItem(KEY); } catch (e) { /* private mode */ }
  var lang = fromUrl === 'ar' || fromUrl === 'en' ? fromUrl : (stored === 'ar' ? 'ar' : 'en');
  var AR_ON = lang === 'ar';
  if (root.document && document.documentElement) {
    document.documentElement.lang = lang;
    document.documentElement.dir = AR_ON ? 'rtl' : 'ltr';
  }

  /* ---- the Arabic, keyed by the English ---------------------------- */
  var AR = {
    /* ---- the pages' own text ---- */
    'Access granted': 'تم السماح بالدخول',
    'Select a project': 'اختر مشروعاً',
    'Main Marks — all projects': 'Main Marks — كل المشروعات',
    'Progress': 'التقدم',
    'Project': 'المشروع',
    'Building & unit': 'المبنى والوحدة',
    'Offer': 'العرض',
    'Choose a project': 'اختر مشروعاً',
    'Marks of<br>Distinction<span class="dot">.</span>': 'علامات<br>التميّز<span class="dot">.</span>',
    'Moray is open. Building and unit selection, the offer and the WhatsApp post follow here as its sales material arrives.': 'Moray متاح الآن: اختيار المبنى والوحدة، والعرض، وبوست واتساب.',
    'Coming soon': 'قريباً',
    'in preparation': 'قيد التجهيز',
    'Marks of Distinction': 'علامات التميّز',
    'Back': 'رجوع',
    'All projects': 'كل المشروعات',
    'Projects': 'المشروعات',
    'Your next chapter<br>starts with<br>Main&nbsp;Marks<span class="dot" id="dot">.</span>': 'فصلك القادم<br>يبدأ مع<br>Main&nbsp;Marks<span class="dot" id="dot">.</span>',
    'Work email': 'البريد الإلكتروني للعمل',
    'Password': 'كلمة المرور',
    'Sign in': 'تسجيل الدخول',
    'Forgot password?': 'نسيت كلمة المرور؟',
    '<strong>Demo accounts.</strong> Main Marks has not sent the sales team yet, so these stand in. Tap one to fill the form.': '<strong>حسابات تجريبية.</strong> لم ترسل Main Marks بيانات فريق المبيعات بعد، لذلك تُستخدم هذه مؤقتاً. اضغط على أحدها لملء النموذج.',
    'Privileged access to': 'دخول مخصّص إلى',
    'Main Marks projects': 'مشروعات Main Marks',
    'Your sales manager resets it. Nothing is emailed from this app.': 'يعيد مدير المبيعات تعيينها. لا يُرسل هذا التطبيق أي بريد إلكتروني.',
    'Enter your work email.': 'أدخل البريد الإلكتروني للعمل.',
    'Enter your password.': 'أدخل كلمة المرور.',
    'That email and password do not match.': 'البريد الإلكتروني وكلمة المرور غير متطابقين.',
    'This account has no role set. Ask for it to be fixed before using the app.': 'لا يوجد دور محدد لهذا الحساب. اطلب إصلاحه قبل استخدام التطبيق.',

    /* ---- the header, the projects page ---- */
    'Signed in as ': 'مسجّل الدخول باسم ',
    '. Open the account menu': '. افتح قائمة الحساب',
    'Sign out': 'تسجيل الخروج',
    'Nothing to sell yet': 'لا يوجد ما يُباع بعد',
    'No project has been opened for you.': 'لم يُفتح لك أي مشروع بعد.',
    'Ask your sales manager to add a project to your account.': 'اطلب من مدير المبيعات إضافة مشروع إلى حسابك.',
    'No project is released yet.': 'لم يُطرح أي مشروع بعد.',
    'Projects open here as soon as they are released.': 'تظهر المشروعات هنا فور طرحها.',
    'Open {name}': 'افتح {name}',
    'Not your account': 'ليس ضمن حسابك',
    'Not released yet': 'لم يُطرح بعد',
    'Not open for your account': 'غير متاح لحسابك',

    /* ---- the Moray page ---- */
    'This project is not open for your account.': 'هذا المشروع غير متاح لحسابك.',
    'This project is not open yet.': 'هذا المشروع غير متاح بعد.',
    'This part of {name} is not open.': 'هذا الجزء من {name} غير متاح.',
    'Back to {name}': 'العودة إلى {name}',
    '{name} — project render': '{name} — صورة المشروع',
    '{name} — aerial view of the complex': '{name} — صورة جوية للمشروع',
    '{name} master plan': 'المخطط العام لـ {name}',
    'The project': 'المشروع',
    'Source: {s}': 'المصدر: {s}',
    'What are you selling?': 'ماذا تبيع؟',
    'Choose a product': 'اختر المنتج',
    'Show {name}': 'عرض {name}',
    'Pictures and figures: {list}': 'الصور والأرقام: {list}',
    'Source: {a}; picture: {b}': 'المصدر: {a}؛ الصورة: {b}',
    'Not available': 'غير متاح',
    'Only projects that have been released, and opened for your account, can be selected.': 'لا يمكن اختيار إلا المشروعات المطروحة والمتاحة لحسابك.',
    'Back to all projects': 'العودة إلى كل المشروعات',
    'Not available — Main Marks': 'غير متاح — Main Marks',
    'Buildings': 'المباني',
    'none': 'لا شيء',
    '{p} at night — {l}': '{p} ليلاً — {l}',

    /* ---- config: the projects and the lines ---- */
    'North 90th Street, New Cairo': 'شارع التسعين الشمالي، القاهرة الجديدة',
    'South 90 Street, New Cairo': 'شارع التسعين الجنوبي، القاهرة الجديدة',
    'Fourteen buildings of offices, clinics and serviced apartments, over street-level retail.': 'أربعة عشر مبنى من المكاتب والعيادات والشقق الفندقية، فوق محلات على مستوى الشارع.',
    'A purpose-built business destination bringing administrative, clinical and commercial uses into one hub.': 'وجهة أعمال مصممة لتجمع الاستخدامات الإدارية والطبية والتجارية في مركز واحد.',
    '1st Mark of Distinction': 'علامة التميّز الأولى',
    '2nd Mark of Distinction': 'علامة التميّز الثانية',
    'The new mark of the city': 'العلامة الجديدة للمدينة',
    'Every Hour Counts': 'Every Hour Counts',
    'Connect': 'Connect',
    'Engage': 'Engage',
    'Work': 'Work',
    'Land area': 'مساحة الأرض',
    '70,000 m²': '70,000 م²',
    'About 17 feddans (70,000 m²)': 'نحو 17 فداناً (70,000 م²)',
    '14 buildings': '14 مبنى',
    '14 — 8 administrative, 2 clinical, 4 serviced apartments': '14 — 8 إدارية، 2 طبية، 4 شقق فندقية',
    'Entrances': 'المداخل',
    '10': '10',
    '10, three of them grand gates on North 90th Street': '10، منها 3 بوابات رئيسية على شارع التسعين الشمالي',
    'Unit sizes': 'مساحات الوحدات',
    '38 – 2,444 m²': 'من 38 إلى 2,444 م²',
    '38 – 2,444 m² across four uses': 'من 38 إلى 2,444 م² في أربعة استخدامات',
    '11,003 m²': '11,003 م²',
    '11,003 m² (2.62 feddan)': '11,003 م² (2.62 فدان)',
    'Building footprint': 'المساحة المبنية',
    '4,000 m²': '4,000 م²',
    '4,000 m² (0.95 feddan) — 36.4%': '4,000 م² (0.95 فدان) — 36.4 بالمئة',
    'Landscape': 'المساحات الخضراء',
    '7,003 m²': '7,003 م²',
    '7,003 m² (1.67 feddan) — 63.6%': '7,003 م² (1.67 فدان) — 63.6 بالمئة',
    'Units': 'الوحدات',
    '453 across three uses': '453 في ثلاثة استخدامات',
    'Offices': 'المكاتب',
    'From agile studios to corporate headquarters.': 'من الاستوديوهات المرنة إلى المقرات الرئيسية للشركات.',
    '42 – 1,410 m²': 'من 42 إلى 1,410 م²',
    '8 administrative': '8 إدارية',
    'Fourth floor': 'الدور الرابع',
    'Beyond the third, into the fourth.': 'ما بعد الثالث، إلى الرابع.',
    '153 administrative': '153 وحدة إدارية',
    'Area': 'المساحة',
    '13,027 m² + 609 m² terraces': '13,027 م² + 609 م² تراسات',
    'Clinics': 'العيادات',
    'This is where the art of healing finds its stage.': 'هنا يجد فن الشفاء مسرحه.',
    '41 – 203 m²': 'من 41 إلى 203 م²',
    '2 clinical': '2 طبية',
    'Serviced apartments': 'الشقق الفندقية',
    'Fully furnished serviced apartments.': 'شقق فندقية مفروشة بالكامل.',
    '38 – 83 m²': 'من 38 إلى 83 م²',
    '4 serviced apartments': '4 شقق فندقية',
    'Current offer · until 15 Oct 2026': 'العرض الحالي · حتى 15 أكتوبر 2026',
    'Standard plans': 'الخطط الأساسية',
    'Plans': 'الخطط',
    'The down payment is taken as a share of the price after the plan’s discount.': 'يُحسب المقدم كنسبة من السعر بعد خصم الخطة.',
    'The first instalment falls three months after the down payment, as in Main Marks’ sample contract.': 'يستحق القسط الأول بعد ثلاثة أشهر من المقدم، كما في نموذج عقد Main Marks.',
    'Maintenance and delivery are not included: Main Marks has not supplied them.': 'الصيانة والاستلام غير مشمولين: لم ترسلهما Main Marks.',

    /* ---- the line page: steps, buildings, floors ---- */
    'Building': 'المبنى',
    'Tap a building on the view, or choose it below': 'اضغط على مبنى في الصورة، أو اختره بالأسفل',
    'Floor': 'الدور',
    'Unit': 'الوحدة',
    'Unit details': 'تفاصيل الوحدة',
    'Price, payment plan and the offer': 'السعر وخطة السداد والعرض',
    'Building {b}': 'مبنى {b}',
    'Reading the inventory…': 'جارٍ قراءة قائمة الوحدات…',
    'Refresh': 'تحديث',
    'Inventory': 'قائمة الوحدات',
    'read {time}': 'قُرئت {time}',
    'The inventory could not be read.': 'تعذّرت قراءة قائمة الوحدات.',
    'Choose a building': 'اختر مبنى',
    'Choose a building below': 'اختر مبنى من القائمة بالأسفل',
    'Inventory: {inv} · Plans: Main Marks, 29 Sep 2026 · Picture: {pic}': 'قائمة الوحدات: {inv} · الخطط: Main Marks، 29 سبتمبر 2026 · الصورة: {pic}',
    '{n} {use} · {a} available': '{use}: {n} · المتاح {a}',
    '{n} available': '{n} متاحة',
    'none available': 'لا شيء متاح',
    'There are no {use} in Main Marks’ inventory yet. They appear here the moment they are added to the sheet.': 'لا توجد {use} في قائمة وحدات Main Marks بعد. ستظهر هنا فور إضافتها إلى الشيت.',
    '{name}, {n} matching units': '{name}، {n} وحدات مطابقة',
    'Light the other {n} match': 'أضئ النتيجة الأخرى ({n})',
    'Light the other {n} matches': 'أضئ النتائج الأخرى ({n})',
    '{n} on hold': '{n} محجوزة مؤقتاً',
    'Street level': 'مستوى الشارع',
    '{n} match': '{n} نتيجة',
    '{n} matches': '{n} نتيجة',
    'layout': 'المخطط',
    'Glowing on the drawing.': 'مضيئة على المخطط.',
    'First in the list below.': 'الأولى في القائمة بالأسفل.',
    'Hide other options': 'إخفاء الخيارات الأخرى',
    'Show other options ({n} on this floor)': 'عرض الخيارات الأخرى ({n} في هذا الدور)',
    'Drawing: {src}': 'المخطط: {src}',
    'sharpened copy': 'نسخة محسّنة الوضوح',
    '{n} available on this floor': '{n} متاحة في هذا الدور',
    'Sort the units': 'ترتيب الوحدات',
    'Sort: unit number': 'ترتيب: رقم الوحدة',
    'Sort: price, low to high': 'ترتيب: السعر من الأقل للأعلى',
    'Sort: price, high to low': 'ترتيب: السعر من الأعلى للأقل',
    'Sort: size, small to large': 'ترتيب: المساحة من الأصغر للأكبر',
    '{down} down · {each} / quarter': 'مقدم {down} · {each} / ربع سنة',
    'Fits': 'تناسب',
    '{a} m²': '{a} م²',

    /* ---- step 4: the unit, the plan, the schedule ---- */
    'Type': 'النوع',
    'Price': 'السعر',
    'Price per m²': 'سعر المتر',
    '{v} EGP/m²': '{v} جنيه/م²',
    'No payment plan applies to this unit yet.': 'لا توجد خطة سداد تنطبق على هذه الوحدة بعد.',
    'Payment plan': 'خطة السداد',
    'This plan could not be worked out for this unit, so it is not shown.': 'تعذّر حساب هذه الخطة لهذه الوحدة، لذلك لا تُعرض.',
    'Price after {p} off': 'السعر بعد خصم {p}',
    'Cash payment · {p} off': 'الدفع كاش · خصم {p}',
    'You save': 'توفّر',
    'Down payment': 'المقدم',
    'Quarterly': 'كل 3 شهور',
    'Instalments': 'عدد الأقساط',
    'Total payable': 'الإجمالي المستحق',
    '{v} down of {of}': 'مقدم {v} من {of}',
    '{v} a quarter of {of}': '{v} كل 3 شهور من {of}',
    'Within the client’s budget: {list}.': 'ضمن ميزانية العميل: {list}.',
    '{v} more cash': '{v} كاش إضافي',
    '{v} more a quarter': '{v} إضافية كل 3 شهور',
    'Over the client’s budget on this plan: needs {list}.': 'تتجاوز ميزانية العميل على هذه الخطة: تحتاج {list}.',
    'Switch to {plan}': 'التبديل إلى {plan}',
    'Payment schedule': 'جدول السداد',
    'Year {a} to Year {b}': 'من السنة {a} إلى السنة {b}',
    '{n} more payment': 'دفعة أخرى',
    '{n} more payments': '{n} دفعات أخرى',
    'scroll the table': 'مرّر الجدول',
    'Year': 'السنة',
    'Instalment': 'القسط',
    'Date': 'التاريخ',
    'Amount (EGP)': 'المبلغ (جنيه)',
    '%': '%',
    'Yearly %': '% السنة',
    'DP': '—',
    'Year {y}': 'السنة {y}',
    'Inst. {n}': 'قسط {n}',
    'Send offer on WhatsApp': 'أرسل العرض على واتساب',
    'Copy offer text': 'انسخ نص العرض',
    'Price: {v}': 'السعر: {v}',
    'Plan: {plan}': 'الخطة: {plan}',
    '(offer until {date})': '(العرض حتى {date})',
    'Price after {p} off: {v}': 'السعر بعد خصم {p}: {v}',
    'Cash payment: {v}': 'الدفع كاش: {v}',
    'Down payment: {v}': 'المقدم: {v}',
    'Quarterly instalment: {v} × {n}': 'القسط كل 3 شهور: {v} × {n}',
    'Available as of {date}': 'متاحة بتاريخ {date}',
    'Offer PDF shared. The text is copied too, in case WhatsApp drops it.': 'تمت مشاركة ملف العرض. والنص منسوخ أيضاً، تحسباً لأن يُسقطه واتساب.',
    'Could not open the share sheet, so the PDF was saved. The text is copied.': 'تعذّر فتح قائمة المشاركة، لذلك حُفظ ملف العرض. والنص منسوخ.',
    'WhatsApp opened with the text. The offer PDF is downloaded: attach it there.': 'فُتح واتساب بالنص، وتم تنزيل ملف العرض: أرفقه هناك.',
    'Copied.': 'تم النسخ.',
    'Could not copy.': 'تعذّر النسخ.',

    /* ---- who is this offer for ---- */
    'Before you send': 'قبل الإرسال',
    'Who is this offer for?': 'لمن هذا العرض؟',
    'Special request': 'طلب خاص',
    'A broker asked for it. Counted for their company.': 'طلبه وسيط، ويُحتسب لشركته.',
    'General broadcast': 'نشر عام',
    'Groups, channels, status. No single company.': 'جروبات وقنوات وحالة، بدون شركة محددة.',
    'Which company asked?': 'أي شركة طلبت؟',
    'Type the brokerage company': 'اكتب اسم شركة الوساطة',
    'Main Marks’ brokerage list will fill this once it is sent. Type the company for now.': 'ستُملأ هذه القائمة بشركات الوساطة لدى Main Marks فور إرسالها. اكتب اسم الشركة الآن.',
    'Send it as': 'أرسله كـ',
    'Offer PDF': 'ملف العرض PDF',
    'Text only: no PDF for this unit yet': 'نص فقط: لا يوجد ملف PDF لهذه الوحدة بعد',
    'The 6-page offer, for one broker': 'العرض في 6 صفحات، لوسيط واحد',
    'WhatsApp post': 'بوست واتساب',
    'A picture and text, for groups': 'صورة ونص، للجروبات',
    'No company in the list is close to “{typed}”. It will be kept as typed.': 'لا توجد شركة في القائمة قريبة من «{typed}». سيُحفظ الاسم كما كُتب.',
    'Sent the request': 'أرسلت الطلب',
    'Cancel': 'إلغاء',
    'Continue to WhatsApp': 'متابعة إلى واتساب',
    'The offer PDF could not be made, so the text goes alone.': 'تعذّر إنشاء ملف العرض، لذلك سيُرسل النص وحده.',
    'Preparing the offer PDF…': 'جارٍ تجهيز ملف العرض…',
    'Make the post': 'جهّز البوست',

    /* ---- the WhatsApp post sheet ---- */
    'Clinic {code}': 'عيادة {code}',
    'Close': 'إغلاق',
    'Add my name and number': 'أضف اسمي ورقمي',
    'Your name': 'اسمك',
    'Your mobile number': 'رقم موبايلك',
    'The post text. You can edit it before sending.': 'نص البوست. يمكنك تعديله قبل الإرسال.',
    'Copy text': 'انسخ النص',
    'Send on WhatsApp': 'أرسل على واتساب',
    'The post could not be made: {e}': 'تعذّر تجهيز البوست: {e}',
    'Copied. Paste it into WhatsApp.': 'تم النسخ. الصقه في واتساب.',
    'Select the text above and copy it.': 'حدد النص بالأعلى وانسخه.',
    'Sent to the share sheet. If WhatsApp shows the picture without the text, paste it: it is copied.': 'أُرسل إلى قائمة المشاركة. إذا ظهرت الصورة في واتساب بدون النص، الصقه: فهو منسوخ.',
    'Sent to the share sheet.': 'أُرسل إلى قائمة المشاركة.',
    'Not sent.': 'لم يُرسل.',
    'The share sheet did not open, so the picture was saved and the text copied. Attach the picture in WhatsApp and paste the text.': 'لم تُفتح قائمة المشاركة، لذلك حُفظت الصورة ونُسخ النص. أرفق الصورة في واتساب والصق النص.',
    'WhatsApp opened with the text. The picture is saved: attach it there.': 'فُتح واتساب بالنص، والصورة محفوظة: أرفقها هناك.',
    'Making the picture…': 'جارٍ تجهيز الصورة…',
    'The picture that goes with the post: the master plan with the building lit, and the clinic on its floor': 'الصورة المرفقة بالبوست: المخطط العام والمبنى مضاء، والعيادة على مخطط دورها',
    'The picture could not be made: {e}. The text can still be sent.': 'تعذّر تجهيز الصورة: {e}. ما زال بالإمكان إرسال النص.',
    'No picture for this unit yet: its floor drawing is not traced. The text goes alone.': 'لا توجد صورة لهذه الوحدة بعد: مخطط دورها غير مرسوم. سيُرسل النص وحده.',

    /* ---- Find a unit ---- */
    'Find a unit': 'ابحث عن وحدة',
    'Clear': 'مسح',
    'By unit': 'حسب الوحدة',
    'Client budget': 'ميزانية العميل',
    'Cash now': 'الكاش الآن',
    'the down payment, e.g. 2m': 'المقدم، مثلاً 2m',
    'Per quarter': 'كل 3 شهور',
    '/ quarter': '/ ربع سنة',
    'e.g. 400k': 'مثلاً 400k',
    'Floors': 'الأدوار',
    'Any floor': 'أي دور',
    'Done': 'تم',
    'Floors: {list}': 'الأدوار: {list}',
    'Size': 'المساحة',
    'Price up to': 'السعر حتى',
    'Show': 'عرض',
    'Include on hold': 'تشمل المحجوزة مؤقتاً',
    'No sizes left for this search': 'لا توجد مساحات متبقية لهذا البحث',
    'One price band left': 'تبقّى نطاق سعري واحد',
    '{floors} floor': 'الدور {floors}',
    ' or ': ' أو ',
    'up to {v}': 'حتى {v}',
    'cash {v}': 'كاش {v}',
    '{v} a quarter': '{v} كل 3 شهور',
    '+ on hold': '+ المحجوزة مؤقتاً',
    '{v} cash': '{v} كاش',
    '{list} to spare': 'يتبقى {list}',
    ' and ': ' و',
    'uses the whole budget': 'تستخدم الميزانية كاملة',
    'EGP {v} cash, once': '{v} جنيه كاش، دفعة واحدة',
    '{down} down · {each} a quarter': 'مقدم {down} · {each} كل 3 شهور',
    'EGP {v} more cash': '{v} جنيه كاش إضافي',
    'EGP {v} more a quarter': '{v} جنيه إضافية كل 3 شهور',
    'Needs {list}': 'تحتاج {list}',
    '{v} EGP per m²': '{v} جنيه للمتر',
    'Same price: {codes}': 'بنفس السعر: {codes}',
    'Show it on the layout': 'اعرضها على المخطط',
    'Hide the other options': 'إخفاء الخيارات الأخرى',
    'Show all {n}': 'عرض الكل ({n})',
    'Up to EGP {v} every 3 months (about {m} a month)': 'حتى {v} جنيه كل 3 شهور (نحو {m} في الشهر)',
    'Up to EGP {v}': 'حتى {v} جنيه',
    'Type an amount': 'اكتب مبلغاً',
    'No cash: plans with no down payment only': 'بدون كاش: خطط بدون مقدم فقط',
    'No instalments: cash plans only': 'بدون أقساط: خطط الكاش فقط',
    'Nothing fits on cash alone. Type what the client can pay per quarter.': 'لا شيء يناسب بالكاش وحده. اكتب ما يستطيع العميل دفعه كل 3 شهور.',
    'Cheapest available': 'الأرخص المتاح',
    ' — show it on the layout': ' — اعرضها على المخطط',
    'nothing matches': 'لا توجد نتائج',
    'Nothing fits that budget. The closest unit is above.': 'لا شيء يناسب هذه الميزانية. الوحدة الأقرب معروضة بالأعلى.',
    'Nothing matches. Take a filter off.': 'لا شيء مطابق. أزل أحد الفلاتر.',
    'Nothing matches. Take a filter off, or include on hold.': 'لا شيء مطابق. أزل أحد الفلاتر، أو أدرج المحجوزة مؤقتاً.',
    '{units} in {buildings} — lit on the view. Tap one:': '{units} في {buildings} — مضاءة على الصورة. اضغط على أحدها:',
    '1 unit': 'وحدة واحدة',
    '{n} units': '{n} وحدات',
    '1 building': 'مبنى واحد',
    '{n} buildings': '{n} مبانٍ',
    'Show fewer': 'عرض أقل',
    'Apply': 'تطبيق',
    'No inventory could be read, so there is nothing to search.': 'تعذّرت قراءة قائمة الوحدات، لذلك لا يوجد ما يُبحث فيه.',
    'Up to 60 m²': 'حتى 60 م²',
    '61–80 m²': 'من 61 إلى 80 م²',
    '81–100 m²': 'من 81 إلى 100 م²',
    '101–120 m²': 'من 101 إلى 120 م²',
    '121–150 m²': 'من 121 إلى 150 م²',
    '151–200 m²': 'من 151 إلى 200 م²',
    '201–300 m²': 'من 201 إلى 300 م²',
    'Over 300 m²': 'أكثر من 300 م²',
    'Best fit': 'الأنسب',
    'Cheapest match': 'الأرخص المطابق',
    'Closest — over budget': 'الأقرب — فوق الميزانية',
    'Also within the budget, from the dearest down': 'ضمن الميزانية أيضاً، من الأغلى إلى الأرخص',
    'Also matching, from the cheapest up': 'مطابقة أيضاً، من الأرخص إلى الأغلى',
    'See {n} more unit that fits': 'عرض وحدة أخرى تناسب',
    'See {n} more units that fit': 'عرض {n} وحدات أخرى تناسب',
    'See {n} more match': 'عرض نتيجة أخرى',
    'See {n} more matches': 'عرض {n} نتائج أخرى',
    'Add EGP {gap} a quarter and one more unit comes into reach.': 'أضف {gap} جنيه كل 3 شهور فتصبح وحدة أخرى في المتناول.',
    'Add EGP {gap} a quarter and {n} more units come into reach.': 'أضف {gap} جنيه كل 3 شهور فتصبح {n} وحدات أخرى في المتناول.',
    'Add EGP {gap} cash and one more unit comes into reach.': 'أضف {gap} جنيه كاش فتصبح وحدة أخرى في المتناول.',
    'Add EGP {gap} cash and {n} more units come into reach.': 'أضف {gap} جنيه كاش فتصبح {n} وحدات أخرى في المتناول.',
    'Or add EGP {gap} a quarter and one more unit comes into reach.': 'أو أضف {gap} جنيه كل 3 شهور فتصبح وحدة أخرى في المتناول.',
    'Or add EGP {gap} a quarter and {n} more units come into reach.': 'أو أضف {gap} جنيه كل 3 شهور فتصبح {n} وحدات أخرى في المتناول.',
    'Or add EGP {gap} cash and one more unit comes into reach.': 'أو أضف {gap} جنيه كاش فتصبح وحدة أخرى في المتناول.',
    'Or add EGP {gap} cash and {n} more units come into reach.': 'أو أضف {gap} جنيه كاش فتصبح {n} وحدات أخرى في المتناول.',

    /* ---- roles, kinds, the line names (three are brands and stay), the build ---- */
    'Salesperson': 'مندوب مبيعات',
    'Sales manager': 'مدير مبيعات',
    'Director': 'مدير',
    'Mixed use': 'متعدد الاستخدامات',
    'Business hub · Mixed use': 'مركز أعمال · متعدد الاستخدامات',
    'Administrative units': 'الوحدات الإدارية',
    'Moray Wellness': 'Moray Wellness',
    'The Fourth': 'The Fourth',
    'R- Residence': 'R- Residence',
    'build {n}': 'الإصدار {n}'
  };

  /* ---- the sheet's words and config values --------------------------- */
  var FLOOR = { street: 'مستوى الشارع', ground: 'الأرضي', first: 'الأول', second: 'الثاني', third: 'الثالث',
    fourth: 'الرابع', fifth: 'الخامس' };
  var USE_ONE = { Clinic: 'عيادة', Admin: 'مكتب', Commercial: 'محل', Serviced: 'شقة فندقية' };
  var USE_MANY = { Clinic: 'العيادات', Admin: 'المكاتب', Commercial: 'المحلات', Serviced: 'الشقق الفندقية' };
  var STATUS = { Available: 'متاحة', 'On hold': 'محجوزة مؤقتاً', Hold: 'محجوزة مؤقتاً', Sold: 'مباعة' };
  var MON_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var MON_AR = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];

  /* built from code points: a typed escape can land in a file as the raw character */
  var FSI = String.fromCharCode(0x2068), PDI = String.fromCharCode(0x2069);
  var arabicLetter = /[؀-ۿ]/;
  var missing = {};
  function iso(v) { v = String(v); return AR_ON && !arabicLetter.test(v) ? FSI + v + PDI : v; }

  function t(key, vars) {
    var s = key;
    if (AR_ON) {
      if (Object.prototype.hasOwnProperty.call(AR, key)) s = AR[key];
      else if (!missing[key]) { missing[key] = true; if (root.console) console.warn('[i18n] no Arabic for: ' + key); }
    }
    /* A "%" straight after a value goes INSIDE its isolate: left outside, it
       is no longer touching the number and bidi moves it ("5%" -> "%5") */
    return s.replace(/\{(\w+)\}(%?)/g, function (m, k, pct) {
      if (!vars || vars[k] == null) return m;
      return iso(String(vars[k]) + pct);
    });
  }

  function money(v) { return Math.round(v).toLocaleString('en-US'); }
  var tx = {
    /* "1st" (en given by the caller) -> "الأول" */
    floorShort: function (fid, en) { return AR_ON && FLOOR[fid] ? FLOOR[fid] : en; },
    /* "First Floor" / "1st floor" -> "الدور الأول"; street level stands alone */
    floor: function (fid, en) {
      if (!AR_ON || !FLOOR[fid]) return en;
      return fid === 'street' ? FLOOR.street : 'الدور ' + FLOOR[fid];
    },
    /* "Building E" -> "مبنى E" */
    building: function (name) {
      if (!AR_ON || !name) return name;
      var m = /^Building\s+(.+)$/i.exec(String(name));
      return m ? 'مبنى ' + iso(m[1]) : String(name);
    },
    /* the sheet's Type: one unit ("Clinic") or the line's units ("Clinics") */
    useOne: function (type, en) { return AR_ON && USE_ONE[type] ? USE_ONE[type] : en; },
    useMany: function (type, en) { return AR_ON && USE_MANY[type] ? USE_MANY[type] : en; },
    status: function (s) { return AR_ON ? (STATUS[s] || s) : s; },
    /* a plan's label, as config writes it:
         "30% down · 10 years · 10% off", "0% down · 8 years", "Spot cash · 40% off" */
    plan: function (label) {
      if (!AR_ON || !label) return label;
      return String(label).split(/\s*·\s*/).map(function (part) {
        var m;
        if ((m = /^(\d+(?:\.\d+)?)%\s*down$/i.exec(part))) return +m[1] === 0 ? 'بدون مقدم' : 'مقدم ' + iso(m[1] + '%');
        if ((m = /^(\d+)\s*years?$/i.exec(part))) return iso(m[1]) + (+m[1] <= 10 ? ' سنوات' : ' سنة');
        if ((m = /^(\d+(?:\.\d+)?)%\s*off$/i.exec(part))) return 'خصم ' + iso(m[1] + '%');
        if (/^spot cash$/i.test(part)) return 'كاش فوري';
        return part;
      }).join(' · ');
    },
    egp: function (v) { return AR_ON ? iso(money(v)) + ' جنيه' : 'EGP ' + money(v); },
    /* "15 Oct 2026" */
    date: function (d) { return d.getDate() + ' ' + (AR_ON ? MON_AR : MON_EN)[d.getMonth()] + ' ' + d.getFullYear(); },
    /* a list: "1st, 2nd" / "الأول، الثاني" */
    list: function (a) { return a.join(AR_ON ? '، ' : ', '); }
  };

  /* a config object's own words: o.ar.name in Arabic, o.name otherwise */
  function pt(obj, field) {
    if (AR_ON && obj && obj.ar && obj.ar[field] != null) return obj.ar[field];
    return obj ? obj[field] : undefined;
  }

  function setLang(next) {
    try { root.localStorage.setItem(KEY, next); } catch (e) { /* private mode: this visit only */ }
    var url = new URL(root.location.href);
    url.searchParams.delete('lang');
    root.location.href = url.toString();
  }

  /* static text in the HTML */
  function translateStatic() {
    if (!AR_ON) return;
    [].forEach.call(document.querySelectorAll('[data-t]'), function (n) { n.textContent = t(n.getAttribute('data-t')); });
    [].forEach.call(document.querySelectorAll('[data-t-html]'), function (n) { n.innerHTML = t(n.getAttribute('data-t-html')); });
    [].forEach.call(document.querySelectorAll('[data-t-ph]'), function (n) { n.setAttribute('placeholder', t(n.getAttribute('data-t-ph'))); });
    [].forEach.call(document.querySelectorAll('[data-t-aria]'), function (n) { n.setAttribute('aria-label', t(n.getAttribute('data-t-aria'))); });
    var titleKey = document.documentElement.getAttribute('data-t-title');
    if (titleKey) document.title = t(titleKey);
  }

  /* the switch: in the header card of every page, beside the initials;
     on the sign-in page, at the top of the form */
  function addSwitch() {
    if (document.querySelector('.lang-switch')) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'lang-switch';
    var next = AR_ON ? 'en' : 'ar';
    b.textContent = AR_ON ? 'English' : 'العربية';
    b.lang = next;
    b.dir = AR_ON ? 'ltr' : 'rtl';
    b.setAttribute('aria-label', AR_ON ? 'Switch to English' : 'التبديل إلى العربية');
    b.addEventListener('click', function () { setLang(next); });
    var who = document.querySelector('header.top .who, header .who');
    if (who && who.parentNode) { who.parentNode.insertBefore(b, who); return; }
    var gate = document.querySelector('.gate-body');
    if (gate) { b.classList.add('is-gate'); gate.insertBefore(b, gate.firstChild); return; }
    var header = document.querySelector('header');
    if (header) header.appendChild(b);
  }

  MM.lang = lang;
  MM.isArabic = AR_ON;
  MM.t = t;
  MM.tx = tx;
  MM.pt = pt;
  MM.iso = iso;
  MM.setLang = setLang;
  MM.i18n = { t: t, keys: function () { return Object.keys(AR); }, missing: function () { return Object.keys(missing); } };

  if (root.document && document.addEventListener) {
    var run = function () { translateStatic(); addSwitch(); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
  }
}(typeof window !== 'undefined' ? window : globalThis));
