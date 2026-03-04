# Resume Coverage Matrix

| Resume Item | Website Section | Component File | Status | Notes |
|---|---|---|---|---|
| Name + role | Hero | `src/components/Hero.astro` | Covered | Displays full name and registered nurse role. |
| Email | Contact | `src/components/ContactSection.astro` | Covered | Public email shown with `mailto`. |
| Phone | Contact | `src/components/ContactSection.astro` | Covered | Public phone shown with `tel`. |
| Location | Hero + Contact | `src/components/Hero.astro`, `src/components/ContactSection.astro` | Covered | City-level location used. |
| Summary paragraph | Profile | `src/components/ProfileSection.astro` | Covered | Concise résumé-grounded summary. |
| Core competencies list | Core Competencies | `src/components/CoreCompetenciesSection.astro` | Covered | Dedicated section. |
| Work experience (3 roles) | Experience | `src/components/ExperienceSection.astro` | Covered | TUTH, MMTH, Sindhuli included. |
| Role responsibilities bullets | Experience | `src/components/ExperienceSection.astro` | Covered | Max 3 bullets each role. |
| Education: B.Sc Nursing | Education | `src/components/EducationSection.astro` | Covered | Includes period and percentage. |
| Education: +2 Science | Education | `src/components/EducationSection.astro` | Covered | Includes period and percentage. |
| Education: SLC | Education | `src/components/EducationSection.astro` | Covered | Includes period and percentage. |
| RN license validity | Certifications | `src/components/CertificationsSection.astro` | Covered | RN card includes registration and validity note. |
| CNC Level II | Certifications | `src/components/CertificationsSection.astro` | Covered | Included with issuer/date. |
| OTTM | Certifications | `src/components/CertificationsSection.astro` | Covered | Included with issuer/date. |
| CPR | Certifications | `src/components/CertificationsSection.astro` | Covered | Included with issuer/date. |
| Skills groups (5) | Skills | `src/components/SkillsSection.astro` | Covered | Five grouped cards. |
| Detailed skill descriptions | Skill Details | `src/components/SkillDetailsSection.astro` | Covered | Dedicated section for expanded detail. |
| Languages (4) | Languages | `src/components/LanguagesSection.astro` | Covered | Nepali, Newari, English, Hindi. |
| Honors/Awards | Awards | `src/components/AwardsSection.astro` | Covered | Rendered conditionally; one valid award present. |
| References names + titles | Recommendations | `src/components/RecommendationsSection.astro` | Covered | Contact details intentionally hidden. |
| Personal details | Personal Details | `src/components/PersonalDetailsSection.astro` | Covered | Conservative privacy mapping applied. |
| Keywords list | Keywords | `src/components/KeywordsSection.astro` | Covered | Rendered as compact chips. |
| Contact details available on request note | Recommendations | `src/components/RecommendationsSection.astro` | Covered | Added per privacy rule. |

## Privacy Transformations Applied

- References: names and titles only; no phone/email published.
- DOB: reduced to year only.
- Gender and marital status: shown as “Available on request”.
- Addresses: city-level only.
