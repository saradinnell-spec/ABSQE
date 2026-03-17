import { useState, useEffect } from "react";

// ABS Written QE Study Schedule — July 29, 2026
// Weeks run Sunday–Saturday. Starts Week 1: Sun Mar 16 (plan day) → study begins Mon Mar 17.
// NO oral board prep — written exam only.
// Saturday: 50–60 Qs timed block + deep incorrect review
// Sunday: full mock exam (periodic) OR week planning + analytics review
// Weeks 1–13: TrueLearn primary question bank
// Weeks 14+: TrueLearn complete → SCORE questions become primary bank
// Cameron's = Cameron's Current Surgical Therapy 15th Edition (exact chapter titles)

const WEEKS = [
  // ═══ PHASE 1: FOUNDATION (Weeks 1–5) ═══
  {
    week:1, phase:1, phaseName:"Foundation",
    dates:"Mar 16–22",
    topic:"Perioperative Care & Critical Care I",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"ERAS Protocols for General Surgery · Fluid and Electrolyte Therapy · Preoperative Optimization · Postoperative Respiratory Failure · Nutrition Therapy in the Critically Ill Surgical Patient",
    score:"Perioperative Care module (read-through only this week)",
    btk:"Preop optimization / ERAS episode",
    focus:"ERAS pathway, fluid/electrolyte management, pre-op optimization, post-op respiratory failure, surgical nutrition",
    days:[
      {day:"Sun", label:"Sun Mar 16 — SETUP DAY", tasks:[
        "Set up study space and calendar — block all 19 weeks as non-negotiable OR time",
        "Read Cameron's: ERAS Protocols for General Surgery — full chapter",
        "Write the ERAS pathway from memory after reading (key steps only)",
        "Plan this week: assign TrueLearn categories, reading days, Saturday block",
      ]},
      {day:"Mon", label:"Mon Mar 17 ★ DAY 1", tasks:[
        "TrueLearn: 30 Qs – Perioperative Care (timed, 40 min)",
        "Immediately review ALL incorrect answers — read every explanation fully",
        "Cameron's: Fluid and Electrolyte Therapy — read + annotate",
      ]},
      {day:"Tue", label:"Tue Mar 18", tasks:[
        "Cameron's: Preoperative Optimization — read + annotate",
        "SCORE: Perioperative Care module — read through (save questions for later)",
        "Self-quiz from memory: Pre-op cardiac workup indications, nutritional optimization criteria, PFT thresholds",
      ]},
      {day:"Wed", label:"Wed Mar 19", tasks:[
        "TrueLearn: 30 Qs – Critical Care (timed, 40 min)",
        "Review ALL incorrect answers with full explanations — time = 1× question time",
        "Write a 5-item formula sheet: A-a gradient, FENa, anion gap, Henderson-Hasselbalch, Parkland",
      ]},
      {day:"Thu", label:"Thu Mar 20", tasks:[
        "Cameron's: Postoperative Respiratory Failure + Nutrition Therapy in the Critically Ill — read",
        "SCORE: Perioperative module continued — read curriculum outline",
        "Self-quiz: ARDS Berlin criteria, ventilator settings, weaning parameters, TPN vs EN indications",
      ]},
      {day:"Fri", label:"Fri Mar 21", tasks:[
        "TrueLearn: 30 Qs – mixed periop/critical care (timed, 40 min)",
        "Review ALL incorrect answers — categorize by subtopic in error log",
        "Re-read any Cameron's sections that correspond to your incorrect answers today",
      ]},
      {day:"Sat", label:"Sat Mar 22 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 50 Qs – Periop + Critical Care BLOCK (timed, 65 min) — do not interrupt",
        "Review ALL incorrect answers immediately — spend equal time reviewing as testing",
        "For each incorrect: identify WHY you got it wrong (knowledge gap vs misread vs trap)",
        "Write 1-page Perioperative + Critical Care pearl sheet — keep for Phase 3 review",
      ]},
    ]
  },
  {
    week:2, phase:1, phaseName:"Foundation",
    dates:"Mar 23–29",
    topic:"Esophagus",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"Esophageal Function Tests · Surgical Management of Gastroesophageal Reflux Disease · New Approaches to GERD (LINX) · Management of Barrett Esophagus · Management of Paraesophageal Hernia Repair · Management of Zenker Diverticulum · Esophageal Achalasia · Management of Disorders of Esophageal Motility · Management of Esophageal Cancer · Use of Esophageal Stents · Management of Esophageal Perforation",
    score:"Esophagus module",
    btk:"Esophageal cancer / Achalasia episode",
    focus:"GERD, Barrett's surveillance, LINX, paraesophageal hernia, Zenker, achalasia, motility disorders, esophageal CA staging, perforation (Boerhaave vs iatrogenic)",
    days:[
      {day:"Sun", label:"Sun Mar 23 — WEEK REVIEW", tasks:[
        "Review Week 1 TrueLearn analytics — which periop subtopics were weakest?",
        "Flag weak subtopics for extra drill in Phase 3",
        "Read Cameron's: Esophageal Function Tests — read before starting Week 2",
        "Plan Week 2 daily sessions",
      ]},
      {day:"Mon", label:"Mon Mar 24", tasks:[
        "TrueLearn: 30 Qs – Esophagus (timed, 40 min)",
        "Review ALL incorrect answers — read full explanations",
        "Cameron's: Surgical Management of GERD + New Approaches to GERD (LINX) + Management of Barrett Esophagus — read",
      ]},
      {day:"Tue", label:"Tue Mar 25", tasks:[
        "Cameron's: Management of Paraesophageal Hernia Repair + Management of Zenker Diverticulum — read",
        "SCORE: Esophagus module — read curriculum",
        "Self-quiz: Barrett's surveillance intervals by grade, DeMeester score, LINX candidacy criteria, Zenker management",
      ]},
      {day:"Wed", label:"Wed Mar 26", tasks:[
        "TrueLearn: 30 Qs – Esophagus continued (timed, 40 min)",
        "Review ALL incorrect answers",
        "Cameron's: Esophageal Achalasia + Management of Disorders of Esophageal Motility — read",
      ]},
      {day:"Thu", label:"Thu Mar 27", tasks:[
        "Cameron's: Management of Esophageal Cancer — read fully (high-yield for exam)",
        "Key table from memory: T/N/M staging, neoadjuvant indications (CROSS trial), Ivor-Lewis vs McKeown vs transhiatal",
        "SCORE: Esophagus — note high-yield subtopics for later question drilling",
      ]},
      {day:"Fri", label:"Fri Mar 28", tasks:[
        "Cameron's: Use of Esophageal Stents + Management of Esophageal Perforation — read",
        "TrueLearn: 30 Qs – Esophagus mixed (timed, 40 min)",
        "Review ALL incorrect answers — re-read corresponding Cameron's section for each miss",
      ]},
      {day:"Sat", label:"Sat Mar 29 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 50 Qs – Esophagus full block (timed, 65 min)",
        "Review ALL incorrect answers — spend equal time as testing (65 min review)",
        "For each incorrect: find the answer in Cameron's and read that paragraph",
        "Write 1-page Esophagus pearl sheet",
      ]},
    ]
  },
  {
    week:3, phase:1, phaseName:"Foundation",
    dates:"Mar 30–Apr 5",
    topic:"Stomach & Small Bowel",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"Benign Gastric Ulcer · Management of Duodenal Ulcers · Management of Zollinger-Ellison Syndrome · Management of Mallory-Weiss Syndrome · Management of Gastric Adenocarcinoma · Familial Gastric Cancer · Management of GI Stromal Tumors · Management of Morbid Obesity · Management of Small Bowel Obstruction · Management of Crohn Disease of the Small Bowel · Management of Small Bowel Tumors · Management of Short Bowel Syndrome · Management of Enterocutaneous Fistulae",
    score:"Stomach + Small Bowel modules",
    btk:"Gastric cancer / Bariatric complications episode",
    focus:"PUD surgical indications, ZES, gastric CA staging, GIST (imatinib), bariatric procedures + complications, SBO management, Crohn's SB, ECF management",
    days:[
      {day:"Sun", label:"Sun Mar 30 — WEEK REVIEW", tasks:[
        "Review Week 2 TrueLearn analytics — flag weak esophagus subtopics",
        "Re-read any Cameron's esophagus section you missed questions on",
        "Plan Week 3 daily sessions",
      ]},
      {day:"Mon", label:"Mon Mar 31", tasks:[
        "TrueLearn: 30 Qs – Stomach (timed, 40 min)",
        "Review ALL incorrect answers",
        "Cameron's: Benign Gastric Ulcer + Management of Duodenal Ulcers + Management of Mallory-Weiss Syndrome — read",
      ]},
      {day:"Tue", label:"Tue Apr 1", tasks:[
        "Cameron's: Management of Zollinger-Ellison Syndrome + Management of Gastric Adenocarcinoma + Familial Gastric Cancer — read",
        "SCORE: Stomach module — read curriculum",
        "Self-quiz from memory: ZES diagnosis (fasting gastrin >150, secretin stim test), gastric CA staging, D2 dissection indications, Lauren classification",
      ]},
      {day:"Wed", label:"Wed Apr 2", tasks:[
        "TrueLearn: 30 Qs – Small Bowel (timed, 40 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of GI Stromal Tumors + Management of Morbid Obesity — read",
      ]},
      {day:"Thu", label:"Thu Apr 3", tasks:[
        "Cameron's: Management of Small Bowel Obstruction + Management of Crohn Disease of the Small Bowel — read",
        "SCORE: Small Bowel module — read curriculum",
        "Algorithm from memory: SBO — partial vs complete, nonoperative criteria, operative indications, closed loop",
      ]},
      {day:"Fri", label:"Fri Apr 4", tasks:[
        "Cameron's: Management of Small Bowel Tumors + Management of Short Bowel Syndrome + Management of Enterocutaneous Fistulae — read",
        "TrueLearn: 30 Qs – mixed Stomach/Small Bowel (timed, 40 min)",
        "Review ALL incorrect answers — cross-reference Cameron's for each miss",
      ]},
      {day:"Sat", label:"Sat Apr 5 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 50 Qs – Stomach + Small Bowel block (timed, 65 min)",
        "Review ALL incorrect answers — equal review time (65 min)",
        "Re-read Cameron's sections for any topic with ≥2 misses this week",
        "Write 1-page Stomach + Small Bowel pearl sheet",
      ]},
    ]
  },
  {
    week:4, phase:1, phaseName:"Foundation",
    dates:"Apr 6–12",
    topic:"Large Bowel, Anorectum & Appendix",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"Diverticular Disease of the Colon · Management of Chronic Ulcerative Colitis · Management of Toxic Megacolon · Management of Crohn Colitis · Ischemic Colitis · Management of Large Bowel Obstruction · Management of Colonic Volvulus · Surgical Management of Colon Cancer · Neoadjuvant and Adjuvant Therapy for Colorectal Cancer · Surgical Management of the Polyposis Syndromes · Management of Colorectal Polyps · Management of Rectal Cancer · Diagnosis and Management of Acute Appendicitis · Management of Hemorrhoids · Management of Anal Fissure · Management of Anorectal Abscess and Fistula · Management of Rectal Prolapse",
    score:"Colorectal + Anorectal modules",
    btk:"Colorectal cancer / IBD episode",
    focus:"Diverticulitis (Hinchey), UC vs Crohn's colitis, toxic megacolon, colon CA staging/adjuvant, rectal CA (TME, neoadjuvant), polyposis syndromes, appendicitis, anorectal disorders",
    days:[
      {day:"Sun", label:"Sun Apr 6 — WEEK REVIEW", tasks:[
        "Review Week 3 TrueLearn analytics — flag weak stomach/SB subtopics",
        "Re-read any Cameron's sections missed",
        "Plan Week 4 daily sessions",
      ]},
      {day:"Mon", label:"Mon Apr 7", tasks:[
        "TrueLearn: 30 Qs – Colorectal (timed, 40 min)",
        "Review ALL incorrect answers",
        "Cameron's: Diverticular Disease of the Colon + Management of Chronic Ulcerative Colitis + Management of Toxic Megacolon — read",
      ]},
      {day:"Tue", label:"Tue Apr 8", tasks:[
        "Cameron's: Management of Crohn Colitis + Ischemic Colitis + Management of Large Bowel Obstruction + Management of Colonic Volvulus — read",
        "SCORE: Colorectal module — read curriculum",
        "Self-quiz: Hinchey classification + Hartmann's vs primary anastomosis criteria, UC vs Crohn's distinguishing features, toxic megacolon management",
      ]},
      {day:"Wed", label:"Wed Apr 9", tasks:[
        "TrueLearn: 30 Qs – Colorectal continued (timed, 40 min)",
        "Review ALL incorrect answers",
        "Cameron's: Surgical Management of Colon Cancer + Neoadjuvant and Adjuvant Therapy for Colorectal Cancer + Surgical Management of the Polyposis Syndromes — read",
      ]},
      {day:"Thu", label:"Thu Apr 10", tasks:[
        "Cameron's: Management of Rectal Cancer + Management of Colorectal Polyps + Management of Rectal Prolapse — read",
        "Table from memory: Rectal CA — staging, neoadjuvant criteria (T3/T4 or N+), TME, APR vs LAR, diverting loop ileostomy indications",
        "SCORE: Anorectal module — read curriculum",
      ]},
      {day:"Fri", label:"Fri Apr 11", tasks:[
        "Cameron's: Diagnosis and Management of Acute Appendicitis + Management of Hemorrhoids + Management of Anal Fissure + Management of Anorectal Abscess and Fistula — read",
        "TrueLearn: 30 Qs – Anorectal + Appendix (timed, 40 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
      ]},
      {day:"Sat", label:"Sat Apr 12 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 50 Qs – Colorectal + Anorectal block (timed, 65 min)",
        "Review ALL incorrect answers — equal review time (65 min)",
        "Re-read Cameron's sections for topics with ≥2 misses",
        "Write 1-page Colorectal + Anorectal pearl sheet",
      ]},
    ]
  },
  {
    week:5, phase:1, phaseName:"Foundation",
    dates:"Apr 13–19",
    topic:"Breast Disease",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"Benign Breast Disease · Screening for Breast Cancer · Image-Guided Biopsy in Assessment and Management of Breast Disease · Molecular Targets in Breast Cancer · Breast Cancer: Surgical Therapy · Lymphatic Mapping and Sentinel Lymph Node Biopsy · Management of the Axilla in Breast Cancer · Ductal and Lobular Carcinoma in Situ · Advances in Neoadjuvant and Adjuvant Therapy for Breast Cancer · Management of Recurrent and Metastatic Breast Cancer · Genetic Counseling and Testing for Breast Cancer · Management of Male Breast Cancer · Breast Reconstruction After Mastectomy",
    score:"Breast module",
    btk:"Breast cancer management / BRCA episode",
    focus:"DCIS/LCIS, invasive CA (AJCC 8th ed staging), SLN biopsy (Z0011 criteria), neoadjuvant indications, HR/HER2 treatment, BRCA counseling, reconstruction",
    days:[
      {day:"Sun", label:"Sun Apr 13 📝 MOCK EXAM #1", tasks:[
        "FULL MOCK EXAM: 80 Qs timed (2 hrs 40 min) — Periop, Esophagus, Stomach/SB, Colorectal",
        "Score and record in progress tracker — target ≥65%",
        "Review ALL incorrect answers (take as long as needed — this is your study session)",
        "Categorize misses by topic — add to error log for Phase 3",
      ]},
      {day:"Mon", label:"Mon Apr 14", tasks:[
        "TrueLearn: 30 Qs – Breast (timed, 40 min)",
        "Review ALL incorrect answers",
        "Cameron's: Benign Breast Disease + Screening for Breast Cancer + Image-Guided Biopsy — read",
      ]},
      {day:"Tue", label:"Tue Apr 15", tasks:[
        "Cameron's: Molecular Targets in Breast Cancer + Breast Cancer: Surgical Therapy + Lymphatic Mapping and Sentinel Lymph Node Biopsy — read",
        "SCORE: Breast module — read curriculum",
        "Self-quiz: Z0011 criteria (≤2 positive SLNs, T1/T2, no matted nodes), ALND indications, ACOSOG Z0011 vs AMAROS",
      ]},
      {day:"Wed", label:"Wed Apr 16", tasks:[
        "TrueLearn: 30 Qs – Breast continued (timed, 40 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of the Axilla in Breast Cancer + Ductal and Lobular Carcinoma in Situ — read",
      ]},
      {day:"Thu", label:"Thu Apr 17", tasks:[
        "Cameron's: Advances in Neoadjuvant and Adjuvant Therapy for Breast Cancer + Management of Recurrent and Metastatic Breast Cancer — read",
        "Cameron's: Genetic Counseling and Testing for Breast Cancer + Management of Male Breast Cancer + Breast Reconstruction After Mastectomy — read",
        "Table from memory: AJCC 8th ed breast staging, HR+/HER2+ treatment pathways, BRCA1 vs BRCA2 cancer risks",
      ]},
      {day:"Fri", label:"Fri Apr 18", tasks:[
        "TrueLearn: 30 Qs – Breast mixed (timed, 40 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
        "Flashcard drill: NSABP B-04, B-06, B-32 trials; TAILORx; BCIRG-006 (HER2)",
      ]},
      {day:"Sat", label:"Sat Apr 19 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – Breast full block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for any topic with ≥2 misses",
        "Write 1-page Breast pearl sheet",
        "Phase 1 check: record TrueLearn % done + accuracy in progress tracker",
      ]},
    ]
  },

  // ═══ PHASE 2: DEEP DIVE (Weeks 6–11) ═══
  {
    week:6, phase:2, phaseName:"Deep Dive",
    dates:"Apr 20–26",
    topic:"Endocrine Surgery",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"Management of Thyroid Nodules · Nontoxic Goiter · Management of Thyroiditis · Management of Hyperthyroidism · Surgical Management of Thyroid Cancer · Primary Hyperparathyroidism · Evaluation and Management of Recurrent and Persistent Hyperparathyroidism · Surgical Management of Secondary and Tertiary Hyperparathyroidism · Adrenal Incidentaloma · Management of Adrenal Cortical Tumors · Management of Pheochromocytoma · Metabolic Changes Following Bariatric Surgery",
    score:"Endocrine modules",
    btk:"Thyroid cancer / Adrenal incidentaloma / MEN syndromes episode",
    focus:"Bethesda classification, thyroid CA (differentiated vs medullary), hyperPTH workup/indications, Cushing's diagnostic algorithm, adrenal incidentaloma workup, pheo preop management, MEN1/2a/2b",
    days:[
      {day:"Sun", label:"Sun Apr 20 — WEEK REVIEW", tasks:[
        "Review Week 5 TrueLearn analytics — flag weak breast subtopics",
        "Re-read any Cameron's breast sections missed",
        "Plan Week 6 daily sessions",
      ]},
      {day:"Mon", label:"Mon Apr 21", tasks:[
        "TrueLearn: 40 Qs – Thyroid/Endocrine (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of Thyroid Nodules + Nontoxic Goiter + Management of Thyroiditis — read",
      ]},
      {day:"Tue", label:"Tue Apr 22", tasks:[
        "Cameron's: Management of Hyperthyroidism + Surgical Management of Thyroid Cancer — read",
        "SCORE: Endocrine module — thyroid section, read curriculum",
        "Algorithm from memory: Bethesda I–VI → management (repeat FNA, lobectomy, thyroidectomy, RAI criteria)",
      ]},
      {day:"Wed", label:"Wed Apr 23", tasks:[
        "TrueLearn: 40 Qs – Parathyroid (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Primary Hyperparathyroidism + Evaluation and Management of Recurrent/Persistent Hyperparathyroidism + Surgical Management of Secondary and Tertiary Hyperparathyroidism — read",
      ]},
      {day:"Thu", label:"Thu Apr 24", tasks:[
        "Cameron's: Adrenal Incidentaloma + Management of Adrenal Cortical Tumors + Management of Pheochromocytoma — read",
        "SCORE: Endocrine module — adrenal section, read curriculum",
        "Self-quiz from memory: Adrenal incidentaloma workup algorithm, pheo preop alpha-blockade, Cushing's low-dose vs high-dose dex suppression, MEN1 vs MEN2a vs MEN2b components",
      ]},
      {day:"Fri", label:"Fri Apr 25", tasks:[
        "TrueLearn: 40 Qs – Adrenal/MEN/mixed Endocrine (timed, 50 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
        "Flashcard: RET proto-oncogene mutations, calcitonin in medullary CA, ZES triple-A, insulinoma whipple's triad",
      ]},
      {day:"Sat", label:"Sat Apr 26 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – Endocrine full block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for topics with ≥2 misses",
        "Write 1-page Endocrine pearl sheet",
      ]},
    ]
  },
  {
    week:7, phase:2, phaseName:"Deep Dive",
    dates:"Apr 27–May 3",
    topic:"Hepatobiliary & Pancreas",
    absWeight:"★★", weightLabel:"Medium Yield",
    camerons:"Management of Asymptomatic Cholelithiasis · Management of Acute Cholecystitis · Management of Common Bile Duct Stones · Management of Acute Cholangitis · Management of Benign Biliary Strictures · Management of Primary Sclerosing Cholangitis · Management of Intrahepatic, Perihilar, and Distal Extrahepatic Cholangiocarcinoma · Surgical Management of Gallbladder Cancer · Management of Malignant Liver Tumors · Hepatocellular Carcinoma: Resection and Transplantation · Management of Colorectal Liver Metastases · Portal Hypertension · Management of Acute Necrotizing Pancreatitis · Gallstone Pancreatitis · Management of Pancreatic Pseudocyst · Management of Chronic Pancreatitis · Management of Periampullary Cancer · Intraductal Papillary Mucinous Neoplasms of the Pancreas · Management of Pancreatic Islet Cell Tumors Excluding Gastrinoma",
    score:"HPB modules",
    btk:"Pancreatitis / Pancreatic cancer episode",
    focus:"Choledocholithiasis workup/ERCP, cholangitis (Charcot/Reynolds), PSC, cholangiocarcinoma, HCC (Milan/BCLC), CRC liver mets, portal HTN, acute pancreatitis (Ranson/BISAP/step-up), pancreatic CA, IPMN",
    days:[
      {day:"Sun", label:"Sun Apr 27 — WEEK REVIEW", tasks:[
        "Review Week 6 TrueLearn analytics — flag weak endocrine subtopics",
        "Re-read any Cameron's endocrine sections missed",
        "Plan Week 7 daily sessions",
      ]},
      {day:"Mon", label:"Mon Apr 28", tasks:[
        "TrueLearn: 40 Qs – Biliary (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of Asymptomatic Cholelithiasis + Management of Acute Cholecystitis + Management of Common Bile Duct Stones + Management of Acute Cholangitis — read",
      ]},
      {day:"Tue", label:"Tue Apr 29", tasks:[
        "Cameron's: Management of Benign Biliary Strictures + Management of Primary Sclerosing Cholangitis + Management of Intrahepatic/Perihilar/Distal Cholangiocarcinoma + Surgical Management of Gallbladder Cancer — read",
        "SCORE: HPB module — biliary section",
        "Self-quiz: Charcot's triad vs Reynolds' pentad, ERCP vs lap CBD exploration decision, Bismuth classification of hilar strictures, PSC vs PBC distinguishing features",
      ]},
      {day:"Wed", label:"Wed Apr 30", tasks:[
        "TrueLearn: 40 Qs – Liver/Portal HTN (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of Malignant Liver Tumors + Hepatocellular Carcinoma: Resection and Transplantation + Management of Colorectal Liver Metastases + Portal Hypertension — read",
      ]},
      {day:"Thu", label:"Thu May 1", tasks:[
        "Cameron's: Management of Acute Necrotizing Pancreatitis + Gallstone Pancreatitis + Management of Pancreatic Pseudocyst + Management of Chronic Pancreatitis — read",
        "SCORE: HPB module — pancreas section",
        "Self-quiz: Ranson's criteria (admission vs 48hr), BISAP score, step-up approach for necrosis (percutaneous → VARD), pseudocyst intervention indications",
      ]},
      {day:"Fri", label:"Fri May 2", tasks:[
        "Cameron's: Management of Periampullary Cancer + IPMN of the Pancreas + Management of Pancreatic Islet Cell Tumors Excluding Gastrinoma — read",
        "TrueLearn: 40 Qs – Pancreas (timed, 50 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
      ]},
      {day:"Sat", label:"Sat May 3 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – HPB full block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for topics with ≥2 misses",
        "Write 1-page HPB pearl sheet",
      ]},
    ]
  },
  {
    week:8, phase:2, phaseName:"Deep Dive",
    dates:"May 4–10",
    topic:"Trauma Surgery",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"Initial Assessment and Resuscitation of the Trauma Patient · Use of Resuscitative Endovascular Balloon Occlusion of the Aorta (REBOA) · The Surgeon's Use of Ultrasound in Trauma and Critical Care · Emergency Department Resuscitative Thoracotomy · Management of Traumatic Brain Injury · Chest Wall Trauma, Hemothorax, and Pneumothorax · Management of Pulmonary Parenchymal Injury · Blunt Abdominal Trauma · Penetrating Abdominal Trauma · Management of Traumatic Liver Injuries · Pancreatic and Duodenal Injuries · The Injured Spleen · Tenets of Damage Control · Early Management of Pelvic Ring Disruption · Abdominal Compartment Syndrome · Burn Wound Management · Medical Management of the Burn Patient · Management of Vascular Injuries · Management of Extremity Compartment Syndrome",
    score:"Trauma module",
    btk:"Damage control resuscitation episode",
    focus:"ATLS primary/secondary survey, FAST, REBOA, ED thoracotomy indications, solid organ injury grading (AAST), damage control sequence, burns (Parkland), TBI (ICP management), ACS, pelvic fractures",
    days:[
      {day:"Sun", label:"Sun May 4 📝 MOCK EXAM #2", tasks:[
        "FULL MOCK EXAM: 100 Qs timed (3 hrs 20 min) — all topics covered so far (Wks 1–7)",
        "Score and record — target ≥67%",
        "Review ALL incorrect answers (full deep review — this is your study session)",
        "Update error log — list top 3 categories with most misses",
      ]},
      {day:"Mon", label:"Mon May 5", tasks:[
        "TrueLearn: 40 Qs – Trauma (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Initial Assessment and Resuscitation + REBOA + Surgeon's Use of Ultrasound + ED Resuscitative Thoracotomy — read",
      ]},
      {day:"Tue", label:"Tue May 6", tasks:[
        "Cameron's: Management of TBI + Chest Wall Trauma/Hemothorax/Pneumothorax + Management of Pulmonary Parenchymal Injury — read",
        "SCORE: Trauma module — section 1",
        "Self-quiz from memory: ED thoracotomy indications (penetrating vs blunt thresholds), TBI ICP management algorithm, massive hemothorax definition and management",
      ]},
      {day:"Wed", label:"Wed May 7", tasks:[
        "TrueLearn: 40 Qs – Trauma continued (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Blunt Abdominal Trauma + Penetrating Abdominal Trauma + Management of Traumatic Liver Injuries + The Injured Spleen + Pancreatic and Duodenal Injuries — read",
      ]},
      {day:"Thu", label:"Thu May 8", tasks:[
        "Cameron's: Tenets of Damage Control + Abdominal Compartment Syndrome + Early Management of Pelvic Ring Disruption + Management of Vascular Injuries + Management of Extremity Compartment Syndrome — read",
        "SCORE: Trauma module — section 2",
        "Self-quiz: Damage control sequence (hemorrhage control → contamination → ICU → planned reoperation), ACS diagnosis + bladder pressure threshold, pelvic fracture hemorrhage control",
      ]},
      {day:"Fri", label:"Fri May 9", tasks:[
        "Cameron's: Burn Wound Management + Medical Management of the Burn Patient — read",
        "TrueLearn: 40 Qs – Burns/Damage Control/Compartment Syndrome (timed, 50 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
      ]},
      {day:"Sat", label:"Sat May 10 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – Trauma full block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for topics with ≥2 misses",
        "Write 1-page Trauma pearl sheet",
      ]},
    ]
  },
  {
    week:9, phase:2, phaseName:"Deep Dive",
    dates:"May 11–17",
    topic:"Vascular Surgery",
    absWeight:"★★★", weightLabel:"High Yield",
    camerons:"Open Repair of Abdominal Aortic Aneurysms · Endovascular Treatment of Abdominal Aortic Aneurysm · Management of Ruptured Abdominal Aortic Aneurysms · Management of Acute Aortic Dissection · Carotid Endarterectomy · Management of Recurrent Carotid Stenosis · Aortoiliac Occlusive Disease · Femoropopliteal Occlusive Disease · Management of Peripheral Arterial Thromboembolism · Acute Peripheral Arterial and Bypass Graft Occlusion · Acute Mesenteric Ischemia · Chronic Mesenteric Ischemia · Venous Thromboembolism: Prevention, Diagnosis and Treatment · Treatment of Varicose Veins · Hemodialysis Access Surgery · Lower Extremity Amputation",
    score:"Vascular modules",
    btk:"AAA / Acute limb ischemia episode",
    focus:"AAA sizing thresholds, EVAR vs open indications, ruptured AAA, aortic dissection (Stanford), carotid (NASCET/symptomatic thresholds), PAD, acute limb ischemia (embolus vs thrombosis), DVT/PE workup and management, mesenteric ischemia",
    days:[
      {day:"Sun", label:"Sun May 11 — WEEK REVIEW", tasks:[
        "Review Week 8 TrueLearn analytics — flag weak trauma subtopics",
        "Re-read any Cameron's trauma sections missed",
        "Plan Week 9 daily sessions",
      ]},
      {day:"Mon", label:"Mon May 12", tasks:[
        "TrueLearn: 40 Qs – Vascular (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Open Repair of AAA + Endovascular Treatment of AAA + Management of Ruptured AAA + Management of Acute Aortic Dissection — read",
      ]},
      {day:"Tue", label:"Tue May 13", tasks:[
        "Cameron's: Carotid Endarterectomy + Management of Recurrent Carotid Stenosis — read",
        "SCORE: Vascular module — aortic/carotid section",
        "Self-quiz from memory: AAA EVAR criteria (neck anatomy, diameter thresholds), NASCET trial results, asymptomatic vs symptomatic CEA thresholds, Stanford A vs B dissection management",
      ]},
      {day:"Wed", label:"Wed May 14", tasks:[
        "TrueLearn: 40 Qs – Vascular continued (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Aortoiliac Occlusive Disease + Femoropopliteal Occlusive Disease + Management of Peripheral Arterial Thromboembolism + Acute Peripheral Arterial and Bypass Graft Occlusion — read",
      ]},
      {day:"Thu", label:"Thu May 15", tasks:[
        "Cameron's: Acute Mesenteric Ischemia + Chronic Mesenteric Ischemia + Venous Thromboembolism: Prevention, Diagnosis and Treatment + Hemodialysis Access Surgery — read",
        "SCORE: Vascular module — peripheral/venous section",
        "Self-quiz: 6 P's of acute ischemia, embolus vs thrombosis distinguishing features, Wells score + PE algorithm, IVC filter indications, mesenteric ischemia (arterial vs venous vs NOMI)",
      ]},
      {day:"Fri", label:"Fri May 16", tasks:[
        "Cameron's: Treatment of Varicose Veins + Lower Extremity Amputation — read",
        "TrueLearn: 40 Qs – mixed Vascular (timed, 50 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
      ]},
      {day:"Sat", label:"Sat May 17 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – Vascular full block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for topics with ≥2 misses",
        "Write 1-page Vascular pearl sheet",
      ]},
    ]
  },
  {
    week:10, phase:2, phaseName:"Deep Dive",
    dates:"May 18–24",
    topic:"Surgical Oncology, Skin & Soft Tissue",
    absWeight:"★★", weightLabel:"Medium Yield",
    camerons:"Management of Cutaneous Melanoma · Non-Melanoma Skin Cancers · Management of Peritoneal Surface Malignancies · Management of Colorectal Liver Metastases · Management of Liver Metastases From Colorectal Carcinoma With Ablation · Management of the Isolated Neck Mass · Necrotizing Skin and Soft Tissue Infections · Management of Peripheral Nerve Injuries",
    score:"Surgical Oncology modules",
    btk:"Melanoma / NSTI episode",
    focus:"Melanoma Breslow staging + margins (1cm/>1mm, 2cm/>2mm) + SLN threshold (>0.8mm), non-melanoma skin CA, NSTI (type I vs II, diagnosis, OR urgency), neck mass workup, peritoneal surface malignancy, colorectal liver mets",
    days:[
      {day:"Sun", label:"Sun May 18 📝 MOCK EXAM #3", tasks:[
        "FULL MOCK EXAM: 100 Qs timed (3 hrs 20 min) — all topics covered (Wks 1–9)",
        "Score and record — target ≥69%",
        "Review ALL incorrect answers — deep review, re-read Cameron's for each miss",
        "Update error log — identify which topics have persistent misses",
      ]},
      {day:"Mon", label:"Mon May 19", tasks:[
        "TrueLearn: 40 Qs – Skin/Melanoma (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of Cutaneous Melanoma + Non-Melanoma Skin Cancers — read",
      ]},
      {day:"Tue", label:"Tue May 20", tasks:[
        "Cameron's: Management of Peritoneal Surface Malignancies + Management of Colorectal Liver Metastases + Management of Liver Metastases With Ablation — read",
        "SCORE: Surgical Oncology module",
        "Self-quiz: Breslow depth → margins table, SLN biopsy threshold (T1b = >0.8mm or any T2), HIPEC indications, CRC liver met resectability criteria",
      ]},
      {day:"Wed", label:"Wed May 21", tasks:[
        "TrueLearn: 40 Qs – Oncology (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of the Isolated Neck Mass + Necrotizing Skin and Soft Tissue Infections + Management of Peripheral Nerve Injuries — read",
      ]},
      {day:"Thu", label:"Thu May 22", tasks:[
        "SCORE: Complete Oncology module — read curriculum",
        "Self-quiz: NSTI type I (polymicrobial) vs type II (GAS/monomicrobial), LRINEC score, NSTI operative approach (wide debridement, second-look 24–48 hrs)",
        "Review: AJCC 8th ed melanoma staging, BRAF V600E mutation, immunotherapy indications (pembrolizumab/nivolumab)",
      ]},
      {day:"Fri", label:"Fri May 23", tasks:[
        "TrueLearn: 40 Qs – mixed oncology/skin (timed, 50 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
        "Flashcard: AJCC melanoma staging (T1a vs T1b, SLN indications), Merkel cell CA, dermatofibrosarcoma protuberans management",
      ]},
      {day:"Sat", label:"Sat May 24 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – Oncology + Skin full block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for topics with ≥2 misses",
        "Write 1-page Oncology + Skin pearl sheet",
      ]},
    ]
  },
  {
    week:11, phase:2, phaseName:"Deep Dive",
    dates:"May 25–31",
    topic:"Thoracic, Hernia & Spleen",
    absWeight:"★★", weightLabel:"Medium Yield",
    camerons:"Management of Spontaneous Primary and Secondary Pneumothorax · Management of Primary Chest Wall Tumors · Mediastinal Masses · Primary Tumors of the Thymus · Management of Tracheal Stenosis · Management of Inguinal Hernia · Management of Recurrent Inguinal Hernia · Incisional, Epigastric, and Umbilical Hernias · Management of Spigelian, Obturator, and Lumbar Hernias · Abdominal Wall Reconstruction · Use of Various Meshes in Hernia Repair · Splenectomy for Hematologic Diseases · Splenic Function and Pathology",
    score:"Thoracic + Hernia + Spleen modules",
    btk:"Complex hernia / Mediastinal mass episode",
    focus:"Pneumothorax management, mediastinal mass (anterior/middle/posterior differentials), inguinal hernia (anatomy, Lichtenstein vs TEP vs TAPP), incisional/ventral hernias, mesh selection, splenectomy indications + vaccines",
    days:[
      {day:"Sun", label:"Sun May 25 — WEEK REVIEW", tasks:[
        "Review Week 10 TrueLearn analytics — flag weak oncology subtopics",
        "Re-read any Cameron's sections missed",
        "Plan Week 11 daily sessions",
      ]},
      {day:"Mon", label:"Mon May 26", tasks:[
        "TrueLearn: 40 Qs – Thoracic (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Management of Spontaneous Primary and Secondary Pneumothorax + Management of Primary Chest Wall Tumors + Mediastinal Masses + Primary Tumors of the Thymus + Management of Tracheal Stenosis — read",
      ]},
      {day:"Tue", label:"Tue May 27", tasks:[
        "Cameron's: Management of Inguinal Hernia + Management of Recurrent Inguinal Hernia — read",
        "SCORE: Hernia module — read curriculum",
        "Self-quiz from memory: Hesselbach's triangle (inferior epigastric, inguinal ligament, lateral edge of rectus), indirect vs direct vs femoral, open Lichtenstein vs TEP vs TAPP — when to use each",
      ]},
      {day:"Wed", label:"Wed May 28", tasks:[
        "TrueLearn: 40 Qs – Hernia (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Incisional, Epigastric, and Umbilical Hernias + Management of Spigelian, Obturator, and Lumbar Hernias + Abdominal Wall Reconstruction + Use of Various Meshes in Hernia Repair — read",
      ]},
      {day:"Thu", label:"Thu May 29", tasks:[
        "Cameron's: Splenectomy for Hematologic Diseases + Splenic Function and Pathology — read",
        "SCORE: Thoracic + Spleen modules — read curriculum",
        "Self-quiz: Splenectomy indications by disease (ITP first-line criteria, TTP, hereditary spherocytosis), post-splenectomy vaccination protocol (pneumococcal, meningococcal, HiB — timing)",
      ]},
      {day:"Fri", label:"Fri May 30", tasks:[
        "TrueLearn: 40 Qs – mixed Thoracic/Hernia/Spleen (timed, 50 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
        "Flashcard: Mesh classification (biologic vs synthetic, heavy vs lightweight), pneumothorax BTS/ACCP guidelines, thymoma Masaoka staging + myasthenia gravis association",
      ]},
      {day:"Sat", label:"Sat May 31 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – Thoracic + Hernia + Spleen full block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for topics with ≥2 misses",
        "Write 1-page Thoracic + Hernia pearl sheet",
        "Phase 2 check: record TrueLearn % done + accuracy — target 65% done, ≥70% accuracy",
      ]},
    ]
  },

  // ═══ PHASE 3: CONSOLIDATION (Weeks 12–16) ═══
  {
    week:12, phase:3, phaseName:"Consolidation",
    dates:"Jun 1–7",
    topic:"Pediatric Surgery, Transplant & Surgical Infections",
    absWeight:"★", weightLabel:"Standard Yield",
    camerons:"Common Pediatric Surgical Emergencies · Surgery in the Elderly and the Frail · Surgical Site Infections · Management of Intra-Abdominal Infections · Septic Response and Management · Multiple Organ Dysfunction and Failure · Antifungal Therapy for Surgical Patients · Acid-Base Homeostasis",
    score:"Pediatric + Transplant + Infections modules",
    btk:"Pediatric surgical emergencies / Sepsis episode",
    focus:"Pyloric stenosis, intussusception, NEC, Hirschsprung's, biliary atresia, CDH, transplant rejection types, SSI prevention, sepsis-3 criteria, acid-base disorders",
    days:[
      {day:"Sun", label:"Sun Jun 1 📝 MOCK EXAM #4", tasks:[
        "FULL MOCK EXAM: 120 Qs timed (4 hrs) — comprehensive all topics, simulate real exam",
        "Score and record — target ≥71%",
        "Review ALL incorrect answers — this is your most important review session yet",
        "List your top 5 weakest categories — these are your Phase 3 targets",
      ]},
      {day:"Mon", label:"Mon Jun 2", tasks:[
        "TrueLearn: 40 Qs – Pediatric Surgery (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Common Pediatric Surgical Emergencies — read complete chapter",
      ]},
      {day:"Tue", label:"Tue Jun 3", tasks:[
        "SCORE: Pediatric Surgery module + Transplant module — read curriculum",
        "Self-quiz from memory: pyloric stenosis (hypochloremic hypokalemic metabolic alkalosis, Ramstedt pyloromyotomy), intussusception (air enema vs OR), NEC Bell staging, Hirschsprung's diagnosis (suction biopsy), Kasai procedure timing, CDH (Bochdalek vs Morgagni, bowel sounds in chest)",
        "Review: transplant rejection types — hyperacute (preformed Ab), acute (T-cell mediated), chronic; calcineurin inhibitors; tacrolimus toxicity",
      ]},
      {day:"Wed", label:"Wed Jun 4", tasks:[
        "TrueLearn: 40 Qs – Infections/Sepsis (timed, 50 min)",
        "Review ALL incorrect answers",
        "Cameron's: Surgical Site Infections + Management of Intra-Abdominal Infections + Septic Response and Management + Multiple Organ Dysfunction and Failure — read",
      ]},
      {day:"Thu", label:"Thu Jun 5", tasks:[
        "Cameron's: Acid-Base Homeostasis + Antifungal Therapy for Surgical Patients + Surgery in the Elderly and the Frail — read",
        "SCORE: Infections + Critical Care modules — read curriculum",
        "Self-quiz: Sepsis-3 definition (infection + SOFA ≥2), septic shock (MAP <65 + vasopressors + lactate >2), 1-hr bundle targets, MODS pathophysiology",
      ]},
      {day:"Fri", label:"Fri Jun 6", tasks:[
        "TrueLearn: 40 Qs – mixed Peds/Transplant/Infections (timed, 50 min)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
        "Acid-base drill: work through 10 ABG interpretation scenarios from memory",
      ]},
      {day:"Sat", label:"Sat Jun 7 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – Peds + Transplant + Infections block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time (80 min)",
        "Re-read Cameron's for topics with ≥2 misses",
        "Write 1-page Peds + Transplant pearl sheet",
      ]},
    ]
  },
  {
    week:13, phase:3, phaseName:"Consolidation",
    dates:"Jun 8–14",
    topic:"Weak Area Attack I — Your 3 Weakest Categories",
    absWeight:"★★★", weightLabel:"Personalized",
    camerons:"Re-read exact Cameron's chapters corresponding to your weakest TrueLearn categories",
    score:"Re-do SCORE modules where you scored <70%",
    btk:"Listen to episodes matching your 3 weakest topics",
    focus:"This week is 100% driven by your TrueLearn analytics. Pull your data and execute.",
    days:[
      {day:"Sun", label:"Sun Jun 8 — ANALYTICS REVIEW", tasks:[
        "Pull TrueLearn analytics — rank ALL categories by % correct",
        "Identify your 3 weakest categories — write them down and commit to the week",
        "Re-read Cameron's chapters for Weak Category #1 today",
        "Plan Week 13: assign Mon/Wed/Fri to Qs, Tue/Thu to reading + SCORE",
      ]},
      {day:"Mon", label:"Mon Jun 9", tasks:[
        "TrueLearn: 50 Qs – Weak Category #1 ONLY (timed)",
        "Review ALL incorrect answers — read every explanation + the relevant Cameron's paragraph",
        "Write out the key facts for this category from memory after reviewing",
      ]},
      {day:"Tue", label:"Tue Jun 10", tasks:[
        "Re-read all Cameron's chapters for Weak Category #2",
        "SCORE: Re-do the module for Weak Category #2 — read curriculum + any practice questions available",
        "Write 1-page high-yield sheet for Category #2 from memory — compare to Cameron's",
      ]},
      {day:"Wed", label:"Wed Jun 11", tasks:[
        "TrueLearn: 50 Qs – Weak Category #2 (timed)",
        "Review ALL incorrect answers — equal review time",
        "Re-read Cameron's for Weak Category #3",
      ]},
      {day:"Thu", label:"Thu Jun 12", tasks:[
        "SCORE: Re-do module for Weak Category #3",
        "TrueLearn: 25 Qs – re-test Category #1 — are you improving? (target +5–8% accuracy)",
        "Review ALL incorrect answers",
      ]},
      {day:"Fri", label:"Fri Jun 13", tasks:[
        "TrueLearn: 50 Qs – Weak Category #3 (timed)",
        "Review ALL incorrect answers — equal review time",
        "Re-test check: compare this week's accuracy on Categories #1–3 vs your baseline",
      ]},
      {day:"Sat", label:"Sat Jun 14 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – mixed ALL categories (timed, 80 min) — check if weak areas improving",
        "Review ALL incorrect answers — equal review time",
        "For persistent misses: write out the correct fact/algorithm 3× from memory",
        "Update your weak category list: what's still red?",
      ]},
    ]
  },
  {
    week:14, phase:3, phaseName:"Consolidation",
    dates:"Jun 15–21",
    topic:"Weak Area Attack II + Begin SCORE Questions",
    absWeight:"★★★", weightLabel:"Personalized",
    camerons:"Cameron's chapters for weak areas #4 and #5",
    score:"SCORE questions begin: start with your 2 strongest topics to build confidence, then weakest",
    btk:"BTK episodes on remaining weak topics",
    focus:"Destroy remaining weak areas. TrueLearn nearly complete — begin transitioning to SCORE question bank.",
    days:[
      {day:"Sun", label:"Sun Jun 15 📝 MOCK EXAM #5", tasks:[
        "FULL MOCK EXAM: 120 Qs timed (4 hrs) — all topics, simulate real exam pressure",
        "Score and record — target ≥73%",
        "Review ALL incorrect answers — deep review",
        "Update weak category list — assign categories for this week's attack",
      ]},
      {day:"Mon", label:"Mon Jun 16", tasks:[
        "TrueLearn: 50 Qs – Weak Categories #4 + #5 (timed)",
        "Review ALL incorrect answers — re-read Cameron's for each miss",
        "Re-read Cameron's chapter(s) for Weak Category #4",
      ]},
      {day:"Tue", label:"Tue Jun 17", tasks:[
        "SCORE: Start question bank — do 30 Qs from your 2 strongest topics (confidence + familiarity with SCORE format)",
        "Review ALL SCORE incorrect answers",
        "Note: SCORE questions may have different emphasis than TrueLearn — compare explanations",
      ]},
      {day:"Wed", label:"Wed Jun 18", tasks:[
        "TrueLearn: 50 Qs – mixed weak areas (timed)",
        "Review ALL incorrect answers",
        "Re-read Cameron's for Weak Category #5",
      ]},
      {day:"Thu", label:"Thu Jun 19", tasks:[
        "SCORE: 30 Qs – your 2 weakest categories (force yourself into the hard ones)",
        "Review ALL SCORE incorrect answers — compare SCORE explanations to Cameron's",
        "SCORE: Re-read module curriculum for any topic where you scored <70%",
      ]},
      {day:"Fri", label:"Fri Jun 20", tasks:[
        "TrueLearn: 50 Qs – mixed comprehensive (timed) — approaching TrueLearn completion",
        "Review ALL incorrect answers",
        "Check TrueLearn % complete — target 85–90% done by end of this week",
      ]},
      {day:"Sat", label:"Sat Jun 21 💪 QUESTION BLOCK", tasks:[
        "TrueLearn: 60 Qs – comprehensive block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time",
        "SCORE: 20 Qs – any remaining weak topic (evening session, 30 min)",
        "Check overall TrueLearn accuracy — target ≥73% cumulative",
      ]},
    ]
  },
  {
    week:15, phase:3, phaseName:"Consolidation",
    dates:"Jun 22–28",
    topic:"SCORE Questions Primary + TrueLearn Incorrects",
    absWeight:"★★★", weightLabel:"All Topics",
    camerons:"Quick reference only — Cameron's for any SCORE/TrueLearn misses. No new chapters.",
    score:"SCORE is now your PRIMARY question bank — work through systematically by topic",
    btk:"BTK episode on any remaining weak topics",
    focus:"TrueLearn complete or nearly complete. SCORE questions drive daily sessions. Drill all incorrects twice.",
    days:[
      {day:"Sun", label:"Sun Jun 22 — WEEK REVIEW", tasks:[
        "Complete remaining TrueLearn questions to reach 100% done (or as close as possible)",
        "Pull final TrueLearn analytics — record overall accuracy and category breakdown",
        "Plan Week 15: assign SCORE topics for each day based on your weakest categories first",
      ]},
      {day:"Mon", label:"Mon Jun 23", tasks:[
        "SCORE: 40 Qs – GI/Alimentary (timed)",
        "Review ALL SCORE incorrect answers — read full SCORE explanations",
        "Cross-reference any misses with Cameron's chapter",
      ]},
      {day:"Tue", label:"Tue Jun 24", tasks:[
        "TrueLearn: Review all saved/flagged incorrect questions — GI + Esophagus categories",
        "For each: re-answer from memory, then read explanation again",
        "SCORE: Read SCORE module curriculum for any GI subtopics with multiple misses",
      ]},
      {day:"Wed", label:"Wed Jun 25", tasks:[
        "SCORE: 40 Qs – Breast + Endocrine (timed)",
        "Review ALL SCORE incorrect answers",
        "Cross-reference Cameron's for each miss",
      ]},
      {day:"Thu", label:"Thu Jun 26", tasks:[
        "TrueLearn: Review all flagged incorrects — Breast + Endocrine categories",
        "SCORE: 40 Qs – Trauma + Critical Care (timed)",
        "Review ALL SCORE incorrect answers",
      ]},
      {day:"Fri", label:"Fri Jun 27", tasks:[
        "TrueLearn: Review all flagged incorrects — Trauma + Vascular categories",
        "SCORE: 40 Qs – Vascular (timed)",
        "Review ALL incorrect answers — write out any algorithm you got wrong from memory",
      ]},
      {day:"Sat", label:"Sat Jun 28 💪 QUESTION BLOCK", tasks:[
        "SCORE: 60 Qs – mixed comprehensive block (timed, 80 min)",
        "Review ALL SCORE incorrect answers — equal review time (80 min)",
        "Identify SCORE-specific patterns: what does SCORE test differently than TrueLearn?",
        "Write updated pearl sheets for any topics where new misses emerged",
      ]},
    ]
  },
  {
    week:16, phase:3, phaseName:"Consolidation",
    dates:"Jun 29–Jul 5",
    topic:"SCORE Questions + Head & Neck + Comprehensive Review",
    absWeight:"★★★", weightLabel:"All Topics",
    camerons:"Portal Hypertension · Management of Refractory Ascites · Management of Hepatic Encephalopathy · Management of the Isolated Neck Mass · Surgical Palliative Care · Cardiovascular Pharmacology · Coagulation Issues and the Trauma Patient",
    score:"SCORE: complete remaining topic modules — systematic pass through all categories",
    btk:"Portal hypertension / Head and neck episode",
    focus:"Complete SCORE question bank systematically. High-yield remaining topics: portal HTN, coagulopathy, palliative care. Final comprehensive review.",
    days:[
      {day:"Sun", label:"Sun Jun 29 📝 MOCK EXAM #6", tasks:[
        "FULL MOCK EXAM: 120 Qs timed (4 hrs) — all topics, full exam simulation",
        "Score and record — target ≥75%",
        "Review ALL incorrect answers — comprehensive deep review",
        "This score predicts your readiness. Note any remaining category patterns.",
      ]},
      {day:"Mon", label:"Mon Jun 30", tasks:[
        "SCORE: 40 Qs – HPB + Pancreas (timed)",
        "Review ALL SCORE incorrect answers",
        "Cameron's: Portal Hypertension + Management of Refractory Ascites + Management of Hepatic Encephalopathy — read",
      ]},
      {day:"Tue", label:"Tue Jul 1", tasks:[
        "TrueLearn: Review all flagged incorrects — HPB + Pancreas categories",
        "SCORE: 40 Qs – Oncology + Skin (timed)",
        "Review ALL incorrect answers",
      ]},
      {day:"Wed", label:"Wed Jul 2", tasks:[
        "SCORE: 40 Qs – Hernia + Thoracic + Spleen (timed)",
        "Review ALL incorrect answers",
        "Cameron's: Coagulation Issues and the Trauma Patient + Cardiovascular Pharmacology — read",
      ]},
      {day:"Thu", label:"Thu Jul 3", tasks:[
        "SCORE: 40 Qs – Pediatric + Transplant + Infections (timed)",
        "Review ALL incorrect answers",
        "Cameron's: Management of the Isolated Neck Mass + Surgical Palliative Care — read",
      ]},
      {day:"Fri", label:"Fri Jul 4", tasks:[
        "TrueLearn: Review ALL remaining flagged incorrects — full bank sweep",
        "SCORE: 40 Qs – any remaining untouched SCORE topics (timed)",
        "Write your 'Top 20 High-Yield Facts' master list — one fact per topic area",
      ]},
      {day:"Sat", label:"Sat Jul 5 💪 QUESTION BLOCK", tasks:[
        "SCORE: 60 Qs – mixed comprehensive block (timed, 80 min)",
        "Review ALL incorrect answers — equal review time",
        "Review ALL pearl sheets from all 16 weeks — 30 min rapid skim",
        "PHASE 3 COMPLETE — target: TrueLearn 100% done ≥75% accuracy, SCORE ≥75% on practice Qs",
      ]},
    ]
  },

  // ═══ PHASE 4: PEAK & PROTECT (Weeks 17–19) ═══
  {
    week:17, phase:4, phaseName:"Peak & Protect",
    dates:"Jul 6–12",
    topic:"Final Review — Incorrects Only, No New Material",
    absWeight:"★★★", weightLabel:"All Topics",
    camerons:"Pearl sheets and summaries only — absolutely no new chapters",
    score:"SCORE: review incorrect items only — no new question sets",
    btk:"Re-listen your top 3 favorite high-yield episodes",
    focus:"NO NEW MATERIAL. TrueLearn and SCORE incorrects only. Review pearl sheets. Protect your sleep.",
    days:[
      {day:"Sun", label:"Sun Jul 6 📝 MOCK EXAM #7", tasks:[
        "FULL MOCK EXAM: 120 Qs timed (4 hrs) — all topics. Target ≥77%.",
        "Review ALL incorrect answers — this is your last full mock before exam week",
        "Identify any remaining patterns: what topic still catches you? That gets extra attention Mon–Fri.",
        "Plan Week 17: assign each day to review a specific category of incorrects",
      ]},
      {day:"Mon", label:"Mon Jul 7", tasks:[
        "TrueLearn: Review ALL saved incorrects — GI + Esophagus (no new Qs)",
        "SCORE: Review all GI + Esophagus incorrect items",
        "Re-read pearl sheets: Esophagus + Colorectal + Small Bowel",
      ]},
      {day:"Tue", label:"Tue Jul 8", tasks:[
        "TrueLearn: Review ALL saved incorrects — Breast + Endocrine",
        "SCORE: Review all Breast + Endocrine incorrect items",
        "Re-read pearl sheets: Breast + Endocrine",
      ]},
      {day:"Wed", label:"Wed Jul 9", tasks:[
        "TrueLearn: Review ALL saved incorrects — Trauma + Critical Care",
        "SCORE: Review all Trauma + Critical Care incorrect items",
        "Re-read pearl sheets: Trauma + Critical Care",
      ]},
      {day:"Thu", label:"Thu Jul 10", tasks:[
        "TrueLearn: Review ALL saved incorrects — Vascular + HPB",
        "SCORE: Review all Vascular + HPB incorrect items",
        "Re-read pearl sheets: Vascular + HPB",
      ]},
      {day:"Fri", label:"Fri Jul 11", tasks:[
        "TrueLearn: Review ALL saved incorrects — Oncology + Hernia + Peds + remaining",
        "SCORE: Review all remaining incorrect items",
        "Rapid skim: all pearl sheets in one sitting (30–40 min)",
      ]},
      {day:"Sat", label:"Sat Jul 12 💪 FINAL QUESTION BLOCK", tasks:[
        "SCORE: 60 Qs – mixed comprehensive (timed, 80 min) — your last big block",
        "Review ALL incorrect answers — equal review time",
        "Target ≥78%. Note any new misses — add to your Top 20 Facts list.",
        "Do not study after 8pm — protect your sleep this week",
      ]},
    ]
  },
  {
    week:18, phase:4, phaseName:"Peak & Protect",
    dates:"Jul 13–19",
    topic:"Sharpening — Speed & Confidence",
    absWeight:"★★★", weightLabel:"All Topics",
    camerons:"Top 20 High-Yield Facts list only",
    score:"SCORE: incorrects only, small batches, confidence building",
    btk:"1 high-yield review episode — no new topics",
    focus:"Moderate question volume only — maintain sharpness without fatigue. Protect sleep. No cramming.",
    days:[
      {day:"Sun", label:"Sun Jul 13 — FULL REST", tasks:[
        "FULL REST DAY — no studying whatsoever",
        "Light exercise, good meal, time with family",
        "In bed by 10pm — begin sleep banking",
      ]},
      {day:"Mon", label:"Mon Jul 14", tasks:[
        "SCORE: 30 Qs – mixed (timed at 1.5 min/Q — faster than real exam pace)",
        "Review ALL incorrect answers",
        "Read Top 20 High-Yield Facts list — quiz yourself without looking",
      ]},
      {day:"Tue", label:"Tue Jul 15", tasks:[
        "TrueLearn: Review remaining flagged incorrects — any category still showing <75%",
        "SCORE: 30 Qs – your lowest accuracy SCORE categories",
        "Review ALL incorrect answers",
      ]},
      {day:"Wed", label:"Wed Jul 16", tasks:[
        "SCORE: 40 Qs – mixed (timed, 50 min) — real exam conditions, no interruptions",
        "Review ALL incorrect answers",
        "Read pearl sheets for your 3 weakest categories — slow, deliberate read",
      ]},
      {day:"Thu", label:"Thu Jul 17", tasks:[
        "SCORE: 25 Qs – confidence building (choose your strongest categories)",
        "Review ALL incorrect answers",
        "Re-read Top 20 High-Yield Facts list once",
      ]},
      {day:"Fri", label:"Fri Jul 18", tasks:[
        "SCORE: 20 Qs – light warm-up (mixed, timed)",
        "Review ALL incorrect answers",
        "Logistics: confirm exam location, check-in time, ID requirements, route, parking, hotel",
      ]},
      {day:"Sat", label:"Sat Jul 19", tasks:[
        "SCORE: 15 Qs warm-up only — do NOT do a full block today",
        "Read all pearl sheets × 1 slow pass (45 min max)",
        "Read Top 20 High-Yield Facts one final time",
        "Early dinner, no alcohol, in bed by 9:30pm",
      ]},
    ]
  },
  {
    week:19, phase:4, phaseName:"Peak & Protect",
    dates:"Jul 20–29",
    topic:"🏆 Final Week — Rest & Readiness",
    absWeight:"★★★", weightLabel:"Execution",
    camerons:"No new reading",
    score:"No new questions after Wednesday Jul 22",
    btk:"1 calming review episode only",
    focus:"PROTECT THE EXAM. You have done the work. Trust your preparation. Arrive rested and sharp.",
    days:[
      {day:"Sun", label:"Sun Jul 20 — FULL REST", tasks:[
        "FULL REST DAY — no studying",
        "Gentle exercise, good meal, early bedtime",
      ]},
      {day:"Mon", label:"Mon Jul 21", tasks:[
        "SCORE: 25 Qs – mixed light review (timed)",
        "Review ALL incorrect answers",
        "Read pearl sheets — 1 slow pass (45 min max)",
      ]},
      {day:"Tue", label:"Tue Jul 22", tasks:[
        "SCORE: 20 Qs – light warm-up",
        "Review ALL incorrect answers",
        "Read Top 20 High-Yield Facts × 1",
      ]},
      {day:"Wed", label:"Wed Jul 23 — LAST QUESTIONS", tasks:[
        "SCORE: 15 Qs only — final warm-up. THIS IS YOUR LAST QUESTION SESSION.",
        "Review incorrect answers",
        "Skim pearl sheets for any topic that still feels uncertain (20 min max)",
      ]},
      {day:"Thu", label:"Thu Jul 24 — NO QUESTIONS", tasks:[
        "No TrueLearn, no SCORE — your brain needs consolidation not new input",
        "Read Top 20 High-Yield Facts one final time — slow and deliberate",
        "BTK: 1 calming review episode",
      ]},
      {day:"Fri", label:"Fri Jul 25", tasks:[
        "No studying — your preparation is complete",
        "Travel to exam site if needed",
        "Rest, eat well, do not cram on the plane",
      ]},
      {day:"Sat", label:"Sat Jul 26", tasks:[
        "No studying",
        "Eat well, hydrate, walk outside, sleep 9 hrs",
        "In bed by 9pm",
      ]},
      {day:"Sun", label:"Sun Jul 27", tasks:[
        "Confirm exam check-in time and logistics",
        "Lay out your clothes, set 2 alarms",
        "Eat a real meal, in bed by 9pm",
      ]},
      {day:"Mon", label:"Mon Jul 28 — EXAM EVE", tasks:[
        "No studying whatsoever",
        "Eat a full meal, hydrate, short walk",
        "Sleep 9 hrs — your most important night",
      ]},
      {day:"Tue", label:"🏆 Tue Jul 29 — EXAM DAY", tasks:[
        "Eat a real breakfast — protein + complex carbs, no skipping",
        "Arrive 30 minutes early — do not cram in the parking lot",
        "Pace yourself: ~1.5–2 min per question, flag and move on, trust your first instinct",
        "You have done 19 weeks of work. You passed ABSITE. You know this material.",
        "Go earn your boards. 🎯",
      ]},
    ]
  },
];

const PHASE_CONFIG = {
  1: { name:"Foundation",     color:"#1a4a2e", accent:"#52B788", bg:"#1a4a2e22" },
  2: { name:"Deep Dive",      color:"#1B3A5C", accent:"#5DADE2", bg:"#1B3A5C22" },
  3: { name:"Consolidation",  color:"#4A235A", accent:"#C39BD3", bg:"#4A235A22" },
  4: { name:"Peak & Protect", color:"#6E2C00", accent:"#E59866", bg:"#6E2C0022" },
};

const DAY_COLORS = {
  Sun:"#1a3a2a", Mon:"#1a2a3a", Tue:"#2a1a3a",
  Wed:"#3a2a1a", Thu:"#1a3a3a", Fri:"#3a1a1a", Sat:"#2a3a1a"
};

export default function App() {
  const [selectedWeek, setSelectedWeek]   = useState(0);
  const [checkedTasks, setCheckedTasks]   = useState({});
  const [filterPhase, setFilterPhase]     = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("abs-qe-v4");
      if (saved) setCheckedTasks(JSON.parse(saved));
    } catch(e) {}
  }, []);

  const toggleTask = (key) => {
    setCheckedTasks(prev => {
      const next = { ...prev, [key]: !prev[key] };
      try { localStorage.setItem("abs-qe-v4", JSON.stringify(next)); } catch(e) {}
      return next;
    });
  };

  const examDate = new Date("2026-07-29");
  const today    = new Date();
  const weeksLeft = Math.max(0, Math.ceil((examDate - today) / (1000*60*60*24*7)));

  const totalTasks = WEEKS.reduce((s,w) => s + w.days.reduce((ds,d) => ds + d.tasks.length, 0), 0);
  const doneTasks  = Object.values(checkedTasks).filter(Boolean).length;
  const pct        = Math.round((doneTasks / totalTasks) * 100);

  const visibleWeeks = filterPhase === 0 ? WEEKS : WEEKS.filter(w => w.phase === filterPhase);
  const week = WEEKS[selectedWeek];
  const pc   = PHASE_CONFIG[week.phase];

  return (
    <div style={{minHeight:"100vh",background:"#0C1520",fontFamily:"Georgia,'Times New Roman',serif",color:"#DCE8F0"}}>

      {/* ── HEADER ── */}
      <div style={{background:"linear-gradient(180deg,#0d1e2e,#091624)",borderBottom:"2px solid #B8933A",padding:"18px 24px 14px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1100,margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <div>
              <div style={{fontSize:10,letterSpacing:4,color:"#B8933A",textTransform:"uppercase",marginBottom:3}}>
                ABS Written Qualifying Exam
              </div>
              <h1 style={{margin:0,fontSize:20,fontWeight:"normal",color:"#F0E8D8"}}>
                19-Week Study Schedule&nbsp;&nbsp;<span style={{color:"#B8933A"}}>Jul 29, 2026</span>
              </h1>
              <div style={{fontSize:11,color:"#6B8A9A",marginTop:3}}>
                TrueLearn (Wks 1–13) → SCORE Questions (Wks 14+) · Cameron's 15th Ed · 6–10 hrs/week
              </div>
            </div>
            <div style={{display:"flex",gap:20,alignItems:"center"}}>
              {[
                {val:weeksLeft, label:"Weeks\nLeft",    color:"#B8933A"},
                {val:`${pct}%`, label:"Tasks\nDone",    color:"#52B788"},
                {val:doneTasks, label:"Tasks\nChecked", color:"#5DADE2"},
              ].map((s,i) => (
                <div key={i} style={{textAlign:"center"}}>
                  <div style={{fontSize:24,fontWeight:"bold",color:s.color,lineHeight:1}}>{s.val}</div>
                  <div style={{fontSize:9,color:"#6B8A9A",letterSpacing:2,textTransform:"uppercase",marginTop:2,whiteSpace:"pre-line"}}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{marginTop:10,background:"#0d1e2e",borderRadius:4,height:5,overflow:"hidden",border:"1px solid #1E3A50"}}>
            <div style={{width:`${pct}%`,height:"100%",background:"linear-gradient(90deg,#B8933A,#E8C97A)",borderRadius:4,transition:"width 0.5s"}}/>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{maxWidth:1100,margin:"0 auto",padding:"18px 18px"}}>

        {/* Phase filter pills */}
        <div style={{display:"flex",gap:7,marginBottom:16,flexWrap:"wrap"}}>
          {[0,1,2,3,4].map(p => {
            const cfg   = p===0 ? {accent:"#B8933A"} : PHASE_CONFIG[p];
            const label = p===0 ? "All Phases" : `Phase ${p}: ${PHASE_CONFIG[p].name}`;
            const active = filterPhase === p;
            return (
              <button key={p} onClick={() => setFilterPhase(p)} style={{
                background: active ? (p===0?"#B8933A22":PHASE_CONFIG[p].bg) : "rgba(255,255,255,0.04)",
                border:`1px solid ${active ? cfg.accent : "rgba(255,255,255,0.1)"}`,
                borderRadius:20, padding:"5px 13px", cursor:"pointer",
                fontSize:11, color: active ? cfg.accent : "#6B8A9A",
                transition:"all 0.2s", fontFamily:"inherit",
              }}>{label}</button>
            );
          })}
        </div>

        {/* Two-column layout */}
        <div style={{display:"grid",gridTemplateColumns:"255px 1fr",gap:16,alignItems:"start"}}>

          {/* Sidebar */}
          <div style={{position:"sticky",top:94}}>
            <div style={{fontSize:10,letterSpacing:3,color:"#6B8A9A",textTransform:"uppercase",marginBottom:7}}>Select Week</div>
            <div style={{display:"flex",flexDirection:"column",gap:3,maxHeight:"77vh",overflowY:"auto",paddingRight:3}}>
              {visibleWeeks.map(w => {
                const idx  = WEEKS.indexOf(w);
                const cfg  = PHASE_CONFIG[w.phase];
                const wDone  = w.days.reduce((s,d) => s + d.tasks.filter((_,ti) => checkedTasks[`w${idx}-d${w.days.indexOf(d)}-t${ti}`]).length, 0);
                const wTotal = w.days.reduce((s,d) => s + d.tasks.length, 0);
                const wPct   = Math.round((wDone/wTotal)*100);
                const active = selectedWeek === idx;
                return (
                  <button key={w.week} onClick={() => setSelectedWeek(idx)} style={{
                    background: active ? cfg.bg : "rgba(255,255,255,0.03)",
                    border:`1px solid ${active ? cfg.accent : "rgba(255,255,255,0.06)"}`,
                    borderRadius:8, padding:"8px 11px", cursor:"pointer", textAlign:"left", transition:"all 0.15s", fontFamily:"inherit",
                  }}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:10,color:active?cfg.accent:"#6B8A9A",letterSpacing:1}}>WK {w.week} · {w.dates}</span>
                      <span style={{fontSize:10,color:wPct===100?"#52B788":"#6B8A9A"}}>{wPct}%</span>
                    </div>
                    <div style={{fontSize:11,color:active?"#E8E0D5":"#8A9BA8",marginTop:2,lineHeight:1.3}}>
                      {w.topic.length>36 ? w.topic.slice(0,36)+"…" : w.topic}
                    </div>
                    <div style={{marginTop:4,background:"#0d1e2e",borderRadius:2,height:3,overflow:"hidden"}}>
                      <div style={{width:`${wPct}%`,height:"100%",background:cfg.accent,borderRadius:2}}/>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main panel */}
          <div>
            {/* Week header card */}
            <div style={{background:`linear-gradient(135deg,${pc.color}44,${pc.color}22)`,border:`1px solid ${pc.accent}44`,borderRadius:14,padding:"16px 20px",marginBottom:13}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:7}}>
                <div>
                  <div style={{fontSize:10,color:pc.accent,letterSpacing:3,textTransform:"uppercase",marginBottom:4}}>
                    Week {week.week} · Phase {week.phase}: {pc.name} · {week.dates}
                  </div>
                  <h2 style={{margin:0,fontSize:17,fontWeight:"normal",color:"#F0E8D8"}}>{week.topic}</h2>
                </div>
                <div style={{background:`${pc.accent}22`,border:`1px solid ${pc.accent}55`,borderRadius:7,padding:"4px 10px",fontSize:11,color:pc.accent}}>
                  {week.absWeight} {week.weightLabel}
                </div>
              </div>
              <div style={{marginTop:11,display:"grid",gridTemplateColumns:"1fr 1fr",gap:7}}>
                {[
                  {icon:"📖",label:"Cameron's 15th",val:week.camerons},
                  {icon:"🗂️",label:"SCORE",         val:week.score},
                  {icon:"🎧",label:"BTK",            val:week.btk},
                  {icon:"🎯",label:"Focus",          val:week.focus},
                ].map((r,i) => (
                  <div key={i} style={{background:"rgba(0,0,0,0.25)",borderRadius:7,padding:"7px 10px",fontSize:11,color:"#9EAAB5",lineHeight:1.45}}>
                    <span style={{color:pc.accent}}>{r.icon} {r.label}: </span>{r.val}
                  </div>
                ))}
              </div>
            </div>

            {/* Daily checklists */}
            <div style={{display:"flex",flexDirection:"column",gap:9}}>
              {week.days.map((d,di) => {
                const dayDone = d.tasks.filter((_,ti) => checkedTasks[`w${selectedWeek}-d${di}-t${ti}`]).length;
                const allDone = dayDone === d.tasks.length;
                const isSat   = d.day==="Sat";
                const isSun   = d.day==="Sun";
                const isExam  = d.label.includes("EXAM DAY");
                const borderColor = allDone ? "#52B78855"
                                  : isExam  ? "#B8933A66"
                                  : isSat   ? "#C9A84C44"
                                  : isSun   ? "#5DADE244"
                                  : "rgba(255,255,255,0.07)";
                const headerBg = allDone ? "rgba(82,183,136,0.1)"
                               : isExam  ? "rgba(184,147,58,0.15)"
                               : isSat   ? "rgba(201,168,76,0.07)"
                               : isSun   ? "rgba(93,173,226,0.06)"
                               : `${DAY_COLORS[d.day]}88`;
                const badgeColor = allDone ? "#52B788"
                                 : isExam  ? "#B8933A"
                                 : isSat   ? "#C9A84C"
                                 : isSun   ? "#5DADE2"
                                 : pc.accent;
                return (
                  <div key={di} style={{borderRadius:11,overflow:"hidden",border:`1px solid ${borderColor}`}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px 13px",background:headerBg,borderBottom:`1px solid ${borderColor}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <span style={{fontSize:10,fontWeight:"bold",letterSpacing:2,textTransform:"uppercase",padding:"2px 8px",borderRadius:20,color:badgeColor,background:`${badgeColor}22`}}>
                          {d.day}{isSat&&!allDone?" 💪":""}{isSun&&!allDone&&d.label.includes("MOCK")?" 📝":""}
                        </span>
                        <span style={{fontSize:12,color:allDone?"#52B788":isExam?"#E8C97A":"#B0C4CF"}}>{d.label}</span>
                      </div>
                      <span style={{fontSize:11,color:allDone?"#52B788":"#5A7A8A"}}>
                        {allDone ? "✓ Complete" : `${dayDone}/${d.tasks.length}`}
                      </span>
                    </div>
                    <div style={{padding:"8px 13px",display:"flex",flexDirection:"column",gap:5}}>
                      {d.tasks.map((task,ti) => {
                        const key  = `w${selectedWeek}-d${di}-t${ti}`;
                        const done = checkedTasks[key];
                        return (
                          <div key={ti} onClick={() => toggleTask(key)} style={{
                            display:"flex",alignItems:"flex-start",gap:8,cursor:"pointer",
                            padding:"5px 7px",borderRadius:7,transition:"all 0.15s",
                            background: done ? "rgba(82,183,136,0.08)" : "rgba(255,255,255,0.02)",
                            border: `1px solid ${done ? "#52B78833" : "transparent"}`,
                          }}>
                            <div style={{
                              width:16,height:16,borderRadius:4,flexShrink:0,marginTop:2,
                              display:"flex",alignItems:"center",justifyContent:"center",
                              transition:"all 0.15s",
                              border:`2px solid ${done?"#52B788":"#3A5A6A"}`,
                              background: done ? "#52B788" : "transparent",
                            }}>
                              {done && <span style={{color:"#0C1520",fontSize:10,fontWeight:"bold"}}>✓</span>}
                            </div>
                            <span style={{
                              fontSize:12,lineHeight:1.5,
                              color: done ? "#52B788" : "#C4D4DF",
                              textDecoration: done ? "line-through" : "none",
                              opacity: done ? 0.7 : 1,
                            }}>{task}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
