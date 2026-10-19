/** Curated illustrative photos; each verified as free-use under its source's Unsplash Licence.
 * Do not imply a depicted person is Reeja, an IISH participant or a patient in her care.
 * Copyright/credit details are on each linked source page. */
export type BlogImage = { id: string; alt: string; photographer: string; sourceUrl: string; src: string; };

const imageLibrary = {
  "newborn": {
    "id": "photo-1766299892744-a0b9d4e11707",
    "alt": "Mother holding and feeding her newborn in a hospital setting",
    "photographer": "Brian Wangenheim",
    "sourceUrl": "https://unsplash.com/photos/mother-holding-a-newborn-baby-while-breastfeeding-veQxbcl8vog"
  },
  "obstetric": {
    "id": "photo-1632053652571-a6a45052bbbd",
    "alt": "Obstetrician talking with a pregnant woman during a clinical visit",
    "photographer": "CDC",
    "sourceUrl": "https://unsplash.com/photos/a-doctor-talking-to-a-pregnant-woman-in-a-waiting-room-c8fnD1rKGCk"
  },
  "records": {
    "id": "photo-1758691462814-485c3672e447",
    "alt": "Healthcare professional documenting observations in a clinical chart",
    "photographer": "Vitaly Gariev",
    "sourceUrl": "https://unsplash.com/photos/doctor-writing-on-clipboard-in-office-xDNwySMfR5I"
  },
  "telehealth": {
    "id": "photo-1758691462743-f9fc9e430d39",
    "alt": "Medical professional providing an illustrative telehealth consultation",
    "photographer": "Vitaly Gariev",
    "sourceUrl": "https://unsplash.com/photos/doctor-consulting-patient-via-video-call-on-laptop-c1ZGaJTOnJs"
  },
  "glucose": {
    "id": "photo-1683726276540-7c2b09271c8e",
    "alt": "Person checking their blood glucose with a meter",
    "photographer": "Sweet Life",
    "sourceUrl": "https://unsplash.com/photos/a-person-using-a-gluco-meter-8Gc4ZTp1ZL0"
  },
  "pressure": {
    "id": "photo-1631815587646-b85a1bb027e1",
    "alt": "Blood-pressure measurement during a clinical check",
    "photographer": "CDC",
    "sourceUrl": "https://unsplash.com/photos/a-doctor-checking-the-blood-pressure-of-a-patient-XdErxxR6Xog"
  },
  "nurse": {
    "id": "photo-1761234852472-85aeea9c3eac",
    "alt": "Registered nurse wearing scrubs and a stethoscope",
    "photographer": "Lisa Marie Theck",
    "sourceUrl": "https://unsplash.com/photos/a-woman-in-green-scrubs-with-a-stethoscope-O8ekTIhHBRY"
  },
  "babyhand": {
    "id": "photo-1773243086593-d36487e39a0b",
    "alt": "Gentle hand holding of a newborn baby",
    "photographer": "Olivia Anne Snyder",
    "sourceUrl": "https://unsplash.com/photos/adult-hand-holding-a-newborn-babys-hand-Dn_t8uidLs8"
  },
  "mother": {
    "id": "photo-1767776039586-9b4d08ce9f57",
    "alt": "Mother holding her baby while looking out a window",
    "photographer": "Alicia Christin Gerald",
    "sourceUrl": "https://unsplash.com/photos/mother-holding-a-baby-looking-out-window-yRng4oJBkNE"
  },
  "counselling": {
    "id": "photo-1758691463084-17ed846d4a50",
    "alt": "Doctor giving a patient reassuring support during a conversation",
    "photographer": "Vitaly Gariev",
    "sourceUrl": "https://unsplash.com/photos/doctor-consults-with-a-distressed-male-patient-in-office-nUQIh8RH2XQ"
  },
  "computer": {
    "id": "photo-1758691461888-b74515208d7a",
    "alt": "Healthcare professional working at a computer",
    "photographer": "Vitaly Gariev",
    "sourceUrl": "https://unsplash.com/photos/doctor-typing-on-computer-in-office-vHm47nsCBkM"
  },
  "vaccination": {
    "id": "photo-1623682687826-fe06bf64e6d8",
    "alt": "Gloved hands handling an illustrative vaccination syringe",
    "photographer": "Mika Baumeister",
    "sourceUrl": "https://unsplash.com/photos/person-in-white-pants-and-white-shirt-holding-clear-glass-tube-8Qi6Yn6qDyA"
  },
  "vaccineclinic": {
    "id": "photo-1578308175085-444a1fbea0fe",
    "alt": "Nurse preparing an influenza vaccine in a clinical setting",
    "photographer": "CDC",
    "sourceUrl": "https://unsplash.com/photos/person-holding-syringe-and-vial-_zFRhU7jqzc"
  },
  "newmother": {
    "id": "photo-1769499542678-cce34048337d",
    "alt": "Mother holding and looking at her newborn baby",
    "photographer": "Marius Muresan",
    "sourceUrl": "https://unsplash.com/photos/young-mother-holding-her-newborn-baby-E6iITmX0T5Y"
  },
  "meter": {
    "id": "photo-1684157007022-846d2fe6d5ef",
    "alt": "Hand holding a digital glucose meter displaying a blood sugar result",
    "photographer": "Sweet Life",
    "sourceUrl": "https://unsplash.com/photos/a-person-holding-a-gluco-meter-XQayhIz6di4"
  }
} as const;

const articleImageKeys: Record<string, keyof typeof imageLibrary> = {
  "kangaroo-mother-care-who-2025-guide-parents-nurses": "newborn",
  "hpv-vaccine-nepal-2026-cervical-cancer-prevention": "vaccination",
  "postpartum-infection-warning-signs-nursing-guide-2026": "newmother",
  "pre-eclampsia-pregnancy-warning-signs-monitoring-2026": "pressure",
  "gestational-diabetes-in-pregnancy-2026-monitoring-care": "glucose",
  "postpartum-haemorrhage-2026-nursing-recognition-response": "obstetric",
  "nursing-careers-2026-who-workforce-report-nepal": "nurse",
  "essential-maternal-newborn-care-guide-2026": "babyhand",
  "top-10-postpartum-counselling-tips-new-nurses": "mother",
  "mastering-nursing-documentation-sbar-handover": "records",
  "general-care-nursing-common-challenges": "counselling",
  "safeguarding-confidentiality-healthcare-nurses-protect-patient-rights": "computer",
  "comprehensive-newborn-care-level-ii-what-nurses-learn": "newborn",
  "mental-health-maternal-care-supporting-mothers-beyond-delivery": "mother",
  "future-of-nursing-in-nepal-telehealth-community-care-post-covid": "telehealth",
  "navigating-nurse-licensure-continuing-education-nepal": "nurse",
  "from-nursing-student-to-registered-nurse-my-journey": "vaccineclinic"
};

export function getBlogImage(slug: string): BlogImage {
  const key = articleImageKeys[slug];
  if (!key) throw new Error(`No editorial image selected for article ${slug}`);
  const { id, alt, photographer, sourceUrl } = imageLibrary[key];
  return { id, alt: `Illustrative photo: ${alt}`, photographer, sourceUrl, src: `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=1400` };
}

export const getBlogImageSrcSet = (image: BlogImage) => [360,720,1080,1400].map(width=>`https://images.unsplash.com/${image.id}?auto=format&fit=crop&q=78&w=${width} ${width}w`).join(', ');
