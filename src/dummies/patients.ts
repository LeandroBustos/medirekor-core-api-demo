const patients: any = {
    "1": {
        name: "Roberto",
        last_name: "Garcia",
        birthday: "10/12/1986 - 36 years old",
        os: "O.S 30.256.203",
        waiting_time: "MAX_WAITING",
        consult_date: "31/03/2023 10:23",
        consult: "TRAUMA",
        consult_derivation: "TRAUMA",
        emergency: "TRAUMA",
        vital_signs: {
            height: `5'10"`,
            weight: "186 Lbs",
            body_mass_index: "25",
            temperature: "38.5°C",
            respiratory_rate: "14 Bpm",
            heart_rate: "68 Bpm",
            body_fat_percentaje: "25%"
        },
        allergies: [
            "Rynatan",
            "Aspirin"
        ],
        vaccines: [
            "Tetanus",
            "HPV",
            "Hep A",
            "Hep B",
            "Polio",
            "Hib",
            "COVID19"
        ],
        active_medication: [
            "Symbicort",
            "Albuterol"
        ],
        chronic_diseases: [
            "Asthma"
        ],
        past_surgeries: [
            {
                name: "Left Hand Surgery",
                date: "25/10/1998"
            },
            {
                name: "Right Hand Surgery",
                date: "25/10/1998"
            },
            {
                name: "Kidneys Surgery",
                date: "25/10/1998"
            }
        ],
        insurance: {
            provider: "SSS",
            group_id: "1234567",
            member_id: "0311254",
            pcp: "N/A"
        }
    },
    "2": {
        name: "Diego",
        last_name: "Lopez",
        birthday: "15/01/1970 - 53 years old",
        os: "O.S 31.258.111",
        waiting_time: "MID_WAITING",
        consult_date: "31/03/2023 12:11",
        consult: "TRAUMA",
        consult_derivation: "TRAUMA",
        emergency: "TRAUMA",
        vital_signs: {
            height: `5'9"`,
            weight: "180 Lbs",
            body_mass_index: "26.6",
            temperature: "36.7°C",
            respiratory_rate: "18 Bpm",
            heart_rate: "75 Bpm",
            body_fat_percentage: "25.7%"
        },
        allergies: [
            "Loratadine",
            "Cetirizine",
            "Fexofenadine"
        ],
        vaccines: [
            "Diphtheria",
            "HPV",
            "Hep A",
            "Hep B",
            "Polio",
            "Hib",
            "Rubella",
            "Pneumococcal",
            "COVID19"
        ],
        active_medication: [
            "Acetaminophen",
            "Flutivent"
        ],
        chronic_diseases: [
            "Headaches",
            "Asthma"
        ],
        past_surgeries: [
            {
                name: "Left Knee Surgery",
                date: "24/07/2004"
            },
            {
                name: "Right Knee Surgery",
                date: "24/07/2004"
            },
            {
                name: "Skull Surgery",
                date: "22/07/2004"
            }
        ],
        insurance: {
            provider: "SSS",
            group_id: "1224466",
            member_id: "6312234",
            pcp: "N/A"
        }
    },
    "3": {
        name: "Ricardo",
        last_name: "Veglia",
        birthday: "12/03/1972 - 51 years old",
        os: "O.S 29.118.043",
        waiting_time: "MIN_WAITING",
        consult_date: "31/03/2023 15:00",
        consult: "MEDICAL_CONSULTATION",
        consult_derivation: "LABORATORY",
        emergency: "TRAUMA",
        vital_signs: {
            height: `5'10"`,
            weight: "160 Lbs",
            body_mass_index: "23",
            temperature: "36.8°C",
            respiratory_rate: "16 Bpm",
            heart_rate: "72 Bpm",
            body_fat_percentage: "20%"
        },
        allergies: [
            "Levocetirizine",
        ],
        vaccines: [
            "Diphtheria",
            "HPV",
            "Hep A",
            "Hep B",
            "Polio",
            "Hib",
            "Cholera",
            "Adenovirus",
            "COVID19"
        ],
        active_medication: [
            "Denosumab",
        ],
        chronic_diseases: [
            "Osteoporosis",
        ],
        past_surgeries: [
            {
                name: "Vertebroplasty",
                date: "24/07/2004"
            }
        ],
        insurance: {
            provider: "SSS",
            group_id: "1224466",
            member_id: "6332792",
            pcp: "N/A"
        }
    },
    "4": {
        name: "Luis",
        last_name: "Santos",
        birthday: "11/07/1993 - 29 years old",
        os: "O.S 28.292.343",
        waiting_time: "MIN_WAITING",
        consult_date: "31/03/2023 15:15",
        consult: "VACCINE",
        consult_derivation: "LABORATORY",
        emergency: "DIABETES",
        vital_signs: {
            height: `5'9"`,
            weight: "163 Lbs",
            body_mass_index: "24.1",
            temperature: "36.9°C",
            respiratory_rate: "14 Bpm",
            heart_rate: "77 Bpm",
            body_fat_percentage: "16.2%"
        },
        allergies: [
            "Desloratadine",
            "Fexofenadine"
        ],
        vaccines: [
            "Diphtheria",
            "HPV",
            "Hep A",
            "Hep B",
            "Polio",
            "Hib",
            "Cholera",
            "Tuberculosis",
            "COVID19"
        ],
        active_medication: [
            "Glipizide ER",
        ],
        chronic_diseases: [
            "Type 1 Diabetes",
        ],
        past_surgeries: [
            {
                name: "Left Feet Amputation",
                date: "30/10/2021"
            }
        ],
        insurance: {
            provider: "SSS",
            group_id: "1234567",
            member_id: "4576187",
            pcp: "N/A"
        }
    },
    "5": {
        name: "Sara",
        last_name: "Marquez",
        birthday: "21/08/1992 - 30 years old",
        os: "O.S 32.328.252",
        waiting_time: "INTERNSHIP",
        consult_date: "31/03/2023 15:42",
        consult: "IN_TREATMENT",
        consult_derivation: "CARDIOLOGY",
        emergency: "CARDIAC",
        vital_signs: {
            height: `5'5"`,
            weight: "135 Lbs",
            body_mass_index: "22.5",
            temperature: "37.2°C",
            respiratory_rate: "16 Bpm",
            heart_rate: "80 Bpm",
            body_fat_percentage: "24.8%"
        },
        allergies: [
            "Loratadine",
            "Fexofenadine"
        ],
        vaccines: [
            "Diphtheria",
            "HPV",
            "Hep A",
            "Hep B",
            "Polio",
            "Hib",
            "Cholera",
            "Tuberculosis",
        ],
        active_medication: [
            "Lisinopril",
        ],
        chronic_diseases: [
            "Hypertension",
            "Heart Disease"
        ],
        past_surgeries: [
            {
                name: "Coronary artery bypass",
                date: "17/01/2023"
            }
        ],
        insurance: {
            provider: "SSS",
            group_id: "1234567",
            member_id: "7746152",
            pcp: "N/A"
        }
    },
    "6": {
        name: "Luis",
        last_name: "Santos",
        birthday: "11/07/1993 - 29 years old",
        os: "O.S 28.292.343",
        waiting_time: "DISCHARGED",
        consult_date: "31/03/2023 16:00",
        consult: "VACCINE",
        consult_derivation: "ENDOCRINOLOGY",
        emergency: "DIABETES",
        vital_signs: {
            height: `5'9"`,
            weight: "170 Lbs",
            body_mass_index: "25.1",
            temperature: "36.8°C",
            respiratory_rate: "16 Bpm",
            heart_rate: "80 Bpm",
            body_fat_percentage: "18%"
        },
        allergies: [
            "Desloratadine",
            "Fexofenadine"
        ],
        vaccines: [
            "Diphtheria",
            "HPV",
            "Hep A",
            "Hep B",
            "Polio",
            "Hib",
            "Cholera",
            "Tuberculosis",
            "COVID19"
        ],
        active_medication: [
            "Glipizide ER",
        ],
        chronic_diseases: [
            "Type 1 Diabetes",
        ],
        past_surgeries: [
            {
                name: "Left Feet Amputation",
                date: "30/10/2021"
            }
        ],
        insurance: {
            provider: "SSS",
            group_id: "1234567",
            member_id: "4576187",
            pcp: "N/A"
        }
    },
    "7": {
        name: "Eric",
        last_name: "Gonzalez",
        birthday: "14/08/1990 - 32 years old",
        os: "O.S 30.277.342",
        waiting_time: "MIN_WAITING",
        consult_date: "31/03/2023 16:18",
        consult: "CARDIOLOGY",
        consult_derivation: "CARDIOLOGY",
        emergency: "CARDIAC",
        vital_signs: {
            height: `5'9"`,
            weight: "154 Lbs",
            body_mass_index: "22.7",
            temperature: "36.8°C",
            respiratory_rate: "16 Bpm",
            heart_rate: "72 Bpm",
            body_fat_percentage: "18.5%"
        },
        allergies: [
            "Penicillin", 
            "Sulfa", 
            "Aspirin"
        ],
        vaccines: [
            "Hep A", 
            "Hep B", 
            "Influenza", 
            "Rubella", 
            "Polio", 
            "Tetanus", 
            "Varicella", 
            "COVID-19", 
            "Yellow fever"
        ],
        chronic_diseases: [
            "Type 1 diabetes", 
            "Hypertension"
        ],
        active_medication: [
            "Insulin", 
            "Metformin"
        ],
        past_surgeries: [
            {"name": "Appendectomy", "date": "05/06/2010"}, 
            {"name": "Left Knee surgery", "date": "10/10/2015"}
        ],
        insurance: {
            provider: "SSS",
            group_id: "4449367",
            member_id: "9243254",
            pcp: "N/A"
        }
    },
    "8": {
        name: "Maria",
        last_name: "Ramirez",
        birthday: "27/03/1985 - 37 years old",
        os: "O.S 30.424.772",
        waiting_time: "MAX_WAITING",
        consult_date: "31/03/2023 18:34",
        consult: "CARDIOLOGY",
        consult_derivation: "CARDIOLOGY",
        emergency: "CARDIAC",
        vital_signs: {
            height: `5'11"`,
            weight: "187 Lbs",
            body_mass_index: "26.1",
            temperature: "37.1°C",
            respiratory_rate: "18 Bpm",
            heart_rate: "68 Bpm",
            body_fat_percentage: "23.8%"
        },
        allergies: ["Loratadine"],
        vaccines: [
            "Hep A", 
            "Hep B", 
            "Influenza", 
            "Measles", 
            "Polio", 
            "Tetanus",
            "Varicella", 
            "COVID-19", 
        ],
        chronic_diseases: [
            "Hypertension",
            "Obstructive Sleep Apnea"
        ],
        active_medication: [
            "Aspirin"
        ],
        past_surgeries: [
            {"name": "Cesarean section", "date": "06/05/2005"}
        ],
        insurance: {
            provider: "SSS",
            group_id: "4449367",
            member_id: "0864254",
            pcp: "N/A"
        }
    },
    "9": {
        name: "Juan",
        last_name: "Santos",
        birthday: "06/12/1978 - 44 years old",
        os: "O.S 30.983.452",
        waiting_time: "MID_WAITING",
        consult_date: "31/03/2023 18:53",
        consult: "MEDICAL_CONSULTATION",
        consult_derivation: "RADIOLOGY",
        emergency: "TRAUMA",
        vital_signs: {
            height: `5'3"`,
            weight: "121 Lbs",
            body_mass_index: "21.5",
            temperature: "36.5°C",
            respiratory_rate: "14 Bpm",
            heart_rate: "80 Bpm",
            body_fat_percentage: "16.2%"
        },
        allergies: ["Fexofenadine"],
        vaccines: [
            "Influenza", 
            "Tetanus", 
            "Diphtheria",
            "Yellow fever", 
            "Meningococcal"
        ],
        chronic_diseases: [
            "Type 2 Diabetes"
        ],
        active_medication: [
            "Metformin"
        ],
        insurance: {
            provider: "SSS",
            group_id: "4449367",
            member_id: "3422117",
            pcp: "N/A"
        }
    },
    "10": {
        name: "Ana",
        last_name: "Rodriguez",
        birthday: "19/09/1995 - 27 years old",
        os: "O.S 30.983.452",
        waiting_time: "DISCHARGED",
        consult_date: "31/03/2023 19:22",
        consult: "MEDICAL_CONSULTATION",
        consult_derivation: "RADIOLOGY",
        emergency: "ASTHMA",
        vital_signs: {
            height: `5'7"`,
            weight: "176 Lbs",
            body_mass_index: "27.5",
            temperature: "36.9°C",
            respiratory_rate: "20 Bpm",
            heart_rate: "75 Bpm",
            body_fat_percentage: "25.4%",
        },
        allergies: [
            "Fexofenadine",
            "Fluticasone"
        ],
        vaccines: [
            "Influenza", 
            "Tetanus", 
            "COVID-19", 
            "Hep A", "Hep B", 
            "Varicella", 
            "HPV"
        ],
        chronic_diseases: [
            "Asthma",
        ],
        active_medication: ["Albuterol"],
        past_surgeries: [{"name": "Appendectomy", "date": "10/05/2015"}],
        insurance: {
            provider: "SSS",
            group_id: "4449367",
            member_id: "1125292",
            pcp: "N/A"
        }
    }
}

export default patients