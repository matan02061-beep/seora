import React, { createContext, useContext, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import './styles.css';

const gold = '#d4a017';
const deep = '#06112b';
const ResponsiveContext = createContext(false);
const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const collections = [
  ['Lumiere Solitaire', 'יהלום מעבדה 1.5 קראט · זהב לבן 18K', '◇'],
  ['Eternel Pave', 'יהלום טבעי 2.0 קראט · זהב צהוב 18K', '◆'],
  ['Halo Eclipse', 'יהלום מעבדה 2.5 קראט · זהב ורוד 18K', '◎'],
  ['Crown Vintage', 'יהלום טבעי 1.8 קראט · פלטינום', '✦'],
];

const customerPieces = [
  [asset('seora-piece-1.jpg'), 'טבעת בעיצוב אישי', 'טבעת יהלום בעבודת יד'],
  [asset('seora-piece-2.jpg'), 'טבעת pavé', 'עיצוב לקוח עם שיבוץ עדין'],
  [asset('seora-piece-3.jpg'), 'שרשרת יהלומים', '14 יהלומים · סה"כ 1.60 קראט'],
  [asset('seora-piece-4.jpg'), 'טבעת קלאסית', 'יהלום מרכזי עם נוכחות נקיה'],
  [asset('seora-piece-5.jpg'), 'מודל מיוחד', 'גרסה אישית שנוצרה עבור לקוחה'],
];

const stats = [
  ['1,300+', 'לקוחות מרוצים'],
  ['850+', 'מודלים ייחודיים'],
  ['750+', 'זוגות מאושרים'],
  ['10,000+', 'יהלומים ששובצו'],
];

const testimonials = [
  ['אבי כהן', 'תל אביב', 'אחרי שיחה אחת הכל התבהר. הטבעת שקיבלתי היתה מעבר לכל ציפייה.'],
  ['נועה ויהונתן', 'ירושלים', 'בחרנו יהלום מעבדה, חסכנו בצורה משמעותית וקיבלנו תוצאה מדהימה.'],
  ['מיכל לוי', 'חיפה', 'השירות, הידע והאחריות לכל החיים נתנו לנו שקט אמיתי לאורך כל הדרך.'],
];

function App() {
  const { width } = useWindowDimensions();
  const mobile = width < 760;

  return (
    <ResponsiveContext.Provider value={mobile}>
      <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
        <Announcement />
        <Nav />
        <Hero />
        <Marquee />
        <VideoGift />
        <Stats />
        <VideoSection />
        <Story />
        <Collections />
        <CustomerModels />
        <LeadSection />
        <Testimonials />
        <Footer />
      </ScrollView>
    </ResponsiveContext.Provider>
  );
}

function useMobile() {
  return useContext(ResponsiveContext);
}

function Announcement() {
  return (
    <View className="announce" style={styles.announce}>
      <Text className="announceText" style={styles.announceText}>
        ייעוץ יהלומים חינמי · יהלומי מעבדה · אחריות לכל החיים · עיצוב אישי ייחודי
      </Text>
    </View>
  );
}

function Nav() {
  const mobile = useMobile();

  return (
    <View style={[styles.nav, mobile && styles.navMobile]}>
      <Text style={[styles.logo, mobile && styles.logoMobile]}>SEORA</Text>
      <View style={[styles.navLinks, mobile && styles.hide]}>
        <Anchor target="models" label="קולקציות" />
        <Anchor target="story" label="הסיפור" />
        <Anchor target="video" label="הסרטון" />
      </View>
      <Anchor target="lead" label="ייעוץ חינם" cta />
    </View>
  );
}

function Anchor({ target, label, cta }) {
  return (
    <Pressable onPress={() => document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' })}>
      <Text style={cta ? styles.navCta : styles.navLink}>{label}</Text>
    </Pressable>
  );
}

function Hero() {
  const mobile = useMobile();

  return (
    <View style={[styles.hero, mobile && styles.heroMobile]}>
      <View style={styles.heroCopy}>
        <Text style={styles.tag}>תכשיטי יהלום יוקרתיים</Text>
        <Text style={[styles.heroTitle, mobile && styles.heroTitleMobile]}>
          היהלום שלכם{'\n'}
          <Text style={styles.gold}>מספר את</Text>{'\n'}
          הסיפור שלכם
        </Text>
        <Text style={styles.heroText}>
          ב-SEORA כל תכשיט נולד מתוך רגש אמיתי. מיהלומים טבעיים ועד יהלומי מעבדה, אנחנו כאן לעזור לכם לבחור נכון ולחסוך חכם.
        </Text>
        <Pressable style={styles.videoButton} onPress={() => document.getElementById('video')?.scrollIntoView({ behavior: 'smooth' })}>
          <Text style={styles.videoButtonText}>▶ צפו בסרטון החינמי</Text>
        </Pressable>
      </View>
      <LeadForm id="lead" title="קבלו ייעוץ אישי חינמי" subtitle="השאירו פרטים ונחזור אליכם תוך 24 שעות" />
    </View>
  );
}

function LeadForm({ id, title, subtitle, compact }) {
  const mobile = useMobile();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '' });
  const disabled = sent || !form.name || !form.phone || !form.email;

  function submit() {
    setSent(true);
    setForm({ name: '', phone: '', email: '' });
  }

  return (
    <View nativeID={id} style={[styles.formBox, compact && styles.formBoxCompact]}>
      <Text style={styles.formTitle}>{sent ? 'הפרטים התקבלו' : title}</Text>
      <Text style={styles.formSub}>{sent ? 'נחזור אליכם בקרוב.' : subtitle}</Text>
      <View style={[styles.inputRow, mobile && styles.inputRowMobile]}>
        <Field label="שם מלא" value={form.name} onChangeText={(name) => setForm({ ...form, name })} />
        <Field label="טלפון" value={form.phone} onChangeText={(phone) => setForm({ ...form, phone })} keyboardType="phone-pad" />
      </View>
      <Field label="כתובת מייל" value={form.email} onChangeText={(email) => setForm({ ...form, email })} keyboardType="email-address" />
      <Pressable disabled={disabled} onPress={submit} style={[styles.submit, disabled && styles.submitDisabled]}>
        <Text style={styles.submitText}>{sent ? '✓ ניצור קשר בקרוב' : 'שלחו לי את הסרטון החינמי'}</Text>
      </Pressable>
      <Text style={styles.note}>ללא ספאם · פרטיותכם שמורה · תגובה תוך 24 שעות</Text>
    </View>
  );
}

function Field(props) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        {...props}
        placeholderTextColor="rgba(255,255,255,0.42)"
        style={styles.input}
      />
    </View>
  );
}

function Marquee() {
  return (
    <View className="marquee" style={styles.marquee}>
      <Text className="marqueeText" style={styles.marqueeText}>
        יהלומי מעבדה · יהלומים טבעיים · עיצוב ייחודי · ייעוץ אישי · טבעות אירוסין · עבודת יד
      </Text>
    </View>
  );
}

function VideoGift() {
  const mobile = useMobile();

  return (
    <Section center>
      <Text style={styles.tag}>סרטון הדרכה חינמי</Text>
      <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>קבלו את סרטון ההדרכה{'\n'}<Text style={styles.gold}>שלנו במתנה</Text></Text>
      <Text style={styles.sectionText}>סרטון קצר שמסביר את ההבדל בין יהלום טבעי ליהלום מעבדה, איך לא לטעות, ולמה SEORA היא בחירה חכמה.</Text>
      <LeadForm title="השאירו פרטים וקבלו את הסרטון" subtitle="חינם לחלוטין וללא התחייבות" compact />
    </Section>
  );
}

function Stats() {
  const mobile = useMobile();

  return (
    <Section>
      <Text style={styles.tag}>SEORA במספרים</Text>
      <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>אלפי לקוחות שבחרו <Text style={styles.gold}>לסמוך עלינו</Text></Text>
      <View style={styles.statsGrid}>
        {stats.map(([num, label]) => (
          <View key={label} style={styles.statCard}>
            <Text style={styles.statNum}>{num}</Text>
            <Text style={styles.statLabel}>{label}</Text>
          </View>
        ))}
      </View>
    </Section>
  );
}

function VideoSection() {
  const mobile = useMobile();

  return (
    <Section id="video">
      <View style={[styles.split, mobile && styles.splitMobile]}>
        <Pressable style={styles.videoFrame} onPress={() => alert('כאן יוטמע הסרטון שלך!')}>
          <Text style={styles.play}>▶</Text>
          <Text style={styles.videoDuration}>20:00 דקות</Text>
        </Pressable>
        <View style={styles.splitText}>
          <Text style={styles.tag}>הסרטון החינמי שלנו</Text>
          <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>כל מה שרציתם לדעת על <Text style={styles.gold}>יהלומים</Text></Text>
          <Text style={styles.sectionText}>גלו איך לבחור קראט נכון לתקציב, מה באמת חשוב ב-4C, ואילו שאלות חייבים לשאול לפני הקנייה.</Text>
        </View>
      </View>
    </Section>
  );
}

function Story() {
  const mobile = useMobile();

  return (
    <Section id="story">
      <View style={[styles.split, mobile && styles.splitMobile]}>
        <View style={styles.founderMark}>
          <Text style={styles.founderInitial}>S</Text>
          <Text style={styles.founderLabel}>המייסד</Text>
        </View>
        <View style={styles.splitText}>
          <Text style={styles.tag}>הסיפור האישי</Text>
          <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>מדוע הקמתי את <Text style={styles.gold}>SEORA</Text></Text>
          <Text style={styles.sectionText}>הכל התחיל כשחיפשתי טבעת אירוסין ולא ידעתי כלום על יהלומים. היום SEORA קיימת כדי שאף אחד לא ירגיש אבוד, מבולבל או מפחד לעשות טעות יקרה.</Text>
          <Text style={styles.signature}>מתן כלפון</Text>
        </View>
      </View>
    </Section>
  );
}

function Collections() {
  const mobile = useMobile();

  return (
    <Section id="models">
      <Text style={styles.tag}>הקולקציות שלנו</Text>
      <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>יצירות שנולדו <Text style={styles.gold}>מסיפורי אהבה</Text></Text>
      <Horizontal>
        {collections.map(([name, desc, icon]) => (
          <View key={name} style={styles.productCard}>
            <View style={styles.productArt}><Text style={styles.productIcon}>{icon}</Text></View>
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productDesc}>{desc}</Text>
          </View>
        ))}
      </Horizontal>
    </Section>
  );
}

function CustomerModels() {
  const mobile = useMobile();

  return (
    <Section>
      <Text style={styles.tag}>עיצוב אישי</Text>
      <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>מודלים שלקוחות <Text style={styles.gold}>עיצבו בעצמם</Text></Text>
      <Horizontal>
        {customerPieces.map(([src, name, desc]) => (
          <View key={src} style={styles.imageCard}>
            <Image source={{ uri: src }} style={styles.pieceImage} resizeMode="cover" />
            <Text style={styles.productName}>{name}</Text>
            <Text style={styles.productDesc}>{desc}</Text>
          </View>
        ))}
      </Horizontal>
    </Section>
  );
}

function LeadSection() {
  const mobile = useMobile();

  return (
    <Section id="contact" center>
      <Text style={styles.tag}>ייעוץ אישי חינמי</Text>
      <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>מוכנים למצוא את <Text style={styles.gold}>היהלום שלכם?</Text></Text>
      <Text style={styles.sectionText}>השאירו פרטים ונחזור אליכם עם הצעה מותאמת אישית, ללא התחייבות וללא לחץ.</Text>
      <LeadForm title="קבלו ייעוץ אישי חינמי" subtitle="נחזור אליכם תוך 24 שעות" compact />
    </Section>
  );
}

function Testimonials() {
  const mobile = useMobile();

  return (
    <Section>
      <Text style={styles.tag}>לקוחות מספרים</Text>
      <Text style={[styles.sectionTitle, mobile && styles.sectionTitleMobile]}>רגעים שנזכרים <Text style={styles.gold}>לנצח</Text></Text>
      <Horizontal>
        {testimonials.map(([name, city, quote]) => (
          <View key={name} style={styles.testimonial}>
            <Text style={styles.stars}>★★★★★</Text>
            <Text style={styles.quote}>"{quote}"</Text>
            <Text style={styles.testimonialName}>{name}</Text>
            <Text style={styles.productDesc}>{city}</Text>
          </View>
        ))}
      </Horizontal>
    </Section>
  );
}

function Section({ children, id, center }) {
  const mobile = useMobile();
  return <View nativeID={id} style={[styles.section, mobile && styles.sectionMobile, center && styles.center]}>{children}</View>;
}

function Horizontal({ children }) {
  return <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontal}>{children}</ScrollView>;
}

function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.footerLogo}>SEORA</Text>
      <Text style={styles.footerText}>© 2026 SEORA Diamonds · All rights reserved</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { backgroundColor: deep, minHeight: '100vh' },
  pageContent: { alignItems: 'stretch' },
  announce: { backgroundColor: gold, overflow: 'hidden', paddingVertical: 10 },
  announceText: { color: deep, fontFamily: 'Heebo', fontWeight: '900', letterSpacing: 2, textAlign: 'center', whiteSpace: 'nowrap' },
  nav: { alignItems: 'center', backgroundColor: 'rgba(6,17,43,0.9)', borderColor: 'rgba(212,160,23,0.28)', borderWidth: 1, flexDirection: 'row-reverse', gap: 22, justifyContent: 'space-between', marginHorizontal: 'auto', marginTop: 18, maxWidth: 1180, paddingHorizontal: 22, paddingVertical: 14, position: 'sticky', top: 12, width: '92%', zIndex: 20 },
  navMobile: { marginTop: 12, position: 'relative', top: 0, width: 'calc(100% - 24px)' },
  logo: { color: gold, fontFamily: 'Cormorant Garamond', fontSize: 34, fontWeight: '700', letterSpacing: 8 },
  logoMobile: { fontSize: 28, letterSpacing: 6 },
  navLinks: { flexDirection: 'row-reverse', gap: 20 },
  hide: { display: 'none' },
  navLink: { color: 'rgba(255,255,255,0.72)', fontFamily: 'Heebo', fontSize: 14 },
  navCta: { backgroundColor: gold, color: deep, fontFamily: 'Heebo', fontSize: 13, fontWeight: '900', paddingHorizontal: 18, paddingVertical: 10 },
  hero: { alignItems: 'center', backgroundImage: 'radial-gradient(circle at 18% 18%, rgba(212,160,23,.26), transparent 30%), linear-gradient(135deg,#06112b,#0f2242 55%,#06112b)', flexDirection: 'row-reverse', gap: 48, justifyContent: 'center', minHeight: 720, paddingHorizontal: 34, paddingVertical: 72 },
  heroMobile: { alignItems: 'stretch', flexDirection: 'column', gap: 30, minHeight: 0, paddingHorizontal: 18, paddingVertical: 46 },
  heroCopy: { maxWidth: 610 },
  tag: { alignSelf: 'flex-start', borderColor: 'rgba(212,160,23,0.35)', borderWidth: 1, color: gold, fontFamily: 'Heebo', fontSize: 12, fontWeight: '800', letterSpacing: 2, marginBottom: 16, paddingHorizontal: 14, paddingVertical: 8 },
  heroTitle: { color: '#fff', fontFamily: 'Cormorant Garamond', fontSize: 78, fontWeight: '700', lineHeight: 82 },
  heroTitleMobile: { fontSize: 50, lineHeight: 54 },
  gold: { color: gold },
  heroText: { color: 'rgba(255,255,255,0.72)', fontFamily: 'Heebo', fontSize: 18, lineHeight: 32, marginTop: 22, maxWidth: 540 },
  videoButton: { alignSelf: 'flex-start', borderColor: 'rgba(212,160,23,0.35)', borderWidth: 1, marginTop: 30, paddingHorizontal: 22, paddingVertical: 14 },
  videoButtonText: { color: '#fff', fontFamily: 'Heebo', fontWeight: '800' },
  formBox: { backgroundColor: 'rgba(8,22,56,0.88)', borderColor: 'rgba(212,160,23,0.28)', borderTopColor: gold, borderTopWidth: 3, borderWidth: 1, maxWidth: 460, padding: 28, width: '100%' },
  formBoxCompact: { marginTop: 20, maxWidth: 640 },
  formTitle: { color: '#fff', fontFamily: 'Heebo', fontSize: 24, fontWeight: '900', marginBottom: 6 },
  formSub: { color: 'rgba(255,255,255,0.6)', fontFamily: 'Heebo', fontSize: 14, marginBottom: 18 },
  inputRow: { flexDirection: 'row-reverse', gap: 12 },
  inputRowMobile: { flexDirection: 'column', gap: 0 },
  field: { flex: 1, marginBottom: 12 },
  label: { color: gold, fontFamily: 'Heebo', fontSize: 12, fontWeight: '800', marginBottom: 7 },
  input: { backgroundColor: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.14)', borderWidth: 1, color: '#fff', direction: 'rtl', fontFamily: 'Heebo', minHeight: 48, outlineStyle: 'none', paddingHorizontal: 14 },
  submit: { alignItems: 'center', backgroundColor: gold, marginTop: 6, minHeight: 50, justifyContent: 'center', paddingHorizontal: 12 },
  submitDisabled: { opacity: 0.58 },
  submitText: { color: deep, fontFamily: 'Heebo', fontWeight: '900' },
  note: { color: 'rgba(255,255,255,0.5)', fontFamily: 'Heebo', fontSize: 12, marginTop: 12, textAlign: 'center' },
  marquee: { backgroundColor: '#050e22', borderBottomColor: 'rgba(212,160,23,0.18)', borderBottomWidth: 1, borderTopColor: 'rgba(212,160,23,0.18)', borderTopWidth: 1, overflow: 'hidden', paddingVertical: 22 },
  marqueeText: { color: 'rgba(255,255,255,0.8)', fontFamily: 'Cormorant Garamond', fontSize: 32, whiteSpace: 'nowrap' },
  section: { backgroundColor: '#08162e', paddingHorizontal: 34, paddingVertical: 82 },
  sectionMobile: { paddingHorizontal: 18, paddingVertical: 54 },
  center: { alignItems: 'center' },
  sectionTitle: { color: '#fff', fontFamily: 'Cormorant Garamond', fontSize: 54, fontWeight: '700', lineHeight: 60, maxWidth: 820 },
  sectionTitleMobile: { fontSize: 38, lineHeight: 44 },
  sectionText: { color: 'rgba(255,255,255,0.68)', fontFamily: 'Heebo', fontSize: 17, lineHeight: 31, marginTop: 18, maxWidth: 620 },
  statsGrid: { flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 16, marginTop: 34 },
  statCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderColor: 'rgba(212,160,23,0.22)', borderWidth: 1, flexGrow: 1, minWidth: 180, padding: 24 },
  statNum: { color: gold, fontFamily: 'Cormorant Garamond', fontSize: 50, fontWeight: '700', textAlign: 'center' },
  statLabel: { color: '#fff', fontFamily: 'Heebo', fontWeight: '800', textAlign: 'center' },
  split: { alignItems: 'center', flexDirection: 'row-reverse', gap: 38, justifyContent: 'center' },
  splitMobile: { alignItems: 'stretch', flexDirection: 'column', gap: 28 },
  splitText: { maxWidth: 560 },
  videoFrame: { alignItems: 'center', aspectRatio: 16 / 10, backgroundImage: 'linear-gradient(145deg,#07122c,#19305a)', borderColor: 'rgba(212,160,23,0.32)', borderWidth: 1, justifyContent: 'center', maxWidth: 560, width: '100%' },
  play: { color: gold, fontSize: 58 },
  videoDuration: { color: 'rgba(255,255,255,0.62)', fontFamily: 'Heebo', marginTop: 12 },
  founderMark: { alignItems: 'center', aspectRatio: 1, backgroundColor: '#050e22', borderColor: 'rgba(212,160,23,0.3)', borderWidth: 1, justifyContent: 'center', maxWidth: 390, width: '100%' },
  founderInitial: { color: gold, fontFamily: 'Cormorant Garamond', fontSize: 160, fontWeight: '700' },
  founderLabel: { color: '#fff', fontFamily: 'Heebo', fontWeight: '800', letterSpacing: 4 },
  signature: { color: gold, fontFamily: 'Cormorant Garamond', fontSize: 34, marginTop: 22 },
  horizontal: { flexDirection: 'row-reverse', gap: 18, paddingVertical: 30 },
  productCard: { backgroundColor: 'rgba(255,255,255,0.045)', borderColor: 'rgba(212,160,23,0.18)', borderWidth: 1, flexShrink: 0, padding: 18, width: 280 },
  productArt: { alignItems: 'center', aspectRatio: 1, backgroundColor: '#050e22', justifyContent: 'center', marginBottom: 16 },
  productIcon: { color: 'rgba(212,160,23,0.42)', fontSize: 76 },
  productName: { color: '#fff', fontFamily: 'Cormorant Garamond', fontSize: 26, fontWeight: '700' },
  productDesc: { color: 'rgba(255,255,255,0.58)', fontFamily: 'Heebo', fontSize: 14, lineHeight: 22, marginTop: 6 },
  imageCard: { backgroundColor: 'rgba(255,255,255,0.045)', borderColor: 'rgba(212,160,23,0.18)', borderWidth: 1, flexShrink: 0, padding: 14, width: 300 },
  pieceImage: { aspectRatio: 1, backgroundColor: '#050e22', marginBottom: 14, width: '100%' },
  testimonial: { backgroundColor: 'rgba(255,255,255,0.045)', borderColor: 'rgba(212,160,23,0.18)', borderWidth: 1, flexShrink: 0, minHeight: 230, padding: 22, width: 320 },
  stars: { color: gold, letterSpacing: 3, marginBottom: 12 },
  quote: { color: '#fff', fontFamily: 'Heebo', fontSize: 16, lineHeight: 28 },
  testimonialName: { color: gold, fontFamily: 'Heebo', fontWeight: '900', marginTop: 18 },
  footer: { alignItems: 'center', backgroundColor: '#050e22', paddingVertical: 44 },
  footerLogo: { color: gold, fontFamily: 'Cormorant Garamond', fontSize: 42, fontWeight: '700', letterSpacing: 9 },
  footerText: { color: 'rgba(255,255,255,0.48)', fontFamily: 'Heebo', marginTop: 8 },
});

createRoot(document.getElementById('root')).render(<App />);
