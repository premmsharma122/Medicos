import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import Genral_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Dermatologist from './Dermatologist.svg'
import Pediatricians from './Pediatricians.svg'
import Neurologist from './Neurologist.svg'
import doc1 from './doc1.png';
import doc2 from './doc2.png';
import doc3 from './doc3.png';
import doc4 from './doc4.png';
import doc5 from './doc5.png';
import doc6 from './doc6.png';
import doc7 from './doc7.png';
import doc8 from './doc8.png';
import doc9 from './doc9.png';
import doc10 from './doc10.png';
import doc11 from './doc11.png';
import doc12 from './doc12.png';
import doc13 from './doc13.png';
import doc14 from './doc14.png';
import doc15 from './doc15.png';
export const doctors = [
  {
    _id: 'doc1',
    name: 'Dr. Richard James',
    image: doc1,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '4 Years',
    about: `Dr. Richard James is a dedicated General Physician with a strong focus on preventive care and chronic illness management. 
He prioritizes patient education, lifestyle changes, and early diagnosis. 
His empathetic communication style ensures that patients feel heard and well-guided throughout their treatment journey.`,
    fees: 500,
    address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
  },
  {
    _id: 'doc2',
    name: 'Dr. Amelia Clarke',
    image: doc2,
    speciality: 'Dermatologist',
    degree: 'MD, Dermatology',
    experience: '6 Years',
    about: `Dr. Amelia Clarke specializes in medical and cosmetic dermatology. 
She has successfully treated thousands of cases involving acne, eczema, psoriasis, and pigmentation. 
Her holistic approach includes dietary consultations and personalized skincare regimens.`,
    fees: 600,
    address: { line1: '221B Baker Street', line2: 'Central London, UK' }
  },
  {
    _id: 'doc3',
    name: 'Dr. Samuel White',
    image: doc3,
    speciality: 'Pediatrician',
    degree: 'MBBS, DCH',
    experience: '8 Years',
    about: `Dr. Samuel White offers compassionate pediatric care focusing on early childhood development and wellness. 
He is known for his friendly rapport with children and in-depth parental counseling. 
He emphasizes immunization, nutrition, and developmental milestones for optimal child health.`,
    fees: 550,
    address: { line1: '14 Kensington Ave', line2: 'West End, London' }
  },
  {
    _id: 'doc4',
    name: 'Dr. Olivia Turner',
    image: doc4,
    speciality: 'General Physician',
    degree: 'MBBS, MS (OBG)',
    experience: '10 Years',
    about: `Dr. Olivia Turner brings a wealth of experience in general medicine and women’s health. 
Her comprehensive approach to diagnostics and personalized care plans has earned her the trust of patients from all walks of life. 
She emphasizes preventive screenings and long-term health management.`,
    fees: 700,
    address: { line1: '45 Hyde Park Road', line2: 'South Kensington, London' }
  },
  {
    _id: 'doc5',
    name: 'Dr. Ethan Scott',
    image: doc5,
    speciality: 'Cardiologist',
    degree: 'MD, Cardiology',
    experience: '12 Years',
    about: `Dr. Ethan Scott is an acclaimed Cardiologist with expertise in both interventional and non-invasive procedures. 
He has a track record of managing critical heart cases with precision. 
His care philosophy centers on lifestyle modification, patient education, and advanced diagnostics.`,
    fees: 800,
    address: { line1: '9 Queen Street', line2: 'Greenwich, London' }
  },
  {
    _id: 'doc6',
    name: 'Dr. Sophia Bennett',
    image: doc6,
    speciality: 'ENT Specialist',
    degree: 'MBBS, MS (ENT)',
    experience: '5 Years',
    about: `Dr. Sophia Bennett provides expert treatment for ear, nose, and throat disorders. 
She is especially known for handling chronic sinusitis, hearing loss, and throat infections. 
Her clinic integrates modern tools with minimally invasive techniques to ensure high success rates.`,
    fees: 450,
    address: { line1: '31 Victoria Lane', line2: 'Stratford, London' }
  },
  {
    _id: 'doc7',
    name: 'Dr. Daniel Wright',
    image: doc7,
    speciality: 'Orthopedic Surgeon',
    degree: 'MS, Orthopedics',
    experience: '9 Years',
    about: `Dr. Daniel Wright is known for restoring mobility through surgical and non-surgical orthopedic interventions. 
He is skilled in joint replacements, sports injuries, and trauma recovery. 
His rehabilitation-centric approach ensures long-term joint health and patient independence.`,
    fees: 750,
    address: { line1: "88 King's Road", line2: 'Chelsea, London' }
  },
  {
    _id: 'doc8',
    name: 'Dr. Ava Mitchell',
    image: doc8,
    speciality: 'Neurologist',
    degree: 'MD, Neurology',
    experience: '7 Years',
    about: `Dr. Ava Mitchell offers advanced neurological care, treating conditions like epilepsy, migraines, and neuropathies. 
She believes in empowering patients through knowledge and compassionate support. 
Her treatments combine medication, therapy, and neuro-diagnostics for optimal results.`,
    fees: 850,
    address: { line1: '16 Oxford Street', line2: 'Soho, London' }
  },
  {
    _id: 'doc9',
    name: 'Dr. Benjamin Hill',
    image: doc9,
    speciality: 'Psychiatrist',
    degree: 'MBBS, MD Psychiatry',
    experience: '11 Years',
    about: `Dr. Benjamin Hill supports mental wellness with a patient-first approach. 
His expertise includes treating anxiety, depression, bipolar disorder, and PTSD. 
He integrates therapy with modern medication strategies to help patients regain emotional balance.`,
    fees: 650,
    address: { line1: '72 Camden High Street', line2: 'Camden Town, London' }
  },
  {
    _id: 'doc10',
    name: 'Dr. Mia Rose',
    image: doc10,
    speciality: 'Dentist',
    degree: 'BDS, MDS',
    experience: '6 Years',
    about: `Dr. Mia Rose delivers comprehensive dental services, including cleanings, fillings, and cosmetic makeovers. 
She values patient comfort and hygiene. 
Her clinic is equipped with modern dental technology and a stress-free environment for patients of all ages.`,
    fees: 500,
    address: { line1: '58 Regent Street', line2: 'Piccadilly, London' }
  },
  {
    _id: 'doc11',
    name: 'Dr. Isaac Green',
    image: doc11,
    speciality: 'General Physician',
    degree: 'MBBS',
    experience: '5 Years',
    about: `Dr. Isaac Green practices family medicine with a keen focus on lifestyle diseases and acute care. 
He believes in proactive treatment strategies and continuous patient education. 
His approachable nature makes him popular among both adults and seniors.`,
    fees: 550,
    address: { line1: '12 Baker Avenue', line2: 'North London' }
  },
  {
    _id: 'doc12',
    name: 'Dr. Emily Watson',
    image: doc12,
    speciality: 'Dentist',
    degree: 'BDS, MDS',
    experience: '4 Years',
    about: `Dr. Emily Watson specializes in conservative dentistry and smile correction. 
She is meticulous about dental hygiene and oral education. 
She provides gentle treatment to anxious patients and promotes long-term oral care.`,
    fees: 520,
    address: { line1: '90 Leicester Street', line2: 'London Bridge' }
  },
  {
    _id: 'doc13',
    name: 'Dr. Lucas Gray',
    image: doc13,
    speciality: 'Dentist',
    degree: 'BDS',
    experience: '7 Years',
    about: `Dr. Lucas Gray blends precision and empathy in his dental services. 
From implants to whitening treatments, he offers customized plans that suit each patient’s needs. 
His clinic focuses on advanced pain-free procedures and aesthetic results.`,
    fees: 530,
    address: { line1: '34 Abbey Road', line2: 'Westminster' }
  },
  {
    _id: 'doc14',
    name: 'Dr. Chloe Miller',
    image: doc14,
    speciality: 'Gynecologist',
    degree: 'MBBS, MS (OBG)',
    experience: '9 Years',
    about: `Dr. Chloe Miller provides comprehensive gynecological care including fertility, PCOD, and menopausal issues. 
She is deeply committed to safe and informed childbirth. 
Her practice is rooted in respect, confidentiality, and clinical excellence.`,
    fees: 680,
    address: { line1: '77 Hill View Road', line2: 'Notting Hill, London' }
  },
  {
    _id: 'doc15',
    name: 'Dr. Nathan Wood',
    image: doc15,
    speciality: 'Cardiologist',
    degree: 'MD, Cardiology',
    experience: '13 Years',
    about: `Dr. Nathan Wood is a veteran Cardiologist with expertise in heart rhythm disorders and interventional techniques. 
He leads cardiac wellness camps and promotes heart-healthy lifestyles. 
He’s known for his accuracy in diagnosis and post-treatment care planning.`,
    fees: 820,
    address: { line1: '61 Thames Boulevard', line2: 'Canary Wharf, London' }
  }
];

export const specialityData = [
  {
    speciality: 'General Physician',
    slug: 'general-physician',
    image: Genral_physician
  },
  {
    speciality: 'Gynecologist',
    slug: 'gynecologist',
    image: Gynecologist
  },
  {
    speciality: 'Dermatologist',
    slug: 'dermatologist',
    image: Dermatologist
  },
  {
    speciality: 'Pediatricians',
    slug: 'pediatricians',
    image: Pediatricians
  },
  {
    speciality: 'Neurologist',
    slug: 'neurologist',
    image: Neurologist
  }
]

export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon
}
